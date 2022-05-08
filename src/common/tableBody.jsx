import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell(column, row) {
    if (column.key) {
      return column.content(row);
    }

    return _.get(row, column.path);
  }

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((column, i) => (
              <td key={i}>{this.renderCell(column, row)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
