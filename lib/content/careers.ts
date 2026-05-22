import type { ContentSection } from "./types";
import type { Locale } from "@/lib/i18n/dictionaries";

export const CAREER_VALUE_ICONS = ["Sparkles", "Users", "BookOpen"] as const;
export const CAREER_BENEFIT_ICONS = ["HeartPulse", "PiggyBank", "Plane", "Wifi", "BookOpen", "Sparkles"] as const;

export type Role = { title: string; team: string; location: string; level: string; type: string };
export type CareerValue = { iconName: string; title: string; body: string };
export type CareerBenefit = { iconName: string; title: string; body: string };
export type CareerProcess = { n: number; title: string; body: string };

export type CareersContent = {
  roles: Role[];
  values: CareerValue[];
  benefits: CareerBenefit[];
  process: CareerProcess[];
};

const EN: CareersContent = {
  roles: [
    { title: "Senior Firmware Engineer", team: "Engineering", location: "San Francisco, CA · Hybrid", level: "Senior", type: "Full-time" },
    { title: "Product Designer", team: "Design", location: "Remote (US / EU)", level: "Mid–Senior", type: "Full-time" },
    { title: "Performance Marketing Manager", team: "Growth", location: "Remote (US)", level: "Senior", type: "Full-time" },
    { title: "Customer Success Lead", team: "Operations", location: "Austin, TX · Hybrid", level: "Lead", type: "Full-time" },
    { title: "Image Sensor Engineer", team: "Hardware", location: "San Jose, CA · On-site", level: "Senior", type: "Full-time" },
    { title: "Mobile Engineer (iOS / Android)", team: "Engineering", location: "Remote (US / EU)", level: "Mid–Senior", type: "Full-time" },
    { title: "Mechanical Engineer (Optical Housings)", team: "Hardware", location: "Shenzhen, CN · On-site", level: "Senior", type: "Full-time" },
    { title: "Content & Brand Storyteller", team: "Marketing", location: "Remote (US)", level: "Mid", type: "Full-time" },
  ],
  values: [
    { iconName: "Sparkles", title: "Quiet engineering", body: "We obsess over the details users don't see. The team writes for clarity, ships small, and tests the corner cases first." },
    { iconName: "Users", title: "Honest collaboration", body: "We critique work, not people. We disagree in the open, commit fully once a decision is made, and don't relitigate over Slack." },
    { iconName: "BookOpen", title: "Bias toward writing", body: "Important decisions get a short doc. We default to async. Meetings exist when written communication has genuinely failed." },
  ],
  benefits: [
    { iconName: "HeartPulse", title: "Comprehensive health", body: "100% of medical, dental, vision premiums covered for you; 75% for dependents." },
    { iconName: "PiggyBank", title: "401(k) with 4% match", body: "Vest immediately. We also contribute 2% regardless of your contribution." },
    { iconName: "Plane", title: "Unlimited PTO (with a floor)", body: "Take what you need — minimum 18 days/year enforced by the team lead." },
    { iconName: "Wifi", title: "Remote-first stipend", body: "$2,000 home office setup, $80/mo internet, co-working credits." },
    { iconName: "BookOpen", title: "Learning budget", body: "$2,500/year for books, courses, and conferences. No approvals — book it." },
    { iconName: "Sparkles", title: "Sabbatical at 4 years", body: "4 paid weeks off after every 4 years of service. Don't open Slack." },
  ],
  process: [
    { n: 1, title: "Apply", body: "We read every application. Most get a response within 5 business days." },
    { n: 2, title: "30-min intro", body: "A casual call with the hiring manager to learn about you and the role." },
    { n: 3, title: "Take-home or live exercise", body: "We respect your time — exercises are scoped to 2–3 hours and are paid for senior roles." },
    { n: 4, title: "Team conversations", body: "Two or three 45-minute conversations with future teammates and cross-functional partners." },
    { n: 5, title: "Decision within a week", body: "We don't ghost. You'll get a yes, a no, or a clear timeline." },
  ],
};

