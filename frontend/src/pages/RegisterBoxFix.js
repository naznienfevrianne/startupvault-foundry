import * as React from "react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function RegisterBoxFix(props) {
    const storedEmail = localStorage.getItem("email") || '';
    const storedPassword = localStorage.getItem("password") || '';
    const [email, setEmail] = useState(storedEmail);
    const [password, setPassword] = useState(storedPassword);
    const [errorMessage, setErrorMessage] = useState(' ');
    const navigate = useNavigate();

    function checkEmail(email) {
      // Regular expression for validating email addresses
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }
    

    const handleCreateAccount = async () => {
    let isValidEmail = false
    let emailIsUnique = false;
    let hasUppercase = false;
    let hasLowercase = false;
    let hasNumber = false;
    const response = await fetch("https://startupvault-foundry.vercel.app/auth/checkEmail/", {
      method:'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify ({
        "email":email
      })
    })
    console.log(response);

    if (response.ok) {
      emailIsUnique = true;
    } else {
      emailIsUnique = false;
    }

    if (checkEmail(email)) {
      isValidEmail = true
    } else {
      isValidEmail = false
    }
    
    // Periksa setiap karakter dalam kata sandi
    for (let char of password) {
        if (char >= 'a' && char <= 'z') {
            hasLowercase = true;
        } else if (char >= 'A' && char <= 'Z') {
            hasUppercase = true;
        } else if (char >= '0' && char <= '9') {
            hasNumber = true;
        }
    }

    
    
    if (!hasNumber) {
        setErrorMessage('Password must be include at least one number (0-9)');
        setPassword('');
    }
    if (!hasUppercase) {
        setErrorMessage('Password must be include at least one uppercase letter');
        setPassword('');
    }
    if (!hasLowercase) {
        setErrorMessage('Password must be include at least one lowercase letter');
        setPassword('');
    }
    if (password.length < 8) {
        setErrorMessage('Password must be at least 8 characters');
        setPassword('');
    }
    if (!emailIsUnique) {
      setErrorMessage('The email address is already in use')
    }

    if (!isValidEmail) {
      setErrorMessage("Please enter a valid email address")
    }


    if (password.length >= 8 && hasLowercase && hasUppercase && hasNumber && emailIsUnique && isValidEmail) {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        console.log('Email:', email);
        console.log('Password:', password);
        navigate("/pickRole");
    }
    
  }
  return (
    <>
    <div class="flex flex-col justify-center min-h-screen bg-black">
      <div class="mx-auto px-16 py-12 max-w-screen-xl">
      <div className="mt-1 mr-8 shadow-sm max-md:mt-10 max-md:mr-2.5 max-md:max-w-full">
       <form>
        <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:">
          <div className="flex flex-col w-[57%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col px-20 text-2xl font-light text-center text-white max-md:px-5 max-md:mt-10 max-md:max-w-full">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/aa69fb77178630687c260d05023bc932c4b77ba3bb83a6fd2d1ed49d3825fa5f?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&"
                className="w-full aspect-[1.92] max-md:max-w-75"
              />
              <div className="mt-0 max-md:mt-10 max-md:max-w-75">
                StartupVault helps founders connect with potential partners,
                customers, or investors — essential elements for growth. If
                you’re a passionate innovator wanting to amplify your impact,
                this is your place to start.
              </div>
            </div>
          </div>
          <div className="flex flex-col ml-5 w-[43%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow max-md:mt-8 max-md:max-w-full">
              <div className="text-5xl font-semibold tracking-wider leading-[70.8px] text-stone-100 max-md:max-w-full max-md:text:4xl">
                Sign up
              </div>
              <div className="mt-4 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
                Email Address
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shrink-0 mt-3 h-10 rounded-lg bg-neutral-800 text-white px-4 py-2 max-md:max-w-full" />
              <div className="mt-4 text-base font-medium tracking-wide text-stone-100 max-md:max-w-full">
                Password
              </div>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shrink-0 mt-3 h-10 rounded-lg bg-neutral-800 text-white px-4 py-2 max-md:max-w-full">
              </input>
              <div className="mt-4 text-xs leading-3 text-neutral-400 max-md:max-w-full">
                Password must:
              </div>
              <div className="flex gap-1 justify-between mt-2 text-xs leading-3 text-stone-100 max-md:flex-wrap max-md:max-w-full">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1c57228e098c7a62e84df870585873fc1621abd5aea69b23d02c54faa31f83da?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&"
                  className="w-3 aspect-square"
                />
                <div className="grow max-md:max-w-full">
                  Be a minimum of 8 characters
                </div>
              </div>
              <div className="flex gap-1 justify-between mt-1 text-xs leading-3 text-stone-100 max-md:flex-wrap max-md:max-w-full">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1c57228e098c7a62e84df870585873fc1621abd5aea69b23d02c54faa31f83da?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&"
                  className="w-3 aspect-square"
                />
                <div className="grow max-md:max-w-full">
                  Include at least one lowercase letter (a-z)
                </div>
              </div>
              <div className="flex gap-1 justify-between mt-1 text-xs leading-3 text-stone-100 max-md:flex-wrap max-md:max-w-full">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1c57228e098c7a62e84df870585873fc1621abd5aea69b23d02c54faa31f83da?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&"
                  className="w-3 aspect-square"
                />
                <div className="grow max-md:max-w-full">
                  Include at least one uppercase letter (A-Z)
                </div>
              </div>
              <div className="flex gap-1 justify-between mt-1 text-xs leading-3 text-stone-100 max-md:flex-wrap max-md:max-w-full">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/1c57228e098c7a62e84df870585873fc1621abd5aea69b23d02c54faa31f83da?apiKey=b1a4c3002d354a0a9e5d1136f5930ee4&"
                  className="w-3 aspect-square"
                />
                <div className="grow max-md:max-w-full">
                  Include at least one number (0-9)
                </div>
              </div>
              {/* Error message */}
              {errorMessage && (
              <div className="mt-1 text-red-500 text-sm mb-2">{errorMessage}</div>
              )}
              <div 
              className="justify-center self-center px-5 py-2 mt-3 text-xl font-semibold tracking-widest text-black bg-green-400 whitespace-nowrap rounded-3xl shadow-sm max-md:mt-10 hover:bg-green-500 cursor-pointer"
              onClick= {handleCreateAccount}
              type="button">
                CREATE ACCOUNT
              </div>
              <div className="flex gap-1 self-center mt-4 text-base tracking-normal whitespace-nowrap">
                <div className="grow text-white">Already have an account?</div>
                <div className="text-green-400 underline"><Link to="/login">Log in</Link></div>
              </div>
            </div>
          </div>
        </div>
       </form>
      </div>
      </div>
    </div>
    </>
  );
}
export default RegisterBoxFix;

