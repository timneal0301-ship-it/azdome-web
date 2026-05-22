import type { Locale } from "@/lib/i18n/dictionaries";

export const TECH_ICONS = ["Moon", "Wifi", "Zap"] as const;

export type TechFeatureItem = {
  id: string;
  iconName: (typeof TECH_ICONS)[number];
  title: string;
  summary: string;
  detail: string;
  image: string;
};

const IMAGES = {
  "night-vision": "/images/features/night-vision.jpg",
  "wifi-5g": "/images/features/wifi.jpg",
  "ai-adas": "/images/features/adas.jpg",
} as const;

const EN: TechFeatureItem[] = [
  {
    id: "night-vision",
    iconName: "Moon",
    title: "Starlight Night Vision",
    summary: "See clearly in near-zero light.",
    detail:
      "Sony Starvis 2 sensor paired with an f/1.55 aperture captures plates and road signs in conditions where the human eye sees only black — no infrared washout, just true color.",
    image: IMAGES["night-vision"],
  },
  {
    id: "wifi-5g",
    iconName: "Wifi",
    title: "Built-in 5GHz Wi-Fi",
    summary: "Transfer 4K footage in seconds.",
    detail:
      "Pair with the AZDOME app over dual-band 5GHz Wi-Fi for instant 4K downloads, live preview, and OTA firmware — no SD card removal required.",
    image: IMAGES["wifi-5g"],
  },
  {
    id: "ai-adas",
    iconName: "Zap",
    title: "AI Driver Assist (ADAS)",
    summary: "An intelligent co-pilot, on every drive.",
    detail:
      "On-device AI detects lane drift, forward collisions, and pedestrians in real time — alerting you before incidents happen, without sending data to the cloud.",
    image: IMAGES["ai-adas"],
  },
];

