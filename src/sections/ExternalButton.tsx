import { Button, Icon, VisuallyHidden, icons } from "@sorayasm/vietri-ds";
import { useLanguage } from "../i18n";

interface ExternalButtonProps {
  href: string;
  label: string;
  /** Names what the link is about, so several similar links stay distinguishable. */
  context?: string;
  variant?: "contained" | "outlined";
  size?: "small" | "medium";
}

/** Button that opens another site in a new tab and says so to screen readers. */
export function ExternalButton({
  href,
  label,
  context,
  variant = "outlined",
  size = "small",
}: ExternalButtonProps) {
  const { t } = useLanguage();
  return (
    <Button
      variant={variant}
      size={size}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      endIcon={<Icon icon={icons.ExternalLink} size={14} />}
    >
      {label}
      <VisuallyHidden>{` ${context ? `– ${context} ` : ""}${t.work.opensInNewTab}`}</VisuallyHidden>
    </Button>
  );
}
