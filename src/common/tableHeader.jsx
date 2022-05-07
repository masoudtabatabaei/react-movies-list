import Ract, { Component } from "react";

class TableHeader extends Component {
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
              {column.label}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
