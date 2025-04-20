from datetime import datetime

class JobPosting:
    def __init__(self):
        self.schema = {
            "title": str,
            "companyId": str,  # Reference to company
            "description": str,
            "requirements": {
                "skills": list,
                "education": {
                    "degree": str,
                    "branches": list,
                    "minCGPA": float
                },
                "experience": str,
                "otherRequirements": list
            },
            "package": {
                "ctc": float,
                "breakup": {
                    "base": float,
                    "benefits": dict
                }
            },
            "type": str,  # Full-time/Internship
            "location": str,
            "mode": str,  # Remote/Onsite/Hybrid
            "positions": int,
            "rounds": [
                {
                    "name": str,
                    "type": str,  # Technical/HR/Aptitude
                    "description": str,
                    "date": datetime,
                    "venue": str,
                    "status": str  # Scheduled/Completed/Cancelled
                }
            ],
            "timeline": {
                "applicationDeadline": datetime,
                "startDate": datetime
            },
            "status": str,  # Draft/Pending/Approved/Rejected/Closed
            "applications": [],  # Array of application IDs
            "createdAt": datetime,
            "updatedAt": datetime,
            "isActive": bool
        }

    def validate_job_posting(self, job_data):
        required_fields = ['title', 'companyId', 'description', 'requirements', 'package']
        return all(field in job_data for field in required_fields) 