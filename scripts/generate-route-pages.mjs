import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const publicDir = path.resolve("dist/public");
const template = await readFile(path.join(publicDir, "index.html"), "utf8");
const { routes } = JSON.parse(
  await readFile(path.join(publicDir, "manus-routes.json"), "utf8")
);
const baseUrl = "https://nature-nexus-green.vercel.app";
const descriptions = {
  "/": "Industrial RO, STP, ETP and ZLD solutions, installation, commissioning and operation & maintenance for industries and institutions across Tamil Nadu. Contact Nature Nexus to discuss a site assessment.",
  "/services/":
    "Explore industrial RO, STP, ETP, ZLD, installation, commissioning, operation, maintenance and AMC services from Nature Nexus.",
  "/services/industrial-ro/":
    "Industrial reverse osmosis planning, supply, installation and support, subject to feed-water analysis and site requirements.",
  "/services/stp/":
    "Sewage treatment plant planning, installation, commissioning and operation support for commercial and institutional sites.",
  "/services/etp/":
    "Industrial effluent treatment planning based on process streams, wastewater analysis, flow and site-specific requirements.",
  "/services/zld/":
    "Explore site-specific zero liquid discharge feasibility and treatment considerations for industrial wastewater.",
  "/services/plant-installation-commissioning/":
    "Plan treatment plant installation and commissioning around site readiness, equipment interfaces and documented operating requirements.",
  "/services/operation-maintenance/":
    "Operation and maintenance support for water and wastewater treatment plants, defined around equipment, process and site needs.",
  "/services/annual-maintenance-contract/":
    "Discuss an annual maintenance contract for a treatment plant, with coverage shaped around the equipment and site requirements.",
  "/industries/":
    "Water and wastewater treatment considerations for textile, food, manufacturing, healthcare, education, buildings and data centres.",
  "/industries/textile/":
    "Textile and dyeing wastewater treatment considerations including stream characterization, variability, reuse and O&M.",
  "/industries/food-manufacturing/":
    "Food manufacturing water and wastewater planning shaped by product, cleaning cycles, organic loads and site operations.",
  "/industries/hospitals/":
    "Hospital water and sewage treatment considerations with site-specific review of flows, segregation, reuse and maintenance.",
  "/industries/manufacturing/":
    "Manufacturing water and wastewater planning based on production processes, source-water quality and site requirements.",
  "/industries/data-centres/":
    "Data centre water-system considerations including source quality, cooling design, reliability and maintenance planning.",
  "/industries/schools-apartments/":
    "Water and sewage treatment planning for schools, apartments and commercial buildings based on occupancy and site conditions.",
  "/about/":
    "Learn about Nature Nexus Environmental Solutions and its focus on water and wastewater treatment services.",
  "/contact/":
    "Discuss an industrial or institutional water treatment requirement with Nature Nexus. Share project context to start a conversation.",
  "/privacy/":
    "How the Nature Nexus website enquiry form handles information before you choose to send it through WhatsApp.",
};
const escapeHtml = value =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

for (const route of routes) {
  const canonical = `${baseUrl}${route.path}`;
  const description = descriptions[route.path];
  if (!description)
    throw new Error(`Missing metadata description for route ${route.path}`);
  const title = escapeHtml(
    route.path === "/"
      ? "Nature Nexus Environmental Solutions | Water Treatment Tamil Nadu"
      : route.title
  );
  const fallbackHeading = escapeHtml(
    route.path === "/"
      ? "Industrial water and wastewater treatment solutions across Tamil Nadu"
      : route.title.replace(/ \| Nature Nexus$/, "")
  );
  const fallback = `<noscript><main><h1>${fallbackHeading}</h1><p>${escapeHtml(description)}</p><p><a href="/services/">Explore services</a> · <a href="/contact/">Contact Nature Nexus</a></p></main></noscript>`;
  const body = template
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"\s*\/>/,
      `<meta name="description" content="${escapeHtml(description)}" />`
    )
    .replace(
      /<meta property="og:title" content="[^"]*"\s*\/>/,
      `<meta property="og:title" content="${title}" />`
    )
    .replace(
      /<meta property="og:description" content="[^"]*"\s*\/>/,
      `<meta property="og:description" content="${escapeHtml(description)}" />`
    )
    .replace(
      /<meta property="og:url" content="[^"]*"\s*\/>/,
      `<meta property="og:url" content="${canonical}" />`
    )
    .replace(
      /<link rel="canonical" href="[^"]*"\s*\/>/,
      `<link rel="canonical" href="${canonical}" />`
    )
    .replace("</body>", `${fallback}</body>`);
  const relative =
    route.path === "/"
      ? "index.html"
      : path.join(route.path.replace(/^\/+|\/+$/g, ""), "index.html");
  const target = path.join(publicDir, relative);
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, body);
}
console.log(
  `Generated ${routes.length} route documents with unique titles, descriptions and canonical URLs.`
);
