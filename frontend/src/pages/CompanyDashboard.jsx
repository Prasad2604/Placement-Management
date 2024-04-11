// import { Sidebar, Label, TextInput, Button, Select } from 'flowbite-react';
// import React, { useState } from 'react';
// import { FaHome } from 'react-icons/fa';
// import { FaLocationArrow } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

// export default function CompanyLanding() {
//     const [jobTitle, setJobTitle] = useState('');
//     const [companyName, setCompanyName] = useState('');
//     const [studentCount, setStudentCount] = useState('');
//     const [salaryLPA, setSalaryLPA] = useState('');
//     const [tech, setTech] = useState('');
//     const [branches, setBranches] = useState('All');
//     const [eligibilityCGPA, setEligibilityCGPA] = useState('');
//     const [eligibilityAmcat, setEligibilityAmcat] = useState('');
//     const [eligibilityBack, setEligibilityBack] = useState('');
//     const [driveMode, setDriveMode] = useState('Hybrid');
//     const [applicationDeadline, setApplicationDeadline] = useState('');
    
//     const [jobDescription, setJobDescription] = useState('');

//     const [jobPosts, setJobPosts] = useState([]);

// const handleCreateJobPost = (event) => {
//     event.preventDefault();

//     const newJobPost = {
//         jobTitle,
//         companyName,
//         driveMode,
//         studentCount,
//         salaryLPA,
//         tech,
//         branches,
//         eligibilityCGPA,
//         eligibilityAmcat,
//         eligibilityBack,
//         applicationDeadline,
//     };

//     setJobPosts((prevPosts) => [...prevPosts, newJobPost]);

//     // Reset form fields after creating the job post
//     setJobTitle('');
//     setCompanyName('');
//     setDriveMode('Hybrid');
//     setStudentCount('');
//     setSalaryLPA('');
//     setTech('');
//     setBranches('All');
//     setEligibilityCGPA('');
//     setEligibilityAmcat('');
//     setEligibilityBack('');
//     setApplicationDeadline('');
// };

//     const handleModeChange = (event) => {
//         setDriveMode(event.target.value);
//     };
//   const handleUpdateJobDescription = () => {
//     const description = `
//         Job Title: ${jobTitle}
//         Drive Mode: ${driveMode}
//         Student Count: ${studentCount}
//         Salary (LPA): ${salaryLPA}
//         Tech: ${tech}
//         Branches: ${branches}
//         Eligibility:
//             CGPA: ${eligibilityCGPA}
//             Amcat: ${eligibilityAmcat}
//             Back: ${eligibilityBack}
    
//     `;

//     setJobDescription(description);
// };

//     const handleJobTitleChange = (e) => setJobTitle(e.target.value);
//     const handleCompanyNameChange = (e) => setCompanyName(e.target.value);
//     const handleApplicationDeadlineChange = (e) => setApplicationDeadline(e.target.value);
//     const handleSalaryLPAChange = (e) => setSalaryLPA(e.target.value);
//     const handleTechChange = (e) => setTech(e.target.value);
//     const handleBranchesChange = (e) => setBranches(e.target.value);
//     const handleEligibilityCGPAChange = (e) => setEligibilityCGPA(e.target.value);
//     const handleEligibilityAmcatChange = (e) => setEligibilityAmcat(e.target.value);
//     const handleEligibilityBackChange = (e) => setEligibilityBack(e.target.value);
//     const handleStudentCountChange = (e) => setStudentCount(e.target.value);

//     return (
//         <div className="min-h-screen flex flex-col md:flex-row">
//             <div className="md:w-60 border-r border-gray-300">
//                 <div className="border-b border-gray-300 min-h-10">
//                     <h1 className="text-center">Company Name</h1>
//                 </div>

