from datetime import datetime

class Company:
    def __init__(self):
        self.schema = {
            "companyName": str,
            "username": str,
            "email": str,
            "password": str,  # Hashed
            "drive": str,  # On Campus/Off Campus/Both
            "status": str,  # Pending/Approved/Rejected
            "profile": {
                "description": str,
                "website": str,
                "location": str,
                "industry": str,
                "companySize": str,
                "logo": str  # URL to logo
            },
            "jobs": [],  # Array of job posting IDs
            "createdAt": datetime,
            "updatedAt": datetime,
            "isActive": bool,
            "documents": {  # Required company documents
                "registration": str,
                "taxId": str
            }
        }

    def validate_company(self, company_data):
        required_fields = ['companyName', 'username', 'email', 'password', 'drive']
        return all(field in company_data for field in required_fields) 