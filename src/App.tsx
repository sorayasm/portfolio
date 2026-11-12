import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import {
  Button,
  Footer,
  Hero,
  LanguageSwitch,
  NavBar,
  SkipLink,
  editorialTheme,
} from "@sorayasm/vietri-ds";
import { site } from "./data/site";
import { LanguageProvider, useLanguage, type Language } from "./i18n";
import { AboutSection } from "./sections/AboutSection";
import { ContactSection } from "./sections/ContactSection";
import { ExperienceSection } from "./sections/ExperienceSection";
import { SkillsSection } from "./sections/SkillsSection";
import { WorkSection } from "./sections/WorkSection";

function Page() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <>
      <SkipLink href="#content">{t.skip}</SkipLink>
      <NavBar
        brand={site.name}
        brandHref="/"
        ariaLabel={t.nav.ariaLabel}
        menuLabel={t.nav.menu}
        closeLabel={t.nav.close}
        links={[
          { label: t.nav.links.work, href: "#work" },
          { label: t.nav.links.about, href: "#about" },
          { label: t.nav.links.experience, href: "#experience" },
          { label: t.nav.links.skills, href: "#skills" },
          { label: t.nav.links.contact, href: "#contact" },
        ]}
        actions={
          <LanguageSwitch
            value={language}
            onChange={(value) => setLanguage(value as Language)}
            ariaLabel={t.nav.languageLabel}
          />
        }
      />
      <Box component="main" id="content" tabIndex={-1} sx={{ outline: "none" }}>
        <Hero
          eyebrow={t.hero.eyebrow}
          title={t.hero.title}
          description={t.hero.description}
          actions={
            <>
              <Button size="large" variant="contained" href="#work">
                {t.hero.primary}
              </Button>
              <Button size="large" variant="outlined" href="#contact">
                {t.hero.secondary}
              </Button>
            </>
          }
        />
        <WorkSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ContactSection />
      </Box>
      <Footer
        title={site.name}
        description={t.footer.description}
        linksLabel={t.footer.linksLabel}
        externalLabel={t.footer.external}
        links={[
          { label: t.footer.links.github, href: site.github, external: true },
          { label: t.footer.links.npm, href: site.npm, external: true },
          { label: t.footer.links.linkedin, href: site.linkedin, external: true },
          { label: t.footer.links.storybook, href: site.storybook, external: true },
        ]}
        legal={t.footer.legal.replace("{year}", String(new Date().getFullYear()))}
      />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={editorialTheme}>
      <CssBaseline />
      <LanguageProvider>
        <Page />
      </LanguageProvider>
    </ThemeProvider>
  );
}
