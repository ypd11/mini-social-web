import fs from "fs";
import path from "path";

export async function handler(event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Método no permitido" };
  }

  try {
    const { user, text } = JSON.parse(event.body);
    if (!user || !text) {
      return { statusCode: 400, body: "Faltan datos" };
    }

    const id = Math.random().toString(36).substring(2, 7);
    const post = { id, user, text, timestamp: Date.now() };

    const filePath = path.join(process.cwd(), "posts", `${id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(post, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify(post)
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
