import React, { useState, useEffect } from "react";
import {
  CardContent,
  Typography,
  Grid,
  IconButton,
  Link,
} from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
import GitHubIcon from "@material-ui/icons/GitHub";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import LanguageIcon from "@material-ui/icons/Language";
import "./Footer.scss";

export default () => {
  return (
    <footer>
      <CardContent className="footer">
        <Typography color="textSecondary">
          <Grid container className="redes">
            <IconButton>
              <Link href="https://twitter.com/gaordonezh" target="_blank">
                <TwitterIcon />
              </Link>
            </IconButton>
            <IconButton>
              <Link href="https://www.facebook.com/gaordonezh/" target="_blank">
                <FacebookIcon />
              </Link>
            </IconButton>
            <IconButton>
              <Link href="https://www.instagram.com/gaordonezh/" target="_blank">
                <InstagramIcon />
              </Link>
            </IconButton>
            <IconButton>
              <Link href="https://github.com/gaordonezh" target="_blank">
                <GitHubIcon />
              </Link>
            </IconButton>
            <IconButton>
              <Link href="https://api.whatsapp.com/send?phone=51902046246&text=hola" target="_blank">
                <WhatsAppIcon />
              </Link>
            </IconButton>
            <IconButton>
              <Link href="https://aldo.codes" target="_blank">
                <LanguageIcon />
              </Link>
            </IconButton>
          </Grid>
        </Typography>
      </CardContent>
    </footer>
  );
};
