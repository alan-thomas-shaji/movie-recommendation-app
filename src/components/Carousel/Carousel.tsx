import { useEffect, useState } from 'react'
import { img_300, noPicture } from '../../config';
import axios from 'axios';
import AliceCarousel from 'react-alice-carousel';
import './Carousel.css'

const handleDragStart = (e: any) => e.preventDefault();

interface ICarouselProps {
    id: string;
    media_type: string;
}

interface IContentType {
  id: string;
  profile_path: string;
  poster_path: string;
  title: string;
  name: string;
  release_date: string;
  media_type: string;
  vote_average: number;
}

const Carousel = (props: ICarouselProps) => {
    const [credits, setCredits] = useState([]);
    const items = credits.map((c: IContentType) => (
      <div className="carouselItem">
        <img
          src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
          alt={c?.name}
          onDragStart={handleDragStart}
          className="carouselItem__img"
        />
        <b className="carouselItem__txt">{c?.name}</b>
      </div>
    ));

    const responsive = {
      0: {
        items: 3,
      },
      512: {
        items: 5,
      },
      1024: {
        items: 7,
      },
    };

    const fetchCredits = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${props.media_type}/${props.id}/credits?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`
      );
      setCredits(data.cast);
    };

    useEffect(() => {
      fetchCredits();
    }, []);
  return (
    <AliceCarousel
      mouseTracking
      infinite
      disableDotsControls
      disableButtonsControls
      responsive={responsive}
      items={items}
      autoPlay
    />
  );
}

export default Carousel
