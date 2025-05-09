import express from "express";
import { Liquid } from "liquidjs";
import { readdir, readFile } from "node:fs/promises";

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
}

const findProject = (providedSlug) => {  
  try {
    const project = allProjects.find((project) => project.slug === providedSlug);
    // throwing an error does not work..?
    if(project === undefined){
      throw new Error("No project found")
    }
    
    return {project}
  } catch (error) {
    const errPage = "err"
    console.log(errPage);
    return {errPage}
  }
}

retrieveProjects();

// routes
app.get("/", async function (request, response) {
  response.render("index.liquid", {
    styles: ["home.css"],
    scripts: ["moshing.js", "mouse-follow.js"]
  });
});

app.get("/err", async function (request, response) {
  response.render("err.liquid", {
    styles: ["home.css"],
    scripts: ["moshing.js", "mouse-follow.js"]
  });
});

app.get("/portfolio", async function (request, response) {
    console.log(allProjects);
    
    response.render("portfolio.liquid", {
      styles: ["portfolio.css", "accessible-link.css"],
      allProjects,
    })
})

app.get("/portfolio/:slug", async function (request, response) {
  const {slug} = request.params;
  const {project, errPage} = findProject(slug)

  console.log(project, "???", errPage);
  if(errPage){
    response.redirect(303, `/${errPage}`)
  }
  
  response.render("project.liquid", { project });
})

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

app.set("port", process.env.PORT || 8000);

app.listen(app.get("port"), function () {
  console.log(`Application started on http://localhost:${app.get("port")}`);
});
