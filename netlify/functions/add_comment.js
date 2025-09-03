import fs from "fs";
import path from "path";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Método no permitido" };
  }

  try {
    const { postId, user, text } = JSON.parse(event.body);
    if (!postId || !user || !text) {
      return { statusCode: 400, body: "Faltan datos" };
    }

    const commentId = Math.random().toString(36).substring(2, 7);
    const comment = { id: commentId, user, text, timestamp: Date.now() };

    const commentsDir = path.join(process.cwd(), "posts", postId, "comments");
    if (!fs.existsSync(commentsDir)) {
      fs.mkdirSync(commentsDir, { recursive: true });
    }

    const filePath = path.join(commentsDir, `${commentId}.json`);
    fs.writeFileSync(filePath, JSON.stringify(comment, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify(comment)
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
