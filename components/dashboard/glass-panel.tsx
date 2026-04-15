import type { ReactElement, ReactNode } from "react";

import { cn } from "@/lib/utils";

type GlassPanelProps = Readonly<{
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  description?: string;
  title?: string;
}>;

export function GlassPanel({
  action,
  children,
  className,
  description,
  title,
}: GlassPanelProps): ReactElement {
  const hasHeader =
    title !== undefined ||
    description !== undefined ||
    action !== undefined;

  return (
    <section
      className={cn(
        "glass-frost rounded-2xl border border-white/[0.08] p-4 shadow-[0_28px_56px_-16px_rgba(0,0,0,0.72)] ring-1 ring-inset ring-white/[0.05] sm:p-6",
        className,
      )}
    >
      {hasHeader ? (
        <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
          <div className="min-w-0">
            {title !== undefined ? (
              <h2 className="text-base font-semibold tracking-tight text-white sm:text-lg">
                {title}
              </h2>
            ) : null}
            {description !== undefined ? (
              <p className="mt-1 text-xs leading-relaxed text-slate-400 sm:text-sm">
                {description}
              </p>
            ) : null}
          </div>
          {action !== undefined ? (
            <div className="shrink-0">{action}</div>
          ) : null}
        </div>
      ) : null}
      {children}
    </section>
  );
}
