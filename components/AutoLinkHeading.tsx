"use client";

import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import { cn } from "~/utils/cn";
import { AiOutlineLink } from "react-icons/ai";

export type HTMLHeading = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

export const AutoLinkHeading = ({
  children,
  id,
  ...p
}: HTMLHeading & { type: "h2" | "h3" }) => {
  return (
    <>
      <p.type {...p} tabIndex={-1} className="relative">
        <a
          className={cn("absolute top-0 -left-8 p-1")}
          href={`#${id}`}
          id={`${id}`}
          aria-hidden="true"
        >
          <AiOutlineLink
            className={cn(
              "relative",
              p.type === 'h3' && "top-[3px] left-1",
              "text-gray-400 hover:text-gray-900",
              "dark:text-gray-700 dark:hover:text-gray-200"
            )}
          />
        </a>
        {children}
      </p.type>
    </>
  );
};
