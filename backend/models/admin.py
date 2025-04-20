from datetime import datetime

class Admin:
    def __init__(self):
        self.schema = {
            "username": str,
            "email": str,
            "password": str,  # Hashed
            "role": str,  # SuperAdmin/PlacementOfficer
            "permissions": {
                "manageCompanies": bool,
                "manageStudents": bool,
                "manageJobs": bool,
                "manageReports": bool,
                "manageNotices": bool,
                "manageInterviews": bool
            },
            "profile": {
                "name": str,
                "department": str,
                "contactNumber": str
            },
            "lastLogin": datetime,
            "createdAt": datetime,
            "updatedAt": datetime,
            "isActive": bool
        }

    def validate_admin(self, admin_data):
        required_fields = ['username', 'email', 'password', 'role']
        return all(field in admin_data for field in required_fields) 