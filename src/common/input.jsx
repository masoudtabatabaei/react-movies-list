const Input = (props) => {
  const { name, label, value, onChange, type } = props;
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        className="form-control"
        id={name}
        placeholder={"Enter" + name}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

Input.defaultProps = {
  type: "text",
};

export default Input;
