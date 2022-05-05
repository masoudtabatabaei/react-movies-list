import Like from "../common/like";

const MoviesTable = (props) => {
  const { movies, doLike, doDelete } = props;

  return (
    <table className="table" style={{ maxWidth: "800px" }}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Genre</th>
          <th>Stock</th>
          <th>Rate</th>
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
