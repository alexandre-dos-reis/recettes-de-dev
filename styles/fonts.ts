import { Overpass_Mono } from "next/font/google";
import { Satisfy } from "next/font/google";

export const monoFont = Overpass_Mono({
  weight: "400",
  subsets: ["latin"],
});

export const headerFont = Satisfy({
  weight: "400",
  subsets: ["latin"],
});
