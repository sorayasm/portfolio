import { styled } from "@mui/material/styles";
import { site } from "../data/site";
import { useLanguage } from "../i18n";

// A styled <img>, not Box: Box turns `width` and `height` into CSS, but here
// they must stay HTML attributes so the browser reserves the space.
const Image = styled("img")(({ theme }) => ({
  display: "block",
  width: "100%",
  maxWidth: 360,
  height: "auto",
  aspectRatio: "4 / 5",
  objectFit: "cover",
  borderRadius: Number(theme.shape.borderRadius) * 2,
  border: `1px solid ${theme.palette.divider}`,
}));

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
    <figure style={{ margin: 0 }}>
      <Image
        src={photo.src}
        alt={t.about.photoAlt}
        width={photo.width}
        height={photo.height}
        loading="lazy"
        decoding="async"
      />
    </figure>
  );
}
