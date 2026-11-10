import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Card, CardContent, Chip, SectionHeader } from "@sorayasm/vietri-ds";
import { projectLinks } from "../data/site";
import { useLanguage, type ProjectContent } from "../i18n";
import { ExternalButton } from "./ExternalButton";
import { Section } from "./Section";

function ProjectCard({ project }: { project: ProjectContent }) {
  const { t } = useLanguage();
  const links = projectLinks[project.id];

  return (
    <Card sx={{ height: "100%" }}>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2, height: "100%" }}>
        <Stack
          component="ul"
          role="list"
          direction="row"
          spacing={1}
          useFlexGap
          flexWrap="wrap"
          sx={{ listStyle: "none", m: 0, p: 0 }}
        >
          <li>
            <Chip size="small" variant="outlined" label={t.work.status[links.status]} />
          </li>
          {project.tags.map((tag) => (
            <li key={tag}>
              <Chip size="small" label={tag} />
            </li>
          ))}
        </Stack>
        <Typography component="h3" variant="h5">
          {project.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {project.description}
        </Typography>
        {(links.demo || links.source) && (
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mt: "auto", pt: 1 }}>
            {links.demo && (
              <ExternalButton
                href={links.demo}
                label={t.work.viewDemo}
                context={project.title}
                variant="contained"
              />
            )}
            {links.source && (
              <ExternalButton href={links.source} label={t.work.viewSource} context={project.title} />
            )}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}

export function WorkSection() {
  const { t } = useLanguage();
  return (
    <Section id="work">
      <SectionHeader
        eyebrow={t.work.eyebrow}
        title={t.work.title}
        description={t.work.description}
      />
      <Box
        sx={{
          mt: 6,
          display: "grid",
          gap: 3,
          gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" },
        }}
      >
        {t.work.projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </Box>
    </Section>
  );
}
