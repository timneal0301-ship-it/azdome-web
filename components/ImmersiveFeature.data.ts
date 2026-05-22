import type { Locale } from "@/lib/i18n/dictionaries";

export type ImmersiveStat = { value: string; label: string };

export type ImmersiveContent = {
  eyebrow: string;
  titleA: string;
  titleB: string;
  subtitle: string;
  image: string;
  stats: ImmersiveStat[];
};

const IMAGE = "/images/pdp/immersive-night.jpg";

/** Translation table for the PDP immersive (night-vision) section. Stat
 *  values (numbers + units) are universal; only the `label` strings on
 *  each stat translate. */
const IMMERSIVE_BY_LOCALE: Partial<Record<Locale, ImmersiveContent>> = {
  en: {
    eyebrow: "Engineered for night",
    titleA: "See clearer at 2 a.m. than",
    titleB: "the human eye.",
    subtitle:
      "Sony STARVIS-grade sensor + f/1.55 aperture + 6-layer IR. Captures license plates, road signs, and pedestrians in conditions where your eyes see only blur.",
    image: IMAGE,
    stats: [
      { value: "0.001 lux", label: "Min illumination" },
      { value: "f/1.55", label: "Aperture" },
      { value: "150°", label: "Field of view" },
      { value: "−4°F → 158°F", label: "Operating range" },
    ],
  },
  zh: {
    eyebrow: "为夜间而生",
    titleA: "凌晨 2 点比人眼",
    titleB: "看得更清楚。",
    subtitle:
      "Sony STARVIS 级传感器 + f/1.55 大光圈 + 6 层 IR。在你眼里只剩模糊的场景里,依然能清晰记录车牌、路标、行人。",
    image: IMAGE,
    stats: [
      { value: "0.001 lux", label: "最低照度" },
      { value: "f/1.55", label: "光圈" },
      { value: "150°", label: "视场角" },
      { value: "−20℃ → 70℃", label: "工作温度" },
    ],
  },
  ja: {
    eyebrow: "夜のために設計",
    titleA: "深夜 2 時、人間の目より",
    titleB: "鮮明に見える。",
    subtitle:
      "Sony STARVIS クラスセンサー + f/1.55 絞り + 6 層 IR。肉眼ではぼやけて見える状況でも、ナンバープレート、道路標識、歩行者を鮮明に捉えます。",
    image: IMAGE,
    stats: [
      { value: "0.001 lux", label: "最低照度" },
      { value: "f/1.55", label: "絞り" },
      { value: "150°", label: "画角" },
      { value: "−20℃ → 70℃", label: "動作温度" },
    ],
  },
  de: {
    eyebrow: "Für die Nacht entwickelt",
    titleA: "Sieht um 2 Uhr nachts klarer als",
    titleB: "das menschliche Auge.",
    subtitle:
      "Sony STARVIS-Klasse-Sensor + Blende f/1.55 + 6-Schicht-IR. Erfasst Nummernschilder, Verkehrsschilder und Fußgänger dort, wo Ihre Augen nur Unschärfe sehen.",
    image: IMAGE,
    stats: [
      { value: "0,001 Lux", label: "Min. Beleuchtung" },
      { value: "f/1.55", label: "Blende" },
      { value: "150°", label: "Bildwinkel" },
      { value: "−20 °C → 70 °C", label: "Betriebstemperatur" },
    ],
  },
  fr: {
    eyebrow: "Conçu pour la nuit",
    titleA: "Voit plus clair à 2 h que",
    titleB: "l'œil humain.",
    subtitle:
      "Capteur de classe Sony STARVIS + ouverture f/1.55 + IR à 6 couches. Capture plaques d'immatriculation, panneaux et piétons là où vos yeux ne voient que du flou.",
    image: IMAGE,
    stats: [
      { value: "0,001 lux", label: "Illumination min." },
      { value: "f/1.55", label: "Ouverture" },
      { value: "150°", label: "Angle de vue" },
      { value: "−20 °C → 70 °C", label: "Plage de fonctionnement" },
    ],
  },
  es: {
    eyebrow: "Diseñada para la noche",
    titleA: "Ve más claro a las 2 a.m. que",
    titleB: "el ojo humano.",
    subtitle:
      "Sensor de clase Sony STARVIS + apertura f/1.55 + IR de 6 capas. Capta matrículas, señales y peatones donde tus ojos solo ven borrosidad.",
    image: IMAGE,
    stats: [
      { value: "0,001 lux", label: "Iluminación mín." },
      { value: "f/1.55", label: "Apertura" },
      { value: "150°", label: "Ángulo de visión" },
      { value: "−20 °C → 70 °C", label: "Rango de funcionamiento" },
    ],
  },
  it: {
    eyebrow: "Progettata per la notte",
    titleA: "Vede più chiaro alle 2 di notte",
    titleB: "dell'occhio umano.",
    subtitle:
      "Sensore di classe Sony STARVIS + apertura f/1.55 + IR a 6 strati. Cattura targhe, segnali e pedoni dove i tuoi occhi vedono solo sfocato.",
    image: IMAGE,
    stats: [
      { value: "0,001 lux", label: "Illuminazione min." },
      { value: "f/1.55", label: "Apertura" },
      { value: "150°", label: "Campo visivo" },
      { value: "−20 °C → 70 °C", label: "Intervallo operativo" },
    ],
  },
  ru: {
    eyebrow: "Создан для ночи",
    titleA: "В 2 часа ночи видит яснее,",
    titleB: "чем человеческий глаз.",
    subtitle:
      "Сенсор класса Sony STARVIS + диафрагма f/1.55 + 6-слойная ИК-подсветка. Фиксирует номерные знаки, дорожные знаки и пешеходов там, где ваши глаза видят только размытие.",
    image: IMAGE,
    stats: [
      { value: "0,001 лк", label: "Мин. освещённость" },
      { value: "f/1.55", label: "Диафрагма" },
      { value: "150°", label: "Угол обзора" },
      { value: "−20 °C → 70 °C", label: "Диапазон работы" },
    ],
  },
  pl: {
    eyebrow: "Zaprojektowany na noc",
    titleA: "O 2 w nocy widzi wyraźniej niż",
    titleB: "ludzkie oko.",
    subtitle:
      "Matryca klasy Sony STARVIS + przysłona f/1.55 + 6-warstwowa podczerwień. Rejestruje tablice rejestracyjne, znaki i pieszych tam, gdzie twoje oczy widzą tylko rozmycie.",
    image: IMAGE,
    stats: [
      { value: "0,001 lx", label: "Min. oświetlenie" },
      { value: "f/1.55", label: "Przysłona" },
      { value: "150°", label: "Kąt widzenia" },
      { value: "−20 °C → 70 °C", label: "Zakres pracy" },
    ],
  },
  ro: {
    eyebrow: "Proiectată pentru noapte",
    titleA: "Vede mai clar la 2 noaptea decât",
    titleB: "ochiul uman.",
    subtitle:
      "Senzor de clasă Sony STARVIS + diafragmă f/1.55 + IR pe 6 straturi. Captează plăcuțe de înmatriculare, indicatoare și pietoni unde ochii tăi văd doar neclaritate.",
    image: IMAGE,
    stats: [
      { value: "0,001 lx", label: "Iluminare min." },
      { value: "f/1.55", label: "Diafragmă" },
      { value: "150°", label: "Unghi de vedere" },
      { value: "−20 °C → 70 °C", label: "Interval de funcționare" },
    ],
  },
  tr: {
    eyebrow: "Gece için tasarlandı",
    titleA: "Gece 2'de insan gözünden",
    titleB: "daha net görür.",
    subtitle:
      "Sony STARVIS sınıfı sensör + f/1.55 diyafram + 6 katmanlı IR. Gözlerinizin yalnızca bulanık gördüğü ortamlarda plakaları, trafik işaretlerini ve yayaları kaydeder.",
    image: IMAGE,
    stats: [
      { value: "0,001 lüks", label: "Min. aydınlatma" },
      { value: "f/1.55", label: "Diyafram" },
      { value: "150°", label: "Görüş açısı" },
      { value: "−20 °C → 70 °C", label: "Çalışma aralığı" },
    ],
  },
  pt: {
    eyebrow: "Projetada para a noite",
    titleA: "Enxerga mais nítido às 2 da manhã",
    titleB: "do que o olho humano.",
    subtitle:
      "Sensor classe Sony STARVIS + abertura f/1.55 + IR de 6 camadas. Captura placas, sinais e pedestres onde seus olhos só veem borrão.",
    image: IMAGE,
    stats: [
      { value: "0,001 lux", label: "Iluminação mín." },
      { value: "f/1.55", label: "Abertura" },
      { value: "150°", label: "Ângulo de visão" },
      { value: "−20 °C → 70 °C", label: "Faixa operacional" },
    ],
  },
  ar: {
    eyebrow: "صُممت لليل",
    titleA: "تبصر عند الثانية صباحًا بوضوح أكبر",
    titleB: "من العين البشرية.",
    subtitle:
      "مستشعر من فئة Sony STARVIS + فتحة عدسة f/1.55 + 6 طبقات أشعة تحت حمراء. يلتقط لوحات السيارات وإشارات الطريق والمشاة في الظروف التي ترى فيها العين تشوّشًا فقط.",
    image: IMAGE,
    stats: [
      { value: "0.001 لكس", label: "أدنى إضاءة" },
      { value: "f/1.55", label: "فتحة العدسة" },
      { value: "150°", label: "زاوية الرؤية" },
      { value: "−20 °C → 70 °C", label: "نطاق التشغيل" },
    ],
  },
  th: {
    eyebrow: "ออกแบบมาเพื่อกลางคืน",
    titleA: "ตี 2 ก็มองเห็นชัดกว่า",
    titleB: "สายตามนุษย์",
    subtitle:
      "เซ็นเซอร์ระดับ Sony STARVIS + รูรับแสง f/1.55 + IR 6 ชั้น บันทึกป้ายทะเบียน ป้ายจราจร และคนเดินถนนได้ในสภาพที่ตาคุณเห็นแค่เบลอ",
    image: IMAGE,
    stats: [
      { value: "0.001 ลักซ์", label: "ความสว่างต่ำสุด" },
      { value: "f/1.55", label: "รูรับแสง" },
      { value: "150°", label: "มุมรับภาพ" },
      { value: "−20 °C → 70 °C", label: "ช่วงอุณหภูมิทำงาน" },
    ],
  },
  vi: {
    eyebrow: "Thiết kế cho ban đêm",
    titleA: "Lúc 2 giờ sáng nhìn rõ hơn",
    titleB: "mắt người.",
    subtitle:
      "Cảm biến đẳng cấp Sony STARVIS + khẩu độ f/1.55 + IR 6 lớp. Ghi lại biển số, biển báo và người đi bộ ở điều kiện mắt bạn chỉ thấy mờ.",
    image: IMAGE,
    stats: [
      { value: "0,001 lux", label: "Độ sáng tối thiểu" },
      { value: "f/1.55", label: "Khẩu độ" },
      { value: "150°", label: "Góc nhìn" },
      { value: "−20 °C → 70 °C", label: "Dải hoạt động" },
    ],
  },
};

export function getDefaultImmersive(locale: Locale): ImmersiveContent {
  return IMMERSIVE_BY_LOCALE[locale] ?? IMMERSIVE_BY_LOCALE.en!;
}

export const DEFAULT_IMMERSIVE: ImmersiveContent = IMMERSIVE_BY_LOCALE.en!;
