import React, { useState, useEffect } from "react";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import {
  FormControl,
  TextField,
  Grid,
  DialogContent,
  Card,
  CardContent,
  CardMedia,
  Chip
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { URL_API, API } from "../../components/api";
import axios from "axios";
import "./Search.scss";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import AcUnitIcon from "@material-ui/icons/AcUnit";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default (props) => {
  const { visible, setVisible } = props;
  const [moviesResult, setMoviesResult] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    (async () => {
      if (searchValue != undefined && searchValue != "") {
        await axios
          .get(
            `${URL_API}/search/movie?api_key=${API}&lenguage=es-ES&query=${searchValue}&page=1`
          )
          .then((response) => {
            setMoviesResult(response.data.results);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    })();
  }, [searchValue]);

  return (
    <>
      <Dialog fullScreen open={visible} TransitionComponent={Transition}>
        <AppBar style={{ backgroundColor: "#fff" }}>
          <Toolbar>
            <Typography variant="h6" className="titulo">
              <FormControl className="buscador">
                <TextField
                  autoFocus
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  label="Buscar..."
                  variant="outlined"
                  fullWidth
                />
              </FormControl>
              <span className="icon_close">
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={() => setVisible(false)}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </span>
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Grid container spacing={1} className="contenido">
            {moviesResult.length > 0 ? (
              moviesResult.map((event) => (
                <Grid
                  item
                  xs={12}
                  sm={6}
                  lg={3}
                >
                  <Link
                    to={{ pathname: `/movie/${event.id}` }}
                    style={{ textDecoration: "none" }}
                    onClick={() => setVisible(false)}
                  >
                    <Card className="root">
                      <div className="details">
                        <CardContent className="content">
                          <Typography component="h5" variant="h5">
                            {event.title}
                          </Typography>
                          <Typography variant="subtitle1" color="textSecondary">
                            <Chip
                              className="chip"
                              icon={<AcUnitIcon />}
                              label={`${event.vote_count} votos`}
                              size="small"
                            />
                            <Chip
                              className="chip"
                              icon={<PlayCircleFilledWhiteIcon />}
                              label={`Idioma: ${event.original_language}`}
                              size="small"
                            />
                          </Typography>
                        </CardContent>
                      </div>
                      <CardMedia
                        className="cover"
                        image={`https://image.tmdb.org/t/p/original${event.poster_path}`}
                      />
                    </Card>
                  </Link>
                </Grid>
              ))
            ) : (
              <div className="empty">
                <img src="/img/animacionvideo.gif" alt="Empty"/>
              </div>
            )}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};
