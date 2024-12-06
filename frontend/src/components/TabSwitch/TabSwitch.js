import React, { useState } from "react";

const TabSwitch = ({ tabs, components }) => {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabClick = (index) => {
    setCurrentTab(index);
  };

  return (
    <div className="p-4">
      <div className="flex border-b mb-4">
        {tabs.map((tabName, index) => (
          <button
            key={index}
            onClick={() => handleTabClick(index)}
            className={`px-4 py-2 ${
              currentTab === index
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
          >
            {tabName}
          </button>
        ))}
      </div>
      <div className="p-4">
        {components[currentTab]}
      </div>
    </div>
  );
};

export default TabSwitch;
