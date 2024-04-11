import { Sidebar } from 'flowbite-react';
import { FaHome, FaLocationArrow } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function SidebarComponent({ activePage }) {
    return (
        <div className="md:w-60 border-r border-gray-300">
            <div className="border-b border-gray-300 min-h-10">
                <h1 className="text-center">Company Name</h1>
            </div>

            <Sidebar className="w-full">
                <Sidebar.Items>
                    <Sidebar.ItemGroup className="flex flex-col gap-1">
                        <Link to="/">
                            <Sidebar.Item
                                icon={FaHome}
                                label="Home"
                                labelColor="dark"
                                as="div"
                                active={activePage === 'home'}
                            >
                                Home
                            </Sidebar.Item>
                        </Link>
                        <Link to="/companyhome">
                            <Sidebar.Item
                                icon={FaLocationArrow}
                                label="Create Job Post"
                                labelColor="dark"
                                as="div"
                                active={activePage === 'createJob'}
                            >
                                Create Job Post
                            </Sidebar.Item>
                        </Link>
                        <Link to="/activejobopenings">
                            <Sidebar.Item
                                icon={FaLocationArrow}
                                label="Active Job Openings"
                                labelColor="dark"
                                as="div"
                                active={activePage === 'activeJobs'}
                            >
                                Active Job Openings
                            </Sidebar.Item>
                        </Link>
                    </Sidebar.ItemGroup>
                </Sidebar.Items>
            </Sidebar>
        </div>
    );
}
