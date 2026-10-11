import { readdir, readFile, stat } from "node:fs/promises";
import { join, resolve } from "node:path";

const root = process.cwd();
const sourceDirectory = join(root, "components");
const urlPattern = /https?:\/\/[^\s"'`<>]+/g;

async function getSourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? getSourceFiles(path) : path;
    })
  );
  return files.flat();
}

async function getSiteLinks() {
  const files = await getSourceFiles(sourceDirectory);
  const urls = new Set();

  for (const file of files.filter((path) => /\.(tsx?|jsx?)$/.test(path))) {
    const source = await readFile(file, "utf8");
    for (const match of source.matchAll(urlPattern)) {
      urls.add(match[0].replace(/[),.;]+$/, ""));
    }
  }

  return [...urls].sort();
}

async function checkUrl(url) {
  try {
    let response = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
      signal: AbortSignal.timeout(10_000),
    });

    if ([403, 405, 501].includes(response.status)) {
      await response.body?.cancel();
      response = await fetch(url, {
        method: "GET",
        redirect: "follow",
        signal: AbortSignal.timeout(10_000),
      });
    }

    await response.body?.cancel();
    return { url, status: response.status, ok: response.ok };
  } catch (error) {
    return {
      url,
      status: "ERROR",
      ok: false,
      detail: error instanceof Error ? error.message : String(error),
    };
  }
}

const links = await getSiteLinks();
const results = await Promise.all(links.map(checkUrl));

for (const result of results) {
  console.log(`${result.ok ? "OK" : "FAIL"} ${result.status} ${result.url}${result.detail ? ` (${result.detail})` : ""}`);
}

const cvPath = resolve(root, "public/hannan-cv.pdf");
try {
  const cv = await stat(cvPath);
  if (!cv.isFile() || cv.size === 0) throw new Error("file is empty or not a regular file");
  console.log(`OK local /hannan-cv.pdf (${cv.size} bytes)`);

  if (process.env.SITE_URL) {
    const cvUrl = new URL("/hannan-cv.pdf", process.env.SITE_URL).toString();
    const result = await checkUrl(cvUrl);
    console.log(`${result.ok ? "OK" : "FAIL"} ${result.status} ${cvUrl}${result.detail ? ` (${result.detail})` : ""}`);
    results.push(result);
  }
} catch (error) {
  console.log(`FAIL local /hannan-cv.pdf (${error instanceof Error ? error.message : String(error)})`);
  results.push({ ok: false });
}

console.log(`\nChecked ${links.length} external link(s)${process.env.SITE_URL ? " and deployed CV URL" : ""}.`);
if (results.some((result) => !result.ok)) process.exitCode = 1;
