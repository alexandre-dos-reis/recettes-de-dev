import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

type Sort = "default" | "alphabetically";
const navSortAtom = atomWithStorage<Sort>("navSort", "default");

export const navSortState = () => useAtom(navSortAtom);
