export default function Hello(app) {
  app.get("/hello", (req, res) => {
    res.send("Hello World!!");
  });
  app.get("/", (req, res) => {
    res.send("welcome to lab5!!");
  });
}
