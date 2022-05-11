import { useParams, useNavigate } from "react-router-dom";

const MovieForm = () => {
  const { id } = useParams();
  const history = useNavigate();

  return (
    <>
      <h1>Movie Details: {id}</h1>
      <button className="btn btn-primary" onClick={() => history("/movies")}>
        Save
      </button>
    </>
  );
};

export default MovieForm;
