import React, {useState, useEffect} from 'react';
import "./Popular.scss";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Chip,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import BrightnessMediumIcon from "@material-ui/icons/BrightnessMedium";
import Loading from "../../components/Loading";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import StarIcon from "@material-ui/icons/Star";
import moment from "moment";
import Footer from "../../components/Footer";
import axios from "axios";
import { URL_API, API } from "../../components/api";

export default () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const newMovies = async () => {
    await axios
      .get(`${URL_API}/movie/popular?api_key=${API}&language=es-ES&page=1`)
      .then((response) => {
        setData(response.data.results.reverse());
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    newMovies();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Grid
        container
        spacing={1}
        className="maxWidth"
        style={{ paddingTop: 50 }}
      >
        <Grid item xs={12}>
          <Typography className="title__popular" variant="h4">
            películas populares <BrightnessMediumIcon />
          </Typography>
        </Grid>
        {data ? (
          data.map((event) => (
            <Grid item xs={12} sm={6} md={4} lg={4} xl={2}>
              <Card>
                <Link className="lista" to={{ pathname: `/movie/${event.id}` }}>
                  <CardActionArea>
                    <CardMedia
                      className="image"
                      image={`https://image.tmdb.org/t/p/original${event.poster_path}`}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {event.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        <Chip
                          className="chip"
                          icon={<AcUnitIcon />}
                          label={`${event.vote_count} votos`}
                          size="small"
                        />
                        <Chip
                          className="chip"
                          icon={<PlayCircleFilledWhiteIcon />}
                          label={`Publicación: ${moment(
                            event.release_date
                          ).format("MM/YY")}`}
                          size="small"
                        />
                        <Chip
                          className="chip"
                          icon={<StarIcon />}
                          label={`${event.popularity} vistas`}
                          size="small"
                        />
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Link>
              </Card>
            </Grid>
          ))
        ) : (
          <Loading />
        )}
      </Grid>
      <Footer />
    </>
  );
};
