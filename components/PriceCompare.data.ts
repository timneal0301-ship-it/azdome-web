import type { Locale } from "@/lib/i18n/dictionaries";

export type CompareBrand = {
  name: string;
  price?: string;
  /** When true, this column gets the brand highlight ring + badge. */
  highlight?: boolean;
};

export type CompareRow = {
  feature: string;
  /** Aligned with `brands[]`. Either a short string ("Yes", "256GB", "—") or
   * a special sentinel "✓" / "✗" / "—" for icon cells. */
  values: string[];
};

export type CompareContent = {
  eyebrow?: string;
  title?: string;
  body?: string;
  brands: CompareBrand[];
  rows: CompareRow[];
};

// EN canonical
const EN: CompareContent = {
  eyebrow: "Why AZDOME",
  title: "More inside. Less to pay.",
  body:
    "Common dash cam categories at this price point — what you usually get, and what the M550 Pro adds. Comparison based on publicly available spec sheets as of April 2026.",
  brands: [
    { name: "AZDOME M550 Pro", price: "$129.99", highlight: true },
    { name: "Typical 4K dash cam", price: "~$159" },
    { name: "Mirror-style cam", price: "~$229" },
  ],
  rows: [
    { feature: "True 4K (3840×2160) front", values: ["✓", "✓", "✗"] },
    { feature: "Sony Starvis 2 sensor", values: ["✓", "✗", "✗"] },
    { feature: "Dual-band 5GHz Wi-Fi", values: ["✓", "—", "✓"] },
    { feature: "Built-in GPS", values: ["✓", "✓", "✗"] },
    { feature: "On-device ADAS", values: ["✓", "—", "✗"] },
    { feature: "24h parking mode", values: ["✓", "—", "✓"] },
    { feature: "Free firmware updates", values: ["5 years", "1 year", "—"] },
    { feature: "Warranty included", values: ["2 years", "1 year", "1 year"] },
  ],
};

