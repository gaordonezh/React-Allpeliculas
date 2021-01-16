import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import AppsIcon from "@material-ui/icons/Apps";
import MovieFilterIcon from "@material-ui/icons/MovieFilter";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import SearchIcon from "@material-ui/icons/Search";
import Search from "../../views/Search";
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import "./NavBar.scss";

export default () => {
  const [activeBtn, setActiveBtn] = useState("");
  const [visibleMenuOpen, setvisibleMenuOpen] = useState("");
  const [visibleDialogSearch, setVisibleDialogSearch] = useState(false);

  const visibleMenu = () => {
    if (activeBtn == "active_btn" || visibleMenuOpen == "active") {
      setActiveBtn("");
      setvisibleMenuOpen("");
    } else {
      setActiveBtn("active_btn");
      setvisibleMenuOpen("active");
    }
  };
  const closeMenu = () => {
    setActiveBtn("");
    setvisibleMenuOpen("");
  };

  return (
    <>
      {visibleDialogSearch && (
        <Search
          visible={visibleDialogSearch}
          setVisible={setVisibleDialogSearch}
        />
      )}

      <header>
        <div className={`menu ${activeBtn}`} onClick={() => visibleMenu()}>
          <div className="menu__lineTop"></div>
          <div className="menu__lineCenter"></div>
          <div className="menu__lineBottom"></div>
        </div>
        <nav>
          <div className="logo">
            <img
              src="https://allpeliculas.mx/wp-content/uploads/2020/10/logo2-300x63-1.png"
              height="100%"
            />
          </div>
          <div className={`links ${visibleMenuOpen}`}>
            <Link to={{ pathname: "/" }} className="links__link">
              <Button variant="inherit" onClick={() => closeMenu()}>
                <AppsIcon style={{ fontSize: 30, marginRight: 7 }} /> Home
              </Button>
            </Link>
            <Link to={{ pathname: "/mas/vistas" }} className="links__link">
              <Button variant="inherit" onClick={() => closeMenu()}>
                <NewReleasesIcon style={{ fontSize: 30, marginRight: 7 }} /> Mas vistas
              </Button>
            </Link>
            <Link to={{ pathname: "/new/movies" }} className="links__link">
              <Button variant="inherit" onClick={() => closeMenu()}>
                <MovieFilterIcon style={{ fontSize: 30, marginRight: 7 }} />{" "}
                Nuevas
              </Button>
            </Link>
            <Link to={{ pathname: "/popular" }} className="links__link">
              <Button variant="inherit" onClick={() => closeMenu()}>
                <GroupWorkIcon style={{ fontSize: 30, marginRight: 7 }} />{" "}
                Popular
              </Button>
            </Link>
            <Link className="links__link">
              <Button
                variant="inherit"
                onClick={() => {
                  closeMenu();
                  setVisibleDialogSearch(true);
                }}
              >
                <SearchIcon style={{ fontSize: 30, marginRight: 7 }} /> Buscar
              </Button>
            </Link>
          </div>
        </nav>
      </header>
    </>
  );
};
