import Box from "@mui/material/Box";
import { site } from "../data/site";
import { useLanguage } from "../i18n";

/**
 * Portrait for the "About" section. It renders nothing when no photo is set
 * in `site.photo`, so the section looks right with or without it.
 *
 * `width` and `height` let the browser reserve the space before the image
 * loads, which avoids the page jumping.
 */
export function Portrait() {
  const { t } = useLanguage();
  const photo = site.photo;
  if (!photo) return null;

  return (
    <Box component="figure" sx={{ m: 0 }}>
      <Box
        component="img"
        src={photo.src}
        alt={t.about.photoAlt}
        width={photo.width}
        height={photo.height}
        loading="lazy"
        decoding="async"
        sx={{
          display: "block",
          width: "100%",
          maxWidth: 360,
          height: "auto",
          aspectRatio: "4 / 5",
          objectFit: "cover",
          borderRadius: 2,
          border: 1,
          borderColor: "divider",
        }}
      />
    </Box>
  );
}
