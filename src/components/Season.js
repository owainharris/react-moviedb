/* eslint linebreak-style: ["error", "windows"] */
import React from 'react';
import styled from 'styled-components';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';
let IMG_PATH = '';

const Season = function season(show) {
  if (show.movie.poster_path != null) {
    IMG_PATH = `${POSTER_PATH}${show.movie.poster_path}`;
  } else {
    IMG_PATH = 'https://cdn.browshot.com/static/images/not-found.png';
  }
  return (
    <div>
      <p>
        <h3>Season: {show.movie.number}</h3>
      </p>
      <SeasonPoster src={`${IMG_PATH}`} alt={show.movie.title} />;
    </div>
  );
};

export default Season;

export const SeasonPoster = styled.img`
  box-shadow: 0 0 35px black;
  width: 155px;
  height: 225px;
`;
