import React, { useState } from "react";
// import { IoMdAddCircleOutline } from "react-icons/io";

const EmployLeavePage = () => {
  const [leaveType, setLeaveType] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [duration, setDuration] = useState(null);
  const [reason, setReason] = useState(null);

  const handleCancel = () => {
    setLeaveType(null);
    setEndDate(null);
    setEndDate(null);
    setDuration(null);
    setReason(null)
  }

  return (
    <div className="p-4 text-gray-400">
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 pb-1 pl-2">Appy Leave</h2>
        <form>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid grid-cols-5 gap-2 items-center">
              <label className="text-gray-800 col-span-1 text-sm mb-2   ">Leave type :</label>
              <div className="relative col-span-4 flex items-center w-full">
                <select 
                  id="leaveType"
                  value={leaveType} 
                  class="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg outline-blue-400 focus:ring-blue-400 focus:border-blue-500 block w-full p-2.5  "
                  onChange={(e) => setLeaveType(e.target.value)}
                  required
                >
                  <option selected>Choose a leave type</option>
                  <option value="female">Medical</option>
                  <option value="male">Personal</option>
                  <option value="other">Travel</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2 items-center">
              <label className="text-gray-800 col-span-1 text-sm mb-2   ">Duration :</label>
              <div className="relative col-span-4 flex items-center w-full">
                <select 
                  id="duration"
                  value={duration} 
                  class="bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg outline-blue-400 focus:ring-blue-400 focus:border-blue-500 block w-full p-2.5  "
                  onChange={(e) => setDuration(e.target.value)}
                  required
                >
                  <option selected>Choose a duration</option>
                  <option value="female">Half Day</option>
                  <option value="male">Full Day</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2 items-center">
              <label className="text-gray-800 col-span-1 text-sm mb-2   ">Start Date :</label>
              <div className="relative col-span-4 flex items-center w-full">
                <input
                  name="start_date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-2 rounded-lg outline-blue-400"
                  placeholder="Enter start date "
                />
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2 items-center">
              <label className="text-gray-800 col-span-1 text-sm mb-2   ">End Date :</label>
              <div className="relative col-span-4 flex items-center w-full">
                <input
                  name="end_date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-2 rounded-lg outline-blue-400"
                  placeholder="Enter end date"
                />
              </div>
            </div>
            <div className="grid grid-cols-10 gap-2 items-center col-span-2">
              <label className="text-gray-800 col-span-1 text-sm mb-2   ">Reason :</label>
              <div className="relative col-span-9 flex items-center w-full">
                <input
                  type="text"
                  name="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Enter your reason"
                  className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2 text-sm shadow-sm focus:outline-none "
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end col-span-2 gap-2 mt-4">
            <button 
              onClick={handleCancel}
              className="rounded-full border py-2 px-4 text-center text-sm transition-all shadow-sm  border-red-500 hover:shadow-lg text-slate-600 hover:text-slate-600 hover:bg-slate-200  disabled:pointer-events-none " 
              type="button"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full border bg-lime-500 py-2 px-4 text-center text-sm transition-all text-white border-green-400 shadow-sm hover:shadow-lg hover:bg-green-500  disabled:pointer-events-none " 
            >
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EmployLeavePage;