import fs from "fs";
import path from "path";
import { marked } from "marked";
import yaml from "js-yaml";
import { fileURLToPath } from "url";
import { glob } from "glob";

const dir = "src/views/pages/blog/";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");

function extractTags(content) {
  let frontmatter = {};
  let markdown = content;

  if (content.startsWith("---")) {
    const end = content.indexOf("---", 3);
    if (end !== -1) {
      return (frontmatter = yaml.load(content.slice(3, end).trim()).tags || {});
    }
  }

  return;
}

async function gatherTaxonomies() {
  // gather all pages in /blog/*
  const pageFiles = await glob("src/views/pages/blog/*/*.liquid", {
    cwd: projectRoot,
  });

  let tagObj = {};
  tagObj.tags = {};
  pageFiles.map((e) => {
    const name = e.split("blog/")[1].split("/index.liquid")[0];
    const tagsArr = extractTags(fs.readFileSync(e, "utf-8"));
    tagObj[name] = tagsArr;
    tagsArr.forEach((tag) => {
      // create obj if it does not exist yet
      if (!tagObj.tags[tag]) {
        tagObj.tags[tag] = {};
      }

      const counter = tagObj.tags[tag].count ?? 0;

      tagObj.tags[tag].label = tag;
      tagObj.tags[tag].count = counter + 1;
    });
  });
}

export { gatherTaxonomies };
