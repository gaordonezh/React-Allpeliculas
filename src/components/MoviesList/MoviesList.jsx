import react from "react";
import "./MoviesList.scss";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
  Chip,
  Button
} from "@material-ui/core";
import { Link } from "react-router-dom";
import BrightnessMediumIcon from "@material-ui/icons/BrightnessMedium";
import Loading from "../../components/Loading";
import AcUnitIcon from "@material-ui/icons/AcUnit";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import StarIcon from "@material-ui/icons/Star";
import moment from 'moment';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

export default (props) => {
  const { titulo, moviesData, link } = props;
  return (
    <>
      <Typography className="title__popular" variant="h4">
        {titulo} <BrightnessMediumIcon />
      </Typography>
      <Grid container spacing={1} className="maxWidth">
        {moviesData ? (
          moviesData.map((event) => (
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
                          label={`Publicación: ${moment(event.release_date).format('MM/YY')}`}
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

        <Grid item xs={12} align="center">
          <Link to={{pathname:`${link}`}} style={{textDecoration:'none'}}>
            <Button color="inherit" variant="outlined">
              Ver mas <MoreHorizIcon/>
            </Button>
          </Link>
        </Grid>
      </Grid>
    </>
  );
};