//                 <Sidebar className="w-full">
//                     <Sidebar.Items>
//                         <Sidebar.ItemGroup className="flex flex-col gap-1">
//                             <Link to="/">
//                                 <Sidebar.Item icon={FaHome} label="Home" labelColor="dark" as="div">
//                                     Home
//                                 </Sidebar.Item>
//                             </Link>
//                             <Link to="/companyhome">
//                                 <Sidebar.Item
//                                     icon={FaLocationArrow}
//                                     active
//                                     label="create"
//                                     labelColor="dark"
//                                     as="div"
//                                 >
//                                     Create Job Post
//                                 </Sidebar.Item>
//                             </Link>
//                             <Sidebar.Item
//                                 icon={FaLocationArrow}
//                                 // label="Active Job Openings"
//                                 labelColor="dark"
//                                 as="div"
//                             >
//                                 <Link to="/activejobopenings">Active Job Openings</Link>
//                             </Sidebar.Item>

//                         </Sidebar.ItemGroup>
//                     </Sidebar.Items>
//                 </Sidebar>
//             </div>
//             <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
//                 <div className="mb-4 border-b border-gray-300 min-h-10">
//                     <h1 className="text-3xl font-bold">Job Postings</h1>
//                 </div>
//                 <div className="flex items-center">
//                     <h1 className="font-semibold text-lg md:text-2xl">Create Job Posting</h1>
//                 </div>
//                 <div className="border shadow-sm rounded-lg">
//                     <form className="grid gap-4 p-4 md:grid-cols-2 md:gap-8">
//                         <div className="space-y-4">
//                             <div className="space-y-2">
//                                 <Label htmlFor="title">Job Title</Label>
//                                 <TextInput
//                                     id="title"
//                                     placeholder="Enter the job title"
//                                     required
//                                     onChange={handleJobTitleChange}
//                                 />
//                             </div>
//                             <div className="space-y-2">
//                                 <Label htmlFor="company">Company Name</Label>
//                                 <TextInput
//                                     id="company"
//                                     placeholder="Enter the company name"
//                                     required
//                                     onChange={handleCompanyNameChange}
//                                 />
//                             </div>
//                             <div className="space-y-2">
//                                 <Label htmlFor="mode">Drive Mode</Label>
//                                 <Select
//                                     id="mode"
//                                     value={driveMode}
//                                     onChange={handleModeChange}
//                                     aria-label="Select Drive Mode"
//                                     className="w-full bg-white border border-gray-300 rounded-md px-3 py-2"
//                                 >
//                                     <option value="Hybrid">Hybrid</option>
//                                     <option value="Virtual">Virtual</option>
//                                     <option value="On-site">On-site</option>
//                                     <option value="In-campus">In-campus</option>
//                                 </Select>
//                             </div>
//                             <div className="space-y-3">
//                                 <Label htmlFor="description" className="font-bold size-4">
//                                     Job Description
//                                 </Label>
//                                 <div className="space-y-2">
//                                     <Label htmlFor="studentCount">Student Count</Label>
//                                     <TextInput
//                                         id="studentCount"
//                                         placeholder="Enter student count"
//                                         value={studentCount}
//                                         onChange={handleStudentCountChange}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="space-y-2">
//                                     <Label htmlFor="salaryLPA">Salary (LPA)</Label>
//                                     <TextInput
//                                         id="salaryLPA"
//                                         placeholder="Enter salary (LPA)"
//                                         value={salaryLPA}
//                                         onChange={handleSalaryLPAChange}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="space-y-2">
//                                     <Label htmlFor="tech">Tech</Label>
//                                     <TextInput
//                                         id="tech"
//                                         placeholder="Enter technologies (comma-separated)"
//                                         value={tech}
//                                         onChange={handleTechChange}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="space-y-2">
//                                     <Label htmlFor="branches">Branches</Label>
//                                     <Select
//                                         id="branches"
//                                         value={branches}
//                                         onChange={handleBranchesChange}
//                                         required
//                                         className="form-select"
//                                     >
//                                         <option value="All">All</option>
//                                         <option value="Computer Engineering">Computer Engineering</option>
//                                         <option value="Information Technology">Information Technology</option>
//                                         <option value="Electronics and Telecommunication">Electronics and Telecommunication</option>
//                                     </Select>
//                                 </div>
//                                 <div className="space-y-2">
//                                     <Label htmlFor="eligibilityCGPA">Eligibility: CGPA</Label>
//                                     <TextInput
//                                         id="eligibilityCGPA"
//                                         placeholder="Enter minimum CGPA"
//                                         value={eligibilityCGPA}
//                                         onChange={handleEligibilityCGPAChange}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="space-y-2">
//                                     <Label htmlFor="eligibilityAmcat">Eligibility: Amcat</Label>
//                                     <TextInput
//                                         id="eligibilityAmcat"
//                                         placeholder="Enter minimum Amcat score"
//                                         value={eligibilityAmcat}
//                                         onChange={handleEligibilityAmcatChange}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="space-y-2">
//                                     <Label htmlFor="eligibilityBack">Eligibility: Back</Label>
//                                     <TextInput
//                                         id="eligibilityBack"
//                                         placeholder="Enter backlogs allowed"
//                                         value={eligibilityBack}
//                                         onChange={handleEligibilityBackChange}
//                                         required
//                                     />
//                                 </div>
//                                 <Button onClick={handleUpdateJobDescription}>
//                                     Update Job Description
//                                 </Button>
//                                 <div className="space-y-2">
//                                     <Label htmlFor="description">Job Description</Label>
//                                     <TextInput
//                                         id="description"
//                                         placeholder="Enter the job description"
//                                         value={jobDescription}
//                                         readOnly
//                                         required
//                                         className="bg-white border border-gray-300 rounded-md px-3 py-2"
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="space-y-4">
//                             <div className="space-y-2">
//                                 <Label htmlFor="deadline">Application Deadline</Label>
//                                 <TextInput
//                                     id="deadline"
//                                     placeholder="Enter the application deadline"
//                                     type="date"
//                                     required
//                                     onChange={handleApplicationDeadlineChange}
//                                 />
//                             </div>
//                             <div className="border border-gray-300 rounded-md p-4 h-[350px]">
//                                 <h2 className="font-semibold">Preview</h2>
//                                 <div className="mt-2">
//                                     <p><strong>Job Title:</strong> {jobTitle}</p>
//                                     <p><strong>Company Name:</strong> {companyName}</p>
//                                     <p><strong>Drive Mode:</strong> {driveMode}</p>
//                                     <p><strong>Student Count:</strong> {studentCount}</p>
//                                     <p><strong>Salary (LPA):</strong> {salaryLPA}</p>
//                                     <p><strong>Tech:</strong> {tech}</p>
//                                     <p><strong>Branches:</strong> {branches}</p>
//                                     <p><strong>Eligibility:</strong></p>
//                                     <p>&nbsp;&nbsp;&nbsp;CGPA: {eligibilityCGPA}</p>
//                                     <p>&nbsp;&nbsp;&nbsp;Amcat: {eligibilityAmcat}</p>
//                                     <p>&nbsp;&nbsp;&nbsp;Back: {eligibilityBack}</p>
//                                     <p><strong>Application Deadline:</strong> {applicationDeadline}</p>
//                                 </div>
//                             </div>
//                             <form className="grid gap-4 p-4 md:grid-cols-2 md:gap-8" onSubmit={handleCreateJobPost}>
//         {/* Form fields as before */}
//         <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
//             Create Job Post
//         </Button>
//     </form>
//                         </div>
                        
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

