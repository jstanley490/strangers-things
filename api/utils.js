export const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2301-ftb-mt-web-pt";

export const deletePost = async (postID, { setToken }, { token }) => {
  const localToken = localStorage.getItem("token");

  console.log(postID);
  const response = await fetch(`${BASE_URL}/posts/${postID}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localToken}`,
    },
  });
  const result = await response.json();
  console.log(result);
  setToken(token);
};
