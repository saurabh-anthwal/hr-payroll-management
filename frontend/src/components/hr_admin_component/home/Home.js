import React from "react";
import PayDate from "./PayDate";
import Period from "./Period";
import Calender from "./Calender";
import Count from "./Count";
import Events from "./Events";
import Wishes from "./Wishes";
import News from "./News";
import Task from "./Task";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-4">
      {/* Main Content Section: Using a grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

        {/* Column 1: Period & PayDate */}
        <div className="space-y-6">
        <div className="bg-white shadow-md rounded-md overflow-hidden">
            <Count />
          </div>
          <div className="bg-white shadow-md rounded-md overflow-hidden">
            <Period />
          </div>
          <div className="bg-white shadow-md rounded-md overflow-hidden">
            <PayDate />
          </div>
        </div>

        {/* Column 2: Calendar, Anniversaries, & Employees */}
        <div className="space-y-6">
          <div className="bg-white shadow-md rounded-md overflow-hidden">
            <Calender />
          </div>
          <div className="bg-white shadow-md rounded-md overflow-hidden">
            <Wishes />
          </div>
        </div>

        {/* Column 3: Tasks & Latest News */}
        <div className="space-y-6">
          <div className="bg-white shadow-md rounded-md overflow-hidden">
            <Task />
          </div>
          <div className="bg-white shadow-md rounded-md overflow-hidden">
            <News />
          </div>
          <div className="bg-white shadow-md rounded-md overflow-hidden">
          <Events />
        </div>
        </div>

      </div>
    </div>
  );
}

export default Home;
