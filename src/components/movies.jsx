import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "../common/like";
import Pagination from "../common/pagination";

class Movies extends Component {
  state = {
    movies: getMovies(),
    currentPage: 0,
    pageSize: 4,
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

  // handle paginate
  onSelectPage = (page) => {
    console.log("Handle Paginate :" + page);
    this.setState({ currentPage: page });
  };

  // chunk movies by page
  doPaginate(currentPage, pageSize) {
    const movies = [...this.state.movies];
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    return movies.slice(startIndex, endIndex);
  }

  render() {
    const { pageSize, currentPage, movies: allMovies } = this.state;
    const { length: count } = allMovies;
    if (count === 0) {
      return <p>There are no movies in the database.</p>;
    }

    const movies = this.doPaginate(currentPage, pageSize);

    return (
      <div className="p-4">
        <div className="mb-3">Showing {count} movies in the database.</div>
        <table className="table" style={{ maxWidth: "800px" }}>
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
            {movies.map((movie) => (
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
        <Pagination
          className="mt-1"
          currentPage={currentPage}
          pageSize={pageSize}
          total={count}
          onSelectPage={this.onSelectPage}
        />
      </div>
    );
  }
}

export default Movies;
