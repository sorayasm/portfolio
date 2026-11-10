import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent, Chip, Icon, SectionHeader, icons } from "@sorayasm/vietri-ds";
import { projectLinks, type ProjectId } from "../data/site";
import { useLanguage, type ProjectContent } from "../i18n";
import { ExternalButton } from "./ExternalButton";
import { Section } from "./Section";

// A styled <img>, not Box: `width` and `height` must stay HTML attributes so the
// browser reserves the space before the image loads.
const ProjectImage = styled("img")({
  display: "block",
  width: "100%",
  height: "auto",
  aspectRatio: "16 / 9",
  objectFit: "cover",
  transition: "transform 400ms ease",
});

// Shown while a project has no screenshot yet.
const placeholderIcons: Record<ProjectId, LucideIcon> = {
  vietri: icons.LayoutGrid,
  streaming: icons.Play,
  observatory: icons.Network,
};

function ProjectMedia({ project }: { project: ProjectContent }) {
  const image = projectLinks[project.id].image;

  if (image) {
    return (
      <ProjectImage
        className="project-image"
        src={image.src}
        alt={project.imageAlt}
        width={image.width}
        height={image.height}
        loading="lazy"
        decoding="async"
      />
    );
  }

  return (
    <Box
      aria-hidden="true"
      sx={(theme) => ({
        aspectRatio: "16 / 9",
        display: "grid",
        placeItems: "center",
        bgcolor: theme.vietri.color.chip,
        color: theme.palette.text.secondary,
      })}
    >
      <Icon icon={placeholderIcons[project.id]} size={40} />
    </Box>
  );
}

function ProjectCard({ project }: { project: ProjectContent }) {
  const { t } = useLanguage();
  const links = projectLinks[project.id];
  // Only projects with a live demo are clickable, so only they react to the pointer.
  const clickable = Boolean(links.demo);

  return (
    <Card
      sx={(theme) => ({
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transition: "transform 200ms ease, box-shadow 200ms ease, border-color 200ms ease",
        ...(clickable && {
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: theme.vietri.shadow.md,
            borderColor: theme.palette.primary.main,
          },
          "&:hover .project-image": { transform: "scale(1.04)" },
        }),
      })}
    >
      {/*
        Mouse-only link over the whole card. It repeats the "View live" button,
        so it is hidden from screen readers and from the Tab key: keyboard and
        screen reader users reach the same page through the visible button.
      */}
      {links.demo && (
        <Box
          component="a"
          href={links.demo}
          target="_blank"
          rel="noopener noreferrer"
          aria-hidden="true"
          tabIndex={-1}
          sx={{ position: "absolute", inset: 0, zIndex: 1 }}
        />
      )}
      <ProjectMedia project={project} />
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
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
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            flexWrap="wrap"
            sx={{ mt: "auto", pt: 1, position: "relative", zIndex: 2 }}
          >
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
