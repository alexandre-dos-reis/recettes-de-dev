import { atom, useAtom } from "jotai";

const isNavInitAtom = atom(true);
const navSlugAtom = atom<string | null>(null);

export const isNavInitState = () => useAtom(isNavInitAtom);
export const navSlugState = () => useAtom(navSlugAtom);
