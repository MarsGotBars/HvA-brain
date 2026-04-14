export default {
  permalink: (data) => {
    if (data.permalink) return data.permalink;
    
    const stem = data?.page?.filePathStem;
    
    if (!stem) return undefined;

    const parts = stem.split("/pages/");
    if (parts.length < 2) return undefined;    

    let path = parts[1];
    path = path.replace(/\/index$/, "").replace(/^index$/, "");
    

    return `/${path ? path + "/" : ""}index.html`;
  },
};