import React from "react";
import "./App.css";
import Header from "./components/atoms/Header";
import TextTile from "./components/atoms/TextTile";

function App() {
  return (
    <div className="App">
      <div className="header">
        <Header />
      </div>
      <TextTile />
      <TextTile />
    </div>
  );
}

export default App;
