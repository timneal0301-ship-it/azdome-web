import { getContent } from "@/lib/content-server";
import { APP_COMPATIBILITY, APP_DOWNLOAD, APP_PAGE } from "@/lib/content/app-page";
import { getAssetUrlMap } from "@/lib/asset-urls";
import AppPageClient from "@/components/AppPageClient";

export const metadata = {
  title: "AZDOME App — AZDOME",
  description:
    "Download the free AZDOME app for iOS and Android. Pair your dash cam, browse footage, and update firmware over Wi-Fi.",
};

export default async function AppPage() {
  const [content, download, compatibility, assetMap] = await Promise.all([
    getContent(APP_PAGE),
    getContent(APP_DOWNLOAD),
    getContent(APP_COMPATIBILITY),
    getAssetUrlMap(),
  ]);
  const resolveAsset = (path: string) => assetMap[path] ?? path;
  return (
    <AppPageClient
      content={content}
      download={download}
      compatibility={compatibility}
      qrUrl={resolveAsset(download.qrImage)}
      iconUrl={resolveAsset(download.appIcon)}
      phoneUrl={resolveAsset(download.phoneScreenshot)}
    />
  );
}
