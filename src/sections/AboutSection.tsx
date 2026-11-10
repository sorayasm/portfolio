import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { FeatureCard, SectionHeader, StatCard, icons } from "@sorayasm/vietri-ds";
import { site } from "../data/site";
import { useLanguage } from "../i18n";
import { Portrait } from "./Portrait";
import { Section } from "./Section";

// One icon per service, in the same order as the content.
const serviceIcons = [icons.LayoutGrid, icons.Network, icons.ShieldCheck];

export function AboutSection() {
  const { t } = useLanguage();
  const hasPhoto = Boolean(site.photo);

  return (
    <Section id="about" tinted>
      {/* Text next to the photo. Without a photo, the text uses a readable width. */}
      <Box
        sx={{
          display: "grid",
          gap: 6,
          gridTemplateColumns: { xs: "1fr", md: hasPhoto ? "1.4fr 1fr" : "1fr" },
          alignItems: "center",
        }}
      >
        <Stack spacing={3} sx={{ maxWidth: hasPhoto ? "none" : 760 }}>
          <SectionHeader eyebrow={t.about.eyebrow} title={t.about.title} />
          {t.about.paragraphs.map((paragraph) => (
            <Typography key={paragraph} variant="body1">
              {paragraph}
            </Typography>
          ))}
        </Stack>
        {hasPhoto && (
          <Box sx={{ display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" } }}>
            <Portrait />
          </Box>
        )}
      </Box>

      {/* The three figures sit in one row, so the section stays balanced on wide screens. */}
      <Box
        sx={{
          mt: 8,
          display: "grid",
          gap: 3,
          gridTemplateColumns: { xs: "1fr", sm: "repeat(3, minmax(0, 1fr))" },
        }}
      >
        {t.about.figures.map((figure) => (
          // The wrapper makes every card as tall as the tallest one in the row.
          <Box key={figure.label} sx={{ display: "flex", "& > *": { flex: 1 } }}>
            <StatCard value={figure.value} label={figure.label} />
          </Box>
        ))}
      </Box>

      <Typography component="h3" variant="h4" sx={{ mt: 10, mb: 3 }}>
        {t.about.servicesTitle}
      </Typography>
      <Box
        sx={{
          display: "grid",
          gap: 3,
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
        }}
      >
        {t.about.services.map((service, index) => (
          <FeatureCard
            key={service.title}
            icon={serviceIcons[index]}
            title={service.title}
            description={service.description}
            level={4}
          />
        ))}
      </Box>
    </Section>
  );
}
