import { listCommandsFile } from "~/mdx/commands/functions";

export default async () => {
  const slugs = await listCommandsFile();

  return (
    <ul>
      {slugs.map((s) => (
        <li key={s.id}>
          <div>id: {s.id}</div>
          <div>slug: {s.slug}</div>
        </li>
      ))}
    </ul>
  );
};
