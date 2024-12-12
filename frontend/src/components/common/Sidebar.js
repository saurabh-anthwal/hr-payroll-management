import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie';

const Sidebar = () => {
  const [selectedTab, setSelectedTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar toggle state
  const userType = Cookies.get('userType')

  useEffect(() => {
    if (localStorage.getItem("tab")) {
      setSelectedTab(localStorage.getItem("tab"));
    }
  }, []);

  useEffect(() => {
    const dimension = window.innerWidth;
    console.log(dimension);
    if(dimension < 768) {
      setIsSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
    }

  }, [window.innerWidth]); // eslint-disable-line

  console.log(window.innerWidth)

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleSelectedTab = (tab) => {
    setSelectedTab(tab);
    localStorage.setItem('tab', tab);
  }

  return (
    <div>
      <nav id="sidebar" className="lg:min-w-[250px] w-max max-lg:min-w-8">
        <div id="sidebar-collapse-menu"
          className={`bg-white shadow-lg h-screen fixed top-0 left-0 overflow-auto z-[99] transition-all duration-500 ${
            isSidebarOpen ? "w-[250px] visible opacity-100" : "w-[32px] invisible opacity-0"
          }`}>          
          <div className="pt-8 pb-2 px-6 sticky top-0 bg-white min-h-[80px] z-[100]">
            <a href={`${userType==='hr' ? "/1/dashboard" : "/employ/dashboard" }`} className="outline-none"><img src="https://dataclaps.com/wp-content/uploads/2020/09/Screenshot-2023-03-18-at-2.36.25-AM.png"
              alt="logo" className='w-[170px]' />
            </a>
          </div>

          <div className="py-6 px-6">
            <ul className="space-y-2">
              <li>
                <a href={`${userType==='hr' ? "/1/dashboard" : "/employ/dashboard" }`}
                  className="menu-item text-green-700 text-sm flex items-center cursor-pointer  hover:bg-[#d9f3ea] rounded-md px-3 py-3 transition-all duration-300"
                  style={selectedTab === 'dashboard' ? { backgroundColor: "#d9f3ea" } : {}}
                  onClick={() => handleSelectedTab('dashboard')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-[18px] h-[18px] mr-4"
                    viewBox="0 0 24 24">
                    <path
                      d="M19.56 23.253H4.44a4.051 4.051 0 0 1-4.05-4.05v-9.115c0-1.317.648-2.56 1.728-3.315l7.56-5.292a4.062 4.062 0 0 1 4.644 0l7.56 5.292a4.056 4.056 0 0 1 1.728 3.315v9.115a4.051 4.051 0 0 1-4.05 4.05zM12 2.366a2.45 2.45 0 0 0-1.393.443l-7.56 5.292a2.433 2.433 0 0 0-1.037 1.987v9.115c0 1.34 1.09 2.43 2.43 2.43h15.12c1.34 0 2.43-1.09 2.43-2.43v-9.115c0-.788-.389-1.533-1.037-1.987l-7.56-5.292A2.438 2.438 0 0 0 12 2.377z"
                      data-original="#000000" />
                    <path
                      d="M16.32 23.253H7.68a.816.816 0 0 1-.81-.81v-5.4c0-2.83 2.3-5.13 5.13-5.13s5.13 2.3 5.13 5.13v5.4c0 .443-.367.81-.81.81zm-7.83-1.62h7.02v-4.59c0-1.933-1.577-3.51-3.51-3.51s-3.51 1.577-3.51 3.51z"
                      data-original="#000000" />
                  </svg>
                  <span>Dashboard</span>
                </a>
              </li>
              <li>
                <a href={`${userType==='hr' ? "/1/salary" : "/employ/salary" }`}
                  className="menu-item text-gray-800 text-sm flex items-center cursor-pointer hover:bg-[#d9f3ea] rounded-md px-3 py-3 transition-all duration-300"
                  style={selectedTab === 'salary' ? { backgroundColor: "#d9f3ea" } : {}}
                  onClick={() => handleSelectedTab('salary')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-[18px] h-[18px] mr-4"
                    viewBox="0 0 682.667 682.667">
                    <defs>
                      <clipPath id="a" clipPathUnits="userSpaceOnUse">
                        <path d="M0 512h512V0H0Z" data-original="#000000" />
                      </clipPath>
                    </defs>
                    <g fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"
                      stroke-width="30" clip-path="url(#a)" transform="matrix(1.33333 0 0 -1.33333 0 682.667)">
                      <path
                        d="M368 170.3V45c0-16.57-13.43-30-30-30H45c-16.57 0-30 13.43-30 30v422c0 16.571 13.43 30 30 30h293c16.57 0 30-13.429 30-30V261.26"
                        data-original="#000000" />
                      <path
                        d="m287.253 180.508 159.099 159.099c5.858 5.858 15.355 5.858 21.213 0l25.042-25.041c5.858-5.859 5.858-15.356 0-21.214L332.508 135.253l-84.853-39.599ZM411.703 304.958l45.255-45.255M80 400h224M80 320h176M80 240h128"
                        data-original="#000000" />
                    </g>
                  </svg>
                  <span>Salary</span>
                </a>
              </li>
              <li>
                <a href={`${userType==='hr' ? "/1/holidays" : "/employ/holidays" }`}
                  className="menu-item text-gray-800 text-sm flex items-center cursor-pointer hover:bg-[#d9f3ea] rounded-md px-3 py-3 transition-all duration-300"
                  style={selectedTab === 'holidays' ? { backgroundColor: "#d9f3ea" } : {}}
                  onClick={() => handleSelectedTab('holidays')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-[18px] h-[18px] mr-4"
                    viewBox="0 0 64 64">
                    <path
                      d="M16.4 29.594a2.08 2.08 0 0 1 2.08-2.08h31.2a2.08 2.08 0 1 1 0 4.16h-31.2a2.08 2.08 0 0 1-2.08-2.08zm0 12.48a2.08 2.08 0 0 1 2.08-2.08h12.48a2.08 2.08 0 1 1 0 4.16H18.48a2.08 2.08 0 0 1-2.08-2.08z"
                      data-original="#000000" />
                    <path fill-rule="evenodd"
                      d="M.8 18.154c0-8.041 6.519-14.56 14.56-14.56v-1.04a2.08 2.08 0 1 1 4.16 0v1.04h10.4v-1.04a2.08 2.08 0 1 1 4.16 0v1.04h10.4v-1.04a2.08 2.08 0 1 1 4.16 0v1.04c8.041 0 14.56 6.519 14.56 14.56v30.16c0 8.041-6.519 14.56-14.56 14.56H15.36C7.319 62.874.8 56.355.8 48.314zm33.28-10.4h10.4v1.04a2.08 2.08 0 1 0 4.16 0v-1.04c5.744 0 10.4 4.656 10.4 10.4v30.16c0 5.744-4.656 10.4-10.4 10.4H15.36c-5.744 0-10.4-4.656-10.4-10.4v-30.16c0-5.744 4.656-10.4 10.4-10.4v1.04a2.08 2.08 0 1 0 4.16 0v-1.04h10.4v1.04a2.08 2.08 0 1 0 4.16 0z"
                      clip-rule="evenodd" data-original="#000000" />
                  </svg>
                  <span>Holidays</span>
                </a>
              </li>
              {userType==='hr' && <li>
                <a href={`${userType==='hr' ? "/1/view-employees" : "/employ/view-employees" }`}
                  className="menu-item text-gray-800 text-sm flex items-center cursor-pointer hover:bg-[#d9f3ea] rounded-md px-3 py-3 transition-all duration-300"
                  style={selectedTab === 'employee' ? { backgroundColor: "#d9f3ea" } : {}}
                  onClick={() => handleSelectedTab('employee')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mr-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                  </svg>

                  <span>Employees</span>
                </a>
              </li>}
              {userType==='employ' && <li>
                <a href={"/employ/leave"}
                  className="menu-item text-gray-800 text-sm flex items-center cursor-pointer hover:bg-[#d9f3ea] rounded-md px-3 py-3 transition-all duration-300"
                  style={selectedTab === 'Leave' ? { backgroundColor: "#d9f3ea" } : {}}
                  onClick={() => handleSelectedTab('Leave')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 mr-3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                  </svg>

                  <span>Leave</span>
                </a>
              </li>}
            </ul>

            {userType==='hr' && <div className="mt-8">
              <div className="bg-[#00b074] p-4 rounded-md shadow-md max-w-[196px]">
                <p className="text-white text-sm leading-relaxed">Organize your menus using the action button below!</p>
                <button type="button"
                  className="py-2 px-4 bg-white hover:bg-gray-100 text-gray-800 text-sm border-none outline-none rounded-md mt-4">Add
                  Menu</button>
              </div>
            </div>}
          </div>
        </div>
      </nav>

      <button 
        id="toggle-sidebar"
        // onClick={openSidebar}
        onClick={toggleSidebar}
        className='lg:hidden w-8 h-8 z-[100] fixed top-[36px] left-[10px] cursor-pointer bg-[#007bff] flex items-center justify-center rounded-full outline-none transition-all duration-500'
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="#fff" className="w-3 h-3" viewBox="0 0 55.752 55.752">
          <path
            d="M43.006 23.916a5.36 5.36 0 0 0-.912-.727L20.485 1.581a5.4 5.4 0 0 0-7.637 7.638l18.611 18.609-18.705 18.707a5.398 5.398 0 1 0 7.634 7.635l21.706-21.703a5.35 5.35 0 0 0 .912-.727 5.373 5.373 0 0 0 1.574-3.912 5.363 5.363 0 0 0-1.574-3.912z"
            data-original="#000000" />
        </svg>
      </button>
    </div>
  );
}

export default Sidebar;