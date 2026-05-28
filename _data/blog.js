import fs from "fs";
import path from "path";
import { marked } from "marked";
import yaml from "js-yaml";

export default function () {
  return fs.readdirSync("./content/blog").map((file) => {
    const raw = fs.readFileSync(path.join("./content/blog", file), "utf-8");
    const { frontmatter, content } = parseFrontmatter(raw);
    const html = marked.parse(content);
    const slug = file.replace(/\.md$/, "");
    // console.log('read', blogStore);
    
    
    return {
      filename: file, 
      slug,
      frontmatter, 
      html, 
      isBlog: true 
    };
  });
}

function parseFrontmatter(fileContent) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = fileContent.match(frontmatterRegex);
  
  if (!match) {
    return { frontmatter: {}, content: fileContent };
  }
  
  const frontmatterString = match[1];
  const content = match[2];
  
  const frontmatter = yaml.load(frontmatterString);
  // console.log("Parsed frontmatter:", frontmatter);
  
  return { frontmatter, content };
}
