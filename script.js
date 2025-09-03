// 🔹 Cargar todos los posts y sus comentarios
async function loadPosts() {
  const res = await fetch("/.netlify/functions/get_posts");
  const posts = await res.json();

  const feed = document.getElementById("feed");
  feed.innerHTML = "";

  for (const post of posts) {
    const div = document.createElement("div");
    div.className = "post";
    div.innerHTML = `<strong>@${post.user}</strong>: ${post.text}`;

    // Contenedor de comentarios
    const commentContainer = document.createElement("div");
    commentContainer.className = "comments";

    // Formulario de comentario
    const inputUser = document.createElement("input");
    inputUser.placeholder = "Usuario";
    const inputText = document.createElement("input");
    inputText.placeholder = "Comentario";
    const btn = document.createElement("button");
    btn.textContent = "Comentar";
    btn.onclick = () => addComment(post.id, inputUser.value, inputText.value);

    div.appendChild(commentContainer);
    div.appendChild(inputUser);
    div.appendChild(inputText);
    div.appendChild(btn);

    feed.appendChild(div);

    // Cargar comentarios
    loadComments(post.id, commentContainer);
  }
}

// 🔹 Crear un post
async function createPost() {
  const user = document.getElementById("userPost").value;
  const text = document.getElementById("textPost").value;

  if (!user || !text) return alert("Completa ambos campos");

  await fetch("/.netlify/functions/create_post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user, text })
  });

  document.getElementById("userPost").value = "";
  document.getElementById("textPost").value = "";

  loadPosts();
}

// 🔹 Cargar comentarios de un post
async function loadComments(postId, container) {
  const res = await fetch(`/.netlify/functions/get_comments?postId=${postId}`);
  const comments = await res.json();

  container.innerHTML = "";
  comments.forEach(c => {
    const div = document.createElement("div");
    div.className = "comment";
    div.innerHTML = `<strong>@${c.user}</strong>: ${c.text}`;
    container.appendChild(div);
  });
}

// 🔹 Agregar comentario
async function addComment(postId, user, text) {
  if (!user || !text) return alert("Completa ambos campos");

  await fetch("/.netlify/functions/add_comment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ postId, user, text })
  });

  loadPosts();
}

// 🔹 Inicializar feed
loadPosts();
