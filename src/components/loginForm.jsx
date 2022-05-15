import React, { Component, createRef } from "react";
import Input from "../common/input";

class LoginForm extends Component {
  username = React.createRef();
  state = {
    account: {
      username: "",
      password: "",
    },
    errors: {},
  };

  // handle change input
  handleChange = (e) => {
    const account = { ...this.state.account };
    account[e.target.name] = e.target.value;
    const errors = this.validateProperty(account, e.target.name);

    this.setState({ account, errors });
  };

  // validate on change
  validateProperty = (inputs, propName) => {
    const errors = { ...this.state.errors };

    if (inputs[propName].trim() === "") {
      errors[propName] = `${propName} is required`;
    } else {
      delete errors[propName];
    }

    return errors;
  };

  // validate form inputs
  validateForm = () => {
    const errors = {};
    const { username: usernameVal, password: passwordVal } = this.state.account;
    if (usernameVal.trim() === "") {
      errors.username = "Username is required";
    }

    console.log("pass : " + passwordVal);
    if (passwordVal.trim() === "") {
      errors.password = "Password is required";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  //handle submit form
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validateForm();
    this.setState({ errors: errors || {} });
    if (errors) {
      return;
    }

    console.log("Submit Login");
  };

  render() {
    const { account, errors } = this.state;
    const submitBtnStatus = errors.length === 0 ? false : true;
    return (
      <form method="post" onSubmit={this.handleSubmit}>
        <Input
          name="username"
          label="Username"
          value={account.username}
          onChange={this.handleChange}
          error={errors?.username}
        />
        <Input
          name="password"
          label="Password"
          value={account.password}
          onChange={this.handleChange}
          type="password"
          error={errors?.password}
        />
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    );
  }
}

export default LoginForm;
