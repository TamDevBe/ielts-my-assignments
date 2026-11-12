// Adapted from Coursi LMS InfoCard, copyright (c) 2024 Mohammad Nedaei (MIT).
// See docs/licenses/Coursi-MIT.txt and docs/open-source.md.
import type { LucideIcon } from "lucide-react";

interface InfoCardProps {
  numberOfItems: number | null;
  variant?: "default" | "success" | "warning";
  label: string;
  icon: LucideIcon;
  detail?: string;
}

export function InfoCard({ variant = "default", icon: Icon, numberOfItems, label, detail }: InfoCardProps) {
  return <div className={`info-card info-${variant}`}>
    <span className="info-label"><Icon size={16} strokeWidth={1.7} aria-hidden="true" />{label}</span>
    <strong>{numberOfItems === null ? "—" : numberOfItems.toString().padStart(2, "0")}{detail && <small>{detail}</small>}</strong>
  </div>;
}
