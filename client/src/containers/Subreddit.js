import React from "react";
function Subreddit() {
  return (
    <div>
      <form action="">
        <label for="cars">Choose a car:</label>

        <select name="cars" id="cars">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
      </form>
    </div>
  );
}

export default Subreddit;
