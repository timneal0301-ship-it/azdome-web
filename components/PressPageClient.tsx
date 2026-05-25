"use client";

import Link from "@/components/ui/Link";
import { ArrowUpRight, Download, FileText, Image as ImageIcon, Palette } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { useLocale } from "@/components/LocaleProvider";
import type { Locale } from "@/lib/i18n/dictionaries";
import type { PressContent } from "@/lib/content/press";

const ICONS: Record<string, LucideIcon> = { Palette, ImageIcon, FileText };

type Copy = {
  eyebrow: string; title: string; sub: string;
  contactPrefix: string; contactPerson: string;
  brandKitTitle: string; brandKitSub: string; download: string;
  releasesTitle: string; readFull: string;
  quotesTitle: string;
  coverageTitle: string; readArticle: string;
};

const COPY: Partial<Record<Locale, Copy>> = {
  en: { eyebrow: "Press", title: "News, releases & coverage.", sub: "For press inquiries, exclusive product previews, or executive interviews, contact our team. We reply within one business day.", contactPrefix: "Media contact:", contactPerson: "Hana Park, Head of Communications", brandKitTitle: "Brand kit", brandKitSub: "Logos, photography, executive headshots, fact sheet. Updated quarterly.", download: "Download", releasesTitle: "Recent releases", readFull: "Read full release", quotesTitle: "What the press is saying", coverageTitle: "Coverage", readArticle: "Read article" },
  zh: { eyebrow: "媒体中心", title: "新闻、发布与报道。", sub: "媒体询问、独家产品预览、或高管访谈,请联系我们的团队。一个工作日内回复。", contactPrefix: "媒体联系:", contactPerson: "Hana Park,传播负责人", brandKitTitle: "品牌素材包", brandKitSub: "Logo、摄影、高管头像、事实概况。每季度更新。", download: "下载", releasesTitle: "近期发布", readFull: "阅读完整稿件", quotesTitle: "媒体评价", coverageTitle: "媒体报道", readArticle: "阅读文章" },
  ja: { eyebrow: "プレス", title: "ニュース・リリース・掲載。", sub: "取材依頼、独占プレビュー、エグゼクティブインタビューはチームまでご連絡ください。1 営業日以内にご返信します。", contactPrefix: "メディア連絡先:", contactPerson: "Hana Park、コミュニケーション責任者", brandKitTitle: "ブランドキット", brandKitSub: "ロゴ、写真、役員ヘッドショット、ファクトシート。四半期ごとに更新。", download: "ダウンロード", releasesTitle: "最新リリース", readFull: "リリース全文を読む", quotesTitle: "メディアの声", coverageTitle: "掲載記事", readArticle: "記事を読む" },
  de: { eyebrow: "Presse", title: "News, Releases & Berichterstattung.", sub: "Für Presseanfragen, exklusive Produkt-Vorschauen oder Interviews kontaktieren Sie unser Team. Wir antworten innerhalb eines Werktags.", contactPrefix: "Medienkontakt:", contactPerson: "Hana Park, Head of Communications", brandKitTitle: "Brand Kit", brandKitSub: "Logos, Fotografie, Executive-Headshots, Factsheet. Quartalsweise aktualisiert.", download: "Herunterladen", releasesTitle: "Aktuelle Releases", readFull: "Vollständige Meldung lesen", quotesTitle: "Was die Presse sagt", coverageTitle: "Berichterstattung", readArticle: "Artikel lesen" },
  fr: { eyebrow: "Presse", title: "Actualités, communiqués & couverture.", sub: "Pour les demandes presse, avant-premières exclusives ou interviews de la direction, contactez notre équipe. Nous répondons sous un jour ouvré.", contactPrefix: "Contact médias :", contactPerson: "Hana Park, responsable communication", brandKitTitle: "Kit de marque", brandKitSub: "Logos, photographie, portraits dirigeants, fiche d'information. Mis à jour chaque trimestre.", download: "Télécharger", releasesTitle: "Communiqués récents", readFull: "Lire le communiqué complet", quotesTitle: "Ce que la presse en dit", coverageTitle: "Couverture", readArticle: "Lire l'article" },
  es: { eyebrow: "Prensa", title: "Noticias, comunicados y cobertura.", sub: "Para consultas de prensa, presentaciones exclusivas o entrevistas a directivos, contacta con nuestro equipo. Respondemos en un día laborable.", contactPrefix: "Contacto de medios:", contactPerson: "Hana Park, responsable de comunicación", brandKitTitle: "Kit de marca", brandKitSub: "Logos, fotografía, retratos de directivos, ficha técnica. Actualizado cada trimestre.", download: "Descargar", releasesTitle: "Comunicados recientes", readFull: "Leer comunicado completo", quotesTitle: "Lo que dice la prensa", coverageTitle: "Cobertura", readArticle: "Leer artículo" },
  it: { eyebrow: "Stampa", title: "Notizie, comunicati e copertura.", sub: "Per richieste stampa, anteprime esclusive o interviste ai dirigenti, contatta il nostro team. Rispondiamo entro un giorno lavorativo.", contactPrefix: "Contatto stampa:", contactPerson: "Hana Park, Head of Communications", brandKitTitle: "Brand kit", brandKitSub: "Logo, fotografia, headshot dei dirigenti, scheda informativa. Aggiornato trimestralmente.", download: "Scarica", releasesTitle: "Comunicati recenti", readFull: "Leggi il comunicato completo", quotesTitle: "Cosa dice la stampa", coverageTitle: "Rassegna", readArticle: "Leggi l'articolo" },
  ru: { eyebrow: "Пресса", title: "Новости, релизы и публикации.", sub: "По вопросам прессы, эксклюзивным предпоказам или интервью руководства — обращайтесь к нашей команде. Отвечаем в течение одного рабочего дня.", contactPrefix: "Контакт для СМИ:", contactPerson: "Хана Парк, руководитель коммуникаций", brandKitTitle: "Брендбук", brandKitSub: "Логотипы, фотографии, портреты руководителей, факт-лист. Обновляется ежеквартально.", download: "Скачать", releasesTitle: "Последние релизы", readFull: "Читать релиз полностью", quotesTitle: "Что говорит пресса", coverageTitle: "Публикации", readArticle: "Читать статью" },
  pl: { eyebrow: "Prasa", title: "Wiadomości, komunikaty i artykuły.", sub: "W sprawach prasowych, ekskluzywnych zapowiedzi lub wywiadów z kierownictwem — skontaktuj się z naszym zespołem. Odpowiadamy w ciągu jednego dnia roboczego.", contactPrefix: "Kontakt medialny:", contactPerson: "Hana Park, Head of Communications", brandKitTitle: "Brand kit", brandKitSub: "Loga, zdjęcia, portrety kierownictwa, fact sheet. Aktualizowane co kwartał.", download: "Pobierz", releasesTitle: "Ostatnie komunikaty", readFull: "Przeczytaj cały komunikat", quotesTitle: "Co mówi prasa", coverageTitle: "Publikacje", readArticle: "Przeczytaj artykuł" },
  ro: { eyebrow: "Presă", title: "Știri, comunicate și acoperire.", sub: "Pentru solicitări de presă, prezentări exclusive de produs sau interviuri cu directorii, contactați echipa noastră. Răspundem într-o zi lucrătoare.", contactPrefix: "Contact presă:", contactPerson: "Hana Park, Head of Communications", brandKitTitle: "Brand kit", brandKitSub: "Logo-uri, fotografii, headshot-uri directori, fișă informativă. Actualizat trimestrial.", download: "Descarcă", releasesTitle: "Comunicate recente", readFull: "Citește comunicatul integral", quotesTitle: "Ce spune presa", coverageTitle: "Acoperire", readArticle: "Citește articolul" },
  tr: { eyebrow: "Basın", title: "Haberler, bültenler ve haberler.", sub: "Basın talepleri, özel ürün önizlemeleri veya yönetici röportajları için ekibimizle iletişime geçin. Bir iş günü içinde yanıt veriyoruz.", contactPrefix: "Basın iletişimi:", contactPerson: "Hana Park, İletişim Direktörü", brandKitTitle: "Marka kiti", brandKitSub: "Logolar, fotoğraflar, yönetici portreleri, künye. Üç ayda bir güncellenir.", download: "İndir", releasesTitle: "Son bültenler", readFull: "Tam bülteni oku", quotesTitle: "Basın ne diyor", coverageTitle: "Yer alan haberler", readArticle: "Makaleyi oku" },
  pt: { eyebrow: "Imprensa", title: "Notícias, releases e coberturas.", sub: "Para solicitações de imprensa, prévias exclusivas ou entrevistas com executivos, fale com nosso time. Respondemos em um dia útil.", contactPrefix: "Contato de imprensa:", contactPerson: "Hana Park, Head de Comunicação", brandKitTitle: "Brand kit", brandKitSub: "Logos, fotografias, retratos de executivos, fact sheet. Atualizado trimestralmente.", download: "Baixar", releasesTitle: "Releases recentes", readFull: "Ler release completo", quotesTitle: "O que a imprensa diz", coverageTitle: "Cobertura", readArticle: "Ler matéria" },
  ar: { eyebrow: "الصحافة", title: "أخبار، بيانات وتغطيات.", sub: "للاستفسارات الصحفية، أو معاينات المنتجات الحصرية، أو مقابلات الإدارة، تواصل مع فريقنا. نرد خلال يوم عمل واحد.", contactPrefix: "تواصل الإعلام:", contactPerson: "Hana Park، رئيسة الاتصال", brandKitTitle: "حقيبة العلامة التجارية", brandKitSub: "الشعارات والصور وصور الإدارة وورقة المعلومات. يتم التحديث كل ثلاثة أشهر.", download: "تنزيل", releasesTitle: "أحدث البيانات", readFull: "اقرأ البيان كاملًا", quotesTitle: "ماذا تقول الصحافة", coverageTitle: "التغطيات", readArticle: "اقرأ المقال" },
  th: { eyebrow: "สื่อมวลชน", title: "ข่าวสาร, ข่าวเผยแพร่ และคอลัมน์", sub: "สำหรับการสอบถามจากสื่อ ดูตัวอย่างผลิตภัณฑ์เฉพาะ หรือสัมภาษณ์ผู้บริหาร ติดต่อทีมเรา ตอบกลับภายใน 1 วันทำการ", contactPrefix: "ติดต่อสื่อ:", contactPerson: "Hana Park, หัวหน้าฝ่ายสื่อสาร", brandKitTitle: "ชุดแบรนด์", brandKitSub: "โลโก้ ภาพถ่าย รูปผู้บริหาร แฟ้มข้อมูล อัปเดตทุกไตรมาส", download: "ดาวน์โหลด", releasesTitle: "ข่าวเผยแพร่ล่าสุด", readFull: "อ่านข่าวฉบับเต็ม", quotesTitle: "สื่อพูดว่าอย่างไร", coverageTitle: "การรายงาน", readArticle: "อ่านบทความ" },
  vi: { eyebrow: "Báo chí", title: "Tin tức, thông cáo & đăng tải.", sub: "Để hỏi báo chí, xem trước độc quyền sản phẩm hoặc phỏng vấn lãnh đạo, liên hệ với đội ngũ chúng tôi. Phản hồi trong 1 ngày làm việc.", contactPrefix: "Liên hệ truyền thông:", contactPerson: "Hana Park, Giám đốc Truyền thông", brandKitTitle: "Bộ nhận diện", brandKitSub: "Logo, hình ảnh, chân dung lãnh đạo, tờ thông tin. Cập nhật mỗi quý.", download: "Tải về", releasesTitle: "Thông cáo gần đây", readFull: "Đọc thông cáo đầy đủ", quotesTitle: "Báo chí nói gì", coverageTitle: "Bài viết", readArticle: "Đọc bài" },
};

