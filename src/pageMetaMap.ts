export interface PageMetaData {
  url: string; // required by plugin
  bundleEntryPoint: string; // required by plugin
  title: string;
  description: string;
  image?: string;
}
const bundleEntryPoint = "/src/main.tsx";
export const pages: PageMetaData[] = [
  {
    url: "index.html",
    bundleEntryPoint,
    title: "",
    description:
      "",
    image: "",
  },
  {
    url: "some_path/index.html",
    bundleEntryPoint,
    title: "Path Title | Site.com",
    description: "",
  }
];
