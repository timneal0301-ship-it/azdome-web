"use client";

import Link from "next/link";
import {
  Boxes, Building2, Briefcase, Headset, Package2, ShieldCheck, Truck, Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import FaqAccordion from "@/components/FaqAccordion";
import { useLocale } from "@/components/LocaleProvider";
import type { Locale } from "@/lib/i18n/dictionaries";
import type { WholesaleContent } from "@/lib/content/wholesale";

const ICONS: Record<string, LucideIcon> = { Package2, Truck, ShieldCheck, Headset, Wrench, Building2, Briefcase, Boxes };

type Copy = {
  eyebrow: string; title: string; sub: string; quoteCta: string;
  pricingEyebrow: string; pricingTitle: string; pricingNote: string;
  orderSize: string; discount: string;
  benefitsEyebrow: string; benefitsTitle: string;
  verticalsEyebrow: string; verticalsTitle: string;
  quoteTitle: string; quoteSub: string;
  fCompany: string; fName: string; fEmail: string; fPhone: string; fVolume: string; fAbout: string; fSubmit: string;
  faqTitle: string; faqEyebrow: string;
};

const COPY: Partial<Record<Locale, Copy>> = {
  en: { eyebrow: "Wholesale & Fleet", title: "Outfit your fleet. Protect your drivers.", sub: "Whether you operate 10 vehicles or 10,000, we partner with you on pricing, installation, telematics integration, and ongoing support. A dedicated account manager from order one.", quoteCta: "Request a quote", pricingEyebrow: "Pricing", pricingTitle: "Transparent tiers. No surprises at re-order.", pricingNote: "Discounts apply across the full catalog, including accessories. Cumulative across same-PO line items.", orderSize: "Order size", discount: "Discount", benefitsEyebrow: "What you get", benefitsTitle: "Built for partners, not transactions.", verticalsEyebrow: "Industries we serve", verticalsTitle: "Trusted across logistics, ride-hail, and dealer networks.", quoteTitle: "Get a quote", quoteSub: "A specialist will reply within 1 business day.", fCompany: "Company name", fName: "Your name", fEmail: "Work email", fPhone: "Phone", fVolume: "Estimated unit volume", fAbout: "Tell us about your fleet, timeline, and any integrations you need", fSubmit: "Request a quote", faqTitle: "Common questions.", faqEyebrow: "FAQ" },
  zh: { eyebrow: "批发 & 车队", title: "为你的车队配齐装备,守护每一位司机。", sub: "无论你运营 10 辆还是 10,000 辆车,我们都与你协作 — 定价、安装、车联网集成、长期支持。下第一单起就有专属客户经理。", quoteCta: "获取报价", pricingEyebrow: "价格", pricingTitle: "阶梯透明,补单不踩坑。", pricingNote: "全品类(含配件)适用折扣。同一 PO 的多个行项目可累计。", orderSize: "订单规模", discount: "折扣", benefitsEyebrow: "你能得到什么", benefitsTitle: "为合作而生,不只是交易。", verticalsEyebrow: "服务的行业", verticalsTitle: "物流、网约车、经销商网络的信赖之选。", quoteTitle: "获取报价", quoteSub: "专员将在 1 个工作日内回复。", fCompany: "公司名称", fName: "你的姓名", fEmail: "工作邮箱", fPhone: "电话", fVolume: "预估订购数量", fAbout: "请说明车队规模、时间表以及所需集成", fSubmit: "提交报价请求", faqTitle: "常见问题。", faqEyebrow: "FAQ" },
  ja: { eyebrow: "卸売 & フリート", title: "車両を装備し、ドライバーを守る。", sub: "10 台でも 10,000 台でも、価格・取り付け・テレマティクス連携・継続サポートまで一緒に進めます。初回ご発注から専任マネージャーがつきます。", quoteCta: "見積もり依頼", pricingEyebrow: "価格", pricingTitle: "透明な階層、再注文でも不意打ちなし。", pricingNote: "割引は付属品を含む全カタログに適用。同一 PO の明細は累積可能。", orderSize: "発注規模", discount: "割引", benefitsEyebrow: "得られるもの", benefitsTitle: "取引ではなくパートナーシップのために。", verticalsEyebrow: "対応業界", verticalsTitle: "物流、配車、ディーラーネットワークに信頼される。", quoteTitle: "見積もりを取得", quoteSub: "1 営業日以内に専門スタッフが返信します。", fCompany: "会社名", fName: "お名前", fEmail: "業務用メール", fPhone: "電話番号", fVolume: "予想台数", fAbout: "車両規模、スケジュール、必要な連携を教えてください", fSubmit: "見積もり依頼を送信", faqTitle: "よくある質問。", faqEyebrow: "FAQ" },
  de: { eyebrow: "Großhandel & Flotte", title: "Rüsten Sie Ihre Flotte aus. Schützen Sie Ihre Fahrer.", sub: "Egal ob 10 oder 10.000 Fahrzeuge — wir sind Ihr Partner bei Preisen, Installation, Telematik-Integration und laufendem Support. Ab der ersten Bestellung ein eigener Account Manager.", quoteCta: "Angebot anfragen", pricingEyebrow: "Preise", pricingTitle: "Transparente Stufen. Keine Überraschungen bei Nachbestellung.", pricingNote: "Rabatte gelten für den gesamten Katalog, inkl. Zubehör. Kumulativ über Positionen einer PO.", orderSize: "Bestellgröße", discount: "Rabatt", benefitsEyebrow: "Was Sie bekommen", benefitsTitle: "Für Partnerschaften gebaut, nicht für Transaktionen.", verticalsEyebrow: "Branchen, die wir bedienen", verticalsTitle: "Vertrauen in Logistik, Ride-Hailing und Händlernetzen.", quoteTitle: "Angebot anfordern", quoteSub: "Ein Spezialist meldet sich innerhalb eines Werktages.", fCompany: "Firmenname", fName: "Ihr Name", fEmail: "Geschäftliche E-Mail", fPhone: "Telefon", fVolume: "Geschätzte Stückzahl", fAbout: "Erzählen Sie uns über Ihre Flotte, Zeitplan und benötigte Integrationen", fSubmit: "Angebot anfragen", faqTitle: "Häufige Fragen.", faqEyebrow: "FAQ" },
  fr: { eyebrow: "Vente en gros & Flotte", title: "Équipez votre flotte. Protégez vos chauffeurs.", sub: "Que vous gériez 10 ou 10 000 véhicules, nous vous accompagnons sur les prix, l'installation, l'intégration télématique et le support continu. Un account manager dédié dès la première commande.", quoteCta: "Demander un devis", pricingEyebrow: "Tarifs", pricingTitle: "Paliers transparents. Pas de surprise au réapprovisionnement.", pricingNote: "Remises sur l'ensemble du catalogue, accessoires inclus. Cumulatives sur les lignes d'un même bon de commande.", orderSize: "Volume de commande", discount: "Remise", benefitsEyebrow: "Ce que vous obtenez", benefitsTitle: "Pensé pour les partenariats, pas les transactions.", verticalsEyebrow: "Secteurs servis", verticalsTitle: "De confiance en logistique, VTC et réseaux de distribution.", quoteTitle: "Obtenir un devis", quoteSub: "Un spécialiste répond sous 1 jour ouvré.", fCompany: "Nom de l'entreprise", fName: "Votre nom", fEmail: "E-mail professionnel", fPhone: "Téléphone", fVolume: "Volume d'unités estimé", fAbout: "Parlez-nous de votre flotte, du calendrier et des intégrations nécessaires", fSubmit: "Demander un devis", faqTitle: "Questions fréquentes.", faqEyebrow: "FAQ" },
  es: { eyebrow: "Mayorista y Flotas", title: "Equipa tu flota. Protege a tus conductores.", sub: "Ya operes 10 o 10.000 vehículos, somos tu partner en precios, instalación, integración telemática y soporte continuo. Un gestor de cuenta dedicado desde el primer pedido.", quoteCta: "Solicitar presupuesto", pricingEyebrow: "Precios", pricingTitle: "Tramos transparentes. Sin sorpresas en el re-pedido.", pricingNote: "Los descuentos se aplican a todo el catálogo, incluidos accesorios. Acumulables entre líneas del mismo PO.", orderSize: "Tamaño del pedido", discount: "Descuento", benefitsEyebrow: "Lo que recibes", benefitsTitle: "Diseñado para partners, no transacciones.", verticalsEyebrow: "Sectores que atendemos", verticalsTitle: "Confianza en logística, VTC y redes de concesionarios.", quoteTitle: "Obtener presupuesto", quoteSub: "Un especialista responde en 1 día laborable.", fCompany: "Nombre de la empresa", fName: "Tu nombre", fEmail: "Email profesional", fPhone: "Teléfono", fVolume: "Volumen estimado", fAbout: "Cuéntanos tu flota, calendario y las integraciones que necesitas", fSubmit: "Solicitar presupuesto", faqTitle: "Preguntas frecuentes.", faqEyebrow: "FAQ" },
  it: { eyebrow: "Wholesale & Flotte", title: "Equipaggia la tua flotta. Proteggi i tuoi autisti.", sub: "Che tu gestisca 10 o 10.000 veicoli, collaboriamo con te su prezzi, installazione, integrazione telematica e supporto continuo. Account manager dedicato dal primo ordine.", quoteCta: "Richiedi preventivo", pricingEyebrow: "Prezzi", pricingTitle: "Fasce trasparenti. Nessuna sorpresa al riordino.", pricingNote: "Sconti su tutto il catalogo, accessori inclusi. Cumulabili sulle voci dello stesso PO.", orderSize: "Dimensione ordine", discount: "Sconto", benefitsEyebrow: "Cosa ricevi", benefitsTitle: "Pensato per partner, non per transazioni.", verticalsEyebrow: "Settori serviti", verticalsTitle: "Affidabile per logistica, NCC e reti di dealer.", quoteTitle: "Ottieni un preventivo", quoteSub: "Uno specialista risponderà entro 1 giorno lavorativo.", fCompany: "Nome azienda", fName: "Il tuo nome", fEmail: "Email lavorativa", fPhone: "Telefono", fVolume: "Volume stimato", fAbout: "Descrivi la tua flotta, i tempi e le integrazioni richieste", fSubmit: "Richiedi preventivo", faqTitle: "Domande frequenti.", faqEyebrow: "FAQ" },
  ru: { eyebrow: "Опт и автопарки", title: "Оборудуйте автопарк. Защитите водителей.", sub: "10 машин или 10 000 — мы партнёр в ценах, установке, интеграции с телематикой и постоянной поддержке. Персональный менеджер с первого заказа.", quoteCta: "Запросить расчёт", pricingEyebrow: "Цены", pricingTitle: "Прозрачные уровни. Никаких сюрпризов при дозаказе.", pricingNote: "Скидки на весь каталог, включая аксессуары. Суммируются по позициям одного PO.", orderSize: "Объём заказа", discount: "Скидка", benefitsEyebrow: "Что вы получаете", benefitsTitle: "Создано для партнёрств, не для сделок.", verticalsEyebrow: "Отрасли", verticalsTitle: "Доверие в логистике, ride-hailing и дилерских сетях.", quoteTitle: "Получить расчёт", quoteSub: "Специалист ответит в течение 1 рабочего дня.", fCompany: "Название компании", fName: "Ваше имя", fEmail: "Рабочий email", fPhone: "Телефон", fVolume: "Ориентировочный объём", fAbout: "Расскажите о парке, сроках и нужных интеграциях", fSubmit: "Запросить расчёт", faqTitle: "Частые вопросы.", faqEyebrow: "FAQ" },
  pl: { eyebrow: "Hurt i Flota", title: "Wyposaż flotę. Chroń kierowców.", sub: "Niezależnie czy masz 10 czy 10 000 pojazdów — wspieramy w cenach, montażu, integracji telematyki i ciągłym wsparciu. Dedykowany opiekun konta od pierwszego zamówienia.", quoteCta: "Zapytaj o wycenę", pricingEyebrow: "Cennik", pricingTitle: "Przejrzyste progi. Bez niespodzianek przy doamawianiu.", pricingNote: "Rabaty na cały katalog, łącznie z akcesoriami. Kumulacja w obrębie tej samej PO.", orderSize: "Wielkość zamówienia", discount: "Rabat", benefitsEyebrow: "Co otrzymujesz", benefitsTitle: "Stworzone dla partnerstw, nie transakcji.", verticalsEyebrow: "Branże, które obsługujemy", verticalsTitle: "Zaufanie w logistyce, ride-hailing i sieciach dealerskich.", quoteTitle: "Pobierz wycenę", quoteSub: "Specjalista odpowie w 1 dzień roboczy.", fCompany: "Nazwa firmy", fName: "Twoje imię", fEmail: "Email służbowy", fPhone: "Telefon", fVolume: "Szacowana ilość sztuk", fAbout: "Opowiedz o flocie, terminach i potrzebnych integracjach", fSubmit: "Zapytaj o wycenę", faqTitle: "Częste pytania.", faqEyebrow: "FAQ" },
  ro: { eyebrow: "En-gros & Flote", title: "Echipează-ți flota. Protejează șoferii.", sub: "Indiferent dacă operezi 10 sau 10.000 de vehicule, suntem partener pe prețuri, instalare, integrare telematică și suport continuu. Account manager dedicat de la prima comandă.", quoteCta: "Cere o ofertă", pricingEyebrow: "Prețuri", pricingTitle: "Praguri transparente. Fără surprize la recomandă.", pricingNote: "Reducerile se aplică pe tot catalogul, inclusiv accesorii. Cumulative pe pozițiile aceleiași PO.", orderSize: "Mărime comandă", discount: "Reducere", benefitsEyebrow: "Ce primești", benefitsTitle: "Construit pentru parteneriate, nu tranzacții.", verticalsEyebrow: "Industrii deservite", verticalsTitle: "De încredere în logistică, ride-hailing și rețele de dealeri.", quoteTitle: "Obține o ofertă", quoteSub: "Un specialist răspunde în 1 zi lucrătoare.", fCompany: "Numele companiei", fName: "Numele tău", fEmail: "Email business", fPhone: "Telefon", fVolume: "Volum estimat", fAbout: "Spune-ne despre flotă, termene și integrările necesare", fSubmit: "Cere o ofertă", faqTitle: "Întrebări frecvente.", faqEyebrow: "FAQ" },
  tr: { eyebrow: "Toptan & Filo", title: "Filonu donat. Sürücülerini koru.", sub: "İster 10, ister 10.000 araç işletin — fiyat, kurulum, telematik entegrasyon ve sürekli destekte sizinle birlikteyiz. İlk siparişten itibaren özel müşteri yöneticisi.", quoteCta: "Teklif iste", pricingEyebrow: "Fiyatlandırma", pricingTitle: "Şeffaf kademeler. Tekrar siparişte sürpriz yok.", pricingNote: "İndirimler tüm katalogda geçerli, aksesuarlar dahil. Aynı PO satırlarında birikir.", orderSize: "Sipariş büyüklüğü", discount: "İndirim", benefitsEyebrow: "Sunduklarımız", benefitsTitle: "İşlem için değil, ortaklık için inşa edildi.", verticalsEyebrow: "Hizmet verdiğimiz sektörler", verticalsTitle: "Lojistik, taksicilik ve bayi ağlarında güvenilir.", quoteTitle: "Teklif al", quoteSub: "Bir uzman 1 iş günü içinde yanıtlayacak.", fCompany: "Şirket adı", fName: "Adınız", fEmail: "İş e-postası", fPhone: "Telefon", fVolume: "Tahmini adet", fAbout: "Filonuz, takvim ve ihtiyaç duyduğunuz entegrasyonlar hakkında bilgi verin", fSubmit: "Teklif iste", faqTitle: "Sık sorulanlar.", faqEyebrow: "SSS" },
  pt: { eyebrow: "Atacado & Frota", title: "Equipe sua frota. Proteja seus motoristas.", sub: "Seja com 10 ou 10.000 veículos, somos parceiros em preço, instalação, integração telemática e suporte contínuo. Gerente de conta dedicado já no primeiro pedido.", quoteCta: "Solicitar cotação", pricingEyebrow: "Preços", pricingTitle: "Faixas transparentes. Sem surpresas na recompra.", pricingNote: "Descontos valem para todo o catálogo, inclusive acessórios. Cumulativos em linhas da mesma PO.", orderSize: "Tamanho do pedido", discount: "Desconto", benefitsEyebrow: "O que você recebe", benefitsTitle: "Feito para parcerias, não transações.", verticalsEyebrow: "Setores que atendemos", verticalsTitle: "Confiança em logística, ride-hailing e redes de concessionárias.", quoteTitle: "Obter cotação", quoteSub: "Um especialista responderá em 1 dia útil.", fCompany: "Nome da empresa", fName: "Seu nome", fEmail: "Email corporativo", fPhone: "Telefone", fVolume: "Volume estimado", fAbout: "Conte sobre sua frota, prazos e integrações necessárias", fSubmit: "Solicitar cotação", faqTitle: "Perguntas frequentes.", faqEyebrow: "FAQ" },
  ar: { eyebrow: "الجملة والأساطيل", title: "جهّز أسطولك. احمِ سائقيك.", sub: "سواء كنت تدير 10 مركبات أو 10,000، نشاركك في التسعير، التركيب، تكامل التليماتيك، والدعم المستمر. مدير حساب مخصص من الطلب الأول.", quoteCta: "اطلب عرض سعر", pricingEyebrow: "التسعير", pricingTitle: "مستويات شفافة. لا مفاجآت عند إعادة الطلب.", pricingNote: "تنطبق الخصومات على الكتالوج بأكمله، بما فيه الإكسسوارات. تتراكم على بنود نفس أمر الشراء.", orderSize: "حجم الطلب", discount: "الخصم", benefitsEyebrow: "ما ستحصل عليه", benefitsTitle: "مبني للشراكات، لا للمعاملات.", verticalsEyebrow: "القطاعات التي نخدمها", verticalsTitle: "موثوقون في اللوجستيات، نقل الركاب، وشبكات الوكلاء.", quoteTitle: "احصل على عرض سعر", quoteSub: "سيرد عليك مختص خلال يوم عمل واحد.", fCompany: "اسم الشركة", fName: "اسمك", fEmail: "البريد الإلكتروني للعمل", fPhone: "الهاتف", fVolume: "الحجم المتوقع", fAbout: "أخبرنا عن الأسطول والجدول الزمني والتكاملات المطلوبة", fSubmit: "اطلب عرض سعر", faqTitle: "أسئلة شائعة.", faqEyebrow: "الأسئلة الشائعة" },
  th: { eyebrow: "ขายส่ง & ฟลีท", title: "ติดตั้งให้ฟลีทของคุณ ปกป้องคนขับ", sub: "ไม่ว่าคุณบริหาร 10 หรือ 10,000 คัน เราร่วมมือกับคุณในเรื่องราคา การติดตั้ง การเชื่อมต่อ Telematics และการสนับสนุนต่อเนื่อง มีผู้จัดการบัญชีดูแลตั้งแต่ออเดอร์แรก", quoteCta: "ขอใบเสนอราคา", pricingEyebrow: "ราคา", pricingTitle: "ระดับโปร่งใส ไม่มีเซอร์ไพรส์ตอนสั่งซ้ำ", pricingNote: "ส่วนลดใช้กับทั้งแคตตาล็อก รวมอุปกรณ์เสริม สะสมในรายการของ PO เดียวกัน", orderSize: "ขนาดออเดอร์", discount: "ส่วนลด", benefitsEyebrow: "สิ่งที่คุณจะได้", benefitsTitle: "สร้างเพื่อคู่ค้า ไม่ใช่ดีลครั้งเดียว", verticalsEyebrow: "อุตสาหกรรมที่เราดูแล", verticalsTitle: "ไว้ใจได้ในวงการโลจิสติกส์, Rideshare และเครือข่ายตัวแทน", quoteTitle: "ขอใบเสนอราคา", quoteSub: "ผู้เชี่ยวชาญจะตอบกลับภายใน 1 วันทำการ", fCompany: "ชื่อบริษัท", fName: "ชื่อของคุณ", fEmail: "อีเมลที่ทำงาน", fPhone: "โทรศัพท์", fVolume: "จำนวนหน่วยโดยประมาณ", fAbout: "เล่าเกี่ยวกับฟลีท ระยะเวลา และการเชื่อมต่อที่ต้องการ", fSubmit: "ขอใบเสนอราคา", faqTitle: "คำถามที่พบบ่อย", faqEyebrow: "FAQ" },
  vi: { eyebrow: "Bán buôn & Đội xe", title: "Trang bị đội xe. Bảo vệ tài xế.", sub: "Dù bạn vận hành 10 hay 10.000 xe, chúng tôi đồng hành về giá, lắp đặt, tích hợp telematics và hỗ trợ liên tục. Người quản lý tài khoản chuyên trách ngay từ đơn đầu tiên.", quoteCta: "Yêu cầu báo giá", pricingEyebrow: "Giá", pricingTitle: "Bậc giá minh bạch. Không bất ngờ khi đặt lại.", pricingNote: "Chiết khấu áp dụng cho cả catalogue, kể cả phụ kiện. Cộng dồn trên các dòng cùng PO.", orderSize: "Quy mô đơn hàng", discount: "Chiết khấu", benefitsEyebrow: "Bạn nhận được gì", benefitsTitle: "Xây dựng cho hợp tác, không phải giao dịch.", verticalsEyebrow: "Ngành chúng tôi phục vụ", verticalsTitle: "Được tin dùng ở logistics, xe công nghệ và đại lý.", quoteTitle: "Lấy báo giá", quoteSub: "Chuyên viên sẽ phản hồi trong 1 ngày làm việc.", fCompany: "Tên công ty", fName: "Tên của bạn", fEmail: "Email công việc", fPhone: "Điện thoại", fVolume: "Số lượng ước tính", fAbout: "Kể về đội xe, lịch trình và các tích hợp bạn cần", fSubmit: "Yêu cầu báo giá", faqTitle: "Câu hỏi thường gặp.", faqEyebrow: "FAQ" },
};

export default function WholesalePageClient({ content }: { content: WholesaleContent }) {
  const { locale } = useLocale();
  const t = COPY[locale] ?? COPY.en!;
  const { tiers, benefits, verticals, faq } = content;
  return (
    <main className="bg-white">
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-32 md:pt-40 lg:px-10">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">{t.eyebrow}</p>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">{t.title}</h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg">{t.sub}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="#quote" className="inline-flex items-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700">{t.quoteCta}</Link>
              <a href="mailto:fleet@azdome.com" className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition-all duration-300 hover:shadow-md">fleet@azdome.com</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="mb-12 max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">{t.pricingEyebrow}</p>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">{t.pricingTitle}</h2>
          </div>
          <div className="overflow-hidden rounded-2xl bg-slate-50 shadow-sm">
            <table className="w-full text-left">
              <thead className="border-b border-white">
                <tr className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  <th className="px-6 py-4">{t.orderSize}</th>
                  <th className="px-6 py-4">{t.discount}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white text-sm">
                {tiers.map((ti) => (
                  <tr key={ti.range} className="text-slate-700">
                    <td className="px-6 py-5 font-semibold tracking-tight text-slate-900">{ti.range}</td>
                    <td className="px-6 py-5 tabular-nums">{ti.discount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-slate-400">{t.pricingNote}</p>
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
              const Icon = ICONS[b.iconName] ?? Package2;
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
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14 max-w-2xl md:mb-16">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">{t.verticalsEyebrow}</p>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">{t.verticalsTitle}</h2>
          </div>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            {verticals.map((v) => {
              const Icon = ICONS[v.iconName] ?? Briefcase;
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

      <section id="quote" className="scroll-mt-28 bg-slate-50 py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-6 lg:px-10">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">{t.quoteTitle}</h2>
          <p className="mt-2 text-sm text-slate-500">{t.quoteSub}</p>
          <form className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
            <input placeholder={t.fCompany} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15" />
            <input placeholder={t.fName} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15" />
            <input placeholder={t.fEmail} type="email" className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15" />
            <input placeholder={t.fPhone} className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15" />
            <input placeholder={t.fVolume} className="md:col-span-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15" />
            <textarea rows={4} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15 md:col-span-2" placeholder={t.fAbout} />
            <button className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700 md:col-span-2">{t.fSubmit}</button>
          </form>
        </div>
      </section>

      <FaqAccordion faqs={faq} title={t.faqTitle} eyebrow={t.faqEyebrow} />
    </main>
  );
}
