import { ReactNode } from "react";

interface Props {
  i: string; // The command
  children: ReactNode; // The description
  env?: string; // The environment for the user, ex: $
}

export const CommandItem = (p: Props) => (
  <div style={{ backgroundColor: "blue" }}>
    <div>{p.env ?? "$"}</div>
    <div>{p.children}</div>
  </div>
);
