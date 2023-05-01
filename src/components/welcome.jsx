import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import CreateNewPost from "./create-post";

export default function Welcome() {
  const { user, token, posts, setPosts } = useOutletContext();
  const [searchTerm, setSearchTerm] = useState("");
  const postMatches = (post, text) => {
    text = text.toLowerCase();
    const {
      description,
      location,
      title,
      author: { username },
    } = post;
    const toCheck = [description, location, title, username];
    for (const field of toCheck) {
      if (field.toLowerCase().includes(text)) {
        return true;
      }
    }
  };
  const filteredPosts = posts.filter((post) => postMatches(post, searchTerm));
  const postsToDisplay = searchTerm.length ? filteredPosts : posts;

  return (
    <>
      <h1 className="profile">
        Welcome {token ? user.username : "to Strangers' Things"}
      </h1>

      <div className="page-body">
        <div className="post-results">
          <aside id="sidebar">
            <h1>Posts</h1>
            <form className="search">
              <input
                type={"text"}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}></input>
              <button>Search</button>
            </form>
            {token && <CreateNewPost posts={setPosts} />}
          </aside>
          <main>
            {postsToDisplay.length
              ? postsToDisplay.map((post) => (
                  <div className="stranger-post" key={post._id}>
                    <h2>{post.title}</h2>
                    <p className="description">{post.description}</p>
                    <p>
                      <strong>Price:</strong> {post.price}
                    </p>
                    <p>
                      <strong>Location:</strong> {post.location}
                    </p>
                    <p>
                      <strong>Seller:</strong> {post.author.username}
                    </p>
                    {post.willDeliver && <p>will deliver!</p>}
                    {token && (
                      <Link
                        to={`/${post._id}`}
                        className={`posts-button ${
                          post.isAuthor ? "manage" : ""
                        }`}>
                        {post.isAuthor ? "Manage listing" : "Send message"}
                      </Link>
                    )}
                  </div>
                ))
              : null}
          </main>
        </div>
      </div>
    </>
  );
}
