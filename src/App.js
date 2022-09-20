
import React, { Component } from "react";
import logo from "./logo.svg";
import AppointmentApp from "./components/AppointmentApp.js";
import Navbar from "./Navbar";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import Delete from "./pages/Delete";
import { Route, Routes } from "react-router-dom"


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      bookAppointmentButton: false
    };
    this.bookAppointmentClick = this.bookAppointmentClick.bind(this);
  }

  bookAppointmentClick(condition) {
    this.setState({
      bookAppointmentButton: condition
    });

  }
  render() {
    const { bookAppointmentButton } = this.state;
    console.log('app');
    return (
      <>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/appointment" element={<AppointmentApp />} />
            <Route path="/delete" element={<Delete />} />

          </Routes>
        </div>
      </>

    );
  }
}
export default App;


{/* <button onClick={() => this.bookAppointmentClick(true)} >Book</button>
{ bookAppointmentButton === true ? <AppointmentApp /> : null } */}
