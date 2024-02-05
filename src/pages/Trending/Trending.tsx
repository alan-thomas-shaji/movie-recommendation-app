import axios from "axios";
import React, { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";

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
              {
                  content && content.map((contentItem: any) => (
                      <div>
                          <SingleContent />
                      </div>
                  ))
              }
          </div>
    </div>
  );
};

export default Trending;
