"use client";

import Link from "next/link";
import { BookOpen, Languages } from "lucide-react";

import ManualsList from "@/components/ManualsList";
import { useLocale } from "@/components/LocaleProvider";
import type { Locale } from "@/lib/i18n/dictionaries";
import type { Manual } from "@/lib/downloads";
import type { ProductDetail } from "@/lib/products";

type Copy = {
  eyebrow: string;
  title: string;
  sub: (n: number) => string;
  langBadge: (n: number) => string;
  needTranslationTitle: string;
  needTranslationPrefix: string;
  needTranslationSuffix: string;
  firmwareCta: string;
};

const COPY: Partial<Record<Locale, Copy>> = {
  en: { eyebrow: "User Manuals", title: "Every camera. Every language we ship.", sub: (n) => `Branded PDF manuals for every current model, available in up to ${n} languages. Includes installation, app pairing, voice control, parking-mode setup, and full specifications.`, langBadge: (n) => `${n} languages available · all PDFs are accessibility-tagged`, needTranslationTitle: "Need a translation that isn't listed?", needTranslationPrefix: "Email", needTranslationSuffix: "with your model and language. We typically deliver within 5 business days.", firmwareCta: "Looking for firmware?" },
  zh: { eyebrow: "用户说明书", title: "覆盖每台摄像头,我们发货的每种语言。", sub: (n) => `每个在售型号都有品牌 PDF 说明书,最多支持 ${n} 种语言。包含安装、App 配对、语音控制、停车监控设置以及完整规格。`, langBadge: (n) => `提供 ${n} 种语言 · 所有 PDF 均带无障碍标签`, needTranslationTitle: "需要的语言不在列表里?", needTranslationPrefix: "邮件至", needTranslationSuffix: "并附上型号和所需语言。我们通常 5 个工作日内交付。", firmwareCta: "找固件?" },
  ja: { eyebrow: "取扱説明書", title: "すべてのカメラ。出荷するすべての言語。", sub: (n) => `現行モデル全てに、最大 ${n} 言語のブランド PDF マニュアルをご用意。取り付け、アプリペアリング、音声操作、駐車監視設定、完全仕様を網羅。`, langBadge: (n) => `${n} 言語対応 · すべての PDF はアクセシビリティタグ付き`, needTranslationTitle: "リストにない言語が必要?", needTranslationPrefix: "メール:", needTranslationSuffix: "に機種と必要な言語をお知らせください。通常 5 営業日以内にお届けします。", firmwareCta: "ファームウェアをお探し?" },
  de: { eyebrow: "Bedienungsanleitungen", title: "Jede Kamera. Jede Sprache, die wir liefern.", sub: (n) => `Branded PDF-Anleitungen für jedes aktuelle Modell, in bis zu ${n} Sprachen. Inklusive Installation, App-Pairing, Sprachsteuerung, Parkmodus-Setup und vollständige Spezifikationen.`, langBadge: (n) => `${n} Sprachen verfügbar · alle PDFs sind barrierefrei getaggt`, needTranslationTitle: "Übersetzung nicht in der Liste?", needTranslationPrefix: "E-Mail an", needTranslationSuffix: "mit Modell und Sprache. Wir liefern in der Regel innerhalb von 5 Werktagen.", firmwareCta: "Suchen Sie Firmware?" },
  fr: { eyebrow: "Manuels d'utilisation", title: "Toutes les caméras. Toutes les langues que nous livrons.", sub: (n) => `Manuels PDF brandés pour chaque modèle actuel, dans jusqu'à ${n} langues. Comprend installation, appairage de l'app, contrôle vocal, mode parking et spécifications complètes.`, langBadge: (n) => `${n} langues disponibles · tous les PDF sont étiquetés accessibilité`, needTranslationTitle: "Besoin d'une traduction qui n'est pas listée ?", needTranslationPrefix: "E-mail à", needTranslationSuffix: "avec le modèle et la langue. Nous livrons en général sous 5 jours ouvrés.", firmwareCta: "Vous cherchez le firmware ?" },
  es: { eyebrow: "Manuales de usuario", title: "Cada cámara. Cada idioma en el que enviamos.", sub: (n) => `Manuales PDF de marca para cada modelo actual, en hasta ${n} idiomas. Incluye instalación, emparejamiento con la app, control por voz, configuración del modo aparcamiento y especificaciones completas.`, langBadge: (n) => `${n} idiomas disponibles · todos los PDF están etiquetados con accesibilidad`, needTranslationTitle: "¿Necesitas una traducción que no está listada?", needTranslationPrefix: "Escribe a", needTranslationSuffix: "con tu modelo y el idioma. Solemos entregar en 5 días laborables.", firmwareCta: "¿Buscas firmware?" },
  it: { eyebrow: "Manuali utente", title: "Ogni telecamera. Ogni lingua che spediamo.", sub: (n) => `Manuali PDF brandizzati per ogni modello attuale, in fino a ${n} lingue. Include installazione, abbinamento app, comandi vocali, modalità parcheggio e specifiche complete.`, langBadge: (n) => `${n} lingue disponibili · tutti i PDF sono accessibility-tagged`, needTranslationTitle: "Serve una traduzione non elencata?", needTranslationPrefix: "Email a", needTranslationSuffix: "con modello e lingua. Di solito consegniamo entro 5 giorni lavorativi.", firmwareCta: "Cerchi il firmware?" },
  ru: { eyebrow: "Руководства пользователя", title: "Каждая камера. Каждый язык, в который мы отгружаем.", sub: (n) => `Брендированные PDF-руководства для каждой актуальной модели, до ${n} языков. Включают установку, привязку приложения, голосовое управление, настройку парковочного режима и полные спецификации.`, langBadge: (n) => `${n} языков доступно · все PDF размечены для доступности`, needTranslationTitle: "Нужен язык, которого нет в списке?", needTranslationPrefix: "Напишите на", needTranslationSuffix: "с указанием модели и языка. Обычно отправляем в течение 5 рабочих дней.", firmwareCta: "Ищете прошивку?" },
  pl: { eyebrow: "Instrukcje obsługi", title: "Każda kamera. Każdy język, do którego wysyłamy.", sub: (n) => `Brandowane PDF-y dla każdego aktualnego modelu, w maks. ${n} językach. Obejmują montaż, parowanie aplikacji, sterowanie głosem, tryb parkowania i pełną specyfikację.`, langBadge: (n) => `${n} języków dostępnych · wszystkie PDF z tagami dostępności`, needTranslationTitle: "Brakuje tłumaczenia?", needTranslationPrefix: "Napisz na", needTranslationSuffix: "z modelem i językiem. Zwykle dostarczamy w 5 dni roboczych.", firmwareCta: "Szukasz firmware?" },
  ro: { eyebrow: "Manuale de utilizare", title: "Fiecare cameră. Fiecare limbă în care livrăm.", sub: (n) => `Manuale PDF brand-uite pentru fiecare model curent, în până la ${n} limbi. Include instalare, asociere aplicație, control vocal, modul parcare și specificații complete.`, langBadge: (n) => `${n} limbi disponibile · toate PDF-urile sunt marcate pentru accesibilitate`, needTranslationTitle: "Ai nevoie de o traducere care nu este listată?", needTranslationPrefix: "Email la", needTranslationSuffix: "cu modelul și limba. De obicei livrăm în 5 zile lucrătoare.", firmwareCta: "Cauți firmware?" },
  tr: { eyebrow: "Kullanım Kılavuzları", title: "Her kamera. Gönderdiğimiz her dil.", sub: (n) => `Tüm güncel modeller için en fazla ${n} dilde markalı PDF kılavuzlar. Kurulum, uygulama eşleştirme, sesli kontrol, park modu kurulumu ve tam teknik özellikler dahil.`, langBadge: (n) => `${n} dil mevcut · tüm PDF'ler erişilebilirlik etiketli`, needTranslationTitle: "Listede olmayan bir çeviriye mi ihtiyacınız var?", needTranslationPrefix: "E-posta:", needTranslationSuffix: "modeliniz ve dilinizle. Genellikle 5 iş günü içinde teslim ederiz.", firmwareCta: "Yazılım mı arıyorsunuz?" },
  pt: { eyebrow: "Manuais do usuário", title: "Toda câmera. Todos os idiomas que enviamos.", sub: (n) => `Manuais PDF com a marca para cada modelo atual, em até ${n} idiomas. Inclui instalação, pareamento com app, controle por voz, configuração do modo estacionamento e especificações completas.`, langBadge: (n) => `${n} idiomas disponíveis · todos os PDFs com tags de acessibilidade`, needTranslationTitle: "Precisa de uma tradução fora da lista?", needTranslationPrefix: "Envie email para", needTranslationSuffix: "com seu modelo e idioma. Em geral entregamos em 5 dias úteis.", firmwareCta: "Procurando firmware?" },
  ar: { eyebrow: "أدلة المستخدم", title: "كل كاميرا. كل لغة نشحن بها.", sub: (n) => `أدلة PDF تحمل العلامة لكل طراز حالي، بما يصل إلى ${n} لغة. تشمل التركيب، إقران التطبيق، التحكم الصوتي، إعداد وضع الوقوف، والمواصفات الكاملة.`, langBadge: (n) => `${n} لغة متوفرة · جميع ملفات PDF موسومة لإمكانية الوصول`, needTranslationTitle: "تحتاج لغة غير مدرجة؟", needTranslationPrefix: "راسلنا على", needTranslationSuffix: "مع الطراز واللغة. عادةً نسلّم خلال 5 أيام عمل.", firmwareCta: "تبحث عن البرنامج الثابت؟" },
  th: { eyebrow: "คู่มือผู้ใช้", title: "ทุกกล้อง ทุกภาษาที่เราจัดส่ง", sub: (n) => `คู่มือ PDF แบรนด์สำหรับทุกรุ่นปัจจุบัน รองรับสูงสุด ${n} ภาษา รวมการติดตั้ง การจับคู่กับแอป สั่งงานด้วยเสียง ตั้งค่าโหมดจอด และข้อมูลจำเพาะทั้งหมด`, langBadge: (n) => `รองรับ ${n} ภาษา · PDF ทุกไฟล์มีแท็กรองรับการเข้าถึง`, needTranslationTitle: "ต้องการคำแปลที่ไม่อยู่ในรายการ?", needTranslationPrefix: "ส่งอีเมลถึง", needTranslationSuffix: "พร้อมรุ่นและภาษาที่ต้องการ ปกติเราส่งภายใน 5 วันทำการ", firmwareCta: "กำลังหาเฟิร์มแวร์?" },
  vi: { eyebrow: "Hướng dẫn sử dụng", title: "Mọi camera. Mọi ngôn ngữ chúng tôi giao.", sub: (n) => `Tài liệu PDF có thương hiệu cho mọi mẫu hiện tại, hỗ trợ tối đa ${n} ngôn ngữ. Gồm lắp đặt, ghép cặp với ứng dụng, điều khiển giọng nói, thiết lập chế độ đậu xe và thông số đầy đủ.`, langBadge: (n) => `${n} ngôn ngữ khả dụng · mọi PDF đều có thẻ accessibility`, needTranslationTitle: "Cần ngôn ngữ chưa có trong danh sách?", needTranslationPrefix: "Gửi email tới", needTranslationSuffix: "với mẫu máy và ngôn ngữ. Chúng tôi thường gửi trong 5 ngày làm việc.", firmwareCta: "Tìm firmware?" },
};

