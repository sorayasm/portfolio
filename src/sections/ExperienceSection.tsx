import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SectionHeader, Timeline } from "@sorayasm/vietri-ds";
import { useLanguage } from "../i18n";
import { Section } from "./Section";

export function ExperienceSection() {
  const { t } = useLanguage();
  const { experience } = t;

  return (
    <Section id="experience">
      <SectionHeader
        eyebrow={experience.eyebrow}
        title={experience.title}
        description={experience.description}
      />
      <Box
        sx={{
          mt: 6,
          display: "grid",
          gap: 8,
          gridTemplateColumns: { xs: "1fr", md: "1.4fr 1fr" },
          alignItems: "start",
        }}
      >
        <Timeline
          ariaLabel={experience.listLabel}
          entries={experience.entries.map((entry) => ({
            id: entry.id,
            label: entry.role,
            description: entry.period,
            content: (
              <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
                {entry.points.map((point) => (
                  <Typography key={point} component="li" variant="body2" sx={{ mb: 0.5 }}>
                    {point}
                  </Typography>
                ))}
              </Box>
            ),
          }))}
        />

        <Box>
          <Typography component="h3" variant="h4" sx={{ mb: 2 }}>
            {experience.educationTitle}
          </Typography>
          <Box component="ul" role="list" sx={{ listStyle: "none", m: 0, p: 0 }}>
            {experience.education.map((item) => (
              <Box
                component="li"
                key={item.title}
                sx={{ py: 1.5, borderBottom: 1, borderColor: "divider" }}
              >
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.place} · {item.period}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Section>
  );
}
