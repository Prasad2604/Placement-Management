from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from pymongo import MongoClient
from config import Config

# Initialize SQLAlchemy
db = SQLAlchemy()

# Initialize JWT Manager
jwt = JWTManager()

# Initialize Bcrypt
bcrypt = Bcrypt()

# Initialize MongoDB
def init_mongodb():
    client = MongoClient(Config.MONGODB_URI)
    db = client[Config.MONGODB_DB]
    return db 