// Feature labels + the duration cells translate; brand names ("AZDOME
// M550 Pro", "Typical 4K dash cam", "Mirror-style cam"), prices, and
// ✓/✗/— sentinels stay verbatim across locales.
const COMPARE_BY_LOCALE: Partial<Record<Locale, CompareContent>> = {
  en: EN,
  zh: {
    eyebrow: "为什么选 AZDOME",
    title: "配置更多,价格更低。",
    body: "该价位常见行车记录仪 — 通常给你什么,M550 Pro 多给你什么。对比基于截至 2026 年 4 月的公开参数表。",
    brands: [
      { name: "AZDOME M550 Pro", price: "$129.99", highlight: true },
      { name: "同价位 4K 行车记录仪", price: "约 $159" },
      { name: "后视镜型记录仪", price: "约 $229" },
    ],
    rows: [
      { feature: "原生 4K(3840×2160)前录", values: ["✓", "✓", "✗"] },
      { feature: "Sony Starvis 2 传感器", values: ["✓", "✗", "✗"] },
      { feature: "双频 5GHz Wi-Fi", values: ["✓", "—", "✓"] },
      { feature: "内置 GPS", values: ["✓", "✓", "✗"] },
      { feature: "设备端 ADAS", values: ["✓", "—", "✗"] },
      { feature: "24 小时停车监控", values: ["✓", "—", "✓"] },
      { feature: "免费固件更新", values: ["5 年", "1 年", "—"] },
      { feature: "随附质保", values: ["2 年", "1 年", "1 年"] },
    ],
  },
  ja: {
    eyebrow: "AZDOME を選ぶ理由",
    title: "中身は多く、お支払いは少なく。",
    body: "この価格帯の一般的なドライブレコーダー — 通常含まれるものと、M550 Pro が加えるもの。2026 年 4 月時点で公開されているスペックシートに基づく比較。",
    brands: [
      { name: "AZDOME M550 Pro", price: "$129.99", highlight: true },
      { name: "一般的な 4K ドラレコ", price: "約 $159" },
      { name: "ミラー型カメラ", price: "約 $229" },
    ],
    rows: [
      { feature: "リアル 4K(3840×2160)フロント", values: ["✓", "✓", "✗"] },
      { feature: "Sony Starvis 2 センサー", values: ["✓", "✗", "✗"] },
      { feature: "デュアルバンド 5GHz Wi-Fi", values: ["✓", "—", "✓"] },
      { feature: "GPS 内蔵", values: ["✓", "✓", "✗"] },
      { feature: "オンデバイス ADAS", values: ["✓", "—", "✗"] },
      { feature: "24 時間駐車モード", values: ["✓", "—", "✓"] },
      { feature: "無料ファームウェア更新", values: ["5 年", "1 年", "—"] },
      { feature: "保証付属", values: ["2 年", "1 年", "1 年"] },
    ],
  },
  de: {
    eyebrow: "Warum AZDOME",
    title: "Mehr drin. Weniger zu zahlen.",
    body: "Übliche Dashcam-Kategorien in dieser Preisklasse — was Sie normalerweise bekommen, und was die M550 Pro hinzufügt. Vergleich auf Basis öffentlich verfügbarer Datenblätter (Stand April 2026).",
    brands: [
      { name: "AZDOME M550 Pro", price: "$129.99", highlight: true },
      { name: "Typische 4K-Dashcam", price: "~$159" },
      { name: "Spiegel-Dashcam", price: "~$229" },
    ],
    rows: [
      { feature: "Echtes 4K (3840×2160) Front", values: ["✓", "✓", "✗"] },
      { feature: "Sony Starvis 2-Sensor", values: ["✓", "✗", "✗"] },
      { feature: "Dualband-5-GHz-WLAN", values: ["✓", "—", "✓"] },
      { feature: "Eingebautes GPS", values: ["✓", "✓", "✗"] },
      { feature: "On-Device-ADAS", values: ["✓", "—", "✗"] },
      { feature: "24h-Parkmodus", values: ["✓", "—", "✓"] },
      { feature: "Kostenlose Firmware-Updates", values: ["5 Jahre", "1 Jahr", "—"] },
      { feature: "Garantie inklusive", values: ["2 Jahre", "1 Jahr", "1 Jahr"] },
    ],
  },
  fr: {
    eyebrow: "Pourquoi AZDOME",
    title: "Plus dedans. Moins à payer.",
    body: "Catégories de dashcams habituelles à ce prix — ce que vous obtenez d'habitude, et ce que la M550 Pro ajoute. Comparaison basée sur des fiches techniques publiques à avril 2026.",
    brands: [
      { name: "AZDOME M550 Pro", price: "$129.99", highlight: true },
      { name: "Dashcam 4K typique", price: "~$159" },
      { name: "Caméra type rétroviseur", price: "~$229" },
    ],
    rows: [
      { feature: "Vrai 4K (3840×2160) avant", values: ["✓", "✓", "✗"] },
      { feature: "Capteur Sony Starvis 2", values: ["✓", "✗", "✗"] },
      { feature: "Wi-Fi 5 GHz double bande", values: ["✓", "—", "✓"] },
      { feature: "GPS intégré", values: ["✓", "✓", "✗"] },
      { feature: "ADAS embarqué", values: ["✓", "—", "✗"] },
      { feature: "Mode parking 24h", values: ["✓", "—", "✓"] },
      { feature: "Mises à jour firmware gratuites", values: ["5 ans", "1 an", "—"] },
      { feature: "Garantie incluse", values: ["2 ans", "1 an", "1 an"] },
    ],
  },
  es: {
    eyebrow: "Por qué AZDOME",
    title: "Más dentro. Menos a pagar.",
    body: "Categorías comunes de dash cam a este precio — lo que sueles llevarte, y lo que añade la M550 Pro. Comparativa basada en fichas técnicas públicas a abril de 2026.",
    brands: [
      { name: "AZDOME M550 Pro", price: "$129.99", highlight: true },
      { name: "Dash cam 4K típica", price: "~$159" },
      { name: "Cámara tipo retrovisor", price: "~$229" },
    ],
    rows: [
      { feature: "4K real (3840×2160) frontal", values: ["✓", "✓", "✗"] },
      { feature: "Sensor Sony Starvis 2", values: ["✓", "✗", "✗"] },
      { feature: "Wi-Fi 5 GHz doble banda", values: ["✓", "—", "✓"] },
      { feature: "GPS integrado", values: ["✓", "✓", "✗"] },
      { feature: "ADAS en dispositivo", values: ["✓", "—", "✗"] },
      { feature: "Modo aparcamiento 24h", values: ["✓", "—", "✓"] },
      { feature: "Actualizaciones firmware gratis", values: ["5 años", "1 año", "—"] },
      { feature: "Garantía incluida", values: ["2 años", "1 año", "1 año"] },
    ],
  },
  it: {
    eyebrow: "Perché AZDOME",
    title: "Più dentro. Meno da pagare.",
    body: "Categorie comuni di dash cam in questa fascia di prezzo — cosa ottieni di solito, e cosa aggiunge la M550 Pro. Confronto basato su schede tecniche pubbliche ad aprile 2026.",
    brands: [
      { name: "AZDOME M550 Pro", price: "$129.99", highlight: true },
      { name: "Dash cam 4K tipica", price: "~$159" },
      { name: "Telecamera tipo specchietto", price: "~$229" },
    ],
    rows: [
      { feature: "4K reale (3840×2160) anteriore", values: ["✓", "✓", "✗"] },
      { feature: "Sensore Sony Starvis 2", values: ["✓", "✗", "✗"] },
      { feature: "Wi-Fi 5 GHz dual-band", values: ["✓", "—", "✓"] },
      { feature: "GPS integrato", values: ["✓", "✓", "✗"] },
      { feature: "ADAS on-device", values: ["✓", "—", "✗"] },
      { feature: "Modalità parcheggio 24h", values: ["✓", "—", "✓"] },
      { feature: "Aggiornamenti firmware gratuiti", values: ["5 anni", "1 anno", "—"] },
      { feature: "Garanzia inclusa", values: ["2 anni", "1 anno", "1 anno"] },
    ],
  },
  ru: {
    eyebrow: "Почему AZDOME",
    title: "Больше внутри. Меньше платить.",
    body: "Типичные категории видеорегистраторов в этой цене — что вы обычно получаете и что добавляет M550 Pro. Сравнение по публичным спецификациям на апрель 2026.",
    brands: [
      { name: "AZDOME M550 Pro", price: "$129.99", highlight: true },
      { name: "Типичный 4K видеорегистратор", price: "~$159" },
      { name: "Камера-зеркало", price: "~$229" },
    ],
    rows: [
      { feature: "Настоящее 4K (3840×2160) спереди", values: ["✓", "✓", "✗"] },
      { feature: "Сенсор Sony Starvis 2", values: ["✓", "✗", "✗"] },
      { feature: "Двухдиапазонный Wi-Fi 5 ГГц", values: ["✓", "—", "✓"] },
      { feature: "Встроенный GPS", values: ["✓", "✓", "✗"] },
      { feature: "ADAS на устройстве", values: ["✓", "—", "✗"] },
      { feature: "Парковочный режим 24 ч", values: ["✓", "—", "✓"] },
      { feature: "Бесплатные обновления прошивки", values: ["5 лет", "1 год", "—"] },
      { feature: "Гарантия включена", values: ["2 года", "1 год", "1 год"] },
    ],
  },
  pl: {
    eyebrow: "Dlaczego AZDOME",
    title: "Więcej w środku. Mniej do zapłaty.",
    body: "Typowe kategorie kamer w tej cenie — co zwykle dostajesz i co dodaje M550 Pro. Porównanie na podstawie publicznie dostępnych specyfikacji z kwietnia 2026.",
    brands: [
      { name: "AZDOME M550 Pro", price: "$129.99", highlight: true },
      { name: "Typowa kamera 4K", price: "~$159" },
      { name: "Kamera w lusterku", price: "~$229" },
    ],
    rows: [
      { feature: "Prawdziwe 4K (3840×2160) z przodu", values: ["✓", "✓", "✗"] },
      { feature: "Matryca Sony Starvis 2", values: ["✓", "✗", "✗"] },
      { feature: "Dwuzakresowe Wi-Fi 5 GHz", values: ["✓", "—", "✓"] },
      { feature: "Wbudowany GPS", values: ["✓", "✓", "✗"] },
      { feature: "ADAS na urządzeniu", values: ["✓", "—", "✗"] },
      { feature: "Tryb parkowania 24h", values: ["✓", "—", "✓"] },
      { feature: "Darmowe aktualizacje firmware", values: ["5 lat", "1 rok", "—"] },
      { feature: "Gwarancja w cenie", values: ["2 lata", "1 rok", "1 rok"] },
    ],
  },
  ro: {
    eyebrow: "De ce AZDOME",
    title: "Mai mult înăuntru. Mai puțin de plătit.",
    body: "Categorii comune de camere auto la acest preț — ce primești de obicei și ce adaugă M550 Pro. Comparație bazată pe fișe tehnice publice din aprilie 2026.",
    brands: [
      { name: "AZDOME M550 Pro", price: "$129.99", highlight: true },
      { name: "Cameră 4K tipică", price: "~$159" },
      { name: "Cameră oglindă", price: "~$229" },
    ],
    rows: [
      { feature: "4K real (3840×2160) față", values: ["✓", "✓", "✗"] },
      { feature: "Senzor Sony Starvis 2", values: ["✓", "✗", "✗"] },
      { feature: "Wi-Fi 5 GHz dual-band", values: ["✓", "—", "✓"] },
      { feature: "GPS integrat", values: ["✓", "✓", "✗"] },
      { feature: "ADAS on-device", values: ["✓", "—", "✗"] },
      { feature: "Mod parcare 24h", values: ["✓", "—", "✓"] },
      { feature: "Actualizări firmware gratuite", values: ["5 ani", "1 an", "—"] },
      { feature: "Garanție inclusă", values: ["2 ani", "1 an", "1 an"] },
    ],
  },
  tr: {
    eyebrow: "Neden AZDOME",
    title: "Daha fazlası içeride. Daha azı ödenir.",
    body: "Bu fiyat noktasındaki yaygın araç kamerası kategorileri — genellikle ne aldığınız ve M550 Pro'nun neler eklediği. Karşılaştırma, Nisan 2026 itibarıyla genel erişime açık teknik özelliklere dayanmaktadır.",
    brands: [
      { name: "AZDOME M550 Pro", price: "$129.99", highlight: true },
      { name: "Tipik 4K araç kamerası", price: "~$159" },
      { name: "Ayna tipi kamera", price: "~$229" },
    ],
    rows: [
      { feature: "Gerçek 4K (3840×2160) ön", values: ["✓", "✓", "✗"] },
      { feature: "Sony Starvis 2 sensör", values: ["✓", "✗", "✗"] },
      { feature: "Çift bant 5GHz Wi-Fi", values: ["✓", "—", "✓"] },
      { feature: "Dahili GPS", values: ["✓", "✓", "✗"] },
      { feature: "Cihaz üstü ADAS", values: ["✓", "—", "✗"] },
      { feature: "24 saat park modu", values: ["✓", "—", "✓"] },
      { feature: "Ücretsiz yazılım güncellemeleri", values: ["5 yıl", "1 yıl", "—"] },
      { feature: "Garanti dahil", values: ["2 yıl", "1 yıl", "1 yıl"] },
    ],
  },
  pt: {
    eyebrow: "Por que AZDOME",
    title: "Mais por dentro. Menos para pagar.",
    body: "Categorias comuns de câmeras veiculares nesse preço — o que você costuma receber e o que a M550 Pro adiciona. Comparação baseada em fichas técnicas públicas de abril de 2026.",
    brands: [
      { name: "AZDOME M550 Pro", price: "$129.99", highlight: true },
      { name: "Câmera 4K típica", price: "~$159" },
      { name: "Câmera estilo espelho", price: "~$229" },
    ],
    rows: [
      { feature: "4K real (3840×2160) frontal", values: ["✓", "✓", "✗"] },
      { feature: "Sensor Sony Starvis 2", values: ["✓", "✗", "✗"] },
      { feature: "Wi-Fi 5 GHz dual-band", values: ["✓", "—", "✓"] },
      { feature: "GPS integrado", values: ["✓", "✓", "✗"] },
      { feature: "ADAS no dispositivo", values: ["✓", "—", "✗"] },
      { feature: "Modo estacionamento 24h", values: ["✓", "—", "✓"] },
      { feature: "Atualizações de firmware grátis", values: ["5 anos", "1 ano", "—"] },
      { feature: "Garantia incluída", values: ["2 anos", "1 ano", "1 ano"] },
    ],
  },
  ar: {
    eyebrow: "لماذا AZDOME",
    title: "ميزات أكثر. سعر أقل.",
    body: "فئات شائعة من كاميرات السيارة في هذه الفئة السعرية — ما تحصل عليه عادةً، وما تضيفه M550 Pro. مقارنة بناءً على أوراق المواصفات المتاحة للعموم اعتبارًا من أبريل 2026.",
    brands: [
      { name: "AZDOME M550 Pro", price: "$129.99", highlight: true },
      { name: "كاميرا 4K نموذجية", price: "~$159" },
      { name: "كاميرا بنمط المرآة", price: "~$229" },
    ],
    rows: [
      { feature: "4K حقيقي (3840×2160) أمامي", values: ["✓", "✓", "✗"] },
      { feature: "مستشعر Sony Starvis 2", values: ["✓", "✗", "✗"] },
      { feature: "Wi-Fi 5GHz ثنائي النطاق", values: ["✓", "—", "✓"] },
      { feature: "GPS مدمج", values: ["✓", "✓", "✗"] },
      { feature: "ADAS على الجهاز", values: ["✓", "—", "✗"] },
      { feature: "وضع وقوف 24 ساعة", values: ["✓", "—", "✓"] },
      { feature: "تحديثات برنامج ثابت مجانية", values: ["5 سنوات", "سنة", "—"] },
      { feature: "ضمان مشمول", values: ["سنتان", "سنة", "سنة"] },
    ],
  },
  th: {
    eyebrow: "ทำไม AZDOME",
    title: "เนื้อหามากกว่า จ่ายน้อยกว่า",
    body: "หมวดกล้องติดรถยนต์ที่พบบ่อยในช่วงราคานี้ — สิ่งที่คุณมักได้ และสิ่งที่ M550 Pro เพิ่มให้ การเปรียบเทียบอ้างอิงจากเอกสารสเปกสาธารณะ ณ เมษายน 2026",
    brands: [
      { name: "AZDOME M550 Pro", price: "$129.99", highlight: true },
      { name: "กล้อง 4K ทั่วไป", price: "~$159" },
      { name: "กล้องแบบกระจกมองหลัง", price: "~$229" },
    ],
    rows: [
      { feature: "4K แท้ (3840×2160) ด้านหน้า", values: ["✓", "✓", "✗"] },
      { feature: "เซ็นเซอร์ Sony Starvis 2", values: ["✓", "✗", "✗"] },
      { feature: "Wi-Fi 5GHz Dual-band", values: ["✓", "—", "✓"] },
      { feature: "GPS ในตัว", values: ["✓", "✓", "✗"] },
      { feature: "ADAS บนตัวเครื่อง", values: ["✓", "—", "✗"] },
      { feature: "โหมดจอด 24 ชม.", values: ["✓", "—", "✓"] },
      { feature: "อัปเดตเฟิร์มแวร์ฟรี", values: ["5 ปี", "1 ปี", "—"] },
      { feature: "รับประกันพร้อมในราคา", values: ["2 ปี", "1 ปี", "1 ปี"] },
    ],
  },
  vi: {
    eyebrow: "Vì sao chọn AZDOME",
    title: "Nhiều bên trong hơn. Trả ít hơn.",
    body: "Các loại camera hành trình phổ biến ở mức giá này — bạn thường nhận được gì và M550 Pro thêm vào những gì. So sánh dựa trên các tờ thông số công khai tới tháng 4 năm 2026.",
    brands: [
      { name: "AZDOME M550 Pro", price: "$129.99", highlight: true },
      { name: "Camera 4K thông thường", price: "~$159" },
      { name: "Camera dạng gương", price: "~$229" },
    ],
    rows: [
      { feature: "4K thực (3840×2160) phía trước", values: ["✓", "✓", "✗"] },
      { feature: "Cảm biến Sony Starvis 2", values: ["✓", "✗", "✗"] },
      { feature: "Wi-Fi 5GHz hai băng tần", values: ["✓", "—", "✓"] },
      { feature: "GPS tích hợp", values: ["✓", "✓", "✗"] },
      { feature: "ADAS trên thiết bị", values: ["✓", "—", "✗"] },
      { feature: "Chế độ đậu xe 24h", values: ["✓", "—", "✓"] },
      { feature: "Cập nhật firmware miễn phí", values: ["5 năm", "1 năm", "—"] },
      { feature: "Bảo hành bao gồm", values: ["2 năm", "1 năm", "1 năm"] },
    ],
  },
};

export function getDefaultCompare(locale: Locale): CompareContent {
  return COMPARE_BY_LOCALE[locale] ?? COMPARE_BY_LOCALE.en!;
}

export const DEFAULT_COMPARE: CompareContent = EN;
