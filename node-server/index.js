var express = require("express");
var bodyParser = require("body-parser");
const fs = require("fs/promises");
const path = require("path");
const marked = require("marked");
var app = express();

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.get("/", (req, res) => {
  res.send("hello");
});

app.use(bodyParser.json());

app.post("/approve", async (req, res, next) => {
  console.log(req.body);

  const data = req.body;
  const filePath = path.join(
    __dirname,
    `../../rachsmith.com/src/content/comments/${data.slug}.json`
  );

  await createFile(filePath);
  // read existing comments
  const commentsFile = await fs.readFile(filePath, "utf8");
  const { comments } = JSON.parse(commentsFile);
  // add new comment
  comments.push({
    id: data.id,
    parentId: null,
    createdBy: {
      fullName: data.name,
    },
    website: data.website,
    html: marked.parse(data.comment),
    createdAt: new Date(data.created).getTime(),
  });
  // write new comments to file
  await fs.writeFile(filePath, JSON.stringify({ comments }));
  console.log(`File ${filePath} updated successfully`);
  res.status(200).send("OK");
});

function createFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.access(filePath)
      .then(() => {
        console.log(`File ${filePath} exists`);
        resolve();
      })
      .catch(() => {
        console.log(`File ${filePath} does not exist. Creating file...`);
        fs.writeFile(filePath, JSON.stringify({ comments: [] }, null, 2))
          .then(() => {
            console.log(`File ${filePath} created successfully`);
            resolve();
          })
          .catch((err) => {
            if (err) throw err;
          });
      });
  });
}
