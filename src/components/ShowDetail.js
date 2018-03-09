/* eslint linebreak-style: ["error", "windows"] */
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
          number: season.season_number + 1,
        }
      ));
      console.log(seasons);
      this.setState({
        show,
        seasons,
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { show, seasons } = this.state;
    return (
      <ShowWrapper backdrop={`${BACKDROP_PATH}${show.backdrop_path}`}>
        <ShowInfo>

          <Overdrive id={show.id}>
            <Poster src={`${POSTER_PATH}${show.poster_path}`} alt={show.title} />
          </Overdrive>

          <DetailsDiv>
            <h1>{show.title}</h1>
            <p><span className="subDetails">Release Date: </span> {show.first_air_date}</p>
            <p><span className="subDetails">Rating: </span> {show.vote_average}</p>
          </DetailsDiv>

          <Synopsis>
          <h3>Synopsis:</h3>
          <p>{show.overview}</p>
          </Synopsis>

        </ShowInfo>
        <SeasonsGrid>
          {seasons.map(season => <Season key={season.id} movie={season} />)}
        </SeasonsGrid>
      </ShowWrapper>
    );
  }
}


export default ShowDetail;

const ShowWrapper = styled.div`
position: relative;
padding-top: 50vh;
background: url(${props => props.backdrop}) no-repeat;
background-size: 100%;
`;

const ShowInfo = styled.div`
display: grid;
grid-gap: 30px;
grid-template-rows: repeat(auto-fit, 150px);
grid-template-columns: repeat(auto-fit, 150px 1fr);
  text-align: left;
  padding: 2rem 10%;
  background: white;
  img {
    position: relative;
    top: -5rem;
  }
`;

const DetailsDiv = styled.div`
grid-column: 2 / span 3;
`;

const Synopsis = styled.div`
grid-column: 1 / span 2;
`;


const SeasonsGrid = styled.div`
background: white;
display: grid;
grid-gap: 10px;
grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;