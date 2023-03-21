import { Main } from "~/components/Main";
import { headerFont } from "~/styles/fonts";
import { cn } from "~/utils/cn";

export default async () => {
  return (
    <Main>
      <h1 className="mt-12">
        🦐 Bienvenu sur
        <span className={cn(headerFont.className, "mx-3 text-5xl")}>
          Recettes de dev !
        </span>
        🍳
      </h1>
      <div className="flex justify-center">
        <img
          className="rounded-full border border-spacing-1 w-3/6"
          src="/index.png"
        />
      </div>
      <p>
        Nous vous proposons quelques recettes 📖 sur le devops, le développement et
        la CLI que nous avons confectionné 🍜 avec soin ✨ durant nos longues
        d'heures passées devant les lignes de code et le terminal. 💻
      </p>
      <p>
        La navigation se fait via l'explorateur à gauche, les élements sont
        classés par ordre d'apprentissage mais il est possible de les classer
        alphabétiquement pour plus de convenance.
      </p>
    </Main>
  );
};