export default function ManualsPageClient({
  entries,
  languageCount,
}: {
  entries: { manual: Manual; product: ProductDetail }[];
  languageCount: number;
}) {
  const { locale } = useLocale();
  const t = COPY[locale] ?? COPY.en!;

  return (
    <main className="bg-white">
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 pb-12 pt-32 md:pt-40 lg:px-10">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            {t.eyebrow}
          </p>
          <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            {t.title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg">
            {t.sub(languageCount)}
          </p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
            <Languages className="h-3.5 w-3.5 text-blue-600" />
            {t.langBadge(languageCount)}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <ManualsList entries={entries} />
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50 py-16">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <BookOpen className="mx-auto h-8 w-8 text-blue-600" />
          <h2 className="mt-5 text-balance text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
            {t.needTranslationTitle}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-slate-500">
            {t.needTranslationPrefix}{" "}
            <a href="mailto:support@azdome.com" className="font-semibold text-blue-600 hover:text-blue-700">
              support@azdome.com
            </a>{" "}
            {t.needTranslationSuffix}
          </p>
          <Link
            href="/support/firmware"
            className="mt-7 inline-flex items-center gap-1 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold tracking-tight text-white transition-colors duration-300 hover:bg-slate-800"
          >
            {t.firmwareCta}
          </Link>
        </div>
      </section>
    </main>
  );
}
