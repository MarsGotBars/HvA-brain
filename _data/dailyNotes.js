import fs from "fs";
import path from "path";
import { marked } from "marked";
import yaml from "js-yaml";

const dir = "./content/daily_notes";

function parseMarkdown(content) {
  let frontmatter = {};
  let markdown = content;

  if (content.startsWith("---")) {
    const end = content.indexOf("---", 3);
    if (end !== -1) {
      frontmatter = yaml.load(content.slice(3, end).trim()) || {};
      markdown = content.slice(end + 3).trim();
    }
  }

  return { frontmatter, html: marked(markdown, { gfm: true, breaks: true }) };
}

export default function () {
  return fs.readdirSync(dir).map((file) => {
    const raw = fs.readFileSync(path.join(dir, file), "utf-8");
    const { frontmatter, html } = parseMarkdown(raw);
    return { filename: file, slug: file.replace(/\.md$/, ""), frontmatter, html };
  });
}
