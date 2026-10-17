import { useEffect, useState } from "react";
import { Link } from "wouter";
import {
  ArrowDownRight,
  ArrowUpRight,
  Droplets,
  Leaf,
  Menu,
  X,
} from "lucide-react";
import NotFound from "@/pages/NotFound";

type PageInfo = {
  title: string;
  description: string;
  intro: string;
  considerations: string[];
  questions: string[];
  links: string[];
};

const pages: Record<string, PageInfo> = {
  "/services/": {
    title: "Water & Wastewater Treatment Services | Nature Nexus",
    description:
      "Explore industrial RO, STP, ETP, ZLD, installation, commissioning, operation, maintenance and AMC services from Nature Nexus.",
    intro:
      "Water-treatment requirements depend on the source, end use, wastewater characteristics, site conditions and applicable standards. Nature Nexus supports project discussions across treatment, installation and ongoing plant care.",
    considerations: [
      "Start with a clear process and water-use assessment.",
      "Treatment selection and capacity need site data and representative water or wastewater analysis.",
      "Operation, maintenance and monitoring needs should be considered during system selection.",
    ],
    questions: [
      "What water source and end use should the system serve?",
      "Are representative test results and flow patterns available?",
      "What operation and maintenance support is needed after commissioning?",
    ],
    links: [
      "/services/industrial-ro/",
      "/services/stp/",
      "/services/etp/",
      "/services/zld/",
      "/services/plant-installation-commissioning/",
      "/services/operation-maintenance/",
      "/services/annual-maintenance-contract/",
    ],
  },
  "/services/industrial-ro/": {
    title: "Industrial RO Systems & Solutions | Nature Nexus",
    description:
      "Industrial reverse osmosis planning, supply, installation and support, subject to feed-water analysis and site requirements.",
    intro:
      "Industrial reverse osmosis can be considered when dissolved constituents in feed water need to be reduced for a defined process or reuse purpose. A suitable design begins with source-water analysis and the required treated-water quality.",
    considerations: [
      "Feed-water chemistry, suspended solids, temperature and variability affect pretreatment and membrane selection.",
      "Recovery, concentrate handling, fouling and cleaning plans affect operating requirements.",
      "Final design and expected performance must be based on representative analysis and operating conditions; this page makes no performance guarantee.",
    ],
    questions: [
      "What is the water source and intended use of permeate?",
      "Are recent water-analysis results available?",
      "What daily flow, operating hours and concentrate-handling arrangements are expected?",
    ],
    links: [
      "/services/plant-installation-commissioning/",
      "/services/operation-maintenance/",
      "/services/annual-maintenance-contract/",
      "/industries/manufacturing/",
    ],
  },
  "/services/stp/": {
    title: "Sewage Treatment Plant Solutions | Nature Nexus",
    description:
      "Sewage treatment plant planning, installation, commissioning and operation support for commercial and institutional sites.",
    intro:
      "Sewage treatment plant requirements vary with occupancy, flow patterns, influent characteristics, available space and the intended discharge or reuse route. A site-specific review helps establish process and operating needs.",
    considerations: [
      "Daily and peak flows, equalization, space and access influence plant selection.",
      "Reuse or discharge objectives and applicable requirements need to be identified at the outset.",
      "Reliable operation depends on routine monitoring, trained operators, maintenance and responsible sludge handling.",
    ],
    questions: [
      "What is the design occupancy and measured or estimated flow?",
      "Is treated water intended for reuse, and for what purpose?",
      "Who will operate the plant and maintain records after handover?",
    ],
    links: [
      "/services/operation-maintenance/",
      "/services/annual-maintenance-contract/",
      "/industries/hospitals/",
      "/industries/schools-apartments/",
    ],
  },
  "/services/etp/": {
    title: "Industrial Effluent Treatment Plant Solutions | Nature Nexus",
    description:
      "Industrial effluent treatment planning based on process streams, wastewater analysis, flow and site-specific requirements.",
    intro:
      "Industrial effluent treatment must be matched to the processes that generate the wastewater. Segregating streams and understanding variability can help define a practical treatment approach before equipment is selected.",
    considerations: [
      "Process-specific contaminants, pH, temperature, flow variation and batch cycles need characterization.",
      "Pretreatment, biological or physicochemical steps may be considered only after data review.",
      "Applicable discharge or reuse requirements and site conditions determine the final design; no compliance outcome is guaranteed by this general description.",
    ],
    questions: [
      "Which production processes contribute to each wastewater stream?",
      "Are samples representative of normal and peak production?",
      "What discharge or reuse criteria apply to the site?",
    ],
    links: [
      "/industries/textile/",
      "/industries/food-manufacturing/",
      "/industries/manufacturing/",
      "/services/operation-maintenance/",
    ],
  },
  "/services/zld/": {
    title: "Zero Liquid Discharge Systems | Nature Nexus",
    description:
      "Explore site-specific zero liquid discharge feasibility and treatment considerations for industrial wastewater.",
    intro:
      "Zero Liquid Discharge (ZLD) is a process objective that aims to minimize or eliminate liquid discharge from a defined facility boundary. Feasibility depends on wastewater composition, recovery targets, energy, residuals management, economics and local requirements.",
    considerations: [
      "A detailed water balance and representative stream analysis are essential before selecting a process.",
      "Concentrate treatment, salt or sludge handling, utilities, energy demand and maintenance can be significant design factors.",
      "ZLD should be evaluated against reuse, discharge and other alternatives using site-specific technical and economic data.",
    ],
    questions: [
      "What streams are included in the proposed water balance?",
      "What residuals handling and utility capacity are available?",
      "What are the site's actual discharge obligations and reuse demands?",
    ],
    links: [
      "/services/etp/",
      "/services/industrial-ro/",
      "/industries/textile/",
      "/industries/manufacturing/",
    ],
  },
  "/services/plant-installation-commissioning/": {
    title: "Treatment Plant Installation & Commissioning | Nature Nexus",
    description:
      "Plan treatment plant installation and commissioning around site readiness, equipment interfaces and documented operating requirements.",
    intro:
      "Installation and commissioning coordinate site readiness, equipment placement, utilities, interconnections, safety and initial operating checks. The scope should be agreed against the selected design and supplier documentation.",
    considerations: [
      "Confirm civil works, access, power, drainage and utility interfaces before mobilization.",
      "Commissioning checks should follow approved equipment and process procedures.",
      "Operator training, handover documents, maintenance plans and unresolved punch-list items should be recorded.",
    ],
    questions: [
      "Are civil works, utilities and equipment access ready?",
      "Who is responsible for each mechanical, electrical and process interface?",
      "What commissioning records and operator handover are required?",
    ],
    links: [
      "/services/industrial-ro/",
      "/services/stp/",
      "/services/etp/",
      "/services/operation-maintenance/",
    ],
  },
  "/services/operation-maintenance/": {
    title: "Water Treatment Plant Operation & Maintenance | Nature Nexus",
    description:
      "Operation and maintenance support for water and wastewater treatment plants, defined around equipment, process and site needs.",
    intro:
      "Operation and maintenance (O&M) needs depend on the installed process, equipment condition, operating schedule and site responsibilities. A clear scope can cover routine checks, preventive maintenance, monitoring and escalation arrangements.",
    considerations: [
      "Review equipment lists, operating records, alarms and recurring process issues before defining a scope.",
      "Set out operator roles, consumables, spares, monitoring frequency and reporting expectations.",
      "Troubleshooting should be based on observed conditions and appropriate water or process data.",
    ],
    questions: [
      "What equipment and process records are available?",
      "Which routine tasks are performed by site staff today?",
      "What response, reporting and escalation expectations are appropriate?",
    ],
    links: [
      "/services/annual-maintenance-contract/",
      "/services/stp/",
      "/services/etp/",
      "/services/industrial-ro/",
    ],
  },
  "/services/annual-maintenance-contract/": {
    title: "Treatment Plant AMC & Maintenance Support | Nature Nexus",
    description:
      "Discuss an annual maintenance contract for a treatment plant, with coverage shaped around the equipment and site requirements.",
    intro:
      "An Annual Maintenance Contract (AMC) should define the included equipment, service visits, preventive tasks, consumables, exclusions and response process. The appropriate scope depends on plant condition and customer operating arrangements.",
    considerations: [
      "List assets and establish their condition before defining covered maintenance.",
      "Specify visit frequency, deliverables, spare-parts responsibility and emergency-call terms.",
      "Review statutory, safety and OEM requirements where applicable; an AMC description alone does not establish compliance.",
    ],
    questions: [
      "Which systems and assets should the contract cover?",
      "What maintenance history and recurring breakdowns can be shared?",
      "Which tasks, spares and service response expectations should be included?",
    ],
    links: [
      "/services/operation-maintenance/",
      "/services/stp/",
      "/services/etp/",
      "/services/industrial-ro/",
    ],
  },
  "/industries/": {
    title: "Industry Water & Wastewater Solutions | Nature Nexus",
    description:
      "Water and wastewater treatment considerations for textile, food, manufacturing, healthcare, education, buildings and data centres.",
    intro:
      "Industrial and institutional sites have different water sources, process streams, usage patterns and operating constraints. The pages below outline questions to explore—not a substitute for a site assessment or process design.",
    considerations: [
      "Characterize source water and wastewater by stream and operating condition.",
      "Identify reuse goals, discharge requirements, space, utilities and operator capacity.",
      "Confirm applicable standards with the responsible project and compliance professionals.",
    ],
    questions: [
      "Which processes use water and produce wastewater?",
      "How do flows and water quality vary by shift or production cycle?",
      "What site-specific reuse, discharge and residuals requirements apply?",
    ],
    links: [
      "/industries/textile/",
      "/industries/food-manufacturing/",
      "/industries/hospitals/",
      "/industries/manufacturing/",
      "/industries/data-centres/",
      "/industries/schools-apartments/",
    ],
  },
  "/industries/textile/": {
    title: "Textile Industry Effluent Treatment | Nature Nexus",
    description:
      "Textile and dyeing wastewater treatment considerations including stream characterization, variability, reuse and O&M.",
    intro:
      "Textile wet processing can produce wastewater that varies with fibre, dyes, chemicals, recipes and production schedules. Treatment planning should begin with process mapping and representative sampling rather than assuming one standard effluent profile.",
    considerations: [
      "Separate compatible and high-strength process streams where practical and safe.",
      "Color, salinity, pH, temperature, organics and flow variability may affect treatment selection.",
      "Reuse and ZLD options require water-balance, residuals, energy and site-feasibility review.",
    ],
    questions: [
      "Which wet processes and chemical recipes contribute to the wastewater?",
      "Do samples cover different products, batches and production shifts?",
      "What reuse, discharge and concentrate-management objectives apply?",
    ],
    links: [
      "/services/etp/",
      "/services/zld/",
      "/services/operation-maintenance/",
    ],
  },
  "/industries/food-manufacturing/": {
    title: "Food Manufacturing Wastewater Treatment | Nature Nexus",
    description:
      "Food manufacturing water and wastewater planning shaped by product, cleaning cycles, organic loads and site operations.",
    intro:
      "Food manufacturing wastewater can vary with product type, ingredients, washdown, cleaning cycles and production schedules. Effective planning requires understanding production and sanitation practices alongside wastewater measurements.",
    considerations: [
      "Screening, fats/oils, suspended solids, pH and organic-load variation may be relevant depending on the process.",
      "Cleaning-in-place and batch discharges can create flow or concentration peaks.",
      "Food safety, worker safety and applicable discharge or reuse rules must be addressed by the responsible site specialists.",
    ],
    questions: [
      "Which production and cleaning activities generate each stream?",
      "How are high-strength or intermittent discharges managed?",
      "What treated-water reuse options are acceptable for the facility?",
    ],
    links: [
      "/services/etp/",
      "/services/stp/",
      "/services/operation-maintenance/",
    ],
  },
  "/industries/hospitals/": {
    title: "Hospital Water & Sewage Treatment Considerations | Nature Nexus",
    description:
      "Hospital water and sewage treatment considerations with site-specific review of flows, segregation, reuse and maintenance.",
    intro:
      "Healthcare facilities have continuous water needs and wastewater streams shaped by occupancy, services and site operations. A project review should consider source-water quality, sewage flows, applicable rules and the facility's responsibilities for any special streams.",
    considerations: [
      "Occupancy and service patterns affect flow estimates and peak loading.",
      "Wastewater segregation and management of specialized streams should be reviewed with qualified facility and compliance teams.",
      "Reuse choices must be appropriate for the intended application and relevant health and regulatory requirements.",
    ],
    questions: [
      "What are the facility's measured and peak sewage flows?",
      "Are any specialized streams separately identified and managed?",
      "What reuse or discharge route is allowed at this site?",
    ],
    links: [
      "/services/stp/",
      "/services/operation-maintenance/",
      "/services/annual-maintenance-contract/",
    ],
  },
  "/industries/manufacturing/": {
    title: "Manufacturing Water & Effluent Treatment | Nature Nexus",
    description:
      "Manufacturing water and wastewater planning based on production processes, source-water quality and site requirements.",
    intro:
      "Manufacturing sites vary widely in water demand and wastewater composition. Map each production and utility stream first; a general-purpose design cannot be selected responsibly without site data.",
    considerations: [
      "Identify process, cooling, boiler, washdown and domestic streams separately where appropriate.",
      "Analyze normal and upset conditions, flow variation and potential cross-contamination.",
      "Compare treatment and reuse options with maintenance capacity, utilities and applicable requirements.",
    ],
    questions: [
      "Which processes use water and where does it leave the process?",
      "What samples represent each operating condition?",
      "What continuity, reuse and discharge objectives are most important?",
    ],
    links: [
      "/services/industrial-ro/",
      "/services/etp/",
      "/services/zld/",
      "/services/operation-maintenance/",
    ],
  },
  "/industries/data-centres/": {
    title: "Data Centre Water Treatment Considerations | Nature Nexus",
    description:
      "Data centre water-system considerations including source quality, cooling design, reliability and maintenance planning.",
    intro:
      "Data centre water requirements depend on cooling architecture, equipment specifications, climate, source water and site operating strategy. Treatment needs should be developed with the facility and cooling-system designers rather than assumed from the building type alone.",
    considerations: [
      "Confirm whether the facility uses evaporative cooling, closed loops or another cooling approach.",
      "Water chemistry and equipment-maker limits influence pretreatment and monitoring requirements.",
      "Reliability planning should address redundancy, storage, maintenance windows and water-use priorities.",
    ],
    questions: [
      "What cooling technologies and OEM water limits apply?",
      "What are the source-water quality and seasonal variations?",
      "What reliability, redundancy and maintenance windows are required?",
    ],
    links: [
      "/services/industrial-ro/",
      "/services/operation-maintenance/",
      "/services/annual-maintenance-contract/",
    ],
  },
  "/industries/schools-apartments/": {
    title: "School, Apartment & Building Water Treatment | Nature Nexus",
    description:
      "Water and sewage treatment planning for schools, apartments and commercial buildings based on occupancy and site conditions.",
    intro:
      "Schools, apartments and commercial buildings need systems suited to occupancy, usage schedules, source water, available space and maintenance arrangements. Design inputs should reflect actual peak use and site-specific discharge or reuse needs.",
    considerations: [
      "Occupancy, holidays, shift schedules and peak demand affect flow and storage planning.",
      "Site access, footprint, odor control and safe operator access should be considered.",
      "Treated-water reuse needs clear end uses, separation and ongoing monitoring appropriate to the site.",
    ],
    questions: [
      "What is the occupancy and how does it vary through the year?",
      "What space and utility connections are available?",
      "Who is responsible for daily operation and maintenance?",
    ],
    links: [
      "/services/stp/",
      "/services/industrial-ro/",
      "/services/annual-maintenance-contract/",
    ],
  },
  "/about/": {
    title: "About Nature Nexus Environmental Solutions",
    description:
      "Learn about Nature Nexus Environmental Solutions and its focus on water and wastewater treatment services.",
    intro:
      "Nature Nexus Environmental Solutions presents water and wastewater treatment services for industrial, commercial and institutional requirements. The website describes service areas and technical considerations; company credentials, project references and certifications should be added only after they are verified.",
    considerations: [
      "Every project should begin with site conditions and water or wastewater data.",
      "The final scope, schedule and deliverables should be confirmed in a project-specific proposal.",
      "No customer references, performance guarantees or certifications are asserted on this page.",
    ],
    questions: [
      "What challenge is the facility trying to address?",
      "What drawings, flow records or test results are available?",
      "Who should join a technical discussion from the site team?",
    ],
    links: ["/services/", "/industries/", "/contact/"],
  },
  "/contact/": {
    title: "Contact Nature Nexus | Water Treatment Enquiry",
    description:
      "Discuss an industrial or institutional water treatment requirement with Nature Nexus. Share project context to start a conversation.",
    intro:
      "Share your site, industry and treatment requirement through the enquiry form on the homepage. The form currently opens a WhatsApp message for you to review and send; it is not an inbox or CRM submission.",
    considerations: [
      "Do not include sensitive personal or confidential process information in a WhatsApp draft.",
      "Project recommendations require accurate site, flow and water-quality details.",
      "Existing phone and email details displayed on the website need confirmation by the business owner.",
    ],
    questions: [
      "What service or operational issue should the team discuss?",
      "What city or district is the project in?",
      "Can you share non-confidential flow or analysis information?",
    ],
    links: ["/services/", "/industries/", "/about/"],
  },
  "/privacy/": {
    title: "Privacy Information | Nature Nexus",
    description:
      "How the Nature Nexus website enquiry form handles information before you choose to send it through WhatsApp.",
    intro:
      "The website enquiry form prepares a message in WhatsApp for you to review. The website does not submit the form to a company inbox or CRM, and the project does not include website-side enquiry storage.",
    considerations: [
      "If you choose to open WhatsApp, the prefilled draft text is handed off to that service. It is not sent as a message until you choose to send it there.",
      "WhatsApp processes the draft under its own service terms and privacy practices; review those before sharing personal or confidential information.",
      "The website itself does not submit the form to an inbox or CRM, and this project has no website-side enquiry storage.",
    ],
    questions: [
      "Avoid including sensitive personal information or confidential process data in the draft.",
      "You can close WhatsApp without sending the draft.",
      "A private inbox or CRM integration would require a separately configured, secure backend.",
    ],
    links: ["/contact/", "/about/"],
  },
};

