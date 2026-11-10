import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Chip, SectionHeader } from "@sorayasm/vietri-ds";
import { useLanguage } from "../i18n";
import { Section } from "./Section";

export function SkillsSection() {
  const { t } = useLanguage();
  return (
    <Section id="skills">
      <SectionHeader
        eyebrow={t.skills.eyebrow}
        title={t.skills.title}
        description={t.skills.description}
      />
      <Box
        sx={{
          mt: 6,
          display: "grid",
          gap: 4,
          gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
        }}
      >
        {t.skills.groups.map((group) => (
          <Box key={group.title}>
            <Typography component="h3" variant="h6" gutterBottom>
              {group.title}
            </Typography>
            <Stack
              component="ul"
              role="list"
              direction="row"
              spacing={1}
              useFlexGap
              flexWrap="wrap"
              sx={{ listStyle: "none", m: 0, p: 0 }}
            >
              {group.items.map((item) => (
                <li key={item}>
                  <Chip label={item} />
                </li>
              ))}
            </Stack>
          </Box>
        ))}
      </Box>
    </Section>
  );
}
