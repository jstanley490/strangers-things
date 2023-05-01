import { useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { BASE_URL } from "../../api/utils";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");

  const { setToken } = useOutletContext();
  const navigate = useNavigate();

  function showPassword() {
    var p = document.getElementById("showInput");
    if (p.type === "password") {
      p.type = "text";
    } else {
      p.type = "password";
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmation) {
      setError("Passwords do not match!");
      return;
    }
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          password,
        },
      }),
    });
    const result = await response.json();
    if (!result.success) {
      setError(result.error.message);
      console.error(result.error.message);
      return;
    }
    setToken(result.data.token);
    localStorage.setItem("token", result.data.token);
    navigate("/profile");
  }
  return (
    <div className="auth">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          placeholder="username"></input>
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="password"
          type={"password"}
          id="showInput"></input>
        <input
          onChange={(e) => setConfirmation(e.target.value)}
          value={confirmation}
          placeholder="confirm password"
          type={"password"}></input>
        <button type="submit">Register</button>
      </form>
      <p className="err-msg">{error}</p>
      <span>
        <input onClick={showPassword} type="checkbox" />
        Show password
      </span>
      <Link to={"/login"}>
        <p>Already have an account?</p>
      </Link>
    </div>
  );
}
