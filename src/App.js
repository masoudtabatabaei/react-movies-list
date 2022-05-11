import React, { Component } from "react";
import Movies from "./components/movies";
import { Navigate, Route, Routes } from "react-router-dom";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import Navbar from "./common/navbar";

class App extends Component {
  render() {
    return (
      <>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Navigate replace to="/movies" />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/rentals" element={<Rentals />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate replace to="/not-found" />} />
          </Routes>
        </div>
      </>
    );
  }
}

export default App;
