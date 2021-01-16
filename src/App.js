import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Error404 from "./views/Errors/404";
import Movie from "./views/Movies";
import NewMovies from "./views/NewMovies";
import Popular from "./views/Popular";
import MoreViews from "./views/MoreViews";

export default () => {
  return (
    <Router>
      <Navbar />
      <section>
        <Switch>
          <Route path="/" exact={true}>
            <Home />
          </Route>
          <Route path="/new/movies" exact={true}>
            <NewMovies />
          </Route>
          <Route path="/mas/vistas" exact={true}>
            <MoreViews />
          </Route>
          <Route path="/popular" exact={true}>
            <Popular />
          </Route>
          <Route path="/movie/:id" exact={true}>
            <Movie />
          </Route>
          <Route path="*">
            <Error404 />
          </Route>
        </Switch>
      </section>
    </Router>
  );
};
