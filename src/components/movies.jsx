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
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  doSort(allMovies, sortColumn) {
    const { column, order } = sortColumn;
    return allMovies.sort((a, b) => {
      let aValue = a[column];
      let bValue = b[column];

      if (column === "genre.name") {
        aValue = a["genre"].name;
        bValue = b["genre"].name;
      }

      if (aValue === bValue) {
        return 0;
      } else {
        let ascDescSort = order === "asc" ? 1 : -1;
        return aValue > bValue ? ascDescSort : ascDescSort * -1;
      }
    });
  }

  // do sorting and paginating functionality together
  getPageDate = () => {
    const {
      pageSize,
      currentPage,
      movies: allMovies,
      selectedGenre,
      sortColumn,
    } = this.state;

    let filtered = selectedGenre
      ? allMovies.filter((movie) => movie.genre._id === selectedGenre)
      : allMovies;

    let sorted = this.doSort(filtered, sortColumn);

    const movies = this.doPaginate(sorted, currentPage, pageSize);
    console.log({ totalData: allMovies.length, data: movies });
    return { totalData: allMovies.length, filtered: movies };
  };

  render() {
    const { pageSize, currentPage, selectedGenre, sortColumn } = this.state;

    const { totalData, filtered } = this.getPageDate();

    if (totalData === 0) {
      return <p>There are no movies in the database.</p>;
    }

    return (
      <div className="p-4">
        <div className="row">
          <div className="col">
            <ListGroup
              genres={this.state.genres}
              onSelectGenre={this.handleSelectGenre}
              selectedGenre={selectedGenre}
            />
          </div>
          <div className="col col-10">
            <div className="mb-3">
              Showing {totalData} movies in the database.
            </div>
            <MoviesTable
              movies={filtered}
              doLike={this.handlelike}
              doDelete={this.handleDelete}
              sortColumn={sortColumn}
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
