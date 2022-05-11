import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "../common/like";
import Table from "../common/table";
import _ from "lodash";

class MoviesTable extends Component {
  columns = [
    {
      label: "Title",
      path: "title",
      content: (data) => (
        <Link to={"/movies/" + _.get(data, "_id")}>{_.get(data, "title")}</Link>
      ),
    },
    { label: "Genre", path: "genre.name" },
    { label: "Stock", path: "numberInStock" },
    { label: "Rate", path: "dailyRentalRate" },
    {
      content: (data) => (
        <Like doLike={() => this.props.doLike(data)} liked={data.liked} />
      ),
    },
    {
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
