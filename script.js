async function loadPosts() {
  const res = await fetch("/.netlify/functions/get_posts");
  const posts = await res.json();

  const feed = document.getElementById("feed");
  feed.innerHTML = "";

  posts.forEach(post => {
    const div = document.createElement("div");
    div.innerHTML = `<strong>@${post.user}</strong>: ${post.text}`;
    feed.appendChild(div);
  });
}

loadPosts();
