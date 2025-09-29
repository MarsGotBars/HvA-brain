export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "public/": "/" });

  return {
    dir: {
      input: "views",
      includes: "partials",
      layouts: "layouts",
      output: "dist",
    },
    templateFormats: ["liquid", "md", "html"],
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid",
    passthroughFileCopy: true,
  };
}
