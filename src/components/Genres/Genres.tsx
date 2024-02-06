import { Chip } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react'

interface IGenresProps {
  selectedGenres: any[];
  setSelectedGenres: (arg1: any) => void;
  genres: IGenre[];
  setGenres: (arg1: any) => void;
  type: any;
  //   setPage: ()=> void;
}

interface IGenre {
    id: any;
    name: string;
}

const Genres = (props: IGenresProps) => {

    const handleAdd = (genre: IGenre) => {
      props.setSelectedGenres([...props.selectedGenres, genre]);
      props.setGenres(props.genres.filter((g: IGenre) => g.id !== genre.id));
      //   setPage(1);
    };

    const handleRemove = (genre: IGenre) => {
      props.setSelectedGenres(
        props.selectedGenres.filter(
          (selected: IGenre) => selected.id !== genre.id
        )
      );
      props.setGenres([...props.genres, genre]);
      //   setPage(1);
    };

    const fetchGenres = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/genre/${props.type}/list?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`
      );
      props.setGenres(data.genres);
    };

    useEffect(() => {
      fetchGenres();

      return () => {
        props.setGenres([]); // unmounting
      };
      // eslint-disable-next-line
    }, []);
  return (
    <div style={{ padding: "6px 0" }}>
      {props.selectedGenres.map((genre) => (
        <Chip
          style={{ margin: 2}}
          label={genre.name}
          key={genre.id}
          color="primary"
          clickable
          size="small"
          onDelete={() => handleRemove(genre)}
        />
      ))}
      {props.genres.map((genre: IGenre) => (
        <Chip
          style={{ margin: 2, padding: 10, fontSize: "1rem", backgroundColor: 'white' }}
          label={genre.name}
          key={genre.id}
          clickable
          size="small"
          onClick={() => handleAdd(genre)}
        />
      ))}
    </div>
  );
}

export default Genres
