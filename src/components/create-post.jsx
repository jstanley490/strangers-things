import { useEffect, useState } from "react";
import { BASE_URL } from "../../api/utils";

export default function CreateNewPost({ setPosts }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [willDeliver, setWillDeliver] = useState(false);

  async function handleSubmit(e) {
    const localToken = localStorage.getItem("token");

    e.preventDefault();
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localToken}`,
      },
      body: JSON.stringify({
        post: {
          title,
          description,
          price,
          location,
          willDeliver,
        },
      }),
    });
    const result = await response.json();
    // console.log(result.data.post);
    setPosts(result.data.post);
  }

  return (
    <div className="submit-post">
      <h2>Create listing</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Post title"></input>
        <input
          type="text"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          placeholder="Price"></input>
        <input
          type="text"
          onChange={(e) => setLocation(e.target.value)}
          value={location}
          placeholder="Location"></input>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="Description"></textarea>
        <span>
          <input
            className="checkbox"
            type="checkbox"
            onChange={setWillDeliver}
          />
          Will you deliver?
        </span>
        <button>Submit</button>
      </form>
    </div>
  );
}
