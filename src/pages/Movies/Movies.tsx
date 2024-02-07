import axios from "axios";
import { useEffect, useState } from "react";
import useGenre from "../../hooks/useGenre";
import SingleContent from "../../components/SingleContent/SingleContent";
import Genres from "../../components/Genres/Genres";

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

const Movies = () => {
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<IGenre[]>([]);
  // const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  // const [numOfPages, setNumOfPages] = useState();
  const genreforURL = useGenre(selectedGenres);

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_genres=${genreforURL}`
    );
    setContent(data.results);
    // setNumOfPages(data.total_pages);
  };

  useEffect(() => {
    window.scroll(0, 0);
    fetchMovies();
    // eslint-disable-next-line
  }, [genreforURL]);
  return (
    <div>
      <span className="pageTitle">Discover Movies</span>
      <Genres
        type="movie"
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        // setPage={setPage}
      />
      <div className="trending">
        {content &&
          content.map((contentItem: IContentType) => (
            <SingleContent
              key={contentItem.id}
              id={contentItem.id}
              poster={contentItem.poster_path}
              title={contentItem.title || contentItem.name}
              date={contentItem.release_date}
              media_type="movie"
              vote_average={contentItem.vote_average}
            />
          ))}
      </div>
      {/* {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )} */}
    </div>
  );
};

export default Movies;