const knownPaths = Object.keys(pages);
const baseUrl = "https://nature-nexus-green.vercel.app";

export default function ContentPage({ path }: { path: string }) {
  const page = pages[path];
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    if (!mobileOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [mobileOpen]);
  if (!page) return <NotFound />;
  const links = page.links.map(link => ({
    path: link,
    text: pages[link]?.title.replace(/ \| Nature Nexus$/, "") ?? link,
  }));

  return (
    <main className="min-h-screen bg-[#f6f7f0] text-[#173e38]">
      <header className="relative z-30 border-b border-[#dfe8d9] bg-[#f6f7f0]">
        <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-8">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2.5 sm:gap-3"
            aria-label="Nature Nexus home"
            onClick={() => setMobileOpen(false)}
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d8f36b]">
              <Droplets className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <strong className="block truncate font-display text-base sm:text-lg">
                Nature Nexus
              </strong>
              <small className="block truncate text-[10px] text-[#658078] sm:text-xs">
                Environmental Solutions
              </small>
            </span>
          </Link>
          <nav
            aria-label="Primary navigation"
            className="hidden items-center gap-4 text-[11px] font-bold uppercase tracking-wider text-[#355f57] md:flex xl:gap-7"
          >
            <Link href="/services/">Services</Link>
            <Link href="/industries/">Industries</Link>
            <Link href="/about/">About</Link>
            <Link href="/contact/">Contact</Link>
          </nav>
          <button
            type="button"
            aria-label={
              mobileOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={mobileOpen}
            aria-controls="content-mobile-navigation"
            onClick={() => setMobileOpen(open => !open)}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-[#173e38] transition hover:bg-[#e8efdf] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2d7a68] md:hidden"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        <nav
          id="content-mobile-navigation"
          aria-label="Mobile navigation"
          aria-hidden={!mobileOpen}
          className={`${mobileOpen ? "block" : "hidden"} absolute left-0 right-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-[#dfe8d9] bg-[#f6f7f0] px-4 py-3 shadow-xl md:hidden`}
        >
          <div className="mx-auto flex max-w-6xl flex-col text-xs font-bold uppercase tracking-wider text-[#355f57]">
            <Link
              href="/services/"
              onClick={() => setMobileOpen(false)}
              className="flex min-h-11 items-center border-b border-[#dfe8d9]"
            >
              Services
            </Link>
            <Link
              href="/industries/"
              onClick={() => setMobileOpen(false)}
              className="flex min-h-11 items-center border-b border-[#dfe8d9]"
            >
              Industries
            </Link>
            <Link
              href="/about/"
              onClick={() => setMobileOpen(false)}
              className="flex min-h-11 items-center border-b border-[#dfe8d9]"
            >
              About
            </Link>
            <Link
              href="/contact/"
              onClick={() => setMobileOpen(false)}
              className="flex min-h-11 items-center"
            >
              Contact
            </Link>
            <Link
              href="/#contact"
              onClick={() => setMobileOpen(false)}
              className="mt-3 flex min-h-11 items-center justify-center rounded-full bg-[#173e38] px-5 py-3 text-center text-[#d8f36b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2d7a68]"
            >
              Request a site assessment{" "}
              <ArrowUpRight className="ml-2 h-4 w-4 shrink-0" />
            </Link>
          </div>
        </nav>
      </header>
      <section className="relative overflow-hidden bg-[#123d35] px-5 py-20 text-white sm:px-8 sm:py-28">
        <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full border border-[#b8e86e]/20" />
        <div className="pointer-events-none absolute -right-4 top-0 h-72 w-72 rounded-full border border-[#b8e86e]/15" />
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-[#b8e86e]">
            <Leaf className="h-4 w-4" /> Nature Nexus Environmental Solutions
          </div>
          <h1 className="max-w-4xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
            {page.title.replace(/ \| Nature Nexus$/, "")}
          </h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-white/75 sm:text-lg">
            {page.intro}
          </p>
          <a
            href="/#contact"
            className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#d8f36b] px-6 py-4 text-xs font-extrabold uppercase tracking-wider text-[#173e38] hover:bg-[#e6ff92]"
          >
            Discuss your requirements <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_.9fr]">
        <div>
          <h2 className="font-display text-3xl font-semibold tracking-tight">
            What to consider
          </h2>
          <ul className="mt-7 space-y-5">
            {page.considerations.map(item => (
              <li
                key={item}
                className="flex gap-4 text-sm leading-7 text-[#526f67]"
              >
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#2d7a68]" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-12 rounded-2xl border border-[#dce7d9] bg-white/70 p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold">
              Questions to prepare
            </h2>
            <ul className="mt-5 space-y-3">
              {page.questions.map(question => (
                <li key={question} className="text-sm leading-6 text-[#526f67]">
                  {question}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <aside className="self-start rounded-3xl bg-[#e8efdf] p-7 sm:p-9">
          <div className="text-xs font-extrabold uppercase tracking-[.18em] text-[#2d7a68]">
            Related information
          </div>
          <h2 className="mt-3 font-display text-2xl font-semibold">
            Explore more
          </h2>
          <ul className="mt-5 space-y-3">
            {links.map(item => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className="flex items-center justify-between gap-3 border-b border-[#cbd8c7] py-3 text-sm font-semibold text-[#355f57] hover:text-[#173e38]"
                >
                  {item.text}
                  <ArrowDownRight className="h-4 w-4 shrink-0" />
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href="/contact/"
            className="mt-7 inline-flex rounded-full bg-[#173e38] px-5 py-3 text-xs font-bold uppercase tracking-wider text-white"
          >
            Contact Nature Nexus
          </Link>
        </aside>
      </section>
      <footer className="bg-[#123d35] px-5 py-8 text-center text-xs text-white/60">
        <Link href="/" className="font-semibold text-white">
          Nature Nexus Environmental Solutions
        </Link>
        <span className="mx-3">·</span>
        <Link href="/services/">Services</Link>
        <span className="mx-3">·</span>
        <Link href="/industries/">Industries</Link>
        <span className="mx-3">·</span>
        <Link href="/contact/">Contact</Link>
      </footer>
    </main>
  );
}

export function getSeoRoutes() {
  return knownPaths.map(path => ({ path, title: pages[path].title }));
}
export { pages as seoPages, baseUrl as seoBaseUrl };
