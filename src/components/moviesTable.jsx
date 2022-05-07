import React, { Component } from "react";
import Like from "../common/like";
import TableHeader from "../common/tableHeader";

class MoviesTable extends Component {
  render() {
    const { movies, doLike, doDelete, sortColumn, onSort } = this.props;
    const columns = [
      { label: "Title", path: "title" },
      { label: "Genre", path: "genre.name" },
      { label: "Stock", path: "numberInStock" },
      { label: "Rate", path: "dailyRentalRate" },
      {},
      {},
    ];

    return (
      <table className="table" style={{ maxWidth: "800px" }}>
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
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
