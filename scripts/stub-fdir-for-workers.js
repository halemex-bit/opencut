const fs = require("fs");
const path = require("path");

const dir = path.join("node_modules", "fdir", "dist");
fs.mkdirSync(dir, { recursive: true });

const stubMjs = [
  "export class Builder {",
  "  glob() { return this; }",
  "  withFullPaths() { return this; }",
  "  withRelativePaths() { return this; }",
  "  withPathSeparator() { return this; }",
  "  withErrors() { return this; }",
  "  onlyDirs() { return this; }",
  "  onlyFiles() { return this; }",
  "  filter() { return this; }",
  "  exclude() { return this; }",
  "  concurrency() { return this; }",
  "  crawl(_root) { return this; }",
  "  crawlWithOptions() { return this; }",
  "  sync() { return []; }",
  "  async() { return Promise.resolve([]); }",
  "  withAbort() { return this; }",
  "}",
  "export function fdir() { return new Builder(); }",
  "export default Builder;",
  "",
].join("\n");

const stubCjs = [
  "class Builder {",
  "  glob() { return this; }",
  "  withFullPaths() { return this; }",
  "  withRelativePaths() { return this; }",
  "  withPathSeparator() { return this; }",
  "  withErrors() { return this; }",
  "  onlyDirs() { return this; }",
  "  onlyFiles() { return this; }",
  "  filter() { return this; }",
  "  exclude() { return this; }",
  "  concurrency() { return this; }",
  "  crawl(_root) { return this; }",
  "  crawlWithOptions() { return this; }",
  "  sync() { return []; }",
  "  async() { return Promise.resolve([]); }",
  "  withAbort() { return this; }",
  "}",
  "function fdir() { return new Builder(); }",
  "module.exports = { Builder, fdir, default: Builder };",
  "",
].join("\n");

fs.writeFileSync(path.join(dir, "index.mjs"), stubMjs);
fs.writeFileSync(path.join(dir, "index.js"), stubCjs);

const pkgPath = path.join("node_modules", "fdir", "package.json");
if (fs.existsSync(pkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  pkg.exports = {
    ".": {
      import: "./dist/index.mjs",
      require: "./dist/index.js",
      default: "./dist/index.js",
    },
  };
  pkg.main = "./dist/index.js";
  pkg.module = "./dist/index.mjs";
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
}

console.log("Stubbed fdir for Workers");
