import { atom, useAtom } from "jotai";

type Sort = "document" | "alphabetically";
const navSortAtom = atom<Sort>("document");
export const navSortState = () => useAtom(navSortAtom);
