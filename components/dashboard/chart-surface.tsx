import type { ReactElement, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ChartSurfaceProps = Readonly<{
  children: ReactNode;
  className?: string;
}>;

/**
 * Wraps Chart.js so hover applies a soft glow on the wrapper (not the canvas).
 */
export function ChartSurface({
  children,
  className,
}: ChartSurfaceProps): ReactElement {
  return (
    <div
      className={cn(
        "group/chart relative h-full min-h-0 w-full rounded-xl",
        "transition-[box-shadow,outline-color] duration-300 ease-out",
        "outline outline-1 outline-transparent [outline-offset:2px]",
        "hover:shadow-[0_0_0_1px_rgba(34,211,238,0.12),0_0_36px_-6px_rgba(34,211,238,0.18),0_0_64px_-12px_rgba(99,102,241,0.1)]",
        "hover:outline-cyan-400/25",
        "motion-reduce:transition-none motion-reduce:hover:shadow-none motion-reduce:hover:outline-transparent",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 ease-out group-hover/chart:opacity-100 motion-reduce:group-hover/chart:opacity-0"
        aria-hidden
      >
        <div className="absolute inset-0 rounded-xl bg-[radial-gradient(ellipse_85%_70%_at_50%_45%,rgba(34,211,238,0.12),transparent_72%)]" />
      </div>
      <div className="relative h-full min-h-0 w-full">{children}</div>
    </div>
  );
}
