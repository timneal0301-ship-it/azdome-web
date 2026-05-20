import ContentList from "@/components/admin/ContentList";
import { ALL_SECTIONS, getContentDetailed } from "@/lib/content-server";

export const dynamic = "force-dynamic";

const PAGE_LABELS: Record<string, string> = {
  layout: "Layout · 模块开关(隐藏整版面)",
  home: "Home · 首页 Hero 轮播 + Bento Banner",
  catalog: "Catalog · 产品目录(10 SKU 共用数据源)",
  pdp: "PDP · 产品详情页(规格 / 评价 / FAQ / 沉浸式 / 应用场景)",
  legal: "Legal · 隐私 / 条款 / 保修 / 无障碍 / Cookie",
  about: "About 公司页",
  careers: "Careers 招聘页",
  press: "Press 媒体页",
  affiliate: "Affiliate 联盟计划",
  wholesale: "Wholesale 批发",
  app: "App 推广页",
};

const PAGE_ORDER = [
  "layout",
  "home",
  "catalog",
  "pdp",
  "about",
  "legal",
  "careers",
  "press",
  "affiliate",
  "wholesale",
  "app",
];

export default async function ContentAdminPage() {
  const entries = await Promise.all(
    ALL_SECTIONS.map(async (section) => {
      const { isOverridden, hasPrev } = await getContentDetailed(section);
      // Strip defaults — some section defaults contain lucide icon
      // components (functions) which can't cross the RSC boundary into
      // the client ContentList. The list only needs the metadata.
      return {
        section: {
          key: section.key,
          label: section.label,
          description: section.description,
          previewHref: section.previewHref,
          page: section.page,
        },
        isOverridden,
        hasPrev,
      };
    }),
  );

  return (
    <main className="mx-auto max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-10">
      <header className="mb-10 border-b border-slate-200 pb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
          Page Content
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
          页面内容编辑
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-500">
          每个 section 是一个 JSON 文档。改了保存后写入 Vercel KV,覆盖代码里的默认值,前台立即重新生成。
          上次的版本会自动备份,一键可回滚。
        </p>
      </header>

      <ContentList
        entries={entries}
        pageOrder={PAGE_ORDER}
        pageLabels={PAGE_LABELS}
      />
    </main>
  );
}
