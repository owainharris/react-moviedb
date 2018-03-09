/* eslint react/no-did-mount-set-state: 0,
   eslint Unexpected console statement: 0
*/

import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Movie from './Movie';
import Show from './Show';


class MoviesList extends PureComponent {
  state = {
    shows: [],
    movies: [],
  }

  async componentDidMount() {
    try {
      const movieResponse = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=6d6bfb73cf9249c6823b66d288187dd8&language=en-US&sort_by=popularity.desc&include_adult=no&include_video=true&page=1');
      const movies = await movieResponse.json();
      this.setState({
        movies: movies.results,
      });
    } catch (e) {
      console.log(e);
    }
    try {
      const showResponse = await fetch('https://api.themoviedb.org/3/discover/tv?api_key=6d6bfb73cf9249c6823b66d288187dd8&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false');
      const shows = await showResponse.json();
      console.log(shows.results);
      this.setState({
        shows: shows.results,
      });
    } catch (err) {
      console.log(err);
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
grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
`;

const ShowsGrid = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
`;
