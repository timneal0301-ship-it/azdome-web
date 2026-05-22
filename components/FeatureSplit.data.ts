import type { Locale } from "@/lib/i18n/dictionaries";

export const FEATURE_SPLIT_ICONS = [
  "Eye",
  "ShieldCheck",
  "Smartphone",
  "Wifi",
  "Zap",
  "Moon",
  "Camera",
  "Cloud",
] as const;

export type FeatureBlock = {
  /** Lucide icon name — see FEATURE_SPLIT_ICONS for allowed values. */
  iconName: string;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  /** Set to true to skip rendering this feature block. */
  hidden?: boolean;
};

const IMG_4K = "/images/aplus/4k-detail.jpg";
const IMG_PARKING = "/images/aplus/parking.jpg";
const IMG_APP = "/images/aplus/app.jpg";

const FEATURES_BY_LOCALE: Partial<Record<Locale, FeatureBlock[]>> = {
  en: [
    { iconName: "Eye", eyebrow: "4K Resolution", title: "Read license plates four lanes away.", description: "True 3840×2160 capture preserves the details that matter when it counts. Frame-perfect evidence — every drive, every angle.", image: IMG_4K },
    { iconName: "ShieldCheck", eyebrow: "24H Parking Mode", title: "Your car never sleeps. Neither does the camera.", description: "Buffered parking mode records the moments before an impact. Motion and collision detection wake the camera only when something happens.", image: IMG_PARKING },
    { iconName: "Smartphone", eyebrow: "AZDOME App", title: "Footage in your pocket, instantly.", description: "Pair via 5GHz Wi-Fi for one-tap clip downloads. Share to insurance, family, or socials without ever removing the SD card.", image: IMG_APP },
  ],
  zh: [
    { iconName: "Eye", eyebrow: "4K 分辨率", title: "看清四车道之外的车牌。", description: "原生 3840×2160 拍摄保留每一个细节。每一段行车、每一个角度,都是关键时刻的清晰证据。", image: IMG_4K },
    { iconName: "ShieldCheck", eyebrow: "24 小时停车监控", title: "你的车不眠,摄像头亦然。", description: "缓冲式停车模式记录冲击前的关键瞬间,移动与碰撞检测只在事件发生时唤醒摄像头。", image: IMG_PARKING },
    { iconName: "Smartphone", eyebrow: "AZDOME App", title: "随身的高清视频。", description: "通过 5GHz Wi-Fi 配对,一键下载片段。分享给保险、家人或社交平台,无需取出 SD 卡。", image: IMG_APP },
  ],
  ja: [
    { iconName: "Eye", eyebrow: "4K 解像度", title: "4 車線先のナンバープレートも読める。", description: "ネイティブ 3840×2160 撮影が肝心な細部を保持。フレーム単位で正確な証拠を、毎ドライブ、あらゆる角度で。", image: IMG_4K },
    { iconName: "ShieldCheck", eyebrow: "24 時間駐車監視", title: "車が眠らない。カメラも眠らない。", description: "バッファ式駐車モードが衝撃の直前の瞬間を記録。動きや衝撃を検知したときだけカメラが起動します。", image: IMG_PARKING },
    { iconName: "Smartphone", eyebrow: "AZDOME アプリ", title: "ポケットの中に映像、すぐに。", description: "5GHz Wi-Fi でペアリングしてワンタップでダウンロード。SD カードを抜かずに保険・家族・SNS に共有。", image: IMG_APP },
  ],
  de: [
    { iconName: "Eye", eyebrow: "4K-Auflösung", title: "Nummernschilder vier Spuren entfernt lesen.", description: "Native 3840×2160-Aufnahme bewahrt die Details, die zählen. Frame-perfekte Beweise — jede Fahrt, jeder Winkel.", image: IMG_4K },
    { iconName: "ShieldCheck", eyebrow: "24-h-Parkmodus", title: "Ihr Auto schläft nie. Die Kamera auch nicht.", description: "Der gepufferte Parkmodus zeichnet die Momente vor einem Aufprall auf. Bewegungs- und Aufprallerkennung wecken die Kamera nur, wenn etwas passiert.", image: IMG_PARKING },
    { iconName: "Smartphone", eyebrow: "AZDOME-App", title: "Aufnahmen sofort in der Tasche.", description: "Über 5-GHz-WLAN koppeln und Clips per Tipp herunterladen. Mit Versicherung, Familie oder sozialen Medien teilen, ohne die SD-Karte zu entnehmen.", image: IMG_APP },
  ],
  fr: [
    { iconName: "Eye", eyebrow: "Résolution 4K", title: "Lisez les plaques à quatre voies de distance.", description: "Capture native 3840×2160 préservant les détails qui comptent. Des preuves au pixel près — chaque trajet, chaque angle.", image: IMG_4K },
    { iconName: "ShieldCheck", eyebrow: "Mode parking 24h", title: "Votre voiture ne dort jamais. La caméra non plus.", description: "Le mode parking tamponné enregistre les instants précédant un impact. La détection de mouvement et de choc réveille la caméra uniquement quand il se passe quelque chose.", image: IMG_PARKING },
    { iconName: "Smartphone", eyebrow: "Application AZDOME", title: "Vos vidéos en poche, instantanément.", description: "Appairez via Wi-Fi 5 GHz pour télécharger en un toucher. Partagez à votre assurance, votre famille ou sur les réseaux — sans retirer la carte SD.", image: IMG_APP },
  ],
  es: [
    { iconName: "Eye", eyebrow: "Resolución 4K", title: "Lee matrículas a cuatro carriles de distancia.", description: "Captura nativa 3840×2160 que conserva los detalles importantes. Pruebas al fotograma — cada trayecto, cada ángulo.", image: IMG_4K },
    { iconName: "ShieldCheck", eyebrow: "Modo aparcamiento 24h", title: "Tu coche no duerme. La cámara tampoco.", description: "El modo aparcamiento con búfer graba los momentos previos a un impacto. La detección de movimiento y colisión activa la cámara solo cuando ocurre algo.", image: IMG_PARKING },
    { iconName: "Smartphone", eyebrow: "App AZDOME", title: "Tus vídeos en el bolsillo, al instante.", description: "Empareja por Wi-Fi 5 GHz para descargar clips con un toque. Comparte con tu seguro, familia o redes sin sacar la tarjeta SD.", image: IMG_APP },
  ],
  it: [
    { iconName: "Eye", eyebrow: "Risoluzione 4K", title: "Leggi le targhe a quattro corsie di distanza.", description: "Acquisizione nativa 3840×2160 che preserva i dettagli che contano. Prove al fotogramma — ogni viaggio, ogni angolazione.", image: IMG_4K },
    { iconName: "ShieldCheck", eyebrow: "Modalità parcheggio 24h", title: "La tua auto non dorme mai. La telecamera nemmeno.", description: "La modalità parcheggio con buffer registra i momenti prima di un impatto. Movimento e collisione svegliano la telecamera solo quando succede qualcosa.", image: IMG_PARKING },
    { iconName: "Smartphone", eyebrow: "App AZDOME", title: "Le tue riprese in tasca, all'istante.", description: "Connetti tramite Wi-Fi 5 GHz per scaricare clip con un tocco. Condividi con assicurazione, famiglia o social — senza estrarre la SD.", image: IMG_APP },
  ],
  ru: [
    { iconName: "Eye", eyebrow: "Разрешение 4K", title: "Читайте номера за четыре полосы.", description: "Нативная съёмка 3840×2160 сохраняет детали, которые важны. Покадровая точность доказательств — в каждой поездке, под любым углом.", image: IMG_4K },
    { iconName: "ShieldCheck", eyebrow: "Парковочный режим 24 ч", title: "Ваша машина не спит. Камера тоже.", description: "Буферизованный парковочный режим записывает мгновения до удара. Детекторы движения и столкновения пробуждают камеру только в момент события.", image: IMG_PARKING },
    { iconName: "Smartphone", eyebrow: "AZDOME App", title: "Ваши записи в кармане, мгновенно.", description: "Подключение по 5 ГГц Wi-Fi и загрузка клипов одним нажатием. Делитесь со страховой, семьёй или соцсетями — без извлечения карты.", image: IMG_APP },
  ],
  pl: [
    { iconName: "Eye", eyebrow: "Rozdzielczość 4K", title: "Odczytaj tablice z czterech pasów.", description: "Natywne nagrywanie 3840×2160 zachowuje szczegóły, które mają znaczenie. Klatka po klatce — każda jazda, każdy kąt.", image: IMG_4K },
    { iconName: "ShieldCheck", eyebrow: "Tryb parkowania 24h", title: "Twoje auto nigdy nie śpi. Kamera też nie.", description: "Buforowany tryb parkowania rejestruje chwile tuż przed uderzeniem. Detekcja ruchu i kolizji budzi kamerę tylko wtedy, gdy coś się dzieje.", image: IMG_PARKING },
    { iconName: "Smartphone", eyebrow: "Aplikacja AZDOME", title: "Nagrania w kieszeni, natychmiast.", description: "Paruj przez Wi-Fi 5 GHz, pobieraj klipy jednym dotknięciem. Udostępniaj ubezpieczycielowi, rodzinie lub w sieci — bez wyjmowania karty SD.", image: IMG_APP },
  ],
  ro: [
    { iconName: "Eye", eyebrow: "Rezoluție 4K", title: "Citește plăcuțe de pe patru benzi distanță.", description: "Captură nativă 3840×2160 care păstrează detaliile esențiale. Dovezi cadru cu cadru — fiecare drum, fiecare unghi.", image: IMG_4K },
    { iconName: "ShieldCheck", eyebrow: "Mod parcare 24h", title: "Mașina ta nu doarme. Nici camera.", description: "Modul parcare cu buffer înregistrează momentele dinaintea unui impact. Detectarea mișcării și a coliziunii pornește camera doar când se întâmplă ceva.", image: IMG_PARKING },
    { iconName: "Smartphone", eyebrow: "Aplicația AZDOME", title: "Filmările tale în buzunar, instant.", description: "Conectează prin Wi-Fi 5 GHz și descarcă clipuri cu un click. Trimite asigurătorului, familiei sau pe social — fără să scoți cardul SD.", image: IMG_APP },
  ],
  tr: [
    { iconName: "Eye", eyebrow: "4K Çözünürlük", title: "Dört şerit öteki plakaları okuyun.", description: "3840×2160 yerel çekim önemli ayrıntıları korur. Kare kare net kanıt — her sürüşte, her açıdan.", image: IMG_4K },
    { iconName: "ShieldCheck", eyebrow: "24 Saat Park Modu", title: "Aracınız hiç uyumaz. Kamera da uyumaz.", description: "Tamponlu park modu çarpmadan önceki anları kaydeder. Hareket ve çarpışma algılaması, kamerayı yalnızca bir şey olduğunda uyandırır.", image: IMG_PARKING },
    { iconName: "Smartphone", eyebrow: "AZDOME Uygulaması", title: "Görüntüler anında cebinizde.", description: "5 GHz Wi-Fi ile eşleştirin, tek dokunuşla indirin. SD kartı çıkarmadan sigortaya, aileye veya sosyal medyaya paylaşın.", image: IMG_APP },
  ],
  pt: [
    { iconName: "Eye", eyebrow: "Resolução 4K", title: "Leia placas a quatro faixas de distância.", description: "Captura nativa 3840×2160 preserva os detalhes que importam. Provas quadro a quadro — cada trajeto, cada ângulo.", image: IMG_4K },
    { iconName: "ShieldCheck", eyebrow: "Modo estacionamento 24h", title: "Seu carro não dorme. A câmera também não.", description: "O modo estacionamento com buffer grava os momentos antes de um impacto. Detecção de movimento e colisão acordam a câmera só quando algo acontece.", image: IMG_PARKING },
    { iconName: "Smartphone", eyebrow: "App AZDOME", title: "Suas gravações no bolso, instantâneas.", description: "Pareie via Wi-Fi 5 GHz e baixe clipes com um toque. Compartilhe com seguro, família ou redes sem retirar o cartão SD.", image: IMG_APP },
  ],
  ar: [
    { iconName: "Eye", eyebrow: "دقة 4K", title: "اقرأ لوحات السيارات على بُعد أربع حارات.", description: "تصوير أصلي بدقة 3840×2160 يحفظ التفاصيل التي تحتاج إليها. أدلة دقيقة على مستوى الإطار — في كل رحلة وكل زاوية.", image: IMG_4K },
    { iconName: "ShieldCheck", eyebrow: "وضع وقوف 24 ساعة", title: "سيارتك لا تنام. وكذلك الكاميرا.", description: "وضع الوقوف المؤقت يسجّل اللحظات قبل أي اصطدام. كاشف الحركة والاصطدام يوقظ الكاميرا فقط عندما يحدث شيء.", image: IMG_PARKING },
    { iconName: "Smartphone", eyebrow: "تطبيق AZDOME", title: "لقطاتك في جيبك على الفور.", description: "اقرن عبر Wi-Fi 5GHz وحمّل المقاطع بضغطة. شارك مع التأمين أو العائلة أو وسائل التواصل — دون نزع البطاقة.", image: IMG_APP },
  ],
  th: [
    { iconName: "Eye", eyebrow: "ความละเอียด 4K", title: "อ่านป้ายทะเบียนได้ไกลถึง 4 เลน", description: "บันทึก 3840×2160 ระดับเนทีฟ คงรายละเอียดที่สำคัญในยามคับขัน หลักฐานคมชัดทุกเฟรม ทุกการเดินทาง ทุกมุม", image: IMG_4K },
    { iconName: "ShieldCheck", eyebrow: "โหมดจอด 24 ชั่วโมง", title: "รถคุณไม่หลับ กล้องก็เช่นกัน", description: "โหมดจอดแบบบัฟเฟอร์บันทึกช่วงเวลาก่อนเกิดการกระแทก ตรวจจับการเคลื่อนไหวและการชนจะปลุกกล้องเฉพาะเมื่อมีเหตุการณ์", image: IMG_PARKING },
    { iconName: "Smartphone", eyebrow: "แอป AZDOME", title: "วิดีโออยู่ในกระเป๋าคุณทันที", description: "เชื่อมต่อผ่าน Wi-Fi 5GHz ดาวน์โหลดคลิปได้ในแตะเดียว แชร์ไปยังประกัน ครอบครัว หรือโซเชียล โดยไม่ต้องถอดการ์ด SD", image: IMG_APP },
  ],
  vi: [
    { iconName: "Eye", eyebrow: "Độ phân giải 4K", title: "Đọc biển số cách bốn làn xe.", description: "Quay 3840×2160 nguyên gốc giữ lại các chi tiết quan trọng. Bằng chứng từng khung hình — mọi chuyến đi, mọi góc nhìn.", image: IMG_4K },
    { iconName: "ShieldCheck", eyebrow: "Chế độ đậu xe 24 giờ", title: "Xe bạn không ngủ. Camera cũng vậy.", description: "Chế độ đậu xe có bộ đệm ghi lại khoảnh khắc trước va chạm. Cảm biến chuyển động và va chạm chỉ đánh thức camera khi có sự kiện.", image: IMG_PARKING },
    { iconName: "Smartphone", eyebrow: "Ứng dụng AZDOME", title: "Video trong túi bạn, ngay lập tức.", description: "Ghép qua Wi-Fi 5GHz, tải clip chỉ một chạm. Chia sẻ với bảo hiểm, gia đình hay mạng xã hội — không cần tháo thẻ SD.", image: IMG_APP },
  ],
};

export function getDefaultFeatures(locale: Locale): FeatureBlock[] {
  return FEATURES_BY_LOCALE[locale] ?? FEATURES_BY_LOCALE.en!;
}

export const DEFAULT_FEATURES: FeatureBlock[] = FEATURES_BY_LOCALE.en!;
