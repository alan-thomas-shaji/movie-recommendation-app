import React from 'react'
import { img_300, unavailable } from '../../config';
import './SingleContent.css'
import { Badge } from '@mui/material';

interface ISingleContentProps {
  id: any;
  title: any;
  poster: any;
  date: any;
  media_type: any;
  vote_average: any;
}

const SingleContent = (props: ISingleContentProps) => {
  return (
    <div className="media">
      <Badge
        badgeContent={props.vote_average}
        color={props.vote_average > 6 ? "primary" : "secondary"}
      />
      <img
        className="poster"
        src={props.poster ? `${img_300}${props.poster}` : unavailable}
        alt={props.title}
      />
      <b className="title">{props.title}</b>
      <span className="subTitle">
        {props.media_type === "tv" ? "TV Series" : "Movie"}
        <span className="subTitle">{props.date}</span>
      </span>
    </div>
  );
}

export default SingleContent
