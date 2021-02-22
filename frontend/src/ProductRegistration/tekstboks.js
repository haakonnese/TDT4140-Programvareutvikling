import React from "react";

export function tekst() {
  function getData(val) {
    console.warn(val);
  }
  return (
    <div>
      <h1> Navn </h1>
      <input type="text" onChange={getData} />
    </div>
  );
}
