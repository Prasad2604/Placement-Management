import React from 'react';
import SidebarComponent from '../Components/CompanySidebar';

export default function ActiveJobOpenings({ jobPosts, setJobPosts }) {
    // Function to handle the deletion of a job opening
    const handleDelete = (index) => {
        // Ask for confirmation before deleting the job opening
        const confirmed = window.confirm("Are you sure you want to delete this job opening?");
        
        if (confirmed) {
            // Remove the job opening from the list
            const updatedJobPosts = [...jobPosts];
            updatedJobPosts.splice(index, 1);
            setJobPosts(updatedJobPosts);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Sidebar */}
            <SidebarComponent activePage="activeJobs" />
            
            {/* Main content */}
            <div className="flex flex-1 flex-col p-4">
                <h1 className="text-3xl font-bold mb-4">Active Job Openings</h1>
                <ul className="space-y-4">
                    {jobPosts.map((job, index) => (
                        <li key={index} className="border rounded-md p-4 shadow-sm flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-bold">{job.jobTitle}</h2>
                                <p><strong>Company Name:</strong> {job.companyName}</p>
                                <p><strong>Salary (LPA):</strong> {job.salaryLPA}</p>
                                <p><strong>Application Deadline:</strong> {job.applicationDeadline}</p>
                            </div>
                            {/* Add the delete button */}
                            <button
                                onClick={() => handleDelete(index)}
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
