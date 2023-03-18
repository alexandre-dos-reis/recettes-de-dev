import { stat } from "fs/promises";
import slugify from "slugify";
export const asyncFileExists = async (path: string) => {
  return !!(await stat(path).catch((e) => false));
};

export const createSlug = (value: string) => {
  return slugify(value, {
    locale: "fr",
    lower: true,
    replacement: "-",
  });
};
