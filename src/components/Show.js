import React from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';

const Show = ({ show }) => (
  <Link to={`/ShowDetail/${show.id}`}>
    <Overdrive id={show.id}>
      <Poster src={`${POSTER_PATH}${show.poster_path}`} alt={show.title} />
    </Overdrive>
  </Link>
);

export default Show;

Show.propTypes = {
  show: PropTypes.shape({
    title: PropTypes.string.isRequired,
    backdrop_path: PropTypes.string.isRequired,
  }).isRequired,
};

export const Poster = styled.img`
 box-shadow: 0 0 35px black;
`;