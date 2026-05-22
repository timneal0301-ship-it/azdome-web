import type { Locale } from "@/lib/i18n/dictionaries";

export type SpecGroup = {
  title: string;
  rows: [string, string][];
  /** Set to true to skip rendering this group. */
  hidden?: boolean;
};

const SPECS_BY_LOCALE: Partial<Record<Locale, SpecGroup[]>> = {
  en: [
    { title: "Imaging", rows: [["Front resolution", "3840×2160 (True 4K)"], ["Cabin resolution", "1920×1080 (Full HD)"], ["Processor", "Novatek NT8629G"], ["Front sensor", "SC401AI + GC2053"], ["Cabin sensor", "SC223A with Sony STARVIS technology"], ["Night vision", "6-layer IR + 6 hidden IR LEDs"]] },
    { title: "Display & Interface", rows: [["Screen", "3.19-inch IPS"], ["Voice control", "Lock Video / Take Photo / Turn on WiFi"], ["Mobile app", "AZDOME (iOS 14+ / Android 8+)"], ["Languages", "11 languages, follows your phone"]] },
    { title: "Storage & Connectivity", rows: [["microSD support", "Up to 256GB (64GB included)"], ["Wi-Fi", "Dual-band 5GHz / 2.4GHz"], ["GPS", "Built-in — speed, route, latitude, longitude"], ["Loop recording", "Automatic, oldest clip overwritten"]] },
    { title: "Power & Parking", rows: [["Battery", "Super capacitor (heat-resistant)"], ["Operating temp", "−4°F to 158°F (−20°C to 70°C)"], ["Parking modes", "Collision detection · or · 24h time-lapse"], ["G-sensor", "3-axis, auto event lock on impact"], ["Power input", "12V / 24V (Type-C)"]] },
    { title: "In the Box & Support", rows: [["Included", "M550 Pro · Rear cam · 3M mounts ×2 · Type-C cable (3.5m) · Trim tool · 64GB SD · Quick-start guide"], ["Optional add-on", "Hardwire kit (3-lead) for 24h parking mode"], ["Warranty", "12 months + 24×7 technical support"]] },
  ],
  zh: [
    { title: "影像", rows: [["前置分辨率", "3840×2160(原生 4K)"], ["舱内分辨率", "1920×1080(Full HD)"], ["处理器", "Novatek NT8629G"], ["前置传感器", "SC401AI + GC2053"], ["舱内传感器", "SC223A · Sony STARVIS 技术"], ["夜视", "6 层 IR + 6 颗隐藏式 IR LED"]] },
    { title: "显示与交互", rows: [["屏幕", "3.19 英寸 IPS"], ["语音控制", "锁定视频 / 拍照 / 打开 WiFi"], ["手机应用", "AZDOME(iOS 14+ / Android 8+)"], ["语言", "11 种,跟随手机"]] },
    { title: "存储与连接", rows: [["microSD 支持", "最大 256GB(随附 64GB)"], ["Wi-Fi", "双频 5GHz / 2.4GHz"], ["GPS", "内置 · 速度 / 路径 / 经纬度"], ["循环录制", "自动覆盖最旧片段"]] },
    { title: "电源与停车", rows: [["电池", "超级电容(耐高温)"], ["工作温度", "−20°C 至 70°C"], ["停车模式", "撞击检测 · 或 · 24 小时延时摄影"], ["重力感应", "三轴 · 撞击自动锁存"], ["输入电压", "12V / 24V(Type-C)"]] },
    { title: "包装与售后", rows: [["包装内含", "M550 Pro · 后摄 · 3M 支架 ×2 · Type-C 线(3.5 米) · 撬棒 · 64GB SD · 快速指南"], ["可选配件", "降压线套件(3 头)· 用于 24 小时停车监控"], ["保修", "12 个月 + 7×24 技术支持"]] },
  ],
  ja: [
    { title: "撮影", rows: [["フロント解像度", "3840×2160(リアル 4K)"], ["車内解像度", "1920×1080(Full HD)"], ["プロセッサ", "Novatek NT8629G"], ["フロントセンサー", "SC401AI + GC2053"], ["車内センサー", "SC223A・Sony STARVIS 技術"], ["夜間視認", "6 層 IR + 6 個の隠し IR LED"]] },
    { title: "ディスプレイ & UI", rows: [["スクリーン", "3.19 インチ IPS"], ["音声操作", "ロック / 撮影 / WiFi オン"], ["モバイルアプリ", "AZDOME(iOS 14+ / Android 8+)"], ["言語", "11 言語・スマホに連動"]] },
    { title: "ストレージ & 接続", rows: [["microSD 対応", "最大 256GB(64GB 同梱)"], ["Wi-Fi", "デュアルバンド 5GHz / 2.4GHz"], ["GPS", "内蔵・速度 / 経路 / 緯度経度"], ["ループ録画", "自動・最古クリップを上書き"]] },
    { title: "電源 & 駐車", rows: [["電池", "スーパーキャパシタ(耐熱)"], ["動作温度", "−20°C ~ 70°C"], ["駐車モード", "衝撃検知・または・24 時間タイムラプス"], ["G センサー", "3 軸・衝撃で自動ロック"], ["電源入力", "12V / 24V(Type-C)"]] },
    { title: "同梱品 & サポート", rows: [["同梱", "M550 Pro・リアカメラ・3M マウント ×2・Type-C ケーブル(3.5m)・はがし工具・64GB SD・クイックガイド"], ["別売", "ハードワイヤーキット(3 本)・24 時間駐車監視用"], ["保証", "12 ヶ月 + 24×7 テクニカルサポート"]] },
  ],
  de: [
    { title: "Bildgebung", rows: [["Front-Auflösung", "3840×2160 (echtes 4K)"], ["Innenraum-Auflösung", "1920×1080 (Full HD)"], ["Prozessor", "Novatek NT8629G"], ["Front-Sensor", "SC401AI + GC2053"], ["Innenraum-Sensor", "SC223A mit Sony STARVIS-Technologie"], ["Nachtsicht", "6-Schicht-IR + 6 versteckte IR-LEDs"]] },
    { title: "Display & Bedienung", rows: [["Bildschirm", "3,19-Zoll IPS"], ["Sprachsteuerung", "Lock Video / Take Photo / Turn on WiFi"], ["Mobile App", "AZDOME (iOS 14+ / Android 8+)"], ["Sprachen", "11 Sprachen, folgt dem Telefon"]] },
    { title: "Speicher & Konnektivität", rows: [["microSD-Unterstützung", "Bis zu 256 GB (64 GB enthalten)"], ["Wi-Fi", "Dualband 5 GHz / 2,4 GHz"], ["GPS", "Eingebaut — Tempo, Route, Breite, Länge"], ["Endlosaufzeichnung", "Automatisch, älteste Clips werden überschrieben"]] },
    { title: "Strom & Parken", rows: [["Akku", "Superkondensator (hitzebeständig)"], ["Betriebstemp.", "−20 °C bis 70 °C"], ["Parkmodi", "Kollisionserkennung · oder · 24h-Zeitraffer"], ["G-Sensor", "3-Achsen, Auto-Event-Lock bei Aufprall"], ["Strom-Eingang", "12V / 24V (Type-C)"]] },
    { title: "Lieferumfang & Support", rows: [["Enthalten", "M550 Pro · Heckkamera · 3M-Halterungen ×2 · Type-C-Kabel (3,5 m) · Verkleidungswerkzeug · 64 GB SD · Schnellstart"], ["Optional", "Festeinbau-Satz (3-adrig) für 24h-Parkmodus"], ["Garantie", "12 Monate + 24×7 technischer Support"]] },
  ],
  fr: [
    { title: "Imagerie", rows: [["Résolution avant", "3840×2160 (vrai 4K)"], ["Résolution cabine", "1920×1080 (Full HD)"], ["Processeur", "Novatek NT8629G"], ["Capteur avant", "SC401AI + GC2053"], ["Capteur cabine", "SC223A avec technologie Sony STARVIS"], ["Vision nocturne", "IR 6 couches + 6 LED IR cachées"]] },
    { title: "Écran & interface", rows: [["Écran", "IPS 3,19 pouces"], ["Contrôle vocal", "Lock Video / Take Photo / Turn on WiFi"], ["Application mobile", "AZDOME (iOS 14+ / Android 8+)"], ["Langues", "11 langues, suit votre téléphone"]] },
    { title: "Stockage & connectivité", rows: [["microSD", "Jusqu'à 256 Go (64 Go inclus)"], ["Wi-Fi", "Double bande 5 GHz / 2,4 GHz"], ["GPS", "Intégré — vitesse, trajet, latitude, longitude"], ["Enregistrement boucle", "Automatique, le clip le plus ancien est écrasé"]] },
    { title: "Alimentation & parking", rows: [["Batterie", "Supercondensateur (résistant à la chaleur)"], ["Température d'utilisation", "−20 °C à 70 °C"], ["Modes parking", "Détection de collision · ou · timelapse 24h"], ["Capteur G", "3 axes, verrouillage auto en cas de choc"], ["Alimentation", "12V / 24V (Type-C)"]] },
    { title: "Dans la boîte & support", rows: [["Inclus", "M550 Pro · caméra arrière · supports 3M ×2 · câble Type-C (3,5 m) · outil · SD 64 Go · guide"], ["Option", "Kit d'alimentation (3 fils) pour mode parking 24h"], ["Garantie", "12 mois + support technique 24×7"]] },
  ],
  es: [
    { title: "Imagen", rows: [["Resolución frontal", "3840×2160 (4K real)"], ["Resolución cabina", "1920×1080 (Full HD)"], ["Procesador", "Novatek NT8629G"], ["Sensor frontal", "SC401AI + GC2053"], ["Sensor cabina", "SC223A con tecnología Sony STARVIS"], ["Visión nocturna", "IR de 6 capas + 6 LED IR ocultos"]] },
    { title: "Pantalla e interfaz", rows: [["Pantalla", "IPS 3,19 pulgadas"], ["Control por voz", "Lock Video / Take Photo / Turn on WiFi"], ["App móvil", "AZDOME (iOS 14+ / Android 8+)"], ["Idiomas", "11 idiomas, sigue al teléfono"]] },
    { title: "Almacenamiento y conectividad", rows: [["microSD", "Hasta 256 GB (incluye 64 GB)"], ["Wi-Fi", "Doble banda 5 GHz / 2,4 GHz"], ["GPS", "Integrado — velocidad, ruta, latitud, longitud"], ["Grabación en bucle", "Automática, sobrescribe el clip más antiguo"]] },
    { title: "Alimentación y aparcamiento", rows: [["Batería", "Supercondensador (resistente al calor)"], ["Temp. de funcionamiento", "−20 °C a 70 °C"], ["Modos aparcamiento", "Detección de colisión · o · time-lapse 24h"], ["Sensor G", "3 ejes, bloqueo automático en impacto"], ["Entrada", "12V / 24V (Type-C)"]] },
    { title: "Contenido y soporte", rows: [["Incluye", "M550 Pro · cámara trasera · soportes 3M ×2 · cable Type-C (3,5 m) · herramienta · SD 64 GB · guía"], ["Opcional", "Kit de alimentación (3 cables) para aparcamiento 24h"], ["Garantía", "12 meses + soporte técnico 24×7"]] },
  ],
  it: [
    { title: "Imaging", rows: [["Risoluzione anteriore", "3840×2160 (4K reale)"], ["Risoluzione abitacolo", "1920×1080 (Full HD)"], ["Processore", "Novatek NT8629G"], ["Sensore anteriore", "SC401AI + GC2053"], ["Sensore abitacolo", "SC223A con tecnologia Sony STARVIS"], ["Visione notturna", "IR a 6 strati + 6 LED IR nascosti"]] },
    { title: "Display & interfaccia", rows: [["Schermo", "IPS 3,19 pollici"], ["Controllo vocale", "Lock Video / Take Photo / Turn on WiFi"], ["App mobile", "AZDOME (iOS 14+ / Android 8+)"], ["Lingue", "11 lingue, segue il telefono"]] },
    { title: "Memoria & connettività", rows: [["microSD", "Fino a 256 GB (64 GB inclusi)"], ["Wi-Fi", "Dual-band 5 GHz / 2,4 GHz"], ["GPS", "Integrato — velocità, percorso, latitudine, longitudine"], ["Loop", "Automatico, sovrascrive il clip più vecchio"]] },
    { title: "Alimentazione & parcheggio", rows: [["Batteria", "Supercondensatore (resistente al calore)"], ["Temp. operativa", "−20 °C a 70 °C"], ["Modalità parcheggio", "Rilevamento urti · o · timelapse 24h"], ["Sensore G", "3 assi, blocco automatico in caso di impatto"], ["Ingresso", "12V / 24V (Type-C)"]] },
    { title: "Confezione & supporto", rows: [["Incluso", "M550 Pro · cam posteriore · supporti 3M ×2 · cavo Type-C (3,5 m) · attrezzo · SD 64 GB · guida"], ["Opzionale", "Kit alimentazione fissa (3 fili) per modalità parcheggio 24h"], ["Garanzia", "12 mesi + supporto tecnico 24×7"]] },
  ],
  ru: [
    { title: "Съёмка", rows: [["Передняя матрица", "3840×2160 (настоящее 4K)"], ["Салонная матрица", "1920×1080 (Full HD)"], ["Процессор", "Novatek NT8629G"], ["Передний сенсор", "SC401AI + GC2053"], ["Салонный сенсор", "SC223A с технологией Sony STARVIS"], ["Ночное видение", "6-слойная ИК + 6 скрытых ИК-светодиодов"]] },
    { title: "Экран и интерфейс", rows: [["Экран", "IPS 3,19 дюйма"], ["Голос", "Lock Video / Take Photo / Turn on WiFi"], ["Приложение", "AZDOME (iOS 14+ / Android 8+)"], ["Языки", "11 языков, следует за телефоном"]] },
    { title: "Память и связь", rows: [["microSD", "До 256 ГБ (64 ГБ в комплекте)"], ["Wi-Fi", "Двухдиапазонный 5 ГГц / 2,4 ГГц"], ["GPS", "Встроенный — скорость, маршрут, координаты"], ["Циклическая запись", "Автоматически, перезаписывается старейший клип"]] },
    { title: "Питание и парковка", rows: [["Источник", "Суперконденсатор (термостойкий)"], ["Раб. температура", "−20 °C до 70 °C"], ["Парковка", "Детектор удара · или · таймлапс 24 ч"], ["G-сенсор", "3-осевой, авто-блокировка при ударе"], ["Питание", "12 В / 24 В (Type-C)"]] },
    { title: "В комплекте и поддержка", rows: [["В комплекте", "M550 Pro · задняя камера · 3M-крепления ×2 · Type-C-кабель (3,5 м) · инструмент · SD 64 ГБ · краткое руководство"], ["Опция", "Hardwire-комплект (3 провода) для 24 ч парковки"], ["Гарантия", "12 месяцев + поддержка 24×7"]] },
  ],
  pl: [
    { title: "Obraz", rows: [["Rozdzielczość przód", "3840×2160 (prawdziwe 4K)"], ["Rozdzielczość kabina", "1920×1080 (Full HD)"], ["Procesor", "Novatek NT8629G"], ["Matryca przód", "SC401AI + GC2053"], ["Matryca kabina", "SC223A z technologią Sony STARVIS"], ["Widzenie nocne", "6-warstwowy IR + 6 ukrytych diod IR"]] },
    { title: "Ekran & interfejs", rows: [["Ekran", "IPS 3,19 cala"], ["Sterowanie głosem", "Lock Video / Take Photo / Turn on WiFi"], ["Aplikacja", "AZDOME (iOS 14+ / Android 8+)"], ["Języki", "11 języków, podąża za telefonem"]] },
    { title: "Pamięć & łączność", rows: [["microSD", "Do 256 GB (w zestawie 64 GB)"], ["Wi-Fi", "Dwuzakresowe 5 GHz / 2,4 GHz"], ["GPS", "Wbudowany — prędkość, trasa, współrzędne"], ["Nagrywanie w pętli", "Automatyczne, najstarszy klip nadpisywany"]] },
    { title: "Zasilanie & parkowanie", rows: [["Zasilanie", "Superkondensator (odporny na ciepło)"], ["Temp. pracy", "−20 °C do 70 °C"], ["Tryby parkowania", "Wykrywanie kolizji · lub · timelapse 24h"], ["Czujnik G", "3-osiowy, auto-blokada przy uderzeniu"], ["Zasilanie", "12V / 24V (Type-C)"]] },
    { title: "W zestawie & wsparcie", rows: [["W zestawie", "M550 Pro · kamera tylna · uchwyty 3M ×2 · kabel Type-C (3,5 m) · narzędzie · 64 GB SD · skrócona instrukcja"], ["Opcjonalnie", "Zestaw hardwire (3-żyłowy) dla parkowania 24h"], ["Gwarancja", "12 miesięcy + wsparcie 24×7"]] },
  ],
  ro: [
    { title: "Imagine", rows: [["Rezoluție față", "3840×2160 (4K real)"], ["Rezoluție habitaclu", "1920×1080 (Full HD)"], ["Procesor", "Novatek NT8629G"], ["Senzor față", "SC401AI + GC2053"], ["Senzor habitaclu", "SC223A cu tehnologie Sony STARVIS"], ["Vedere nocturnă", "IR pe 6 straturi + 6 LED-uri IR ascunse"]] },
    { title: "Ecran & interfață", rows: [["Ecran", "IPS 3,19 inch"], ["Control vocal", "Lock Video / Take Photo / Turn on WiFi"], ["Aplicație", "AZDOME (iOS 14+ / Android 8+)"], ["Limbi", "11 limbi, urmează telefonul"]] },
    { title: "Stocare & conectivitate", rows: [["microSD", "Până la 256 GB (64 GB inclus)"], ["Wi-Fi", "Bandă dublă 5 GHz / 2,4 GHz"], ["GPS", "Integrat — viteză, traseu, coordonate"], ["Buclă", "Automat, cel mai vechi clip suprascris"]] },
    { title: "Alimentare & parcare", rows: [["Sursă", "Supercondensator (rezistent la căldură)"], ["Temp. funcționare", "−20 °C până la 70 °C"], ["Moduri parcare", "Detecție coliziune · sau · timelapse 24h"], ["Senzor G", "3 axe, blocare automată la impact"], ["Alimentare", "12V / 24V (Type-C)"]] },
    { title: "Conținut cutie & suport", rows: [["Inclus", "M550 Pro · cameră spate · suporturi 3M ×2 · cablu Type-C (3,5 m) · unealtă · SD 64 GB · ghid"], ["Opțional", "Kit hardwire (3 fire) pentru parcare 24h"], ["Garanție", "12 luni + suport tehnic 24×7"]] },
  ],
  tr: [
    { title: "Görüntüleme", rows: [["Ön çözünürlük", "3840×2160 (gerçek 4K)"], ["Kabin çözünürlük", "1920×1080 (Full HD)"], ["İşlemci", "Novatek NT8629G"], ["Ön sensör", "SC401AI + GC2053"], ["Kabin sensörü", "SC223A · Sony STARVIS teknolojisi"], ["Gece görüş", "6 katmanlı IR + 6 gizli IR LED"]] },
    { title: "Ekran & arayüz", rows: [["Ekran", "3,19 inç IPS"], ["Sesli komut", "Lock Video / Take Photo / Turn on WiFi"], ["Mobil uygulama", "AZDOME (iOS 14+ / Android 8+)"], ["Diller", "11 dil, telefonu takip eder"]] },
    { title: "Depolama & bağlantı", rows: [["microSD", "256 GB'a kadar (64 GB dahil)"], ["Wi-Fi", "Çift bant 5 GHz / 2,4 GHz"], ["GPS", "Dahili — hız, rota, enlem, boylam"], ["Döngüsel kayıt", "Otomatik, en eski klip üzerine yazılır"]] },
    { title: "Güç & park", rows: [["Güç", "Süper kapasitör (ısıya dayanıklı)"], ["Çalışma sıcaklığı", "−20 °C ile 70 °C"], ["Park modu", "Çarpışma algılama · veya · 24s time-lapse"], ["G sensörü", "3 eksen, darbede otomatik kilit"], ["Giriş", "12V / 24V (Type-C)"]] },
    { title: "Kutu içeriği & destek", rows: [["Dahil", "M550 Pro · arka kamera · 3M tutucu ×2 · Type-C kablo (3,5 m) · alet · 64 GB SD · hızlı başlangıç"], ["Opsiyonel", "Hardwire kit (3 kablo) 24s park modu için"], ["Garanti", "12 ay + 24×7 teknik destek"]] },
  ],
  pt: [
    { title: "Imagem", rows: [["Resolução frontal", "3840×2160 (4K real)"], ["Resolução cabine", "1920×1080 (Full HD)"], ["Processador", "Novatek NT8629G"], ["Sensor frontal", "SC401AI + GC2053"], ["Sensor cabine", "SC223A com tecnologia Sony STARVIS"], ["Visão noturna", "IR de 6 camadas + 6 LEDs IR ocultos"]] },
    { title: "Tela & interface", rows: [["Tela", "IPS 3,19 polegadas"], ["Controle por voz", "Lock Video / Take Photo / Turn on WiFi"], ["App", "AZDOME (iOS 14+ / Android 8+)"], ["Idiomas", "11 idiomas, segue o celular"]] },
    { title: "Armazenamento & conectividade", rows: [["microSD", "Até 256 GB (64 GB inclusos)"], ["Wi-Fi", "Banda dupla 5 GHz / 2,4 GHz"], ["GPS", "Integrado — velocidade, rota, coordenadas"], ["Loop", "Automático, sobrescreve o clipe mais antigo"]] },
    { title: "Energia & estacionamento", rows: [["Energia", "Supercapacitor (resistente ao calor)"], ["Temp. operacional", "−20 °C a 70 °C"], ["Modos estacionamento", "Detecção de colisão · ou · time-lapse 24h"], ["Sensor G", "3 eixos, trava automática no impacto"], ["Entrada", "12V / 24V (Type-C)"]] },
    { title: "Embalagem & suporte", rows: [["Inclui", "M550 Pro · câmera traseira · suportes 3M ×2 · cabo Type-C (3,5 m) · ferramenta · SD 64 GB · guia"], ["Opcional", "Kit hardwire (3 fios) para estacionamento 24h"], ["Garantia", "12 meses + suporte técnico 24×7"]] },
  ],
  ar: [
    { title: "التصوير", rows: [["دقة الأمام", "3840×2160 (4K حقيقي)"], ["دقة المقصورة", "1920×1080 (Full HD)"], ["المعالج", "Novatek NT8629G"], ["مستشعر الأمام", "SC401AI + GC2053"], ["مستشعر المقصورة", "SC223A بتقنية Sony STARVIS"], ["الرؤية الليلية", "أشعة تحت حمراء بـ 6 طبقات + 6 مصابيح IR مخفية"]] },
    { title: "الشاشة والواجهة", rows: [["الشاشة", "IPS مقاس 3.19 بوصة"], ["التحكم الصوتي", "Lock Video / Take Photo / Turn on WiFi"], ["التطبيق", "AZDOME (iOS 14+ / Android 8+)"], ["اللغات", "11 لغة، تتبع لغة الهاتف"]] },
    { title: "التخزين والاتصال", rows: [["microSD", "حتى 256GB (مرفق 64GB)"], ["Wi-Fi", "ثنائي النطاق 5GHz / 2.4GHz"], ["GPS", "مدمج — السرعة والمسار وخطوط الطول والعرض"], ["التسجيل المتكرر", "تلقائي، يُستبدل أقدم مقطع"]] },
    { title: "الطاقة والوقوف", rows: [["البطارية", "مكثف فائق (مقاوم للحرارة)"], ["درجة التشغيل", "−20 °C إلى 70 °C"], ["أوضاع الوقوف", "كشف الاصطدام · أو · فاصل زمني 24 ساعة"], ["G-sensor", "ثلاثي المحاور، قفل تلقائي عند الاصطدام"], ["مدخل الطاقة", "12V / 24V (Type-C)"]] },
    { title: "محتويات العلبة والدعم", rows: [["المرفقات", "M550 Pro · كاميرا خلفية · حوامل 3M ×2 · كابل Type-C (3.5 م) · أداة · بطاقة 64GB SD · دليل سريع"], ["إضافة اختيارية", "عُدّة توصيل مباشر (3 أسلاك) لوضع الوقوف 24 ساعة"], ["الضمان", "12 شهرًا + دعم فني 24×7"]] },
  ],
  th: [
    { title: "การถ่ายภาพ", rows: [["ความละเอียดด้านหน้า", "3840×2160 (4K แท้)"], ["ความละเอียดในห้องโดยสาร", "1920×1080 (Full HD)"], ["โปรเซสเซอร์", "Novatek NT8629G"], ["เซ็นเซอร์หน้า", "SC401AI + GC2053"], ["เซ็นเซอร์ห้องโดยสาร", "SC223A พร้อมเทคโนโลยี Sony STARVIS"], ["มองในที่มืด", "IR 6 ชั้น + LED IR ซ่อน 6 ดวง"]] },
    { title: "หน้าจอและการควบคุม", rows: [["หน้าจอ", "IPS 3.19 นิ้ว"], ["ควบคุมด้วยเสียง", "Lock Video / Take Photo / Turn on WiFi"], ["แอป", "AZDOME (iOS 14+ / Android 8+)"], ["ภาษา", "11 ภาษา ติดตามตามมือถือ"]] },
    { title: "พื้นที่จัดเก็บและการเชื่อมต่อ", rows: [["รองรับ microSD", "สูงสุด 256GB (รวม 64GB)"], ["Wi-Fi", "Dual-band 5GHz / 2.4GHz"], ["GPS", "ในตัว — ความเร็ว/เส้นทาง/พิกัด"], ["บันทึกแบบลูป", "อัตโนมัติ ทับคลิปเก่าสุด"]] },
    { title: "พลังงานและโหมดจอด", rows: [["แหล่งพลังงาน", "ซูเปอร์คาปาซิเตอร์ (ทนความร้อน)"], ["อุณหภูมิทำงาน", "−20°C ถึง 70°C"], ["โหมดจอด", "ตรวจจับการชน · หรือ · ไทม์แลปส์ 24 ชม."], ["G-sensor", "3 แกน · ล็อกอัตโนมัติเมื่อกระแทก"], ["อินพุต", "12V / 24V (Type-C)"]] },
    { title: "ในกล่องและการสนับสนุน", rows: [["ในกล่อง", "M550 Pro · กล้องหลัง · แผ่นยึด 3M ×2 · สาย Type-C (3.5 ม.) · ที่งัด · 64GB SD · คู่มือเริ่มต้น"], ["อุปกรณ์เสริม", "ชุดต่อสายตรง (3 เส้น) สำหรับโหมดจอด 24 ชม."], ["รับประกัน", "12 เดือน + ซัพพอร์ตเทคนิค 24×7"]] },
  ],
  vi: [
    { title: "Hình ảnh", rows: [["Độ phân giải trước", "3840×2160 (4K thực)"], ["Độ phân giải trong xe", "1920×1080 (Full HD)"], ["Bộ xử lý", "Novatek NT8629G"], ["Cảm biến trước", "SC401AI + GC2053"], ["Cảm biến trong xe", "SC223A với công nghệ Sony STARVIS"], ["Quay đêm", "IR 6 lớp + 6 đèn IR ẩn"]] },
    { title: "Màn hình & giao diện", rows: [["Màn hình", "IPS 3,19 inch"], ["Lệnh thoại", "Lock Video / Take Photo / Turn on WiFi"], ["Ứng dụng", "AZDOME (iOS 14+ / Android 8+)"], ["Ngôn ngữ", "11 ngôn ngữ, theo điện thoại"]] },
    { title: "Lưu trữ & kết nối", rows: [["microSD", "Đến 256GB (kèm 64GB)"], ["Wi-Fi", "Băng tần kép 5GHz / 2,4GHz"], ["GPS", "Tích hợp — tốc độ/đường đi/tọa độ"], ["Ghi lặp", "Tự động, ghi đè clip cũ nhất"]] },
    { title: "Nguồn & đậu xe", rows: [["Nguồn", "Siêu tụ điện (chịu nhiệt)"], ["Nhiệt độ hoạt động", "−20°C đến 70°C"], ["Chế độ đậu xe", "Phát hiện va chạm · hoặc · timelapse 24h"], ["Cảm biến G", "3 trục, khóa tự động khi va chạm"], ["Nguồn vào", "12V / 24V (Type-C)"]] },
    { title: "Trong hộp & hỗ trợ", rows: [["Bao gồm", "M550 Pro · camera sau · đế 3M ×2 · cáp Type-C (3,5 m) · dụng cụ · SD 64GB · hướng dẫn"], ["Tùy chọn", "Bộ đấu nối điện (3 dây) cho chế độ đậu xe 24h"], ["Bảo hành", "12 tháng + hỗ trợ 24×7"]] },
  ],
};

export function getDefaultSpecs(locale: Locale): SpecGroup[] {
  return SPECS_BY_LOCALE[locale] ?? SPECS_BY_LOCALE.en!;
}

export const DEFAULT_SPECS: SpecGroup[] = SPECS_BY_LOCALE.en!;
