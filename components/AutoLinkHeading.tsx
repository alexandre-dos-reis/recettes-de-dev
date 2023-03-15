"use client";

import { DetailedHTMLProps, HTMLAttributes, useState } from "react";

export type HTMLHeading = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

export const AutoLinkHeading = ({
  children,
  id,
  ...props
}: HTMLHeading & { type: "h2" | "h3" }) => {
  return (
    <>
      <props.type {...props} tabIndex={-1} className="relative">
        <a
          className={`absolute top-0 -left-8 p-1 -rotate-45 float-none text-sm`}
          href={`#${id}`}
          id={`${id}`}
          aria-hidden="true"
        >
          <svg
            className="inline-block h-6"
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            data-testid="LinkIcon"
          >
            <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path>
          </svg>
        </a>
        {children}
      </props.type>
    </>
  );
};
