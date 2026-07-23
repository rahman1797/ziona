import { cn } from "@/utils/cn";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-2xl flex flex-col gap-2 items-center text-center mx-auto",
        align === "center" && "mx-auto text-center",
      )}
    >
      {eyebrow ? (
        <p className="text-xs md:text-xl font-semibold uppercase text-[#5D5E4D]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="poppins text-2xl font-bold md:text-3xl text-[#5D5E4D]">
        {title}
      </h2>
      {description ? (
        <p className="text-muted text-sm md:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
