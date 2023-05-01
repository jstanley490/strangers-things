import { useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../api/utils";

export default function Message({ setPosts }) {
  const { postId } = useParams();
  const [content, setContent] = useState("");

  // console.log(postId);

  async function handleSubmit(e) {
    const localToken = localStorage.getItem("token");

    e.preventDefault();
    const response = await fetch(`${BASE_URL}/posts/${postId}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localToken}`,
      },
      body: JSON.stringify({
        message: {
          content,
        },
      }),
    });
    const result = await response.json();
    console.log(result);
    setContent("");
  }

  return (
    <div className="post-msgs">
      <form onSubmit={handleSubmit} className="submit-post">
        <textarea
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder="Type your message here"></textarea>
        <button>Submit</button>
      </form>
    </div>
  );
}
