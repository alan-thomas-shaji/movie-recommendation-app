import React, { useEffect, useState } from 'react'
import useGenre from '../../hooks/useGenre';
import Genres from '../../components/Genres/Genres';
import SingleContent from '../../components/SingleContent/SingleContent';
import axios from 'axios';

interface IContentType {
  id: string;
  poster_path: string;
  title: string;
  name: string;
  release_date: string;
  media_type: string;
  vote_average: number;
}

interface IGenre {
  id: string;
  name: string;
}

const Series = () => {
    const [genres, setGenres] = useState<IGenre[]>([]);
    const [selectedGenres, setSelectedGenres] = useState<IGenre[]>([]);
    // const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();
    const genreforURL = useGenre(selectedGenres);

    const fetchSeries = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=${genreforURL}`
      );
      setContent(data.results);
      setNumOfPages(data.total_pages);
      // console.log(data);
    };

    useEffect(() => {
      window.scroll(0, 0);
      fetchSeries();
      // eslint-disable-next-line
    }, [genreforURL]);
  return (
    <div>
      <span className="pageTitle">Discover Series</span>
      <Genres
        type="tv"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        // setPage={setPage}
      />
      <div className="trending">
        {content &&
          content.map((c: IContentType) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.release_date}
              media_type="tv"
              vote_average={c.vote_average}
            />
          ))}
      </div>
      {/* {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )} */}
    </div>
  );
}

export default Series
