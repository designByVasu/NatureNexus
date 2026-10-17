import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import ContentPage, { seoBaseUrl, seoPages } from "./pages/ContentPage";
import Home from "./pages/Home";

const homeMeta = {
  title: "Nature Nexus Environmental Solutions | Water Treatment Tamil Nadu",
  description:
    "Industrial RO, STP, ETP and ZLD solutions, installation, commissioning and operation & maintenance for industries and institutions across Tamil Nadu. Contact Nature Nexus to discuss a site assessment.",
};

function MetaManager() {
  const [location] = useLocation();
  const normalizedPath = location.endsWith("/") ? location : `${location}/`;
  const page = normalizedPath === "/" ? homeMeta : seoPages[normalizedPath];
  useEffect(() => {
    const setMeta = (key: string, value: string, property = false) => {
      const attribute = property ? "property" : "name";
      let tag = document.head.querySelector<HTMLMetaElement>(
        `meta[${attribute}="${key}"]`
      );
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attribute, key);
        document.head.appendChild(tag);
      }
      tag.content = value;
    };
    if (!page) {
      document.title = "Page not found | Nature Nexus";
      setMeta("robots", "noindex,follow");
      document.head.querySelector('link[rel="canonical"]')?.remove();
      return;
    }
    const canonical = `${seoBaseUrl}${normalizedPath}`;
    document.title = page.title;
    document.head.querySelector('meta[name="robots"]')?.remove();
    setMeta("description", page.description);
    setMeta("og:title", page.title, true);
    setMeta("og:description", page.description, true);
    setMeta("og:type", "website", true);
    setMeta("og:url", canonical, true);
    setMeta("twitter:card", "summary");
    setMeta("twitter:title", page.title);
    setMeta("twitter:description", page.description);
    let link = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonical;
  }, [normalizedPath, page]);
  return null;
}

function Router() {
  return (
    <>
      <MetaManager />
      <Switch>
        <Route path="/" component={Home} />
        <Route
          path="/services/"
          component={() => <ContentPage path="/services/" />}
        />
        <Route
          path="/services/:slug/"
          component={({ params }) => (
            <ContentPage path={`/services/${params.slug}/`} />
          )}
        />
        <Route
          path="/industries/"
          component={() => <ContentPage path="/industries/" />}
        />
        <Route
          path="/industries/:slug/"
          component={({ params }) => (
            <ContentPage path={`/industries/${params.slug}/`} />
          )}
        />
        <Route
          path="/about/"
          component={() => <ContentPage path="/about/" />}
        />
        <Route
          path="/contact/"
          component={() => <ContentPage path="/contact/" />}
        />
        <Route
          path="/privacy/"
          component={() => <ContentPage path="/privacy/" />}
        />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster position="top-center" />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
