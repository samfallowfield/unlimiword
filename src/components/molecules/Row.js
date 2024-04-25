import React from "react";

function Row({ word }) {
  return (
    <div className="row">
      {word.split("").map((letter, index) => {
        return (
          <div className="letter" key={index}>
            {letter}
          </div>
        );
      })}
    </div>
  );
}

export default Row;
