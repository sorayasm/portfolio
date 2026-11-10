import type { ReactNode } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

interface SectionProps {
  /** Anchor of the section (`#id`). */
  id: string;
  children: ReactNode;
  /** Slightly tinted background, to separate neighboring sections. */
  tinted?: boolean;
}

export function Section({ id, children, tinted = false }: SectionProps) {
  return (
    <Box
      component="section"
      id={id}
      sx={{
        py: { xs: 8, md: 12 },
        // Leaves room for the sticky header when jumping to the anchor.
        scrollMarginTop: 72,
        bgcolor: tinted ? "action.hover" : "transparent",
      }}
    >
      <Container maxWidth="lg">{children}</Container>
    </Box>
  );
}
