"use client";

import { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import { Link } from "./Link";

export const CustomH2 = ({
  children,
  id,
  ...props
}: DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>) => {
  const [show, setShow] = useState(false);

  return (
    <h2
      tabIndex={-1}
      {...props}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      className="relative"
    >
      <a
        className={`inline float-none text-sm h-6 ${
          show ? "opacity-100" : "opacity-0"
        }`}
        href={`#${id}`}
        id={`${id}`}
        aria-hidden="true"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <svg
          className="inline-block"
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 24 24"
          data-testid="LinkIcon"
        >
          <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"></path>
        </svg>
      </a>
      {children}
    </h2>
  );
};

{
  /* <h2 tabindex="-1" dir="auto">
  <a
    id="user-content-react-server-components-rsc--nextjs-app-directory-support"
    class="anchor"
    aria-hidden="true"
    href="#react-server-components-rsc--nextjs-app-directory-support"
  >
    <svg
      class="octicon octicon-link"
      viewBox="0 0 16 16"
      version="1.1"
      width="16"
      height="16"
      aria-hidden="true"
    >
      
    </svg>
  </a>
  React Server Components (RSC) &amp; Next.js <code>app</code> Directory Support
</h2>; */
}
