import React, { useState } from "react";
// import { Redirect, useHistory } from "react-router-dom";
// import { MdPerson, MdEmail, MdVpnKey, MdVisibility, MdVisibilityOff } from "react-icons/md"; // Import React Icons for username, email, password
import * as URLS from "../../libs/apiUrls";
import * as utils from "../../libs/utils";
import axios from "axios";

function HrRegisterPage() {
  // const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tab, setTab] = useState("1");
  const [otp, setOtp] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      "email": email,
      "username": username,
      "password": password,
      "type": "HR"
    }
    axios.post(URLS.HR_REGISTER_OTP, payload)
      .then((res) => {
        setTab("2");
      }).catch((err) => {
        console.log(err);
      })
  }

  const handleOtpForm = (event) => {
    event.preventDefault();
    const payload = {
      "email": email,
      "otp": otp,
      "password": password
    }

    axios.post(URLS.HR_REGISTER_OTP_VERIFY, payload)
      .then((res) => {
        setTab("3");
      }).catch((err) => {
        console.log(err);
      })
  }

  return (
    <div>
        <div className="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4">
          <div className="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
            <div className="text-center mb-12">
              <a href="/"><img
                src="https://dataclaps.com/wp-content/uploads/2020/09/Screenshot-2023-03-18-at-2.36.25-AM.png" alt="logo" className='w-40 inline-block' />
              </a>
            </div>

            {tab==='1' && <form onSubmit={handleSubmit} >
              <div className="space-y-6">
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">User Name</label>
                  <input 
                    name="username" 
                    type="text" 
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" 
                    placeholder="Enter user name" 
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Email Id</label>
                  <input 
                    name="email" 
                    type="text" 
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" 
                    placeholder="Enter email" 
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-800 text-sm mb-2 block">Password</label>
                  <input 
                    name="password" 
                    type="password" 
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" 
                    placeholder="Enter password" 
                  />
                </div>
                {/* <div>
                  <label className="text-gray-800 text-sm mb-2 block">Confirm Password</label>
                  <input 
                    name="cpassword" 
                    type="password" 
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" 
                    placeholder="Enter confirm password" 
                  />
                </div> */}

                <div className="flex items-center">
                  <input required id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <label for="remember-me" className="text-gray-800 ml-3 block text-sm">
                    I accept the <a href="javascript:void(0);" className="text-blue-600 font-semibold hover:underline ml-1">Terms and Conditions</a>
                  </label>
                </div>
              </div>

              <div className="!mt-12">
                <button type="submit" className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                  Send OTP
                </button>
              </div>
              <p className="text-gray-800 text-sm mt-6 text-center">Already have an account? <a href="/login" className="text-blue-600 font-semibold hover:underline ml-1">Login here</a></p>
            </form>}

            {tab==='2' && 
              <form onSubmit={handleOtpForm} >
                <div className="space-y-6">
                  <div>
                    <label className="text-gray-800 text-sm mb-2 block">OTP</label>
                    <input 
                      name="otp" 
                      type="number" 
                      value={otp}
                      onChange={(event) => setOtp(event.target.value)}
                      className="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" 
                      placeholder="Enter OTP" 
                      required
                    />
                  </div>
                  <div className="!mt-12">
                    <button type="button" onClick={()  => setTab("1")} className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-gray-600 bg-gray-50 focus:outline-none">
                      back
                    </button>
                  </div>
                  <div className="!mt-4">
                    <button type="submit" className="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                      Submit OTP
                    </button>
                  </div>
                </div>
              </form>
              }

              {tab==="3" && 
                <div className="space-y-6 bg-gray-50 p-4">
                  <div>

                  </div>
                  <h1 className="text-gray-500 text-center text-2xl">Hr Created Succefully  </h1>
                  <p className="text-gray-800 text-sm mt-6 text-center">Please <a href="/login" className="text-blue-600 font-semibold hover:underline ml-1">Login here</a></p>
                </div>
              }
          </div>
        </div>
        

    </div>
  );
}

export default HrRegisterPage;
