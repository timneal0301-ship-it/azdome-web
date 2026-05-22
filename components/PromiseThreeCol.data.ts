import type { Locale } from "@/lib/i18n/dictionaries";

export const PROMISE_ICONS = [
  "RotateCcw",
  "ShieldCheck",
  "Truck",
  "HeartHandshake",
  "Headphones",
  "Wrench",
  "CheckCircle2",
  "Package",
] as const;

export type Promise = {
  iconName: string;
  title: string;
  body: string;
  hidden?: boolean;
};

const EN: Promise[] = [
  { iconName: "RotateCcw", title: "30-day free returns", body: "Try any AZDOME camera for 30 days. If it isn't the right fit, return it for a full refund — no restocking fees." },
  { iconName: "ShieldCheck", title: "2-year warranty included", body: "Every product is covered for two years against manufacturing defects. Wholesale orders extend to three years." },
  { iconName: "Truck", title: "Free US shipping over $99", body: "Orders over $99 ship free to the contiguous US. Most orders arrive in 2–4 business days." },
];

const PROMISES_BY_LOCALE: Partial<Record<Locale, Promise[]>> = {
  en: EN,
  zh: [
    { iconName: "RotateCcw", title: "30 天无理由退货", body: "任意 AZDOME 摄像头试用 30 天。不合适就全额退款 — 无任何重新入库费。" },
    { iconName: "ShieldCheck", title: "2 年质保", body: "每个产品针对制造缺陷享 2 年质保。批发订单延长至 3 年。" },
    { iconName: "Truck", title: "美国 $99 以上免运", body: "美国本土 48 州订单满 $99 免运。大多数订单 2-4 个工作日送达。" },
  ],
  ja: [
    { iconName: "RotateCcw", title: "30 日間無料返品", body: "AZDOME カメラを 30 日間お試しください。合わなければ全額返金 — 再入庫手数料なし。" },
    { iconName: "ShieldCheck", title: "2 年保証付属", body: "全製品に製造上の欠陥に対する 2 年保証付き。卸売注文は 3 年に延長。" },
    { iconName: "Truck", title: "$99 以上で米国送料無料", body: "$99 以上の注文は米国本土 48 州へ送料無料。多くは 2-4 営業日で到着。" },
  ],
  de: [
    { iconName: "RotateCcw", title: "30 Tage kostenlose Rückgabe", body: "Probieren Sie jede AZDOME-Kamera 30 Tage lang aus. Passt sie nicht, vollständige Rückerstattung — keine Wiedereinlagerungsgebühren." },
    { iconName: "ShieldCheck", title: "2 Jahre Garantie inklusive", body: "Jedes Produkt ist 2 Jahre gegen Herstellungsfehler abgesichert. Großhandelsbestellungen verlängern auf 3 Jahre." },
    { iconName: "Truck", title: "Kostenloser US-Versand ab $99", body: "Bestellungen über $99 versandkostenfrei in die kontinentalen USA. Die meisten Bestellungen kommen in 2-4 Werktagen an." },
  ],
  fr: [
    { iconName: "RotateCcw", title: "30 jours pour retourner", body: "Essayez toute caméra AZDOME pendant 30 jours. Si elle ne convient pas, remboursement complet — sans frais de réapprovisionnement." },
    { iconName: "ShieldCheck", title: "Garantie 2 ans incluse", body: "Chaque produit est couvert pendant deux ans contre les défauts de fabrication. Les commandes wholesale passent à trois ans." },
    { iconName: "Truck", title: "Livraison US gratuite > $99", body: "Les commandes de plus de $99 sont expédiées gratuitement aux États-Unis continentaux. La plupart arrivent en 2-4 jours ouvrés." },
  ],
  es: [
    { iconName: "RotateCcw", title: "Devolución gratis 30 días", body: "Prueba cualquier cámara AZDOME durante 30 días. Si no encaja, te la devolvemos al 100% — sin cargos de reposición." },
    { iconName: "ShieldCheck", title: "Garantía 2 años incluida", body: "Cada producto está cubierto dos años contra defectos de fabricación. Los pedidos al por mayor se extienden a tres años." },
    { iconName: "Truck", title: "Envío US gratis sobre $99", body: "Pedidos superiores a $99 con envío gratis a EE.UU. continental. La mayoría llega en 2-4 días laborables." },
  ],
  it: [
    { iconName: "RotateCcw", title: "Reso gratuito 30 giorni", body: "Prova qualsiasi telecamera AZDOME per 30 giorni. Se non è adatta, rimborso totale — nessuna commissione di rimagazzinamento." },
    { iconName: "ShieldCheck", title: "Garanzia 2 anni inclusa", body: "Ogni prodotto è coperto due anni dai difetti di fabbricazione. Gli ordini wholesale si estendono a tre anni." },
    { iconName: "Truck", title: "Spedizione US gratis oltre $99", body: "Ordini oltre $99 con spedizione gratuita negli USA continentali. La maggior parte arriva in 2-4 giorni lavorativi." },
  ],
  ru: [
    { iconName: "RotateCcw", title: "Возврат 30 дней бесплатно", body: "Попробуйте любую камеру AZDOME 30 дней. Если не подошла — полный возврат, никаких комиссий за возврат на склад." },
    { iconName: "ShieldCheck", title: "Гарантия 2 года", body: "Каждый продукт покрыт 2 годами гарантии на производственные дефекты. Оптовые заказы продлеваются до 3 лет." },
    { iconName: "Truck", title: "Бесплатная доставка по США от $99", body: "Заказы от $99 — бесплатная доставка по континентальной части США. Большинство приходит за 2-4 рабочих дня." },
  ],
  pl: [
    { iconName: "RotateCcw", title: "30 dni na zwrot", body: "Wypróbuj dowolną kamerę AZDOME przez 30 dni. Jeśli nie pasuje, pełen zwrot — bez opłat restockingowych." },
    { iconName: "ShieldCheck", title: "2 lata gwarancji w cenie", body: "Każdy produkt objęty 2-letnią gwarancją na wady fabryczne. Zamówienia hurtowe wydłużone do 3 lat." },
    { iconName: "Truck", title: "Darmowa wysyłka US > $99", body: "Zamówienia powyżej $99 z darmową wysyłką do kontynentalnych USA. Większość dociera w 2-4 dni robocze." },
  ],
  ro: [
    { iconName: "RotateCcw", title: "Retur gratuit 30 de zile", body: "Încearcă orice cameră AZDOME 30 de zile. Dacă nu se potrivește, rambursare integrală — fără taxe de restocking." },
    { iconName: "ShieldCheck", title: "Garanție 2 ani inclusă", body: "Fiecare produs are 2 ani de garanție pentru defecte de fabricație. Comenzile en-gros se extind la 3 ani." },
    { iconName: "Truck", title: "Transport US gratuit peste $99", body: "Comenzi peste $99 cu transport gratuit în SUA continentală. Majoritatea ajung în 2-4 zile lucrătoare." },
  ],
  tr: [
    { iconName: "RotateCcw", title: "30 gün ücretsiz iade", body: "Herhangi bir AZDOME kamerasını 30 gün boyunca deneyin. Uymazsa tam para iadesi — yeniden stoklama ücreti yok." },
    { iconName: "ShieldCheck", title: "2 yıl garanti dahil", body: "Her ürün üretim hatalarına karşı iki yıl kapsam altında. Toptan siparişler 3 yıla uzar." },
    { iconName: "Truck", title: "$99 üzeri ABD ücretsiz kargo", body: "$99 üzeri siparişler ABD anakarasına ücretsiz. Çoğu sipariş 2-4 iş günü içinde gelir." },
  ],
  pt: [
    { iconName: "RotateCcw", title: "Devolução gratuita 30 dias", body: "Experimente qualquer câmera AZDOME por 30 dias. Se não servir, reembolso total — sem taxa de reestoque." },
    { iconName: "ShieldCheck", title: "Garantia 2 anos inclusa", body: "Todo produto é coberto por 2 anos contra defeitos de fabricação. Pedidos atacado estendem para 3 anos." },
    { iconName: "Truck", title: "Frete grátis nos EUA acima de $99", body: "Pedidos acima de $99 com frete grátis para os EUA continentais. A maioria chega em 2-4 dias úteis." },
  ],
  ar: [
    { iconName: "RotateCcw", title: "إرجاع مجاني خلال 30 يومًا", body: "جرّب أي كاميرا AZDOME لمدة 30 يومًا. إذا لم تكن مناسبة، استرداد كامل — بلا رسوم إعادة تخزين." },
    { iconName: "ShieldCheck", title: "ضمان سنتان مشمول", body: "كل منتج مشمول بضمان سنتين ضد عيوب التصنيع. تمتد طلبات الجملة إلى ثلاث سنوات." },
    { iconName: "Truck", title: "شحن مجاني داخل الولايات المتحدة فوق $99", body: "الطلبات فوق $99 تُشحن مجانًا إلى الولايات المتحدة المتجاورة. تصل أغلب الطلبات خلال 2-4 أيام عمل." },
  ],
  th: [
    { iconName: "RotateCcw", title: "คืนสินค้าฟรี 30 วัน", body: "ลองใช้กล้อง AZDOME รุ่นใดก็ได้ 30 วัน หากไม่เหมาะ คืนเงินเต็มจำนวน — ไม่มีค่าธรรมเนียมเก็บคลัง" },
    { iconName: "ShieldCheck", title: "รับประกัน 2 ปี รวมในราคา", body: "ทุกผลิตภัณฑ์รับประกันข้อบกพร่องจากการผลิต 2 ปี ออเดอร์ขายส่งขยายเป็น 3 ปี" },
    { iconName: "Truck", title: "ส่งฟรีในสหรัฐฯ เมื่อสั่งเกิน $99", body: "สั่งซื้อเกิน $99 ส่งฟรีทั่วสหรัฐฯ แผ่นดินใหญ่ ส่วนใหญ่ถึงภายใน 2-4 วันทำการ" },
  ],
  vi: [
    { iconName: "RotateCcw", title: "Đổi trả miễn phí 30 ngày", body: "Dùng thử bất kỳ camera AZDOME nào trong 30 ngày. Nếu không phù hợp, hoàn tiền 100% — không phí nhập kho lại." },
    { iconName: "ShieldCheck", title: "Bảo hành 2 năm đã bao gồm", body: "Mọi sản phẩm được bảo hành 2 năm cho lỗi sản xuất. Đơn bán buôn kéo dài 3 năm." },
    { iconName: "Truck", title: "Miễn phí ship Mỹ trên $99", body: "Đơn trên $99 miễn phí ship đến Mỹ lục địa. Hầu hết đến trong 2-4 ngày làm việc." },
  ],
};

export function getDefaultPromises(locale: Locale): Promise[] {
  return PROMISES_BY_LOCALE[locale] ?? PROMISES_BY_LOCALE.en!;
}

export const DEFAULT_PROMISES: Promise[] = EN;
