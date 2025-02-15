/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module

  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files

  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` 
     as text if file is not found
     Example: GET http://localhost:3000/file/example.txt

    - For any other route not defined in the server return 404

    Testing the server - run `npm run test-fileServer` command in terminal
 */
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.get("/files", (req, res) => {
  fs.readdir("./files", (err, files) => {
    if (err) {
      console.log("Error while reading contents of the folder: " + err);
      res.sendStatus(500);
      return;
    }
    console.log(files);
    res.status(200).json(files);
  });
});

app.get("/file/:filename", (req, res) => {
  fs.readdir("./files", (err, files) => {
    let filename = req.params.filename;
    if (err) {
      console.log("Error while reading contents of the folder: " + err);
      res.status(404).send("File not found");
      return;
    } else if (files.find((file) => filename === file)) {
      //console.log("./files"|)
      fs.readFile("./files/" + filename, (err1, content) => {
        if (err1) {
          console.log("Error while reading contents of the folder: " + err1);
          res.sendStatus(405);
          return;
        } else {
          res.setHeader("Content-Type", "text/plain");
          res.status(200).send(content);
        }
      });
    } else {
      res.status(404).send("File not found");
    }
  });
});

app.use((req, res) => {
  // Handle the request for the default route here
  res.status(404).send("Route not found");
});

/* let port = 3003;
app.listen(3003, function () {
  console.log(`Demo application is listening on port ${port}`);
}); */
module.exports = app;
