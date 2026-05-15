import { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  children,
  align = "left"
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="mt-3 text-3xl font-black tracking-normal text-ink dark:text-white md:text-5xl">{title}</h2>
      {children ? <div className="mt-5 text-base leading-8 text-zinc-600 dark:text-zinc-300 md:text-lg">{children}</div> : null}
    </div>
  );
}
