import React, { useEffect, useState } from "react";
import "./News.css";

function News() {
  const [news, setNews] = useState([]);

  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/news/`, {
      headers: {
        "Authorization": `Bearer ${token}`,
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
    <div className="News shadow hover">
      <span className="News__title">Latest News</span>
      <div className="Wishes__horizontalLine"></div>
      <div className="News__content">
        {/* {news.length == 0 ? (
          <span>Loading...</span>
        ) : (
          news?.map((d, i) => (
            <NewsContent
              key={i}
              link={d.link}
              image={d.image}
              heading={d.heading}
            />
          ))
        )} */}
      </div>
    </div>
  );
}

export default News;

export function NewsContent({ link, image, heading }) {
  return (
    <div className="News__content__div">
      <a href={link} target="_blank">
        <div>
          <img src={image} alt="news-image" width="70px" height="70px" />
        </div>
        <div className="News__content__heading">
          <span>{heading}</span>
        </div>
      </a>
    </div>
  );
}
