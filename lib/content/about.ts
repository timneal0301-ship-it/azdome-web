import type { ContentSection } from "./types";
import type { Locale } from "@/lib/i18n/dictionaries";

// Icons are stored by string name so the section's defaults are fully
// JSON-serializable and can cross the RSC boundary into the admin
// editor. Consumers (server pages) hold the actual lucide function
// refs in their own ICONS lookup map.

export const ABOUT_VALUE_ICONS = ["Eye", "Sparkles", "Users", "Globe2"] as const;
export const ABOUT_COMMITMENT_ICONS = ["ShieldCheck", "Microscope", "Truck", "Leaf"] as const;

export type AboutStat = {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  separator?: boolean;
  label: string;
};
export type AboutValue = { iconName: string; title: string; body: string };
export type AboutTimelineEntry = { year: string; title: string; body: string };
export type AboutCommitment = { iconName: string; title: string; body: string };

export type AboutContent = {
  stats: AboutStat[];
  values: AboutValue[];
  timeline: AboutTimelineEntry[];
  commitments: AboutCommitment[];
};

// ── EN canonical (also feeds admin editor) ─────────────────────────
const EN: AboutContent = {
  stats: [
    { to: 200, suffix: "K+", label: "Drivers protected", separator: true },
    { to: 60, suffix: "+", label: "Countries shipped" },
    { to: 4.8, decimals: 1, label: "Average rating" },
    { to: 2014, label: "Founded" },
  ],
  values: [
    { iconName: "Eye", title: "Clarity above all", body: "Every component — image sensor, lens, codec, capacitor — is selected with one question first: will footage hold up at 2 a.m. on a four-lane highway, or in court three months later? We build to that test, not to the spec sheet." },
    { iconName: "Sparkles", title: "Quiet engineering", body: "We obsess over the details you won't see: cable routing, thermal behavior at 65 °C, capacitor longevity past 50,000 power cycles, firmware that recovers cleanly from a 3-microsecond power blip. The result is a camera that just keeps recording." },
    { iconName: "Users", title: "Built with drivers", body: "Our beta program runs with rideshare drivers, fleet managers, parents on long road trips, and a handful of professional racers. Every product ships only after they've put it through what we can't simulate." },
    { iconName: "Globe2", title: "Long-term ownership", body: "We commit to at least five years of free firmware updates on every product we sell. We publish release notes, source our SD cards from manufacturers we've audited, and back our work with a 2-year warranty plus optional accidental-damage cover." },
  ],
  timeline: [
    { year: "2014", title: "AZDOME founded in Shenzhen", body: "Our co-founders, both image-sensor engineers, started AZDOME after a frustrating insurance dispute revealed how few cameras of the era held up to scrutiny." },
    { year: "2017", title: "First million-unit milestone", body: "The original M01 reaches one million units shipped. We invest the margin into a dedicated optics lab." },
    { year: "2020", title: "5GHz Wi-Fi platform launch", body: "We become one of the first dash-cam manufacturers to ship dual-band Wi-Fi as standard, eliminating the 'pull-the-SD-card' workflow." },
    { year: "2022", title: "AZDOME Care program", body: "We extend warranty options and pledge a 5-year firmware update commitment in writing." },
    { year: "2024", title: "California HQ opens", body: "We open a Bay Area office to bring product and software work closer to our largest customer base, while keeping hardware in Shenzhen." },
    { year: "2026", title: "M550 Pro flagship", body: "Our most advanced platform yet. Sony Starvis 2 sensor, on-device ADAS, and the smallest 4K dual-channel body we've ever made." },
  ],
  commitments: [
    { iconName: "ShieldCheck", title: "Privacy on-device", body: "We never automatically upload footage. The camera and SD card are yours; what they record stays with you." },
    { iconName: "Microscope", title: "Independent testing", body: "Every product is tested by TÜV Rheinland for EMC and an independent low-light lab for sensor performance before launch." },
    { iconName: "Truck", title: "Responsible shipping", body: "Carbon-neutral shipping on every US order. Reduced-volume packaging cut shipping CO₂ per unit by 38% in 2025." },
    { iconName: "Leaf", title: "Repair over replace", body: "Out-of-warranty repair is offered for every model. We restock and resell certified-refurbished units at a discount instead of recycling them." },
  ],
};

