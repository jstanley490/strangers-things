import { useEffect } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { deletePost } from "../../api/utils";
import CreateNewPost from "./create-post";

export default function Profile() {
  const { user, token, posts, setToken, setPosts } = useOutletContext();
  const myMessages = user.messages;
  // console.log(user);

  const navigate = useNavigate();

  if (!token) {
    useEffect(() => {
      navigate("/");
    });
  } else {
    return (
      <>
        <h1 className="profile">Welcome {user.username}</h1>
        <div className="profile-body">
          <aside id="sidebar">
            <CreateNewPost posts={setPosts} />
          </aside>
          <main>
            <div className="my-posts">
              <h3>My messages:</h3>
              {myMessages.map((post) => {
                console.log(user._id);
                console.log(post.post.author.username);
                if (post._id !== user._id) {
                  return (
                    <div className="stranger-post" key={post._id}>
                      {post._id === user.id ? (
                        <h3>Sent to: {post.post.author.username}</h3>
                      ) : (
                        <h3>From: {post.fromUser.username}</h3>
                      )}
                      <p className="description">re: {post.post.title}</p>
                      <p>{post.content}</p>
                      <Link to={`/${post.post._id}`} className="posts-button">
                        Reply
                      </Link>
                    </div>
                  );
                }
              })}
              <h3>My posts:</h3>
              {posts.map((post) => {
                if (post.isAuthor) {
                  const postID = post._id;
                  // console.log(post);

                  return (
                    <div className="stranger-post" key={post._id}>
                      <h2>{post.title}</h2>
                      <p className="description">{post.description}</p>
                      <p>
                        <strong>Price:</strong> {post.price}
                      </p>
                      <p>
                        <strong>Location:</strong> {post.location}
                      </p>
                      {post.willDeliver ? (
                        <p id="delivery">{">"} Delivery available</p>
                      ) : null}
                      <button
                        className="manage"
                        onClick={() => deletePost(postID, token, setToken)}>
                        Delete
                      </button>
                      <Link to={`/${post._id}`} className="posts-button">
                        Edit
                      </Link>
                    </div>
                  );
                }
              })}
            </div>
          </main>
        </div>
      </>
    );
  }
}
