import React from 'react';
import styled from 'styled-components';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';


const Season = function season(show) {
  return (
    <div>
      <p><h3>Season: {show.movie.number}</h3></p>
      <SeasonPoster src={`${POSTER_PATH}${show.movie.poster_path}`} alt={show.movie.title} />;
    </div>);
};


export default Season;

export const SeasonPoster = styled.img`
 box-shadow: 0 0 35px black;
`;
