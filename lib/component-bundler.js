#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';  
import { fileURLToPath } from 'url';
import { glob } from 'glob';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

/**
 * Recursively analyze component dependencies
 */
async function getComponentDependencies(componentPath, analyzed = new Set()) {
  const componentName = path.basename(componentPath);

  // Avoid circular dependencies
  if (analyzed.has(componentPath)) {
    return { css: [], js: [] };
  }
  analyzed.add(componentPath);

  const css = [];
  const js = [];

  // Check if co-located CSS exists for this component
  const cssPath = path.join(projectRoot, 'src/views/components', `${componentPath}.css`);
  try {
    await fs.access(cssPath);
    css.push(`/css/components/${componentName}.css`);
  } catch {
    // CSS file doesn't exist, that's ok
  }

  // Check if co-located JS exists for this component
  const jsPath = path.join(projectRoot, 'src/views/components', `${componentPath}.js`);
  try {
    await fs.access(jsPath);
    js.push(`/js/components/${componentName}.js`);
  } catch {
    // JS file doesn't exist, that's ok
  }

  // Check if component file exists and scan for nested renders
  const liquidPath = path.join(projectRoot, 'src/views/components', `${componentPath}.liquid`);
  try {
    const content = await fs.readFile(liquidPath, 'utf-8');
    const nestedRenders = content.match(/\{%\s*render\s+['"](.*?)['"][^%]*%\}/g) || [];

    for (const match of nestedRenders) {
      const nestedMatch = match.match(/['"](.*?)['"]/);
      if (nestedMatch) {
        const nestedPath = nestedMatch[1];
        const nestedDeps = await getComponentDependencies(nestedPath, analyzed);
        css.push(...nestedDeps.css);
        js.push(...nestedDeps.js);
      }
    }
  } catch {
    // Component file doesn't exist
  }

  return { css: [...new Set(css)], js: [...new Set(js)] };
}

/**
 * Analyze a page and return its CSS dependencies
 */
async function analyzePageDependencies(pagePath) {
  try {
    const content = await fs.readFile(path.join(projectRoot, pagePath), 'utf-8');
    const renderMatches = content.match(/\{%\s*render\s+['"](.*?)['"][^%]*%\}/g) || [];

    const allCSS = [];
    const allJS = [];

    for (const match of renderMatches) {
      const componentMatch = match.match(/['"](.*?)['"]/);
      if (componentMatch) {
        const componentPath = componentMatch[1];
        const deps = await getComponentDependencies(componentPath);
        allCSS.push(...deps.css);
        allJS.push(...deps.js);
      }
    }

    return { css: [...new Set(allCSS)], js: [...new Set(allJS)] };
  } catch (error) {
    console.error(`❌ Error analyzing ${pagePath}:`, error.message);
    return { css: [], js: [] };
  }
}

/**
 * Update page's front matter with auto-detected CSS and JS dependencies
 */
async function injectPageDependencies(pagePath, cssDependencies, jsDependencies) {
  const fullPath = path.join(projectRoot, pagePath);
  let content = await fs.readFile(fullPath, 'utf-8');

  // Normalise Windows line endings before any regex work
  content = content.replace(/\r\n/g, '\n');

  // Strip duplicate leading front matter blocks (corruption recovery)
  content = content.replace(/^(---\n[\s\S]*?\n---\n)+(?=---)/, '');

  const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

  if (frontMatterMatch) {
    let frontMatter = frontMatterMatch[1];
    const bodyContent = frontMatterMatch[2];

    // Strip existing injected keys line by line
    const lines = frontMatter.split('\n');
    const filtered = [];
    let skipping = false;

    for (const line of lines) {
      if (/^componentStyles:|^componentScripts:/.test(line)) {
        skipping = true;
        continue;
      }
      if (skipping && /^[a-zA-Z]/.test(line)) {
        skipping = false;
      }
      if (!skipping) filtered.push(line);
    }

    frontMatter = filtered.join('\n').trim();

    if (cssDependencies.length > 0) {
      frontMatter += `\ncomponentStyles:\n${cssDependencies.map(css => `  - ${css}`).join('\n')}`;
    }
    if (jsDependencies.length > 0) {
      frontMatter += `\ncomponentScripts:\n${jsDependencies.map(js => `  - ${js}`).join('\n')}`;
    }

    content = `---\n${frontMatter}\n---\n${bodyContent}`;
  } else {
    const lines = [];
    if (cssDependencies.length > 0) {
      lines.push(`componentStyles:\n${cssDependencies.map(css => `  - ${css}`).join('\n')}`);
    }
    if (jsDependencies.length > 0) {
      lines.push(`componentScripts:\n${jsDependencies.map(js => `  - ${js}`).join('\n')}`);
    }
    if (lines.length > 0) {
      content = `---\n${lines.join('\n')}\n---\n${content}`;
    }
  }

  // Sanity check — refuse to write if structure is wrong
  const fmCount = (content.match(/^---$/gm) || []).length;
  if (fmCount !== 2) {
    console.error(`❌ Refusing to write ${pagePath} — unexpected front matter structure (${fmCount} --- markers)`);
    return;
  }

  await fs.writeFile(fullPath, content, { encoding: 'utf-8' });
}

// Keep old name as alias
async function injectPageCSS(pagePath, cssDependencies) {
  await injectPageDependencies(pagePath, cssDependencies, []);
}

/**
 * Analyze all pages for component dependencies
 */
async function analyzeDependencies() {
  console.log('🔍 Analyzing component dependencies per page...\n');

  const pageFiles = await glob('src/views/pages/**/*.liquid', {
    cwd: projectRoot,
  });

  const pageAnalysis = new Map();
  const allUsedComponents = new Set();

  for (const pagePath of pageFiles) {
    const dependencies = await analyzePageDependencies(pagePath);
    if (dependencies.css.length > 0 || dependencies.js.length > 0) {
      pageAnalysis.set(pagePath, dependencies);
      dependencies.css.forEach((dep) => allUsedComponents.add(dep));
      dependencies.js.forEach((dep) => allUsedComponents.add(dep));
    }
  }

  return { pageAnalysis, allUsedComponents: Array.from(allUsedComponents) };
}

/**
 * Auto-inject CSS and JS dependencies into page front matter
 */
async function autoInjectCSS() {
  console.log('💉 Auto-injecting component dependencies...\n');

  const { pageAnalysis } = await analyzeDependencies();

  for (const [pagePath, dependencies] of pageAnalysis) {
    console.log(`📄 ${pagePath}:`);
    dependencies.css.forEach((dep) => console.log(`   🎨 ${dep}`));
    dependencies.js.forEach((dep) => console.log(`   📜 ${dep}`));

    await injectPageDependencies(pagePath, dependencies.css, dependencies.js);
    console.log(`   ✅ Injected\n`);
  }

  console.log('🎉 Auto-injection complete!');
}

/**
 * Auto-inject dependencies into page front matter (dev mode, smart)
 */
async function autoInjectCSSQuiet() {
  const { pageAnalysis } = await analyzeDependencies();

  let totalPages = 0;
  let actualChanges = 0;

  for (const [pagePath, dependencies] of pageAnalysis) {
    const changed = await injectPageIfChanged(pagePath, dependencies);
    totalPages++;
    if (changed) actualChanges++;
  }

  if (actualChanges > 0) {
    console.log(`Updated dependencies for ${actualChanges}/${totalPages} pages`);
  }
}

/**
 * Update page's front matter only if dependencies changed
 */
async function injectPageIfChanged(pagePath, dependencies) {
  const fullPath = path.join(projectRoot, pagePath);
  let content = await fs.readFile(fullPath, 'utf-8');

  const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  let existingStyles = [];
  let existingScripts = [];

  if (frontMatterMatch) {
    const frontMatter = frontMatterMatch[1];
    const stylesMatch = frontMatter.match(/componentStyles:\s*\n((?:\s*-\s*.*\n?)*)/);
    if (stylesMatch) {
      existingStyles = stylesMatch[1]
        .split('\n')
        .map((line) => line.trim().replace(/^-\s*/, ''))
        .filter((line) => line);
    }
    const scriptsMatch = frontMatter.match(/componentScripts:\s*\n((?:\s*-\s*.*\n?)*)/);
    if (scriptsMatch) {
      existingScripts = scriptsMatch[1]
        .split('\n')
        .map((line) => line.trim().replace(/^-\s*/, ''))
        .filter((line) => line);
    }
  }

  const noChange =
    JSON.stringify(existingStyles.sort()) === JSON.stringify([...dependencies.css].sort()) &&
    JSON.stringify(existingScripts.sort()) === JSON.stringify([...dependencies.js].sort());

  if (noChange) return false;

  await injectPageDependencies(pagePath, dependencies.css, dependencies.js);
  return true;
}

// Keep old name as alias
async function injectPageCSSIfChanged(pagePath, cssDependencies) {
  return injectPageIfChanged(pagePath, { css: cssDependencies, js: [] });
}

/**
 * Just analyze dependencies (dry run)
 */
async function analyzeDryRun(specificPage = null) {
  if (specificPage) {
    const dependencies = await analyzePageDependencies(specificPage);
    console.log(`CSS: [${dependencies.css.join(', ')}]`);
    console.log(`JS:  [${dependencies.js.join(', ')}]`);
    return;
  }
  
  const { pageAnalysis } = await analyzeDependencies();
  
  console.log('📊 Component Dependencies per Page:\n');
  for (const [page, deps] of pageAnalysis) {
    console.log(`${page}:`);
    deps.css.forEach(dep => console.log(`   🎨 ${dep}`));
    deps.js.forEach(dep => console.log(`   📜 ${dep}`));
    console.log();
  }
}

// CLI Interface and Main Function
async function main() {
  const command = process.argv[2];
  const target = process.argv[3];
  
  try {
    switch (command) {
      case 'analyze':
        await analyzeDryRun(target);
        break;
        
      case 'inject':
        await autoInjectCSS();
        console.log('\n🎯 Next step: Update your Head.liquid to use componentStyles!');
        break;

      case 'inject-quiet':
        await autoInjectCSSQuiet();
        break;
        
      default:
        console.log(`
🎯 Smart Component CSS Bundler

Commands:
  node scripts/component-bundler.js analyze          - Analyze all pages (dry run)
  node scripts/component-bundler.js analyze [page]   - Analyze specific page  
  node scripts/component-bundler.js inject           - Auto-inject CSS into front matter

Examples:
  node scripts/component-bundler.js analyze views/index.liquid
  node scripts/component-bundler.js inject
`);
    }
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

// Export functions for use in Eleventy config
export { analyzePageDependencies, autoInjectCSS, autoInjectCSSQuiet, injectPageCSSIfChanged, analyzeDependencies };