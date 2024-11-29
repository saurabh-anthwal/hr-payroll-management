import React, { useEffect, useState } from "react";
import moment from "moment";

function Calender() {
  const currentDate = moment().date();
  const currentMonth = moment().month() + 1;
  const currentYear = moment().year();
  const listOfDays = ["S", "M", "T", "W", "T", "F", "S"];
  const listOfMonths = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  const listOfYears = [];

  let yr = currentYear + 1;
  while (yr >= 1950) {
    listOfYears.push(yr);
    yr--;
  }

  const [input, setInput] = useState({
    month: currentMonth,
    year: currentYear,
  });
  const [date, setDate] = useState(input.month + "/" + input.year);

  useEffect(() => {
    setDate(input.month + "/" + input.year);
  }, [input]);

  let startDay = moment(date, "MM/YYYY").startOf("month").format("d");
  let blanks = [];
  for (let i = 0; i < startDay; i++) {
    blanks.push("");
  }

  let lastDate = moment(date, "MM/YYYY").endOf("month").format("D");
  let daysOfMonth = [];
  for (let i = 1; i <= lastDate; i++) {
    daysOfMonth.push(i);
  }

  let totalSlots = [...blanks, ...daysOfMonth];
  let rows = [];
  let cells = [];

  totalSlots.forEach((day, i) => {
    cells.push(
      <td
        key={i}
        className={`p-2 text-center ${
          day === currentDate &&
          input.year === currentYear &&
          input.month === currentMonth
            ? "bg-blue-500 text-white font-bold"
            : "text-gray-700"
        }`}
      >
        {day}
      </td>
    );
    if ((i + 1) % 7 === 0 || i === totalSlots.length - 1) {
      rows.push(<tr key={i}>{cells}</tr>);
      cells = [];
    }
  });

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300">
      <div className="flex justify-between items-center mb-4">
        <select
          className="bg-gray-100 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input.month}
          onChange={(e) => setInput({ ...input, month: parseInt(e.target.value) })}
        >
          {listOfMonths.map((month, i) => (
            <option key={i} value={i + 1}>
              {month}
            </option>
          ))}
        </select>
        <select
          className="bg-gray-100 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input.year}
          onChange={(e) => setInput({ ...input, year: parseInt(e.target.value) })}
        >
          {listOfYears.map((year, i) => (
            <option key={i} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            {listOfDays.map((day, i) => (
              <th
                key={i}
                className="p-2 text-gray-500 text-sm font-medium text-center"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
}

export default Calender;
