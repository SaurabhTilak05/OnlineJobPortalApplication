import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import AddJob from "./components/AddJob.jsx";

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AddJob/>} />
        </Routes>
      </BrowserRouter>
    );
  }
}
