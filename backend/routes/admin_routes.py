from flask import Blueprint, request, jsonify
from middleware.auth_middleware import admin_required
from datetime import datetime
from bson import ObjectId
from flask_jwt_extended import get_jwt_identity

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/companies', methods=['GET'])
@admin_required
def get_companies():
    try:
        companies = list(request.db.company.find({}, {
            'password': 0  # Exclude password field
        }))
        for company in companies:
            company['_id'] = str(company['_id'])
        return jsonify({"companies": companies})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@admin_bp.route('/companies/<company_id>/approve', methods=['POST'])
@admin_required
def approve_company(company_id):
    try:
        result = request.db.company.update_one(
            {"_id": ObjectId(company_id)},
            {"$set": {"status": "approved", "updatedAt": datetime.utcnow()}}
        )
        if result.modified_count:
            return jsonify({"message": "Company approved successfully"})
        return jsonify({"message": "Company not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@admin_bp.route('/companies/<company_id>/reject', methods=['POST'])
@admin_required
def reject_company(company_id):
    try:
        result = request.db.company.update_one(
            {"_id": ObjectId(company_id)},
            {"$set": {"status": "rejected", "updatedAt": datetime.utcnow()}}
        )
        if result.modified_count:
            return jsonify({"message": "Company rejected successfully"})
        return jsonify({"message": "Company not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@admin_bp.route('/students', methods=['GET'])
@admin_required
def get_students():
    try:
        students = list(request.db.students.find({}, {
            'password': 0  # Exclude password field
        }))
        for student in students:
            student['_id'] = str(student['_id'])
        return jsonify({"students": students})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@admin_bp.route('/jobs', methods=['GET'])
@admin_required
def get_jobs():
    try:
        jobs = list(request.db.job_postings.find({}))
        for job in jobs:
            job['_id'] = str(job['_id'])
            if 'companyId' in job:
                job['companyId'] = str(job['companyId'])
        return jsonify({"jobs": jobs})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@admin_bp.route('/jobs/<job_id>/approve', methods=['POST'])
@admin_required
def approve_job(job_id):
    try:
        result = request.db.job_postings.update_one(
            {"_id": ObjectId(job_id)},
            {"$set": {"status": "approved", "updatedAt": datetime.utcnow()}}
        )
        if result.modified_count:
            return jsonify({"message": "Job posting approved successfully"})
        return jsonify({"message": "Job posting not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@admin_bp.route('/jobs/<job_id>/reject', methods=['POST'])
@admin_required
def reject_job(job_id):
    try:
        result = request.db.job_postings.update_one(
            {"_id": ObjectId(job_id)},
            {"$set": {"status": "rejected", "updatedAt": datetime.utcnow()}}
        )
        if result.modified_count:
            return jsonify({"message": "Job posting rejected successfully"})
        return jsonify({"message": "Job posting not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@admin_bp.route('/placements', methods=['GET'])
@admin_required
def get_placements():
    try:
        placements = list(request.db.placements.find({}))
        for placement in placements:
            placement['_id'] = str(placement['_id'])
            placement['studentId'] = str(placement['studentId'])
            placement['companyId'] = str(placement['companyId'])
        return jsonify({"placements": placements})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@admin_bp.route('/placement-stats', methods=['GET'])
@admin_required
def get_placement_stats():
    try:
        stats = {
            "totalPlacements": request.db.placements.count_documents({}),
            "totalCompanies": request.db.company.count_documents({"status": "approved"}),
            "totalStudents": request.db.students.count_documents({}),
            "placedStudents": request.db.students.count_documents({"placementStatus": "placed"})
        }
        return jsonify({"stats": stats})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@admin_bp.route('/notices', methods=['GET'])
@admin_required
def get_notices():
    try:
        notices = list(request.db.notices.find({}))
        for notice in notices:
            notice['_id'] = str(notice['_id'])
        return jsonify({"notices": notices})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@admin_bp.route('/notices', methods=['POST'])
@admin_required
def create_notice():
    try:
        data = request.json
        if not data.get('title') or not data.get('content'):
            return jsonify({"message": "Title and content are required"}), 400

        notice = {
            "title": data['title'],
            "content": data['content'],
            "priority": data.get('priority', 'normal'),
            "targetAudience": data.get('targetAudience', 'all'),
            "createdAt": datetime.utcnow()
        }
        
        result = request.db.notices.insert_one(notice)
        return jsonify({
            "message": "Notice created successfully",
            "noticeId": str(result.inserted_id)
        }), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@admin_bp.route('/notices/<notice_id>', methods=['DELETE'])
@admin_required
def delete_notice(notice_id):
    try:
        result = request.db.notices.delete_one({"_id": ObjectId(notice_id)})
        if result.deleted_count:
            return jsonify({"message": "Notice deleted successfully"})
        return jsonify({"message": "Notice not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@admin_bp.route('/schedules', methods=['GET'])
@admin_required
def get_schedules():
    try:
        schedules = list(request.db.schedules.find({}))
        for schedule in schedules:
            schedule['_id'] = str(schedule['_id'])
            schedule['companyId'] = str(schedule['companyId'])
        return jsonify({"schedules": schedules})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@admin_bp.route('/schedules', methods=['POST'])
@admin_required
def create_schedule():
    try:
        data = request.json
        if not all(k in data for k in ['companyId', 'date', 'time', 'venue']):
            return jsonify({"message": "Missing required fields"}), 400

        schedule = {
            "companyId": ObjectId(data['companyId']),
            "date": datetime.strptime(data['date'], '%Y-%m-%d'),
            "time": datetime.strptime(data['time'], '%H:%M').time(),
            "venue": data['venue'],
            "description": data.get('description', ''),
            "createdAt": datetime.utcnow()
        }
        
        result = request.db.schedules.insert_one(schedule)
        return jsonify({
            "message": "Schedule created successfully",
            "scheduleId": str(result.inserted_id)
        }), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@admin_bp.route('/schedules/<schedule_id>', methods=['DELETE'])
@admin_required
def delete_schedule(schedule_id):
    try:
        result = request.db.schedules.delete_one({"_id": ObjectId(schedule_id)})
        if result.deleted_count:
            return jsonify({"message": "Schedule deleted successfully"})
        return jsonify({"message": "Schedule not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@admin_bp.route('/dashboard', methods=['GET'])
@admin_required
def get_dashboard():
    try:
        current_user = get_jwt_identity()
        
        # Get dashboard statistics
        stats = {
            "totalPlacements": request.db.placements.count_documents({}),
            "totalCompanies": request.db.company.count_documents({"status": "approved"}),
            "totalStudents": request.db.students.count_documents({}),
            "placedStudents": request.db.students.count_documents({"placementStatus": "placed"}),
            "pendingCompanies": request.db.company.count_documents({"status": "pending"}),
            "activeJobs": request.db.job_postings.count_documents({"status": "approved"})
        }
        
        # Get recent activities
        recent_placements = list(request.db.placements.find().sort("createdAt", -1).limit(5))
        recent_companies = list(request.db.company.find({"status": "pending"}).sort("createdAt", -1).limit(5))
        recent_jobs = list(request.db.job_postings.find().sort("createdAt", -1).limit(5))
        
        # Convert ObjectIds to strings
        for placement in recent_placements:
            placement['_id'] = str(placement['_id'])
            placement['studentId'] = str(placement['studentId'])
            placement['companyId'] = str(placement['companyId'])
            
        for company in recent_companies:
            company['_id'] = str(company['_id'])
            
        for job in recent_jobs:
            job['_id'] = str(job['_id'])
            if 'companyId' in job:
                job['companyId'] = str(job['companyId'])
        
        return jsonify({
            "message": "Admin dashboard data",
            "stats": stats,
            "recentActivities": {
                "placements": recent_placements,
                "pendingCompanies": recent_companies,
                "recentJobs": recent_jobs
            }
        }), 200
    except Exception as e:
        return jsonify({"message": "Error", "error": str(e)}), 500 