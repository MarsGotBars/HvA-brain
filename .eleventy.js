import Image from "@11ty/eleventy-img";
import { join } from "path";
import { rm } from "fs/promises";
import { existsSync } from "fs";

export default function (eleventyConfig) {

  // Re-inject CSS dependencies before every build
  eleventyConfig.on("eleventy.before", async () => {
    try {
      const { autoInjectCSSQuiet } = await import("./lib/component-bundler.js");
      await autoInjectCSSQuiet();
    } catch (error) {
      console.warn("⚠️ CSS injection failed:", error.message);
    }
  });
  
  eleventyConfig.addWatchTarget("src/static/**/*");
  eleventyConfig.addWatchTarget("src/views/components/**/*.liquid");

  eleventyConfig.addPassthroughCopy({ 'src/static/': '/' });
  eleventyConfig.addPassthroughCopy({ 'src/views/components/**/*.css': '/css/components/' });
  eleventyConfig.addPassthroughCopy({ 'src/views/components/**/*.js': '/js/components/' });


  // Remove project-visuals/ after build
  eleventyConfig.on("eleventy.after", async ({ dir }) => {
    const projectVisualsPath = join(
      dir.output,
      "assets",
      "img",
      "project-visuals"
    );

    if (existsSync(projectVisualsPath)) {
      await rm(projectVisualsPath, { recursive: true, force: true });
      console.log("Removed:", projectVisualsPath);
    }
  });

  // Image generation shortcode
  eleventyConfig.addLiquidShortcode(
    "image",
    async function (src, alt = "", sizes, loading = "lazy") {
      console.log(src);
      
      try {
        let metadata = await Image(src, {
          widths: [300, 600, 1200, 1600],
          formats: ["avif", "webp", "jpeg"],
          outputDir: "./dist/assets/img/",
          urlPath: "/assets/img/",
          transformOnRequest: false, // Disable image transformation
        });

        let imageAttributes = {
          alt,
          sizes: sizes || "(max-width: 768px) 100vw, 50vw",
          loading,
          decoding: "async",
        };
        // console.log(metadata, "created metadata");

        return Image.generateHTML(metadata, imageAttributes);
      } catch (error) {
        // handle missing images (empty image)
        // console.error(`Error processing image ${src}:`, error);
        return `<picture><img src="" alt="${alt ? alt : "Image not found"}" /></picture>`;
      }
    }
  );

  return {
    dir: {
      input: "src/views",
      includes: "components",
      layouts: "layouts",
      data: "../../_data", // <-- Go up two levels from 'views' to reach root/_data
      output: "dist",
    },
    templateFormats: ["liquid", "html"],
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
    passthroughFileCopy: true,
  };
}
