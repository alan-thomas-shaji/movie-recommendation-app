import axios from "axios";
import React, { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import './Trending.css'

const Trending = () => {
  const [content, setContent] = useState([]);
  const fetchTrending = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${
        import.meta.env.VITE_API_KEY
      }`
    );
    setContent(data.results);
  };
  useEffect(() => {
    fetchTrending();
  }, []);
  return (
    <div>
      <span className="pageTitle">Trending</span>
      <div className="trending">
        {content &&
          content.map((contentItem: any) => (
            <div key={contentItem.id}>
              <SingleContent
                key={contentItem.id}
                id={contentItem.id}
                poster={contentItem.poster_path}
                title={contentItem.title || contentItem.name}
                date={contentItem.release_date}
                media_type={contentItem.media_type}
                vote_average={contentItem.vote_average}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Trending;
