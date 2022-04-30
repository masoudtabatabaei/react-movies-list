import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Like from "../common/like";
import Pagination from "../common/pagination";
import ListGroup from "../common/listGroup";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 0,
    pageSize: 4,
    selectedGenre: null,
  };

  componentDidMount() {
    this.setState({
      movies: getMovies(),
      genres: [{ _id: null, name: "All Genres" }, ...getGenres()],
    });
  }

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
  doPaginate(movies, currentPage, pageSize) {
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    return movies.slice(startIndex, endIndex);
  }

  // handle select genre
  handleSelectGenre = (genre) => {
    this.setState({ selectedGenre: genre._id, currentPage: 0 });
  };

  render() {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
    } = this.state;
    const { length: count } = allMovies;

    let filtered = selectedGenre
      ? allMovies.filter((movie) => movie.genre._id === selectedGenre)
      : allMovies;
    const movies = this.doPaginate(filtered, currentPage, pageSize);

    if (filtered.length === 0) {
      return <p>There are no movies in the database.</p>;
    }

    return (
      <div className="p-4">
        <div className="row">
          <div className="col">
            <ListGroup
              genres={this.state.genres}
              onSelectGenre={this.handleSelectGenre}
              selectedGenre={this.state.selectedGenre}
            />
          </div>
          <div className="col col-10">
            <div className="mb-3">
              Showing {filtered.length} movies in the database.
            </div>
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
              total={filtered.length}
              onSelectPage={this.onSelectPage}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
