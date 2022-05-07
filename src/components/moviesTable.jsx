import React, { Component } from "react";
import TableHeader from "../common/tableHeader";
import TableBody from "../common/tableBody";
import Like from "../common/like";

class MoviesTable extends Component {
  render() {
    const { movies, doLike, doDelete, sortColumn, onSort } = this.props;
    const columns = [
      { label: "Title", path: "title" },
      { label: "Genre", path: "genre.name" },
      { label: "Stock", path: "numberInStock" },
      { label: "Rate", path: "dailyRentalRate" },
      {
        key: "like",
        content: (data) => (
          <Like doLike={() => doLike(data)} liked={data.liked} />
        ),
      },
      {
        key: "delete",
        content: (data) => (
          <button
            className="btn btn-sm btn-danger"
            onClick={() => doDelete(data)}
          >
            Delete
          </button>
        ),
      },
    ];

    return (
      <table className="table" style={{ maxWidth: "800px" }}>
        <TableHeader
          columns={columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody
          data={movies}
          doLike={doLike}
          doDelete={doDelete}
          columns={columns}
        />
      </table>
    );
  }
}

export default MoviesTable;
