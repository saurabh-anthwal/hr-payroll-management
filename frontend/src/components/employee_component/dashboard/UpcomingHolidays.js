import React from "react";

const holidays = [
  {
    name: "New Year's Day",
    date: "2024-01-01",
    description: "The first day of the year in the Gregorian calendar, celebrated with fireworks, parties, and other festivities. It marks a new beginning, filled with hope and opportunities.",
    imageUrl: "https://storage.googleapis.com/a1aa/image/5311ea35-a957-404a-b1ae-1df913264619.jpeg",
    quote: "Cheers to a new year and another chance for us to get it right. – Oprah Winfrey",
  },
  {
    name: "Christmas",
    date: "2024-12-25",
    description: "A holiday celebrating the birth of Jesus Christ, traditionally marked by gift-giving, decorations, and festive meals. It's a time for family and love.",
    imageUrl: "https://storage.googleapis.com/a1aa/image/5b061e2a-48ba-4bf9-8430-1f76eb236e07.jpeg",
    quote: "Christmas isn't a season. It's a feeling. – Edna Ferber",
  },
  {
    name: "Thanksgiving",
    date: "2024-11-28",
    description: "A day of giving thanks for the harvest and the blessings of the past year, typically celebrated with family gatherings and a feast.",
    imageUrl: "https://storage.googleapis.com/a1aa/image/fd9ee289-c8bd-46f8-81b8-a2e7286c3cf8.jpeg",
    quote: "Gratitude turns what we have into enough. – Aesop",
  },
];

const HolidayCard = ({ holiday }) => {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-xl bg-white border border-gray-200 group">
      <img
        className="w-full h-64 object-cover group-hover:opacity-75 transition-opacity duration-300"
        src={holiday.imageUrl}
        alt={holiday.name}
      />
      <div className="px-6 py-4">
        <h2 className="text-2xl font-bold text-gray-900">{holiday.name}</h2>
        <p className="text-sm text-gray-500 mb-4">{new Date(holiday.date).toLocaleDateString()}</p>
        <p className="text-gray-700 mb-4">{holiday.description}</p>
        <blockquote className="italic text-gray-600 border-l-4 border-blue-500 pl-4 mt-4">
          "{holiday.quote}"
        </blockquote>
      </div>
      <div className="px-6 py-4">
        <button className="text-white bg-blue-500 hover:bg-blue-700 font-semibold py-2 px-4 rounded-full w-full">
          Learn More
        </button>
      </div>
    </div>
  );
};

const HolidayList = () => {
  return (
    <div className="container mx-auto py-8 px-4 bg-white">
      <h2 className="flex justify-center gap-2 text-4xl font-extrabold text-center text-gray-600 mb-10"><img className="w-40" src="https://dataclaps.com/wp-content/uploads/2020/09/Screenshot-2023-03-18-at-2.36.25-AM.png" alt="" /> Holiday</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {holidays.map((holiday) => (
          <HolidayCard key={holiday.name} holiday={holiday} />
        ))}
      </div>
    </div>
  );
};

export default HolidayList;
