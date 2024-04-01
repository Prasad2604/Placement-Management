from flask import Flask,render_template,request,jsonify,make_response
from pymongo import MongoClient
from flask_login import LoginManager
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity,unset_jwt_cookies,verify_jwt_in_request
from bson import ObjectId

import certifi
ca = certifi.where()



app=Flask(__name__)
CORS(app)
# client = MongoClient("mongodb+srv://harshapeshave13:usersample@cluster0.kdqr3xq.mongodb.net/?retryWrites=true&w=majority&ssl=true&appName=Cluster0",tlsCAFile=ca)
client=MongoClient("mongodb://localhost:27017")
db=client.get_database('temp')
login_manager=LoginManager(app)
company=db['company']
admin=db['admin']
bcrypt=Bcrypt(app)
app.config['JWT_SECRET_KEY'] = "12he32dv32dggo2dd2dv2v"
jwt=JWTManager(app)

@app.route('/',methods=['GET'])
def index():
    data = { 
        "Modules" :2, 
        "Subject" : "Company/Admin", 
        } 
  
    return jsonify(data) 


@app.route('/add/company',methods=["GET","POST"])
@jwt_required()
def add():
    if request.method=="POST":
        data=request.json
        name=data['Company name']
        drive=data['Drive mode']
        job=data['Jobs']
        password=data['Password']
        hash_password=bcrypt.generate_password_hash(password).decode('utf-8')
       
        print(hash_password)
        user_dict={
            "Company name":name,
            "Drive mode":drive,
            "Jobs":job,
            "Password":hash_password
        }
        print(user_dict)
        db.company.insert_one(user_dict)
        return jsonify({"status": "Data inserted successfully"})
    
def admin_required(fn):
    def wrapper(*args, **kwargs):
        verify_jwt_in_request()  # Verify JWT token presence and validity
        current_user = get_jwt_identity()
        if current_user.get('role') == 'admin':
            return fn(*args, **kwargs)
        else:
            return jsonify({"status": "Unauthorized"}), 401
    return wrapper

from flask import jsonify

@jwt_required()
@app.route('/login/company', methods=["POST"])
def login():
    if request.method == "POST":
        try:
            data = request.json
            name = data.get('Company name')
            password = data.get('Password')

            if not name or not password:
                return jsonify({"status": "Missing credentials"}), 400

            company = db.company.find_one({"Company name": name})

            if not company:
                return jsonify({"status": "Company not found"}), 404

            if bcrypt.check_password_hash(company['Password'], password):
                token = create_access_token(identity=str(company["_id"]))
                return jsonify({"status": f"Logged in as {name}", "token": token}), 200
            else:
                return jsonify({"status": "Invalid credentials"}), 401

        except Exception as e:
            return jsonify({"status": "Error", "error_message": str(e)}), 500



@app.route('/create/Admin',methods=['POST'])  
@jwt_required() 
@admin_required  
def admin():
    if request.method=="POST":
        data=request.json
        name=data["Admin name"]
        password=data["Password"]
        confirm=data['Confirm']

        if not name or not password or not confirm:
            return jsonify({"status":"Missing fields"})
        hash=bcrypt.generate_password_hash(password).decode('utf-8')
        db.admin.insert_one(
            {
                "Admin name":name,
                "Password":hash
            }
        )
        return jsonify({"status":"Admin created"})
    


@app.route('/login/Admin',methods=['POST'])
def login_admin():
    if request.method=="POST":
        data=request.json
        name=data["Admin name"]
        password=data['Password']
        if not name or not password:
            return jsonify({"status":"Missing fields"})
        sample=db.admin.find_one({"Admin name":name})
        if sample and bcrypt.check_password_hash(sample["Password"],password):
            token=create_access_token(identity=str(company["_id"]))
            return jsonify({"status":f"Logged in as {name}",
                            "token":token})
        else:
            return jsonify({"status":"Credentials do not match"})




