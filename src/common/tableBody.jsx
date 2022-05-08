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
    const { data, columns, doLike, doDelete } = this.props;
    return (
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((column, index) => (
              <td key={index}>{this.renderCell(column, row)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
