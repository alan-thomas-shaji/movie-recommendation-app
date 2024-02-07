import { img_300, unavailable } from "../../config";
import "./SingleContent.css";
import { Badge } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface ISingleContentProps {
  id: string;
  title: string;
  poster: string;
  date: string;
  media_type: string;
  vote_average: number;
}

const SingleContent = (props: ISingleContentProps) => {
    const navigate = useNavigate();
    const handleNavigate = (id: string, media_type: string) => {
        navigate(`/details/${media_type}/${id}`);
    };
  return (
    //   <ContentModal media_type={props.media_type} id={props.id}>
    <div className="media" onClick={()=> handleNavigate(props.id ,props.media_type)}>
      <Badge
        badgeContent={props.vote_average}
        color={props.vote_average > 6 ? "primary" : "secondary"}
      />
      <img
        className="poster"
        src={props.poster ? `${img_300}${props.poster}` : unavailable}
        alt={props.title}
      />
      <b className="title">{props.title.slice(0,20)}</b>
      <span className="subTitle">
        {props.media_type === "tv" ? "TV Series" : "Movie"}
        <span className="subTitle">{props.date}</span>
      </span>
    </div>
    //   </ContentModal>
  );
};

export default SingleContent;
