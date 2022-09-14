import { NavLink } from "react-router-dom";
import "./App.scss";

export const NotFound = () => {
  return (
    <div className="NotFound">
      {/* <img alt="card" 
      src={`https://source.unsplash.com/1000x1000/`} /> */}
      <h2>Page not found</h2>
      {/* <button onClick={handleToggleFlashlight}>Flashlight</button> */}
      <div className="light"></div>
      <p>Hmmm, the page you were looking for doesn't seem to exist anymore.</p>
      <NavLink to="/">Back to Home</NavLink>
    </div>
  );
};
