import React, { useEffect,useState } from 'react'
import { useLocation,Link } from 'react-router-dom'
import { Button,Label,TextInput } from 'flowbite-react';
import { FaLinkedin } from 'react-icons/fa';
import axios from 'axios'; 
// import {}

export default function CompanyLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://127.0.0.1:5000/login/company', {
        email: email,
        password: password
      });
      
      // Check if response status is OK
      if (response.status === 200) {
        // Handle successful login
        console.log(response.data);
        window.location.href="/companyhome"
      }
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
        <div className="flex-1 justify-center mt-[10%] space-y-5 text-center">
          <div className="space-y-2">
            <h1 className='text-2xl text-blue-500 font-semibold'>Sign-in to PICT PUNE Placement Portal</h1>
            <div className="flex justify-evenly cursor-pointer">
              <Link to='/signin'>
                <span className=' hover:text-blue-500'>Student</span>
              </Link>
              <Link to={'/company'}>
              <span className=' hover:text-blue-500'>Company</span>
              </Link>
              <Link to='/coordinator'>
              <span className=' hover:text-blue-500'>Coordinator</span>
              </Link>
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <form className='flex flex-col gap-5 justify-center items-center' onSubmit={handleSubmit}>
            <div className="max-w-[500px] w-[500px]">
                <Label value="Your Email"/>
                  <TextInput
                    type="text"
                    placeholder="example@gmail.com"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                  />
              </div>
              <div className="max-w-[500px] w-[500px]">
                <Label value="Your password"/>
                  <TextInput
                    type="password"
                    placeholder="*******"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                  />
              </div>
              <div className="flex-1 justify-center space-y-2">
              {/* <h1>OR</h1> */}
              <Button className='  ml-[47%] hover:bg-white ' gradientDuoTone='pinkToOrange' outline type="submit">Login</Button>
            </div>
            </form>
            
            <div className="flex-1 justify-center space-y-2">
              <h1>OR</h1>
              <div className="flex">
                
                
                <Button className=' ml-[42%] max-w-[500px]' gradientDuoTone='pinkToOrange' outline>
                <FaLinkedin className='w-4 h-4 mr-2'/>
                  Continue with Linkdin
                  </Button>
              </div>
            </div>
            <div className="flex gap-2 justify-center">
              <p >Don't have an account?</p>
              <Link to='/register/company'>
                <span className='text-blue-500 cursor-pointer'>Register now</span>
              </Link>
            </div>  
          </div>
        </div>

      </div>
    </div>
    </>
  )
}