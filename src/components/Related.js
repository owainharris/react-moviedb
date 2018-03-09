import React from 'react';
import styled from 'styled-components';
import { Card } from 'material-ui/Card';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';
let IMG_PATH = '';

const Related = (related) => {
  if (related.movie.poster_path != null) {
    IMG_PATH = `${POSTER_PATH}${related.movie.poster_path}`;
  } else {
    IMG_PATH = 'https://cdn.browshot.com/static/images/not-found.png';
  }
  return (
    <MuiThemeProvider>
      <Card>
        <SeasonPoster src={`${IMG_PATH}`} alt={related.movie.title} />
        <h3>{related.movie.title}</h3>
      </Card>
    </MuiThemeProvider>
  );
};



export default Related;

export const SeasonPoster = styled.img`
  box-shadow: 0 0 35px black;
  width: 155px;
  height: 225px;
  margin-top: 1em;

`;

export const card = styled.div`
box-shadow: rgba(0, 0, 0, 0.12) 0px 20px 16px, rgba(0, 0, 0, 0.12) 0px 20px 14px
`;
