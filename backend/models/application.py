from datetime import datetime

class Application:
    def __init__(self):
        self.schema = {
            "studentId": str,  # Reference to student
            "jobId": str,  # Reference to job posting
            "status": str,  # Applied/Shortlisted/Rejected/Selected
            "resume": str,  # URL to resume
            "coverLetter": str,
            "roundStatus": [
                {
                    "roundId": str,
                    "status": str,  # Pending/Passed/Failed
                    "score": float,
                    "feedback": str,
                    "interviewDate": datetime,
                    "interviewer": str
                }
            ],
            "documents": dict,  # Any additional documents required
            "createdAt": datetime,
            "updatedAt": datetime
        }

    def validate_application(self, application_data):
        required_fields = ['studentId', 'jobId', 'resume']
        return all(field in application_data for field in required_fields) 