import type { Locale } from "@/lib/i18n/dictionaries";

export const USE_CASE_ICONS = [
  "Users",
  "Car",
  "ShieldCheck",
  "Truck",
  "Heart",
  "Globe2",
] as const;

export type UseCaseTab = {
  id: string;
  /** Lucide icon name — see USE_CASE_ICONS for allowed values. */
  iconName: string;
  label: string;
  title: string;
  body: string;
  bullets: string[];
  image: string;
  /** Set to true to skip rendering this tab. */
  hidden?: boolean;
};

const IMG_FAMILY = "/images/pdp/use-family.jpg";
const IMG_RIDESHARE = "/images/pdp/use-rideshare.jpg";
const IMG_PARKING = "/images/pdp/use-parking.jpg";

const USE_CASE_TABS_BY_LOCALE: Partial<Record<Locale, UseCaseTab[]>> = {
  en: [
    { id: "family", iconName: "Users", label: "Family", title: "Memories worth keeping. Evidence when it matters.", body: "From the first turn out of the driveway to the last mile home, your dash cam captures the moments you'll want to relive — and the ones you'd rather have evidence of.", bullets: ["4K Ultra HD captures road signs and license plates", "150° wide angle covers both shoulders", "Time-lapse mode condenses long trips into shareable clips"], image: IMG_FAMILY },
    { id: "rideshare", iconName: "Car", label: "Rideshare", title: "Protect every passenger. Protect yourself.", body: "Multi-channel coverage gives you front road, cabin interior, and rear view simultaneously — the gold standard for rideshare and delivery drivers.", bullets: ["Cabin recording deters and documents disputes", "IR LEDs work in pitch-black interior at night", "Voice command keeps your hands on the wheel"], image: IMG_RIDESHARE },
    { id: "parking", iconName: "ShieldCheck", label: "Parking", title: "Eyes on your car. Even when you're not.", body: "Buffered parking mode records the seconds before and after any motion or impact. Add the hardwire kit and your camera works 24 hours a day, with battery protection built in.", bullets: ["Motion + impact triggers auto-lock the clip", "Time-lapse mode runs up to 24 hours continuous", "Low-voltage cutoff protects your car battery"], image: IMG_PARKING },
  ],
  zh: [
    { id: "family", iconName: "Users", label: "家庭", title: "值得回味的瞬间,关键时刻的证据。", body: "从驶出车道的第一个转弯到回家最后一英里,行车记录仪捕捉你想重温的画面,以及你希望有证据的场景。", bullets: ["4K Ultra HD 清晰记录路标与车牌", "150° 大广角覆盖左右两侧", "缩时摄影把长途旅行浓缩为可分享的短片"], image: IMG_FAMILY },
    { id: "rideshare", iconName: "Car", label: "网约车", title: "保护每位乘客,也保护你自己。", body: "多路同录提供前方、舱内和后方画面 — 网约车与外卖司机的黄金标准。", bullets: ["舱内录像震慑争议,也提供证据", "夜间车内全黑,IR LED 依然清晰", "语音指令让双手始终在方向盘上"], image: IMG_RIDESHARE },
    { id: "parking", iconName: "ShieldCheck", label: "停车监控", title: "你不在车上时,它仍在守护。", body: "缓冲停车模式记录任何震动或碰撞前后几秒。加装降压线,摄像头 24 小时工作,且内置电池保护。", bullets: ["移动 + 撞击触发自动锁存", "缩时模式可连续运行 24 小时", "低压保护避免电瓶亏电"], image: IMG_PARKING },
  ],
  ja: [
    { id: "family", iconName: "Users", label: "家族", title: "残したい瞬間。必要なときの証拠。", body: "ドライブウェイの最初の角から最後の 1 マイルまで、ドライブレコーダーが思い出したい瞬間も、証拠が欲しい瞬間も捉えます。", bullets: ["4K Ultra HD で道路標識と番号を鮮明に記録", "150° 広角で左右の死角もカバー", "タイムラプスで長距離ドライブを共有しやすい短編に"], image: IMG_FAMILY },
    { id: "rideshare", iconName: "Car", label: "ライドシェア", title: "乗客と自分を守る。", body: "前方・車内・後方を同時に記録するマルチチャンネルは、配車・配達ドライバーの標準仕様。", bullets: ["車内録画がトラブルを抑止し、記録する", "暗い車内でも IR LED で鮮明に", "音声操作で両手はハンドルに"], image: IMG_RIDESHARE },
    { id: "parking", iconName: "ShieldCheck", label: "駐車監視", title: "あなたが離れても、車を見守る。", body: "バッファ式駐車モードが動きや衝撃の前後を記録。ハードワイヤーキットを追加すれば 24 時間稼働、バッテリー保護も内蔵。", bullets: ["動き + 衝撃でクリップを自動ロック", "タイムラプスは最大 24 時間連続", "低電圧カットでバッテリーを保護"], image: IMG_PARKING },
  ],
  de: [
    { id: "family", iconName: "Users", label: "Familie", title: "Erinnerungen, die zählen. Beweise, wenn es darauf ankommt.", body: "Von der ersten Kurve aus der Einfahrt bis zur letzten Meile vor Zuhause — Ihre Dashcam hält fest, was Sie wieder sehen wollen, und das, wofür Sie lieber Beweise hätten.", bullets: ["4K Ultra HD erfasst Straßenschilder und Nummernschilder", "150° Weitwinkel deckt beide Schultern ab", "Zeitraffer komprimiert lange Fahrten zu teilbaren Clips"], image: IMG_FAMILY },
    { id: "rideshare", iconName: "Car", label: "Mitfahrdienste", title: "Jeden Passagier schützen. Sich selbst schützen.", body: "Mehrkanal-Abdeckung mit Front, Innenraum und Heck gleichzeitig — Standard für Ride-Sharing- und Lieferfahrer.", bullets: ["Innenraum-Aufnahme schreckt ab und dokumentiert Streit", "IR-LEDs funktionieren auch in stockdunklem Innenraum", "Sprachbefehl hält die Hände am Lenkrad"], image: IMG_RIDESHARE },
    { id: "parking", iconName: "ShieldCheck", label: "Parken", title: "Augen am Auto. Auch wenn Sie nicht da sind.", body: "Gepufferter Parkmodus zeichnet die Sekunden vor und nach jeder Bewegung oder Erschütterung auf. Mit dem Festeinbau-Satz läuft die Kamera 24 Stunden — mit integriertem Batterieschutz.", bullets: ["Bewegung + Aufprall sperren den Clip automatisch", "Zeitraffer läuft bis zu 24 Stunden durch", "Unterspannungsabschaltung schützt die Autobatterie"], image: IMG_PARKING },
  ],
  fr: [
    { id: "family", iconName: "Users", label: "Famille", title: "Souvenirs à garder. Preuves quand il le faut.", body: "Du premier virage hors de l'allée jusqu'au dernier kilomètre, votre dashcam capture les moments que vous voudrez revoir — et ceux dont vous préféreriez avoir la preuve.", bullets: ["4K Ultra HD capte panneaux et plaques", "150° couvre les deux épaules", "Le mode timelapse condense les longs trajets en clips partageables"], image: IMG_FAMILY },
    { id: "rideshare", iconName: "Car", label: "VTC", title: "Protégez chaque passager. Protégez-vous.", body: "Couverture multi-canal — avant, intérieur, arrière — la norme des chauffeurs VTC et livreurs.", bullets: ["L'enregistrement intérieur dissuade et documente les litiges", "Les LED IR fonctionnent dans un habitacle totalement sombre", "Les commandes vocales gardent les mains au volant"], image: IMG_RIDESHARE },
    { id: "parking", iconName: "ShieldCheck", label: "Stationnement", title: "Une vigilance même en votre absence.", body: "Le mode parking tamponné enregistre les secondes avant et après tout mouvement ou impact. Avec le kit d'alimentation, la caméra fonctionne 24h/24 avec protection de batterie intégrée.", bullets: ["Mouvement + impact verrouillent automatiquement le clip", "Le timelapse tourne jusqu'à 24 heures en continu", "La coupure basse tension protège la batterie"], image: IMG_PARKING },
  ],
  es: [
    { id: "family", iconName: "Users", label: "Familia", title: "Recuerdos que vale la pena guardar. Pruebas cuando importan.", body: "Desde el primer giro al salir de casa hasta la última milla — tu dashcam captura los momentos que querrás revivir y aquellos para los que preferirías tener pruebas.", bullets: ["4K Ultra HD capta señales y matrículas", "Ángulo de 150° cubre ambos lados", "Modo time-lapse convierte viajes largos en clips compartibles"], image: IMG_FAMILY },
    { id: "rideshare", iconName: "Car", label: "VTC", title: "Protege a cada pasajero. Protégete a ti.", body: "Cobertura multi-canal — frente, cabina y retaguardia — el estándar para conductores VTC y de reparto.", bullets: ["La grabación de cabina disuade y documenta disputas", "Los LED IR funcionan en interior totalmente oscuro", "Los comandos por voz mantienen tus manos al volante"], image: IMG_RIDESHARE },
    { id: "parking", iconName: "ShieldCheck", label: "Aparcamiento", title: "Ojos sobre tu coche aunque no estés.", body: "El modo aparcamiento con búfer graba los segundos antes y después de cualquier movimiento o impacto. Con el kit de alimentación directa, la cámara trabaja 24 horas con protección de batería integrada.", bullets: ["Movimiento + impacto bloquean el clip automáticamente", "Time-lapse funciona hasta 24 horas continuas", "Corte de baja tensión protege la batería"], image: IMG_PARKING },
  ],
  it: [
    { id: "family", iconName: "Users", label: "Famiglia", title: "Ricordi da conservare. Prove quando contano.", body: "Dal primo svincolo fuori casa all'ultimo miglio del ritorno, la dash cam cattura i momenti che vorrai rivedere — e quelli per cui preferiresti avere prove.", bullets: ["4K Ultra HD cattura segnali e targhe", "Grandangolo 150° copre entrambi i lati", "Il timelapse condensa viaggi lunghi in clip condivisibili"], image: IMG_FAMILY },
    { id: "rideshare", iconName: "Car", label: "NCC", title: "Proteggi ogni passeggero. Proteggi te stesso.", body: "Copertura multi-canale — strada, abitacolo e posteriore in simultanea — lo standard per autisti NCC e di consegna.", bullets: ["Registrazione abitacolo deterrente e documentale", "I LED IR funzionano anche in abitacolo totalmente buio", "Il comando vocale lascia le mani sul volante"], image: IMG_RIDESHARE },
    { id: "parking", iconName: "ShieldCheck", label: "Parcheggio", title: "Occhi sull'auto anche quando non ci sei.", body: "La modalità parcheggio con buffer registra i secondi prima e dopo qualsiasi movimento o impatto. Con il kit di alimentazione fissa, la telecamera funziona 24 ore con protezione della batteria integrata.", bullets: ["Movimento + impatto bloccano il clip automaticamente", "Il timelapse funziona fino a 24 ore continue", "Il cutoff a bassa tensione protegge la batteria"], image: IMG_PARKING },
  ],
  ru: [
    { id: "family", iconName: "Users", label: "Семья", title: "Воспоминания, которые хочется хранить. Доказательства, когда они нужны.", body: "От первого поворота со двора до последней мили перед домом — видеорегистратор фиксирует моменты, которые захочется пересмотреть, и те, для которых лучше иметь доказательства.", bullets: ["4K Ultra HD читает знаки и номера", "Угол 150° захватывает обе обочины", "Таймлапс превращает длинные поездки в клипы для соцсетей"], image: IMG_FAMILY },
    { id: "rideshare", iconName: "Car", label: "Такси", title: "Защитите пассажиров. Защитите себя.", body: "Многоканальная съёмка — дорога, салон и зад — золотой стандарт для такси и доставщиков.", bullets: ["Запись салона предотвращает и документирует споры", "ИК-светодиоды работают в полностью тёмном салоне ночью", "Голосовые команды оставляют руки на руле"], image: IMG_RIDESHARE },
    { id: "parking", iconName: "ShieldCheck", label: "Парковка", title: "Глаза на машине, даже когда вас нет.", body: "Буферизованный парковочный режим записывает секунды до и после любого движения или удара. С hardwire-комплектом камера работает 24 часа в сутки и защищает аккумулятор.", bullets: ["Движение + удар автоматически блокируют клип", "Таймлапс работает до 24 часов непрерывно", "Отключение по низкому напряжению защищает АКБ"], image: IMG_PARKING },
  ],
  pl: [
    { id: "family", iconName: "Users", label: "Rodzina", title: "Wspomnienia warte zachowania. Dowody, gdy się liczą.", body: "Od pierwszego skrętu z podjazdu po ostatnią milę do domu — kamera rejestruje chwile, do których chcesz wrócić, i te, dla których wolisz mieć dowody.", bullets: ["4K Ultra HD czyta znaki i tablice rejestracyjne", "150° kąta widzenia obejmuje oba pasy", "Tryb timelapse zmienia długie trasy w krótkie klipy"], image: IMG_FAMILY },
    { id: "rideshare", iconName: "Car", label: "Przewozy", title: "Chroń pasażerów. Chroń siebie.", body: "Wielokanałowe nagrywanie — przód, kabina i tył równocześnie — standard kierowców przewozów i kurierów.", bullets: ["Nagrywanie kabiny zniechęca i dokumentuje spory", "Diody IR działają w całkowicie ciemnej kabinie nocą", "Komendy głosowe trzymają ręce na kierownicy"], image: IMG_RIDESHARE },
    { id: "parking", iconName: "ShieldCheck", label: "Parkowanie", title: "Oko na auto, nawet gdy cię nie ma.", body: "Buforowany tryb parkowania rejestruje sekundy przed i po każdym ruchu lub uderzeniu. Z zestawem hardwire kamera pracuje 24 h z wbudowaną ochroną akumulatora.", bullets: ["Ruch + uderzenie blokują klip automatycznie", "Timelapse działa do 24 godzin bez przerwy", "Odcięcie niskiego napięcia chroni akumulator"], image: IMG_PARKING },
  ],
  ro: [
    { id: "family", iconName: "Users", label: "Familie", title: "Amintiri de păstrat. Dovezi când contează.", body: "De la primul viraj la ieșirea din curte până la ultima milă acasă — camera ta surprinde momentele pe care vrei să le revezi și pe cele pentru care preferi să ai dovezi.", bullets: ["4K Ultra HD captează indicatoare și plăcuțe", "Unghi de 150° acoperă ambele părți", "Modul timelapse condensează drumurile lungi în clipuri scurte"], image: IMG_FAMILY },
    { id: "rideshare", iconName: "Car", label: "Ride-share", title: "Protejează fiecare pasager. Protejează-te.", body: "Acoperire multi-canal — față, habitaclu și spate simultan — standardul pentru șoferii ride-share și de livrare.", bullets: ["Înregistrarea habitaclului descurajează și documentează disputele", "LED-urile IR funcționează în habitaclu complet întunecat", "Comanda vocală menține mâinile pe volan"], image: IMG_RIDESHARE },
    { id: "parking", iconName: "ShieldCheck", label: "Parcare", title: "Ochi asupra mașinii, chiar și când nu ești prezent.", body: "Modul parcare cu buffer înregistrează secundele dinainte și de după orice mișcare sau impact. Cu kit-ul de alimentare permanentă, camera funcționează 24h cu protecție a bateriei.", bullets: ["Mișcare + impact blochează automat clipul", "Timelapse rulează până la 24h continuu", "Întreruperea la tensiune scăzută protejează bateria"], image: IMG_PARKING },
  ],
  tr: [
    { id: "family", iconName: "Users", label: "Aile", title: "Saklamaya değer anılar. İhtiyaç anında kanıt.", body: "Park yolundan ilk dönüşten son metreye kadar — kameranız hem yeniden yaşamak isteyeceğiniz anları, hem kanıtının olmasını isteyeceğiniz anları kaydeder.", bullets: ["4K Ultra HD trafik işaretlerini ve plakaları kaydeder", "150° geniş açı her iki tarafı kapsar", "Time-lapse uzun yolculukları paylaşılabilir kliplere dönüştürür"], image: IMG_FAMILY },
    { id: "rideshare", iconName: "Car", label: "Yolcu taşıma", title: "Her yolcuyu koruyun. Kendinizi koruyun.", body: "Çoklu kanal — önden, kabinden, arkadan eşzamanlı — taksi ve kargo sürücülerinin standardı.", bullets: ["Kabin kaydı anlaşmazlıkları caydırır ve belgeler", "IR LED'ler gece zifiri karanlık kabinde çalışır", "Sesli komut, ellerinizi direksiyonda tutar"], image: IMG_RIDESHARE },
    { id: "parking", iconName: "ShieldCheck", label: "Park", title: "Yokken bile arabanıza göz kulak.", body: "Tamponlu park modu her hareket veya darbe öncesi ve sonrası saniyeleri kaydeder. Hardwire kit ile kamera 24 saat çalışır, akü koruması dahil.", bullets: ["Hareket + darbe klibi otomatik kilitler", "Time-lapse 24 saate kadar kesintisiz çalışır", "Düşük voltaj kesici aküyü korur"], image: IMG_PARKING },
  ],
  pt: [
    { id: "family", iconName: "Users", label: "Família", title: "Memórias que valem guardar. Provas quando importam.", body: "Da primeira curva ao sair de casa até a última milha de volta — sua câmera capta os momentos que você vai querer rever, e aqueles dos quais prefere ter provas.", bullets: ["4K Ultra HD captura placas e sinais", "Ângulo de 150° cobre os dois lados", "Time-lapse condensa viagens longas em clipes curtos"], image: IMG_FAMILY },
    { id: "rideshare", iconName: "Car", label: "App de motorista", title: "Proteja cada passageiro. Proteja-se.", body: "Cobertura multi-canal — frente, cabine e traseira — padrão para motoristas de app e entregadores.", bullets: ["Gravação da cabine inibe e documenta disputas", "LEDs IR funcionam em cabine totalmente escura", "Comando por voz mantém as mãos no volante"], image: IMG_RIDESHARE },
    { id: "parking", iconName: "ShieldCheck", label: "Estacionamento", title: "Olhos no carro mesmo na sua ausência.", body: "O modo estacionamento com buffer grava segundos antes e depois de qualquer movimento ou impacto. Com o kit de alimentação direta, a câmera trabalha 24 horas com proteção de bateria.", bullets: ["Movimento + impacto bloqueiam o clipe automaticamente", "Time-lapse roda até 24h contínuas", "Corte de baixa tensão protege a bateria"], image: IMG_PARKING },
  ],
  ar: [
    { id: "family", iconName: "Users", label: "العائلة", title: "ذكريات تستحق الحفظ. أدلة عند الحاجة.", body: "من أول منعطف خارج المنزل إلى آخر ميل عند العودة — تلتقط الكاميرا اللحظات التي تود إعادة عيشها والتي تفضّل أن يكون لديك دليل عليها.", bullets: ["4K Ultra HD يلتقط اللوحات وإشارات المرور", "زاوية 150° تغطي الجانبين", "نمط الفاصل الزمني يحوّل الرحلات الطويلة إلى مقاطع قابلة للمشاركة"], image: IMG_FAMILY },
    { id: "rideshare", iconName: "Car", label: "نقل الركاب", title: "احمِ كل راكب. احمِ نفسك.", body: "تغطية متعددة القنوات — الأمام والمقصورة والخلف في وقت واحد — المعيار لسائقي خدمات النقل والتوصيل.", bullets: ["تسجيل المقصورة يردع النزاعات ويوثقها", "مصابيح IR تعمل في المقصورة المظلمة تمامًا", "الأوامر الصوتية تُبقي يديك على المقود"], image: IMG_RIDESHARE },
    { id: "parking", iconName: "ShieldCheck", label: "وقوف السيارة", title: "عينان على سيارتك حتى عند غيابك.", body: "وضع الوقوف بالتخزين المؤقت يسجّل الثواني التي تسبق وتلي أي حركة أو اصطدام. مع عُدّة التوصيل المباشر، تعمل الكاميرا 24 ساعة مع حماية البطارية.", bullets: ["الحركة + الاصطدام يقفلان المقطع تلقائيًا", "نمط الفاصل الزمني يعمل حتى 24 ساعة متواصلة", "قطع الجهد المنخفض يحمي بطارية السيارة"], image: IMG_PARKING },
  ],
  th: [
    { id: "family", iconName: "Users", label: "ครอบครัว", title: "ความทรงจำที่ควรเก็บ หลักฐานเมื่อจำเป็น", body: "ตั้งแต่โค้งแรกออกจากบ้านถึงไมล์สุดท้ายขากลับ กล้องของคุณบันทึกช่วงเวลาที่อยากดูซ้ำ และช่วงเวลาที่อยากมีหลักฐานเอาไว้", bullets: ["4K Ultra HD บันทึกป้ายและทะเบียนได้คมชัด", "มุมกว้าง 150° ครอบคลุมสองฝั่ง", "โหมด Time-lapse บีบทริปยาวให้เป็นคลิปที่แชร์ได้"], image: IMG_FAMILY },
    { id: "rideshare", iconName: "Car", label: "ขับรับ-ส่ง", title: "ปกป้องผู้โดยสารทุกคน ปกป้องตัวเอง", body: "ระบบหลายช่อง — ด้านหน้า ห้องโดยสาร และด้านหลัง พร้อมกัน — มาตรฐานของคนขับ Rideshare และส่งของ", bullets: ["บันทึกห้องโดยสารช่วยลดและบันทึกข้อพิพาท", "ไฟ IR ทำงานในห้องโดยสารมืดสนิทตอนกลางคืน", "คำสั่งเสียงให้คุณจับพวงมาลัยตลอด"], image: IMG_RIDESHARE },
    { id: "parking", iconName: "ShieldCheck", label: "จอดรถ", title: "ดูแลรถแม้ตอนคุณไม่อยู่", body: "โหมดจอดแบบบัฟเฟอร์บันทึกวินาทีก่อนและหลังการเคลื่อนไหวหรือกระแทก เมื่อต่อชุดสายตรง กล้องทำงาน 24 ชั่วโมง พร้อมระบบป้องกันแบตเตอรี่", bullets: ["การเคลื่อนไหว + การกระแทกล็อกคลิปอัตโนมัติ", "Time-lapse ทำงานต่อเนื่องได้ถึง 24 ชม.", "ตัดไฟเมื่อแรงดันต่ำ ปกป้องแบตเตอรี่"], image: IMG_PARKING },
  ],
  vi: [
    { id: "family", iconName: "Users", label: "Gia đình", title: "Ký ức đáng giữ. Bằng chứng khi cần.", body: "Từ khúc cua đầu tiên rời nhà đến dặm cuối về nhà — camera của bạn ghi lại những khoảnh khắc muốn xem lại và những khoảnh khắc cần bằng chứng.", bullets: ["4K Ultra HD ghi biển báo và biển số", "Góc rộng 150° phủ hai bên", "Chế độ time-lapse rút ngắn chuyến dài thành clip dễ chia sẻ"], image: IMG_FAMILY },
    { id: "rideshare", iconName: "Car", label: "Xe công nghệ", title: "Bảo vệ mọi hành khách. Bảo vệ chính bạn.", body: "Đa kênh — đường phía trước, khoang nội thất và phía sau cùng lúc — chuẩn vàng cho tài xế xe công nghệ và giao hàng.", bullets: ["Ghi khoang xe vừa ngăn vừa tài liệu hóa tranh chấp", "Đèn IR hoạt động trong khoang tối hoàn toàn vào ban đêm", "Lệnh thoại giúp giữ hai tay trên vô-lăng"], image: IMG_RIDESHARE },
    { id: "parking", iconName: "ShieldCheck", label: "Đậu xe", title: "Mắt vẫn dõi theo xe ngay cả khi bạn vắng mặt.", body: "Chế độ đậu xe có bộ đệm ghi giây trước và sau bất kỳ chuyển động hay va chạm nào. Thêm bộ đấu nối điện trực tiếp, camera hoạt động 24h, có bảo vệ ắc-quy.", bullets: ["Chuyển động + va chạm khóa clip tự động", "Time-lapse chạy liên tục đến 24h", "Ngắt khi điện áp thấp bảo vệ ắc-quy"], image: IMG_PARKING },
  ],
};

export function getDefaultUseCaseTabs(locale: Locale): UseCaseTab[] {
  return USE_CASE_TABS_BY_LOCALE[locale] ?? USE_CASE_TABS_BY_LOCALE.en!;
}

export const DEFAULT_USE_CASE_TABS: UseCaseTab[] = USE_CASE_TABS_BY_LOCALE.en!;
