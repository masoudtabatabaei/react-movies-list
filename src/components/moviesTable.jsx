import React, { Component } from "react";
import Like from "../common/like";
import Table from "../common/table";

class MoviesTable extends Component {
  columns = [
    { label: "Title", path: "title" },
    { label: "Genre", path: "genre.name" },
    { label: "Stock", path: "numberInStock" },
    { label: "Rate", path: "dailyRentalRate" },
    {
      key: "like",
      content: (data) => (
        <Like doLike={() => this.props.doLike(data)} liked={data.liked} />
      ),
    },
    {
      key: "delete",
      content: (data) => (
        <button
          className="btn btn-sm btn-danger"
          onClick={() => this.props.doDelete(data)}
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { movies: data, sortColumn, onSort } = this.props;

    return (
      <Table
        data={data}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
