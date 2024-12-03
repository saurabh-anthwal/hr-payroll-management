import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { RiLogoutCircleRLine } from "react-icons/ri";

function Navbar() {
  const history = useHistory();
  const location = useLocation(); // Get the current path
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userName = localStorage.getItem("userName") || "User";

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userName");
    history.push("/");
  };

  const isActive = (path) => location.pathname === path; // Check if path is active

  return (
    // <nav className="bg-white shadow-md sticky top-0 z-50">
    //   <div className="container mx-auto px-6 py-4 flex items-center justify-between">
    //     {/* Logo */}
    //     <Link to="/" className="flex items-center space-x-2">
    //       <img
    //         src="https://dataclaps.com/wp-content/uploads/2020/09/Screenshot-2023-03-18-at-2.36.25-AM.png"
    //         alt="Logo"
    //         className="w-28"
    //       />
    //     </Link>

    //     {/* Navbar Links */}
    //     <div className="hidden md:flex items-center space-x-8">
    //       <Link
    //         to="/home"
    //         className={`${
    //           isActive("/home") ? "text-indigo-600 font-semibold" : "text-gray-600"
    //         } hover:text-indigo-700 transition-colors duration-300`}
    //       >
    //         Home
    //       </Link>
    //       <Link
    //         to="/salary"
    //         className={`${
    //           isActive("/salary") ? "text-indigo-600 font-semibold" : "text-gray-600"
    //         } hover:text-indigo-700 transition-colors duration-300`}
    //       >
    //         Salary
    //       </Link>

    //       {/* Dropdown for Employees */}
    //       <div className="relative">
    //         <button
    //           onClick={() => setIsDropdownOpen(!isDropdownOpen)}
    //           className={`${
    //             isActive("/add-employee") || isActive("/view-employees")
    //               ? "text-indigo-600 font-semibold"
    //               : "text-gray-600"
    //           } hover:text-indigo-700 transition-colors duration-300 focus:outline-none`}
    //         >
    //           Employees
    //         </button>
    //         {/* Dropdown */}
    //         {isDropdownOpen && (
    //           <div className="absolute bg-white shadow-lg rounded-lg mt-2 w-48 z-20">
    //             <Link
    //               to="/add-employee"
    //               className={`block px-4 py-2 text-sm ${
    //                 isActive("/add-employee")
    //                   ? "text-indigo-600 font-semibold"
    //                   : "text-gray-600"
    //               } hover:bg-indigo-50 hover:text-indigo-700`}
    //               onClick={() => setIsDropdownOpen(false)}
    //             >
    //               Add Employee
    //             </Link>
    //             <Link
    //               to="/view-employees"
    //               className={`block px-4 py-2 text-sm ${
    //                 isActive("/view-employees")
    //                   ? "text-indigo-600 font-semibold"
    //                   : "text-gray-600"
    //               } hover:bg-indigo-50 hover:text-indigo-700`}
    //               onClick={() => setIsDropdownOpen(false)}
    //             >
    //               View Employees
    //             </Link>
    //           </div>
    //         )}
    //       </div>
    //       <Link
    //         to="/admin-panel"
    //         className={`${
    //           isActive("/admin-panel") ? "text-indigo-600 font-semibold" : "text-gray-600"
    //         } hover:text-indigo-700 transition-colors duration-300`}
    //       >
    //         Admin Panel
    //       </Link>
    //     </div>

    //     {/* User Section */}
    //     <div className="flex items-center space-x-6">
    //       <span className="text-gray-600">Welcome, <span className="text-black font-semibold">{userName}</span></span>
    //       <button
    //         onClick={handleLogout}
    //         className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
    //       >
    //         <RiLogoutCircleRLine size={20} />
    //         <span className="hidden sm:inline">Logout</span>
    //       </button>
    //     </div>
    //   </div>

    //   {/* Mobile Menu */}
    //   <div className="md:hidden bg-white shadow-md">
    //     <div className="flex justify-between p-4">
    //       <button
    //         className="text-gray-600 hover:text-indigo-600"
    //         onClick={() => {
    //           const menu = document.getElementById("mobileMenu");
    //           menu.classList.toggle("hidden");
    //         }}
    //       >
    //         ☰
    //       </button>
    //     </div>
    //     <div id="mobileMenu" className="hidden space-y-4 px-6 pb-4">
    //       <Link
    //         to="/home"
    //         className={`block ${
    //           isActive("/home") ? "text-indigo-600 font-semibold" : "text-gray-600"
    //         } hover:text-indigo-700 transition-colors duration-300`}
    //       >
    //         Home
    //       </Link>
    //       <Link
    //         to="/salary"
    //         className={`block ${
    //           isActive("/salary") ? "text-indigo-600 font-semibold" : "text-gray-600"
    //         } hover:text-indigo-700 transition-colors duration-300`}
    //       >
    //         Salary
    //       </Link>
    //       <Link
    //         to="/add-employee"
    //         className={`block ${
    //           isActive("/add-employee") ? "text-indigo-600 font-semibold" : "text-gray-600"
    //         } hover:text-indigo-700 transition-colors duration-300`}
    //       >
    //         Add Employee
    //       </Link>
    //       <Link
    //         to="/view-employees"
    //         className={`block ${
    //           isActive("/view-employees") ? "text-indigo-600 font-semibold" : "text-gray-600"
    //         } hover:text-indigo-700 transition-colors duration-300`}
    //       >
    //         View Employees
    //       </Link>
    //       <Link
    //         to="/admin-panel"
    //         className={`block ${
    //           isActive("/admin-panel") ? "text-indigo-600 font-semibold" : "text-gray-600"
    //         } hover:text-indigo-700 transition-colors duration-300`}
    //       >
    //         Admin Panel
    //       </Link>
    //     </div>
    //   </div>
    // </nav>

    
      
  
        <header className='z-50 bg-white sticky top-0 pt-4'>
          <div className='flex flex-wrap items-center w-full relative tracking-wide'>
            <div className='flex items-center gap-y-6 max-sm:flex-col z-50 w-full pb-2'>
              {/* <div
                className='flex items-center gap-4 w-full px-6 bg-white shadow-sm min-h-[48px] sm:mr-20 rounded-md outline-none border-none'>
                <input type='text' placeholder='Search something...'
                  className='w-full text-sm bg-transparent rounded outline-none' />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904"
                  className="w-4 cursor-pointer fill-gray-400 ml-auto">
                  <path
                    d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
                  </path>
                </svg>
              </div> */}
  
              <div className="flex items-center justify-end gap-6 ml-auto">
                <div className='flex items-center space-x-6'>
                  <div
                    className="w-9 h-[38px] flex items-center justify-center rounded-xl relative bg-blue-200 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px] fill-blue-600"
                      viewBox="0 0 371.263 371.263">
                      <path
                        d="M305.402 234.794v-70.54c0-52.396-33.533-98.085-79.702-115.151.539-2.695.838-5.449.838-8.204C226.539 18.324 208.215 0 185.64 0s-40.899 18.324-40.899 40.899c0 2.695.299 5.389.778 7.964-15.868 5.629-30.539 14.551-43.054 26.647-23.593 22.755-36.587 53.354-36.587 86.169v73.115c0 2.575-2.096 4.731-4.731 4.731-22.096 0-40.959 16.647-42.995 37.845-1.138 11.797 2.755 23.533 10.719 32.276 7.904 8.683 19.222 13.713 31.018 13.713h72.217c2.994 26.887 25.869 47.905 53.534 47.905s50.54-21.018 53.534-47.905h72.217c11.797 0 23.114-5.03 31.018-13.713 7.904-8.743 11.797-20.479 10.719-32.276-2.036-21.198-20.958-37.845-42.995-37.845a4.704 4.704 0 0 1-4.731-4.731zM185.64 23.952c9.341 0 16.946 7.605 16.946 16.946 0 .778-.12 1.497-.24 2.275-4.072-.599-8.204-1.018-12.336-1.138-7.126-.24-14.132.24-21.078 1.198-.12-.778-.24-1.497-.24-2.275.002-9.401 7.607-17.006 16.948-17.006zm0 323.358c-14.431 0-26.527-10.3-29.342-23.952h58.683c-2.813 13.653-14.909 23.952-29.341 23.952zm143.655-67.665c.479 5.15-1.138 10.12-4.551 13.892-3.533 3.773-8.204 5.868-13.353 5.868H59.89c-5.15 0-9.82-2.096-13.294-5.868-3.473-3.772-5.09-8.743-4.611-13.892.838-9.042 9.282-16.168 19.162-16.168 15.809 0 28.683-12.874 28.683-28.683v-73.115c0-26.228 10.419-50.719 29.282-68.923 18.024-17.425 41.498-26.887 66.528-26.887 1.198 0 2.335 0 3.533.06 50.839 1.796 92.277 45.929 92.277 98.325v70.54c0 15.809 12.874 28.683 28.683 28.683 9.88 0 18.264 7.126 19.162 16.168z"
                        data-original="#000000" />
                    </svg>
                    <span
                      className="absolute w-5 h-5 flex items-center justify-center -right-2.5 -top-2.5 text-[10px] rounded-full bg-blue-600 text-white">21</span>
                  </div>
  
                  <div
                    className="w-9 h-[38px] flex items-center justify-center rounded-xl relative bg-blue-200 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px] fill-blue-600" viewBox="0 0 24 24">
                      <path fill-rule="evenodd"
                        d="M17.933.899C16.973.82 15.78.82 14.258.82H9.742c-1.522 0-2.716 0-3.675.078-.977.08-1.784.245-2.514.618a6.382 6.382 0 0 0-2.79 2.79C.391 5.036.226 5.843.146 6.82c-.079.96-.079 2.154-.079 3.676v4.73a5.02 5.02 0 0 0 5.02 5.02h.667a.39.39 0 0 1 .363.535c-.763 1.905 1.432 3.627 3.101 2.435l2.899-2.07.055-.039a4.717 4.717 0 0 1 2.686-.861h.84c1.719 0 2.767 0 3.648-.258a6.382 6.382 0 0 0 4.329-4.329c.257-.881.257-1.929.257-3.648v-1.515c0-1.522 0-2.717-.077-3.676-.081-.976-.246-1.783-.618-2.514a6.382 6.382 0 0 0-2.79-2.79C19.717 1.145 18.91.98 17.933.9zM4.309 3c.456-.233 1.02-.37 1.893-.44.884-.073 2.01-.074 3.578-.074h4.44c1.568 0 2.694 0 3.578.073.873.071 1.437.209 1.894.44a4.717 4.717 0 0 1 2.062 2.063c.233.456.37 1.02.44 1.894.072.883.073 2.009.073 3.577v1.315c0 1.933-.008 2.721-.19 3.343a4.717 4.717 0 0 1-3.2 3.199c-.621.182-1.41.19-3.343.19h-.687a6.382 6.382 0 0 0-3.635 1.166l-2.96 2.115c-.318.226-.734-.1-.589-.462a2.055 2.055 0 0 0-1.909-2.818h-.667a3.354 3.354 0 0 1-3.355-3.354v-4.695c0-1.568 0-2.694.074-3.577.07-.874.208-1.438.44-1.894A4.717 4.717 0 0 1 4.31 3z"
                        clip-rule="evenodd" data-original="#000000" />
                      <path
                        d="M8.67 10.533a1.11 1.11 0 1 1-2.22 0 1.11 1.11 0 0 1 2.22 0zm4.44 0a1.11 1.11 0 1 1-2.22 0 1.11 1.11 0 0 1 2.22 0zm4.44 0a1.11 1.11 0 1 1-2.22 0 1.11 1.11 0 0 1 2.22 0z"
                        data-original="#000000" />
                    </svg>
                    <span
                      className="absolute w-5 h-5 flex items-center justify-center -right-2.5 -top-2.5 text-[10px] rounded-full bg-blue-600 text-white">4</span>
                  </div>
  
                  <div
                    className="w-9 h-[38px] flex items-center justify-center rounded-xl relative bg-red-200 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px] fill-red-600" viewBox="0 0 24 24">
                      <path
                        d="M13.12 24h-2.24a1.498 1.498 0 0 1-1.486-1.32l-.239-1.876a9.45 9.45 0 0 1-1.374-.569l-1.494 1.161a1.492 1.492 0 0 1-1.985-.126l-1.575-1.575a1.488 1.488 0 0 1-.122-1.979l1.161-1.495a9.232 9.232 0 0 1-.569-1.374l-1.88-.239A1.501 1.501 0 0 1 0 13.12v-2.24c0-.757.567-1.396 1.32-1.486l1.876-.239a9.45 9.45 0 0 1 .569-1.374l-1.16-1.494a1.49 1.49 0 0 1 .127-1.986l1.575-1.575a1.489 1.489 0 0 1 1.979-.122L7.78 3.766a9.416 9.416 0 0 1 1.375-.569l.239-1.88C9.484.567 10.123 0 10.88 0h2.24c.757 0 1.396.567 1.486 1.32l.239 1.876c.478.155.938.346 1.375.569l1.494-1.161a1.49 1.49 0 0 1 1.985.127l1.575 1.575c.537.521.591 1.374.122 1.979L20.235 7.78c.224.437.415.897.569 1.374l1.88.239A1.5 1.5 0 0 1 24 10.88v2.24c0 .757-.567 1.396-1.32 1.486l-1.876.239a9.45 9.45 0 0 1-.569 1.374l1.161 1.494a1.49 1.49 0 0 1-.127 1.985l-1.575 1.575a1.487 1.487 0 0 1-1.979.122l-1.495-1.161a9.232 9.232 0 0 1-1.374.569l-.239 1.88A1.5 1.5 0 0 1 13.12 24zm-5.39-4.86c.083 0 .168.021.244.063a8.393 8.393 0 0 0 1.774.736.5.5 0 0 1 .358.417l.28 2.2c.03.251.247.444.494.444h2.24a.504.504 0 0 0 .493-.439l.281-2.204a.5.5 0 0 1 .358-.417 8.393 8.393 0 0 0 1.774-.736.499.499 0 0 1 .55.042l1.75 1.36a.492.492 0 0 0 .655-.034l1.585-1.585a.495.495 0 0 0 .039-.66l-1.36-1.75a.5.5 0 0 1-.042-.55 8.393 8.393 0 0 0 .736-1.774.5.5 0 0 1 .417-.358l2.2-.28A.507.507 0 0 0 23 13.12v-2.24a.504.504 0 0 0-.439-.493l-2.204-.281a.5.5 0 0 1-.417-.358 8.393 8.393 0 0 0-.736-1.774.497.497 0 0 1 .042-.55l1.36-1.75a.49.49 0 0 0-.033-.654l-1.585-1.585a.492.492 0 0 0-.66-.039l-1.75 1.36a.5.5 0 0 1-.551.042 8.359 8.359 0 0 0-1.774-.736.5.5 0 0 1-.358-.417l-.28-2.2A.507.507 0 0 0 13.12 1h-2.24a.504.504 0 0 0-.493.439l-.281 2.204a.502.502 0 0 1-.358.418 8.356 8.356 0 0 0-1.774.735.5.5 0 0 1-.551-.041l-1.75-1.36a.49.49 0 0 0-.654.033L3.434 5.014a.495.495 0 0 0-.039.66l1.36 1.75a.5.5 0 0 1 .042.55 8.341 8.341 0 0 0-.736 1.774.5.5 0 0 1-.417.358l-2.2.28A.505.505 0 0 0 1 10.88v2.24c0 .247.193.464.439.493l2.204.281a.5.5 0 0 1 .417.358c.18.626.428 1.223.736 1.774a.497.497 0 0 1-.042.55l-1.36 1.75a.49.49 0 0 0 .033.654l1.585 1.585a.494.494 0 0 0 .66.039l1.75-1.36a.515.515 0 0 1 .308-.104z"
                        data-original="#000000" />
                      <path
                        d="M12 17c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5zm0-9c-2.206 0-4 1.794-4 4s1.794 4 4 4 4-1.794 4-4-1.794-4-4-4z"
                        data-original="#000000" />
                    </svg>
                    <span
                      className="absolute w-5 h-5 flex items-center justify-center -right-2.5 -top-2.5 text-[10px] rounded-full bg-[#ff5b5b] text-white">3</span>
                  </div>
  
                </div>
  
                <div className="w-1 h-10 border-l border-gray-400">
                </div>
                <div className="dropdown-menu relative flex shrink-0 group">
                  <div className="flex items-center gap-4 px-4">
                    <p className="text-gray-500 text-sm">Hi, John</p>
                    <img src="https://readymadeui.com/team-1.webp" alt="profile-pic"
                      className="w-[38px] h-[38px] rounded-full border-2 border-gray-300 cursor-pointer" />
                  </div>
  
                  <div
                    className="dropdown-content hidden group-hover:block shadow-md p-2 bg-white rounded-md absolute top-[38px] right-0 w-56">
                    <div className="w-full space-y-2">
                      <a href="/1/profile"
                        className="text-sm text-gray-800 cursor-pointer flex items-center p-2 rounded-md hover:bg-[#d9f3ea] dropdown-item transition duration-300 ease-in-out">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px] mr-4 fill-current"
                          viewBox="0 0 512 512">
                          <path
                            d="M437.02 74.98C388.668 26.63 324.379 0 256 0S123.332 26.629 74.98 74.98C26.63 123.332 0 187.621 0 256s26.629 132.668 74.98 181.02C123.332 485.37 187.621 512 256 512s132.668-26.629 181.02-74.98C485.37 388.668 512 324.379 512 256s-26.629-132.668-74.98-181.02zM111.105 429.297c8.454-72.735 70.989-128.89 144.895-128.89 38.96 0 75.598 15.179 103.156 42.734 23.281 23.285 37.965 53.687 41.742 86.152C361.641 462.172 311.094 482 256 482s-105.637-19.824-144.895-52.703zM256 269.507c-42.871 0-77.754-34.882-77.754-77.753C178.246 148.879 213.13 114 256 114s77.754 34.879 77.754 77.754c0 42.871-34.883 77.754-77.754 77.754zm170.719 134.427a175.9 175.9 0 0 0-46.352-82.004c-18.437-18.438-40.25-32.27-64.039-40.938 28.598-19.394 47.426-52.16 47.426-89.238C363.754 132.34 315.414 84 256 84s-107.754 48.34-107.754 107.754c0 37.098 18.844 69.875 47.465 89.266-21.887 7.976-42.14 20.308-59.566 36.542-25.235 23.5-42.758 53.465-50.883 86.348C50.852 364.242 30 312.512 30 256 30 131.383 131.383 30 256 30s226 101.383 226 226c0 56.523-20.86 108.266-55.281 147.934zm0 0"
                            data-original="#000000"></path>
                        </svg>
                        Account</a>
                      <hr className="my-2 -mx-2" />
  
                      <a href="javascript:void(0)"
                        className="text-sm text-gray-800 cursor-pointer flex items-center p-2 rounded-md hover:bg-[#d9f3ea] dropdown-item transition duration-300 ease-in-out">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                          className="w-[18px] h-[18px] mr-4 fill-current" viewBox="0 0 24 24">
                          <path
                            d="M19.56 23.253H4.44a4.051 4.051 0 0 1-4.05-4.05v-9.115c0-1.317.648-2.56 1.728-3.315l7.56-5.292a4.062 4.062 0 0 1 4.644 0l7.56 5.292a4.056 4.056 0 0 1 1.728 3.315v9.115a4.051 4.051 0 0 1-4.05 4.05zM12 2.366a2.45 2.45 0 0 0-1.393.443l-7.56 5.292a2.433 2.433 0 0 0-1.037 1.987v9.115c0 1.34 1.09 2.43 2.43 2.43h15.12c1.34 0 2.43-1.09 2.43-2.43v-9.115c0-.788-.389-1.533-1.037-1.987l-7.56-5.292A2.438 2.438 0 0 0 12 2.377z"
                            data-original="#000000"></path>
                          <path
                            d="M16.32 23.253H7.68a.816.816 0 0 1-.81-.81v-5.4c0-2.83 2.3-5.13 5.13-5.13s5.13 2.3 5.13 5.13v5.4c0 .443-.367.81-.81.81zm-7.83-1.62h7.02v-4.59c0-1.933-1.577-3.51-3.51-3.51s-3.51 1.577-3.51 3.51z"
                            data-original="#000000"></path>
                        </svg>
                        Dashboard</a>
                      <a href="javascript:void(0)"
                        className="text-sm text-gray-800 cursor-pointer flex items-center p-2 rounded-md hover:bg-[#d9f3ea] dropdown-item transition duration-300 ease-in-out">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px] mr-4 fill-current"
                          viewBox="0 0 24 24">
                          <path
                            d="M18 2c2.206 0 4 1.794 4 4v12c0 2.206-1.794 4-4 4H6c-2.206 0-4-1.794-4-4V6c0-2.206 1.794-4 4-4zm0-2H6a6 6 0 0 0-6 6v12a6 6 0 0 0 6 6h12a6 6 0 0 0 6-6V6a6 6 0 0 0-6-6z"
                            data-original="#000000" />
                          <path d="M12 18a1 1 0 0 1-1-1V7a1 1 0 0 1 2 0v10a1 1 0 0 1-1 1z" data-original="#000000" />
                          <path d="M6 12a1 1 0 0 1 1-1h10a1 1 0 0 1 0 2H7a1 1 0 0 1-1-1z" data-original="#000000" />
                        </svg>
                        Posts</a>
                      <a href="javascript:void(0)"
                        className="text-sm text-gray-800 cursor-pointer flex items-center p-2 rounded-md hover:bg-[#d9f3ea] dropdown-item transition duration-300 ease-in-out">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px] mr-4 fill-current"
                          viewBox="0 0 510 510">
                          <g fill-opacity=".9">
                            <path
                              d="M255 0C114.75 0 0 114.75 0 255s114.75 255 255 255 255-114.75 255-255S395.25 0 255 0zm0 459c-112.2 0-204-91.8-204-204S142.8 51 255 51s204 91.8 204 204-91.8 204-204 204z"
                              data-original="#000000" />
                            <path d="M267.75 127.5H229.5v153l132.6 81.6 20.4-33.15-114.75-68.85z"
                              data-original="#000000" />
                          </g>
                        </svg>
                        Schedules</a>
                      <a href="javascript:void(0)"
                        className="text-sm text-gray-800 cursor-pointer flex items-center p-2 rounded-md hover:bg-[#d9f3ea] dropdown-item transition duration-300 ease-in-out">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px] h-[18px] mr-4 fill-current"
                          viewBox="0 0 6 6">
                          <path
                            d="M3.172.53a.265.266 0 0 0-.262.268v2.127a.265.266 0 0 0 .53 0V.798A.265.266 0 0 0 3.172.53zm1.544.532a.265.266 0 0 0-.026 0 .265.266 0 0 0-.147.47c.459.391.749.973.749 1.626 0 1.18-.944 2.131-2.116 2.131A2.12 2.12 0 0 1 1.06 3.16c0-.65.286-1.228.74-1.62a.265.266 0 1 0-.344-.404A2.667 2.667 0 0 0 .53 3.158a2.66 2.66 0 0 0 2.647 2.663 2.657 2.657 0 0 0 2.645-2.663c0-.812-.363-1.542-.936-2.03a.265.266 0 0 0-.17-.066z"
                            data-original="#000000" />
                        </svg>
                        Logout</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
  );
}

export default Navbar;
