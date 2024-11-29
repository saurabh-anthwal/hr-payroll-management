import React, { useEffect, useState } from "react";

function News() {
  const [news, setNews] = useState([]);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/news/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch news");
        }
        return res.json();
      })
      .then((data) => setNews(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300">
      <h2 className="text-xl font-semibold text-gray-800">Latest News</h2>
      <div className="h-[2px] bg-gray-200 mt-4 mb-6"></div>
      <div className="space-y-4">
        {news.length === 0 ? (
          <p className="text-gray-600 italic">Loading...</p>
        ) : (
          news.map((d, i) => (
            <NewsContent
              key={i}
              link={d.link}
              image={d.image}
              heading={d.heading}
            />
          ))
        )}
      </div>
    </div>
  );
}

export function NewsContent({ link, image, heading }) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg shadow-sm hover:bg-gray-100 transition duration-300"
    >
      <img
        src={image}
        alt="news"
        className="w-16 h-16 object-cover rounded-md shadow"
      />
      <span className="text-gray-800 font-medium">{heading}</span>
    </a>
  );
}

export default News;
