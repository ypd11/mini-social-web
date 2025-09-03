import fs from "fs";
import path from "path";

export async function handler() {
  try {
    const postsDir = path.join(process.cwd(), "posts");
    const files = fs.readdirSync(postsDir);

    const posts = files.map(file => {
      const filePath = path.join(postsDir, file);
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      return data;
    });

    return {
      statusCode: 200,
      body: JSON.stringify(posts)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
}
