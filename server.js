const jsonServer = require("json-server");
const auth = require("json-server-auth");
const dayjs = require("dayjs");

const server = jsonServer.create();
const router = jsonServer.router("./db/data.json");

const middlewares = jsonServer.defaults();

server.db = router.db;

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  if (req.method === "POST") {
    req.body.createdAt = dayjs().valueOf();
    req.body.updatedAt = dayjs().valueOf();
  }

  if (req.method === "PUT") {
    req.method = "PATCH";
  }

  if (req.method === "PATCH") {
    req.body.updatedAt = dayjs().valueOf();
  }

  next();
});

server.use(auth);
server.use(router);
server.listen(4000);
