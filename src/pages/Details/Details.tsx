import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Chip } from "@mui/material";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LanguageIcon from "@mui/icons-material/Language";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { img_500, unavailable, unavailableLandscape } from "../../config";
import "./Details.css";

interface IContentType {
  id: string;
  profile_path: string;
  poster_path: string;
  backdrop_path: string;
  title: string;
  overview: string;
  homepage: string;
  tagline: string;
  name: string;
  release_date: string;
  runtime: string;
  media_type: string;
  vote_average: number;
}

interface IGenre {
  id: string;
  name: string;
}

const Details = () => {
  const initialValueContent = {
    id: "",
    profile_path: "",
    poster_path: "",
    backdrop_path: "",
    title: "",
    name: "",
    release_date: "",
    tagline: "",
    overview: "",
    homepage: "",
    media_type: "",
    runtime: "",
    vote_average: 0,
  };
  const [content, setContent] = useState<IContentType>(initialValueContent);
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [video, setVideo] = useState<string>("");
  const { media_type, id } = useParams();

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=en-US`
    );

    setContent(data);
    console.log(data);
    setGenres(data?.genres);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${
        import.meta.env.VITE_API_KEY
      }&language=en-US`
    );

    setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    scrollTo(0, 0);
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="details-container">
      <div className="image-container">
        <img
          src={
            content.backdrop_path
              ? `${img_500}/${content.backdrop_path}`
              : unavailableLandscape
          }
          alt={content.name || content.title}
          className="ContentModal__landscape"
        />
        <img
          src={
            content.poster_path
              ? `${img_500}/${content.poster_path}`
              : unavailable
          }
          alt={content.name || content.title}
          className="ContentModal__portrait"
        />
      </div>
      <div className="card-container">
        <div className="ContentModal__about">
          <span className="ContentModal__title">
            {content.name || content.title} (
            {(
              content.release_date ||
              "-----"
            ).substring(0, 4)}
            )
          </span>
          <div className="tagline-container">
            {content.tagline && <i className="tagline">"{content.tagline}"</i>}
          </div>

          <span className="ContentModal__description">{content.overview}</span>

          <div className="ButtonContainer">
            <Button
              variant="contained"
              startIcon={<YouTubeIcon />}
              color="secondary"
              target="__blank"
              href={`https://www.youtube.com/watch?v=${video}`}
            >
              Watch the Trailer
            </Button>
          </div>
        </div>
        <div className="flex">
          {content?.homepage && (
            <div className="flex">
              <LanguageIcon />
              <a href={content?.homepage} className="link">
                Visit Homepage
              </a>
            </div>
          )}
          {content?.homepage && (
            <div className="flex">
              <CalendarMonthIcon />
              {content?.release_date}
            </div>
          )}
          {content?.runtime && (
            <div className="flex">
              <AccessTimeIcon />
              {content?.runtime}m
            </div>
          )}
          {content?.vote_average && (
            <div className="flex">
              <StarBorderIcon />
              {content?.vote_average}/10
            </div>
          )}
        </div>
        <div className="tags">
          <span className="tags-title">Tags</span>
          <div>
            {genres.map((genre: IGenre) => (
              <Chip
                style={{ margin: 2, backgroundColor: "white" }}
                label={genre.name}
                key={genre.id}
                clickable
                size="small"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