// Careers: role titles + team / location strings stay English (these
// match the actual job postings and listing systems). Translated:
// value/benefit/process titles + bodies.
const CAREERS_BY_LOCALE: Partial<Record<Locale, CareersContent>> = {
  en: EN,
  zh: {
    roles: EN.roles,
    values: [
      { iconName: "Sparkles", title: "静默工程", body: "我们对用户看不到的细节执着。团队写代码追求清晰、小步迭代、先测边界情况。" },
      { iconName: "Users", title: "坦诚协作", body: "我们评论工作,不评论人。公开表达分歧,一旦决定就全力投入,不在 Slack 里翻旧账。" },
      { iconName: "BookOpen", title: "写作优先", body: "重要决策都写文档。默认异步。会议只在书面沟通确实失效时才开。" },
    ],
    benefits: [
      { iconName: "HeartPulse", title: "全面医疗", body: "员工医、牙、视保费 100% 覆盖;家属覆盖 75%。" },
      { iconName: "PiggyBank", title: "401(k) 4% 配比", body: "立即归属。无论你自己缴多少,我们额外缴 2%。" },
      { iconName: "Plane", title: "无限带薪假(有底线)", body: "想休就休 — 团队主管会确保你每年至少休 18 天。" },
      { iconName: "Wifi", title: "远程办公津贴", body: "$2,000 居家办公设备、每月 $80 网费、共享办公室额度。" },
      { iconName: "BookOpen", title: "学习预算", body: "每年 $2,500 用于书籍、课程、会议。无需审批 — 直接订。" },
      { iconName: "Sparkles", title: "4 年带薪长假", body: "每工作 4 年休 4 周带薪长假。期间不要打开 Slack。" },
    ],
    process: [
      { n: 1, title: "申请", body: "我们阅读每一份申请。大多数在 5 个工作日内有回复。" },
      { n: 2, title: "30 分钟初聊", body: "和招聘经理轻松通话,了解你和岗位。" },
      { n: 3, title: "Take-home 或现场练习", body: "我们尊重你的时间 — 任务控制在 2-3 小时,资深岗位会付费。" },
      { n: 4, title: "团队对话", body: "和未来同事及跨部门伙伴进行 2-3 次 45 分钟对话。" },
      { n: 5, title: "一周内出结果", body: "我们不会失联。会给你明确的 yes、no 或时间表。" },
    ],
  },
  ja: {
    roles: EN.roles,
    values: [
      { iconName: "Sparkles", title: "静かなエンジニアリング", body: "ユーザーが見ない細部に徹底的にこだわる。チームは明瞭に書き、小さく出荷し、エッジケースを最初に検証する。" },
      { iconName: "Users", title: "誠実なコラボレーション", body: "人ではなく仕事を批評する。意見の相違は公に出し、決まったら全力でコミット、Slack で蒸し返さない。" },
      { iconName: "BookOpen", title: "書くことを優先", body: "重要な決定には短いドキュメントを書く。デフォルトは非同期。文章でうまくいかないときだけミーティングする。" },
    ],
    benefits: [
      { iconName: "HeartPulse", title: "包括的な健康保険", body: "本人の医療・歯科・視力保険料を 100% カバー、扶養家族は 75%。" },
      { iconName: "PiggyBank", title: "401(k) 4% マッチ", body: "即時 vesting。あなたの拠出に関わらず会社が 2% 追加拠出。" },
      { iconName: "Plane", title: "無制限 PTO(下限あり)", body: "必要な分だけ取得 — チームリードが年最低 18 日を担保。" },
      { iconName: "Wifi", title: "リモート手当", body: "$2,000 のホームオフィスセットアップ、月 $80 のインターネット、コワーキングクレジット。" },
      { iconName: "BookOpen", title: "学習予算", body: "書籍・コース・カンファレンスに年 $2,500。承認不要 — 直接予約。" },
      { iconName: "Sparkles", title: "4 年でサバティカル", body: "4 年勤続ごとに 4 週間の有給長期休暇。Slack は開かないこと。" },
    ],
    process: [
      { n: 1, title: "応募", body: "全応募に目を通します。多くは 5 営業日以内に回答。" },
      { n: 2, title: "30 分のイントロ", body: "ハイアリングマネージャーとカジュアル通話。あなたと役職を知る場。" },
      { n: 3, title: "持ち帰り or ライブ課題", body: "あなたの時間を尊重 — 課題は 2-3 時間にスコープ、シニア職は報酬あり。" },
      { n: 4, title: "チーム面談", body: "将来の同僚や部門横断パートナーとの 45 分会話を 2-3 回。" },
      { n: 5, title: "1 週間で決定", body: "音信不通にはしません。yes、no、あるいは明確なタイムラインを提示。" },
    ],
  },
  de: {
    roles: EN.roles,
    values: [
      { iconName: "Sparkles", title: "Stille Ingenieurskunst", body: "Wir achten obsessiv auf das, was Nutzer nicht sehen. Das Team schreibt klar, liefert klein, testet zuerst die Edge Cases." },
      { iconName: "Users", title: "Ehrliche Zusammenarbeit", body: "Wir kritisieren Arbeit, nicht Personen. Wir streiten offen, committen voll nach Entscheidung und reopen nichts über Slack." },
      { iconName: "BookOpen", title: "Bias zum Schreiben", body: "Wichtige Entscheidungen bekommen ein kurzes Doc. Default async. Meetings, wenn schriftliche Kommunikation wirklich gescheitert ist." },
    ],
    benefits: [
      { iconName: "HeartPulse", title: "Umfassende Krankenversicherung", body: "100 % der Beiträge für Kranken-, Zahn-, Augenversicherung für Sie; 75 % für Angehörige." },
      { iconName: "PiggyBank", title: "401(k) mit 4 % Match", body: "Sofort vested. Wir zahlen zusätzlich 2 % unabhängig von Ihrem Beitrag." },
      { iconName: "Plane", title: "Unbegrenzter Urlaub (mit Mindestmaß)", body: "Nimm, was du brauchst — Teamlead setzt mindestens 18 Tage/Jahr durch." },
      { iconName: "Wifi", title: "Remote-First-Stipendium", body: "$2.000 Home Office Setup, $80/Monat Internet, Coworking-Guthaben." },
      { iconName: "BookOpen", title: "Lernbudget", body: "$2.500/Jahr für Bücher, Kurse, Konferenzen. Keine Genehmigungen — einfach buchen." },
      { iconName: "Sparkles", title: "Sabbatical nach 4 Jahren", body: "4 bezahlte Wochen frei nach je 4 Dienstjahren. Kein Slack." },
    ],
    process: [
      { n: 1, title: "Bewerben", body: "Wir lesen jede Bewerbung. Die meisten erhalten innerhalb von 5 Werktagen eine Antwort." },
      { n: 2, title: "30-Min-Intro", body: "Lockerer Call mit dem Hiring Manager, um Sie und die Rolle kennenzulernen." },
      { n: 3, title: "Take-home oder Live-Übung", body: "Wir respektieren Ihre Zeit — Übungen sind auf 2-3 Stunden ausgelegt und für Senior-Rollen bezahlt." },
      { n: 4, title: "Team-Gespräche", body: "Zwei oder drei 45-Min-Gespräche mit künftigen Teammitgliedern und Cross-Functional-Partnern." },
      { n: 5, title: "Entscheidung in einer Woche", body: "Wir ghosten nicht. Sie bekommen ein Ja, ein Nein oder einen klaren Zeitplan." },
    ],
  },
  fr: {
    roles: EN.roles,
    values: [
      { iconName: "Sparkles", title: "Ingénierie discrète", body: "Nous nous obsédons des détails que les utilisateurs ne voient pas. L'équipe écrit pour la clarté, livre petit et teste d'abord les cas limites." },
      { iconName: "Users", title: "Collaboration honnête", body: "Nous critiquons le travail, pas les personnes. Nous exprimons les désaccords ouvertement, nous engageons pleinement après décision, et ne relitiguons pas sur Slack." },
      { iconName: "BookOpen", title: "Préférence pour l'écrit", body: "Les décisions importantes ont un court document. Async par défaut. Les réunions n'existent que quand la communication écrite a vraiment échoué." },
    ],
    benefits: [
      { iconName: "HeartPulse", title: "Santé complète", body: "100 % des cotisations santé/dentaire/optique couvertes pour vous ; 75 % pour les ayants droit." },
      { iconName: "PiggyBank", title: "401(k) avec match de 4 %", body: "Acquisition immédiate. Nous contribuons aussi 2 % indépendamment de votre contribution." },
      { iconName: "Plane", title: "Congés illimités (avec plancher)", body: "Prenez ce dont vous avez besoin — le team lead fait respecter un minimum de 18 jours/an." },
      { iconName: "Wifi", title: "Allocation remote-first", body: "$2 000 équipement bureau, $80/mois internet, crédits coworking." },
      { iconName: "BookOpen", title: "Budget formation", body: "$2 500/an pour livres, cours et conférences. Pas d'approbation — réservez." },
      { iconName: "Sparkles", title: "Sabbatique à 4 ans", body: "4 semaines payées tous les 4 ans d'ancienneté. N'ouvrez pas Slack." },
    ],
    process: [
      { n: 1, title: "Postuler", body: "Nous lisons chaque candidature. La plupart reçoit une réponse sous 5 jours ouvrés." },
      { n: 2, title: "Intro de 30 min", body: "Un appel décontracté avec le hiring manager pour faire connaissance." },
      { n: 3, title: "Exercice à emporter ou en direct", body: "Nous respectons votre temps — exercices calibrés sur 2-3 heures et payés pour les postes seniors." },
      { n: 4, title: "Conversations d'équipe", body: "Deux ou trois conversations de 45 min avec futurs collègues et partenaires transverses." },
      { n: 5, title: "Décision sous une semaine", body: "Nous ne fantôme pas. Vous aurez un oui, un non, ou un calendrier clair." },
    ],
  },
  es: {
    roles: EN.roles,
    values: [
      { iconName: "Sparkles", title: "Ingeniería silenciosa", body: "Nos obsesionamos con los detalles que los usuarios no ven. El equipo escribe con claridad, despliega pequeño y prueba primero los casos límite." },
      { iconName: "Users", title: "Colaboración honesta", body: "Criticamos el trabajo, no a las personas. Disentimos en abierto, nos comprometemos tras decidir y no reabrimos por Slack." },
      { iconName: "BookOpen", title: "Sesgo hacia escribir", body: "Las decisiones importantes llevan un documento corto. Por defecto async. Las reuniones existen cuando la comunicación escrita ha fallado de verdad." },
    ],
    benefits: [
      { iconName: "HeartPulse", title: "Salud completa", body: "100 % de primas médicas, dentales y de visión cubiertas para ti; 75 % para dependientes." },
      { iconName: "PiggyBank", title: "401(k) con 4 % de match", body: "Vesting inmediato. También aportamos 2 % independientemente de tu aportación." },
      { iconName: "Plane", title: "PTO ilimitado (con suelo)", body: "Toma lo que necesites — el team lead asegura mínimo 18 días/año." },
      { iconName: "Wifi", title: "Estipendio remote-first", body: "$2.000 para oficina en casa, $80/mes internet, créditos coworking." },
      { iconName: "BookOpen", title: "Presupuesto de aprendizaje", body: "$2.500/año para libros, cursos y conferencias. Sin aprobaciones — reserva." },
      { iconName: "Sparkles", title: "Sabático a los 4 años", body: "4 semanas pagadas tras cada 4 años de servicio. No abras Slack." },
    ],
    process: [
      { n: 1, title: "Aplicar", body: "Leemos cada solicitud. La mayoría recibe respuesta en 5 días laborables." },
      { n: 2, title: "Intro de 30 min", body: "Llamada informal con el hiring manager para conocerte y el puesto." },
      { n: 3, title: "Ejercicio para casa o en vivo", body: "Respetamos tu tiempo — ejercicios acotados a 2-3 horas y pagados para puestos senior." },
      { n: 4, title: "Conversaciones de equipo", body: "Dos o tres conversaciones de 45 min con futuros compañeros y partners transversales." },
      { n: 5, title: "Decisión en una semana", body: "No fantasmeamos. Tendrás un sí, un no, o un calendario claro." },
    ],
  },
  it: {
    roles: EN.roles,
    values: [
      { iconName: "Sparkles", title: "Ingegneria silenziosa", body: "Ci ossessioniamo per i dettagli che gli utenti non vedono. Il team scrive con chiarezza, rilascia piccolo e testa prima i casi limite." },
      { iconName: "Users", title: "Collaborazione onesta", body: "Critichiamo il lavoro, non le persone. Esprimiamo i disaccordi apertamente, committiamo pienamente dopo la decisione, niente rinegoziazioni su Slack." },
      { iconName: "BookOpen", title: "Bias verso la scrittura", body: "Le decisioni importanti hanno un breve doc. Async di default. Le riunioni esistono quando la comunicazione scritta è davvero fallita." },
    ],
    benefits: [
      { iconName: "HeartPulse", title: "Sanità completa", body: "100% dei premi medici, dentistici e visivi coperti per te; 75% per i familiari." },
      { iconName: "PiggyBank", title: "401(k) con match 4%", body: "Vesting immediato. Versiamo anche il 2% indipendentemente dal tuo contributo." },
      { iconName: "Plane", title: "PTO illimitato (con minimo)", body: "Prendi quello che ti serve — il team lead garantisce minimo 18 giorni/anno." },
      { iconName: "Wifi", title: "Stipendio remote-first", body: "$2.000 setup home office, $80/mese internet, crediti coworking." },
      { iconName: "BookOpen", title: "Budget formazione", body: "$2.500/anno per libri, corsi e conferenze. Niente approvazioni — prenota." },
      { iconName: "Sparkles", title: "Sabbatico a 4 anni", body: "4 settimane pagate ogni 4 anni di servizio. Non aprire Slack." },
    ],
    process: [
      { n: 1, title: "Candidati", body: "Leggiamo ogni candidatura. La maggior parte riceve risposta entro 5 giorni lavorativi." },
      { n: 2, title: "Intro 30 min", body: "Chiamata informale con l'hiring manager per conoscerti e parlare del ruolo." },
      { n: 3, title: "Take-home o esercizio live", body: "Rispettiamo il tuo tempo — esercizi entro 2-3 ore e retribuiti per i ruoli senior." },
      { n: 4, title: "Conversazioni di team", body: "Due o tre conversazioni di 45 min con futuri colleghi e partner cross-funzionali." },
      { n: 5, title: "Decisione entro una settimana", body: "Non sparamo nel nulla. Avrai un sì, un no, o una timeline chiara." },
    ],
  },
  ru: {
    roles: EN.roles,
    values: [
      { iconName: "Sparkles", title: "Тихая инженерия", body: "Маниакально следим за тем, что не видит пользователь. Команда пишет ясно, релизит маленькими шагами и сначала тестит крайние случаи." },
      { iconName: "Users", title: "Честное сотрудничество", body: "Критикуем работу, а не людей. Открыто спорим, после решения коммитимся полностью и не возвращаемся к нему в Slack." },
      { iconName: "BookOpen", title: "Уклон в письмо", body: "Важные решения получают короткий документ. По умолчанию — асинхронность. Митинги — когда письменная коммуникация реально не сработала." },
    ],
    benefits: [
      { iconName: "HeartPulse", title: "Полная медицина", body: "100% медицинских, стоматологических и офтальмологических взносов покрывается для вас; 75% — для иждивенцев." },
      { iconName: "PiggyBank", title: "401(k) с матчингом 4%", body: "Вестинг сразу. Также вносим 2% вне зависимости от вашего взноса." },
      { iconName: "Plane", title: "Неограниченный PTO (с минимумом)", body: "Берите, сколько нужно — тимлид обеспечит минимум 18 дней в год." },
      { iconName: "Wifi", title: "Стипендия для удалёнки", body: "$2 000 на домашний офис, $80/мес интернет, кредиты на коворкинг." },
      { iconName: "BookOpen", title: "Бюджет на обучение", body: "$2 500/год на книги, курсы и конференции. Без согласований — просто бронируйте." },
      { iconName: "Sparkles", title: "Саббатикал каждые 4 года", body: "4 оплачиваемые недели после каждых 4 лет работы. Не открывайте Slack." },
    ],
    process: [
      { n: 1, title: "Заявка", body: "Читаем каждое резюме. Большинству отвечаем за 5 рабочих дней." },
      { n: 2, title: "30-минутная встреча", body: "Непринуждённый созвон с hiring manager — узнать вас и обсудить роль." },
      { n: 3, title: "Take-home или живое задание", body: "Уважаем ваше время — задание укладывается в 2-3 часа, для senior-позиций оплачивается." },
      { n: 4, title: "Беседы с командой", body: "2-3 беседы по 45 минут с будущими коллегами и кросс-функциональными партнёрами." },
      { n: 5, title: "Решение в течение недели", body: "Не пропадаем. Получите «да», «нет» или чёткие сроки." },
    ],
  },
  pl: {
    roles: EN.roles,
    values: [
      { iconName: "Sparkles", title: "Cicha inżynieria", body: "Obsesyjnie pracujemy nad detalami, których użytkownik nie widzi. Zespół pisze przejrzyście, wdraża małe rzeczy, testuje przypadki brzegowe na pierwszym miejscu." },
      { iconName: "Users", title: "Uczciwa współpraca", body: "Krytykujemy pracę, nie ludzi. Otwarcie się nie zgadzamy, po decyzji w pełni commitujemy, nie wracamy do tego na Slacku." },
      { iconName: "BookOpen", title: "Preferencja dla pisma", body: "Ważne decyzje mają krótki dokument. Domyślnie async. Spotkania istnieją, gdy komunikacja pisemna naprawdę zawiodła." },
    ],
    benefits: [
      { iconName: "HeartPulse", title: "Pełna opieka zdrowotna", body: "100% składek medycznych, stomatologicznych i okulistycznych pokrywanych dla ciebie; 75% dla osób na utrzymaniu." },
      { iconName: "PiggyBank", title: "401(k) z 4% match", body: "Natychmiastowy vesting. Wpłacamy też 2% niezależnie od twojej składki." },
      { iconName: "Plane", title: "Nieograniczone PTO (z podłogą)", body: "Bierz, ile potrzebujesz — team lead pilnuje minimum 18 dni/rok." },
      { iconName: "Wifi", title: "Dodatek remote-first", body: "$2 000 na biuro w domu, $80/mies. internet, kredyty na coworking." },
      { iconName: "BookOpen", title: "Budżet edukacyjny", body: "$2 500/rok na książki, kursy i konferencje. Bez akceptacji — rezerwuj." },
      { iconName: "Sparkles", title: "Sabbatical po 4 latach", body: "4 płatne tygodnie po każdych 4 latach pracy. Nie otwieraj Slacka." },
    ],
    process: [
      { n: 1, title: "Aplikacja", body: "Czytamy każdą aplikację. Większość dostaje odpowiedź w 5 dni roboczych." },
      { n: 2, title: "30-min intro", body: "Luźna rozmowa z hiring managerem — poznanie ciebie i roli." },
      { n: 3, title: "Take-home lub ćwiczenie live", body: "Szanujemy twój czas — ćwiczenia w zakresie 2-3 godzin, dla ról senior płatne." },
      { n: 4, title: "Rozmowy zespołowe", body: "Dwie lub trzy 45-minutowe rozmowy z przyszłymi współpracownikami i partnerami międzyfunkcyjnymi." },
      { n: 5, title: "Decyzja w tydzień", body: "Nie znikamy. Dostaniesz tak, nie lub jasny harmonogram." },
    ],
  },
  ro: {
    roles: EN.roles,
    values: [
      { iconName: "Sparkles", title: "Inginerie discretă", body: "Obsedăm asupra detaliilor pe care utilizatorii nu le văd. Echipa scrie clar, livrează mic și testează cazurile-limită mai întâi." },
      { iconName: "Users", title: "Colaborare onestă", body: "Criticăm munca, nu oamenii. Disentem deschis, ne angajăm pe deplin după decizie și nu reluăm pe Slack." },
      { iconName: "BookOpen", title: "Înclinație către scris", body: "Deciziile importante primesc un doc scurt. Default async. Întâlnirile există când comunicarea scrisă a eșuat cu adevărat." },
    ],
    benefits: [
      { iconName: "HeartPulse", title: "Sănătate completă", body: "100% din primele medicale, dentare și de vedere acoperite pentru tine; 75% pentru dependenți." },
      { iconName: "PiggyBank", title: "401(k) cu match 4%", body: "Vesting imediat. Contribuim și 2% indiferent de contribuția ta." },
      { iconName: "Plane", title: "PTO nelimitat (cu minim)", body: "Ia cât ai nevoie — team lead asigură minim 18 zile/an." },
      { iconName: "Wifi", title: "Stipendiu remote-first", body: "$2.000 setup home office, $80/lună internet, credite coworking." },
      { iconName: "BookOpen", title: "Buget învățare", body: "$2.500/an pentru cărți, cursuri și conferințe. Fără aprobări — rezervă." },
      { iconName: "Sparkles", title: "Sabbatical la 4 ani", body: "4 săptămâni plătite după fiecare 4 ani de muncă. Nu deschide Slack." },
    ],
    process: [
      { n: 1, title: "Aplică", body: "Citim fiecare aplicație. Majoritatea primește răspuns în 5 zile lucrătoare." },
      { n: 2, title: "Intro 30 min", body: "Apel relaxat cu hiring manager — să te cunoaștem și să discutăm rolul." },
      { n: 3, title: "Take-home sau exercițiu live", body: "Îți respectăm timpul — exerciții în 2-3 ore, plătite pentru roluri senior." },
      { n: 4, title: "Conversații de echipă", body: "Două sau trei conversații de 45 min cu viitori colegi și parteneri cross-funcționali." },
      { n: 5, title: "Decizie într-o săptămână", body: "Nu dispărem. Vei primi un da, un nu, sau un calendar clar." },
    ],
  },
  tr: {
    roles: EN.roles,
    values: [
      { iconName: "Sparkles", title: "Sessiz mühendislik", body: "Kullanıcının görmediği detaylara takıyoruz. Ekip net yazar, küçük adımlarla yayınlar, önce sınır durumları test eder." },
      { iconName: "Users", title: "Dürüst işbirliği", body: "İşi eleştiririz, insanları değil. Açıkça anlaşmazlığa düşeriz, karar sonrası tam taahhüt ederiz, Slack'te yeniden tartışmayız." },
      { iconName: "BookOpen", title: "Yazıya yönelim", body: "Önemli kararlar kısa bir dokümanla gelir. Varsayılan async. Toplantılar yazılı iletişim gerçekten başarısız olduğunda var." },
    ],
    benefits: [
      { iconName: "HeartPulse", title: "Kapsamlı sağlık", body: "Tıbbi, diş ve göz sigortası primlerinin %100'ü sizin için karşılanır; bakmakla yükümlü olduğunuz kişiler için %75." },
      { iconName: "PiggyBank", title: "%4 katkılı 401(k)", body: "Hemen hak ediş. Sizin katkınızdan bağımsız olarak ayrıca %2 katkı sağlıyoruz." },
      { iconName: "Plane", title: "Sınırsız izin (alt sınırlı)", body: "Ne kadar gerekiyorsa al — takım lideri yılda minimum 18 günü garanti eder." },
      { iconName: "Wifi", title: "Uzaktan çalışma ödeneği", body: "$2.000 ev ofisi kurulumu, aylık $80 internet, coworking kredisi." },
      { iconName: "BookOpen", title: "Öğrenme bütçesi", body: "Yılda $2.500 kitap, kurs ve konferans için. Onay yok — rezerve edin." },
      { iconName: "Sparkles", title: "4 yılda bir sabatik", body: "Her 4 yıl hizmetin ardından 4 hafta ücretli izin. Slack'i açmayın." },
    ],
    process: [
      { n: 1, title: "Başvur", body: "Her başvuruyu okuyoruz. Çoğunluk 5 iş günü içinde yanıt alır." },
      { n: 2, title: "30 dakikalık tanışma", body: "Hiring manager ile rahat bir görüşme — sizi ve rolü tanımak için." },
      { n: 3, title: "Take-home veya canlı çalışma", body: "Zamanınıza saygı duyuyoruz — çalışmalar 2-3 saatlik kapsamda, üst düzey roller için ücretli." },
      { n: 4, title: "Ekip görüşmeleri", body: "Gelecek takım arkadaşlarınız ve cross-functional partnerlerle iki ya da üç 45 dakikalık görüşme." },
      { n: 5, title: "Bir hafta içinde karar", body: "Hayalet olmuyoruz. Bir evet, bir hayır veya net bir zaman çizelgesi alacaksınız." },
    ],
  },
  pt: {
    roles: EN.roles,
    values: [
      { iconName: "Sparkles", title: "Engenharia silenciosa", body: "Obcecamos com os detalhes que os usuários não veem. O time escreve com clareza, entrega pequeno e testa os casos extremos primeiro." },
      { iconName: "Users", title: "Colaboração honesta", body: "Criticamos o trabalho, não as pessoas. Discordamos abertamente, nos comprometemos plenamente após a decisão e não voltamos ao tema no Slack." },
      { iconName: "BookOpen", title: "Viés para escrita", body: "Decisões importantes têm um doc curto. Async por padrão. Reuniões existem quando a comunicação escrita realmente falhou." },
    ],
    benefits: [
      { iconName: "HeartPulse", title: "Saúde abrangente", body: "100% dos prêmios médicos, odontológicos e oftalmológicos cobertos para você; 75% para dependentes." },
      { iconName: "PiggyBank", title: "401(k) com 4% de match", body: "Vesting imediato. Também contribuímos com 2% independente do seu aporte." },
      { iconName: "Plane", title: "Férias ilimitadas (com piso)", body: "Tire o que precisar — o team lead garante mínimo de 18 dias/ano." },
      { iconName: "Wifi", title: "Subsídio remote-first", body: "$2.000 para escritório em casa, $80/mês de internet, créditos de coworking." },
      { iconName: "BookOpen", title: "Orçamento de aprendizagem", body: "$2.500/ano para livros, cursos e conferências. Sem aprovações — agende." },
      { iconName: "Sparkles", title: "Sabático aos 4 anos", body: "4 semanas pagas a cada 4 anos de serviço. Não abra o Slack." },
    ],
    process: [
      { n: 1, title: "Inscreva-se", body: "Lemos cada inscrição. A maioria recebe resposta em 5 dias úteis." },
      { n: 2, title: "Conversa de 30 min", body: "Ligação descontraída com o hiring manager para conhecer você e a vaga." },
      { n: 3, title: "Exercício remoto ou ao vivo", body: "Respeitamos seu tempo — exercícios cabem em 2-3 horas e são pagos para vagas seniores." },
      { n: 4, title: "Conversas de time", body: "Duas ou três conversas de 45 min com futuros colegas e parceiros cross-funcionais." },
      { n: 5, title: "Decisão em uma semana", body: "Não sumimos. Você terá um sim, um não ou um cronograma claro." },
    ],
  },
  ar: {
    roles: EN.roles,
    values: [
      { iconName: "Sparkles", title: "هندسة هادئة", body: "نحرص بشدة على التفاصيل التي لا يراها المستخدم. يكتب الفريق بوضوح، ويُطلق على مراحل صغيرة، ويختبر الحالات الحدية أولًا." },
      { iconName: "Users", title: "تعاون صادق", body: "ننتقد العمل لا الأشخاص. نختلف علنًا، ونلتزم تمامًا بعد القرار، ولا نعود إليه في Slack." },
      { iconName: "BookOpen", title: "تفضيل الكتابة", body: "تحظى القرارات المهمة بمستند قصير. الإعداد الافتراضي غير متزامن. توجد الاجتماعات عند فشل التواصل المكتوب فعليًا." },
    ],
    benefits: [
      { iconName: "HeartPulse", title: "صحة شاملة", body: "100% من أقساط التأمين الطبي والأسنان والبصر مغطاة لك؛ 75% للأشخاص الذين تعيلهم." },
      { iconName: "PiggyBank", title: "401(k) بمطابقة 4%", body: "حقوق فورية. نساهم بـ 2% إضافية بغض النظر عن مساهمتك." },
      { iconName: "Plane", title: "إجازة غير محدودة (بحد أدنى)", body: "خذ ما تحتاجه — يضمن قائد الفريق حدًا أدنى 18 يومًا في السنة." },
      { iconName: "Wifi", title: "بدل العمل عن بعد", body: "2,000 دولار لإعداد المكتب المنزلي، 80 دولار شهريًا للإنترنت، اعتمادات للمساحات المشتركة." },
      { iconName: "BookOpen", title: "ميزانية تعلم", body: "2,500 دولار سنويًا للكتب والدورات والمؤتمرات. لا حاجة لموافقات — احجز." },
      { iconName: "Sparkles", title: "إجازة طويلة بعد 4 سنوات", body: "4 أسابيع مدفوعة بعد كل 4 سنوات خدمة. لا تفتح Slack." },
    ],
    process: [
      { n: 1, title: "تقدّم", body: "نقرأ كل طلب. يحصل معظم المتقدمين على رد خلال 5 أيام عمل." },
      { n: 2, title: "تعارف 30 دقيقة", body: "مكالمة ودية مع مدير التوظيف للتعرف عليك وعلى الدور." },
      { n: 3, title: "اختبار منزلي أو مباشر", body: "نحترم وقتك — الاختبارات في نطاق 2-3 ساعات ومأجورة للأدوار العليا." },
      { n: 4, title: "محادثات الفريق", body: "محادثتان أو ثلاث، كل منها 45 دقيقة، مع زملاء المستقبل والشركاء عبر الوظائف." },
      { n: 5, title: "قرار خلال أسبوع", body: "لا نختفي. ستحصل على نعم أو لا أو جدول زمني واضح." },
    ],
  },
  th: {
    roles: EN.roles,
    values: [
      { iconName: "Sparkles", title: "วิศวกรรมที่เงียบ", body: "เราหลงใหลรายละเอียดที่ผู้ใช้ไม่เห็น ทีมเขียนให้กระจ่าง ปล่อยทีละน้อย และทดสอบเคสปลายแถวเป็นอันดับแรก" },
      { iconName: "Users", title: "ร่วมงานอย่างจริงใจ", body: "เราวิจารณ์งาน ไม่ใช่คน เห็นต่างเปิดเผย ทุ่มเต็มที่หลังตัดสินใจ และไม่ย้อนเรื่องใน Slack" },
      { iconName: "BookOpen", title: "เน้นการเขียน", body: "การตัดสินใจสำคัญมีเอกสารสั้นๆ ค่าเริ่มต้น async ประชุมมีเมื่อสื่อสารด้วยลายลักษณ์ล้มเหลวจริงๆ เท่านั้น" },
    ],
    benefits: [
      { iconName: "HeartPulse", title: "ประกันสุขภาพครอบคลุม", body: "ครอบคลุมเบี้ยประกันสุขภาพ ทันตกรรม สายตา 100% สำหรับคุณ; 75% สำหรับผู้พึ่งพิง" },
      { iconName: "PiggyBank", title: "401(k) สมทบ 4%", body: "ได้สิทธิ์ทันที สมทบเพิ่ม 2% โดยไม่ขึ้นกับเงินสมทบของคุณ" },
      { iconName: "Plane", title: "วันหยุดไม่จำกัด (มีขั้นต่ำ)", body: "ลาตามที่คุณต้องการ — หัวหน้าทีมรับรองขั้นต่ำ 18 วัน/ปี" },
      { iconName: "Wifi", title: "เบี้ย Remote-first", body: "$2,000 จัดออฟฟิศที่บ้าน, $80/เดือนค่าเน็ต, เครดิตโคเวิร์กกิง" },
      { iconName: "BookOpen", title: "งบเรียนรู้", body: "$2,500/ปี สำหรับหนังสือ คอร์ส งานประชุม ไม่ต้องอนุมัติ — จองเลย" },
      { iconName: "Sparkles", title: "Sabbatical ครบ 4 ปี", body: "4 สัปดาห์มีเงินเดือนหลังครบ 4 ปีของการทำงาน อย่าเปิด Slack" },
    ],
    process: [
      { n: 1, title: "สมัคร", body: "เราอ่านทุกใบสมัคร ส่วนใหญ่ได้รับตอบกลับใน 5 วันทำการ" },
      { n: 2, title: "คุยทำความรู้จัก 30 นาที", body: "โทรพูดคุยสบายๆ กับ Hiring Manager เพื่อรู้จักคุณและตำแหน่ง" },
      { n: 3, title: "งาน Take-home หรือสด", body: "เราเคารพเวลาของคุณ — โจทย์อยู่ในกรอบ 2-3 ชั่วโมง และจ่ายค่าตอบแทนสำหรับตำแหน่งระดับสูง" },
      { n: 4, title: "คุยกับทีม", body: "บทสนทนา 45 นาที 2-3 ครั้งกับว่าที่เพื่อนร่วมงานและพาร์ทเนอร์ข้ามทีม" },
      { n: 5, title: "ตัดสินใจภายใน 1 สัปดาห์", body: "เราไม่หายไป คุณจะได้คำตอบรับ ปฏิเสธ หรือไทม์ไลน์ที่ชัดเจน" },
    ],
  },
  vi: {
    roles: EN.roles,
    values: [
      { iconName: "Sparkles", title: "Kỹ thuật âm thầm", body: "Chúng tôi tỉ mỉ với những chi tiết người dùng không thấy. Đội ngũ viết rõ ràng, ra mắt nhỏ và kiểm thử các tình huống biên trước." },
      { iconName: "Users", title: "Hợp tác chân thành", body: "Chúng tôi phê bình công việc, không phê bình con người. Bất đồng công khai, cam kết toàn lực sau khi quyết định và không lật lại trên Slack." },
      { iconName: "BookOpen", title: "Ưu tiên văn bản", body: "Các quyết định quan trọng có một tài liệu ngắn. Mặc định bất đồng bộ. Cuộc họp chỉ tồn tại khi giao tiếp văn bản thật sự thất bại." },
    ],
    benefits: [
      { iconName: "HeartPulse", title: "Sức khỏe toàn diện", body: "100% phí bảo hiểm y tế, nha khoa, thị lực được lo cho bạn; 75% cho người phụ thuộc." },
      { iconName: "PiggyBank", title: "401(k) match 4%", body: "Vesting ngay lập tức. Chúng tôi cũng đóng thêm 2% bất kể bạn đóng bao nhiêu." },
      { iconName: "Plane", title: "Phép không giới hạn (có sàn)", body: "Nghỉ bao nhiêu cần — team lead đảm bảo tối thiểu 18 ngày/năm." },
      { iconName: "Wifi", title: "Trợ cấp remote-first", body: "$2.000 thiết lập văn phòng tại nhà, $80/tháng internet, tín dụng coworking." },
      { iconName: "BookOpen", title: "Ngân sách học tập", body: "$2.500/năm cho sách, khóa học và hội nghị. Không cần duyệt — cứ đặt." },
      { iconName: "Sparkles", title: "Sabbatical ở năm thứ 4", body: "4 tuần nghỉ có lương sau mỗi 4 năm làm việc. Đừng mở Slack." },
    ],
    process: [
      { n: 1, title: "Đăng ký", body: "Chúng tôi đọc từng hồ sơ. Hầu hết có phản hồi trong 5 ngày làm việc." },
      { n: 2, title: "Trò chuyện 30 phút", body: "Cuộc gọi nhẹ nhàng với hiring manager để hiểu về bạn và vị trí." },
      { n: 3, title: "Bài tập về nhà hoặc trực tiếp", body: "Chúng tôi tôn trọng thời gian của bạn — bài tập giới hạn 2-3 giờ và có trả phí cho vị trí senior." },
      { n: 4, title: "Trò chuyện với đội ngũ", body: "Hai hoặc ba cuộc trò chuyện 45 phút với đồng nghiệp tương lai và đối tác liên chức năng." },
      { n: 5, title: "Quyết định trong một tuần", body: "Chúng tôi không biến mất. Bạn sẽ nhận đồng ý, từ chối hoặc lộ trình rõ ràng." },
    ],
  },
};

export function getDefaultCareers(locale: Locale): CareersContent {
  return CAREERS_BY_LOCALE[locale] ?? CAREERS_BY_LOCALE.en!;
}

export const ROLES = EN.roles;
export const VALUES = EN.values;
export const BENEFITS = EN.benefits;
export const PROCESS = EN.process;

export const CAREERS_PAGE: ContentSection<CareersContent> = {
  key: "careers.page",
  label: "Careers 页 · Roles / Values / Benefits / Process",
  description:
    "招聘页:开放岗位列表、文化价值观、福利、面试流程。" +
    `Values iconName: ${CAREER_VALUE_ICONS.join(", ")} · ` +
    `Benefits iconName: ${CAREER_BENEFIT_ICONS.join(", ")}`,
  page: "careers",
  previewHref: "/careers",
  defaults: getDefaultCareers,
};
