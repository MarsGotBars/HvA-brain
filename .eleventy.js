export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "public/": "/" });

  return {
    dir: {
      input: "views",
      includes: "partials",
      layouts: "layouts",
      data: "../_data",      // <-- Go up one level from 'views' to reach root/_data
      output: "dist",
    },
    templateFormats: ["liquid", "md", "html"],
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
    passthroughFileCopy: true,
  };
}