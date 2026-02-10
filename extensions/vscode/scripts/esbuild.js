const fs = require("fs");
const path = require("path");
const esbuild = require("esbuild");

const flags = process.argv.slice(2);

const esbuildConfig = {
  entryPoints: ["src/extension.ts"],
  bundle: true,
  outfile: "out/extension.js",
  external: ["vscode", "esbuild", "./xhr-sync-worker.js"],
  format: "cjs",
  platform: "node",
  sourcemap: flags.includes("--sourcemap"),
  loader: {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ".node": "file",
  },

  // To allow import.meta.path for transformers.js
  // https://github.com/evanw/esbuild/issues/1492#issuecomment-893144483
  inject: ["./scripts/importMetaUrl.js"],
  define: { "import.meta.url": "importMetaUrl" },
};

function copyXhrSyncWorker() {
  const src = path.join(
    __dirname,
    "..",
    "node_modules",
    "jsdom",
    "lib",
    "jsdom",
    "living",
    "xhr",
    "xhr-sync-worker.js"
  );
  const dest = path.join(__dirname, "..", "out", "xhr-sync-worker.js");
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log("[info] Copied xhr-sync-worker.js to out/");
  } else {
    console.warn(
      "[warn] xhr-sync-worker.js not found at",
      src,
      "- run npm install"
    );
  }
}

(async () => {
  // Bundles the extension into one file
  if (flags.includes("--watch")) {
    const ctx = await esbuild.context(esbuildConfig);
    await ctx.watch();
    copyXhrSyncWorker();
  } else {
    await esbuild.build(esbuildConfig);
    copyXhrSyncWorker();
  }
})();
