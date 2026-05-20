import type { ContentSection } from "./types";

export const APP_FEATURE_ICONS = [
  "Wifi",
  "PlayCircle",
  "Download",
  "MapPin",
  "Settings",
  "Mic",
  "ShieldCheck",
  "Languages",
  "Folder",
  "Smartphone",
] as const;

export type AppFeature = {
  iconName: string;
  title: string;
  body: string;
  hidden?: boolean;
};

export const FEATURES: AppFeature[] = [
  {
    iconName: "Wifi",
    title: "Wi-Fi 一键配对",
    body:
      "5 GHz / 2.4 GHz 双频 Wi-Fi 与行车记录仪直连。无需路由器,扫一下机身二维码或在 App 内选择 SSID 即完成。",
  },
  {
    iconName: "PlayCircle",
    title: "实时画面预览",
    body:
      "在手机上看到行车记录仪当前视角,装机调位、确认覆盖范围,不用启动汽车反复试摆。",
  },
  {
    iconName: "Download",
    title: "回放与下载",
    body:
      "浏览 SD 卡里所有片段,选中即下载到手机相册,4K 视频典型速度约 12-15 MB/s。",
  },
  {
    iconName: "MapPin",
    title: "GPS 轨迹回放",
    body:
      "M550 Pro / GS63H 等带 GPS 的型号,App 内可在地图上看到行驶轨迹、速度、方向,事故还原一目了然。",
  },
  {
    iconName: "Settings",
    title: "相机设置",
    body:
      "分辨率、码率、停车监控模式、G-sensor 灵敏度、循环录制时长、时区水印,全在 App 里调。",
  },
  {
    iconName: "Mic",
    title: "语音指令配置",
    body:
      "为支持语音控制的机型(M550 Pro / M550 Max)开启 / 关闭「锁定视频」、「拍照」等语音命令。",
  },
  {
    iconName: "ShieldCheck",
    title: "OTA 固件升级",
    body:
      "新固件可用时 App 会通知,通过 Wi-Fi 一键 OTA 升级,无需拆 SD 卡。",
  },
  {
    iconName: "Languages",
    title: "多语言界面",
    body:
      "英文 / 简中 / 繁中 / 日文 / 德文 / 法文 / 西班牙文 / 意大利文 / 葡萄牙文 / 韩文 / 阿拉伯文 11 种,跟随手机系统语言。",
  },
];

export type AppFAQ = { q: string; a: string; hidden?: boolean };

export const FAQ: AppFAQ[] = [
  {
    q: "AZDOME App 是免费的吗?",
    a: "完全免费。配对相机、浏览片段、下载视频、固件升级全部不收费,也没有内购解锁。",
  },
  {
    q: "连接相机后手机能继续上网吗?",
    a: "与相机连接期间,手机会临时切到相机的 Wi-Fi 热点,所以手机原本的家庭 Wi-Fi 会断开。配对完成、退出 App 后会自动恢复。蜂窝数据(4G/5G)不受影响。",
  },
  {
    q: "电脑上怎么查看视频?",
    a: "最简单是把 SD 卡插电脑直接读取。AZDOME 视频是标准 MP4 格式,任何视频播放器都能打开。需要带 GPS / 速度叠加层的版本,可在 App 内导出后传到电脑。",
  },
  {
    q: "App 支持哪些语言?",
    a: "英语、简体中文、繁体中文、日语、韩语、德语、法语、意大利语、西班牙语、葡萄牙语、阿拉伯语,共 11 种。跟随手机系统语言自动切换。",
  },
  {
    q: "AZDOME 能看到我的录像吗?",
    a: "不能。视频存在 SD 卡和你的手机上,App 不会把视频上传到 AZDOME 服务器。我们没有任何渠道访问你的录像。",
  },
  {
    q: "怎么把视频分享给保险公司?",
    a: "在 App 内选中片段下载到手机相册,然后通过任何 App 分享 —— 邮箱、微信、WhatsApp、iMessage 都可以。导出时可选择是否叠加 GPS 和速度信息。",
  },
];

// ─── New: Download section (QR + store URLs) ────────────────────────

