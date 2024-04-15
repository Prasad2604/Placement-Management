import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { companyId } = useParams();
  const [company, setCompany] = useState(null);
  const token=sessionStorage.getItem('jwtToken')

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/single1`, {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        });
        setCompany(response.data.Userinfo);
      } catch (error) {
        console.error('Error fetching company details:', error);
      }
    };

    fetchCompanyDetails();
  },[]);

  const handleDelete = async (jobTitle) => {
    try {
       const name=encodeURIComponent(jobTitle)
      const response = await axios.delete(`http://127.0.0.1:5000/delete/${name}`, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      console.log('Item deleted successfully');
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
  const handleUpdate = async (jobTitle) => {
    try {
       const name=encodeURIComponent(jobTitle)
      const response = await axios.get(`http://127.0.0.1:5000/title/${name}`, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  if (!company) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="bg-grey-100 min-h-screen px-4 py-8">
      <Link to="/companyhome" className="text-sm bg-black hover:bg-blue-600 text-white font-semibold py-1 px-4 mr-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500">
        Back
      </Link>

      <div className="container mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-center mb-8">Company Details</h1>
        <div className="bg-white rounded shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2">{company["Company_name"]}</h2>
          <p className="text-gray-600 mb-4">Drive mode: {company["Drive_mode"]}</p>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Jobs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(company.Jobs).map(([jobTitle, jobData]) => (
                <div key={jobTitle} className="bg-gray-200 rounded shadow-md p-4">
                  <h4 className="text-lg font-semibold mb-1">{jobTitle}</h4>
                  <p className="text-gray-600 mb-1">Student count: {jobData.Student_count}</p>
                  <p className="text-gray-600 mb-1">Salary (LPA): {jobData["Salary(LPA)"]}</p>
                  <p className="text-gray-600 mb-1">Tech Stack: {jobData['Tech']}</p>
                  <p className="text-gray-600 mb-1">Eligibility:</p>
                  <ul className="list-disc pl-4 mb-1">
                    <li>CGPA: {jobData.Eligibility.CGPA}</li>
                    <li>Amcat: {jobData.Eligibility.Amcat}</li>
                    <li>Backlog: {jobData.Eligibility.Back}</li>
                  </ul>
                  <p className="text-gray-600 mb-1">Branches: {jobData.Branches}</p>
                  <button onClick={() => handleDelete(jobTitle)}
                    className="text-sm mr-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Delete
                  </button>
                  <Link to='/students'
                    className="text-sm bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Applied students
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
