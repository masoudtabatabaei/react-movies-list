import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "../common/like";

class Movies extends Component {
  state = {
    movies: getMovies(),
    test: 1,
  };

  // Delete movie
  handleDelete = (movie) => {
    const movies = this.state.movies.filter(
      (movieItem) => movieItem._id !== movie._id
    );
    this.setState({ movies });
  };

  // Like movie
  handlelike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  render() {
    const { length: count } = this.state.movies;
    if (count === 0) {
      return <p>There are no movies in the database.</p>;
    }

    console.log("-- run --");

    return (
      <>
        <div>Showing {count} movies in the database.</div>
        <table className="table mt-5" style={{ maxWidth: "800px" }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    doLike={() => this.handlelike(movie)}
                    liked={movie.liked}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => this.handleDelete(movie)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default Movies;