export default function PressPageClient({ content }: { content: PressContent }) {
  const { locale } = useLocale();
  const t = COPY[locale] ?? COPY.en!;
  const { releases, coverage, quotes, kit } = content;
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-5xl px-6 pb-24 pt-32 md:pt-40 lg:px-10">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">{t.eyebrow}</p>
        <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">{t.title}</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg">{t.sub}</p>
        <p className="mt-3 text-sm text-slate-500">
          {t.contactPrefix}{" "}
          <a href="mailto:press@azdome.com" className="font-medium text-blue-600 hover:text-blue-700">press@azdome.com</a>{" "}· {t.contactPerson}
        </p>

        <section className="mt-12 rounded-2xl bg-slate-50 p-7 shadow-sm md:p-10">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">{t.brandKitTitle}</h2>
          <p className="mt-2 text-sm text-slate-500">{t.brandKitSub}</p>
          <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {kit.map((k) => {
              const Icon = ICONS[k.iconName] ?? FileText;
              return (
                <li key={k.title}>
                  <Link href="#" className="group flex h-full flex-col rounded-xl bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600"><Icon className="h-5 w-5" /></span>
                    <p className="mt-4 text-sm font-semibold tracking-tight text-slate-900">{k.title}</p>
                    <p className="mt-1 text-xs text-slate-500">{k.detail}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-blue-600">{t.download}<Download className="h-3.5 w-3.5" /></span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">{t.releasesTitle}</h2>
          <ul className="mt-6 divide-y divide-slate-100">
            {releases.map((r) => (
              <li key={r.title} className="py-8">
                <p className="text-xs uppercase tracking-[0.14em] text-slate-400">{r.date}</p>
                <Link href="#" className="mt-2 block text-xl font-semibold tracking-tight text-slate-900 hover:text-blue-600 md:text-2xl">{r.title}</Link>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-slate-700 md:text-base">{r.excerpt}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">{r.body}</p>
                <Link href="#" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600">{t.readFull}<ArrowUpRight className="h-3.5 w-3.5" /></Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">{t.quotesTitle}</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
            {quotes.map((q) => (
              <figure key={q.outlet} className="rounded-2xl bg-slate-50 p-7 shadow-sm">
                <blockquote className="text-sm leading-relaxed text-slate-700">&ldquo;{q.quote}&rdquo;</blockquote>
                <figcaption className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">{q.outlet}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">{t.coverageTitle}</h2>
          <ul className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            {coverage.map((c) => (
              <li key={c.title}>
                <Link href={c.href} className="group flex h-full flex-col rounded-2xl bg-slate-50 p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">{c.outlet}</p>
                  <p className="mt-3 flex-1 text-base font-semibold tracking-tight text-slate-900">{c.title}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-slate-500 transition-colors duration-300 group-hover:text-slate-900">{t.readArticle}<ArrowUpRight className="h-3.5 w-3.5" /></span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
