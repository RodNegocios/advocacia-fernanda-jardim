import { build, createServer } from "vite";
import sharp from "sharp";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
process.env.NODE_ENV = "production";
const { renderToString } = await import("react-dom/server");
const React = await import("react");
const source = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const root = path.resolve(source, "..");
process.chdir(source);
await fs.mkdir(path.join(root, "assets"), { recursive: true });
// Only site output is written. Original photographs and reference materials stay intact.
const portraits = {
  portrait: "foto da advogada fernando jardim1.png",
  about: "fodo da advogada fernando jardim 3.png",
};
if (!process.argv.includes("--skip-images"))
  for (const [name, file] of Object.entries(portraits)) {
    for (const width of [640, 1080]) {
      const input = path.join(source, "materials", file);
      await sharp(input)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 82, effort: 6 })
        .toFile(path.join(root, `assets/${name}-${width}.webp`));
      await sharp(input)
        .resize({ width, withoutEnlargement: true })
        .avif({ quality: 53, effort: 6 })
        .toFile(path.join(root, `assets/${name}-${width}.avif`));
    }
  }
await sharp(path.join(source, "materials/logotipo da advocacia.png"))
  .resize({ width: 656 })
  .webp({ quality: 88 })
  .toFile(path.join(root, "assets/logo.webp"));
await build();
const server = await createServer({
  server: { middlewareMode: true, hmr: false, ws: false },
  appType: "custom",
});
try {
  const { default: App } = await server.ssrLoadModule("/src/App.jsx");
  const html = await fs.readFile(
    path.join(source, ".build/index.html"),
    "utf8",
  );
  const markup = renderToString(React.createElement(App));
  if (!html.includes("<!--app-html-->"))
    throw new Error("SSR placeholder missing");
  await fs.writeFile(
    path.join(root, "index.html"),
    html.replace("<!--app-html-->", markup),
  );
  const privacyContent = markup.match(/<dialog[^>]*>([\s\S]*?)<\/dialog>/)?.[1];
  if (!privacyContent) throw new Error("Privacy content missing");
  const privacyBody = privacyContent
    .replace(/<button[\s\S]*?<\/button>/g, "")
    .replace(
      '<h2 id="privacy-title">Sua privacidade.</h2>',
      '<h1 id="privacy-title">Sua privacidade.</h1>',
    );
  const privacyHead = html
    .match(/<head>([\s\S]*?)<\/head>/)[1]
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(
      /<title>.*?<\/title>/,
      "<title>Privacidade | Fernanda Jardim</title>",
    );
  await fs.writeFile(
    path.join(root, "privacidade.html"),
    `<!doctype html><html lang="pt-BR"><head>${privacyHead.replace(/[ \t]+$/gm, "")}</head><body><main class="privacy-document"><a class="text-link dark-link" href="/">Voltar ao site</a>${privacyBody}</main></body></html>`,
  );
} finally {
  await server.close();
}
const buildAssets = path.join(source, ".build/assets");
const current = await fs.readdir(buildAssets);
// Prune only Vite-generated hashes, never user images or documents.
for (const file of await fs.readdir(path.join(root, "assets"))) {
  if (
    /^(index|cormorant-garamond|manrope).*-[\w-]{8}\.(js|css|woff2?)$/.test(
      file,
    ) &&
    !current.includes(file)
  )
    await fs.unlink(path.join(root, "assets", file));
}
for (const file of current)
  await fs.copyFile(
    path.join(buildAssets, file),
    path.join(root, "assets", file),
  );
const licenses = [];
for (const [name, file] of [
  ["React Bits", "REACT-BITS-LICENSE.txt"],
  [
    "GSAP (standard no-charge license reference)",
    "node_modules/gsap/README.md",
  ],
  ["React", "node_modules/react/LICENSE"],
  ["Motion", "node_modules/motion/LICENSE.md"],
  ["Cormorant Garamond", "node_modules/@fontsource/cormorant-garamond/LICENSE"],
  ["Manrope", "node_modules/@fontsource/manrope/LICENSE"],
]) {
  try {
    licenses.push(
      `${name}\n${await fs.readFile(path.join(source, file), "utf8")}`,
    );
  } catch (e) {
    throw new Error(`Required license missing: ${name} (${file})`, {
      cause: e,
    });
  }
}
await fs.writeFile(
  path.join(root, "assets/third-party-licenses.txt"),
  licenses.join("\n\n--------------------\n\n").replace(/[ \t]+$/gm, ""),
);
console.log(
  "Static site generated in the repository root. No build required on Hostinger.",
);
