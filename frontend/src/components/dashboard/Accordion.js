import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

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

  return (
    accData.map((val) =><div className="font-[sans-serif] space-y-6 max-w-6xl mx-auto mt-3">
      <div className=" p-3 rounded-lg" style={{ border: '0.1px solid lightgray'}} >
        <button 
          type="button" 
          className="w-full text-sm text-left font-semibold text-gray-800 flex items-center transition-all"
          onClick={() => handelClick(val)}
        >
          <span className="mr-4 ">
            {val.header}
            <span className="bg-gradient-to-r from-fuchsia-600 to-indigo-600 bg-clip-text text-transparent ">&nbsp;&nbsp; ({val.date})</span>
          </span>
          {val.isOpen ? <FaChevronUp style={{ fontSize: '28px'}}/> : <FaChevronDown style={{ fontSize: '28px'}} />}
        </button>

        {val.isOpen && <div className="mt-4 p-6 rounded-lg bg-green-100">
          <p className=" text-gray-800 leading-relaxed text-sm">{val.content}</p>
        </div>}
      </div>
    </div>)
  );
}

export default Accordion