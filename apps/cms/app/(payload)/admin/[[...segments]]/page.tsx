import config from "@payload-config";
import { generatePageMetadata, RootPage } from "@payloadcms/next/views";

import { importMap } from "../importMap";

type PageProps = {
  params: Promise<{
    segments: string[];
  }>;
  searchParams: Promise<{
    [key: string]: string | string[];
  }>;
};

export const generateMetadata = ({ params, searchParams }: PageProps) =>
  generatePageMetadata({ config, params, searchParams });

export default function Page({ params, searchParams }: PageProps) {
  return RootPage({ config, importMap, params, searchParams });
}
