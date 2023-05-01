import { Link } from "react-router-dom";

export default function Navbar({ token }, { setToken }, setUser) {
  function logout() {
    localStorage.removeItem("token");
    setToken("");
    setUser({});
  }

  return (
    <div className="navbar">
      <p id="logo">Stranger's Things</p>
      <span className="nav-links">
        <Link to={"/"}>Posts</Link>
        {token && <Link to={"/profile"}>Profile</Link>}
        {token ? (
          <Link onClick={logout} to={"/"}>
            Logout
          </Link>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </span>
    </div>
  );
}
