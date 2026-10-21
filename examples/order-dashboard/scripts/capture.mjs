import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";

const base = process.env.DEMO_URL || "http://127.0.0.1:4173";
await mkdir(new URL("../evidence/", import.meta.url), { recursive: true });
const browser = await chromium.launch({ headless: true });

try {
  for (const [name, width, height] of [["desktop", 1440, 900], ["mobile", 390, 844]]) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
    for (const [variant, path] of [["reference", "/reference.html"], ["before", "/?view=before&capture=1"], ["after", "/?view=after&capture=1"]]) {
      await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
      await page.screenshot({ path: new URL(`../evidence/${variant}-${name}.png`, import.meta.url).pathname, fullPage: true });
      const dimensions = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth }));
      if (dimensions.document > dimensions.viewport) throw new Error(`${variant} ${name}: horizontal overflow ${JSON.stringify(dimensions)}`);
    }
    await page.close();
  }

  const card = await browser.newPage({ viewport: { width: 1280, height: 640 }, deviceScaleFactor: 1 });
  await card.goto(`${base}/share-card.html`, { waitUntil: "networkidle" });
  await card.screenshot({ path: new URL("../evidence/social-preview.png", import.meta.url).pathname });
  await card.close();

  for (const view of ["before", "after"]) {
    const page = await browser.newPage();
    await page.goto(`${base}/?view=${view}`, { waitUntil: "networkidle" });
    const search = page.getByRole("textbox", { name: "Search orders" });
    await search.fill("Maya");
    if (await page.locator("tbody tr").count() !== 1) throw new Error(`${view}: search did not narrow to one row`);
    await search.fill("");
    await page.getByRole("combobox", { name: "Filter by status" }).selectOption("Pending");
    if (await page.locator("tbody tr").count() !== 2) throw new Error(`${view}: pending filter did not show two rows`);
    await page.getByRole("button", { name: "Mark NS-1048 fulfilled" }).click();
    if (await page.locator("tbody tr").count() !== 1) throw new Error(`${view}: fulfillment did not update filtered results`);
    await page.getByRole("combobox", { name: "Filter by status" }).selectOption("Fulfilled");
    if (await page.locator("tbody tr").count() !== 3) throw new Error(`${view}: fulfillment did not update status counts`);
    await page.close();
    process.stdout.write(`${view}: search, status filter, fulfillment passed\n`);
  }
  process.stdout.write("Reference, before, and after screenshots captured at 1440px and 390px; social preview captured; no horizontal overflow.\n");
} finally {
  await browser.close();
}
