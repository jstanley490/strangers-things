import { useOutletContext, useParams } from "react-router-dom";
import { deletePost } from "../../api/utils";
import Message from "./message";
import Welcome from "./welcome";

export default function PostSingle() {
  const { postId } = useParams();
  const { user, posts, token, setToken } = useOutletContext();
  const post = posts.find((slug) => slug._id === postId);
  // console.log(post);

  if (!post) {
    return <Welcome />;
  }
  return (
    <>
      <div className="stranger-post">
        <h1>{post.title}</h1>
        <div className="posts">
          <p>
            <strong>Description:</strong> {post.description}
          </p>
          <p>
            <strong>Location:</strong> {post.location}
          </p>
          {post.willDeliver ? (
            <p id="delivery">{">"} Delivery available</p>
          ) : null}
          <p>
            <strong>Listed:</strong> {post.createdAt}
          </p>
          <p>
            <strong>Seller:</strong> {post.author.username}
          </p>
          {post.isAuthor ? (
            <>
              <button
                className="manage"
                onClick={() => deletePost(postID, token, setToken)}>
                Delete
              </button>
              <button>Edit</button>
            </>
          ) : null}
        </div>
      </div>
      {post.isAuthor ? (
        <>
          <h2 id="msg-title">Messages about this post:</h2>
          <div className="post-msgs">
            {post.messages.map((msg) => {
              return (
                <div className="stranger-post" key={msg._id}>
                  <h3>From: {msg.fromUser.username}</h3>
                  <p>{msg.content}</p>
                  <button>Reply</button>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="post-msgs">
          {console.log(post)}
          {post.messages &&
            post.messages.map((msg) => {
              return (
                <>
                  <h2 id="msg-title">Your message:</h2>
                  <div className="stranger-post" key={msg._id}>
                    <p>
                      <strong>Message:</strong> {msg.content}
                    </p>
                    <p>
                      <strong>Sent at:</strong> {msg.updatedAt}
                    </p>
                  </div>
                </>
              );
            })}
          <>
            <h2 id="msg-title">Send message to seller:</h2>
            <Message />
          </>
        </div>
      )}
    </>
  );
}
