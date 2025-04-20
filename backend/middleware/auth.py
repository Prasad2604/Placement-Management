from functools import wraps
from flask import request, jsonify
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        verify_jwt_in_request()
        current_user = get_jwt_identity()

        if not isinstance(current_user, dict) or current_user.get('role') not in ['admin', 'SuperAdmin']:
            return jsonify({"message": "Admin access required"}), 403

        return f(*args, **kwargs)
    return decorated_function

def company_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        verify_jwt_in_request()
        current_user = get_jwt_identity()

        if not isinstance(current_user, dict) or current_user.get('role') != 'company':
            return jsonify({"message": "Company access required"}), 403

        return f(*args, **kwargs)
    return decorated_function

def get_current_user():
    verify_jwt_in_request()
    return get_jwt_identity()
