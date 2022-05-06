import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Pagination from "../common/pagination";
import ListGroup from "../common/listGroup";
import MoviesTable from "./moviesTable";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 0,
    pageSize: 4,
    selectedGenre: null,
    sortColumn: {
      column: "title",
      order: "asc",
    },
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

  //handle sort records according to colum
  handleSort = (column) => {
    const sortColumn = { ...this.state.sortColumn };
    if (sortColumn.column === column) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.column = column;
      sortColumn.order = "asc";
    }

    this.setState({ sortColumn });
  };

  doSort(allMovies, sortColumn) {
    const { column, order } = sortColumn;
    console.log(sortColumn);
    return allMovies.sort((a, b) => {
      if (a[column] == b[column]) {
        return 0;
      } else {
        console.log(a[column]);
        console.log(b[column]);
        let ascDescSort = order === "asc" ? 1 : -1;
        return a[column] > b[column] ? ascDescSort : ascDescSort * -1;
      }
    });
  }

  render() {
    console.log("--- rendered ----");
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
    } = this.state;
    const { length: count } = allMovies;

    let filtered = selectedGenre
      ? allMovies.filter((movie) => movie.genre._id === selectedGenre)
      : allMovies;

    let sorted = this.doSort(filtered, sortColumn);

    const movies = this.doPaginate(sorted, currentPage, pageSize);

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
            <MoviesTable
              movies={movies}
              doLike={this.handlelike}
              doDelete={this.handleDelete}
              onSort={this.handleSort}
            />
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
