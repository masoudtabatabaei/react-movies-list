import Like from "../common/like";

const MoviesTable = (props) => {
  const { movies, doLike, doDelete, onSort } = props;

  return (
    <table className="table" style={{ maxWidth: "800px" }}>
      <thead>
        <tr>
          <th onClick={() => onSort("title")}>
            Title <i className="fa fa-caret-up"></i>
          </th>
          <th onClick={() => onSort("genre.name")}>Genre</th>
          <th onClick={() => onSort("numberInStock")}>Stock</th>
          <th onClick={() => onSort("dailyRentalRate")}>Rate</th>
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
};

export default MoviesTable;
