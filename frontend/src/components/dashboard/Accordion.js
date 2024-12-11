import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { MdOutlineEditNotifications } from "react-icons/md";
import Cookies from 'js-cookie';

const data = [
  {
    "id": 0,
    "header" :"Are there any special discounts or promotions available during the event.",
    "content" : "at fermentum dui. Maecenas vestibulum a turpis in lacinia. Proin aliquam turpis at erat venenatis malesuada. Sed semper, justo vitae consequat fermentum, felis diam posuere ante, sed fermentum quam justo in dui. Nulla facilisi. Nulla aliquam auctor purus, vitae dictum dolor sollicitudin vitae. Sed bibendum purus in efficitur consequat. Fusce et tincidunt arcu. Curabitur ac lacus lectus. Morbi congue facilisis sapien, a semper orci facilisis in. ",
    "isOpen" : false,
    "date": "03 Dec 24"
  },
  {
    "id": 1,
    "header" :"Are there any special discounts or promotions available during the event.",
    "content" : "at fermentum dui. Maecenas vestibulum a turpis in lacinia. Proin aliquam turpis at erat venenatis malesuada. Sed semper, justo vitae consequat fermentum, felis diam posuere ante, sed fermentum quam justo in dui. Nulla facilisi. Nulla aliquam auctor purus, vitae dictum dolor sollicitudin vitae. Sed bibendum purus in efficitur consequat. Fusce et tincidunt arcu. Curabitur ac lacus lectus. Morbi congue facilisis sapien, a semper orci facilisis in. ",
    "isOpen" : false,
    "date": "10 Nov 24"
  },
  {
    "id": 2,
    "header" :"Are there any special discounts or promotions available during the event.",
    "content" : "at fermentum dui. Maecenas vestibulum a turpis in lacinia. Proin aliquam turpis at erat venenatis malesuada. Sed semper, justo vitae consequat fermentum, felis diam posuere ante, sed fermentum quam justo in dui. Nulla facilisi. Nulla aliquam auctor purus, vitae dictum dolor sollicitudin vitae. Sed bibendum purus in efficitur consequat. Fusce et tincidunt arcu. Curabitur ac lacus lectus. Morbi congue facilisis sapien, a semper orci facilisis in. ",
    "isOpen" : false,
    "date": "5 Dec 24"
  }
]

const Accordion = () => {

  const [accData, setAccData] = useState([]);
  const [isAddNotif, setisAddNotif] = useState(false);
  const [header, setHeader] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(null);
  const [itemNotif, setItemNotif] = useState(null);
  const [idEditNotif, setIsEditNotif] = useState(false);
  const userType = Cookies.get('userType')

  useEffect(() => {
    setAccData(data);
  }, []);

  const handelClick = (val) => {
    const new_data = accData.map((value) => {
      if(val.id===value.id) {
        return {...value, "isOpen": !val.isOpen}
      }
      return value;
    })
    setAccData(new_data)

    console.log(new_data);
  }

  const handleAddNotif = () => {
    console.log("");
    if(itemNotif) {
      setHeader(itemNotif)
    }
    setisAddNotif(!isAddNotif);
  }

  const handleEditNotif = (item) => {
    setIsEditNotif(!idEditNotif);
    setisAddNotif(!isAddNotif);
    setItemNotif(item);
    setHeader(item.header);
    setDescription(item.content);
    console.log(item);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit")
    setisAddNotif(!isAddNotif);
  }

  const handleCancel = () => {
    setisAddNotif(!isAddNotif);
  }

  return (
    <div className="w-full bg-white col-span-2 rounded-lg shadow mb-8">
      <div className="flex justify-between items-center mb-4 pt-3 border-b pl-8 pr-8 ">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Notifications</h2>
        {userType==='hr' && <button
          onClick={handleAddNotif}
          className=" flex gap-2 items-center rounded-3xl bg-blue-400 py-2 px-4 border border-transparent text-center text-md text-white transition-all shadow-sm hover:shadow-lg focus:bg-blue-400 focus:shadow-none active:bg-blue-400 hover:bg-blue-500 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2" 
          type="button"
        > <IoMdAddCircleOutline style={{fontSize: '14px'}} />
          <span>Add</span>
        </button>}
      </div>
      {!isAddNotif ? <div className="pb-8">
        {accData.map((val) => {
          return (
            <div className="font-[sans-serif] space-y-6 px-4 pb- max-w-6xl mx-auto mt-3">
              <div className=" p-3 rounded-lg" style={{ border: '0.1px solid lightgray'}} >
                <button 
                  type="button" 
                  className="w-full text-sm text-left font-semibold text-gray-800 flex items-center justify-between transition-all"
                >
                  <span onClick={() => handelClick(val)} className="mr-4 ">
                    {val.header}
                    <span className="bg-gradient-to-r from-fuchsia-600 to-indigo-600 bg-clip-text text-transparent ">&nbsp;&nbsp; ({val.date})</span>
                  </span>
                  <span className="flex items-center gap-2">
                    {val.isOpen ? <FaChevronUp onClick={() => handelClick(val)} style={{ fontSize: '24px', color: 'gray'}}/> : <FaChevronDown onClick={() => handelClick(val)} style={{ fontSize: '24px', color: 'gray'}} />}
                    {userType==='hr' && <MdOutlineEditNotifications 
                      className=" hover:rounded-full hover:shadow-2xl" 
                      onClick={(event) => handleEditNotif(val)} 
                      style={{ fontSize: '24px', color: 'gray'}} 
                    />}
                  </span>
                </button>

                {val.isOpen && 
                  <div className="mt-4 p-6 rounded-lg bg-blue-100">
                    <p className=" text-gray-800 leading-relaxed text-sm">{val.content}</p>
                  </div>
                }
              </div>
            </div>
          );
        })}
      </div>
      : <form onSubmit={handleSubmit} className="grid grid-cols-2 p-6 gap-4">

        <div className="grid grid-cols-5 gap-2 items-center">
          <label className="text-gray-800 col-span-1 text-sm mb-2">Header :</label>
          <div className="relative col-span-4 flex items-center w-full">
            <input
              name="last_name"
              type="text"
              value={header}
              onChange={(e) => setHeader(e.target.value)}
              required
              className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-2 rounded-lg outline-blue-400"
              placeholder="Enter header"
            />
          </div>
        </div>

        <div className="grid grid-cols-5 gap-2 items-center">
          <label className="text-gray-800 col-span-1 text-sm mb-2   ">Date :</label>
          <div className="relative col-span-4 flex items-center w-full">
            <input
              name="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-2 rounded-lg outline-blue-400"
              placeholder="Enter date "
            />
          </div>
        </div>

        <div className="grid grid-cols-10 col-span-2 gap-2 items-center">
          <label className="text-gray-800 col-span-1 text-sm mb-2   ">Description :</label>
          <div className="relative col-span-9 flex items-center w-full">
            <input
              name="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-2 rounded-lg outline-blue-400"
              placeholder="Enter Description"
            />
          </div>
        </div>

        <div className="flex justify-between col-span-2 gap-2">
          <div>
            <button
              type="button"
              className="rounded-full border bg-red-500 py-2 px-4 text-center text-sm transition-all text-white border-red-400 shadow-sm hover:shadow-lg hover:bg-red-500  disabled:pointer-events-none " 
            >
              Delete
            </button>
          </div>
          <div className="flex justify-end gap-2">
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
              Save
            </button>
          </div>
        </div>
      </form>}
    </div>
  );
}

export default Accordion