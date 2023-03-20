import { ReactNode } from "react";
import { headerHeight } from "~/styles/constants";

export const LayoutAside = (p: { children: ReactNode }) => {
  return (
    <aside
      className="sticky overflow-y-auto"
      style={{
        top: headerHeight,
        height: `calc(100vh - ${headerHeight})`,
      }}
    >
      {p.children}
    </aside>
  );
};
