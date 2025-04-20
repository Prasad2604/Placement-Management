from flask import Flask, request, jsonify
from flask_cors import CORS
from routes.auth_routes import auth_bp
from routes.admin_routes import admin_bp
from routes.company_routes import company_bp
from config import Config
from extensions import db, jwt, bcrypt, init_mongodb
import os

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    bcrypt.init_app(app)
    CORS(app)

    # Initialize MongoDB
    @app.before_request
    def before_request():
        request.db = init_mongodb()

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(admin_bp, url_prefix='/admin')
    app.register_blueprint(company_bp, url_prefix='/company')

    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({"message": "Resource not found"}), 404

    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({"message": "Internal server error"}), 500

    return app

if __name__ == '__main__':
    app = create_app()
    
    # Use waitress in production, Flask dev server in development
    if os.environ.get('FLASK_ENV') == 'production':
        from waitress import serve
        serve(app, host='0.0.0.0', port=5000)
    else:
        app.run(debug=True, host='0.0.0.0', port=5000)    


    


    
    

    
