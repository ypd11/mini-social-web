const fs = require("fs");
const path = require("path");

exports.handler = async () => {
  try {
    const postsDir = path.join(__dirname, "../../posts");
    const files = fs.readdirSync(postsDir);
    const posts = files
      .filter(file => file.endsWith(".json"))
      .map(file => {
        const content = fs.readFileSync(path.join(postsDir, file));
        return JSON.parse(content);
      });

    return {
      statusCode: 200,
      body: JSON.stringify(posts)
    };
  } catch (error) {
    return { statusCode: 500, body: "Error: " + error.message };
  }
};
