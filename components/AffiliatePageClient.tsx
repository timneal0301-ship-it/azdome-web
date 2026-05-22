"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  DollarSign,
  LineChart,
  Megaphone,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import FaqAccordion from "@/components/FaqAccordion";
import { useLocale } from "@/components/LocaleProvider";
import type { Locale } from "@/lib/i18n/dictionaries";
import type { AffiliateContent } from "@/lib/content/affiliate";

const ICONS: Record<string, LucideIcon> = { BadgeCheck, CalendarClock, DollarSign, LineChart, Megaphone, Users };

type Copy = {
  eyebrow: string; title: string; sub: string; applyCta: string;
  tiersEyebrow: string; tiersTitle: string;
  howEyebrow: string; howTitle: string; stepLabel: string;
  applyTitle: string; applySub: string;
  fName: string; fEmail: string; fChannel: string; fTraffic: string; fAbout: string; fSubmit: string;
  faqTitle: string; faqEyebrow: string;
};

const COPY: Partial<Record<Locale, Copy>> = {
  en: { eyebrow: "Affiliate Program", title: "Earn while you recommend.", sub: "Creators, automotive writers, fleet consultants, and rideshare community leaders — earn commission on every order you refer. Apply in two minutes; most decisions in under 48 hours.", applyCta: "Apply now", tiersEyebrow: "Commission tiers", tiersTitle: "Earn more as you grow with us.", howEyebrow: "How it works", howTitle: "From apply to paid in under 30 days.", stepLabel: "Step", applyTitle: "Apply", applySub: "We review every application personally — typically within 2 business days.", fName: "Your name", fEmail: "Email", fChannel: "Audience / channel URL", fTraffic: "Estimated monthly traffic", fAbout: "Tell us about your audience and how you'd promote AZDOME", fSubmit: "Submit application", faqTitle: "Frequently asked.", faqEyebrow: "FAQ" },
  zh: { eyebrow: "联盟计划", title: "推荐即赚。", sub: "创作者、汽车作者、车队顾问、网约车社群负责人 — 每一笔推荐订单都获得佣金。两分钟即可申请,大多 48 小时内有结果。", applyCta: "立即申请", tiersEyebrow: "佣金等级", tiersTitle: "与我们一同成长,佣金更高。", howEyebrow: "运作方式", howTitle: "从申请到收款,30 天内。", stepLabel: "步骤", applyTitle: "申请", applySub: "我们亲自审核每份申请 — 通常 2 个工作日内回复。", fName: "你的姓名", fEmail: "邮箱", fChannel: "受众 / 频道链接", fTraffic: "预估月流量", fAbout: "请介绍你的受众及如何推广 AZDOME", fSubmit: "提交申请", faqTitle: "常见问题。", faqEyebrow: "FAQ" },
  ja: { eyebrow: "アフィリエイトプログラム", title: "おすすめして稼ぐ。", sub: "クリエイター、自動車ライター、フリート向けコンサルタント、ライドシェアコミュニティリーダー — 紹介で発生した注文ごとに報酬を獲得できます。申請は 2 分、ほとんどは 48 時間以内に決定。", applyCta: "申請する", tiersEyebrow: "コミッション階層", tiersTitle: "成長に応じて報酬がアップ。", howEyebrow: "仕組み", howTitle: "申請から支払いまで 30 日以内。", stepLabel: "ステップ", applyTitle: "申請", applySub: "すべての申請を担当者が確認します — 通常 2 営業日以内に回答。", fName: "お名前", fEmail: "メールアドレス", fChannel: "オーディエンス / チャンネル URL", fTraffic: "月間トラフィック(推定)", fAbout: "オーディエンスと AZDOME の紹介方法を教えてください", fSubmit: "申請を送信", faqTitle: "よくある質問。", faqEyebrow: "FAQ" },
  de: { eyebrow: "Affiliate-Programm", title: "Empfehlen und verdienen.", sub: "Creators, Automotive-Autoren, Fleet-Berater und Rideshare-Community-Leader — verdienen Sie Provision auf jede Bestellung, die Sie vermitteln. Bewerbung in zwei Minuten; meist Entscheidung innerhalb von 48 Stunden.", applyCta: "Jetzt bewerben", tiersEyebrow: "Provisionsstufen", tiersTitle: "Verdienen Sie mehr, wenn Sie mit uns wachsen.", howEyebrow: "So funktioniert's", howTitle: "Von der Bewerbung zur Auszahlung in unter 30 Tagen.", stepLabel: "Schritt", applyTitle: "Bewerbung", applySub: "Wir prüfen jede Bewerbung persönlich — meist innerhalb von 2 Werktagen.", fName: "Ihr Name", fEmail: "E-Mail", fChannel: "Zielgruppe / Kanal-URL", fTraffic: "Geschätzter monatlicher Traffic", fAbout: "Beschreiben Sie Ihre Zielgruppe und wie Sie AZDOME bewerben würden", fSubmit: "Bewerbung absenden", faqTitle: "Häufig gefragt.", faqEyebrow: "FAQ" },
  fr: { eyebrow: "Programme d'affiliation", title: "Gagnez en recommandant.", sub: "Créateurs, rédacteurs automobile, consultants flottes et leaders de communautés VTC — gagnez une commission sur chaque commande référée. Candidature en deux minutes ; la plupart des décisions en moins de 48 heures.", applyCta: "Postuler", tiersEyebrow: "Paliers de commission", tiersTitle: "Gagnez plus en grandissant avec nous.", howEyebrow: "Comment ça marche", howTitle: "De la candidature au paiement en moins de 30 jours.", stepLabel: "Étape", applyTitle: "Postuler", applySub: "Nous étudions personnellement chaque candidature — généralement sous 2 jours ouvrés.", fName: "Votre nom", fEmail: "E-mail", fChannel: "URL d'audience / chaîne", fTraffic: "Trafic mensuel estimé", fAbout: "Parlez-nous de votre audience et de la façon dont vous promouvriez AZDOME", fSubmit: "Envoyer la candidature", faqTitle: "Questions fréquentes.", faqEyebrow: "FAQ" },
  es: { eyebrow: "Programa de afiliados", title: "Gana recomendando.", sub: "Creadores, periodistas del motor, consultores de flotas y líderes de comunidades VTC — gana comisión en cada pedido que recomiendes. Solicitud en dos minutos; la mayoría de decisiones en menos de 48 horas.", applyCta: "Solicitar ahora", tiersEyebrow: "Niveles de comisión", tiersTitle: "Gana más conforme creces con nosotros.", howEyebrow: "Cómo funciona", howTitle: "De solicitar a cobrar en menos de 30 días.", stepLabel: "Paso", applyTitle: "Solicita", applySub: "Revisamos cada solicitud personalmente — normalmente en 2 días laborables.", fName: "Tu nombre", fEmail: "Correo electrónico", fChannel: "URL de audiencia / canal", fTraffic: "Tráfico mensual estimado", fAbout: "Cuéntanos sobre tu audiencia y cómo promocionarías AZDOME", fSubmit: "Enviar solicitud", faqTitle: "Preguntas frecuentes.", faqEyebrow: "FAQ" },
  it: { eyebrow: "Programma di affiliazione", title: "Guadagna mentre consigli.", sub: "Creator, giornalisti automotive, consulenti flotte e leader di community NCC — guadagna commissione su ogni ordine referente. Candidatura in due minuti; la maggior parte delle decisioni in 48 ore.", applyCta: "Candidati", tiersEyebrow: "Fasce di commissione", tiersTitle: "Guadagna di più crescendo con noi.", howEyebrow: "Come funziona", howTitle: "Dalla candidatura al pagamento in meno di 30 giorni.", stepLabel: "Passo", applyTitle: "Candidati", applySub: "Esaminiamo ogni candidatura personalmente — di solito entro 2 giorni lavorativi.", fName: "Il tuo nome", fEmail: "Email", fChannel: "URL audience / canale", fTraffic: "Traffico mensile stimato", fAbout: "Raccontaci la tua audience e come promuoveresti AZDOME", fSubmit: "Invia candidatura", faqTitle: "Domande frequenti.", faqEyebrow: "FAQ" },
  ru: { eyebrow: "Партнёрская программа", title: "Зарабатывайте на рекомендациях.", sub: "Создатели контента, автомобильные журналисты, консультанты автопарков и лидеры сообществ такси — получайте комиссию с каждого заказа по вашей рекомендации. Заявка за 2 минуты, решение обычно в течение 48 часов.", applyCta: "Подать заявку", tiersEyebrow: "Уровни комиссии", tiersTitle: "Растите с нами — зарабатывайте больше.", howEyebrow: "Как это работает", howTitle: "От заявки до выплаты — менее 30 дней.", stepLabel: "Шаг", applyTitle: "Заявка", applySub: "Мы рассматриваем каждую заявку лично — обычно в течение 2 рабочих дней.", fName: "Ваше имя", fEmail: "Email", fChannel: "URL аудитории / канала", fTraffic: "Оценочный месячный трафик", fAbout: "Расскажите об аудитории и как вы будете продвигать AZDOME", fSubmit: "Отправить заявку", faqTitle: "Частые вопросы.", faqEyebrow: "FAQ" },
  pl: { eyebrow: "Program partnerski", title: "Zarabiaj polecając.", sub: "Twórcy, dziennikarze motoryzacyjni, doradcy flotowi i liderzy społeczności przewozów — zarabiaj prowizję za każde polecone zamówienie. Aplikacja w 2 minuty; większość decyzji w 48 godzin.", applyCta: "Aplikuj teraz", tiersEyebrow: "Poziomy prowizji", tiersTitle: "Zarabiaj więcej, rosnąc z nami.", howEyebrow: "Jak to działa", howTitle: "Od aplikacji do wypłaty poniżej 30 dni.", stepLabel: "Krok", applyTitle: "Aplikuj", applySub: "Każdą aplikację oceniamy osobiście — zwykle w 2 dni robocze.", fName: "Twoje imię", fEmail: "Email", fChannel: "URL publiczności / kanału", fTraffic: "Szacowany miesięczny ruch", fAbout: "Opowiedz o swojej publiczności i jak promowałbyś AZDOME", fSubmit: "Wyślij aplikację", faqTitle: "Częste pytania.", faqEyebrow: "FAQ" },
  ro: { eyebrow: "Program de afiliere", title: "Câștigă recomandând.", sub: "Creatori, jurnaliști auto, consultanți de flote și lideri de comunități ride-share — câștigă comision pentru fiecare comandă referită. Aplicație în 2 minute; majoritatea deciziilor în 48 de ore.", applyCta: "Aplică acum", tiersEyebrow: "Trepte de comision", tiersTitle: "Câștigă mai mult crescând cu noi.", howEyebrow: "Cum funcționează", howTitle: "De la aplicare la plată în mai puțin de 30 de zile.", stepLabel: "Pas", applyTitle: "Aplică", applySub: "Verificăm personal fiecare aplicație — de obicei în 2 zile lucrătoare.", fName: "Numele tău", fEmail: "Email", fChannel: "URL audiență / canal", fTraffic: "Trafic lunar estimat", fAbout: "Spune-ne despre audiență și cum ai promova AZDOME", fSubmit: "Trimite aplicația", faqTitle: "Întrebări frecvente.", faqEyebrow: "FAQ" },
  tr: { eyebrow: "Ortaklık Programı", title: "Tavsiye ederek kazanın.", sub: "İçerik üreticileri, otomotiv yazarları, filo danışmanları ve taksi topluluğu liderleri — yönlendirdiğiniz her siparişten komisyon kazanın. Başvuru 2 dakika; çoğu karar 48 saatten kısa sürede.", applyCta: "Şimdi başvur", tiersEyebrow: "Komisyon kademeleri", tiersTitle: "Bizimle büyüdükçe daha çok kazanın.", howEyebrow: "Nasıl çalışır", howTitle: "Başvurudan ödemeye 30 günden kısa.", stepLabel: "Adım", applyTitle: "Başvuru", applySub: "Her başvuruyu kişisel olarak inceliyoruz — genellikle 2 iş günü içinde.", fName: "Adınız", fEmail: "E-posta", fChannel: "Kitle / kanal URL", fTraffic: "Tahmini aylık trafik", fAbout: "Kitlenizden ve AZDOME'u nasıl tanıtacağınızdan bahsedin", fSubmit: "Başvuruyu gönder", faqTitle: "Sık sorulanlar.", faqEyebrow: "SSS" },
  pt: { eyebrow: "Programa de Afiliados", title: "Ganhe ao recomendar.", sub: "Criadores, jornalistas automotivos, consultores de frotas e líderes de comunidades de motoristas — ganhe comissão em cada pedido que você referenciar. Inscrição em 2 minutos; a maioria das decisões em menos de 48 horas.", applyCta: "Inscreva-se", tiersEyebrow: "Faixas de comissão", tiersTitle: "Ganhe mais conforme cresce com a gente.", howEyebrow: "Como funciona", howTitle: "Da inscrição ao pagamento em menos de 30 dias.", stepLabel: "Passo", applyTitle: "Inscrever-se", applySub: "Avaliamos cada inscrição pessoalmente — normalmente em 2 dias úteis.", fName: "Seu nome", fEmail: "Email", fChannel: "URL de audiência / canal", fTraffic: "Tráfego mensal estimado", fAbout: "Conte sobre sua audiência e como promoveria a AZDOME", fSubmit: "Enviar inscrição", faqTitle: "Perguntas frequentes.", faqEyebrow: "FAQ" },
  ar: { eyebrow: "برنامج التسويق بالعمولة", title: "اربح بينما توصي.", sub: "صنّاع المحتوى، كتّاب السيارات، مستشارو الأساطيل، وقادة مجتمعات نقل الركاب — اكسب عمولة على كل طلب تحيله. تقديم خلال دقيقتين؛ معظم القرارات خلال 48 ساعة.", applyCta: "تقدّم الآن", tiersEyebrow: "مستويات العمولة", tiersTitle: "اكسب أكثر مع نموك معنا.", howEyebrow: "كيف يعمل", howTitle: "من التقديم إلى الدفع في أقل من 30 يومًا.", stepLabel: "خطوة", applyTitle: "تقدّم", applySub: "نراجع كل طلب شخصيًا — عادةً خلال يومَي عمل.", fName: "اسمك", fEmail: "البريد الإلكتروني", fChannel: "رابط الجمهور / القناة", fTraffic: "حركة الزوار الشهرية المقدّرة", fAbout: "أخبرنا عن جمهورك وكيف ستروّج لـ AZDOME", fSubmit: "إرسال الطلب", faqTitle: "الأسئلة الشائعة.", faqEyebrow: "الأسئلة الشائعة" },
  th: { eyebrow: "โปรแกรมพันธมิตร", title: "หาเงินขณะที่แนะนำ", sub: "ครีเอเตอร์ นักเขียนสายรถยนต์ ที่ปรึกษาฟลีท และผู้นำชุมชน Rideshare — รับค่าคอมจากทุกออเดอร์ที่คุณแนะนำ สมัครภายใน 2 นาที ส่วนใหญ่อนุมัติภายใน 48 ชั่วโมง", applyCta: "สมัครเลย", tiersEyebrow: "ระดับค่าคอมมิชชั่น", tiersTitle: "เติบโตไปกับเราพร้อมรายได้ที่เพิ่มขึ้น", howEyebrow: "วิธีการทำงาน", howTitle: "ตั้งแต่สมัครจนรับเงิน ภายใน 30 วัน", stepLabel: "ขั้นตอน", applyTitle: "สมัคร", applySub: "เราพิจารณาทุกใบสมัครด้วยตัวเอง โดยปกติภายใน 2 วันทำการ", fName: "ชื่อของคุณ", fEmail: "อีเมล", fChannel: "URL ของผู้ติดตาม / ช่องทาง", fTraffic: "Traffic ต่อเดือนโดยประมาณ", fAbout: "เล่าเกี่ยวกับผู้ติดตามและวิธีโปรโมท AZDOME ของคุณ", fSubmit: "ส่งใบสมัคร", faqTitle: "คำถามที่พบบ่อย", faqEyebrow: "FAQ" },
  vi: { eyebrow: "Chương trình liên kết", title: "Kiếm tiền khi giới thiệu.", sub: "Nhà sáng tạo, cây bút mảng ô tô, chuyên gia tư vấn đội xe và lãnh đạo cộng đồng tài xế — kiếm hoa hồng từ mỗi đơn hàng bạn giới thiệu. Đăng ký trong 2 phút; phần lớn quyết định trong 48 giờ.", applyCta: "Đăng ký ngay", tiersEyebrow: "Hạng hoa hồng", tiersTitle: "Càng phát triển cùng chúng tôi, càng kiếm nhiều.", howEyebrow: "Cách hoạt động", howTitle: "Từ đăng ký đến nhận tiền trong dưới 30 ngày.", stepLabel: "Bước", applyTitle: "Đăng ký", applySub: "Chúng tôi xem xét từng đơn cá nhân — thường trong 2 ngày làm việc.", fName: "Tên của bạn", fEmail: "Email", fChannel: "URL kênh / khán giả", fTraffic: "Lượt truy cập tháng ước tính", fAbout: "Kể về khán giả và cách bạn sẽ quảng bá AZDOME", fSubmit: "Gửi đăng ký", faqTitle: "Câu hỏi thường gặp.", faqEyebrow: "FAQ" },
};