// import { Sidebar, Label, TextInput, Button, Select, Textarea } from 'flowbite-react';
// import React, { useState } from 'react';
// import { FaHome, FaLocationArrow } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

// export default function CompanyLanding() {
//     const [formData, setFormData] = useState({
//         jobTitle: '',
//         companyName: '',
//         driveMode: 'Hybrid',
//         studentCount: '',
//         salaryLPA: '',
//         tech: '',
//         branches: 'All',
//         eligibilityCGPA: '',
//         eligibilityAmcat: '',
//         eligibilityBack: '',
//         applicationDeadline: '',
//         jobDescription: ''
//     });

//     const [jobPosts, setJobPosts] = useState([]);

//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value
//         }));
//     };

//     const handleCreateJobPost = (event) => {
//         event.preventDefault();

//         // Add the new job post to the state
//         setJobPosts((prevPosts) => [...prevPosts, formData]);

//         // Reset the form fields
//         setFormData({
//             jobTitle: '',
//             companyName: '',
//             driveMode: 'Hybrid',
//             studentCount: '',
//             salaryLPA: '',
//             tech: '',
//             branches: 'All',
//             eligibilityCGPA: '',
//             eligibilityAmcat: '',
//             eligibilityBack: '',
//             applicationDeadline: '',
//             jobDescription: ''
//         });
//     };

