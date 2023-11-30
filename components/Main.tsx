import { ReactNode } from "react";
import { cn } from "~/utils/cn";
import { ENV } from "~/utils/env";
import { Link } from "./Link";

export const Main = (p: { children: ReactNode }) => {
  return (
    <main
      className={cn(
        "prose prose-h1:text-center",
        "prose-code:before:hidden prose-code:after:hidden",
        "dark:prose-invert",
        "max-w-2xl mx-auto w-full",
        "my-10",
      )}
    >
      {p.children}
      <hr />
      <footer className={cn("text-gray-600")}>
        <h2 className={cn("text-gray-600 text-center")}>
          Aidez-nous à améliorer le site ! 👌
        </h2>
        <p className="text-center">
          Vous avez repéré une coquille ou quelque chose d'obscur ?<br />
          <Link
            className={cn("text-gray-800 dark:text-gray-400")}
            href={`${ENV.GITHUB_REPO}/issues/new`}
          >
            Créer une Issue.
          </Link>
        </p>
        <p className="text-center">
          Vous souhaitez contribuez au site ?<br />
          <Link
            className={cn("text-gray-800 dark:text-gray-400")}
            href={`${ENV.GITHUB_REPO}/pulls`}
          >
            Créez une Pull Request.
          </Link>
        </p>
        <p className="text-center">
          Vous ne savez pas comment contribuer ?<br />
          <Link
            className={cn("text-gray-800 dark:text-gray-400")}
            href={`${ENV.GITHUB_REPO}`}
          >
            Lisez le guide.
          </Link>
        </p>

        <hr />

        <p className="text-center">
          Créé par{" "}
          <Link
            className={cn("text-gray-800 dark:text-gray-400")}
            href="https://alexandre-dosreis.me"
          >
            Alexandre Dos Reis
          </Link>
        </p>
      </footer>
    </main>
  );
};