@app.route('/register/company', methods=['POST'])
def register():
    if request.method == 'POST':
        data = request.json

    
    if not all(data.get(field) for field in ['Company name', 'Drive mode', 'Jobs_dict']):
      return jsonify({"status": "Missing fields"}), 400

   
    jobs_dict = data.get('Jobs_dict')

    
    for job_title, job_data in jobs_dict.items():
      if not all(job_data.get(field) for field in ['Student_count', 'Salary(LPA)', 'Tech', 'Eligibility', 'Branches']):
        return jsonify({"status": "Missing fields in job details for: {}".format(job_title)}), 400

     
      eligibility = job_data.get('Eligibility')
      if not all(eligibility.get(field) for field in ['CGPA', 'Amcat', 'Back']):
        return jsonify({"status": "Missing fields in eligibility for: {}".format(job_title)}), 400


    password = data.get('Password')
    confirm_pass = data.get('confirm')

    if not password or password != confirm_pass:
        return jsonify({"status": "Password fields not matching or missing"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        
    existing_company = db.company.find_one({"Company name": data.get('Company name')})
    if existing_company:
        return jsonify({"status": "Company already exists"}), 409

    db.company.insert_one({
        "Company name": data.get('Company name'),
        "Drive mode": data.get('Drive mode'),
        "Jobs": data.get('Jobs_dict'),
        "Password": hashed_password
    })

    return jsonify({"status": "Company registered successfully"}), 201





@app.route('/delete/company', methods=['DELETE'])
@jwt_required()
def delete_company():
    if request.method == 'DELETE':
        try:
            current_user_id = get_jwt_identity()
            print("ID=",current_user_id)
            current_user = db.company.find_one({"_id": ObjectId(current_user_id)})
            
            if current_user is None:
                return jsonify({"status": "User not found"}), 404

            data = request.json
            name = current_user['Company name']
            password = data.get('Password')
            confirm = data.get('Confirm')
            
            if not password or not confirm:
                return jsonify({"status": "Password fields missing"}), 400

            sample = db.company.find_one({"_id": ObjectId(current_user_id)})
            if sample and bcrypt.check_password_hash(sample["Password"], password) and bcrypt.check_password_hash(sample["Password"], confirm):
                db.company.delete_one({"Company name": name})
                return jsonify({"status": f"{name} deleted successfully"})
            else:
                return jsonify({"status": "Password does not match"}), 401

        except Exception as e:
            return jsonify({"status": f"Error occurred: {str(e)}"}), 500
        
        



 
@app.route('/update/company', methods=['PUT'])
@jwt_required()
def update():
    if request.method == 'PUT':
        current_user_id=get_jwt_identity()
        current_user=db.company.find_one({"_id":ObjectId(current_user_id)})
        if current_user:
            data=request.json
            name=data['Company name']
            drive=data['Drive mode']
            jobs=data['Jobs']

        db.company.update_one({"_id": ObjectId(current_user_id)}, {"$set": {
            "Company name":name,
            "Drive mode": drive,
            "Jobs": jobs
        }})
        return jsonify({"status": "Data successfully updated"})

    

@app.route('/companies', methods=['GET'])
@jwt_required()
# @admin_required
def give():
    if request.method == 'GET':
        companies = list(db.company.find())
        for company in companies:
            company['_id'] = str(company['_id'])
        return jsonify(companies)

@app.route('/update/password',methods=['PUT'])
@jwt_required()
def up():
    if request.method=='PUT':
        data=request.json
        n=data['New Password']
        c=data['Confirm']
        
        if n!=c:
            return jsonify({"status":"Fields not matching"})
        else:
            current_user_id=get_jwt_identity()
            
            h=bcrypt.generate_password_hash(n).decode('utf-8')
            if db.company.find_one({"_id":ObjectId(current_user_id)}):
                current_user=db.company.find_one({"_id":ObjectId(current_user_id)})
                if bcrypt.check_password_hash(current_user["Password"],h):
                    return jsonify({"status":"Do not use previous passwords"})
                db.company.update_one({"_id":ObjectId(current_user_id)},{
                    "$set":{
                        "Password":h
                    }
                })
                
            else:
                try:
                    print("vyyyyyyyyyyyyyyyyyyyyycervrecrerev",current_user_id)
                    current_user=db.admin.find_one({"_id":ObjectId(current_user_id)})
                    if bcrypt.check_password_hash(current_user["Password"],h):
                        return jsonify({"status":"Do not use previous passwords"})
                    db.admin.update_one({"_id":ObjectId(current_user_id)},{
                        "$set":{
                            "Password":h
                        }
                    })
                except Exception as e:
                    return jsonify({"Status":f'Error{e}'})
            return jsonify({"staus":"Password updated"})    




@app.route('/single',methods=["GET"])
@jwt_required()
def show():
    if request.method=="GET":
        current_user_id=get_jwt_identity()
        current_user=db.company.find_one({"_id":ObjectId(current_user_id)})
        if current_user:
            current_user['_id'] = str(current_user['_id'])
            user_info = {
                "Company name": current_user.get("Company name"),
                "Drive mode": current_user.get("Drive mode"),
                "Jobs":current_user.get("Jobs")
            }
            return jsonify({
                "status":"success",
                "User info":user_info,
                "token":current_user_id
            })
        else:
            return jsonify({"status":"Login required"})


@app.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    if request.method == 'POST':
        try:
            res = make_response(jsonify({"status": "Logged out successfully"}))
            unset_jwt_cookies(res)
            return res, 200

        except Exception as e:
            return jsonify({"status": f"Error occurred: {str(e)}"}), 500
        

if __name__=="__main__":
    app.run(debug=True)    


    


    
    

    