//     const handleUpdateJobDescription = () => {
//         const description = `
//             Job Title: ${formData.jobTitle}
//             Drive Mode: ${formData.driveMode}
//             Student Count: ${formData.studentCount}
//             Salary (LPA): ${formData.salaryLPA}
//             Tech: ${formData.tech}
//             Branches: ${formData.branches}
//             Eligibility:
//                 CGPA: ${formData.eligibilityCGPA}
//                 Amcat: ${formData.eligibilityAmcat}
//                 Back: ${formData.eligibilityBack}
//             Application Deadline: ${formData.applicationDeadline}
//         `;
//         setFormData((prevData) => ({
//             ...prevData,
//             jobDescription: description
//         }));
//     };

//     return (
//         <div className="min-h-screen flex flex-col md:flex-row">
//             {/* Sidebar */}
//             <div className="md:w-60 border-r border-gray-300">
//                 <div className="border-b border-gray-300 min-h-10">
//                     <h1 className="text-center">Company Name</h1>
//                 </div>

//                 <Sidebar className="w-full">
//                     <Sidebar.Items>
//                         <Sidebar.ItemGroup className="flex flex-col gap-1">
//                             <Link to="/">
//                                 <Sidebar.Item icon={FaHome} label="Home" labelColor="dark" as="div">
//                                     Home
//                                 </Sidebar.Item>
//                             </Link>
//                             <Link to="/companyhome">
//                                 <Sidebar.Item
//                                     icon={FaLocationArrow}
//                                     active
//                                     label="Create Job Post"
//                                     labelColor="dark"
//                                     as="div"
//                                 >
//                                     Create Job Post
//                                 </Sidebar.Item>
//                             </Link>
//                             <Link to="/activejobopenings">
//                                 <Sidebar.Item
//                                     icon={FaLocationArrow}
//                                     label="Active Job Openings"
//                                     labelColor="dark"
//                                     as="div"
//                                 >
//                                     Active Job Openings
//                                 </Sidebar.Item>
//                             </Link>
//                         </Sidebar.ItemGroup>
//                     </Sidebar.Items>
//                 </Sidebar>
//             </div>