export default function AffiliatePageClient({ content }: { content: AffiliateContent }) {
  const { locale } = useLocale();
  const t = COPY[locale] ?? COPY.en!;
  const { stats, tiers, howItWorks, faq } = content;
  return (
    <main className="bg-white">
      <section className="bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 pb-20 pt-32 text-center md:pt-40 lg:px-10">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">{t.eyebrow}</p>
          <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">{t.title}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg">{t.sub}</p>
          <Link href="#apply" className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-7 py-3 text-sm font-semibold tracking-tight text-white transition-all duration-300 hover:bg-blue-700">
            {t.applyCta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-5 px-6 md:grid-cols-4 lg:px-10">
          {stats.map((s) => {
            const Icon = ICONS[s.iconName] ?? DollarSign;
            return (
              <div key={s.label} className="rounded-2xl bg-slate-50 p-7 text-center shadow-sm">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm"><Icon className="h-5 w-5" /></span>
                <p className="mt-5 text-3xl font-bold tracking-tight text-slate-900">{s.value}</p>
                <p className="mt-1 text-sm text-slate-500">{s.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-slate-50 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14 max-w-2xl md:mb-16">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">{t.tiersEyebrow}</p>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">{t.tiersTitle}</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {tiers.map((ti, i) => {
              const highlight = i === 1;
              return (
                <div key={ti.name} className={["rounded-2xl p-8 shadow-sm transition-shadow duration-300", highlight ? "bg-slate-900 text-white shadow-md ring-2 ring-blue-600" : "bg-white text-slate-900 hover:shadow-md"].join(" ")}>
                  <p className={["text-xs font-semibold uppercase tracking-[0.18em]", highlight ? "text-blue-400" : "text-blue-600"].join(" ")}>{ti.name}</p>
                  <p className="mt-3 text-4xl font-bold tracking-tight md:text-5xl">{ti.rate}</p>
                  <p className={["mt-1 text-xs", highlight ? "text-slate-400" : "text-slate-500"].join(" ")}>{ti.threshold}</p>
                  <ul className={["mt-6 space-y-2 text-sm", highlight ? "text-slate-200" : "text-slate-600"].join(" ")}>
                    {ti.perks.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span className={["mt-1.5 h-1 w-1 flex-shrink-0 rounded-full", highlight ? "bg-blue-400" : "bg-blue-600"].join(" ")} />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14 max-w-2xl md:mb-16">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">{t.howEyebrow}</p>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">{t.howTitle}</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((s) => {
              const Icon = ICONS[s.iconName] ?? BadgeCheck;
              return (
                <div key={s.title} className="rounded-2xl bg-slate-50 p-7 shadow-sm">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm"><Icon className="h-5 w-5" /></span>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">{t.stepLabel} {s.n}</p>
                  <h3 className="mt-1 text-base font-semibold tracking-tight text-slate-900">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{s.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="apply" className="scroll-mt-28 bg-slate-50 py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-6 lg:px-10">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">{t.applyTitle}</h2>
          <p className="mt-3 text-base text-slate-500">{t.applySub}</p>
          <form className="mt-8 space-y-5">
            <input placeholder={t.fName} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15" />
            <input placeholder={t.fEmail} type="email" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15" />
            <input placeholder={t.fChannel} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15" />
            <input placeholder={t.fTraffic} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15" />
            <textarea rows={4} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15" placeholder={t.fAbout} />
            <button type="submit" className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700">{t.fSubmit}</button>
          </form>
        </div>
      </section>

      <FaqAccordion faqs={faq} title={t.faqTitle} eyebrow={t.faqEyebrow} />
    </main>
  );
}
