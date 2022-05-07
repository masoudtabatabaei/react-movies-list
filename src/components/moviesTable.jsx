import React, { Component } from "react";
import Like from "../common/like";

class MoviesTable extends Component {
  // raise event to parent
  raiseSort(column) {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.column === column) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.column = column;
      sortColumn.order = "asc";
    }

    this.props.onSort(sortColumn);
  }

  render() {
    const { movies, doLike, doDelete } = this.props;

    return (
      <table className="table" style={{ maxWidth: "800px" }}>
        <thead>
          <tr>
            <th onClick={() => this.raiseSort("title")}>
              Title <i className="fa fa-caret-up"></i>
            </th>
            <th onClick={() => this.raiseSort("genre.name")}>Genre</th>
            <th onClick={() => this.raiseSort("numberInStock")}>Stock</th>
            <th onClick={() => this.raiseSort("dailyRentalRate")}>Rate</th>
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
                <Like doLike={() => doLike(movie)} liked={movie.liked} />
              </td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => doDelete(movie)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

export default MoviesTable;
