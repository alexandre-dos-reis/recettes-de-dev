import { stat } from "fs/promises";

export const asyncFileExists = async (path: string) => {
  return !!(await stat(path).catch((e) => false));
};
