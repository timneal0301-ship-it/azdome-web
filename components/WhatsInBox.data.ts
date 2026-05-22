import type { Locale } from "@/lib/i18n/dictionaries";

export const WHATS_IN_BOX_ICONS = [
  "Camera",
  "CircleDot",
  "Layers",
  "Cable",
  "Hammer",
  "BookOpen",
  "Package",
  "Smartphone",
  "Wifi",
] as const;

export type BoxItem = {
  /** Lucide icon name — see WHATS_IN_BOX_ICONS for allowed values. */
  iconName: string;
  name: string;
  detail: string;
  /** Set to true to skip rendering this item. */
  hidden?: boolean;
};

/** Per-locale default box items. Brand/model names stay verbatim; only
 *  the descriptive labels and detail strings translate. Locales not in
 *  this table fall back to English. */
const BOX_ITEMS_BY_LOCALE: Partial<Record<Locale, BoxItem[]>> = {
  en: [
    { iconName: "Camera", name: "M550 Pro Front Camera", detail: "4K Starvis 2 sensor" },
    { iconName: "CircleDot", name: "1080p Rear Camera", detail: "Full HD + 6m cable" },
    { iconName: "Layers", name: "3M Adhesive Mounts ×2", detail: "Pre-applied, residue-free" },
    { iconName: "Cable", name: "Type-C Power Cable", detail: "3.5m, fits most cabin trims" },
    { iconName: "Hammer", name: "Trim Removal Tool", detail: "For cable routing" },
    { iconName: "BookOpen", name: "Quick-Start Guide", detail: "Setup in under 20 min" },
  ],
  zh: [
    { iconName: "Camera", name: "M550 Pro 前置摄像头", detail: "4K Starvis 2 传感器" },
    { iconName: "CircleDot", name: "1080p 后置摄像头", detail: "全高清 + 6 米线" },
    { iconName: "Layers", name: "3M 粘贴支架 ×2", detail: "预贴胶 · 无残胶" },
    { iconName: "Cable", name: "Type-C 电源线", detail: "3.5 米 · 适配多数车型" },
    { iconName: "Hammer", name: "撬棒走线工具", detail: "用于隐藏走线" },
    { iconName: "BookOpen", name: "快速入门指南", detail: "20 分钟内完成安装" },
  ],
  ja: [
    { iconName: "Camera", name: "M550 Pro フロントカメラ", detail: "4K Starvis 2 センサー" },
    { iconName: "CircleDot", name: "1080p リアカメラ", detail: "フル HD + 6m ケーブル" },
    { iconName: "Layers", name: "3M 接着マウント ×2", detail: "貼付済み・残糊なし" },
    { iconName: "Cable", name: "Type-C 電源ケーブル", detail: "3.5m・多くの車種に対応" },
    { iconName: "Hammer", name: "内装はがし工具", detail: "配線隠し用" },
    { iconName: "BookOpen", name: "クイックスタートガイド", detail: "20 分以内に設置完了" },
  ],
  de: [
    { iconName: "Camera", name: "M550 Pro Frontkamera", detail: "4K Starvis 2-Sensor" },
    { iconName: "CircleDot", name: "1080p Heckkamera", detail: "Full HD + 6 m Kabel" },
    { iconName: "Layers", name: "3M Klebehalterungen ×2", detail: "Vorgeklebt, rückstandsfrei" },
    { iconName: "Cable", name: "Type-C Stromkabel", detail: "3,5 m, passt in die meisten Innenverkleidungen" },
    { iconName: "Hammer", name: "Verkleidungs-Aushebelwerkzeug", detail: "Für die Kabelverlegung" },
    { iconName: "BookOpen", name: "Schnellstart-Anleitung", detail: "Aufbau in unter 20 Min." },
  ],
  fr: [
    { iconName: "Camera", name: "Caméra avant M550 Pro", detail: "Capteur 4K Starvis 2" },
    { iconName: "CircleDot", name: "Caméra arrière 1080p", detail: "Full HD + câble 6 m" },
    { iconName: "Layers", name: "Supports adhésifs 3M ×2", detail: "Pré-collés, sans résidu" },
    { iconName: "Cable", name: "Câble d'alimentation Type-C", detail: "3,5 m, compatible avec la plupart des habitacles" },
    { iconName: "Hammer", name: "Outil de démontage de garnitures", detail: "Pour le passage des câbles" },
    { iconName: "BookOpen", name: "Guide de démarrage rapide", detail: "Installation en moins de 20 min" },
  ],
  es: [
    { iconName: "Camera", name: "Cámara frontal M550 Pro", detail: "Sensor 4K Starvis 2" },
    { iconName: "CircleDot", name: "Cámara trasera 1080p", detail: "Full HD + cable de 6 m" },
    { iconName: "Layers", name: "Soportes adhesivos 3M ×2", detail: "Preaplicados, sin residuos" },
    { iconName: "Cable", name: "Cable de alimentación Type-C", detail: "3,5 m, compatible con la mayoría de molduras" },
    { iconName: "Hammer", name: "Herramienta de extracción", detail: "Para el paso del cable" },
    { iconName: "BookOpen", name: "Guía de inicio rápido", detail: "Instalación en menos de 20 min" },
  ],
  it: [
    { iconName: "Camera", name: "Telecamera anteriore M550 Pro", detail: "Sensore 4K Starvis 2" },
    { iconName: "CircleDot", name: "Telecamera posteriore 1080p", detail: "Full HD + cavo da 6 m" },
    { iconName: "Layers", name: "Supporti adesivi 3M ×2", detail: "Preapplicati, senza residui" },
    { iconName: "Cable", name: "Cavo di alimentazione Type-C", detail: "3,5 m, adatto alla maggior parte degli abitacoli" },
    { iconName: "Hammer", name: "Strumento per rimuovere le rifiniture", detail: "Per il passaggio dei cavi" },
    { iconName: "BookOpen", name: "Guida rapida", detail: "Installazione in meno di 20 min" },
  ],
  ru: [
    { iconName: "Camera", name: "Передняя камера M550 Pro", detail: "Сенсор 4K Starvis 2" },
    { iconName: "CircleDot", name: "Задняя камера 1080p", detail: "Full HD + кабель 6 м" },
    { iconName: "Layers", name: "Клейкие крепления 3M ×2", detail: "С нанесённым клеем, без следов" },
    { iconName: "Cable", name: "Кабель питания Type-C", detail: "3,5 м, подходит к большинству салонов" },
    { iconName: "Hammer", name: "Инструмент для снятия обшивки", detail: "Для прокладки кабеля" },
    { iconName: "BookOpen", name: "Руководство быстрого старта", detail: "Установка менее чем за 20 минут" },
  ],
  pl: [
    { iconName: "Camera", name: "Kamera przednia M550 Pro", detail: "Matryca 4K Starvis 2" },
    { iconName: "CircleDot", name: "Kamera tylna 1080p", detail: "Full HD + kabel 6 m" },
    { iconName: "Layers", name: "Uchwyty 3M ×2", detail: "Z naklejoną taśmą, bez resztek kleju" },
    { iconName: "Cable", name: "Kabel zasilający Type-C", detail: "3,5 m, pasuje do większości wnętrz" },
    { iconName: "Hammer", name: "Narzędzie do demontażu listew", detail: "Do prowadzenia kabla" },
    { iconName: "BookOpen", name: "Skrócona instrukcja", detail: "Montaż w mniej niż 20 min" },
  ],
  ro: [
    { iconName: "Camera", name: "Cameră față M550 Pro", detail: "Senzor 4K Starvis 2" },
    { iconName: "CircleDot", name: "Cameră spate 1080p", detail: "Full HD + cablu 6 m" },
    { iconName: "Layers", name: "Suporturi adezive 3M ×2", detail: "Preaplicate, fără reziduuri" },
    { iconName: "Cable", name: "Cablu de alimentare Type-C", detail: "3,5 m, compatibil cu majoritatea habitaclelor" },
    { iconName: "Hammer", name: "Unealtă pentru demontat ornamente", detail: "Pentru trecerea cablurilor" },
    { iconName: "BookOpen", name: "Ghid de pornire rapidă", detail: "Instalare în mai puțin de 20 min" },
  ],
  tr: [
    { iconName: "Camera", name: "M550 Pro Ön Kamera", detail: "4K Starvis 2 sensör" },
    { iconName: "CircleDot", name: "1080p Arka Kamera", detail: "Full HD + 6 m kablo" },
    { iconName: "Layers", name: "3M Yapışkanlı Bağlantılar ×2", detail: "Önceden yapıştırılmış, kalıntı bırakmaz" },
    { iconName: "Cable", name: "Type-C Güç Kablosu", detail: "3,5 m, çoğu kabin döşemesine uyar" },
    { iconName: "Hammer", name: "Kaplama Sökme Aleti", detail: "Kablo döşemesi için" },
    { iconName: "BookOpen", name: "Hızlı Başlangıç Kılavuzu", detail: "20 dakikadan kısa sürede kurulum" },
  ],
  pt: [
    { iconName: "Camera", name: "Câmera dianteira M550 Pro", detail: "Sensor 4K Starvis 2" },
    { iconName: "CircleDot", name: "Câmera traseira 1080p", detail: "Full HD + cabo de 6 m" },
    { iconName: "Layers", name: "Suportes adesivos 3M ×2", detail: "Pré-colados, sem resíduo" },
    { iconName: "Cable", name: "Cabo de alimentação Type-C", detail: "3,5 m, cabe na maioria dos acabamentos" },
    { iconName: "Hammer", name: "Ferramenta de remoção de acabamento", detail: "Para passagem do cabo" },
    { iconName: "BookOpen", name: "Guia de início rápido", detail: "Instalação em menos de 20 min" },
  ],
  ar: [
    { iconName: "Camera", name: "كاميرا أمامية M550 Pro", detail: "مستشعر 4K Starvis 2" },
    { iconName: "CircleDot", name: "كاميرا خلفية 1080p", detail: "Full HD + كابل 6 م" },
    { iconName: "Layers", name: "حوامل لاصقة 3M ×2", detail: "ملصقة مسبقًا، بدون بقايا" },
    { iconName: "Cable", name: "كابل طاقة Type-C", detail: "3.5 م، يناسب معظم تجهيزات الكابينة" },
    { iconName: "Hammer", name: "أداة فك تجهيزات السيارة", detail: "لتمديد الكابلات" },
    { iconName: "BookOpen", name: "دليل البدء السريع", detail: "تركيب في أقل من 20 دقيقة" },
  ],
  th: [
    { iconName: "Camera", name: "กล้องด้านหน้า M550 Pro", detail: "เซ็นเซอร์ 4K Starvis 2" },
    { iconName: "CircleDot", name: "กล้องด้านหลัง 1080p", detail: "Full HD + สาย 6 เมตร" },
    { iconName: "Layers", name: "แผ่นยึด 3M ×2", detail: "ติดกาวมาแล้ว · ไม่ทิ้งคราบ" },
    { iconName: "Cable", name: "สายไฟ Type-C", detail: "3.5 ม. · เหมาะกับห้องโดยสารส่วนใหญ่" },
    { iconName: "Hammer", name: "ที่งัดคิ้ว", detail: "สำหรับเดินสาย" },
    { iconName: "BookOpen", name: "คู่มือเริ่มต้นใช้งาน", detail: "ติดตั้งภายใน 20 นาที" },
  ],
  vi: [
    { iconName: "Camera", name: "Camera trước M550 Pro", detail: "Cảm biến 4K Starvis 2" },
    { iconName: "CircleDot", name: "Camera sau 1080p", detail: "Full HD + dây 6 m" },
    { iconName: "Layers", name: "Đế dán 3M ×2", detail: "Dán sẵn, không để lại keo" },
    { iconName: "Cable", name: "Cáp nguồn Type-C", detail: "3,5 m, vừa hầu hết khoang xe" },
    { iconName: "Hammer", name: "Dụng cụ tháo ốp", detail: "Dùng để đi dây" },
    { iconName: "BookOpen", name: "Hướng dẫn nhanh", detail: "Lắp đặt dưới 20 phút" },
  ],
};

/** Resolve box items for the active locale, falling back to English. */
export function getDefaultBoxItems(locale: Locale): BoxItem[] {
  return BOX_ITEMS_BY_LOCALE[locale] ?? BOX_ITEMS_BY_LOCALE.en!;
}

/** Legacy export used by client-side fallbacks where locale is hard to
 *  thread (e.g. props default). Always returns English seed. */
export const DEFAULT_BOX_ITEMS: BoxItem[] = BOX_ITEMS_BY_LOCALE.en!;
