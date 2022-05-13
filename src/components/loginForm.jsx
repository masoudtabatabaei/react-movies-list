import React, { Component, createRef } from "react";

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
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            autoFocus
            ref={this.username}
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter username"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    );
  }
}

export default LoginForm;