export type AppDownload = {
  eyebrow: string;
  title: string;
  subtitle: string;
  /** Path to the QR code image. Admin uploads via /admin/images
   * (app-qr slot). One QR encoding a smart-redirect URL that auto-
   * detects iOS/Android works for both platforms. */
  qrImage: string;
  /** Caption shown under the QR code. */
  qrCaption: string;
  /** App Store URL for users who prefer not to scan. */
  appStoreUrl: string;
  /** Google Play URL for users who prefer not to scan. */
  googlePlayUrl: string;
  /** Square app icon shown beside the QR. */
  appIcon: string;
  /** Large phone screenshot shown on the right of the hero. */
  phoneScreenshot: string;
  /** Optional rating display (eg "★ 4.7 · 18,000+ reviews"). */
  rating?: string;
  /** Bullet list of key benefits below the headline. */
  bullets: string[];
};

export const DEFAULT_DOWNLOAD: AppDownload = {
  eyebrow: "AZDOME App",
  title: "扫码下载 · iOS & Android",
  subtitle:
    "扫描二维码,自动跳转到对应应用商店。一个 App 管理你所有 AZDOME 行车记录仪。",
  qrImage: "/images/app/qr.png",
  qrCaption: "用手机相机扫一扫",
  appStoreUrl: "https://apps.apple.com/app/azdome",
  googlePlayUrl: "https://play.google.com/store/apps/details?id=com.azdome",
  appIcon: "/images/app/icon.png",
  phoneScreenshot: "/images/product/m550-app.jpg",
  rating: "★ 4.7 · App Store 18,000+ 评价",
  bullets: [
    "免费下载,无内购",
    "兼容所有 AZDOME 行车记录仪",
    "iOS 14+ · Android 8+",
  ],
};

export const APP_DOWNLOAD: ContentSection<AppDownload> = {
  key: "app.download",
  label: "App 页 · 二维码下载区",
  description:
    "首屏二维码 + 商店链接。把 admin/images 里上传的 QR 图路径填到 qrImage 即可。如要做 OS 自动跳转商店,把 QR 内容指向一个智能跳转 URL(如 https://azdome.com/app/install)。",
  page: "app",
  previewHref: "/app",
  defaults: DEFAULT_DOWNLOAD,
};

// ─── Compatibility table (now editable) ─────────────────────────────

export type AppCompatRow = {
  product: string;
  firmware: string;
  ios: string;
  android: string;
};

export const COMPATIBILITY: AppCompatRow[] = [
  { product: "M550 Pro", firmware: "v2.4+", ios: "iOS 14+", android: "Android 8+" },
  { product: "M550 Max", firmware: "v2.0+", ios: "iOS 14+", android: "Android 8+" },
  { product: "M530",     firmware: "v1.8+", ios: "iOS 14+", android: "Android 8+" },
  { product: "GS63H",    firmware: "v3.0+", ios: "iOS 14+", android: "Android 8+" },
  { product: "M27",      firmware: "v1.4+", ios: "iOS 14+", android: "Android 8+" },
  { product: "M300S",    firmware: "v2.0+", ios: "iOS 14+", android: "Android 9+" },
  { product: "M17 Pro",  firmware: "v1.2+", ios: "iOS 14+", android: "Android 8+" },
  { product: "PG17 Pro", firmware: "v1.5+", ios: "iOS 14+", android: "Android 8+" },
];

export const APP_COMPATIBILITY: ContentSection<AppCompatRow[]> = {
  key: "app.compatibility",
  label: "App 页 · 兼容性表格",
  description: "App 支持的型号列表。",
  page: "app",
  previewHref: "/app",
  defaults: COMPATIBILITY,
};

// ─── Existing page section (features + faq) ─────────────────────────

export type AppPageContent = {
  features: AppFeature[];
  faq: AppFAQ[];
};

export const APP_PAGE: ContentSection<AppPageContent> = {
  key: "app.page",
  label: "App 页 · Features / FAQ",
  description:
    "App 推广页核心:功能卡片 + 常见问题。下载区 / 兼容性表是单独的 section。" +
    `Features iconName: ${APP_FEATURE_ICONS.join(", ")}`,
  page: "app",
  previewHref: "/app",
  defaults: { features: FEATURES, faq: FAQ },
};
