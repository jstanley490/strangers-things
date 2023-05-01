import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { BASE_URL } from "../../api/utils";
import Navbar from "./navbar";

export default function Root() {
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

  // console.log(token);
  // console.log(user);

  async function getPosts() {
    if (token) {
      const response = await fetch(`${BASE_URL}/posts`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const info = await response.json();
      setPosts(info.data.posts);
    } else {
      const response = await fetch(`${BASE_URL}/posts`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const info = await response.json();
      setPosts(info.data.posts);
    }
  }

  useEffect(() => {
    async function fetchUser() {
      const localToken = localStorage.getItem("token");
      if (localToken) {
        setToken(localToken);
        const response = await fetch(`${BASE_URL}/users/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localToken}`,
          },
        });
        const result = await response.json();
        if (result.success) {
          setUser(result.data);
        }
      }
    }
    fetchUser();
  }, [token]);

  useEffect(() => {
    getPosts(token);
  }, [token]);

  return (
    <div>
      {/* {token ? <div>logged in</div> : <div>not logged in</div>} */}
      <Navbar token={token} setToken={setToken} setUser={setUser} />
      <Outlet context={{ posts, user, token, setPosts, setUser, setToken }} />
    </div>
  );
}
