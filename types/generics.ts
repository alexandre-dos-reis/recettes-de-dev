export interface PageParamsProps<T extends () => any> {
  params: Awaited<ReturnType<T>>[number];
  searchParams?: { [key: string]: string | string[] | undefined };
}

