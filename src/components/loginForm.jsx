import React, { Component, createRef } from "react";
import Input from "../common/input";

class LoginForm extends Component {
  username = React.createRef();
  state = {
    account: {
      username: "",
      password: "",
    },
  };

  // handle change input
  handleChange = (e) => {
    const account = { ...this.state.account };
    account[e.target.name] = e.target.value;
    this.setState({ account });
  };

  //handle submit form
  handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submit Login");
  };

  render() {
    const { username, password } = this.state.account;
    return (
      <form method="post" onSubmit={this.handleSubmit}>
        <Input
          name="username"
          label="Username"
          value={username}
          onChange={this.handleChange}
        />
        <Input
          name="password"
          label="Password"
          value={password}
          onChange={this.handleChange}
          type="password"
        />
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    );
  }
}

export default LoginForm;
