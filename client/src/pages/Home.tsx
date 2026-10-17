import { FormEvent, useEffect, useState } from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Building2,
  Check,
  ChevronRight,
  Droplets,
  Factory,
  GraduationCap,
  Gauge,
  HeartPulse,
  Hotel,
  Leaf,
  Mail,
  MapPin,
  Menu,
  PhoneCall,
  Recycle,
  ShieldCheck,
  Sparkles,
  Wrench,
  X,
} from "lucide-react";

type EnquiryValues = {
  name: string;
  company: string;
  industry: string;
  location: string;
  capacity: string;
  contact: string;
  service: string;
  details: string;
};

type EnquiryErrors = Partial<Record<keyof EnquiryValues, string>>;

function validateEnquiry(values: EnquiryValues): EnquiryErrors {
  const errors: EnquiryErrors = {};
  const name = values.name.trim();
  const contact = values.contact.trim();
  const phoneDigits = contact.replace(/\D/g, "");

  if (!name) errors.name = "Please enter your name.";
  else if (name.length < 2) errors.name = "Name must be at least 2 characters.";
  else if (name.length > 80)
    errors.name = "Name must be 80 characters or fewer.";
  else if (
    !new RegExp("^[\\p{L}\\p{M}][\\p{L}\\p{M}\\s.'’-]*$", "u").test(name)
  ) {
    errors.name = "Use letters, spaces, apostrophes, periods, or hyphens only.";
  }

  if (values.company.trim().length > 120)
    errors.company = "Company name must be 120 characters or fewer.";
  if (values.location.trim().length > 100)
    errors.location = "City or district must be 100 characters or fewer.";
  if (values.capacity.trim().length > 200)
    errors.capacity =
      "Capacity or requirement must be 200 characters or fewer.";
  if (values.details.trim().length > 1000)
    errors.details = "Project details must be 1,000 characters or fewer.";

  if (!contact) errors.contact = "Enter a phone number or email address.";
  else if (contact.includes("@")) {
    if (contact.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact))
      errors.contact = "Enter a valid email address (up to 254 characters).";
  } else if (!/^\+?[0-9\s().-]+$/.test(contact)) {
    errors.contact = "Use a valid phone number or email address.";
  } else if (phoneDigits.length < 7 || phoneDigits.length > 15) {
    errors.contact = "Phone numbers must contain 7–15 digits.";
  }

  if (!values.service) errors.service = "Choose the service you need.";
  else if (
    ![
      "Industrial RO",
      "STP",
      "ETP",
      "ZLD",
      "Installation / commissioning",
      "O&M / AMC",
      "Other",
    ].includes(values.service)
  ) {
    errors.service = "Choose one of the listed services.";
  }
  if (
    values.industry &&
    ![
      "Textile and dyeing",
      "Food manufacturing",
      "General manufacturing",
      "Healthcare",
      "Education",
      "Apartments / commercial buildings",
      "Data centre",
      "Other",
    ].includes(values.industry)
  )
    errors.industry = "Choose an industry from the list.";

  return errors;
}

const services = [
  {
    number: "01",
    title: "Reverse Osmosis",
    eyebrow: "RO PLANTS",
    description:
      "Reliable purification systems for producing high-quality treated water across commercial and industrial applications.",
    icon: Droplets,
    href: "/services/industrial-ro/",
    tone: "blue",
    items: [
      "Plant design & engineering",
      "Supply, installation & commissioning",
      "Pretreatment & membrane solutions",
      "RO operation & maintenance",
    ],
  },
  {
    number: "02",
    title: "Sewage Treatment",
    eyebrow: "STP",
    description:
      "Efficient treatment solutions for domestic sewage, responsible discharge, and water reuse.",
    icon: Recycle,
    href: "/services/stp/",
    tone: "green",
    items: [
      "Apartment & commercial STP systems",
      "Process optimization",
      "Water reuse solutions",
      "STP operation & maintenance",
    ],
  },
  {
    number: "03",
    title: "Effluent Treatment",
    eyebrow: "ETP",
    description:
      "Customized industrial wastewater treatment engineered for safe, efficient plant operations.",
    icon: Factory,
    href: "/services/etp/",
    tone: "amber",
    items: [
      "Industrial wastewater treatment",
      "Process engineering",
      "Installation & commissioning",
      "Performance improvement",
    ],
  },
  {
    number: "04",
    title: "Zero Liquid Discharge",
    eyebrow: "ZLD",
    description:
      "Site-specific feasibility and process considerations for reducing liquid discharge from industrial operations.",
    icon: Droplets,
    href: "/services/zld/",
    tone: "blue",
    items: [
      "Water balance and stream review",
      "Concentrate and residuals planning",
      "Utilities and energy considerations",
      "Feasibility based on site data",
    ],
  },
  {
    number: "05",
    title: "Operation & Maintenance",
    eyebrow: "O&M",
    description:
      "Professional operational support that keeps your treatment plant running at peak efficiency.",
    icon: Wrench,
    href: "/services/operation-maintenance/",
    tone: "slate",
    items: [
      "Daily plant operation",
      "Preventive maintenance",
      "AMC scope planning",
      "Monitoring & troubleshooting",
    ],
  },
];

