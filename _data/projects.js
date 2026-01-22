import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectsJSON = fs.readFileSync(
  path.join(__dirname, "../content/JSON/projects.json"),
  "utf-8"
);

// Rewrite this to filter OUT the broken projects rather than doing this in the template
const allProjects = JSON.parse(projectsJSON);
const brokenProject = allProjects.filter((e)=> e.progress == "BROKEN")
console.log(brokenProject);
const length = allProjects.length - brokenProject.length

console.log("Loaded projects data with", allProjects.length, "projects.");

// Export the data directly, not wrapped in a function

// Note; these can only be passed to pages - globally - not to partials.
// To use these in partials; pass it down from the page to the partial as a prop
export default {
  allProjects,
  length
};