//             {/* Main Content */}
//             <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
//                 <div className="mb-4 border-b border-gray-300 min-h-10">
//                     <h1 className="text-3xl font-bold">Job Postings</h1>
//                 </div>
//                 <div className="flex items-center">
//                     <h1 className="font-semibold text-lg md:text-2xl">Create Job Posting</h1>
//                 </div>
//                 <div className="border shadow-sm rounded-lg">
//                     <form onSubmit={handleCreateJobPost} className="grid gap-4 p-4 md:grid-cols-2 md:gap-8">
//                         {/* Left Column */}
//                         <div className="space-y-4">
//                             {/* Job Title */}
//                             <div className="space-y-2">
//                                 <Label htmlFor="jobTitle">Job Title</Label>
//                                 <TextInput
//                                     id="jobTitle"
//                                     name="jobTitle"
//                                     placeholder="Enter the job title"
//                                     value={formData.jobTitle}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             {/* Company Name */}
//                             <div className="space-y-2">
//                                 <Label htmlFor="companyName">Company Name</Label>
//                                 <TextInput
//                                     id="companyName"
//                                     name="companyName"
//                                     placeholder="Enter the company name"
//                                     value={formData.companyName}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             {/* Drive Mode */}
//                             <div className="space-y-2">
//                                 <Label htmlFor="driveMode">Drive Mode</Label>
//                                 <Select
//                                     id="driveMode"
//                                     name="driveMode"
//                                     value={formData.driveMode}
//                                     onChange={handleChange}
//                                     required
//                                 >
//                                     <option value="Hybrid">Hybrid</option>
//                                     <option value="Virtual">Virtual</option>
//                                     <option value="On-site">On-site</option>
//                                     <option value="In-campus">In-campus</option>
//                                 </Select>
//                             </div>
//                             {/* Student Count */}
//                             <div className="space-y-2">
//                                 <Label htmlFor="studentCount">Student Count</Label>
//                                 <TextInput
//                                     id="studentCount"
//                                     name="studentCount"
//                                     type="number"
//                                     placeholder="Enter student count"
//                                     value={formData.studentCount}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             {/* Salary (LPA) */}
//                             <div className="space-y-2">
//                                 <Label htmlFor="salaryLPA">Salary (LPA)</Label>
//                                 <TextInput
//                                     id="salaryLPA"
//                                     name="salaryLPA"
//                                     type="number"
//                                     placeholder="Enter salary (LPA)"
//                                     value={formData.salaryLPA}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             {/* Tech */}
//                             <div className="space-y-2">
//                                 <Label htmlFor="tech">Tech</Label>
//                                 <TextInput
//                                     id="tech"
//                                     name="tech"
//                                     placeholder="Enter technologies (comma-separated)"
//                                     value={formData.tech}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             {/* Branches */}
//                             <div className="space-y-2">
//                                 <Label htmlFor="branches">Branches</Label>
//                                 <Select
//                                     id="branches"
//                                     name="branches"
//                                     value={formData.branches}
//                                     onChange={handleChange}
//                                     required
//                                 >
//                                     <option value="All">All</option>
//                                     <option value="Computer Engineering">Computer Engineering</option>
//                                     <option value="Information Technology">Information Technology</option>
//                                     <option value="Electronics and Telecommunication">Electronics and Telecommunication</option>
//                                 </Select>
//                             </div>
//                         </div>
//                         {/* Right Column */}
//                         <div className="space-y-4">
//                             {/* Eligibility CGPA */}
//                             <div className="space-y-2">
//                                 <Label htmlFor="eligibilityCGPA">Eligibility CGPA</Label>
//                                 <TextInput
//                                     id="eligibilityCGPA"
//                                     name="eligibilityCGPA"
//                                     type="number"
//                                     step="0.1"
//                                     placeholder="Enter minimum CGPA"
//                                     value={formData.eligibilityCGPA}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             {/* Eligibility Amcat */}
//                             <div className="space-y-2">
//                                 <Label htmlFor="eligibilityAmcat">Eligibility Amcat</Label>
//                                 <TextInput
//                                     id="eligibilityAmcat"
//                                     name="eligibilityAmcat"
//                                     type="number"
//                                     placeholder="Enter minimum Amcat score"
//                                     value={formData.eligibilityAmcat}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             {/* Eligibility Back */}
//                             <div className="space-y-2">
//                                 <Label htmlFor="eligibilityBack">Eligibility Back</Label>
//                                 <TextInput
//                                     id="eligibilityBack"
//                                     name="eligibilityBack"
//                                     type="number"
//                                     placeholder="Enter maximum number of backlogs allowed"
//                                     value={formData.eligibilityBack}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             {/* Application Deadline */}
//                             <div className="space-y-2">
//                                 <Label htmlFor="applicationDeadline">Application Deadline</Label>
//                                 <TextInput
//                                     id="applicationDeadline"
//                                     name="applicationDeadline"
//                                     type="date"
//                                     value={formData.applicationDeadline}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             {/* Job Description */}
//                             <div className="space-y-2">
//                                 <Label htmlFor="jobDescription">Job Description</Label>
//                                 <Textarea
//                                     id="jobDescription"
//                                     name="jobDescription"
//                                     placeholder="Generated job description..."
//                                     value={formData.jobDescription}
//                                     onChange={handleChange}
//                                     required
//                                     readOnly
//                                 />
//                             </div>
//                             {/* Update Job Description Button */}
//                             <div className="flex justify-center">
//                                 <Button
//                                     type="button"
//                                     onClick={handleUpdateJobDescription}
                      
//                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
//                                 >
//                                     Update Job Description
//                                 </Button>
//                             </div>
//                         </div>
//                         {/* Submit Button */}
//                         <div className="col-span-2 flex justify-center">
//                             <Button
//                                type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
//                             >
//                                 Create Job Post
//                             </Button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// }

