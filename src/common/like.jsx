const Like = (props) => {
  const { doLike, liked } = props;
  return (
    <i
      className={liked ? "fa fa-heart" : "fa fa-heart-o"}
      style={{ cursor: "pointer" }}
      onClick={doLike}
    ></i>
  );
};

export default Like;
