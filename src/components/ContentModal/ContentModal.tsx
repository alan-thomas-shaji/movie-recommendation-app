import { Backdrop, Button, Fade, Modal, makeStyles } from '@mui/material';
import YouTubeIcon from "@mui/icons-material/YouTube"
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { img_500, unavailable, unavailableLandscape } from '../../config';
import Carousel from '../Carousel/Carousel';
import './ContentModal.css'

interface IContentModalProps {
    children: any;
    media_type: any;
    id: any;
}

const ContentModal = (props: IContentModalProps) => {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState<any>({});
    const [video, setVideo] = useState();

    const handleOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const fetchData = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${props.media_type}/${props.id}?api_key=${import.meta.env.VITE_API_KEY}&language=en-US`
      );

      setContent(data);
      // console.log(data);
    };

    const fetchVideo = async () => {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/${props.media_type}/${props.id}/videos?api_key=${
          import.meta.env.VITE_API_KEY
        }&language=en-US`
      );

      setVideo(data.results[0]?.key);
    };

    useEffect(() => {
      fetchData();
      fetchVideo();
      // eslint-disable-next-line
    }, []);
  return (
    <>
      <div
        className="media"
        style={{ cursor: "pointer" }}
        color="inherit"
        onClick={handleOpen}
      >
        {props.children}
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="modal"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          {content && (
            <div className="paper">
              <div className="ContentModal">
                <img
                  src={
                    content.poster_path
                      ? `${img_500}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                />
                <img
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                  className="ContentModal__landscape"
                />
                <div className="ContentModal__about">
                  <span className="ContentModal__title">
                    {content.name || content.title} (
                    {(
                      content.first_air_date ||
                      content.release_date ||
                      "-----"
                    ).substring(0, 4)}
                    )
                  </span>
                  {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}

                  <span className="ContentModal__description">
                    {content.overview}
                  </span>

                  <div>
                    <Carousel id={props.id} media_type={props.media_type} />
                  </div>

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
            </div>
          )}
        </Fade>
      </Modal>
    </>
  );
}

export default ContentModal
