import React, { useState, useEffect } from "react";
import "./Home.scss";
import axios from "axios";
import Carousel from "react-material-ui-carousel";
import { URL_API, API } from "../../components/api";
import Loading from "../../components/Loading";
import MoviesList from "../../components/MoviesList";
import Footer from "../../components/Footer";

export default () => {
  const [dataNewMovies, setdataNewMovies] = useState([]);
  const [dataPopularMovies, setDataPopularMovies] = useState([]);
  const [dataTopMovies, setDataTopMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const newMovies = async () => {
    await axios
      .get(`${URL_API}/movie/now_playing?api_key=${API}&language=es-ES&page=1`)
      .then((response) => {
        setdataNewMovies(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const popularMovies = async () => {
    await axios
      .get(`${URL_API}/movie/popular?api_key=${API}&language=es-ES&page=1`)
      .then((response) => {
        setDataPopularMovies(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const topMovies = async () => {
    await axios
      .get(`${URL_API}/movie/top_rated?api_key=${API}&language=es-ES&page=1`)
      .then((response) => {
        setDataTopMovies(response.data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    newMovies();
    popularMovies();
    topMovies();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Carousel className="carusel" interval={7500}>
        {dataNewMovies.map((item, i) => (
          <>
            <div
              className="carusel__image"
              style={{
                backgroundImage: `url('https://image.tmdb.org/t/p/original${item.backdrop_path}')`,
              }}
            >
              <div className="carusel__content">
                <div className="carusel__content-description">
                  <img
                    src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                  />
                  <div className="descripcion">
                    <h2>{item.title}</h2>
                    <p>{item.overview}</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ))}
      </Carousel>
      <MoviesList titulo="Mas vistas" moviesData={dataTopMovies.slice(0,6)} link="/mas/vistas"/>
      <MoviesList titulo="Nuevas" moviesData={dataNewMovies.slice(0,6)} link="/new/movies"/>
      <MoviesList titulo="Populares" moviesData={dataPopularMovies.slice(0,6)} link="/popular"/>
      <Footer />
    </>
  );
};
