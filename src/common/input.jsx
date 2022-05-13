const Input = (props) => {
  const { name, label, value, onChange, error, type } = props;
  console.log("error: " + error);
  return (
    <>
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input
          type={type}
          className="form-control"
          id={name}
          placeholder={"Enter " + label}
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </>
  );
};

Input.defaultProps = {
  type: "text",
};

export default Input;
