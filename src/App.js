import React from "react";
import { useState } from "react";
import "./App.css";
import Header from "./components/atoms/Header";
import Wordle from "./components/molecules/Wordle";


function App() {
  return (
    <div className="App">
      <div className="header">
        <Header />
      </div>
      <Wordle />
    </div>
  );
}

export default App;
