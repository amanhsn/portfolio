import type { Project } from "@/content/projects";

/**
 * ProjectMeta — Figma 84:7375 (Margin column).
 * Desktop: w-[397px] h-[597px] pr-[18px].
 * Mobile: w-full, no height clamp, no right padding.
 */
export function ProjectMeta({ project }: { project: Project }) {
  return (
    <div className="flex w-full flex-col items-start md:h-[597px] md:w-[397px] md:pr-[18px]">
      <div className="flex w-full flex-1 flex-col items-start gap-[16px]">
        <div className="relative h-[20.25px] w-full">
          <div className="absolute left-0 top-[-1px] bottom-0 flex flex-col items-start">
            <h2 className="t-project-name whitespace-nowrap text-[15px] sm:text-[16px]">
              {project.name}
            </h2>
          </div>
        </div>

        <div className="flex w-full flex-col items-start gap-[8px]">
          {project.paragraphs.map((p, i) => (
            <div
              key={i}
              className="flex w-full flex-col items-start pb-[0.625px]"
            >
              <p className="t-project-body w-full text-[14px] leading-[20px] sm:text-[15.1px] sm:leading-[20.25px]">
                {p}
              </p>
            </div>
          ))}
        </div>

        <div className="flex w-full flex-col items-start pt-[16px]">
          {project.rows.map((row) => (
            <div
              key={row.label}
              className="flex w-full items-start justify-center"
            >
              <div className="flex w-[72px] shrink-0 flex-col items-start border-t border-solid border-[var(--border-row)] px-px pt-[12px] pb-[12px] sm:w-[75.94px] sm:pt-[15.247px] sm:pb-[16.5px]">
                <span className="t-table-label whitespace-nowrap text-[13.5px] leading-[20px] sm:text-[15.8px] sm:leading-[20.25px]">
                  {row.label}
                </span>
              </div>
              <div className="flex flex-1 flex-col items-start border-t border-solid border-[var(--border-row)] px-px pt-[12px] pb-[12px] sm:pt-[15.247px] sm:pb-[16.5px]">
                <span className="t-table-value w-full text-[14px] leading-[20px] sm:text-[16px] sm:leading-[20.25px]">
                  {row.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