const ABOUT_BY_LOCALE: Partial<Record<Locale, AboutContent>> = {
  en: EN,
  zh: {
    stats: [
      { to: 200, suffix: "K+", label: "守护的车主", separator: true },
      { to: 60, suffix: "+", label: "覆盖国家" },
      { to: 4.8, decimals: 1, label: "平均评分" },
      { to: 2014, label: "成立年份" },
    ],
    values: [
      { iconName: "Eye", title: "清晰至上", body: "每一个元件 — 图像传感器、镜头、编解码、电容 — 选型时只问一个问题:凌晨 2 点四车道高速上,或三个月后的庭审上,这段画面能不能用?我们按这个标准造,不按参数表造。" },
      { iconName: "Sparkles", title: "静默工程", body: "我们对你看不到的细节反复打磨:走线、65℃ 下的散热表现、超过 5 万次循环后的电容寿命、电压 3 微秒跌落后固件能干净恢复。结果是一台始终在录像的摄像头。" },
      { iconName: "Users", title: "与车主共建", body: "我们的 Beta 计划由网约车司机、车队经理、长途自驾家长,以及少数职业赛车手参与。每个产品都要经过他们的极端测试才发货 — 那是我们无法模拟的场景。" },
      { iconName: "Globe2", title: "长期负责", body: "我们承诺每个产品至少提供 5 年免费固件更新。发布说明公开,SD 卡来自我们审计过的厂商,产品配 2 年保修 + 可选意外损坏延保。" },
    ],
    timeline: [
      { year: "2014", title: "AZDOME 在深圳成立", body: "两位图像传感器工程师联合创立。起因:一次令人沮丧的保险纠纷暴露出当时市面摄像头很少经得起认真检视。" },
      { year: "2017", title: "首个百万台里程碑", body: "初代 M01 累计出货 100 万台。我们把利润再投入,建立专属光学实验室。" },
      { year: "2020", title: "5GHz Wi-Fi 平台上线", body: "我们成为首批将双频 Wi-Fi 列为标配的行车记录仪厂商,告别「拔卡读视频」的工作流。" },
      { year: "2022", title: "AZDOME Care 计划", body: "我们扩展保修选项,并书面承诺 5 年固件更新。" },
      { year: "2024", title: "加州总部开张", body: "我们在湾区设立办公室,让产品和软件团队更靠近最大客户群,硬件依然在深圳。" },
      { year: "2026", title: "M550 Pro 旗舰", body: "迄今最先进的平台。Sony Starvis 2 传感器、设备端 ADAS,以及我们做过最小的 4K 双录机身。" },
    ],
    commitments: [
      { iconName: "ShieldCheck", title: "隐私在本地", body: "我们从不自动上传录像。摄像头和 SD 卡是你的,录到的画面也只属于你。" },
      { iconName: "Microscope", title: "独立检测", body: "每个产品发布前都经过 TÜV 莱茵 EMC 测试,以及独立低光实验室的传感器性能评估。" },
      { iconName: "Truck", title: "负责任的运输", body: "美国订单 100% 碳中和运输。2025 年精简体积的包装让每件商品的运输 CO₂ 减少 38%。" },
      { iconName: "Leaf", title: "修复优先于替换", body: "每个型号都提供过保修复服务。我们对官翻品折扣再上架,而不是回收销毁。" },
    ],
  },
  ja: {
    stats: [
      { to: 200, suffix: "K+", label: "守ったドライバー", separator: true },
      { to: 60, suffix: "+", label: "出荷国数" },
      { to: 4.8, decimals: 1, label: "平均評価" },
      { to: 2014, label: "創業" },
    ],
    values: [
      { iconName: "Eye", title: "鮮明さがすべて", body: "イメージセンサー、レンズ、コーデック、キャパシタ — すべての部品はひとつの問いで選びます:深夜 2 時の片側 4 車線、または 3 ヶ月後の法廷で、その映像は耐えうるか? スペック表ではなく、この基準で設計します。" },
      { iconName: "Sparkles", title: "静かな技術", body: "ケーブル取り回し、65 ℃ での発熱挙動、5 万回サイクル後のキャパシタ寿命、3 μs の電圧低下から綺麗に復帰するファームウェア — 見えない細部に徹底的にこだわります。結果は、ずっと録画し続けるカメラ。" },
      { iconName: "Users", title: "ドライバーと共に作る", body: "ベータ参加者は配車・配達ドライバー、フリート管理者、長距離家族ドライバー、数名のプロレーサー。私たちにはシミュレートできない実走条件を抜けてから出荷します。" },
      { iconName: "Globe2", title: "長期所有", body: "全製品に最低 5 年のファームウェア無償更新を約束。リリースノートは公開、SD カードは監査済みメーカー製、製品は 2 年保証+オプションの偶発損害補償付き。" },
    ],
    timeline: [
      { year: "2014", title: "深圳で AZDOME 創業", body: "保険トラブルで当時のカメラが検証に耐えないことを痛感した、イメージセンサーエンジニアの共同創業者によって創業。" },
      { year: "2017", title: "累計 100 万台", body: "初代 M01 が 100 万台出荷を達成。利益を専用光学ラボに再投資。" },
      { year: "2020", title: "5GHz Wi-Fi プラットフォーム", body: "デュアルバンド Wi-Fi を標準搭載した最初期のメーカーに。「SD カードを抜く」習慣を不要に。" },
      { year: "2022", title: "AZDOME Care プログラム", body: "保証オプションを拡張し、5 年間のファームウェア更新を書面で約束。" },
      { year: "2024", title: "カリフォルニア本社", body: "最大顧客に近づくため、ベイエリアにオフィスを開設。ハードウェアは引き続き深圳。" },
      { year: "2026", title: "M550 Pro フラッグシップ", body: "最も進化したプラットフォーム。Sony Starvis 2 センサー、オンデバイス ADAS、当社史上最小の 4K 2ch 筐体。" },
    ],
    commitments: [
      { iconName: "ShieldCheck", title: "プライバシーは端末で", body: "映像を自動アップロードしません。カメラと SD カードはあなたのもの。記録もあなたのものです。" },
      { iconName: "Microscope", title: "独立した試験", body: "発売前にすべての製品が TÜV ラインランドの EMC 試験と、独立した低照度ラボのセンサー性能評価を受けます。" },
      { iconName: "Truck", title: "責任ある配送", body: "米国注文すべてカーボンニュートラル配送。2025 年、容量削減パッケージで 1 個当たりの輸送 CO₂ を 38 %削減。" },
      { iconName: "Leaf", title: "廃棄より修理", body: "全モデルに保証外修理を提供。リサイクル前に整備認定品として再販売します。" },
    ],
  },
  de: {
    stats: [
      { to: 200, suffix: "K+", label: "Geschützte Fahrer", separator: true },
      { to: 60, suffix: "+", label: "Versandländer" },
      { to: 4.8, decimals: 1, label: "Durchschnittsbewertung" },
      { to: 2014, label: "Gegründet" },
    ],
    values: [
      { iconName: "Eye", title: "Klarheit über allem", body: "Jede Komponente — Bildsensor, Objektiv, Codec, Kondensator — wird mit einer Frage zuerst ausgewählt: Hält die Aufnahme nachts um 2 auf vier Spuren oder drei Monate später vor Gericht stand? Wir bauen für diesen Test, nicht für das Datenblatt." },
      { iconName: "Sparkles", title: "Stille Ingenieurskunst", body: "Wir achten obsessiv auf das Verborgene: Kabelverlegung, Thermik bei 65 °C, Kondensatorlebensdauer über 50.000 Zyklen, Firmware, die sich von 3 µs Spannungsabfall sauber erholt. Ergebnis: eine Kamera, die einfach weiter aufnimmt." },
      { iconName: "Users", title: "Mit Fahrern gebaut", body: "Unser Beta-Programm läuft mit Rideshare-Fahrern, Flottenleitern, Familien auf Langstrecke und einigen Profi-Rennfahrern. Jedes Produkt wird erst nach ihrem Praxistest ausgeliefert." },
      { iconName: "Globe2", title: "Langfristige Verantwortung", body: "Mindestens fünf Jahre kostenlose Firmware-Updates für jedes verkaufte Produkt. Wir veröffentlichen Release Notes, beziehen SD-Karten nur von auditierten Herstellern und bieten 2 Jahre Garantie + optionalen Unfallschutz." },
    ],
    timeline: [
      { year: "2014", title: "Gründung in Shenzhen", body: "Unsere Mitgründer — beide Bildsensor-Ingenieure — gründeten AZDOME, nachdem ein frustrierender Versicherungsstreit zeigte, wie wenige Kameras der Zeit der Prüfung standhielten." },
      { year: "2017", title: "Erste Million Einheiten", body: "Der ursprüngliche M01 erreicht eine Million ausgelieferter Einheiten. Wir investieren die Marge in ein eigenes Optik-Labor." },
      { year: "2020", title: "5-GHz-WLAN-Plattform", body: "Wir gehören zu den ersten Dashcam-Herstellern, die Dual-Band-WLAN als Standard liefern und das „SD-Karte rausziehen“-Ritual beenden." },
      { year: "2022", title: "AZDOME Care", body: "Wir erweitern Garantieoptionen und garantieren schriftlich 5 Jahre Firmware-Updates." },
      { year: "2024", title: "Kalifornien-Hauptsitz", body: "Wir eröffnen ein Bay-Area-Büro, um Produkt- und Software-Arbeit näher an unsere größte Kundenbasis zu bringen — Hardware bleibt in Shenzhen." },
      { year: "2026", title: "M550 Pro Flaggschiff", body: "Unsere bisher fortschrittlichste Plattform. Sony-Starvis-2-Sensor, On-Device-ADAS und das kleinste 4K-Dualkanal-Gehäuse, das wir je gebaut haben." },
    ],
    commitments: [
      { iconName: "ShieldCheck", title: "Datenschutz auf dem Gerät", body: "Wir laden niemals automatisch Aufnahmen hoch. Kamera und SD-Karte gehören Ihnen; was darauf aufgezeichnet wird, bleibt bei Ihnen." },
      { iconName: "Microscope", title: "Unabhängige Tests", body: "Jedes Produkt wird vor Markteinführung von TÜV Rheinland (EMV) und einem unabhängigen Nachtsicht-Labor geprüft." },
      { iconName: "Truck", title: "Verantwortungsbewusster Versand", body: "Klimaneutraler Versand für jede US-Bestellung. Volumenreduzierte Verpackung senkte die Versand-CO₂ pro Einheit 2025 um 38 %." },
      { iconName: "Leaf", title: "Reparieren statt Ersetzen", body: "Für jedes Modell gibt es Out-of-Warranty-Reparaturen. Wir bereiten zertifiziert-überholte Geräte zum Rabatt wieder auf, statt sie zu recyceln." },
    ],
  },
  fr: {
    stats: [
      { to: 200, suffix: "K+", label: "Conducteurs protégés", separator: true },
      { to: 60, suffix: "+", label: "Pays livrés" },
      { to: 4.8, decimals: 1, label: "Note moyenne" },
      { to: 2014, label: "Fondée" },
    ],
    values: [
      { iconName: "Eye", title: "La clarté avant tout", body: "Chaque composant — capteur, objectif, codec, condensateur — est choisi en se posant d'abord une question : la vidéo tient-elle à 2 h sur une autoroute à quatre voies, ou trois mois plus tard devant un juge ? Nous construisons pour ce test, pas pour la fiche technique." },
      { iconName: "Sparkles", title: "Ingénierie discrète", body: "Nous nous obstinons sur les détails invisibles : passage des câbles, comportement thermique à 65 °C, longévité des condensateurs au-delà de 50 000 cycles, firmware qui récupère proprement d'une coupure de 3 µs. Résultat : une caméra qui continue d'enregistrer." },
      { iconName: "Users", title: "Conçue avec les conducteurs", body: "Notre programme bêta inclut des chauffeurs VTC, des gestionnaires de flottes, des familles en road trip et quelques pilotes professionnels. Chaque produit n'est expédié qu'après leur test." },
      { iconName: "Globe2", title: "Engagement long terme", body: "Au moins cinq ans de mises à jour firmware gratuites sur chaque produit vendu. Notes de version publiques, cartes SD issues de fabricants audités, garantie 2 ans + couverture accidentelle en option." },
    ],
    timeline: [
      { year: "2014", title: "AZDOME fondée à Shenzhen", body: "Nos cofondateurs, deux ingénieurs en capteurs d'image, ont lancé AZDOME après qu'un litige d'assurance frustrant ait révélé combien peu de caméras de l'époque tenaient l'examen." },
      { year: "2017", title: "Premier million d'unités", body: "Le M01 originel atteint un million d'unités. Nous investissons la marge dans un laboratoire optique dédié." },
      { year: "2020", title: "Plateforme Wi-Fi 5 GHz", body: "Nous devenons l'un des premiers fabricants à livrer le Wi-Fi double bande en standard, supprimant le rituel « sortir la carte SD »." },
      { year: "2022", title: "Programme AZDOME Care", body: "Nous étendons les options de garantie et nous engageons par écrit sur 5 ans de mises à jour firmware." },
      { year: "2024", title: "Ouverture du siège Californie", body: "Nous ouvrons un bureau Bay Area pour rapprocher produit et logiciel de notre plus grosse base clients — le matériel reste à Shenzhen." },
      { year: "2026", title: "M550 Pro phare", body: "Notre plateforme la plus avancée. Capteur Sony Starvis 2, ADAS embarqué, et le plus petit boîtier 4K double-canal que nous ayons jamais conçu." },
    ],
    commitments: [
      { iconName: "ShieldCheck", title: "Vie privée sur l'appareil", body: "Aucun envoi automatique de vidéos. La caméra et la carte SD sont à vous ; ce qu'elles enregistrent reste avec vous." },
      { iconName: "Microscope", title: "Tests indépendants", body: "Avant lancement, chaque produit est testé par TÜV Rheinland (CEM) et un laboratoire indépendant pour les performances en basse lumière." },
      { iconName: "Truck", title: "Expédition responsable", body: "Expédition neutre en carbone sur chaque commande US. En 2025, l'emballage à volume réduit a fait baisser de 38 % le CO₂ d'expédition par unité." },
      { iconName: "Leaf", title: "Réparer plutôt que remplacer", body: "Réparations hors garantie disponibles pour tous les modèles. Les unités reconditionnées certifiées sont revendues à prix réduit plutôt que recyclées." },
    ],
  },
  es: {
    stats: [
      { to: 200, suffix: "K+", label: "Conductores protegidos", separator: true },
      { to: 60, suffix: "+", label: "Países servidos" },
      { to: 4.8, decimals: 1, label: "Valoración media" },
      { to: 2014, label: "Fundada en" },
    ],
    values: [
      { iconName: "Eye", title: "Claridad ante todo", body: "Cada componente — sensor de imagen, óptica, códec, condensador — se elige preguntándose primero: ¿se sostiene la imagen a las 2 de la mañana en una autopista de cuatro carriles, o tres meses después ante un tribunal? Construimos para esa prueba, no para la ficha técnica." },
      { iconName: "Sparkles", title: "Ingeniería silenciosa", body: "Nos obsesionamos con lo invisible: rutado del cable, comportamiento térmico a 65 °C, vida del condensador más allá de 50.000 ciclos, firmware que se recupera limpio de un corte de 3 µs. Resultado: una cámara que sigue grabando." },
      { iconName: "Users", title: "Diseñada con conductores", body: "Nuestro programa beta corre con conductores VTC, gestores de flotas, padres en viajes largos y unos cuantos pilotos profesionales. Cada producto se envía solo tras pasar lo que no podemos simular." },
      { iconName: "Globe2", title: "Propiedad a largo plazo", body: "Mínimo cinco años de actualizaciones de firmware gratuitas en cada producto. Publicamos notas de versión, las tarjetas SD vienen de fabricantes auditados, y respaldamos con 2 años de garantía + cobertura accidental opcional." },
    ],
    timeline: [
      { year: "2014", title: "AZDOME se funda en Shenzhen", body: "Nuestros cofundadores, dos ingenieros de sensores de imagen, fundaron AZDOME tras un litigio frustrante con la aseguradora que reveló cuántas pocas cámaras de la época aguantaban un escrutinio real." },
      { year: "2017", title: "Primer millón de unidades", body: "El M01 original alcanza el millón de unidades. Reinvertimos el margen en un laboratorio óptico dedicado." },
      { year: "2020", title: "Plataforma Wi-Fi 5 GHz", body: "Somos de los primeros fabricantes de dashcam con Wi-Fi de doble banda de serie, eliminando el flujo de «sacar la SD»." },
      { year: "2022", title: "Programa AZDOME Care", body: "Ampliamos opciones de garantía y comprometemos por escrito 5 años de actualizaciones de firmware." },
      { year: "2024", title: "Abre la sede de California", body: "Abrimos oficina en Bay Area para acercar producto y software a nuestra mayor base de clientes; el hardware permanece en Shenzhen." },
      { year: "2026", title: "M550 Pro flagship", body: "Nuestra plataforma más avanzada. Sensor Sony Starvis 2, ADAS en el dispositivo y el cuerpo 4K dual más compacto que hemos hecho." },
    ],
    commitments: [
      { iconName: "ShieldCheck", title: "Privacidad en el dispositivo", body: "Nunca subimos automáticamente las grabaciones. La cámara y la tarjeta son tuyas; lo que graban se queda contigo." },
      { iconName: "Microscope", title: "Tests independientes", body: "Antes de lanzar, cada producto pasa por TÜV Rheinland para EMC y por un laboratorio independiente de baja luz." },
      { iconName: "Truck", title: "Envío responsable", body: "Envío neutro en carbono en cada pedido US. En 2025 el embalaje reducido recortó un 38 % el CO₂ por unidad enviada." },
      { iconName: "Leaf", title: "Reparar antes que reemplazar", body: "Reparación fuera de garantía para todos los modelos. Las unidades reacondicionadas certificadas se revenden con descuento en lugar de reciclarse." },
    ],
  },
  it: {
    stats: [
      { to: 200, suffix: "K+", label: "Conducenti protetti", separator: true },
      { to: 60, suffix: "+", label: "Paesi serviti" },
      { to: 4.8, decimals: 1, label: "Valutazione media" },
      { to: 2014, label: "Fondata" },
    ],
    values: [
      { iconName: "Eye", title: "Chiarezza prima di tutto", body: "Ogni componente — sensore, ottica, codec, condensatore — viene scelto con una domanda: il filmato regge alle 2 di notte su un'autostrada a quattro corsie o tre mesi dopo in tribunale? Costruiamo per quel test, non per la scheda tecnica." },
      { iconName: "Sparkles", title: "Ingegneria silenziosa", body: "Ci ossessioniamo sui dettagli invisibili: passaggio del cavo, comportamento termico a 65 °C, durata dei condensatori oltre 50.000 cicli, firmware che si riprende pulito da un calo di 3 µs. Risultato: una telecamera che continua a registrare." },
      { iconName: "Users", title: "Costruita coi conducenti", body: "Il nostro programma beta coinvolge autisti ride-share, fleet manager, famiglie in viaggio lungo e qualche pilota professionista. Ogni prodotto parte solo dopo aver superato ciò che non riusciamo a simulare." },
      { iconName: "Globe2", title: "Proprietà a lungo termine", body: "Almeno cinque anni di aggiornamenti firmware gratuiti su ogni prodotto. Pubblichiamo le release note, le SD vengono da produttori auditi, e supportiamo con 2 anni di garanzia + copertura danni accidentali opzionale." },
    ],
    timeline: [
      { year: "2014", title: "AZDOME nasce a Shenzhen", body: "I nostri cofondatori — entrambi ingegneri di sensori d'immagine — hanno fondato AZDOME dopo una disputa assicurativa frustrante che ha mostrato quanto poche telecamere dell'epoca reggessero un esame serio." },
      { year: "2017", title: "Primo milione di unità", body: "L'originale M01 raggiunge il milione di pezzi. Reinvestiamo il margine in un laboratorio ottico dedicato." },
      { year: "2020", title: "Piattaforma Wi-Fi 5 GHz", body: "Tra i primi produttori a fornire Wi-Fi dual-band di serie, eliminando l'abitudine di «togliere la scheda SD»." },
      { year: "2022", title: "Programma AZDOME Care", body: "Estendiamo le opzioni di garanzia e ci impegniamo per iscritto a 5 anni di aggiornamenti firmware." },
      { year: "2024", title: "HQ californiano", body: "Apriamo un ufficio nella Bay Area per portare prodotto e software vicino alla nostra base clienti più grande, mantenendo l'hardware a Shenzhen." },
      { year: "2026", title: "M550 Pro flagship", body: "La nostra piattaforma più avanzata. Sensore Sony Starvis 2, ADAS on-device e il corpo 4K dual-channel più compatto mai realizzato." },
    ],
    commitments: [
      { iconName: "ShieldCheck", title: "Privacy on-device", body: "Non carichiamo mai automaticamente i filmati. La telecamera e la SD sono tue; ciò che registrano resta con te." },
      { iconName: "Microscope", title: "Test indipendenti", body: "Prima del lancio, ogni prodotto è testato da TÜV Rheinland per EMC e da un laboratorio indipendente per le prestazioni in bassa luce." },
      { iconName: "Truck", title: "Spedizione responsabile", body: "Spedizione carbon-neutral su ogni ordine US. Nel 2025 il packaging a volume ridotto ha tagliato il CO₂ di spedizione per unità del 38%." },
      { iconName: "Leaf", title: "Riparare invece di sostituire", body: "Riparazione fuori garanzia per ogni modello. Le unità ricondizionate certificate vengono rivendute con sconto invece di essere riciclate." },
    ],
  },
  ru: {
    stats: [
      { to: 200, suffix: "K+", label: "Защищённые водители", separator: true },
      { to: 60, suffix: "+", label: "Страны поставок" },
      { to: 4.8, decimals: 1, label: "Средний рейтинг" },
      { to: 2014, label: "Год основания" },
    ],
    values: [
      { iconName: "Eye", title: "Чёткость — превыше всего", body: "Каждый компонент — сенсор, оптика, кодек, конденсатор — выбирается с одним вопросом: выдержит ли запись в 2 часа ночи на четырёхполосной трассе или через три месяца в суде? Мы строим под этот тест, а не под параметры." },
      { iconName: "Sparkles", title: "Тихая инженерия", body: "Мы маниакально следим за невидимым: укладка кабеля, тепло при 65 °C, срок жизни конденсаторов за 50 000 циклов, прошивка, чистая после провала питания на 3 мкс. Результат — камера, которая просто продолжает писать." },
      { iconName: "Users", title: "Создано вместе с водителями", body: "В нашей бете — таксисты, менеджеры автопарков, семьи в дальних поездках и несколько профессиональных гонщиков. Каждый продукт выходит только после их полевого теста." },
      { iconName: "Globe2", title: "Долгосрочная ответственность", body: "Минимум пять лет бесплатных обновлений прошивки для каждого продукта. Мы публикуем release notes, берём SD-карты у проверенных производителей и даём 2 года гарантии + опциональную защиту от случайных повреждений." },
    ],
    timeline: [
      { year: "2014", title: "Основана в Шэньчжэне", body: "Со-основатели, оба инженеры по сенсорам, создали AZDOME после изнурительного спора со страховой, который показал, как мало камер тех лет выдерживали проверку." },
      { year: "2017", title: "Первый миллион устройств", body: "Оригинальный M01 достигает миллиона отгрузок. Мы вкладываем маржу в отдельную лабораторию оптики." },
      { year: "2020", title: "Платформа 5 ГГц Wi-Fi", body: "Одни из первых производителей, поставляющих двухдиапазонный Wi-Fi штатно — конец сценария «вынуть SD-карту»." },
      { year: "2022", title: "AZDOME Care", body: "Расширяем гарантию и письменно обещаем 5 лет обновлений прошивки." },
      { year: "2024", title: "Штаб-квартира в Калифорнии", body: "Открываем офис в Bay Area, чтобы продуктовая и софтовая команды были ближе к крупнейшей клиентской базе; «железо» остаётся в Шэньчжэне." },
      { year: "2026", title: "Флагман M550 Pro", body: "Самая продвинутая платформа. Сенсор Sony Starvis 2, ADAS на устройстве и самый компактный 4K двухканальный корпус." },
    ],
    commitments: [
      { iconName: "ShieldCheck", title: "Приватность на устройстве", body: "Мы никогда не загружаем записи автоматически. Камера и SD-карта — ваши; то, что они пишут, остаётся у вас." },
      { iconName: "Microscope", title: "Независимое тестирование", body: "Перед запуском каждый продукт проходит TÜV Rheinland (ЭМС) и независимую лабораторию ночной чувствительности." },
      { iconName: "Truck", title: "Ответственная доставка", body: "Углеродно-нейтральная доставка по всем заказам в США. В 2025 уменьшенный объём упаковки снизил CO₂ доставки на единицу на 38 %." },
      { iconName: "Leaf", title: "Починить, а не заменить", body: "Послегарантийный ремонт доступен для всех моделей. Сертифицированно восстановленные устройства продаются со скидкой, а не утилизируются." },
    ],
  },
  pl: {
    stats: [
      { to: 200, suffix: "K+", label: "Chronieni kierowcy", separator: true },
      { to: 60, suffix: "+", label: "Krajów wysyłki" },
      { to: 4.8, decimals: 1, label: "Średnia ocena" },
      { to: 2014, label: "Założono" },
    ],
    values: [
      { iconName: "Eye", title: "Klarowność ponad wszystko", body: "Każdy element — matryca, obiektyw, kodek, kondensator — wybierany jest z jednym pytaniem: czy nagranie obroni się o 2 w nocy na czterech pasach albo trzy miesiące później w sądzie? Budujemy pod ten test, nie pod kartę katalogową." },
      { iconName: "Sparkles", title: "Cicha inżynieria", body: "Obsesyjnie zajmujemy się niewidocznym: prowadzeniem kabli, zachowaniem termicznym przy 65 °C, żywotnością kondensatora powyżej 50 000 cykli, firmware czysto wracającym po 3 µs spadku napięcia. Efekt: kamera, która po prostu nagrywa dalej." },
      { iconName: "Users", title: "Budowane z kierowcami", body: "Nasz program beta to kierowcy przewozów, menedżerowie flot, rodzice w długich trasach i kilku zawodowych kierowców wyścigowych. Każdy produkt wychodzi dopiero po ich teście." },
      { iconName: "Globe2", title: "Długoterminowa odpowiedzialność", body: "Minimum pięć lat darmowych aktualizacji firmware dla każdego produktu. Publikujemy release notes, karty SD pochodzą od audytowanych producentów, a wsparcie to 2-letnia gwarancja + opcjonalna ochrona przed uszkodzeniami." },
    ],
    timeline: [
      { year: "2014", title: "AZDOME powstaje w Shenzhen", body: "Założyciele — obaj inżynierowie matryc — założyli AZDOME po frustrującym sporze z ubezpieczycielem, który pokazał, jak mało kamer ówczesnych nie pęka pod weryfikacją." },
      { year: "2017", title: "Pierwszy milion sztuk", body: "Oryginalny M01 osiąga milion sztuk. Marża wraca do dedykowanego laboratorium optyki." },
      { year: "2020", title: "Platforma Wi-Fi 5 GHz", body: "Jako jedni z pierwszych producentów dashcam dostarczamy dwuzakresowe Wi-Fi w standardzie, kończąc rytuał „wyjmowania karty SD”." },
      { year: "2022", title: "Program AZDOME Care", body: "Rozszerzamy opcje gwarancji i pisemnie deklarujemy 5 lat aktualizacji firmware." },
      { year: "2024", title: "Siedziba w Kalifornii", body: "Otwieramy biuro w Bay Area, by produkt i oprogramowanie były bliżej największej bazy klientów; hardware zostaje w Shenzhen." },
      { year: "2026", title: "Flagowiec M550 Pro", body: "Nasza najbardziej zaawansowana platforma. Matryca Sony Starvis 2, on-device ADAS i najmniejsza obudowa 4K dwukanałowa, jaką zrobiliśmy." },
    ],
    commitments: [
      { iconName: "ShieldCheck", title: "Prywatność lokalnie", body: "Nigdy nie wysyłamy nagrań automatycznie. Kamera i karta SD są twoje; to, co rejestrują, zostaje z tobą." },
      { iconName: "Microscope", title: "Niezależne testy", body: "Przed premierą każdy produkt przechodzi TÜV Rheinland (EMC) i niezależne laboratorium do badań słabego oświetlenia." },
      { iconName: "Truck", title: "Odpowiedzialna wysyłka", body: "Wysyłka neutralna pod względem CO₂ dla każdego zamówienia US. W 2025 mniejsze opakowania obniżyły emisję CO₂ na sztukę o 38%." },
      { iconName: "Leaf", title: "Naprawa zamiast wymiany", body: "Naprawy pogwarancyjne dostępne dla wszystkich modeli. Certyfikowane odnowione urządzenia sprzedajemy z rabatem zamiast recyklingu." },
    ],
  },
  ro: {
    stats: [
      { to: 200, suffix: "K+", label: "Șoferi protejați", separator: true },
      { to: 60, suffix: "+", label: "Țări de livrare" },
      { to: 4.8, decimals: 1, label: "Notă medie" },
      { to: 2014, label: "Fondată" },
    ],
    values: [
      { iconName: "Eye", title: "Claritate înainte de toate", body: "Fiecare componentă — senzor, obiectiv, codec, condensator — e aleasă cu o întrebare: ține filmarea la 2 dimineața pe patru benzi sau în instanță peste trei luni? Construim pentru testul ăsta, nu pentru fișa tehnică." },
      { iconName: "Sparkles", title: "Inginerie discretă", body: "Ne obsedează detaliile nevăzute: traseul cablului, comportamentul termic la 65 °C, durata condensatoarelor peste 50.000 de cicluri, firmware care se reface curat după o cădere de 3 µs. Rezultatul: o cameră care nu se oprește din filmat." },
      { iconName: "Users", title: "Construit cu șoferii", body: "Programul nostru beta rulează cu șoferi ride-share, manageri de flote, părinți pe drumuri lungi și câțiva piloți profesioniști. Fiecare produs pleacă doar după ce trec ei prin ce noi nu putem simula." },
      { iconName: "Globe2", title: "Proprietate pe termen lung", body: "Cel puțin cinci ani de actualizări firmware gratuite pentru fiecare produs vândut. Publicăm release notes, cardurile SD vin de la producători auditați, susținem cu garanție de 2 ani + opțiune accidental damage." },
    ],
    timeline: [
      { year: "2014", title: "AZDOME fondată în Shenzhen", body: "Cofondatorii noștri — ambii ingineri de senzori — au fondat AZDOME după o dispută frustrantă cu asigurătorul care a arătat cât de puține camere ale vremii rezistau unei verificări serioase." },
      { year: "2017", title: "Primul milion de unități", body: "M01-ul original ajunge la un milion de unități livrate. Reinvestim marja într-un laborator optic dedicat." },
      { year: "2020", title: "Platformă Wi-Fi 5 GHz", body: "Suntem printre primii producători de dashcam care livrăm Wi-Fi dual-band standard, eliminând ritualul „scoate cardul SD”." },
      { year: "2022", title: "Programul AZDOME Care", body: "Extindem opțiunile de garanție și promitem în scris 5 ani de actualizări firmware." },
      { year: "2024", title: "Sediu central California", body: "Deschidem un birou în Bay Area pentru a apropia produsul și software-ul de cea mai mare bază de clienți; hardware-ul rămâne în Shenzhen." },
      { year: "2026", title: "M550 Pro flagship", body: "Cea mai avansată platformă a noastră. Senzor Sony Starvis 2, ADAS on-device și cel mai mic corp 4K dual-channel pe care l-am făcut." },
    ],
    commitments: [
      { iconName: "ShieldCheck", title: "Confidențialitate locală", body: "Nu încărcăm niciodată automat filmările. Camera și cardul sunt ale tale; ce înregistrează rămâne cu tine." },
      { iconName: "Microscope", title: "Testare independentă", body: "Înainte de lansare, fiecare produs este testat de TÜV Rheinland pentru EMC și de un laborator independent pentru performanța în lumină slabă." },
      { iconName: "Truck", title: "Transport responsabil", body: "Transport neutru din punct de vedere al carbonului pentru fiecare comandă US. În 2025, ambalajul cu volum redus a scăzut CO₂ per unitate cu 38%." },
      { iconName: "Leaf", title: "Reparat în loc de înlocuit", body: "Reparații post-garanție pentru fiecare model. Unitățile recondiționate certificate sunt revândute cu reducere în loc să fie reciclate." },
    ],
  },
  tr: {
    stats: [
      { to: 200, suffix: "K+", label: "Korunan sürücüler", separator: true },
      { to: 60, suffix: "+", label: "Gönderilen ülke" },
      { to: 4.8, decimals: 1, label: "Ortalama puan" },
      { to: 2014, label: "Kuruluş" },
    ],
    values: [
      { iconName: "Eye", title: "Her şeyden önce netlik", body: "Her bileşen — sensör, lens, codec, kapasitör — şu soruyla seçilir: Gece 2'de dört şeritli yolda veya üç ay sonra mahkemede görüntü dayanır mı? Bu teste göre üretiyoruz, kataloğa göre değil." },
      { iconName: "Sparkles", title: "Sessiz mühendislik", body: "Görmediğiniz detaylara takarız: kablo döşeme, 65 °C'de termal davranış, 50.000 döngünün ötesinde kapasitör ömrü, 3 µs gerilim düşüşünden temizce toparlanan yazılım. Sonuç: kayda devam eden bir kamera." },
      { iconName: "Users", title: "Sürücülerle inşa edildi", body: "Beta programımız yolcu taşıma sürücüleri, filo yöneticileri, uzun yol aileleri ve birkaç profesyonel yarışçı ile yürür. Her ürün, simüle edemediğimiz koşulları geçtikten sonra çıkar." },
      { iconName: "Globe2", title: "Uzun vadeli sahiplik", body: "Sattığımız her üründe en az 5 yıl ücretsiz yazılım güncellemesi. Sürüm notlarını yayınlıyoruz, SD kartlar denetlenmiş üreticilerden, 2 yıl garanti + opsiyonel kaza koruması ile destekliyoruz." },
    ],
    timeline: [
      { year: "2014", title: "Shenzhen'de AZDOME kuruldu", body: "Her ikisi de görüntü sensörü mühendisi olan kurucularımız, sıkıcı bir sigorta anlaşmazlığı sonrası dönemin pek az kamerasının ciddi incelemeye dayandığını gördükten sonra AZDOME'u kurdu." },
      { year: "2017", title: "İlk milyon adet", body: "Orijinal M01 bir milyon adede ulaşır. Kâr marjını özel bir optik laboratuvarına yatırırız." },
      { year: "2020", title: "5 GHz Wi-Fi platformu", body: "Çift bantlı Wi-Fi'yi standart olarak gönderen ilk dashcam üreticilerinden biri oluruz; \"SD kartı çıkar\" ritüeli sona erer." },
      { year: "2022", title: "AZDOME Care programı", body: "Garanti seçeneklerini genişletir, 5 yıllık yazılım güncelleme taahhüdünü yazılı veririz." },
      { year: "2024", title: "Kaliforniya merkezi", body: "Ürün ve yazılım ekiplerini en büyük müşteri tabanımıza yaklaştırmak için Bay Area ofisi açarız; donanım Shenzhen'de kalır." },
      { year: "2026", title: "M550 Pro amiral gemisi", body: "Şimdiye kadarki en gelişmiş platformumuz. Sony Starvis 2 sensör, cihaz üstü ADAS ve yaptığımız en küçük 4K çift kanal gövde." },
    ],
    commitments: [
      { iconName: "ShieldCheck", title: "Cihaz üzerinde gizlilik", body: "Görüntüleri asla otomatik yüklemiyoruz. Kamera ve SD kart sizin; kayıt da sizinle kalır." },
      { iconName: "Microscope", title: "Bağımsız testler", body: "Lansman öncesi her ürün TÜV Rheinland'da EMC ve bağımsız bir laboratuvarda düşük ışık sensör performansı için test edilir." },
      { iconName: "Truck", title: "Sorumlu kargo", body: "Her ABD siparişinde karbon-nötr gönderim. 2025'te hacmi azaltılmış paketleme adet başına gönderim CO₂'sini %38 düşürdü." },
      { iconName: "Leaf", title: "Değiştirmek yerine onarmak", body: "Tüm modeller için garanti dışı onarım sunulur. Geri dönüştürmek yerine sertifikalı yenilenmiş ürünleri indirimli olarak yeniden satışa sunuyoruz." },
    ],
  },
  pt: {
    stats: [
      { to: 200, suffix: "K+", label: "Motoristas protegidos", separator: true },
      { to: 60, suffix: "+", label: "Países atendidos" },
      { to: 4.8, decimals: 1, label: "Avaliação média" },
      { to: 2014, label: "Fundada em" },
    ],
    values: [
      { iconName: "Eye", title: "Nitidez acima de tudo", body: "Cada componente — sensor, lente, codec, capacitor — é escolhido com uma pergunta primeiro: o vídeo aguenta às 2 da manhã numa rodovia de quatro faixas, ou três meses depois no tribunal? Construímos para esse teste, não para a ficha técnica." },
      { iconName: "Sparkles", title: "Engenharia silenciosa", body: "Obcecamos com os detalhes que você não vê: passagem do cabo, comportamento térmico a 65 °C, vida útil do capacitor além de 50.000 ciclos, firmware que se recupera limpo de um corte de 3 µs. Resultado: uma câmera que continua gravando." },
      { iconName: "Users", title: "Construída com motoristas", body: "Nosso programa beta tem motoristas de app, gestores de frotas, famílias em viagens longas e alguns pilotos profissionais. Todo produto só sai depois de passar pelo que não conseguimos simular." },
      { iconName: "Globe2", title: "Posse de longo prazo", body: "Mínimo de cinco anos de atualizações de firmware grátis em cada produto. Publicamos release notes, os cartões SD vêm de fabricantes auditados, e respaldamos com garantia de 2 anos + cobertura acidental opcional." },
    ],
    timeline: [
      { year: "2014", title: "AZDOME fundada em Shenzhen", body: "Nossos cofundadores, ambos engenheiros de sensores de imagem, fundaram a AZDOME após uma disputa frustrante com seguradora revelar quão poucas câmeras da época resistiam a um escrutínio." },
      { year: "2017", title: "Primeiro milhão de unidades", body: "O M01 original chega a um milhão de unidades. Reinvestimos a margem em um laboratório óptico dedicado." },
      { year: "2020", title: "Plataforma Wi-Fi 5 GHz", body: "Tornamo-nos um dos primeiros fabricantes de dashcam a entregar Wi-Fi dual-band como padrão, eliminando o ritual de \"tirar o cartão SD\"." },
      { year: "2022", title: "Programa AZDOME Care", body: "Ampliamos opções de garantia e nos comprometemos por escrito com 5 anos de atualizações de firmware." },
      { year: "2024", title: "Sede na Califórnia", body: "Abrimos um escritório na Bay Area para aproximar produto e software da nossa maior base de clientes; o hardware continua em Shenzhen." },
      { year: "2026", title: "Flagship M550 Pro", body: "Nossa plataforma mais avançada. Sensor Sony Starvis 2, ADAS no dispositivo e o menor corpo 4K dual-channel que já fizemos." },
    ],
    commitments: [
      { iconName: "ShieldCheck", title: "Privacidade no dispositivo", body: "Nunca enviamos vídeos automaticamente. A câmera e o cartão SD são seus; o que gravam fica com você." },
      { iconName: "Microscope", title: "Testes independentes", body: "Antes do lançamento, todo produto é testado pela TÜV Rheinland para EMC e por um laboratório independente para desempenho em baixa luz." },
      { iconName: "Truck", title: "Envio responsável", body: "Envio carbono-neutro em todo pedido dos EUA. Em 2025, embalagem com volume reduzido cortou o CO₂ de envio por unidade em 38%." },
      { iconName: "Leaf", title: "Reparar antes de substituir", body: "Reparo fora da garantia para todos os modelos. Unidades recondicionadas certificadas são revendidas com desconto em vez de recicladas." },
    ],
  },
  ar: {
    stats: [
      { to: 200, suffix: "K+", label: "سائق محمي", separator: true },
      { to: 60, suffix: "+", label: "دولة شُحنت إليها", decimals: 0 },
      { to: 4.8, decimals: 1, label: "متوسط التقييم" },
      { to: 2014, label: "سنة التأسيس" },
    ],
    values: [
      { iconName: "Eye", title: "الوضوح فوق كل شيء", body: "كل مكوّن — المستشعر، العدسة، الكوديك، المكثف — يُختار بسؤال واحد أولًا: هل يصمد التسجيل في الساعة 2 صباحًا على طريق سريع بأربعة مسارات، أو بعد ثلاثة أشهر أمام المحكمة؟ نبني وفق هذا الاختبار، لا وفق ورقة المواصفات." },
      { iconName: "Sparkles", title: "هندسة هادئة", body: "نهتم بهوس بالتفاصيل التي لا تراها: مسار الكابل، السلوك الحراري عند 65 °م، عمر المكثف بعد 50,000 دورة، برنامج ثابت يتعافى نظيفًا من انخفاض جهد لمدة 3 ميكروثوانٍ. النتيجة: كاميرا لا تتوقف عن التسجيل." },
      { iconName: "Users", title: "بُنيت مع السائقين", body: "برنامج التجربة لدينا يضم سائقي خدمات النقل، ومديري الأساطيل، والآباء في الرحلات الطويلة، وعددًا من سائقي السباقات المحترفين. كل منتج لا يُشحن إلا بعد اجتيازه ما لا يمكننا محاكاته." },
      { iconName: "Globe2", title: "ملكية طويلة الأمد", body: "نلتزم بخمس سنوات على الأقل من تحديثات البرنامج الثابت المجانية لكل منتج نبيعه. ننشر ملاحظات الإصدار، نختار بطاقات SD من مصنّعين راجعناهم، وندعم بضمان سنتين مع تغطية اختيارية للأضرار العرضية." },
    ],
    timeline: [
      { year: "2014", title: "تأسست AZDOME في شنزن", body: "أسس شريكا تأسيسنا — وكلاهما مهندسا مستشعرات صور — الشركة بعد نزاع مرهق مع شركة تأمين كشف ضعف معظم كاميرات تلك الفترة في الصمود أمام التدقيق." },
      { year: "2017", title: "أول مليون وحدة", body: "وصلت M01 الأصلية إلى مليون وحدة. نعيد استثمار الهامش في مختبر بصري خاص." },
      { year: "2020", title: "منصة Wi-Fi 5GHz", body: "نصبح من أوائل مصنعي كاميرات السيارة الذين يقدمون Wi-Fi ثنائي النطاق قياسيًا، فننهي طقس \"إخراج بطاقة SD\"." },
      { year: "2022", title: "برنامج AZDOME Care", body: "نوسّع خيارات الضمان ونتعهد كتابيًا بـ 5 سنوات من تحديثات البرنامج الثابت." },
      { year: "2024", title: "افتتاح مقرنا في كاليفورنيا", body: "نفتح مكتبًا في خليج سان فرانسيسكو لتقريب فرق المنتج والبرمجيات من أكبر قاعدة عملائنا، مع بقاء الأجهزة في شنزن." },
      { year: "2026", title: "رائدنا M550 Pro", body: "أكثر منصاتنا تطورًا حتى الآن. مستشعر Sony Starvis 2، نظام ADAS على الجهاز، وأصغر جسم 4K بقناتين صنعناه على الإطلاق." },
    ],
    commitments: [
      { iconName: "ShieldCheck", title: "خصوصية على الجهاز", body: "لا نرفع اللقطات تلقائيًا أبدًا. الكاميرا وبطاقة SD ملك لك، وما يُسجَّل فيهما يبقى معك." },
      { iconName: "Microscope", title: "اختبارات مستقلة", body: "قبل الإطلاق، يُختبر كل منتج من قبل TÜV Rheinland لاختبارات EMC، ومن مختبر مستقل لأداء المستشعر في الإضاءة المنخفضة." },
      { iconName: "Truck", title: "شحن مسؤول", body: "شحن محايد للكربون على كل طلب في الولايات المتحدة. في 2025، تقليل حجم العبوات خفّض CO₂ الشحن لكل وحدة بنسبة 38%." },
      { iconName: "Leaf", title: "الإصلاح بدل الاستبدال", body: "إصلاح خارج الضمان متاح لكل طراز. نعيد بيع وحدات مجدَّدة معتمدة بخصم بدلًا من تدويرها." },
    ],
  },
  th: {
    stats: [
      { to: 200, suffix: "K+", label: "ผู้ขับขี่ที่ได้รับการปกป้อง", separator: true },
      { to: 60, suffix: "+", label: "ประเทศที่ส่งไป" },
      { to: 4.8, decimals: 1, label: "คะแนนเฉลี่ย" },
      { to: 2014, label: "ก่อตั้งเมื่อ" },
    ],
    values: [
      { iconName: "Eye", title: "ความคมชัดมาก่อน", body: "ทุกชิ้นส่วน — เซ็นเซอร์ภาพ เลนส์ ตัวเข้ารหัส ตัวเก็บประจุ — เลือกด้วยคำถามเดียวก่อน: ภาพถ่ายไว้ตอนตี 2 บนถนน 4 เลน หรือ 3 เดือนต่อมาในศาลจะใช้งานได้ไหม? เราสร้างเพื่อทดสอบนั้น ไม่ใช่เพื่อแผ่นสเปก" },
      { iconName: "Sparkles", title: "วิศวกรรมที่เงียบ", body: "เราหลงใหลกับรายละเอียดที่คุณไม่เห็น: การเดินสาย พฤติกรรมความร้อนที่ 65 °C อายุการใช้งานของตัวเก็บประจุเกิน 50,000 รอบ เฟิร์มแวร์ที่กลับมาทำงานสะอาดหลังไฟตก 3 ไมโครวินาที ผลคือกล้องที่ยังคงบันทึกต่อไป" },
      { iconName: "Users", title: "สร้างร่วมกับผู้ขับขี่", body: "โปรแกรมเบต้าของเราประกอบด้วยคนขับ Rideshare ผู้จัดการฟลีท ครอบครัวที่เดินทางไกล และนักแข่งมืออาชีพไม่กี่คน ทุกผลิตภัณฑ์จะถูกส่งหลังจากผ่านสิ่งที่เราจำลองไม่ได้" },
      { iconName: "Globe2", title: "การเป็นเจ้าของระยะยาว", body: "เราสัญญาอัปเดตเฟิร์มแวร์ฟรีอย่างน้อย 5 ปีในทุกผลิตภัณฑ์ที่ขาย เผยแพร่ release notes เลือก SD จากผู้ผลิตที่ตรวจสอบแล้ว และรับประกัน 2 ปี + ความคุ้มครองอุบัติเหตุเสริม" },
    ],
    timeline: [
      { year: "2014", title: "AZDOME ก่อตั้งที่เซินเจิ้น", body: "ผู้ร่วมก่อตั้งทั้งสองคนเป็นวิศวกรเซ็นเซอร์ภาพ ก่อตั้ง AZDOME หลังกรณีพิพาทกับประกันที่น่าหงุดหงิดเผยว่ามีกล้องในยุคนั้นน้อยมากที่ผ่านการตรวจสอบจริงได้" },
      { year: "2017", title: "ก้าวสู่ล้านชุดแรก", body: "M01 รุ่นเดิมขายได้ 1 ล้านชิ้น เราลงทุนกำไรในห้องแล็บออปติกเฉพาะทาง" },
      { year: "2020", title: "แพลตฟอร์ม Wi-Fi 5GHz", body: "เป็นหนึ่งในผู้ผลิตกล้องติดรถยนต์รายแรกที่มาพร้อม Wi-Fi ดูอัลแบนด์มาตรฐาน ยุติพิธีกรรม \"ถอดการ์ด SD\"" },
      { year: "2022", title: "โปรแกรม AZDOME Care", body: "ขยายตัวเลือกการรับประกันและให้คำมั่นเป็นลายลักษณ์อักษรว่าจะอัปเดตเฟิร์มแวร์ 5 ปี" },
      { year: "2024", title: "เปิดสำนักงานใหญ่แคลิฟอร์เนีย", body: "เปิดสำนักงาน Bay Area เพื่อให้ทีมผลิตภัณฑ์และซอฟต์แวร์อยู่ใกล้ฐานลูกค้าหลัก ส่วนฮาร์ดแวร์ยังอยู่ที่เซินเจิ้น" },
      { year: "2026", title: "เรือธง M550 Pro", body: "แพลตฟอร์มที่ก้าวหน้าที่สุดของเรา เซ็นเซอร์ Sony Starvis 2 ADAS บนตัวอุปกรณ์ และตัวเครื่อง 4K dual-channel ที่เล็กที่สุดที่เคยทำ" },
    ],
    commitments: [
      { iconName: "ShieldCheck", title: "ความเป็นส่วนตัวบนตัวเครื่อง", body: "เราไม่อัปโหลดวิดีโออัตโนมัติเลย กล้องและการ์ด SD เป็นของคุณ ที่บันทึกไว้ก็อยู่กับคุณ" },
      { iconName: "Microscope", title: "ทดสอบโดยอิสระ", body: "ก่อนวางตลาด ทุกผลิตภัณฑ์ผ่านการทดสอบ EMC โดย TÜV Rheinland และห้องแล็บอิสระสำหรับประสิทธิภาพเซ็นเซอร์ในแสงน้อย" },
      { iconName: "Truck", title: "จัดส่งอย่างรับผิดชอบ", body: "จัดส่งคาร์บอนเป็นกลางในทุกคำสั่งซื้อในสหรัฐฯ ปี 2025 บรรจุภัณฑ์ที่ลดปริมาตรช่วยลด CO₂ ขนส่งต่อชิ้นได้ 38%" },
      { iconName: "Leaf", title: "ซ่อมมากกว่าเปลี่ยน", body: "ให้บริการซ่อมพ้นรับประกันสำหรับทุกรุ่น เครื่องรีเฟอร์บิชที่ผ่านการรับรองเรานำมาขายต่อในราคาลดแทนการรีไซเคิล" },
    ],
  },
  vi: {
    stats: [
      { to: 200, suffix: "K+", label: "Tài xế được bảo vệ", separator: true },
      { to: 60, suffix: "+", label: "Quốc gia ship đến" },
      { to: 4.8, decimals: 1, label: "Đánh giá trung bình" },
      { to: 2014, label: "Năm thành lập" },
    ],
    values: [
      { iconName: "Eye", title: "Rõ nét trên hết", body: "Mỗi linh kiện — cảm biến, ống kính, codec, tụ điện — được chọn với một câu hỏi đầu tiên: liệu video có chịu được lúc 2 giờ sáng trên đường cao tốc 4 làn hay 3 tháng sau ở tòa? Chúng tôi làm cho bài kiểm tra đó, không phải cho tờ thông số." },
      { iconName: "Sparkles", title: "Kỹ thuật âm thầm", body: "Chúng tôi chăm chút chi tiết bạn không thấy: đi dây, ứng xử nhiệt ở 65 °C, tuổi thọ tụ điện vượt 50.000 chu kỳ, firmware phục hồi sạch sau khi mất điện 3 µs. Kết quả: một camera vẫn tiếp tục ghi." },
      { iconName: "Users", title: "Xây cùng tài xế", body: "Chương trình beta của chúng tôi chạy với tài xế xe công nghệ, quản lý đội xe, các bậc phụ huynh đi đường dài và một vài tay đua chuyên nghiệp. Mọi sản phẩm chỉ xuất xưởng sau khi họ đã thử qua những thứ chúng tôi không mô phỏng được." },
      { iconName: "Globe2", title: "Sở hữu dài hạn", body: "Cam kết tối thiểu năm năm cập nhật firmware miễn phí cho mọi sản phẩm. Chúng tôi công bố release notes, dùng thẻ SD từ các nhà sản xuất đã kiểm toán, và bảo hành 2 năm + tùy chọn bảo vệ rủi ro." },
    ],
    timeline: [
      { year: "2014", title: "AZDOME ra đời tại Thâm Quyến", body: "Hai đồng sáng lập — cùng là kỹ sư cảm biến — lập AZDOME sau khi một vụ tranh chấp bảo hiểm bực mình cho thấy có quá ít camera thời ấy chịu được sự soi xét." },
      { year: "2017", title: "Cột mốc triệu chiếc đầu tiên", body: "Bản M01 nguyên gốc cán mốc một triệu chiếc giao. Chúng tôi tái đầu tư biên lợi nhuận vào một phòng thí nghiệm quang học riêng." },
      { year: "2020", title: "Nền tảng Wi-Fi 5GHz", body: "Là một trong những nhà sản xuất dashcam đầu tiên đưa Wi-Fi băng kép thành tiêu chuẩn, chấm dứt nghi thức \"rút thẻ SD\"." },
      { year: "2022", title: "Chương trình AZDOME Care", body: "Mở rộng tùy chọn bảo hành và cam kết bằng văn bản 5 năm cập nhật firmware." },
      { year: "2024", title: "Trụ sở California khai trương", body: "Mở văn phòng Bay Area để mảng sản phẩm và phần mềm gần khách hàng lớn nhất, phần cứng vẫn ở Thâm Quyến." },
      { year: "2026", title: "Hàng đầu M550 Pro", body: "Nền tảng tiên tiến nhất của chúng tôi. Cảm biến Sony Starvis 2, ADAS trên thiết bị và thân máy 4K hai kênh nhỏ nhất từng làm." },
    ],
    commitments: [
      { iconName: "ShieldCheck", title: "Riêng tư trên thiết bị", body: "Chúng tôi không bao giờ tự động tải lên video. Camera và thẻ SD là của bạn; những gì được ghi lại cũng ở lại với bạn." },
      { iconName: "Microscope", title: "Kiểm thử độc lập", body: "Trước khi ra mắt, mọi sản phẩm đều được TÜV Rheinland kiểm thử EMC và một phòng thí nghiệm độc lập đánh giá hiệu năng cảm biến trong điều kiện thiếu sáng." },
      { iconName: "Truck", title: "Vận chuyển có trách nhiệm", body: "Vận chuyển trung hòa carbon cho mọi đơn hàng tại Mỹ. Năm 2025, bao bì giảm thể tích đã cắt CO₂ vận chuyển trên mỗi sản phẩm 38%." },
      { iconName: "Leaf", title: "Sửa thay vì thay", body: "Dịch vụ sửa chữa ngoài bảo hành cho mọi mẫu. Sản phẩm tân trang chứng nhận được bán lại với giá ưu đãi thay vì tái chế." },
    ],
  },
};

export function getDefaultAbout(locale: Locale): AboutContent {
  return ABOUT_BY_LOCALE[locale] ?? ABOUT_BY_LOCALE.en!;
}

// Legacy exports for any consumers that still import these directly.
export const STATS = EN.stats;
export const VALUES = EN.values;
export const TIMELINE = EN.timeline;
export const COMMITMENTS = EN.commitments;

export const ABOUT_PAGE: ContentSection<AboutContent> = {
  key: "about.page",
  label: "About 页 · Stats / Values / Timeline / Commitments",
  description:
    "About 页所有可编辑卡片。Stats 是数字计数器(到达视野动画),Timeline 是大事记。" +
    `Values iconName 可选: ${ABOUT_VALUE_ICONS.join(", ")} · ` +
    `Commitments iconName 可选: ${ABOUT_COMMITMENT_ICONS.join(", ")}`,
  page: "about",
  previewHref: "/about",
  defaults: getDefaultAbout,
};
