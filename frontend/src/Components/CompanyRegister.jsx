import React, { useEffect,useState } from 'react'
import { useLocation,Link } from 'react-router-dom'
import { Button,Label,TextInput } from 'flowbite-react';
import { FaLinkedin } from 'react-icons/fa';
import axios from "axios"

export default function CompanyRegister() {
  const [companyName, setCompanyName] = useState('');
  const [username, setUsername] = useState('');
  const [drive, setDrive] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://127.0.0.1:5000/register-company', {
        name: companyName,
        username: username,
        drive: drive,
        email: email,
        password: password,
        confirm: confirm
      });
      
      // Handle response from the server (e.g., registration success or failure)
      console.log(response.data);
      // window.location.href='/company'
    } catch (error) {
      
      if (error.response) {
        
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
    }
  };

  return (
    <>
    <div className="max-h-screen">
      {/* <h1 className='text-4xl text-black font-semibold'>Login Page</h1> */}
      <div className="flex">
        {/* Left */}
        <div className="flex-1 space-y-10 max-w-[30%] w-full h-screen bg-[#387ADF]">
            <div className="ml-[10%] mt-[10%] space-y-1">
              <h1 className='text-white font-semibold'>PICT Placement</h1>
              <h1 className='text-3xl font-semibold'>One stop portal for</h1>
              <h1 className='text-3xl font-semibold'>students & companies for</h1>
              <h1 className='text-3xl font-semibold'>placements.</h1>
            </div>
            <div className="space-y-10">
              <div className="flex justify-center">
                <img src="/img/PICT_logo_1.png" alt="PICT_LOGO"/>
              </div>
              <div className="ml-[10%]">
                <h1 className='text-black font-bold text-2xl'>Instructions</h1>
                <p className='text-black font-semibold'>Login using your institute roll number.</p>
              </div>
            </div>
        </div>
        {/* Right */}
        <div className="flex-1 justify-center mt-[7%] space-y-5 text-center">
          <div className="space-y-2">
            <h1 className='text-2xl text-blue-500 font-semibold'>Register your company to PICT PUNE Placement Portal</h1>
            
          </div>
          <div className="flex-1 space-y-4">
            <form className='flex flex-col gap-5 justify-center items-center' onSubmit={handleSubmit}>
            <div className="max-w-[500px] w-[500px]">
                <Label value="Name of Company"/>
                <TextInput
                  type="text"
                  placeholder="Company Name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              <div className="max-w-[500px] w-[500px]">
                <Label value="Username"/>
                <TextInput
                  type="text"
                  placeholder="company@123"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="max-w-[500px] w-[500px]">
                <Label value="Drive mode"/>
                <TextInput
                  type="text"
                  placeholder="Hybrid/Online/Offline"
                  value={drive}
                  onChange={(e) => setDrive(e.target.value)}
                />
              </div>
              <div className="max-w-[500px] w-[500px]">
                <Label value="First Contact Person Email"/>
                <TextInput
                  type="email"
                  placeholder="example@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="max-w-[500px] w-[500px]">
                <Label value="Password (Minimum 8 characters)"/>
                <TextInput
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="max-w-[500px] w-[500px]">
                <Label value="Confirm Password"/>
                <TextInput
                  type="password"
                  placeholder="********"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
              </div>
              <div className="flex-1 justify-center space-y-2">
              {/* <h1>OR</h1> */}
              <Button className=' ml-[46%] max-w-[500px]' gradientDuoTone='pinkToOrange' outline type="submit">Register</Button>
            </div>
            </form>
            
            <div className="flex-1 justify-center space-y-2">
              <h1>OR</h1>
              <Button className=' ml-[42%] max-w-[500px]' gradientDuoTone='pinkToOrange' outline>
              <FaLinkedin className='w-4 h-4 mr-2'/>
                Continue with Linkdin</Button>
            </div>
            <div className="flex gap-2 justify-center">
              <p >Already have an account?</p>
              <Link to='/company'>
                <span className='text-blue-500 cursor-pointer'>Login</span>
              </Link>
            </div>  
          </div>
        </div>

      </div>
    </div>
    </>
  )
}