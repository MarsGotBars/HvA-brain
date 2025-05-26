import express from "express";
import { Liquid } from "liquidjs";
import { readdir, readFile } from "node:fs/promises";
// import "dotenv/config";
const app = express();

const engine = new Liquid();
app.engine("liquid", engine.express());

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

app.set("views", "./views");

const dailyNotes = await readdir("content/daily_notes");

let allProjects;
const retrieveProjects = async () => {
  console.log("gathering...");

  const readProjectJSON = await readFile("content/JSON/projects.json", "utf-8");
  allProjects = JSON.parse(readProjectJSON);
};

const findProject = (providedSlug) => {
  try {
    const project = allProjects.find(
      (project) => project.slug === providedSlug
    );

    // throwing an error does not work..?
    if (project === undefined) {
      throw new Error("No project found");
    }
    const { before, after } = findAdjecentProject(project.id);
    return { before, project, after };
  } catch (error) {
    const errPage = "err";
    console.log(errPage);
    return { errPage };
  }
};

const findAdjecentProject = (num) => {
  //
  const before = allProjects[num - 1]
    ? allProjects[num - 1]
    : allProjects[allProjects.length - 1];
  const after = allProjects[num + 1] ? allProjects[num + 1] : allProjects[0];
  return { before, after };
};

retrieveProjects();

// routes
app.get("/", async function (request, response) {
  response.render("index.liquid");
});

app.get("/err", async function (request, response) {
  response.render("err.liquid");
});


app.get("/alt-portfolio", async function (request, response) {

  response.render("alt-portfolio.liquid", {
    allProjects,
  });
});

app.get("/portfolio", async function (request, response) {

  response.render("portfolio.liquid", {
    allProjects,
  });
});

let previousBefore, previousAfter;
app.get("/portfolio/:slug", async function (request, response) {
  const { slug } = request.params;
  const { project, errPage, before, after } = findProject(slug);

  if (errPage) {
    response.render(`/${errPage}`);
  }
  console.log(before, after);

  response.render("project.liquid", { before, project, after });
});

app.get("/journal", async function (request, response) {
  response.render("journal.liquid", { dailyNotes });
});

app.get("/journal/:path", async function (request, response) {
  const { path } = request.params;
  const note = await readFile("content/daily_notes/" + path + ".md", {
    encoding: "utf8",
  });

  response.render("note.liquid", { note });
});

app.set("port", process.env.PORT || 8001);

app.listen(app.get("port"), function () {
  console.log(`Application started on http://localhost:${app.get("port")}`);
});

app.use((err, request, response, next) => {
  // Hiermee zorg ik ervoor dat er voor gebruikers een 404 weergeven wordt ipv de code-error
  // Dit werkt alleen in de dev env omdat ik een .env heb met SHOW_DETAILED_ERRORS=true
  if (process.env.SHOW_DETAILED_ERRORS === "true") {
    // Weergeef alle error details
    response.status(500).send({
      error: err.message,
      stack: err.stack,
    });
  } else {
    // Redirect naar mijn error pagina
    response.status(404).render("err.liquid", { error: "Er ging iets mis" });
  }
});



app.get("/demo-page/:text", async function (request, response) {
  const {text} = request.params

  response.render("demo.liquid", { text, pageTitle: "Demo pagina" });
});