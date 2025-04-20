import os
from dotenv import load_dotenv
from datetime import timedelta

load_dotenv()

class Config:
    # Flask settings
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your-secret-key-here'
    
    # JWT settings
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'jwt-secret-key-here'
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)
    
    # MongoDB settings
    MONGODB_URI = os.environ.get('MONGODB_URI') or 'mongodb://localhost:27017'
    MONGODB_DB = os.environ.get('MONGODB_DB') or 'placement_management'
    
    # SQLAlchemy settings
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///placement.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    PORT = os.getenv('PORT', 5000)

    @staticmethod
    def init_app(app):
        pass 