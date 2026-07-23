const fs = require("fs");
const path = require("path");

function makeStub(kind) {
  if (kind === "mjs") {
    return [
      "function createBuilder() {",
      "  const builder = new Proxy(function () {}, {",
      "    apply() { return builder; },",
      "    get(_target, prop) {",
      "      if (prop === 'sync') return () => [];",
      "      if (prop === 'async' || prop === 'withPromise') {",
      "        return () => Promise.resolve([]);",
      "      }",
      "      if (prop === 'then') return undefined;",
      "      return () => builder;",
      "    },",
      "  });",
      "  return builder;",
      "}",
      "export class Builder {",
      "  constructor() { return createBuilder(); }",
      "}",
      "export function fdir() { return createBuilder(); }",
      "export default Builder;",
      "",
    ].join("\n");
  }

  return [
    '"use strict";',
    "function createBuilder() {",
    "  const builder = new Proxy(function () {}, {",
    "    apply() { return builder; },",
    "    get(_target, prop) {",
    "      if (prop === 'sync') return () => [];",
    "      if (prop === 'async' || prop === 'withPromise') {",
    "        return () => Promise.resolve([]);",
    "      }",
    "      if (prop === 'then') return undefined;",
    "      return () => builder;",
    "    },",
    "  });",
    "  return builder;",
    "}",
    "class Builder {",
    "  constructor() { return createBuilder(); }",
    "}",
    "function fdir() { return createBuilder(); }",
    "module.exports = { Builder, fdir, default: Builder };",
    "",
  ].join("\n");
}

function stubDir(dir) {
  const dist = path.join(dir, "dist");
  fs.mkdirSync(dist, { recursive: true });
  fs.writeFileSync(path.join(dist, "index.mjs"), makeStub("mjs"));
  fs.writeFileSync(path.join(dist, "index.cjs"), makeStub("cjs"));
  fs.writeFileSync(path.join(dist, "index.js"), makeStub("cjs"));

  const pkgPath = path.join(dir, "package.json");
  const pkg = fs.existsSync(pkgPath)
    ? JSON.parse(fs.readFileSync(pkgPath, "utf8"))
    : { name: "fdir", version: "6.5.0-stub" };
  pkg.type = "module";
  pkg.main = "./dist/index.cjs";
  pkg.module = "./dist/index.mjs";
  pkg.exports = {
    ".": {
      import: "./dist/index.mjs",
      require: "./dist/index.cjs",
    },
    "./package.json": "./package.json",
  };
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
}

function walk(dir, out) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "fdir") out.push(full);
      walk(full, out);
    }
  }
}

const fdirDirs = [];
for (const root of ["node_modules", path.join("apps", "web", ".open-next")]) {
  if (fs.existsSync(root)) walk(root, fdirDirs);
}

for (const dir of fdirDirs) stubDir(dir);
console.log(`Stubbed ${fdirDirs.length} fdir package(s) for Workers`);
