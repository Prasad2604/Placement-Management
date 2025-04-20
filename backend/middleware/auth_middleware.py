from functools import wraps
from flask import jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt

def admin_required(f):
    @wraps(f)
    def admin_wrapper(*args, **kwargs):
        try:
            verify_jwt_in_request()
            claims = get_jwt()
            
            if claims.get('role') != 'admin':
                return jsonify({"message": "Admin access required"}), 403
                
            return f(*args, **kwargs)
        except Exception as e:
            return jsonify({"message": "Error", "error": str(e)}), 500
    return admin_wrapper 