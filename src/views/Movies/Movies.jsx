import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  makeStyles,
  Button,
  Chip,
  Dialog,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import axios from "axios";
import { URL_API, API } from "../../components/api";
import Loading from "../../components/Loading";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import moment from "moment";
import "./Movies.scss";

const useStyles = makeStyles({
  dialogPaper: {
    maxWidth: "96%",
    minWidth: "95%",
  },
  video: {
    width: "100%",
    height: "100vh",
  },
});

export default () => {
  let { id } = useParams();
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModalVideo, setOpenModalVideo] = useState(false);

  const getMovie = async () => {
    await axios
      .get(`${URL_API}/movie/${id}?api_key=${API}&lenguaje=es-ES`)
      .then((response) => {
        setMovie(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getMovie();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <section
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
      className="section_movie"
    >
      <div className="hero"></div>
      <Grid container spacing={0} className="container">
        <Grid item xs={12} sm={5} md={6} className="left">
          <img
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt="Imagen"
            height="450px"
          />
        </Grid>
        <Grid item xs={12} sm={7} md={6} className="right">
          <Typography variant="h4" style={{ color: "#fff" }}>
            {movie.title}{" "}
            <Trailer
              id={id}
              setVisibleModal={setOpenModalVideo}
              visibleModal={openModalVideo}
            />
            <Button
              className="button"
              onClick={() => {
                setOpenModalVideo(true);
              }}
            >
              {" "}
              <PlayCircleOutlineIcon />{" "}
            </Button>
          </Typography>
          
          <Typography variant="body1" style={{ color: "#fff" }}>
            {movie.overview}
          </Typography>
          <span className="description_last" style={{ color: "#fff", margin:'20px 0' }}>
            {movie.tagline}{" "}
            {movie.homepage && (
                <Button href={movie.homepage} variant="outlined" color="secondary" target="_blank">
                  Ver Película <OpenInNewIcon />
                </Button>
            )}
          </span>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} style={{ paddingLeft: "50px" }}>
              <ul style={{ listStyle: "square" }}>
                {movie.genres.length > 0 &&
                  movie.genres.map((event) => (
                    <li style={{ color: "#fff" }}>{event.name}</li>
                  ))}
              </ul>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Chip
                label={`${movie.vote_count} votos`}
                color="secondary"
                style={{ color: "#fff", margin: 2 }}
              />
              <Chip
                label={`Lanzamiento: ${moment(movie.release_date).format(
                  "MM/YYYY"
                )}`}
                color="secondary"
                style={{ color: "#fff", margin: 2 }}
              />
              <Chip
                label={`Duración: ${movie.runtime} minutos`}
                color="secondary"
                style={{ color: "#fff", margin: 2 }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </section>
  );
};

function Trailer(props) {
  const classes = useStyles();
  const { visibleModal, setVisibleModal, id } = props;
  const [videoInfo, setVideoInfo] = useState([]);

  const movieVideo = async () => {
    await axios
      .get(`${URL_API}/movie/${id}/videos?api_key=${API}&lenguaje=es-ES`)
      .then((response) => {
        setVideoInfo(response.data.results[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    movieVideo();
  }, []);

  return (
    <Dialog
      open={visibleModal}
      onClose={() => setVisibleModal(false)}
      classes={{ paper: classes.dialogPaper }}
    >
      <iframe
        className={classes.video}
        src={
          videoInfo.site == "YouTube"
            ? `https://www.youtube.com/embed/${videoInfo.key}`
            : `https://player.vimeo.com/video/${videoInfo.key}`
        }
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    </Dialog>
  );
}
