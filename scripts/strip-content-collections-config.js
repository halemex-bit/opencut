const fs = require("fs");
const path = require("path");

const configPath = path.join("apps", "web", "next.config.ts");
const source = fs.readFileSync(configPath, "utf8");

const next = source
  .replace(
    /import\s+\{\s*withContentCollections\s*\}\s+from\s+"@content-collections\/next";\s*/g,
    "",
  )
  .replace(
    /export default withContentCollections\(withBotId\(nextConfig\)\);/,
    "export default withBotId(nextConfig);",
  );

if (next === source) {
  console.log("content-collections wrapper not found; no change");
} else {
  fs.writeFileSync(configPath, next);
  console.log("Stripped content-collections wrapper from next.config.ts");
}
