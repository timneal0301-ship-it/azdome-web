"use client";

import Link from "@/components/ui/Link";
import {
  ArrowRight, BookOpen, HeartPulse, MapPin, PiggyBank, Plane, Sparkles, Users, Wifi,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { useLocale } from "@/components/LocaleProvider";
import type { Locale } from "@/lib/i18n/dictionaries";
import type { CareersContent } from "@/lib/content/careers";

const ICONS: Record<string, LucideIcon> = { Sparkles, Users, BookOpen, HeartPulse, PiggyBank, Plane, Wifi };

type Copy = {
  eyebrow: string; title: string; sub: string;
  valuesEyebrow: string; valuesTitle: string;
  benefitsEyebrow: string; benefitsTitle: string;
  processEyebrow: string; processTitle: string;
  openRolesEyebrow: string; openRolesTitle: string; teamsHiring: (n: number) => string;
  noSee: string; viewRole: string;
};

const COPY: Partial<Record<Locale, Copy>> = {
  en: { eyebrow: "Careers", title: "Help us build cameras drivers can trust.", sub: "We're a small, intentional team — 84 people across San Francisco, Shenzhen, and Dublin. Engineers, designers, and operators who care deeply about a product that matters in the moments it's used.", valuesEyebrow: "How we work", valuesTitle: "Three things we actually mean.", benefitsEyebrow: "Benefits", benefitsTitle: "The basics, done well.", processEyebrow: "Hiring process", processTitle: "Five steps. About three weeks, end to end.", openRolesEyebrow: "Open roles", openRolesTitle: "We're hiring across", teamsHiring: (n) => `${n} teams.`, noSee: "Don't see your role?", viewRole: "View role" },
  zh: { eyebrow: "招聘", title: "和我们一起,打造车主可以信赖的摄像头。", sub: "我们是一支小而专注的团队 — 84 人,分布在旧金山、深圳和都柏林。工程师、设计师、运营人员 — 他们关心一个在关键时刻真正有用的产品。", valuesEyebrow: "工作方式", valuesTitle: "我们真心在意的三件事。", benefitsEyebrow: "员工福利", benefitsTitle: "基础该有的,我们做得扎实。", processEyebrow: "招聘流程", processTitle: "5 步走完,首尾约 3 周。", openRolesEyebrow: "开放岗位", openRolesTitle: "正在招聘的团队 ·", teamsHiring: (n) => `${n} 个`, noSee: "没看到合适岗位?", viewRole: "查看职位" },
  ja: { eyebrow: "採用", title: "ドライバーが信頼できるカメラを一緒に作りませんか。", sub: "サンフランシスコ、深圳、ダブリンの 84 名の少数精鋭チーム。エンジニア、デザイナー、オペレーター — いざというときに役立つ製品にこだわっています。", valuesEyebrow: "私たちの働き方", valuesTitle: "本気で守っている 3 つのこと。", benefitsEyebrow: "福利厚生", benefitsTitle: "基本を、しっかりと。", processEyebrow: "選考プロセス", processTitle: "5 ステップ。最初から最後まで約 3 週間。", openRolesEyebrow: "募集職種", openRolesTitle: "募集中チーム数 ·", teamsHiring: (n) => `${n} チーム`, noSee: "ご希望の役職が見つからない?", viewRole: "詳細を見る" },
  de: { eyebrow: "Karriere", title: "Hilf uns, Kameras zu bauen, denen Fahrer vertrauen können.", sub: "Wir sind ein kleines, bewusstes Team — 84 Menschen in San Francisco, Shenzhen und Dublin. Ingenieure, Designer und Operations, denen das Produkt im entscheidenden Moment wirklich am Herzen liegt.", valuesEyebrow: "So arbeiten wir", valuesTitle: "Drei Dinge, die wir wirklich meinen.", benefitsEyebrow: "Benefits", benefitsTitle: "Die Basics, ordentlich umgesetzt.", processEyebrow: "Einstellungsprozess", processTitle: "Fünf Schritte. Etwa drei Wochen vom Start bis zum Ende.", openRolesEyebrow: "Offene Stellen", openRolesTitle: "Wir stellen in", teamsHiring: (n) => `${n} Teams ein.`, noSee: "Passende Rolle nicht dabei?", viewRole: "Stelle ansehen" },
  fr: { eyebrow: "Carrières", title: "Aidez-nous à construire des caméras dignes de confiance.", sub: "Nous sommes une petite équipe choisie — 84 personnes entre San Francisco, Shenzhen et Dublin. Ingénieurs, designers et opérations qui prennent à cœur un produit qui compte au moment où on en a besoin.", valuesEyebrow: "Notre façon de travailler", valuesTitle: "Trois choses que nous pensons vraiment.", benefitsEyebrow: "Avantages", benefitsTitle: "Les fondamentaux, bien faits.", processEyebrow: "Processus de recrutement", processTitle: "Cinq étapes. Environ trois semaines de bout en bout.", openRolesEyebrow: "Postes ouverts", openRolesTitle: "Nous recrutons dans", teamsHiring: (n) => `${n} équipes.`, noSee: "Vous ne voyez pas votre poste ?", viewRole: "Voir le poste" },
  es: { eyebrow: "Empleo", title: "Ayúdanos a construir cámaras en las que los conductores confíen.", sub: "Somos un equipo pequeño y deliberado — 84 personas entre San Francisco, Shenzhen y Dublín. Ingenieros, diseñadores y operadores que se preocupan por un producto que importa cuando se usa.", valuesEyebrow: "Cómo trabajamos", valuesTitle: "Tres cosas que decimos en serio.", benefitsEyebrow: "Beneficios", benefitsTitle: "Lo básico, bien hecho.", processEyebrow: "Proceso de selección", processTitle: "Cinco pasos. Unas tres semanas de principio a fin.", openRolesEyebrow: "Vacantes abiertas", openRolesTitle: "Estamos contratando en", teamsHiring: (n) => `${n} equipos.`, noSee: "¿No ves tu puesto?", viewRole: "Ver vacante" },
  it: { eyebrow: "Lavora con noi", title: "Aiutaci a costruire telecamere di cui i conducenti possano fidarsi.", sub: "Siamo un team piccolo e intenzionale — 84 persone tra San Francisco, Shenzhen e Dublino. Ingegneri, designer e operations che tengono davvero a un prodotto che conta nei momenti in cui serve.", valuesEyebrow: "Come lavoriamo", valuesTitle: "Tre cose che pensiamo davvero.", benefitsEyebrow: "Benefit", benefitsTitle: "Le basi, ben fatte.", processEyebrow: "Processo di selezione", processTitle: "Cinque step. Circa tre settimane da capo a coda.", openRolesEyebrow: "Posizioni aperte", openRolesTitle: "Stiamo assumendo in", teamsHiring: (n) => `${n} team.`, noSee: "Non vedi il tuo ruolo?", viewRole: "Vedi la posizione" },
  ru: { eyebrow: "Вакансии", title: "Помогите нам делать камеры, которым доверяют водители.", sub: "Мы — небольшая, осознанная команда: 84 человека в Сан-Франциско, Шэньчжэне и Дублине. Инженеры, дизайнеры и операторы, которым искренне небезразличен продукт, важный в момент использования.", valuesEyebrow: "Как мы работаем", valuesTitle: "Три вещи, которые мы говорим серьёзно.", benefitsEyebrow: "Льготы", benefitsTitle: "База — но сделанная хорошо.", processEyebrow: "Процесс найма", processTitle: "Пять шагов. Около трёх недель от начала до конца.", openRolesEyebrow: "Открытые вакансии", openRolesTitle: "Мы ищем людей в", teamsHiring: (n) => `${n} команд.`, noSee: "Не нашли подходящей роли?", viewRole: "Подробнее" },
  pl: { eyebrow: "Kariera", title: "Pomóż nam tworzyć kamery, którym kierowcy zaufają.", sub: "Jesteśmy małym, świadomym zespołem — 84 osoby w San Francisco, Shenzhen i Dublinie. Inżynierowie, projektanci i operacje, którym naprawdę zależy na produkcie istotnym w chwili użycia.", valuesEyebrow: "Jak pracujemy", valuesTitle: "Trzy rzeczy, w które wierzymy naprawdę.", benefitsEyebrow: "Benefity", benefitsTitle: "Podstawy, zrobione porządnie.", processEyebrow: "Proces rekrutacji", processTitle: "Pięć kroków. Około trzech tygodni od początku do końca.", openRolesEyebrow: "Otwarte stanowiska", openRolesTitle: "Rekrutujemy w", teamsHiring: (n) => `${n} zespołach.`, noSee: "Nie widzisz swojej roli?", viewRole: "Zobacz stanowisko" },
  ro: { eyebrow: "Cariere", title: "Ajută-ne să construim camere în care șoferii pot avea încredere.", sub: "Suntem o echipă mică, intenționată — 84 de oameni între San Francisco, Shenzhen și Dublin. Ingineri, designeri și operatori care pun la suflet un produs care contează în clipa în care e folosit.", valuesEyebrow: "Cum lucrăm", valuesTitle: "Trei lucruri pe care le credem cu adevărat.", benefitsEyebrow: "Beneficii", benefitsTitle: "Bazele, făcute bine.", processEyebrow: "Procesul de recrutare", processTitle: "Cinci pași. Aproximativ trei săptămâni cap-coadă.", openRolesEyebrow: "Roluri deschise", openRolesTitle: "Angajăm în", teamsHiring: (n) => `${n} echipe.`, noSee: "Nu vezi rolul tău?", viewRole: "Vezi rolul" },
  tr: { eyebrow: "Kariyer", title: "Sürücülerin güvenebileceği kameralar yapmamıza yardım edin.", sub: "San Francisco, Shenzhen ve Dublin'de 84 kişilik küçük ve özenli bir ekibiz. İhtiyaç anında işe yarayan bir ürünü gerçekten önemseyen mühendisler, tasarımcılar ve operasyon ekibi.", valuesEyebrow: "Çalışma şeklimiz", valuesTitle: "Gerçekten kastettiğimiz üç şey.", benefitsEyebrow: "Yan haklar", benefitsTitle: "Temeller, doğru yapılmış.", processEyebrow: "İşe alım süreci", processTitle: "Beş adım. Baştan sona yaklaşık üç hafta.", openRolesEyebrow: "Açık pozisyonlar", openRolesTitle: "Eleman aldığımız ekipler ·", teamsHiring: (n) => `${n} ekip.`, noSee: "Pozisyonunuzu göremediniz mi?", viewRole: "Pozisyonu gör" },
  pt: { eyebrow: "Carreiras", title: "Ajude-nos a construir câmeras em que motoristas confiem.", sub: "Somos um time pequeno e intencional — 84 pessoas entre São Francisco, Shenzhen e Dublin. Engenheiros, designers e operadores que realmente se importam com um produto que importa nos momentos em que é usado.", valuesEyebrow: "Como trabalhamos", valuesTitle: "Três coisas que dizemos a sério.", benefitsEyebrow: "Benefícios", benefitsTitle: "O básico, bem feito.", processEyebrow: "Processo seletivo", processTitle: "Cinco etapas. Cerca de três semanas do início ao fim.", openRolesEyebrow: "Vagas abertas", openRolesTitle: "Estamos contratando em", teamsHiring: (n) => `${n} times.`, noSee: "Não vê sua função?", viewRole: "Ver vaga" },
  ar: { eyebrow: "الوظائف", title: "ساعدنا في صنع كاميرات يثق بها السائقون.", sub: "نحن فريق صغير ومتعمَّد — 84 شخصًا بين سان فرانسيسكو وشنزن ودبلن. مهندسون ومصممون وعمليات يهتمون بصدق بمنتج له أهمية في اللحظات التي يُستخدم فيها.", valuesEyebrow: "أسلوب عملنا", valuesTitle: "ثلاثة أمور نعنيها فعلًا.", benefitsEyebrow: "المزايا", benefitsTitle: "الأساسيات، بإتقان.", processEyebrow: "عملية التوظيف", processTitle: "خمس خطوات. حوالي ثلاثة أسابيع من البداية للنهاية.", openRolesEyebrow: "الوظائف المتاحة", openRolesTitle: "نوظّف في", teamsHiring: (n) => `${n} فرق.`, noSee: "لم تجد دورك؟", viewRole: "عرض الوظيفة" },
  th: { eyebrow: "ร่วมงาน", title: "ช่วยเราสร้างกล้องที่ผู้ขับขี่ไว้วางใจได้", sub: "เราเป็นทีมเล็กที่มุ่งมั่น — 84 คน ระหว่างซานฟรานซิสโก เซินเจิ้น และดับลิน วิศวกร นักออกแบบ และฝ่ายปฏิบัติการที่ห่วงใยผลิตภัณฑ์ที่สำคัญในวินาทีที่ใช้งาน", valuesEyebrow: "วิธีทำงานของเรา", valuesTitle: "สามสิ่งที่เรายึดมั่นจริง", benefitsEyebrow: "สวัสดิการ", benefitsTitle: "พื้นฐานที่ทำได้ดี", processEyebrow: "กระบวนการรับสมัคร", processTitle: "5 ขั้นตอน ใช้เวลาประมาณ 3 สัปดาห์", openRolesEyebrow: "ตำแหน่งเปิด", openRolesTitle: "กำลังรับสมัครใน ·", teamsHiring: (n) => `${n} ทีม`, noSee: "ไม่เห็นตำแหน่งของคุณ?", viewRole: "ดูตำแหน่ง" },
  vi: { eyebrow: "Tuyển dụng", title: "Cùng chúng tôi tạo ra camera mà tài xế có thể tin tưởng.", sub: "Chúng tôi là một đội nhỏ, có chủ đích — 84 người ở San Francisco, Thâm Quyến và Dublin. Kỹ sư, nhà thiết kế và nhân sự vận hành thật sự quan tâm đến sản phẩm có ý nghĩa trong khoảnh khắc nó được dùng.", valuesEyebrow: "Cách chúng tôi làm việc", valuesTitle: "Ba điều chúng tôi thật sự coi trọng.", benefitsEyebrow: "Phúc lợi", benefitsTitle: "Những điều cơ bản, làm tử tế.", processEyebrow: "Quy trình tuyển dụng", processTitle: "Năm bước. Khoảng ba tuần từ đầu đến cuối.", openRolesEyebrow: "Vị trí đang tuyển", openRolesTitle: "Đang tuyển ở", teamsHiring: (n) => `${n} đội.`, noSee: "Không thấy vị trí của bạn?", viewRole: "Xem vị trí" },
};

export default function CareersPageClient({ content }: { content: CareersContent }) {
  const { locale } = useLocale();
  const t = COPY[locale] ?? COPY.en!;
  const { roles, values, benefits, process } = content;
  const teamCount = new Set(roles.map((r) => r.team)).size;
  return (
    <main className="bg-white">
      <section className="bg-slate-50">
        <div className="mx-auto max-w-5xl px-6 pb-20 pt-32 md:pt-40 lg:px-10">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">{t.eyebrow}</p>
          <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">{t.title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg">{t.sub}</p>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14 max-w-2xl md:mb-16">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">{t.valuesEyebrow}</p>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">{t.valuesTitle}</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {values.map((v) => {
              const Icon = ICONS[v.iconName] ?? Sparkles;
              return (
                <div key={v.title} className="rounded-2xl bg-slate-50 p-8 shadow-sm transition-shadow duration-300 hover:shadow-md">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm"><Icon className="h-5 w-5" /></span>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-slate-900">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{v.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14 max-w-2xl md:mb-16">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">{t.benefitsEyebrow}</p>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">{t.benefitsTitle}</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => {
              const Icon = ICONS[b.iconName] ?? HeartPulse;
              return (
                <div key={b.title} className="rounded-2xl bg-white p-7 shadow-sm">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600"><Icon className="h-5 w-5" /></span>
                  <h3 className="mt-5 text-base font-semibold tracking-tight text-slate-900">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{b.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="mb-14 max-w-2xl md:mb-16">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">{t.processEyebrow}</p>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">{t.processTitle}</h2>
          </div>
          <ol className="space-y-6">
            {process.map((s) => (
              <li key={s.n} className="flex gap-5 rounded-2xl bg-slate-50 p-6 shadow-sm md:p-8">
                <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-base font-bold text-white">{s.n}</span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-slate-900">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600 md:text-base">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-slate-50 py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">{t.openRolesEyebrow}</p>
              <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">{t.openRolesTitle} {t.teamsHiring(teamCount)}</h2>
            </div>
            <p className="text-sm text-slate-500">
              {t.noSee}{" "}
              <a href="mailto:careers@azdome.com" className="font-medium text-blue-600 hover:text-blue-700">careers@azdome.com</a>
            </p>
          </div>

          <ul className="divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-white shadow-sm">
            {roles.map((r) => (
              <li key={r.title}>
                <Link href="#" className="group flex flex-col gap-3 px-6 py-6 transition-colors duration-300 hover:bg-slate-50 sm:flex-row sm:items-center sm:gap-6 md:px-8">
                  <div className="flex-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-blue-600">{r.team} · {r.level}</p>
                    <p className="mt-2 text-lg font-semibold tracking-tight text-slate-900 md:text-xl">{r.title}</p>
                    <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {r.location}
                      </span>
                      <span>·</span>
                      <span>{r.type}</span>
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition-transform duration-300 group-hover:translate-x-1">
                    {t.viewRole}
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
