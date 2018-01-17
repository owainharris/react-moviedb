/* eslint react/no-did-mount-set-state: 0,
   eslint Unexpected console statement: 0
*/

import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';
import { Poster } from './Movie';
import Season from './Season';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';
const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w1280';

class ShowDetail extends PureComponent {
  state = {
    show: {},
    seasons: [],
  }

  async componentDidMount() {
    try {
      const showList = await fetch(`https://api.themoviedb.org/3/tv/${this.props.match.params.id}?api_key=6d6bfb73cf9249c6823b66d288187dd8&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false`);
      const show = await showList.json();
      const seasons = show.seasons.map(season => (
        {
          id: season.id,
          air_date: season.air_date,
          poster_path: season.poster_path,
          number: season.season_number,
        }
	  ));
      this.setState({
        show,
        seasons,
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { show } = this.state;
    return (
      <ShowWrapper backdrop={`${BACKDROP_PATH}${show.backdrop_path}`}>
        <ShowInfo>
          <Overdrive id={show.id}>
            <Poster src={`${POSTER_PATH}${show.poster_path}`} alt={this.state.show.title} />
          </Overdrive>
          <div>
            <h1>{this.state.show.title}</h1>
            <p><span className="subDetails">Release Date: </span> {this.state.show.first_air_date}</p>
            <p><span className="subDetails">Rating: </span> {this.state.show.vote_average}</p>
            <p className="synopsis">Synopsis:</p>
            <p>{this.state.show.overview}</p>
          </div>
        </ShowInfo>
        <SeasonsGrid>
          {this.state.seasons.map(season => <Season key={season.id} movie={season} />)}
        </SeasonsGrid>
      </ShowWrapper>
    );
  }
}


export default ShowDetail;

const ShowWrapper = styled.div`
  position: relative;
  containerRight: text-align: center;
  padding-top: 50vh;
  background: url(${props => props.backdrop}) no-repeat;
  background-size: 100%;
`;

const ShowInfo = styled.div`
  background: white;
  text-align: left;
  padding: 2rem 10%;
  display: flex;
  > div {
    margin-left: 20px;
  }
  img {
    position: relative;
    top: -5rem;
  }
`;

const SeasonsGrid = styled.div`
  background: white;
  display: grid;
  padding: 1rem;
  grid-template-columns: repeat(4,1fr);
  grid-row-gap: 1rem;
`;
