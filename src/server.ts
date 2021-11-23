import { CodesCtrl } from "./Codes";
import { MoviesCtrl } from "./Movie";

export function server() {
  var express = require("express");
  var app = express();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  // set the view engine to ejs
  app.set("view engine", "ejs");

  // CONTROLLERS
  let movieCtrl = new MoviesCtrl();
  let codeCtrl = new CodesCtrl();
  // use res.render to load up an ejs view file

  // statement page
  app.get("/", function (req: any, res: any) {
    res.render("pages/index");
  });

  // movies page
  app.get("/movies", async function (req: any, res: any) {
    let movies = await movieCtrl.getAll();
    const codes = await codeCtrl.getAll();
    // movieCtrl.updateMovie('F001')
    res.render("pages/movies", {
      movies: movies,
      codes: codes,
    });
  });

  app.get("/movies/:id/edit", async function (req: any, res: any) {
    let id = req.params.id;
    let movie = await movieCtrl.getMovie(id);
    const codes = await codeCtrl.getAll();
    res.render("pages/edit", {
      movie: movie,
      codes: codes,
      id: id,
    });
  });

  app.post("/movies", function (req: any, res: any) {
    let title = req.body.title;
    let code = req.body.code;
    movieCtrl.createMovie(title, code);
    res.redirect("/movies");
  });

  app.post("/movies/:id/edit", async function (req: any, res: any) {
    let id = req.params.id;
    let title = req.body.title;
    let code = req.body.code;
    await movieCtrl.updateMovie(id, title, code);
    res.redirect("/movies");
  });

  app.post("/movies/:id/delete", async function (req: any, res: any) {
    let id = req.params.id;
    await movieCtrl.deleteMovie(id);
    res.redirect("/movies");
  });

  // code page
  app.get("/codes", async function (req: any, res: any) {
    let codes = await codeCtrl.getAll()
    res.render("pages/codes", {
      codes:codes
    });
  });

  app.post("/codes", function (req: any, res: any) {
    let code = req.body.code;
    codeCtrl.createCode(code);
    res.redirect("/codes");
  });

  app.post("/codes/:id/delete", async function (req: any, res: any) {
    let id = req.params.id;
    await codeCtrl.deleteCode(id);
    res.redirect("/codes");
  });


  app.get("/pricing", function (req: any, res: any) {
    res.render("pages/pricing");
  });

  app.listen(8080);
  console.log("Server is listening on port 8080");
}
