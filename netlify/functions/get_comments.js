import fs from "fs";
import path from "path";

export async function handler(event) {
  try {
    const { postId } = event.queryStringParameters;
    if (!postId) {
      return { statusCode: 400, body: "Falta postId" };
    }

    const commentsDir = path.join(process.cwd(), "posts", postId, "comments");

    if (!fs.existsSync(commentsDir)) {
      return { statusCode: 200, body: JSON.stringify([]) };
    }

    const files = fs.readdirSync(commentsDir);
    const comments = files.map(file => {
      const filePath = path.join(commentsDir, file);
      return JSON.parse(fs.readFileSync(filePath, "utf-8"));
    });

    return {
      statusCode: 200,
      body: JSON.stringify(comments)
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
