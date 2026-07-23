const fs = require("fs");
const path = require("path");

const pkgPath = path.join("node_modules", "@noble", "ciphers", "package.json");
if (!fs.existsSync(pkgPath)) {
  console.log("skip noble patch: package missing");
  process.exit(0);
}

const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
if (pkg.exports && pkg.exports["./utils.js"] && !pkg.exports["./utils"]) {
  pkg.exports["./utils"] = pkg.exports["./utils.js"];
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
  console.log("Aliased @noble/ciphers ./utils -> ./utils.js");
} else {
  console.log("No @noble/ciphers ./utils alias needed");
}
