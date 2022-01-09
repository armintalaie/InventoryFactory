import { Application } from "express";
import { WebServer } from "./controller";

const webapp: WebServer = new WebServer();
const server: Application = webapp.createServer();

// start the Express server
const port = 8080; // default port to listen
server.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