import React, { useState } from 'react';
import { Sidebar, Label, TextInput, Button, Select, Textarea } from 'flowbite-react';
import { FaHome, FaLocationArrow } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function CompanyLanding({ jobPosts, setJobPosts }) {
    // Initialize formData with an empty form
    const [formData, setFormData] = useState({
        jobTitle: '',
        companyName: '',
        driveMode: 'Hybrid',
        studentCount: '',
        salaryLPA: '',
        tech: '',
        branches: 'All',
        eligibilityCGPA: '',
        eligibilityAmcat: '',
        eligibilityBack: '',
        applicationDeadline: '',
        jobDescription: ''
    });

    // Handle form changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle job post creation
    const handleCreateJobPost = (event) => {
        event.preventDefault();

        // Update job posts array using setJobPosts from props
        setJobPosts((prevPosts) => [...prevPosts, formData]);

        // Reset form fields
        setFormData({
            jobTitle: '',
            companyName: '',
            driveMode: 'Hybrid',
            studentCount: '',
            salaryLPA: '',
            tech: '',
            branches: 'All',
            eligibilityCGPA: '',
            eligibilityAmcat: '',
            eligibilityBack: '',
            applicationDeadline: '',
            jobDescription: '',
        });
    };

    // Generate job description based on form data
    const generateJobDescription = () => {
        return `
            Job Title: ${formData.jobTitle}
            Company Name: ${formData.companyName}
            Drive Mode: ${formData.driveMode}
            Student Count: ${formData.studentCount}
            Salary (LPA): ${formData.salaryLPA}
            Tech: ${formData.tech}
            Branches: ${formData.branches}
            Eligibility CGPA: ${formData.eligibilityCGPA}
            Eligibility Amcat: ${formData.eligibilityAmcat}
            Eligibility Back: ${formData.eligibilityBack}
            Application Deadline: ${formData.applicationDeadline}
        `;
    };

    // Update job description when the button is clicked
    const handleUpdateJobDescription = () => {
        const description = generateJobDescription();
        setFormData((prevData) => ({
            ...prevData,
            jobDescription: description,
        }));
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="md:w-60 border-r border-gray-300">
                <div className="border-b border-gray-300 min-h-10">
                    <h1 className="text-center">Company Name</h1>
                </div>

                <Sidebar className="w-full">
                    <Sidebar.Items>
                        <Sidebar.ItemGroup className="flex flex-col gap-1">
                            <Link to="/">
                                <Sidebar.Item icon={FaHome} label="Home" labelColor="dark">
                                    Home
                                </Sidebar.Item>
                            </Link>
                            <Link to="/companyhome">
                                <Sidebar.Item icon={FaLocationArrow} active label="Create Job Post" labelColor="dark">
                                    Create Job Post
                                </Sidebar.Item>
                            </Link>
                            <Link to="/activejobopenings">
                                <Sidebar.Item icon={FaLocationArrow} label="Active Job Openings" labelColor="dark">
                                    Active Job Openings
                                </Sidebar.Item>
                            </Link>
                        </Sidebar.ItemGroup>
                    </Sidebar.Items>
                </Sidebar>
            </div>

            {/* Main Content */}
            <div className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                <div className="mb-4 border-b border-gray-300 min-h-10">
                    <h1 className="text-3xl font-bold">Job Postings</h1>
                </div>
                
                <div className="flex items-center">
                    <h1 className="font-semibold text-lg md:text-2xl">Create Job Posting</h1>
                </div>
                
                <div className="border shadow-sm rounded-lg">
                    <form onSubmit={handleCreateJobPost} className="grid gap-4 p-4 md:grid-cols-2 md:gap-8">
                        {/* Left Column */}
                        <div className="space-y-4">
                            {/* Job Title */}
                            <div className="space-y-2">
                                <Label htmlFor="jobTitle">Job Title</Label>
                                <TextInput
                                    id="jobTitle"
                                    name="jobTitle"
                                    placeholder="Enter the job title"
                                    value={formData.jobTitle}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            
                            {/* Company Name */}
                            <div className="space-y-2">
                                <Label htmlFor="companyName">Company Name</Label>
                                <TextInput
                                    id="companyName"
                                    name="companyName"
                                    placeholder="Enter the company name"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            
                            {/* Drive Mode */}
                            <div className="space-y-2">
                                <Label htmlFor="driveMode">Drive Mode</Label>
                                <Select
                                    id="driveMode"
                                    name="driveMode"
                                    value={formData.driveMode}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="Hybrid">Hybrid</option>
                                    <option value="Virtual">Virtual</option>
                                    <option value="On-site">On-site</option>
                                    <option value="In-campus">In-campus</option>
                                </Select>
                            </div>
                            
                            {/* Student Count */}
                            <div className="space-y-2">
                                <Label htmlFor="studentCount">Student Count</Label>
                                <TextInput
                                    id="studentCount"
                                    name="studentCount"
                                    type="number"
                                    placeholder="Enter student count"
                                    value={formData.studentCount}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            
                            {/* Salary (LPA) */}
                            <div className="space-y-2">
                                <Label htmlFor="salaryLPA">Salary (LPA)</Label>
                                <TextInput
                                    id="salaryLPA"
                                    name="salaryLPA"
                                    type="number"
                                    placeholder="Enter salary (LPA)"
                                    value={formData.salaryLPA}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            
                            {/* Tech */}
                            <div className="space-y-2">
                                <Label htmlFor="tech">Tech</Label>
                                <TextInput
                                    id="tech"
                                    name="tech"
                                    placeholder="Enter technologies (comma-separated)"
                                    value={formData.tech}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            
                            {/* Branches */}
                            <div className="space-y-2">
                                <Label htmlFor="branches">Branches</Label>
                                <Select
                                    id="branches"
                                    name="branches"
                                    value={formData.branches}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="All">All</option>
                                    <option value="Computer Engineering">Computer Engineering</option>
                                    <option value="Information Technology">Information Technology</option>
                                    <option value="Electronics and Telecommunication">Electronics and Telecommunication</option>
                                </Select>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                            {/* Eligibility CGPA */}
                            <div className="space-y-2">
                                <Label htmlFor="eligibilityCGPA">Eligibility CGPA</Label>
                                <TextInput
                                    id="eligibilityCGPA"
                                    name="eligibilityCGPA"
                                    type="number"
                                    step="0.1"
                                    placeholder="Enter minimum CGPA"
                                    value={formData.eligibilityCGPA}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            
                            {/* Eligibility Amcat */}
                            <div className="space-y-2">
                                <Label htmlFor="eligibilityAmcat">Eligibility Amcat</Label>
                                <TextInput
                                    id="eligibilityAmcat"
                                    name="eligibilityAmcat"
                                    type="number"
                                    placeholder="Enter minimum Amcat score"
                                    value={formData.eligibilityAmcat}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            
                            {/* Eligibility Back */}
                            <div className="space-y-2">
                                <Label htmlFor="eligibilityBack">Eligibility Back</Label>
                                <TextInput
                                    id="eligibilityBack"
                                    name="eligibilityBack"
                                    type="number"
                                    placeholder="Enter maximum number of backlogs allowed"
                                    value={formData.eligibilityBack}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            
                            {/* Application Deadline */}
                            <div className="space-y-2">
                                <Label htmlFor="applicationDeadline">Application Deadline</Label>
                                <TextInput
                                    id="applicationDeadline"
                                    name="applicationDeadline"
                                    type="date"
                                    value={formData.applicationDeadline}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            
                            {/* Job Description */}
                            <div className="space-y-2">
                                <Label htmlFor="jobDescription">Job Description</Label>
                                <Textarea
                                    id="jobDescription"
                                    name="jobDescription"
                                    placeholder="Generated job description..."
                                    value={formData.jobDescription}
                                    onChange={handleChange}
                                    required
                                    readOnly
                                />
                            </div>
                            
                            {/* Update Job Description Button */}
                            <div className="flex justify-center">
                                <Button
                                    type="button"
                                    onClick={handleUpdateJobDescription}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
                                >
                                    Update Job Description
                                </Button>
                            </div>
                        </div>
                        
                        {/* Submit Button */}
                        <div className="col-span-2 flex justify-center">
                            <Button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full"
                            >
                                Create Job Post
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

