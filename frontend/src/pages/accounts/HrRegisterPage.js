import React, { useState } from "react";
// import { Redirect, useHistory } from "react-router-dom";
// import { MdPerson, MdEmail, MdVpnKey, MdVisibility, MdVisibilityOff } from "react-icons/md"; // Import React Icons for username, email, password

function HrRegisterPage() {
  // const history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  // const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function submitHandle(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    const response = await fetch("http://127.0.0.1:8000/api/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    if (response?.ok) {
      setSuccess(true);
    } else {
      setError(data.message || "Registration failed. Please try again.");
    }
  }

  return (
    // <div className="flex items-center justify-center min-h-screen bg-white text-gray-800">
    //   <form
    //     className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm"
    //     onSubmit={submitHandle}
    //   >
    //     <legend className="text-2xl font-semibold text-center text-gray-800 mb-6">
    //       Registers
    //     </legend>
    //     {error && <span className="block text-red-500 text-center mb-4">{error}</span>}

    //     <div className="mb-4 relative text-center">
    //       <MdPerson className="absolute left-3 top-3 text-gray-500" />
    //       <input
    //         type="text"
    //         placeholder="Username"
    //         className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    //         onChange={(e) => setUsername(e.target.value)}
    //         required
    //       />
    //     </div>

    //     <div className="mb-4 relative">
    //       <MdEmail className="absolute left-3 top-3 text-gray-500" />
    //       <input
    //         type="email"
    //         placeholder="Email"
    //         className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    //         onChange={(e) => setEmail(e.target.value)}
    //         required
    //       />
    //     </div>

    //     <div className="mb-4 relative">
    //       <MdVpnKey className="absolute left-3 top-3 text-gray-500" />
    //       <input
    //         type={showPassword ? "text" : "password"}
    //         placeholder="Password"
    //         className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    //         onChange={(e) => setPassword(e.target.value)}
    //         required
    //       />
    //       <div
    //         className="absolute right-3 top-3 cursor-pointer"
    //         onClick={() => setShowPassword(!showPassword)}
    //       >
    //         {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
    //       </div>
    //     </div>

    //     <div className="mb-6 relative">
    //       <MdVpnKey className="absolute left-3 top-3 text-gray-500" />
    //       <input
    //         type={showConfirmPassword ? "text" : "password"}
    //         placeholder="Confirm Password"
    //         className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    //         onChange={(e) => setConfirmPassword(e.target.value)}
    //         required
    //       />
    //       <div
    //         className="absolute right-3 top-3 cursor-pointer"
    //         onClick={() => setShowConfirmPassword(!showConfirmPassword)}
    //       >
    //         {showConfirmPassword ? <MdVisibilityOff /> : <MdVisibility />}
    //       </div>
    //     </div>

    //     <div className="mb-4">
    //       <button
    //         type="submit"
    //         className="w-full p-3 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500"
    //       >
    //         Register
    //       </button>
    //     </div>
    //     <div className="flex justify-center text-blue-700 hover:text-blue-500">
    //       <button type="button" onClick={() => history.push("/login")}>
    //         Already have an account?
    //       </button>
    //     </div>
    //     {success && <Redirect to="/login" />}
    //   </form>
    // </div>
    <div class="flex flex-col justify-center font-[sans-serif] sm:h-screen p-4">
      <div class="max-w-md w-full mx-auto border border-gray-300 rounded-2xl p-8">
        <div class="text-center mb-12">
          <a href="/"><img
            src="https://dataclaps.com/wp-content/uploads/2020/09/Screenshot-2023-03-18-at-2.36.25-AM.png" alt="logo" class='w-40 inline-block' />
          </a>
        </div>

        <form>
          <div class="space-y-6">
            <div>
              <label class="text-gray-800 text-sm mb-2 block">Email Id</label>
              <input name="email" type="text" class="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter email" />
            </div>
            <div>
              <label class="text-gray-800 text-sm mb-2 block">Password</label>
              <input name="password" type="password" class="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter password" />
            </div>
            <div>
              <label class="text-gray-800 text-sm mb-2 block">Confirm Password</label>
              <input name="cpassword" type="password" class="text-gray-800 bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500" placeholder="Enter confirm password" />
            </div>

            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
              <label for="remember-me" class="text-gray-800 ml-3 block text-sm">
                I accept the <a href="javascript:void(0);" class="text-blue-600 font-semibold hover:underline ml-1">Terms and Conditions</a>
              </label>
            </div>
          </div>

          <div class="!mt-12">
            <button type="button" class="w-full py-3 px-4 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
              Create an account
            </button>
          </div>
          <p class="text-gray-800 text-sm mt-6 text-center">Already have an account? <a href="/login" class="text-blue-600 font-semibold hover:underline ml-1">Login here</a></p>
        </form>
      </div>
    </div>
  );
}

export default HrRegisterPage;
