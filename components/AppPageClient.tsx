"use client";

import Image from "@/components/ui/HQImage";
import Link from "next/link";
import {
  Apple, Download, Folder, Languages, MapPin, Mic, PlayCircle, Play,
  Settings, ShieldCheck, Smartphone, Star, Wifi,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import FaqAccordion from "@/components/FaqAccordion";
import { useLocale } from "@/components/LocaleProvider";
import type { Locale } from "@/lib/i18n/dictionaries";
import type {
  AppPageContent, AppDownload, AppCompatRow,
} from "@/lib/content/app-page";

const ICONS: Record<string, LucideIcon> = {
  Wifi, PlayCircle, Download, MapPin, Settings, Mic, ShieldCheck, Languages, Folder, Smartphone,
};

type Copy = {
  scanAlt: string;
  iconAlt: string;
  phoneAlt: string;
  appStoreSmall: string;
  appStoreBig: string;
  googlePlaySmall: string;
  googlePlayBig: string;
  featuresEyebrow: string;
  featuresTitle: string;
  compatEyebrow: string;
  compatTitle: string;
  thProduct: string;
  thFirmware: string;
  thIos: string;
  thAndroid: string;
  legacyNote: string;
  faqTitle: string;
  faqEyebrow: string;
  ctaTitle: string;
  ctaSub: string;
  ctaButton: string;
};

const COPY: Partial<Record<Locale, Copy>> = {
  en: { scanAlt: "Scan to download AZDOME app", iconAlt: "AZDOME app icon", phoneAlt: "AZDOME app preview", appStoreSmall: "Download on the", appStoreBig: "App Store", googlePlaySmall: "Get it on", googlePlayBig: "Google Play", featuresEyebrow: "What you can do", featuresTitle: "The features you'll actually use.", compatEyebrow: "Compatibility", compatTitle: "Every current AZDOME camera, on every recent OS.", thProduct: "Product", thFirmware: "Min. firmware", thIos: "iOS", thAndroid: "Android", legacyNote: "Older firmware versions are supported by the legacy AZDOME app available on the support page.", faqTitle: "App questions, answered.", faqEyebrow: "FAQ", ctaTitle: "Don't have a camera yet?", ctaSub: "Browse the lineup — every model works with the same free app.", ctaButton: "Shop dash cams" },
  zh: { scanAlt: "扫码下载 AZDOME App", iconAlt: "AZDOME app 图标", phoneAlt: "AZDOME app 预览", appStoreSmall: "在以下平台下载", appStoreBig: "App Store", googlePlaySmall: "在以下平台获取", googlePlayBig: "Google Play", featuresEyebrow: "你能做什么", featuresTitle: "真正用得上的功能。", compatEyebrow: "兼容性", compatTitle: "所有在售 AZDOME 摄像头,适配主流系统。", thProduct: "产品", thFirmware: "最低固件", thIos: "iOS", thAndroid: "Android", legacyNote: "老版固件由旧版 AZDOME App 支持,可在支持页面下载。", faqTitle: "App 常见问题。", faqEyebrow: "FAQ", ctaTitle: "还没买摄像头?", ctaSub: "看看全系产品 — 每个型号都搭配同一个免费 App。", ctaButton: "选购行车记录仪" },
  ja: { scanAlt: "スキャンして AZDOME アプリをダウンロード", iconAlt: "AZDOME アプリアイコン", phoneAlt: "AZDOME アプリプレビュー", appStoreSmall: "ダウンロード:", appStoreBig: "App Store", googlePlaySmall: "入手:", googlePlayBig: "Google Play", featuresEyebrow: "できること", featuresTitle: "実際に使う機能だけ。", compatEyebrow: "対応機種", compatTitle: "現行 AZDOME 全カメラ、最新 OS に対応。", thProduct: "製品", thFirmware: "最小ファームウェア", thIos: "iOS", thAndroid: "Android", legacyNote: "旧バージョンのファームウェアはサポートページの旧 AZDOME アプリで対応します。", faqTitle: "アプリのよくある質問。", faqEyebrow: "FAQ", ctaTitle: "まだカメラをお持ちでない?", ctaSub: "ラインアップを見る — どのモデルも同じ無料アプリで動作します。", ctaButton: "ドラレコを見る" },
  de: { scanAlt: "Scannen, um die AZDOME-App zu laden", iconAlt: "AZDOME-App-Icon", phoneAlt: "AZDOME-App-Vorschau", appStoreSmall: "Laden im", appStoreBig: "App Store", googlePlaySmall: "Jetzt bei", googlePlayBig: "Google Play", featuresEyebrow: "Was du tun kannst", featuresTitle: "Die Funktionen, die du wirklich nutzt.", compatEyebrow: "Kompatibilität", compatTitle: "Jede aktuelle AZDOME-Kamera, jedes aktuelle OS.", thProduct: "Produkt", thFirmware: "Min. Firmware", thIos: "iOS", thAndroid: "Android", legacyNote: "Ältere Firmware-Versionen werden von der Legacy-AZDOME-App auf der Support-Seite unterstützt.", faqTitle: "App-Fragen, beantwortet.", faqEyebrow: "FAQ", ctaTitle: "Noch keine Kamera?", ctaSub: "Sieh dir das Sortiment an — jedes Modell läuft mit derselben kostenlosen App.", ctaButton: "Dashcams ansehen" },
  fr: { scanAlt: "Scannez pour télécharger l'app AZDOME", iconAlt: "Icône de l'app AZDOME", phoneAlt: "Aperçu de l'app AZDOME", appStoreSmall: "Téléchargez dans l'", appStoreBig: "App Store", googlePlaySmall: "Disponible sur", googlePlayBig: "Google Play", featuresEyebrow: "Ce que vous pouvez faire", featuresTitle: "Les fonctionnalités que vous utiliserez vraiment.", compatEyebrow: "Compatibilité", compatTitle: "Toutes les caméras AZDOME actuelles, sur tous les OS récents.", thProduct: "Produit", thFirmware: "Firmware min.", thIos: "iOS", thAndroid: "Android", legacyNote: "Les anciennes versions de firmware sont prises en charge par l'app AZDOME legacy disponible sur la page support.", faqTitle: "Questions sur l'app, répondues.", faqEyebrow: "FAQ", ctaTitle: "Pas encore de caméra ?", ctaSub: "Parcourez la gamme — chaque modèle fonctionne avec la même app gratuite.", ctaButton: "Voir les dashcams" },
  es: { scanAlt: "Escanea para descargar la app AZDOME", iconAlt: "Icono de la app AZDOME", phoneAlt: "Vista previa de la app AZDOME", appStoreSmall: "Descárgalo en", appStoreBig: "App Store", googlePlaySmall: "Disponible en", googlePlayBig: "Google Play", featuresEyebrow: "Lo que puedes hacer", featuresTitle: "Las funciones que vas a usar de verdad.", compatEyebrow: "Compatibilidad", compatTitle: "Cada cámara AZDOME actual, en cada OS reciente.", thProduct: "Producto", thFirmware: "Firmware mín.", thIos: "iOS", thAndroid: "Android", legacyNote: "Versiones de firmware antiguas las cubre la app AZDOME legacy disponible en la página de soporte.", faqTitle: "Preguntas sobre la app, respondidas.", faqEyebrow: "FAQ", ctaTitle: "¿Aún no tienes una cámara?", ctaSub: "Mira la gama — todos los modelos funcionan con la misma app gratuita.", ctaButton: "Ver dash cams" },
  it: { scanAlt: "Scansiona per scaricare l'app AZDOME", iconAlt: "Icona dell'app AZDOME", phoneAlt: "Anteprima dell'app AZDOME", appStoreSmall: "Scaricalo su", appStoreBig: "App Store", googlePlaySmall: "Disponibile su", googlePlayBig: "Google Play", featuresEyebrow: "Cosa puoi fare", featuresTitle: "Le funzioni che userai davvero.", compatEyebrow: "Compatibilità", compatTitle: "Tutte le telecamere AZDOME attuali, su tutti i sistemi recenti.", thProduct: "Prodotto", thFirmware: "Firmware min.", thIos: "iOS", thAndroid: "Android", legacyNote: "Le versioni firmware più vecchie sono supportate dall'app AZDOME legacy disponibile nella pagina assistenza.", faqTitle: "Domande sull'app, risposte.", faqEyebrow: "FAQ", ctaTitle: "Non hai ancora una telecamera?", ctaSub: "Sfoglia la gamma — ogni modello funziona con la stessa app gratuita.", ctaButton: "Vedi le dash cam" },
  ru: { scanAlt: "Сканируйте, чтобы скачать приложение AZDOME", iconAlt: "Иконка приложения AZDOME", phoneAlt: "Превью приложения AZDOME", appStoreSmall: "Загрузите из", appStoreBig: "App Store", googlePlaySmall: "Доступно в", googlePlayBig: "Google Play", featuresEyebrow: "Что вы можете делать", featuresTitle: "Функции, которыми вы действительно будете пользоваться.", compatEyebrow: "Совместимость", compatTitle: "Все актуальные камеры AZDOME, на всех современных ОС.", thProduct: "Продукт", thFirmware: "Мин. прошивка", thIos: "iOS", thAndroid: "Android", legacyNote: "Старые версии прошивки поддерживаются legacy-приложением AZDOME, доступным на странице поддержки.", faqTitle: "Вопросы о приложении.", faqEyebrow: "FAQ", ctaTitle: "Ещё нет камеры?", ctaSub: "Просмотрите линейку — каждая модель работает с одним и тем же бесплатным приложением.", ctaButton: "К видеорегистраторам" },
  pl: { scanAlt: "Zeskanuj, aby pobrać aplikację AZDOME", iconAlt: "Ikona aplikacji AZDOME", phoneAlt: "Podgląd aplikacji AZDOME", appStoreSmall: "Pobierz z", appStoreBig: "App Store", googlePlaySmall: "Pobierz w", googlePlayBig: "Google Play", featuresEyebrow: "Co możesz zrobić", featuresTitle: "Funkcje, których naprawdę użyjesz.", compatEyebrow: "Kompatybilność", compatTitle: "Każda aktualna kamera AZDOME na każdym współczesnym systemie.", thProduct: "Produkt", thFirmware: "Min. firmware", thIos: "iOS", thAndroid: "Android", legacyNote: "Starsze wersje firmware obsługuje legacy aplikacja AZDOME dostępna na stronie wsparcia.", faqTitle: "Pytania o aplikację — odpowiedzi.", faqEyebrow: "FAQ", ctaTitle: "Nie masz jeszcze kamery?", ctaSub: "Przejrzyj gamę — każdy model działa z tą samą darmową aplikacją.", ctaButton: "Zobacz rejestratory" },
  ro: { scanAlt: "Scanează pentru a descărca aplicația AZDOME", iconAlt: "Iconiță aplicație AZDOME", phoneAlt: "Previzualizare aplicație AZDOME", appStoreSmall: "Descarcă din", appStoreBig: "App Store", googlePlaySmall: "Disponibil pe", googlePlayBig: "Google Play", featuresEyebrow: "Ce poți face", featuresTitle: "Funcțiile pe care chiar le vei folosi.", compatEyebrow: "Compatibilitate", compatTitle: "Fiecare cameră AZDOME actuală, pe fiecare sistem recent.", thProduct: "Produs", thFirmware: "Firmware min.", thIos: "iOS", thAndroid: "Android", legacyNote: "Versiunile mai vechi de firmware sunt suportate de aplicația AZDOME legacy disponibilă pe pagina de asistență.", faqTitle: "Întrebări despre aplicație, răspunsuri.", faqEyebrow: "FAQ", ctaTitle: "Nu ai încă o cameră?", ctaSub: "Răsfoiește gama — fiecare model funcționează cu aceeași aplicație gratuită.", ctaButton: "Vezi camerele auto" },
  tr: { scanAlt: "AZDOME uygulamasını indirmek için tarayın", iconAlt: "AZDOME uygulama simgesi", phoneAlt: "AZDOME uygulama önizlemesi", appStoreSmall: "Şuradan indir:", appStoreBig: "App Store", googlePlaySmall: "Şuradan alın:", googlePlayBig: "Google Play", featuresEyebrow: "Yapabilecekleriniz", featuresTitle: "Gerçekten kullanacağınız özellikler.", compatEyebrow: "Uyumluluk", compatTitle: "Tüm güncel AZDOME kameraları, tüm güncel işletim sistemlerinde.", thProduct: "Ürün", thFirmware: "Min. yazılım", thIos: "iOS", thAndroid: "Android", legacyNote: "Eski yazılım sürümleri destek sayfasında bulunan eski AZDOME uygulaması tarafından desteklenir.", faqTitle: "Uygulama soruları, yanıtları.", faqEyebrow: "SSS", ctaTitle: "Henüz bir kameranız mı yok?", ctaSub: "Ürün serisine göz atın — her model aynı ücretsiz uygulamayla çalışır.", ctaButton: "Araç kameralarını gör" },
  pt: { scanAlt: "Escaneie para baixar o app AZDOME", iconAlt: "Ícone do app AZDOME", phoneAlt: "Prévia do app AZDOME", appStoreSmall: "Baixar na", appStoreBig: "App Store", googlePlaySmall: "Baixe no", googlePlayBig: "Google Play", featuresEyebrow: "O que você pode fazer", featuresTitle: "Os recursos que você realmente vai usar.", compatEyebrow: "Compatibilidade", compatTitle: "Todas as câmeras AZDOME atuais, em todos os SO recentes.", thProduct: "Produto", thFirmware: "Firmware mín.", thIos: "iOS", thAndroid: "Android", legacyNote: "Versões antigas de firmware são suportadas pelo app AZDOME legacy disponível na página de suporte.", faqTitle: "Dúvidas sobre o app, respondidas.", faqEyebrow: "FAQ", ctaTitle: "Ainda não tem uma câmera?", ctaSub: "Veja a linha — todos os modelos funcionam com o mesmo app gratuito.", ctaButton: "Ver câmeras" },
  ar: { scanAlt: "امسح لتنزيل تطبيق AZDOME", iconAlt: "أيقونة تطبيق AZDOME", phoneAlt: "معاينة تطبيق AZDOME", appStoreSmall: "حمّل من", appStoreBig: "App Store", googlePlaySmall: "احصل عليه من", googlePlayBig: "Google Play", featuresEyebrow: "ما يمكنك فعله", featuresTitle: "الميزات التي ستستخدمها فعلًا.", compatEyebrow: "التوافق", compatTitle: "كل كاميرات AZDOME الحالية، على كل أنظمة التشغيل الحديثة.", thProduct: "المنتج", thFirmware: "أدنى برنامج ثابت", thIos: "iOS", thAndroid: "Android", legacyNote: "الإصدارات الأقدم من البرنامج الثابت يدعمها تطبيق AZDOME القديم المتاح في صفحة الدعم.", faqTitle: "أسئلة عن التطبيق، مع الإجابات.", faqEyebrow: "الأسئلة الشائعة", ctaTitle: "ليس لديك كاميرا بعد؟", ctaSub: "تصفّح المجموعة — كل طراز يعمل بنفس التطبيق المجاني.", ctaButton: "تسوّق كاميرات السيارة" },
  th: { scanAlt: "สแกนเพื่อดาวน์โหลดแอป AZDOME", iconAlt: "ไอคอนแอป AZDOME", phoneAlt: "ตัวอย่างแอป AZDOME", appStoreSmall: "ดาวน์โหลดบน", appStoreBig: "App Store", googlePlaySmall: "ดาวน์โหลดได้บน", googlePlayBig: "Google Play", featuresEyebrow: "สิ่งที่คุณทำได้", featuresTitle: "ฟีเจอร์ที่คุณจะได้ใช้จริง", compatEyebrow: "ความเข้ากันได้", compatTitle: "กล้อง AZDOME ทุกรุ่นปัจจุบัน บนระบบปฏิบัติการล่าสุด", thProduct: "สินค้า", thFirmware: "เฟิร์มแวร์ขั้นต่ำ", thIos: "iOS", thAndroid: "Android", legacyNote: "เฟิร์มแวร์เวอร์ชั่นเก่ารองรับโดยแอป AZDOME เวอร์ชั่นเดิมที่หาได้ในหน้าสนับสนุน", faqTitle: "คำถามเกี่ยวกับแอป พร้อมคำตอบ", faqEyebrow: "FAQ", ctaTitle: "ยังไม่มีกล้องใช่ไหม?", ctaSub: "เลือกชมสินค้า — ทุกรุ่นใช้แอปฟรีตัวเดียวกัน", ctaButton: "ดูกล้องติดรถยนต์" },
  vi: { scanAlt: "Quét để tải ứng dụng AZDOME", iconAlt: "Biểu tượng ứng dụng AZDOME", phoneAlt: "Xem trước ứng dụng AZDOME", appStoreSmall: "Tải về từ", appStoreBig: "App Store", googlePlaySmall: "Tải về trên", googlePlayBig: "Google Play", featuresEyebrow: "Bạn có thể làm gì", featuresTitle: "Những tính năng bạn thực sự sẽ dùng.", compatEyebrow: "Khả năng tương thích", compatTitle: "Mọi camera AZDOME hiện tại, trên mọi hệ điều hành gần đây.", thProduct: "Sản phẩm", thFirmware: "Firmware tối thiểu", thIos: "iOS", thAndroid: "Android", legacyNote: "Các phiên bản firmware cũ được hỗ trợ bởi ứng dụng AZDOME legacy có trên trang hỗ trợ.", faqTitle: "Câu hỏi về ứng dụng, đã trả lời.", faqEyebrow: "FAQ", ctaTitle: "Chưa có camera?", ctaSub: "Xem các sản phẩm — mọi mẫu đều dùng chung một ứng dụng miễn phí.", ctaButton: "Xem camera hành trình" },
};

export default function AppPageClient({
  content, download, compatibility, qrUrl, iconUrl, phoneUrl,
}: {
  content: AppPageContent;
  download: AppDownload;
  compatibility: AppCompatRow[];
  qrUrl: string;
  iconUrl: string;
  phoneUrl: string;
}) {
  const { locale } = useLocale();
  const t = COPY[locale] ?? COPY.en!;
  const FEATURES = content.features.filter((f) => !f.hidden);
  const FAQ = content.faq.filter((f) => !f.hidden);

  return (
    <main className="bg-white">
      {/* QR-driven download hero */}
      <section className="bg-slate-50">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-6 pb-20 pt-32 md:pb-28 md:pt-40 lg:grid-cols-2 lg:px-10">
          <div>
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
              {download.eyebrow}
            </p>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
              {download.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-500 md:text-lg">
              {download.subtitle}
            </p>

            {download.rating && (
              <div className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span>{download.rating}</span>
              </div>
            )}

            <div className="mt-8 inline-flex flex-wrap items-center gap-6 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100 md:p-6">
              <div className="flex flex-shrink-0 flex-col items-center">
                <div className="relative h-32 w-32 overflow-hidden rounded-xl bg-slate-50 ring-1 ring-slate-100">
                  <Image src={qrUrl} alt={t.scanAlt} fill sizes="128px" className="object-contain p-2" />
                </div>
                <p className="mt-2 text-[11px] font-medium text-slate-500">{download.qrCaption}</p>
              </div>

              <div className="flex-1 space-y-3">
                {download.appIcon && (
                  <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 overflow-hidden rounded-xl bg-slate-50 ring-1 ring-slate-100">
                      <Image src={iconUrl} alt={t.iconAlt} fill sizes="40px" className="object-contain p-1" />
                    </div>
                    <p className="text-sm font-semibold tracking-tight text-slate-900">AZDOME</p>
                  </div>
                )}
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Link href={download.appStoreUrl || "#"} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-slate-800">
                    <Apple className="h-4 w-4" />
                    <span className="flex flex-col leading-tight">
                      <span className="text-[9px] opacity-70">{t.appStoreSmall}</span>
                      <span className="text-[13px]">{t.appStoreBig}</span>
                    </span>
                  </Link>
                  <Link href={download.googlePlayUrl || "#"} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-slate-800">
                    <Play className="h-4 w-4 fill-white" />
                    <span className="flex flex-col leading-tight">
                      <span className="text-[9px] opacity-70">{t.googlePlaySmall}</span>
                      <span className="text-[13px]">{t.googlePlayBig}</span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            {download.bullets.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
                {download.bullets.map((b) => (
                  <li key={b} className="inline-flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-blue-400" />
                    {b}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-sm">
            <Image src={phoneUrl} alt={t.phoneAlt} fill priority sizes="(min-width: 1024px) 40vw, 90vw" className="object-contain p-4" />
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14 max-w-2xl md:mb-20">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">{t.featuresEyebrow}</p>
            <h2 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">{t.featuresTitle}</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f) => {
              const Icon = ICONS[f.iconName] ?? Wifi;
              return (
                <div key={f.title} className="rounded-2xl bg-slate-50 p-7 shadow-sm transition-shadow duration-300 hover:shadow-md">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm"><Icon className="h-5 w-5" /></span>
                  <h3 className="mt-5 text-base font-semibold tracking-tight text-slate-900">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{f.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">{t.compatEyebrow}</p>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">{t.compatTitle}</h2>
          </div>
          <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
            <table className="w-full text-left">
              <thead className="border-b border-slate-100 bg-slate-50">
                <tr className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  <th className="px-6 py-4">{t.thProduct}</th>
                  <th className="px-6 py-4">{t.thFirmware}</th>
                  <th className="px-6 py-4">{t.thIos}</th>
                  <th className="px-6 py-4">{t.thAndroid}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {compatibility.map((r) => (
                  <tr key={r.product} className="text-slate-700">
                    <td className="px-6 py-4 font-semibold tracking-tight text-slate-900">{r.product}</td>
                    <td className="px-6 py-4 tabular-nums">{r.firmware}</td>
                    <td className="px-6 py-4">{r.ios}</td>
                    <td className="px-6 py-4">{r.android}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-slate-400">{t.legacyNote}</p>
        </div>
      </section>

      <FaqAccordion faqs={FAQ} title={t.faqTitle} eyebrow={t.faqEyebrow} />

      <section className="bg-slate-50 py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">{t.ctaTitle}</h2>
          <p className="mt-4 text-base text-slate-500 md:text-lg">{t.ctaSub}</p>
          <Link href="/collections/dash-cams" className="mt-8 inline-flex items-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700">
            {t.ctaButton}
          </Link>
        </div>
      </section>
    </main>
  );
}
