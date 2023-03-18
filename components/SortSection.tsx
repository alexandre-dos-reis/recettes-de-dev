import { FaSortNumericDown, FaSortAlphaDown } from "react-icons/fa";
import { cn } from "~/utils/cn";
import { navSortState } from "~/utils/store";

export const SortSection = () => {
  const [navSort, setNavSort] = navSortState();
  return (
    <div
      className={cn(
        "sticky top-0",
        "pt-10 flex pb-10 gap-5 justify-center z-20",
        "bg-slate-100 dark:bg-[#111]"
      )}
    >
      <button type="button" onClick={() => setNavSort("default")}>
        <FaSortNumericDown
          className={cn(
            "text-3xl",
            navSort === "default"
              ? "text-gray-900 dark:text-gray-300"
              : "text-gray-500"
          )}
        />
      </button>
      <button type="button" onClick={() => setNavSort("alphabetically")}>
        <FaSortAlphaDown
          className={cn(
            "text-3xl",
            navSort === "alphabetically"
              ? "text-gray-900 dark:text-gray-300"
              : "text-gray-500"
          )}
        />
      </button>
    </div>
  );
};