const industries = [
  { label: "Textile and dyeing", icon: Factory, href: "/industries/textile/" },
  {
    label: "Food manufacturing",
    icon: Factory,
    href: "/industries/food-manufacturing/",
  },
  {
    label: "General manufacturing",
    icon: Factory,
    href: "/industries/manufacturing/",
  },
  {
    label: "Hospitals and healthcare",
    icon: HeartPulse,
    href: "/industries/hospitals/",
  },
  {
    label: "Schools and apartments",
    icon: GraduationCap,
    href: "/industries/schools-apartments/",
  },
  { label: "Data centres", icon: Gauge, href: "/industries/data-centres/" },
];

function LogoMark() {
  return (
    <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#d8f36b] text-[#123d35] shadow-[0_0_0_5px_rgba(216,243,107,0.12)]">
      <Droplets className="h-5 w-5" strokeWidth={2.4} />
      <span className="absolute -right-0.5 -top-1 h-2 w-2 rounded-full bg-[#82d9ee]" />
    </span>
  );
}

function SectionLabel({
  children,
  dark = false,
}: {
  children: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] ${dark ? "text-[#b8e86e]" : "text-[#2d7a68]"}`}
    >
      <span className={`h-px w-8 ${dark ? "bg-[#b8e86e]" : "bg-[#2d7a68]"}`} />
      {children}
    </div>
  );
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeService, setActiveService] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<EnquiryErrors>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const refreshAllErrors = (form: HTMLFormElement | null) => {
    if (!form || !hasSubmitted) return;
    const formData = new FormData(form);
    setFieldErrors(
      validateEnquiry({
        name: String(formData.get("name") || ""),
        company: String(formData.get("company") || ""),
        industry: String(formData.get("industry") || ""),
        location: String(formData.get("location") || ""),
        capacity: String(formData.get("capacity") || ""),
        contact: String(formData.get("contact") || ""),
        service: String(formData.get("service") || ""),
        details: String(formData.get("details") || ""),
      })
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setHasSubmitted(true);
    const formData = new FormData(form);
    const values: EnquiryValues = {
      name: String(formData.get("name") || "").trim(),
      company: String(formData.get("company") || "").trim(),
      industry: String(formData.get("industry") || "").trim(),
      location: String(formData.get("location") || "").trim(),
      capacity: String(formData.get("capacity") || "").trim(),
      contact: String(formData.get("contact") || "").trim(),
      service: String(formData.get("service") || "").trim(),
      details: String(formData.get("details") || "").trim(),
    };
    const errors = validateEnquiry(values);
    setFieldErrors(errors);

    const firstInvalidField = (
      Object.keys(errors) as (keyof EnquiryValues)[]
    )[0];
    if (firstInvalidField) {
      form.querySelector<HTMLElement>(`[name="${firstInvalidField}"]`)?.focus();
      return;
    }

    const message = [
      "Hello Nature Nexus, I would like to discuss a water treatment project.",
      `Name: ${values.name}`,
      `Company: ${values.company || "Not provided"}`,
      `Industry: ${values.industry || "Not provided"}`,
      `City / district: ${values.location || "Not provided"}`,
      `Capacity / requirement: ${values.capacity || "Not provided"}`,
      `Contact: ${values.contact}`,
      `Service required: ${values.service}`,
      `Project details: ${values.details || "Not provided"}`,
    ].join("\n");

    const whatsappUrl = `https://api.whatsapp.com/send?phone=918248772800&text=${encodeURIComponent(message)}`;
    const whatsappWindow = window.open(
      whatsappUrl,
      "_blank",
      "noopener,noreferrer"
    );
    if (!whatsappWindow) window.location.assign(whatsappUrl);
  };

  const closeMenu = () => setMobileOpen(false);

  return (
    <div className="min-h-screen overflow-hidden bg-[#f6f7f0] text-[#173e38]">
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${scrolled ? "border-b border-[#dfe8d9]/80 bg-[#f6f7f0]/95 shadow-[0_8px_30px_rgba(24,68,59,0.08)] backdrop-blur-xl" : "bg-transparent"}`}
      >
        <div className="mx-auto flex h-[78px] max-w-[1280px] items-center justify-between px-5 sm:px-8 lg:px-12">
          <a
            href="#top"
            className="group flex items-center gap-3"
            onClick={closeMenu}
          >
            <LogoMark />
            <div
              className={`leading-none transition-colors ${scrolled ? "text-[#173e38]" : "text-white"}`}
            >
              <div className="font-display text-[18px] font-bold tracking-[-0.03em]">
                Nature Nexus
              </div>
              <div
                className={`mt-1 text-[8px] font-semibold uppercase tracking-[0.24em] ${scrolled ? "text-[#558077]" : "text-white/60"}`}
              >
                Water / Wastewater
              </div>
            </div>
          </a>

          <nav
            className={`hidden items-center gap-8 text-[11px] font-bold uppercase tracking-[0.16em] lg:flex ${scrolled ? "text-[#355f57]" : "text-white/85"}`}
          >
            <a className="nav-link" href="#about">
              About
            </a>
            <a className="nav-link" href="#services">
              Expertise
            </a>
            <a className="nav-link" href="#process">
              Process
            </a>
            <a className="nav-link" href="#industries">
              Industries
            </a>
          </nav>

          <a
            href="#contact"
            className="hidden items-center gap-2 rounded-full bg-[#d8f36b] px-5 py-3 text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#173e38] transition hover:-translate-y-0.5 hover:bg-[#e6ff92] lg:flex"
          >
            Start a conversation <ArrowUpRight className="h-4 w-4" />
          </a>
          <button
            aria-label="Toggle menu"
            className={`rounded-full p-2 lg:hidden ${scrolled ? "text-[#173e38]" : "text-white"}`}
            onClick={() => setMobileOpen(value => !value)}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
        {mobileOpen && (
          <div className="border-t border-[#dfe8d9] bg-[#f6f7f0] px-5 py-5 shadow-xl lg:hidden">
            <div className="flex flex-col gap-5 text-[12px] font-bold uppercase tracking-[0.16em] text-[#355f57]">
              <a href="#about" onClick={closeMenu}>
                About
              </a>
              <a href="#services" onClick={closeMenu}>
                Expertise
              </a>
              <a href="#process" onClick={closeMenu}>
                Process
              </a>
              <a href="#industries" onClick={closeMenu}>
                Industries
              </a>
              <a
                href="#contact"
                onClick={closeMenu}
                className="w-fit rounded-full bg-[#173e38] px-5 py-3 text-[#d8f36b]"
              >
                Start a conversation{" "}
                <ArrowUpRight className="ml-1 inline h-4 w-4" />
              </a>
            </div>
          </div>
        )}
      </header>

      <main id="top">
        <section className="relative min-h-[720px] overflow-hidden bg-[#123d35] pt-[78px] lg:min-h-[820px]">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#123d35_0%,rgba(18,61,53,0.94)_24%,rgba(18,61,53,0.5)_58%,rgba(18,61,53,0.35)_100%)]" />
            <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.28)_0.7px,transparent_0.7px)] [background-size:14px_14px]" />
          </div>
          <div className="pointer-events-none absolute -right-24 top-28 h-72 w-72 rounded-full border border-[#b8e86e]/20 lg:h-[500px] lg:w-[500px]" />
          <div className="pointer-events-none absolute -right-8 top-48 h-48 w-48 rounded-full border border-[#b8e86e]/15 lg:h-[340px] lg:w-[340px]" />

          <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 gap-12 px-5 pb-20 pt-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-12 lg:pb-28 lg:pt-28">
            <div className="max-w-[720px] self-center">
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm animate-rise">
                <Sparkles className="h-3.5 w-3.5 text-[#d8f36b]" /> Water,
                engineered better
              </div>
              <h1 className="max-w-[780px] font-display text-[clamp(3.1rem,6.5vw,6rem)] font-semibold leading-[0.95] tracking-[-0.065em] text-white animate-rise [animation-delay:80ms]">
                Industrial water &amp; wastewater treatment across Tamil Nadu.
              </h1>
              <p className="mt-8 max-w-[550px] text-[17px] leading-8 text-white/72 animate-rise [animation-delay:150ms] sm:text-[19px]">
                Explore industrial RO, STP, ETP and ZLD solutions, plus
                installation, commissioning and ongoing plant support. Final
                requirements depend on site conditions and water-quality data.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row animate-rise [animation-delay:220ms]">
                <a
                  href="#contact"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#d8f36b] px-6 py-4 text-[12px] font-extrabold uppercase tracking-[0.14em] text-[#173e38] transition hover:-translate-y-1 hover:bg-[#e6ff92]"
                >
                  Request a site assessment{" "}
                  <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-4 text-[12px] font-extrabold uppercase tracking-[0.14em] text-white transition hover:border-white/60 hover:bg-white/10"
                >
                  Explore expertise <ChevronRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="relative hidden min-h-[500px] items-end justify-end lg:flex">
              <div className="absolute right-2 top-9 w-[295px] rounded-2xl border border-white/20 bg-[#e8f3dd]/12 p-6 text-white backdrop-blur-xl">
                <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#d8f36b]">
                  Start with the site
                </div>
                <div className="mt-5 font-display text-3xl font-semibold tracking-[-0.04em]">
                  Data before design
                </div>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  Water analysis, flow patterns and operating needs inform
                  system selection.
                </p>
              </div>
              <div className="absolute bottom-14 left-0 flex w-[245px] items-center gap-4 rounded-2xl border border-white/15 bg-[#0d302a]/70 p-5 text-white backdrop-blur-xl">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#82d9ee]/15 text-[#82d9ee]">
                  <Gauge className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold">
                    Built around your flow
                  </div>
                  <div className="mt-1 text-[11px] leading-4 text-white/55">
                    The right process for your water.
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 right-12 text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">
                RO <span className="mx-2 text-[#d8f36b]">•</span> STP{" "}
                <span className="mx-2 text-[#d8f36b]">•</span> ETP{" "}
                <span className="mx-2 text-[#d8f36b]">•</span> O&amp;M
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between border-t border-white/15 px-5 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/45 sm:px-8 lg:px-12">
            <span>Nature Nexus / 01</span>
            <span className="hidden sm:block">
              Water &amp; wastewater treatment solutions
            </span>
            <span className="flex items-center gap-2 text-[#d8f36b]">
              <ArrowDownRight className="h-4 w-4" /> Scroll to explore
            </span>
          </div>
        </section>

        <section className="border-b border-[#dae5d4] bg-[#edf3e8]">
          <div className="mx-auto grid max-w-[1280px] grid-cols-2 divide-x divide-[#d5e1d1] px-5 sm:px-8 lg:grid-cols-4 lg:px-12">
            {[
              ["01", "Complete project execution"],
              ["02", "Built for operational efficiency"],
              ["03", "Long-term O&M support"],
              ["04", "Sustainable water management"],
            ].map(([number, label]) => (
              <div
                key={number}
                className="flex items-center gap-3 px-3 py-6 first:pl-0 last:pr-0 sm:gap-4 sm:px-6 lg:py-7"
              >
                <span className="font-display text-sm font-semibold text-[#2d7a68]">
                  {number}
                </span>
                <span className="text-[10px] font-bold uppercase leading-4 tracking-[0.11em] text-[#52766d]">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section
          id="about"
          className="bg-[#f6f7f0] px-5 py-24 sm:px-8 lg:px-12 lg:py-36"
        >
          <div className="mx-auto grid max-w-[1280px] items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
            <div className="relative max-w-[550px]">
              <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-[#d8f36b]/35 blur-3xl" />
              <div className="relative overflow-hidden rounded-[28px] bg-[#dfeee1] p-4 sm:p-6">
                <div
                  role="img"
                  aria-label="Abstract illustration of water treatment layers"
                  className="relative aspect-[0.9] overflow-hidden rounded-[20px] bg-[linear-gradient(155deg,#174d42_0%,#2d7a68_48%,#82d9ee_100%)]"
                >
                  <div className="absolute -left-10 top-1/4 h-72 w-72 rounded-full border border-white/30" />
                  <div className="absolute left-8 top-1/3 h-56 w-56 rounded-full border border-white/25" />
                  <div className="absolute inset-x-0 bottom-0 h-2/5 bg-[#d8f36b]/30" />
                </div>
                <div className="absolute bottom-10 left-10 rounded-2xl bg-[#173e38] p-5 text-white shadow-2xl">
                  <div className="font-display text-xl font-semibold tracking-[-0.03em]">
                    Assess · Design · Maintain
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-[#b8e86e]">
                    Project lifecycle
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-9 -right-4 hidden h-24 w-24 items-center justify-center rounded-full border border-[#b6d1c4] bg-[#f6f7f0] text-center text-[10px] font-bold uppercase leading-4 tracking-[0.14em] text-[#2d7a68] sm:flex">
                Designed
                <br />
                to last
              </div>
            </div>
            <div>
              <SectionLabel>About Nature Nexus</SectionLabel>
              <h2 className="max-w-[650px] font-display text-[clamp(2.65rem,5vw,5rem)] font-semibold leading-[0.98] tracking-[-0.06em] text-[#173e38]">
                Engineering water solutions{" "}
                <em className="font-serif font-normal text-[#2d7a68]">
                  that last.
                </em>
              </h2>
              <p className="mt-8 max-w-[570px] text-[17px] leading-8 text-[#5b7770]">
                Nature Nexus provides complete water and wastewater treatment
                solutions—from planning and installation to long-term operation
                and maintenance.
              </p>
              <p className="mt-5 max-w-[570px] text-[17px] leading-8 text-[#5b7770]">
                Treatment selection depends on measured water quality, flow,
                intended use, site conditions and applicable requirements. A
                project-specific assessment is needed before final design.
              </p>
              <div className="mt-10 grid max-w-[600px] grid-cols-2 gap-y-4 border-t border-[#d6e2d4] pt-6 text-[11px] font-bold uppercase tracking-[0.14em] text-[#355f57] sm:grid-cols-3">
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#2d7a68]" /> Assess
                </span>
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#2d7a68]" /> Design
                </span>
                <span className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-[#2d7a68]" /> Maintain
                </span>
              </div>
            </div>
          </div>
        </section>

        <section
          id="services"
          className="bg-[#173e38] px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-32"
        >
          <div className="mx-auto max-w-[1280px]">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div>
                <SectionLabel dark>Our expertise</SectionLabel>
                <h2 className="max-w-[670px] font-display text-[clamp(2.8rem,5vw,5.4rem)] font-semibold leading-[0.95] tracking-[-0.06em]">
                  The full water
                  <br />
                  <em className="font-serif font-normal text-[#b8e86e]">
                    treatment picture.
                  </em>
                </h2>
              </div>
              <p className="max-w-[350px] text-[16px] leading-7 text-white/60 lg:pb-2">
                From first assessment to reliable day-to-day performance, we
                make complex treatment systems feel clear and manageable.
              </p>
            </div>
            <div className="mt-16 grid gap-4 md:grid-cols-2">
              {services.map(service => {
                const Icon = service.icon;
                const expanded = activeService === service.number;
                return (
                  <article
                    key={service.number}
                    className={`group relative overflow-hidden rounded-[24px] border p-7 transition duration-300 sm:p-9 ${expanded ? "border-[#b8e86e]/70 bg-[#28584e]" : "border-white/12 bg-white/[0.045] hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.08]"}`}
                  >
                    <div className="flex items-start justify-between">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${service.tone === "blue" ? "bg-[#82d9ee]/15 text-[#82d9ee]" : service.tone === "green" ? "bg-[#b8e86e]/15 text-[#b8e86e]" : service.tone === "amber" ? "bg-[#e8bf79]/15 text-[#e8bf79]" : "bg-white/10 text-white/80"}`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="font-display text-sm text-white/35">
                        {service.number}
                      </span>
                    </div>
                    <div className="mt-10 text-[10px] font-bold uppercase tracking-[0.2em] text-[#b8e86e]">
                      {service.eyebrow}
                    </div>
                    <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-0.05em] sm:text-4xl">
                      {service.title}
                    </h3>
                    <p className="mt-4 max-w-[460px] text-[15px] leading-7 text-white/60">
                      {service.description}
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveService(expanded ? null : service.number)
                      }
                      className="mt-7 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.15em] text-white transition hover:text-[#d8f36b]"
                    >
                      {expanded ? "Hide scope" : "View scope"}
                      <ChevronRight
                        className={`h-4 w-4 transition-transform ${expanded ? "rotate-90" : "group-hover:translate-x-1"}`}
                      />
                    </button>
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ${expanded ? "mt-6 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                    >
                      <div className="overflow-hidden">
                        <ul className="space-y-3 border-t border-white/15 pt-5 text-[13px] text-white/70">
                          {service.items.map(item => (
                            <li key={item} className="flex items-center gap-2">
                              <Check className="h-3.5 w-3.5 text-[#b8e86e]" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <a
                      href={service.href}
                      className="mt-5 inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#b8e86e] hover:text-white"
                    >
                      Service details
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                    <div className="pointer-events-none absolute -bottom-12 -right-12 h-36 w-36 rounded-full border border-white/10 transition duration-500 group-hover:scale-125" />
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="process"
          className="bg-[#dfeee1] px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
        >
          <div className="mx-auto grid max-w-[1280px] gap-16 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
            <div>
              <SectionLabel>Our process</SectionLabel>
              <h2 className="max-w-[480px] font-display text-[clamp(2.8rem,5vw,5rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-[#173e38]">
                Clarity at every{" "}
                <em className="font-serif font-normal text-[#2d7a68]">
                  stage.
                </em>
              </h2>
              <p className="mt-7 max-w-[390px] text-[16px] leading-7 text-[#5b7770]">
                Good water treatment starts with the right questions. Our
                process keeps the work transparent, practical, and built around
                your operation.
              </p>
              <div className="mt-10 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#2d7a68]">
                <ShieldCheck className="h-5 w-5" /> Reliable by design
              </div>
            </div>
            <div className="divide-y divide-[#bfd6c5] border-y border-[#bfd6c5]">
              {[
                [
                  "01",
                  "Assess",
                  "We understand your water source, wastewater characteristics, and project requirements.",
                ],
                [
                  "02",
                  "Design",
                  "The right treatment process is engineered for your application and operating reality.",
                ],
                [
                  "03",
                  "Install",
                  "Professional installation and commissioning ensure reliable performance from day one.",
                ],
                [
                  "04",
                  "Maintain",
                  "Continuous O&M support keeps your plant operating efficiently over the long term.",
                ],
              ].map(([number, title, copy]) => (
                <div
                  key={number}
                  className="group grid grid-cols-[52px_1fr] gap-5 py-7 sm:grid-cols-[72px_0.55fr_1fr] sm:items-center sm:gap-7"
                >
                  <span className="font-display text-lg font-semibold text-[#2d7a68]">
                    {number}
                  </span>
                  <h3 className="font-display text-2xl font-semibold tracking-[-0.04em] text-[#173e38]">
                    {title}
                  </h3>
                  <p className="col-start-2 text-[14px] leading-6 text-[#5b7770] sm:col-start-auto">
                    {copy}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="industries"
          className="bg-[#f6f7f0] px-5 py-24 sm:px-8 lg:px-12 lg:py-32"
        >
          <div className="mx-auto grid max-w-[1280px] items-start gap-14 lg:grid-cols-[0.65fr_1.35fr] lg:gap-24">
            <div>
              <SectionLabel>Industries we serve</SectionLabel>
              <h2 className="max-w-[450px] font-display text-[clamp(2.7rem,5vw,4.8rem)] font-semibold leading-[0.97] tracking-[-0.06em] text-[#173e38]">
                Made for the real{" "}
                <em className="font-serif font-normal text-[#2d7a68]">
                  world.
                </em>
              </h2>
              <p className="mt-7 max-w-[360px] text-[16px] leading-7 text-[#5b7770]">
                Different environments. Different demands. One dependable
                approach to water.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {industries.map(({ label, icon: Icon, href }, index) => (
                <a
                  href={href}
                  key={label}
                  className="group flex items-center justify-between rounded-2xl border border-[#dce7d9] bg-white/55 p-5 transition hover:-translate-y-1 hover:border-[#a9c9ba] hover:bg-white"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e7f2e4] text-[#2d7a68]">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="text-[13px] font-bold uppercase tracking-[0.08em] text-[#355f57]">
                      {label}
                    </span>
                  </div>
                  <span className="font-display text-xs text-[#9bb7a9]">
                    0{index + 1}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section
          id="faq"
          className="bg-[#edf3e8] px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
        >
          <div className="mx-auto max-w-[1280px]">
            <SectionLabel>Frequently asked questions</SectionLabel>
            <h2 className="max-w-2xl font-display text-4xl font-semibold tracking-tight text-[#173e38] sm:text-5xl">
              A good project starts with the right information.
            </h2>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {[
                [
                  "How is a treatment system selected?",
                  "Selection depends on representative source-water or wastewater data, flow, intended use, site conditions and applicable requirements. Final recommendations need a project-specific review.",
                ],
                [
                  "Can treated water be reused?",
                  "Reuse may be considered for suitable applications after quality targets, process needs and relevant site requirements are established. No reuse suitability can be determined from a generic web enquiry alone.",
                ],
                [
                  "What information helps start a quotation?",
                  "Share the service needed, approximate flow or capacity, location, process context and any recent non-confidential water-analysis results. Detailed scope follows technical review.",
                ],
              ].map(([question, answer]) => (
                <article
                  key={question}
                  className="border-t border-[#bfd6c5] pt-5"
                >
                  <h3 className="font-display text-xl font-semibold text-[#173e38]">
                    {question}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#5b7770]">
                    {answer}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="relative overflow-hidden bg-[#b8e86e] px-5 py-24 sm:px-8 lg:px-12 lg:py-28"
        >
          <div className="absolute -right-24 -top-32 h-[440px] w-[440px] rounded-full border border-[#173e38]/10" />
          <div className="absolute -right-6 -top-14 h-[280px] w-[280px] rounded-full border border-[#173e38]/10" />
          <div className="relative mx-auto grid max-w-[1280px] gap-16 lg:grid-cols-[1fr_0.72fr] lg:items-end lg:gap-24">
            <div>
              <div className="mb-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#34644e]">
                <span className="h-px w-8 bg-[#34644e]" /> Let&apos;s work
                together
              </div>
              <h2 className="max-w-[700px] font-display text-[clamp(3rem,6vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.07em] text-[#173e38]">
                Let&apos;s build a better{" "}
                <em className="font-serif font-normal">water solution.</em>
              </h2>
              <p className="mt-8 max-w-[560px] text-[17px] leading-8 text-[#34644e]">
                Whether you need a new RO, STP, ETP, or professional O&amp;M
                support, Nature Nexus is ready to deliver a solution tailored to
                your project.
              </p>
              <div className="mt-9 flex flex-wrap gap-6 text-[12px] font-bold uppercase tracking-[0.12em] text-[#173e38]">
                <a
                  className="flex items-center gap-2 transition hover:text-white"
                  href="mailto:hello@naturenexus.in"
                >
                  <Mail className="h-4 w-4" /> hello@naturenexus.in
                </a>
                <a
                  className="flex items-center gap-2 transition hover:text-white"
                  href="tel:+919876543210"
                >
                  <PhoneCall className="h-4 w-4" /> +91 98765 43210
                </a>
              </div>
            </div>
            <form
              noValidate
              onSubmit={handleSubmit}
              onChange={event => refreshAllErrors(event.currentTarget)}
              className="rounded-[24px] bg-[#173e38] p-6 text-white shadow-2xl sm:p-8"
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#b8e86e]">
                    Start a conversation
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-semibold tracking-[-0.04em]">
                    Tell us about your project.
                  </h3>
                </div>
                <ArrowUpRight className="h-6 w-6 text-[#b8e86e]" />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  required
                  name="name"
                  minLength={2}
                  maxLength={80}
                  autoComplete="name"
                  placeholder="Name *"
                  aria-label="Name"
                  className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/50 focus:border-[#b8e86e]"
                />
                <input
                  name="company"
                  maxLength={120}
                  autoComplete="organization"
                  placeholder="Company (optional)"
                  aria-label="Company"
                  className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/50 focus:border-[#b8e86e]"
                />
                <select
                  name="industry"
                  defaultValue=""
                  aria-label="Industry"
                  className="w-full rounded-xl border border-white/15 bg-[#214a41] px-4 py-3.5 text-sm text-white/80 outline-none focus:border-[#b8e86e]"
                >
                  <option value="">Industry (optional)</option>
                  <option>Textile and dyeing</option>
                  <option>Food manufacturing</option>
                  <option>General manufacturing</option>
                  <option>Healthcare</option>
                  <option>Education</option>
                  <option>Apartments / commercial buildings</option>
                  <option>Data centre</option>
                  <option>Other</option>
                </select>
                <input
                  name="location"
                  maxLength={100}
                  autoComplete="address-level2"
                  placeholder="City or district (optional)"
                  aria-label="City or district"
                  className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/50 focus:border-[#b8e86e]"
                />
                <input
                  name="capacity"
                  maxLength={200}
                  placeholder="Approx. capacity / requirement (optional)"
                  aria-label="Approximate plant capacity or project requirement"
                  className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/50 focus:border-[#b8e86e] sm:col-span-2"
                />
                <input
                  required
                  name="contact"
                  maxLength={254}
                  autoComplete="email"
                  placeholder="Phone or email *"
                  aria-label="Phone number or email"
                  className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/50 focus:border-[#b8e86e] sm:col-span-2"
                />
                <select
                  required
                  name="service"
                  defaultValue=""
                  aria-label="Required service"
                  className="w-full rounded-xl border border-white/15 bg-[#214a41] px-4 py-3.5 text-sm text-white/80 outline-none focus:border-[#b8e86e] sm:col-span-2"
                >
                  <option value="" disabled>
                    Required service *
                  </option>
                  <option>Industrial RO</option>
                  <option>STP</option>
                  <option>ETP</option>
                  <option>ZLD</option>
                  <option>Installation / commissioning</option>
                  <option>O&amp;M / AMC</option>
                  <option>Other</option>
                </select>
                <textarea
                  name="details"
                  maxLength={1000}
                  rows={3}
                  placeholder="Project details (optional, max 1,000 characters)"
                  aria-label="Optional project details"
                  className="w-full resize-y rounded-xl border border-white/15 bg-white/10 px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/50 focus:border-[#b8e86e] sm:col-span-2"
                />
              </div>
              {Object.keys(fieldErrors).length > 0 && (
                <div
                  role="alert"
                  aria-live="polite"
                  className="mt-4 rounded-xl border border-[#ffd0c7]/40 bg-[#ffd0c7]/10 p-3 text-xs leading-5 text-[#ffd0c7]"
                >
                  <p className="font-bold">Please check the following:</p>
                  <ul className="mt-1 list-inside list-disc">
                    {Object.values(fieldErrors)
                      .filter(Boolean)
                      .map(error => (
                        <li key={error}>{error}</li>
                      ))}
                  </ul>
                </div>
              )}
              <button
                type="submit"
                className="mt-5 flex w-full items-center justify-between rounded-xl bg-[#d8f36b] px-4 py-4 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#173e38] transition hover:bg-[#e6ff92]"
              >
                <span>Review enquiry in WhatsApp</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <p className="mt-4 text-xs leading-5 text-white/55">
                This opens WhatsApp with a draft for you to review and send.
                This website does not send the enquiry to an inbox or CRM. Avoid
                including confidential information. See our{" "}
                <a
                  href="/privacy/"
                  className="underline underline-offset-2 hover:text-white"
                >
                  privacy information
                </a>
                .
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="bg-[#0d302a] px-5 py-10 text-white sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <LogoMark />
            <div>
              <div className="font-display text-base font-bold">
                Nature Nexus
              </div>
              <div className="mt-1 text-[9px] uppercase tracking-[0.18em] text-white/40">
                Water &amp; wastewater treatment
              </div>
            </div>
          </div>
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/55"
          >
            <a href="/services/" className="transition hover:text-[#d8f36b]">
              Services
            </a>
            <a href="/industries/" className="transition hover:text-[#d8f36b]">
              Industries
            </a>
            <a href="/about/" className="transition hover:text-[#d8f36b]">
              About
            </a>
            <a href="/contact/" className="transition hover:text-[#d8f36b]">
              Contact
            </a>
            <a href="/privacy/" className="transition hover:text-[#d8f36b]">
              Privacy
            </a>
          </nav>
          <div className="text-[10px] uppercase tracking-[0.14em] text-white/30">
            © {new Date().getFullYear()} Nature Nexus
          </div>
        </div>
      </footer>
    </div>
  );
}
