import Ract, { Component } from "react";

class TableHeader extends Component {
  // render sort icon in table header columns
  renderSortIcon(column) {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.column) {
      return null;
    }

    if (sortColumn.order === "asc") {
      return <i className="fa fa-sort-asc"></i>;
    }

    return <i className="fa fa-sort-desc"></i>;
  }

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
    return (
      <thead>
        <tr>
          {this.props.columns.map((column, index) => (
            <th key={index} onClick={() => this.raiseSort(column.path)}>
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
