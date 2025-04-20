from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt
from datetime import datetime, timedelta
from bson import ObjectId

auth_bp = Blueprint('auth', __name__)
bcrypt = Bcrypt()

@auth_bp.route('/login/admin', methods=['POST'])
def admin_login():
    try:
        data = request.json
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({"message": "Missing credentials"}), 400

        admin = request.db.admin.find_one({"username": username})
        if not admin:
            return jsonify({"message": "Admin not found"}), 404

        if bcrypt.check_password_hash(admin['password'], password):
            # Create token with additional claims
            additional_claims = {
                'role': 'admin'
            }
            
            token = create_access_token(
                identity=str(admin['_id']),
                additional_claims=additional_claims,
                expires_delta=timedelta(days=1)
            )
            
            return jsonify({
                "message": f"Logged in as {username}",
                "token": token,
                "admin": {
                    "id": str(admin['_id']),
                    "username": admin['username'],
                    "email": admin['email'],
                    "role": "admin"
                }
            }), 200
        else:
            return jsonify({"message": "Invalid credentials"}), 401

    except Exception as e:
        return jsonify({"message": "Error", "error": str(e)}), 500

@auth_bp.route('/login/company', methods=['POST'])
def company_login():
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({"message": "Missing credentials"}), 400

        company = request.db.company.find_one({"email": email})
        if not company:
            return jsonify({"message": "Company not found"}), 404

        # Check if company is approved
        if company.get('status') != 'approved':
            return jsonify({"message": "Company account is pending approval"}), 403

        if bcrypt.check_password_hash(company['password'], password):
            token = create_access_token(identity={
                'id': str(company['_id']),
                'role': 'company',
                'email': company['email']
            })
            return jsonify({
                "message": f"Logged in as {email}",
                "token": token,
                "company": {
                    "id": str(company['_id']),
                    "name": company.get('name'),
                    "email": company.get('email')
                }
            }), 200
        else:
            return jsonify({"message": "Invalid credentials"}), 401

    except Exception as e:
        return jsonify({"message": "Error", "error": str(e)}), 500

@auth_bp.route('/register/company', methods=['POST'])
def register_company():
    try:
        data = request.json
        required_fields = ['name', 'email', 'password', 'phone']
        
        if not all(field in data for field in required_fields):
            return jsonify({"message": "Missing required fields"}), 400

        # Check if company already exists
        if request.db.company.find_one({"email": data['email']}):
            return jsonify({"message": "Email already registered"}), 409

        # Hash password
        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        
        # Create company document
        company = {
            "name": data['name'],
            "email": data['email'],
            "password": hashed_password,
            "phone": data['phone'],
            "website": data.get('website', ''),
            "status": "pending",
            "createdAt": datetime.utcnow()
        }
        
        result = request.db.company.insert_one(company)
        
        return jsonify({
            "message": "Company registered successfully",
            "companyId": str(result.inserted_id)
        }), 201

    except Exception as e:
        return jsonify({"message": "Error", "error": str(e)}), 500

@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    # JWT tokens are stateless, so we just return success
    # In a real app, you might want to blacklist the token
    return jsonify({"message": "Logged out successfully"}), 200 