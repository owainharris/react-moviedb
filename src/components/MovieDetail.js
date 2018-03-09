/* eslint react/no-did-mount-set-state: 0,
   eslint Unexpected console statement: 0
*/

import React, { PureComponent } from "react";
import styled from "styled-components";
import YouTube from "react-youtube";
import Overdrive from "react-overdrive";
import { Poster } from "./Movie";
import Related from "./Related";

const POSTER_PATH = "http://image.tmdb.org/t/p/w154";
const BACKDROP_PATH = "http://image.tmdb.org/t/p/w1280";

class MovieDetail extends PureComponent {
  state = {
    movie: {},
    relations: []
  };

  async componentDidMount() {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${
          this.props.match.params.id
        }?api_key=6d6bfb73cf9249c6823b66d288187dd8&append_to_response=videos&language=en-US`
      );
      const movie = await res.json();
      const videoList = movie.videos.results.map(video => video.key);

      const relationsResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${
          this.props.match.params.id
        }/similar?api_key=6d6bfb73cf9249c6823b66d288187dd8&language=en-US&page=1`
      );
      const relationList = await relationsResponse.json();

      const relations = relationList.results.map(relation => ({
        id: relation.id,
        poster_path: relation.poster_path,
        title: relation.title
      }));

      console.log(relations);

      const youtubePrefix = videoList[0];
      this.setState({
        movie,
        relations,
        youtubePrefix
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { movie, relations } = this.state;
    const TRAILOR_PATH = this.state.youtubePrefix;
    const opts = {
      height: "220",
      width: "350"
    };
    return (
      <MovieWrapper backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`}>
        <MovieInfo>
          <Overdrive id={movie.id}>
            <Poster
              src={`${POSTER_PATH}${movie.poster_path}`}
              alt={movie.title}
            />
          </Overdrive>

          <DetailsDiv>
            <h1>{movie.title}</h1>
            <p>
              <span className="subDetails">Release Date: </span>{" "}
              {movie.release_date}
            </p>
            <p>
              <span className="subDetails">Rating: </span> {movie.vote_average}
            </p>
            <p className="synopsis">Synopsis:</p>
            <p>{movie.overview}</p>
          </DetailsDiv>

          <YoutubeDiv>
            <h3>Watch Trailer</h3>
            <YouTube
              videoId={`${TRAILOR_PATH}`}
              opts={opts}
              onReady={this._onReady}
            />
          </YoutubeDiv>
        </MovieInfo>
        <RelatedTitle>
          <h3>Similar Movies</h3>
        </RelatedTitle>
        <RelatedGrid>
          {relations.map(relation => (
            <Related key={relation.id} movie={relation} />
          ))}
        </RelatedGrid>
      </MovieWrapper>
    );
  }
}

export default MovieDetail;

const MovieWrapper = styled.div`
  display: grid;
  position: relative;
  padding-top: 50vh;
  background: url(${props => props.backdrop}) no-repeat;
  background-size: 100%;
`;

const MovieInfo = styled.div`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, 120px);
  text-align: left;
  padding: 2rem 10%;
  background: white;
  img {
    position: relative;
    top: -5rem;
  }
`;

const RelatedGrid = styled.div`
  background: white;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const YoutubeDiv = styled.div`
  grid-row: span 3;
`;

const DetailsDiv = styled.div`
  grid-column: span 3;
  padding-left: 20mm
`;

const RelatedTitle = styled.div`
  padding-left: 30px;
  text-align: left;
  background: white;
  color: black;
`;
