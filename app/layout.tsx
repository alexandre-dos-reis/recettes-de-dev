import "./globals.css";

interface Props {
  children: React.ReactNode;
}

export default (p: Props) => {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <header>Header</header>
        {p.children}
        <footer>Footer</footer>
      </body>
    </html>
  );
};
