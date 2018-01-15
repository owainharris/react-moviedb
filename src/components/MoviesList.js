/* eslint react/no-did-mount-set-state: 0,
   eslint Unexpected console statement: 0
*/

import React, { Component } from 'react';
import styled from 'styled-components';
import Movie from './Movie';
import Show from './Show';


class MoviesList extends Component {
  state = {
    shows: [],
    movies: [],
  }

  async componentDidMount() {
    try {
      const res = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=6d6bfb73cf9249c6823b66d288187dd8&language=en-US&sort_by=popularity.desc&include_adult=no&include_video=true&page=1');
      const movies = await res.json();
      this.setState({
        movies: movies.results,
      });
    } catch (e) {
      console.log(e);
    }
    try {
      const res2 = await fetch('https://api.themoviedb.org/3/discover/tv?api_key=6d6bfb73cf9249c6823b66d288187dd8&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false');
      const shows = await res2.json();
      this.setState({
        shows: shows.results,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div>
        <div className="sectionTitle">
          <p>Popular Movies</p>
        </div>
        <MovieGrid>
          {this.state.movies.map(movie => <Movie key={movie.id} movie={movie} />)}
        </MovieGrid>
        <div className="sectionTitle">
          <p>Popular TV Series</p>
        </div>
        <ShowsGrid>
          {this.state.shows.map(show => <Show key={show.id} show={show} />)}
        </ShowsGrid>
      </div>
    );
  }
}

export default MoviesList;

const MovieGrid = styled.div`
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(6,1fr);
  grid-row-gap: 1rem;
`;

const ShowsGrid = styled.div`
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(6,1fr);
  grid-row-gap: 1rem;
`;
