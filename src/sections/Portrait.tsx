import { styled } from "@mui/material/styles";
import { site } from "../data/site";
import { useLanguage } from "../i18n";

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