const TECH_BY_LOCALE: Partial<Record<Locale, TechFeatureItem[]>> = {
  en: EN,
  zh: [
    {
      id: "night-vision",
      iconName: "Moon",
      title: "星光夜视",
      summary: "近乎全黑环境下也能看清。",
      detail:
        "Sony Starvis 2 传感器搭配 f/1.55 大光圈，在肉眼一片漆黑的环境下依然能拍清车牌和路牌 — 无红外泛白，只有真实色彩。",
      image: IMAGES["night-vision"],
    },
    {
      id: "wifi-5g",
      iconName: "Wifi",
      title: "内置 5GHz Wi-Fi",
      summary: "秒级传输 4K 影像。",
      detail:
        "通过双频 5GHz Wi-Fi 与 AZDOME 应用配对，4K 视频即时下载、实时预览、OTA 固件升级 — 无需取出 SD 卡。",
      image: IMAGES["wifi-5g"],
    },
    {
      id: "ai-adas",
      iconName: "Zap",
      title: "AI 驾驶辅助（ADAS）",
      summary: "智能副驾，伴你每一程。",
      detail:
        "本地 AI 实时检测车道偏离、前车碰撞和行人 — 在事故发生前预警，全程无需上传云端。",
      image: IMAGES["ai-adas"],
    },
  ],
  ja: [
    {
      id: "night-vision",
      iconName: "Moon",
      title: "スターライトナイトビジョン",
      summary: "ほぼ真っ暗でもクリアに撮影。",
      detail:
        "Sony Starvis 2 センサーと f/1.55 の大口径レンズが、肉眼では真っ黒な環境でナンバープレートや道路標識を捉えます — 赤外線の白飛びなく、忠実な色彩で。",
      image: IMAGES["night-vision"],
    },
    {
      id: "wifi-5g",
      iconName: "Wifi",
      title: "5GHz Wi-Fi 内蔵",
      summary: "4K 映像を数秒で転送。",
      detail:
        "デュアルバンド 5GHz Wi-Fi で AZDOME アプリと接続し、4K 即時ダウンロード、ライブプレビュー、OTA ファームウェア更新 — SD カードを抜く必要なし。",
      image: IMAGES["wifi-5g"],
    },
    {
      id: "ai-adas",
      iconName: "Zap",
      title: "AI 運転支援（ADAS）",
      summary: "毎回のドライブに、賢い相棒を。",
      detail:
        "端末内 AI がリアルタイムで車線逸脱、前方衝突、歩行者を検知 — クラウドに送信せず、事故の前に警告します。",
      image: IMAGES["ai-adas"],
    },
  ],
  de: [
    {
      id: "night-vision",
      iconName: "Moon",
      title: "Starlight Nachtsicht",
      summary: "Klare Sicht bei nahezu völliger Dunkelheit.",
      detail:
        "Sony Starvis 2 Sensor mit f/1.55 Blende erfasst Kennzeichen und Verkehrsschilder dort, wo das menschliche Auge nur Schwarz sieht — kein Infrarot-Überstrahlen, nur echte Farben.",
      image: IMAGES["night-vision"],
    },
    {
      id: "wifi-5g",
      iconName: "Wifi",
      title: "5GHz WLAN integriert",
      summary: "4K-Aufnahmen in Sekunden übertragen.",
      detail:
        "Verbinden Sie sich über Dualband-5GHz-WLAN mit der AZDOME-App für sofortige 4K-Downloads, Live-Vorschau und OTA-Firmware — kein Entnehmen der SD-Karte nötig.",
      image: IMAGES["wifi-5g"],
    },
    {
      id: "ai-adas",
      iconName: "Zap",
      title: "KI-Fahrassistent (ADAS)",
      summary: "Ein intelligenter Co-Pilot bei jeder Fahrt.",
      detail:
        "On-Device-KI erkennt Spurwechsel, Frontalkollisionen und Fußgänger in Echtzeit — und warnt Sie, bevor etwas passiert, ohne Daten in die Cloud zu senden.",
      image: IMAGES["ai-adas"],
    },
  ],
  fr: [
    {
      id: "night-vision",
      iconName: "Moon",
      title: "Vision nocturne Starlight",
      summary: "Voyez clairement quand il fait presque noir.",
      detail:
        "Le capteur Sony Starvis 2 associé à une ouverture f/1.55 capture plaques et panneaux là où l'œil humain ne voit que du noir — pas de surexposition infrarouge, juste des couleurs fidèles.",
      image: IMAGES["night-vision"],
    },
    {
      id: "wifi-5g",
      iconName: "Wifi",
      title: "Wi-Fi 5GHz intégré",
      summary: "Transférez du 4K en quelques secondes.",
      detail:
        "Appairez l'application AZDOME via Wi-Fi 5GHz bi-bande pour des téléchargements 4K instantanés, l'aperçu en direct et le firmware OTA — sans retirer la carte SD.",
      image: IMAGES["wifi-5g"],
    },
    {
      id: "ai-adas",
      iconName: "Zap",
      title: "Assistant IA (ADAS)",
      summary: "Un copilote intelligent à chaque trajet.",
      detail:
        "L'IA embarquée détecte en temps réel sortie de voie, collisions frontales et piétons — elle vous alerte avant l'incident, sans envoyer de données dans le cloud.",
      image: IMAGES["ai-adas"],
    },
  ],
  es: [
    {
      id: "night-vision",
      iconName: "Moon",
      title: "Visión nocturna Starlight",
      summary: "Ve con claridad casi sin luz.",
      detail:
        "El sensor Sony Starvis 2 con apertura f/1.55 capta matrículas y señales donde el ojo humano solo ve negro — sin saturación infrarroja, con color real.",
      image: IMAGES["night-vision"],
    },
    {
      id: "wifi-5g",
      iconName: "Wifi",
      title: "Wi-Fi 5GHz integrado",
      summary: "Transfiere imágenes 4K en segundos.",
      detail:
        "Conéctate a la app AZDOME por Wi-Fi 5GHz de doble banda para descargas 4K al instante, vista previa en directo y firmware OTA — sin sacar la tarjeta SD.",
      image: IMAGES["wifi-5g"],
    },
    {
      id: "ai-adas",
      iconName: "Zap",
      title: "Asistencia IA (ADAS)",
      summary: "Un copiloto inteligente en cada trayecto.",
      detail:
        "La IA del propio dispositivo detecta salidas de carril, colisiones frontales y peatones en tiempo real — te avisa antes del incidente, sin enviar datos a la nube.",
      image: IMAGES["ai-adas"],
    },
  ],
  it: [
    {
      id: "night-vision",
      iconName: "Moon",
      title: "Visione notturna Starlight",
      summary: "Vedi con chiarezza quasi al buio.",
      detail:
        "Il sensore Sony Starvis 2 con apertura f/1.55 cattura targhe e cartelli dove l'occhio umano vede solo nero — senza saturazione infrarossa, solo colori reali.",
      image: IMAGES["night-vision"],
    },
    {
      id: "wifi-5g",
      iconName: "Wifi",
      title: "Wi-Fi 5GHz integrato",
      summary: "Trasferisci video 4K in pochi secondi.",
      detail:
        "Collega l'app AZDOME via Wi-Fi 5GHz dual-band per download 4K istantanei, anteprima live e firmware OTA — senza rimuovere la scheda SD.",
      image: IMAGES["wifi-5g"],
    },
    {
      id: "ai-adas",
      iconName: "Zap",
      title: "Assistente IA (ADAS)",
      summary: "Un copilota intelligente a ogni viaggio.",
      detail:
        "L'IA on-device rileva uscite di corsia, collisioni frontali e pedoni in tempo reale — ti avvisa prima dell'incidente, senza inviare dati al cloud.",
      image: IMAGES["ai-adas"],
    },
  ],
  ru: [
    {
      id: "night-vision",
      iconName: "Moon",
      title: "Ночное видение Starlight",
      summary: "Чёткая картинка при минимуме света.",
      detail:
        "Сенсор Sony Starvis 2 и диафрагма f/1.55 фиксируют номера и дорожные знаки там, где человеческий глаз видит только черноту — без инфракрасного засвета, в естественных цветах.",
      image: IMAGES["night-vision"],
    },
    {
      id: "wifi-5g",
      iconName: "Wifi",
      title: "Встроенный Wi-Fi 5 ГГц",
      summary: "Передача 4K за секунды.",
      detail:
        "Подключение к приложению AZDOME через двухдиапазонный Wi-Fi 5 ГГц — мгновенная загрузка 4K, прямой эфир и OTA-обновления прошивки, без извлечения карты SD.",
      image: IMAGES["wifi-5g"],
    },
    {
      id: "ai-adas",
      iconName: "Zap",
      title: "AI-помощник водителя (ADAS)",
      summary: "Умный второй пилот в каждой поездке.",
      detail:
        "ИИ на устройстве в реальном времени распознаёт сход с полосы, фронтальные столкновения и пешеходов — предупреждает заранее, ничего не отправляя в облако.",
      image: IMAGES["ai-adas"],
    },
  ],
  pl: [
    {
      id: "night-vision",
      iconName: "Moon",
      title: "Tryb nocny Starlight",
      summary: "Widzisz wyraźnie przy minimalnym świetle.",
      detail:
        "Matryca Sony Starvis 2 i przysłona f/1.55 rejestrują tablice i znaki tam, gdzie ludzkie oko widzi tylko czerń — bez prześwietleń podczerwieni, tylko prawdziwy kolor.",
      image: IMAGES["night-vision"],
    },
    {
      id: "wifi-5g",
      iconName: "Wifi",
      title: "Wbudowane Wi-Fi 5GHz",
      summary: "Wgraj nagrania 4K w sekundy.",
      detail:
        "Połącz aplikację AZDOME przez dwupasmowe Wi-Fi 5GHz — błyskawiczne pobieranie 4K, podgląd na żywo i OTA firmware, bez wyjmowania karty SD.",
      image: IMAGES["wifi-5g"],
    },
    {
      id: "ai-adas",
      iconName: "Zap",
      title: "Asystent kierowcy AI (ADAS)",
      summary: "Inteligentny drugi pilot na każdą trasę.",
      detail:
        "AI na urządzeniu w czasie rzeczywistym wykrywa zjeżdżanie z pasa, kolizje czołowe i pieszych — ostrzega przed wypadkiem, bez wysyłania danych do chmury.",
      image: IMAGES["ai-adas"],
    },
  ],
  ro: [
    {
      id: "night-vision",
      iconName: "Moon",
      title: "Vedere nocturnă Starlight",
      summary: "Vezi clar chiar și la lumină aproape zero.",
      detail:
        "Senzorul Sony Starvis 2 cu diafragmă f/1.55 captează plăcuțe și indicatoare acolo unde ochiul uman vede doar întuneric — fără supraexpunere infraroșu, doar culoare reală.",
      image: IMAGES["night-vision"],
    },
    {
      id: "wifi-5g",
      iconName: "Wifi",
      title: "Wi-Fi 5GHz integrat",
      summary: "Transferă filmări 4K în câteva secunde.",
      detail:
        "Conectează aplicația AZDOME prin Wi-Fi 5GHz dual-band pentru descărcări 4K instantanee, previzualizare live și firmware OTA — fără să scoți cardul SD.",
      image: IMAGES["wifi-5g"],
    },
    {
      id: "ai-adas",
      iconName: "Zap",
      title: "Asistent AI pentru șofer (ADAS)",
      summary: "Un copilot inteligent la fiecare drum.",
      detail:
        "AI-ul de pe dispozitiv detectează în timp real ieșirea de pe bandă, coliziunile frontale și pietonii — te avertizează înainte de incident, fără să trimită date în cloud.",
      image: IMAGES["ai-adas"],
    },
  ],
  tr: [
    {
      id: "night-vision",
      iconName: "Moon",
      title: "Starlight Gece Görüşü",
      summary: "Neredeyse karanlıkta bile net görüntü.",
      detail:
        "Sony Starvis 2 sensörü ve f/1.55 diyafram, gözün yalnızca karanlık gördüğü ortamlarda plakaları ve trafik tabelalarını yakalar — kızılötesi parlaması yok, sadece gerçek renk.",
      image: IMAGES["night-vision"],
    },
    {
      id: "wifi-5g",
      iconName: "Wifi",
      title: "Yerleşik 5GHz Wi-Fi",
      summary: "4K görüntüleri saniyeler içinde aktarın.",
      detail:
        "AZDOME uygulamasını çift bant 5GHz Wi-Fi ile eşleştirin — anlık 4K indirme, canlı önizleme ve OTA bellenim güncellemesi, SD kartı çıkarmadan.",
      image: IMAGES["wifi-5g"],
    },
    {
      id: "ai-adas",
      iconName: "Zap",
      title: "AI Sürücü Asistanı (ADAS)",
      summary: "Her sürüşte akıllı bir yardımcı pilot.",
      detail:
        "Cihaz üzerindeki AI, şerit sapması, ön çarpışma ve yaya tespiti yapar — olay olmadan sizi uyarır, verileri buluta göndermez.",
      image: IMAGES["ai-adas"],
    },
  ],
  pt: [
    {
      id: "night-vision",
      iconName: "Moon",
      title: "Visão noturna Starlight",
      summary: "Veja com clareza quase sem luz.",
      detail:
        "O sensor Sony Starvis 2 com abertura f/1.55 capta placas e sinais onde o olho humano só vê preto — sem estouro de infravermelho, com cor real.",
      image: IMAGES["night-vision"],
    },
    {
      id: "wifi-5g",
      iconName: "Wifi",
      title: "Wi-Fi 5GHz integrado",
      summary: "Transfira filmagens 4K em segundos.",
      detail:
        "Conecte o app AZDOME via Wi-Fi 5GHz dual-band para downloads 4K instantâneos, prévia ao vivo e firmware OTA — sem retirar o cartão SD.",
      image: IMAGES["wifi-5g"],
    },
    {
      id: "ai-adas",
      iconName: "Zap",
      title: "Assistência IA (ADAS)",
      summary: "Um copiloto inteligente em cada viagem.",
      detail:
        "A IA no dispositivo detecta saída de faixa, colisões frontais e pedestres em tempo real — avisa antes do incidente, sem enviar dados para a nuvem.",
      image: IMAGES["ai-adas"],
    },
  ],
  ar: [
    {
      id: "night-vision",
      iconName: "Moon",
      title: "رؤية ليلية Starlight",
      summary: "رؤية واضحة في إضاءة شبه معدومة.",
      detail:
        "مستشعر Sony Starvis 2 وفتحة عدسة f/1.55 يلتقطان لوحات السيارات وإشارات الطريق حيث لا ترى العين سوى الظلام — دون توهج الأشعة تحت الحمراء، بألوان حقيقية.",
      image: IMAGES["night-vision"],
    },
    {
      id: "wifi-5g",
      iconName: "Wifi",
      title: "Wi-Fi 5GHz مدمج",
      summary: "انقل لقطات 4K في ثوانٍ.",
      detail:
        "اقترن بتطبيق AZDOME عبر Wi-Fi 5GHz ثنائي النطاق لتنزيل 4K الفوري، المعاينة المباشرة، وتحديث البرنامج الثابت OTA — بدون إخراج بطاقة SD.",
      image: IMAGES["wifi-5g"],
    },
    {
      id: "ai-adas",
      iconName: "Zap",
      title: "مساعد القيادة بالذكاء الاصطناعي (ADAS)",
      summary: "مرافق ذكي في كل رحلة.",
      detail:
        "ذكاء اصطناعي على الجهاز يكتشف انحراف المسار، التصادمات الأمامية، والمشاة في الوقت الفعلي — وينبهك قبل وقوع الحادث، دون إرسال البيانات إلى السحابة.",
      image: IMAGES["ai-adas"],
    },
  ],
  th: [
    {
      id: "night-vision",
      iconName: "Moon",
      title: "ระบบมองกลางคืน Starlight",
      summary: "เห็นชัดแม้แสงน้อยจนเกือบมืดสนิท",
      detail:
        "เซ็นเซอร์ Sony Starvis 2 คู่กับรูรับแสง f/1.55 จับภาพป้ายทะเบียนและป้ายจราจรได้ในสภาพที่ตามนุษย์มองเห็นแค่ความมืด — ไม่มีแสงอินฟราเรดบดบัง มีเพียงสีที่เป็นจริง",
      image: IMAGES["night-vision"],
    },
    {
      id: "wifi-5g",
      iconName: "Wifi",
      title: "Wi-Fi 5GHz ในตัว",
      summary: "โอนไฟล์ 4K ได้ในไม่กี่วินาที",
      detail:
        "เชื่อมต่อแอป AZDOME ผ่าน Wi-Fi 5GHz ดูอัลแบนด์ ดาวน์โหลด 4K ทันที ดูภาพสด และอัปเดตเฟิร์มแวร์ OTA — ไม่ต้องถอดการ์ด SD",
      image: IMAGES["wifi-5g"],
    },
    {
      id: "ai-adas",
      iconName: "Zap",
      title: "ระบบช่วยขับขี่ AI (ADAS)",
      summary: "ผู้ช่วยขับอัจฉริยะทุกการเดินทาง",
      detail:
        "AI ในตัวเครื่องตรวจจับการเบี่ยงเลน การชนด้านหน้า และคนเดินถนนแบบเรียลไทม์ — เตือนก่อนเกิดเหตุ โดยไม่ต้องส่งข้อมูลขึ้นคลาวด์",
      image: IMAGES["ai-adas"],
    },
  ],
  vi: [
    {
      id: "night-vision",
      iconName: "Moon",
      title: "Tầm nhìn ban đêm Starlight",
      summary: "Nhìn rõ trong điều kiện gần như tối hoàn toàn.",
      detail:
        "Cảm biến Sony Starvis 2 kết hợp khẩu độ f/1.55 ghi rõ biển số và biển báo trong điều kiện mắt thường chỉ thấy bóng tối — không bị lóa hồng ngoại, chỉ có màu thật.",
      image: IMAGES["night-vision"],
    },
    {
      id: "wifi-5g",
      iconName: "Wifi",
      title: "Wi-Fi 5GHz tích hợp",
      summary: "Chuyển video 4K trong vài giây.",
      detail:
        "Ghép nối ứng dụng AZDOME qua Wi-Fi 5GHz hai băng tần — tải 4K tức thì, xem trực tiếp và cập nhật firmware OTA, không cần tháo thẻ SD.",
      image: IMAGES["wifi-5g"],
    },
    {
      id: "ai-adas",
      iconName: "Zap",
      title: "Hỗ trợ lái AI (ADAS)",
      summary: "Phụ tá thông minh cho mọi hành trình.",
      detail:
        "AI tích hợp trên thiết bị phát hiện chệch làn, va chạm phía trước và người đi bộ theo thời gian thực — cảnh báo trước khi sự cố xảy ra, không gửi dữ liệu lên đám mây.",
      image: IMAGES["ai-adas"],
    },
  ],
};

export function getDefaultTechFeatures(locale: Locale): TechFeatureItem[] {
  return TECH_BY_LOCALE[locale] ?? TECH_BY_LOCALE.en!;
}

export const DEFAULT_TECH_FEATURES: TechFeatureItem[] = EN;
