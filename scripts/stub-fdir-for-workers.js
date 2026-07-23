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
  "  crawl() { return this; }",
  "  crawlWithOptions() { return this; }",
  "  sync() { return []; }",
  "  async() { return Promise.resolve([]); }",
  "  withAbort() { return this; }",
  "}",
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
  "  crawl() { return this; }",
  "  crawlWithOptions() { return this; }",
  "  sync() { return []; }",
  "  async() { return Promise.resolve([]); }",
  "  withAbort() { return this; }",
  "}",
  "module.exports = { Builder, default: Builder };",
  "",
].join("\n");

fs.writeFileSync(path.join(dir, "index.mjs"), stubMjs);
fs.writeFileSync(path.join(dir, "index.js"), stubCjs);
console.log("Stubbed fdir for Workers");
