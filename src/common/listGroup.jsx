const ListGroup = (props) => {
  const { genres, onSelectGenre, selectedGenre, textProperty, valueProperty } =
    props;
  return (
    <ul className="list-group">
      {genres.map((genre) => {
        const selectedGenreActiveClass =
          genre._id === selectedGenre ? "active" : "";

        return (
          <li
            key={genre[valueProperty]}
            className={"list-group-item " + selectedGenreActiveClass}
            onClick={() => onSelectGenre(genre)}
          >
            {genre[textProperty]}
          </li>
        );
      })}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default ListGroup;
