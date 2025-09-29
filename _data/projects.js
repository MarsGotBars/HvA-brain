import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectsJSON = fs.readFileSync(
  path.join(__dirname, "../content/JSON/projects.json"),
  "utf-8"
);
const allProjects = JSON.parse(projectsJSON);

console.log("Loaded projects data with", allProjects.length, "projects.");

// Export the data directly, not wrapped in a function
export default {
  allProjects,
};
