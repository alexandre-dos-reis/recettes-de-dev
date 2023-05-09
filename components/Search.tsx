"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "./Link";
import { osName, isMobile } from "react-device-detect";

// const getData = async () => {
//   const res = await fetch("/api/search");
//
//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }
//
//   return res.json();
// };

const MAC_OS = "Mac OS";
const SEARCH_KEY = "k";

interface Hit {
  title: string;
  slug: string;
}

export const Search = () => {
  const [query, setQuery] = useState("");
  const [isOn, setIsOn] = useState(false);
  const [metaKey, setMetaKey] = useState("META");
  const [hits, setHits] = useState<Array<Hit>>([
    {
      title: "ansible",
      slug: "/cli/ansible",
    },
    {
      title: "man",
      slug: "/cli/man",
    },
    {
      title: "docker",
      slug: "/cli/docker",
    },
    {
      title: "git commit",
      slug: "/cli/git/commit",
    },
    {
      title: "typescript recettes",
      slug: "/code/typescript/recettes",
    },
  ]);

  const handleFocusOnShortcut = (e: KeyboardEvent) => {
    if (
      ((osName === MAC_OS && e.metaKey) || (osName !== MAC_OS && e.ctrlKey)) &&
      e.key === SEARCH_KEY
    ) {
      setIsOn((v) => {
        if (v) setQuery("");
        return !v;
      });
    }

    if (e.key === "Escape") {
      setQuery("");
      setIsOn(false);
    }
  };

  useEffect(() => {
    setMetaKey(osName === MAC_OS ? "CMD" : "CTRL");
    document.addEventListener("keydown", handleFocusOnShortcut);
    return () => document.removeEventListener("keydown", handleFocusOnShortcut);
  }, []);

  const onClick = () => {
    setQuery("");
    setIsOn(false);
  };

  if (isOn === false) return null;

  return (
    <div className="fixed z-50 inset-0 bg-black/90 flex justify-center items-center">
      <div className="bg-gray-600 p-4 rounded-md min-h-[20rem] max-h-96">
        <input
          autoFocus
          className={`p-2 text-xl min-w-[600px] outline-0 text-gray-600 border-2 border-gray-200 rounded-md`}
          type="text"
          placeholder={`Rechercher ...`}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <ul>
          {hits.map((h) => (
            <li key={h.slug}>
              <Link href={h.slug} onClick={onClick}>
                {h.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
