import type { ContentSection } from "./types";
import type { Locale } from "@/lib/i18n/dictionaries";

export const PRESS_KIT_ICONS = ["Palette", "ImageIcon", "FileText"] as const;

export type PressRelease = { date: string; title: string; excerpt: string; body: string };
export type PressCoverage = { outlet: string; title: string; href: string };
export type PressQuote = { quote: string; outlet: string };
export type PressKitEntry = { iconName: string; title: string; detail: string };

export type PressContent = {
  releases: PressRelease[];
  coverage: PressCoverage[];
  quotes: PressQuote[];
  kit: PressKitEntry[];
};

const EN: PressContent = {
  releases: [
    { date: "April 04, 2026", title: "AZDOME launches M550 Pro with Sony Starvis 2 sensor", excerpt: "True 4K with the new generation of low-light sensor — the most significant upgrade in our flagship line.", body: "AZDOME today announced the M550 Pro, a 4K dual-channel dash cam built around the Sony Starvis 2 IMX678 sensor and an f/1.55 aperture lens. Independent low-light testing puts it within 1.2 stops of the best automotive cameras on the market — at roughly half the price. The M550 Pro ships with dual-band 5 GHz Wi-Fi, GPS, and on-device ADAS, available today on azdome.com for $129.99 and at major US retailers in early May." },
    { date: "February 18, 2026", title: "AZDOME crosses 200,000 protected drivers worldwide", excerpt: "Two hundred thousand dash cams installed, three years ahead of our internal projection.", body: "AZDOME today crossed 200,000 active units across 60+ countries — a milestone the company had originally projected for 2029. CEO Lily Chen attributes the acceleration to the M530 3-channel platform's adoption among rideshare drivers and to the company's free, 5-year firmware update policy." },
    { date: "January 12, 2026", title: "M530 3-Channel begins shipping to rideshare partners", excerpt: "Our three-camera design is rolling out to fleet partners across North America.", body: "Effective today, AZDOME's M530 3-channel dash cam is the default safety-camera package for 12 of the top 25 US rideshare cooperatives. The wholesale program includes installer-network support, 3-year warranty, and JSON-webhook integrations with the major telematics platforms." },
    { date: "October 28, 2025", title: "AZDOME extends free firmware updates to 5 years", excerpt: "Every camera, every model, every region — guaranteed in writing.", body: "AZDOME today committed to providing free firmware updates for at least five years from the launch date of every camera, retroactive to all products sold since 2022. The commitment is published as a binding policy on the company's warranty page." },
  ],
  coverage: [
    { outlet: "The Verge", title: "AZDOME's M550 Pro is the dash cam to beat in 2026", href: "#" },
    { outlet: "Wired", title: "How a small DTC brand is challenging the dash-cam category", href: "#" },
    { outlet: "TechCrunch", title: "AZDOME raises Series B for next-gen on-device AI", href: "#" },
    { outlet: "Engadget", title: "Hands on: the M550 Pro feels almost overspecced for the price", href: "#" },
    { outlet: "CNET", title: "The best dash cams for night driving in 2026", href: "#" },
  ],
  quotes: [
    { quote: "AZDOME has quietly become the brand to beat at this price point. Night footage is genuinely class-leading.", outlet: "The Verge" },
    { quote: "If your only complaint is that you wish more brands cared about firmware support — AZDOME is the answer.", outlet: "Wired" },
    { quote: "A five-year firmware commitment, in writing, is unheard of in this category.", outlet: "CNET" },
  ],
  kit: [
    { iconName: "Palette", title: "Brand kit (logos, colors, type)", detail: "AI/SVG/PNG · 12 MB" },
    { iconName: "ImageIcon", title: "Product photography", detail: "Full resolution, web + print · 240 MB" },
    { iconName: "FileText", title: "Fact sheet & exec bios", detail: "PDF · 1.2 MB" },
  ],
};

// Press: outlet names + article titles stay in English (these are real
// brand references), but release titles/body and pull-quotes translate.
const PRESS_BY_LOCALE: Partial<Record<Locale, PressContent>> = {
  en: EN,
  zh: {
    releases: [
      { date: "2026 年 4 月 4 日", title: "AZDOME 发布搭载 Sony Starvis 2 传感器的 M550 Pro", excerpt: "采用新一代低光传感器的真正 4K — 我们旗舰产品线最重要的升级。", body: "AZDOME 今日发布 M550 Pro,一款基于 Sony Starvis 2 IMX678 传感器与 f/1.55 大光圈镜头的 4K 双录行车记录仪。第三方低光测试显示其与市场上最好的车载摄像头仅差 1.2 档 — 而价格只有一半。M550 Pro 配双频 5 GHz Wi-Fi、GPS、设备端 ADAS,即日起在 azdome.com 以 $129.99 发售,5 月初登陆美国主要零售渠道。" },
      { date: "2026 年 2 月 18 日", title: "AZDOME 守护全球用户突破 20 万", excerpt: "20 万台行车记录仪安装,比内部预测提前 3 年。", body: "AZDOME 今日全球活跃设备突破 20 万台,覆盖 60+ 国家 — 公司原本计划 2029 年达成这一里程碑。CEO Lily Chen 表示加速来自 M530 三路平台在网约车司机中的普及以及公司的 5 年免费固件更新政策。" },
      { date: "2026 年 1 月 12 日", title: "M530 三路开始向网约车伙伴发货", excerpt: "我们的三摄像头方案正在北美车队伙伴中铺开。", body: "即日起,AZDOME M530 三路行车记录仪成为美国前 25 家网约车合作社中 12 家的默认安全摄像头方案。批发计划包含安装网络支持、3 年保修,以及与主流车联网平台的 JSON Webhook 对接。" },
      { date: "2025 年 10 月 28 日", title: "AZDOME 将免费固件更新延长至 5 年", excerpt: "每台摄像头、每个型号、每个区域 — 以书面形式承诺。", body: "AZDOME 今日承诺每台摄像头自发布日起至少提供 5 年免费固件更新,追溯至 2022 年起销售的所有产品。该承诺已作为有约束力的政策发布在公司保修页面。" },
    ],
    coverage: EN.coverage,
    quotes: [
      { quote: "AZDOME 已悄然成为这个价位上的标杆。夜间画质堪称同级最佳。", outlet: "The Verge" },
      { quote: "如果你唯一的抱怨是「希望更多品牌重视固件支持」 — AZDOME 就是答案。", outlet: "Wired" },
      { quote: "5 年固件承诺,书面形式 — 在这个品类前所未闻。", outlet: "CNET" },
    ],
    kit: [
      { iconName: "Palette", title: "品牌素材包(logo、配色、字体)", detail: "AI/SVG/PNG · 12 MB" },
      { iconName: "ImageIcon", title: "产品摄影", detail: "全分辨率,Web + 印刷 · 240 MB" },
      { iconName: "FileText", title: "事实概况 & 高管简介", detail: "PDF · 1.2 MB" },
    ],
  },
  ja: {
    releases: [
      { date: "2026 年 4 月 4 日", title: "AZDOME、Sony Starvis 2 センサー搭載の M550 Pro を発表", excerpt: "新世代低照度センサーを採用した真の 4K — 当社フラッグシップラインで最も重要なアップグレード。", body: "AZDOME は本日、Sony Starvis 2 IMX678 センサーと f/1.55 絞りレンズを採用した 4K 2 チャンネルドライブレコーダー M550 Pro を発表しました。第三者の低照度テストでは、市場最高クラスの車載カメラと 1.2 段差以内 — しかも価格はおよそ半額。M550 Pro はデュアルバンド 5 GHz Wi-Fi、GPS、オンデバイス ADAS を搭載し、本日より azdome.com で $129.99 にて、米国主要小売店では 5 月初旬より販売開始。" },
      { date: "2026 年 2 月 18 日", title: "AZDOME、世界の保護ドライバー 20 万人突破", excerpt: "20 万台のドライブレコーダー稼働、社内予測より 3 年早いマイルストーン。", body: "AZDOME は本日、世界 60 以上の国で稼働ユニット 20 万台を突破しました。当初は 2029 年に予測されていた数字です。CEO の Lily Chen は、M530 3 チャンネルプラットフォームのライドシェアドライバーへの普及と、5 年無料ファームウェア更新ポリシーが加速の理由としています。" },
      { date: "2026 年 1 月 12 日", title: "M530 3 チャンネル、ライドシェアパートナーへの出荷開始", excerpt: "3 カメラ設計を北米のフリートパートナーへ展開中。", body: "本日より AZDOME M530 3 チャンネルドライブレコーダーが米国上位 25 ライドシェア協同組合のうち 12 社の標準セーフティカメラパッケージに採用されました。卸売プログラムは取付ネットワークサポート、3 年保証、主要テレマティクスプラットフォームとの JSON Webhook 連携を含みます。" },
      { date: "2025 年 10 月 28 日", title: "AZDOME、無料ファームウェア更新を 5 年に延長", excerpt: "全カメラ、全モデル、全地域 — 書面で保証。", body: "AZDOME は本日、すべてのカメラに対し発売日から最低 5 年間の無料ファームウェア更新を提供することを表明しました。2022 年以降に販売された全製品にさかのぼって適用されます。コミットメントは保証ページに拘束力のあるポリシーとして公開されています。" },
    ],
    coverage: EN.coverage,
    quotes: [
      { quote: "AZDOME はこの価格帯で打ち負かすべきブランドに静かになった。夜間の映像は紛れもなくクラストップ。", outlet: "The Verge" },
      { quote: "「もっと多くのブランドがファームウェアサポートを大事にしてくれたら」が唯一の不満なら、AZDOME がその答え。", outlet: "Wired" },
      { quote: "5 年間のファームウェアコミットメントを書面で出すのは、このカテゴリーでは前代未聞。", outlet: "CNET" },
    ],
    kit: [
      { iconName: "Palette", title: "ブランドキット(ロゴ、カラー、書体)", detail: "AI/SVG/PNG · 12 MB" },
      { iconName: "ImageIcon", title: "製品写真", detail: "フル解像度、Web + 印刷 · 240 MB" },
      { iconName: "FileText", title: "ファクトシート & 役員バイオ", detail: "PDF · 1.2 MB" },
    ],
  },
  de: {
    releases: [
      { date: "4. April 2026", title: "AZDOME bringt M550 Pro mit Sony Starvis 2-Sensor auf den Markt", excerpt: "Echtes 4K mit der neuen Generation Low-Light-Sensor — das wichtigste Upgrade unserer Flaggschiff-Linie.", body: "AZDOME stellt heute die M550 Pro vor — eine 4K-Dualkanal-Dashcam mit Sony-Starvis-2-IMX678-Sensor und f/1.55-Blende. Unabhängige Low-Light-Tests siedeln sie 1,2 Blendenstufen hinter den besten Automotive-Kameras am Markt an — zum etwa halben Preis. M550 Pro liefert mit Dualband-5-GHz-WLAN, GPS und On-Device-ADAS, ab heute auf azdome.com für $129,99 und bei großen US-Händlern ab Anfang Mai." },
      { date: "18. Februar 2026", title: "AZDOME überschreitet 200.000 geschützte Fahrer weltweit", excerpt: "Zweihunderttausend installierte Dashcams, drei Jahre vor unserer internen Prognose.", body: "AZDOME hat heute weltweit 200.000 aktive Einheiten in 60+ Ländern überschritten — ein Meilenstein, den das Unternehmen ursprünglich für 2029 erwartet hatte. CEO Lily Chen führt die Beschleunigung auf die Adoption der M530 3-Kanal-Plattform unter Rideshare-Fahrern und die Politik des 5-jährigen kostenlosen Firmware-Updates zurück." },
      { date: "12. Januar 2026", title: "M530 3-Kanal startet Auslieferung an Rideshare-Partner", excerpt: "Unsere Drei-Kamera-Design wird an Flottenpartner in Nordamerika ausgerollt.", body: "Ab heute ist die M530 3-Kanal-Dashcam von AZDOME das Default-Safety-Camera-Paket für 12 der 25 größten US-Rideshare-Kooperativen. Das Wholesale-Programm umfasst Installer-Netzwerk-Support, 3 Jahre Garantie und JSON-Webhook-Integrationen mit den großen Telematik-Plattformen." },
      { date: "28. Oktober 2025", title: "AZDOME verlängert kostenlose Firmware-Updates auf 5 Jahre", excerpt: "Jede Kamera, jedes Modell, jede Region — schriftlich garantiert.", body: "AZDOME hat heute zugesagt, kostenlose Firmware-Updates für mindestens fünf Jahre ab Marktstart jeder Kamera bereitzustellen — rückwirkend für alle seit 2022 verkauften Produkte. Die Zusage ist als verbindliche Richtlinie auf der Garantieseite des Unternehmens veröffentlicht." },
    ],
    coverage: EN.coverage,
    quotes: [
      { quote: "AZDOME ist still die zu schlagende Marke in dieser Preisklasse geworden. Nachtaufnahmen sind echt klassenführend.", outlet: "The Verge" },
      { quote: "Wenn Ihre einzige Beschwerde ist, dass mehr Marken Firmware-Support pflegen sollten — AZDOME ist die Antwort.", outlet: "Wired" },
      { quote: "Eine 5-jährige Firmware-Zusage, schriftlich, ist in dieser Kategorie beispiellos.", outlet: "CNET" },
    ],
    kit: [
      { iconName: "Palette", title: "Brand-Kit (Logos, Farben, Typografie)", detail: "AI/SVG/PNG · 12 MB" },
      { iconName: "ImageIcon", title: "Produktfotografie", detail: "Volle Auflösung, Web + Print · 240 MB" },
      { iconName: "FileText", title: "Factsheet & Exec-Biografien", detail: "PDF · 1,2 MB" },
    ],
  },
  fr: {
    releases: [
      { date: "4 avril 2026", title: "AZDOME lance la M550 Pro avec le capteur Sony Starvis 2", excerpt: "Vraie 4K avec la nouvelle génération de capteur basse lumière — la mise à niveau la plus significative de notre ligne phare.", body: "AZDOME annonce aujourd'hui la M550 Pro, une dashcam 4K double canal construite autour du capteur Sony Starvis 2 IMX678 et d'une ouverture f/1.55. Les tests indépendants en basse lumière la situent à 1,2 IL des meilleures caméras automobiles du marché — à environ la moitié du prix. La M550 Pro embarque Wi-Fi 5 GHz bi-bande, GPS et ADAS embarqué, disponible dès aujourd'hui sur azdome.com à $129,99 et chez les principaux revendeurs US début mai." },
      { date: "18 février 2026", title: "AZDOME franchit les 200 000 conducteurs protégés dans le monde", excerpt: "Deux cent mille dashcams installées, trois ans avant notre projection interne.", body: "AZDOME a franchi aujourd'hui 200 000 unités actives dans plus de 60 pays — un jalon prévu initialement pour 2029. La CEO Lily Chen attribue cette accélération à l'adoption de la plateforme M530 3 canaux chez les chauffeurs VTC et à la politique de mises à jour firmware gratuites sur 5 ans." },
      { date: "12 janvier 2026", title: "Démarrage des livraisons M530 3 canaux aux partenaires VTC", excerpt: "Notre conception à trois caméras se déploie chez les partenaires flottes en Amérique du Nord.", body: "À compter d'aujourd'hui, la dashcam M530 3 canaux d'AZDOME est le package caméra de sécurité par défaut pour 12 des 25 plus grandes coopératives VTC US. Le programme wholesale comprend support du réseau d'installateurs, garantie 3 ans et intégrations webhook JSON avec les principales plateformes télématiques." },
      { date: "28 octobre 2025", title: "AZDOME prolonge les mises à jour firmware gratuites à 5 ans", excerpt: "Chaque caméra, chaque modèle, chaque région — garanti par écrit.", body: "AZDOME s'engage aujourd'hui à fournir des mises à jour firmware gratuites pendant au moins cinq ans à compter de la date de lancement de chaque caméra, rétroactivement pour tous les produits vendus depuis 2022. L'engagement est publié comme une politique contraignante sur la page garantie de l'entreprise." },
    ],
    coverage: EN.coverage,
    quotes: [
      { quote: "AZDOME est silencieusement devenu la marque à battre à ce prix. La vidéo de nuit est sincèrement leader de sa classe.", outlet: "The Verge" },
      { quote: "Si votre seule plainte est de souhaiter que plus de marques se soucient du support firmware — AZDOME est la réponse.", outlet: "Wired" },
      { quote: "Un engagement firmware de cinq ans, par écrit, est du jamais vu dans cette catégorie.", outlet: "CNET" },
    ],
    kit: [
      { iconName: "Palette", title: "Kit de marque (logos, couleurs, typo)", detail: "AI/SVG/PNG · 12 Mo" },
      { iconName: "ImageIcon", title: "Photographie produit", detail: "Pleine résolution, web + print · 240 Mo" },
      { iconName: "FileText", title: "Fiche d'information & bios dirigeants", detail: "PDF · 1,2 Mo" },
    ],
  },
  es: {
    releases: [
      { date: "4 de abril de 2026", title: "AZDOME lanza la M550 Pro con sensor Sony Starvis 2", excerpt: "4K real con la nueva generación de sensor de baja luz — la mejora más significativa de nuestra línea estrella.", body: "AZDOME anuncia hoy la M550 Pro, una dash cam 4K de doble canal construida en torno al sensor Sony Starvis 2 IMX678 y una óptica con apertura f/1.55. Las pruebas independientes en baja luz la sitúan a 1,2 pasos de las mejores cámaras automotrices del mercado — a aproximadamente la mitad de precio. La M550 Pro incluye Wi-Fi 5 GHz de doble banda, GPS y ADAS en dispositivo, disponible hoy en azdome.com por $129,99 y en los principales minoristas US a principios de mayo." },
      { date: "18 de febrero de 2026", title: "AZDOME supera los 200.000 conductores protegidos en todo el mundo", excerpt: "Doscientos mil dash cams instaladas, tres años antes de nuestra proyección interna.", body: "AZDOME ha superado hoy las 200.000 unidades activas en más de 60 países — un hito que la compañía proyectaba originalmente para 2029. La CEO Lily Chen atribuye la aceleración a la adopción de la plataforma M530 de 3 canales entre conductores VTC y a la política de actualizaciones de firmware gratuitas durante 5 años." },
      { date: "12 de enero de 2026", title: "El M530 3 canales comienza a enviarse a partners VTC", excerpt: "Nuestro diseño de tres cámaras se está desplegando en partners de flotas por toda Norteamérica.", body: "A partir de hoy, la dash cam M530 de 3 canales de AZDOME es el paquete de cámara de seguridad por defecto para 12 de las 25 mayores cooperativas VTC de EE.UU. El programa wholesale incluye soporte de red de instaladores, garantía de 3 años e integraciones JSON-webhook con las principales plataformas telemáticas." },
      { date: "28 de octubre de 2025", title: "AZDOME amplía las actualizaciones gratuitas de firmware a 5 años", excerpt: "Cada cámara, cada modelo, cada región — garantizado por escrito.", body: "AZDOME se ha comprometido hoy a proporcionar actualizaciones de firmware gratuitas durante al menos cinco años desde la fecha de lanzamiento de cada cámara, con efecto retroactivo a todos los productos vendidos desde 2022. El compromiso se publica como política vinculante en la página de garantía de la empresa." },
    ],
    coverage: EN.coverage,
    quotes: [
      { quote: "AZDOME se ha convertido silenciosamente en la marca a batir a este precio. El vídeo nocturno es genuinamente líder de su clase.", outlet: "The Verge" },
      { quote: "Si tu única queja es desear que más marcas se preocupen por el soporte de firmware — AZDOME es la respuesta.", outlet: "Wired" },
      { quote: "Un compromiso de firmware de cinco años, por escrito, no se había visto antes en esta categoría.", outlet: "CNET" },
    ],
    kit: [
      { iconName: "Palette", title: "Kit de marca (logos, colores, tipografía)", detail: "AI/SVG/PNG · 12 MB" },
      { iconName: "ImageIcon", title: "Fotografía de producto", detail: "Resolución completa, web + print · 240 MB" },
      { iconName: "FileText", title: "Ficha técnica y bios de ejecutivos", detail: "PDF · 1,2 MB" },
    ],
  },
  it: {
    releases: [
      { date: "4 aprile 2026", title: "AZDOME lancia M550 Pro con sensore Sony Starvis 2", excerpt: "Vero 4K con la nuova generazione di sensore low-light — l'aggiornamento più significativo della nostra linea di punta.", body: "AZDOME annuncia oggi la M550 Pro, dash cam 4K dual-channel basata sul sensore Sony Starvis 2 IMX678 e ottica f/1.55. Test indipendenti in bassa luce la collocano entro 1,2 stop dalle migliori telecamere automotive sul mercato — a circa metà prezzo. M550 Pro include Wi-Fi 5 GHz dual-band, GPS e ADAS on-device, disponibile da oggi su azdome.com a $129,99 e nei principali retailer USA da inizio maggio." },
      { date: "18 febbraio 2026", title: "AZDOME supera i 200.000 conducenti protetti nel mondo", excerpt: "Duecentomila dash cam installate, tre anni in anticipo sulla previsione interna.", body: "AZDOME ha superato oggi 200.000 unità attive in oltre 60 paesi — un traguardo che l'azienda aveva originariamente previsto per il 2029. La CEO Lily Chen attribuisce l'accelerazione all'adozione della piattaforma M530 a 3 canali tra autisti ride-share e alla politica di aggiornamenti firmware gratuiti per 5 anni." },
      { date: "12 gennaio 2026", title: "M530 3-Channel inizia le spedizioni ai partner ride-share", excerpt: "Il nostro design a tre telecamere viene distribuito ai partner di flotta in Nord America.", body: "Da oggi la dash cam M530 a 3 canali di AZDOME è il pacchetto sicurezza-telecamera predefinito per 12 delle 25 maggiori cooperative ride-share US. Il programma wholesale include supporto della rete installatori, garanzia di 3 anni e integrazioni JSON-webhook con le principali piattaforme telematiche." },
      { date: "28 ottobre 2025", title: "AZDOME estende gli aggiornamenti firmware gratuiti a 5 anni", excerpt: "Ogni telecamera, ogni modello, ogni regione — garantito per iscritto.", body: "AZDOME si è impegnata oggi a fornire aggiornamenti firmware gratuiti per almeno cinque anni dalla data di lancio di ogni telecamera, retroattivamente a tutti i prodotti venduti dal 2022. L'impegno è pubblicato come policy vincolante sulla pagina garanzia dell'azienda." },
    ],
    coverage: EN.coverage,
    quotes: [
      { quote: "AZDOME è silenziosamente diventata il marchio da battere in questa fascia di prezzo. Le riprese notturne sono genuinamente leader di classe.", outlet: "The Verge" },
      { quote: "Se l'unica tua lamentela è desiderare che più brand si preoccupassero del supporto firmware — AZDOME è la risposta.", outlet: "Wired" },
      { quote: "Un impegno firmware di cinque anni, per iscritto, è inaudito in questa categoria.", outlet: "CNET" },
    ],
    kit: [
      { iconName: "Palette", title: "Brand kit (loghi, colori, tipografia)", detail: "AI/SVG/PNG · 12 MB" },
      { iconName: "ImageIcon", title: "Fotografia prodotto", detail: "Piena risoluzione, web + stampa · 240 MB" },
      { iconName: "FileText", title: "Scheda informativa & bios dirigenti", detail: "PDF · 1,2 MB" },
    ],
  },
  ru: {
    releases: [
      { date: "4 апреля 2026", title: "AZDOME выпускает M550 Pro с сенсором Sony Starvis 2", excerpt: "Настоящее 4K с новым поколением низкосветового сенсора — самое значимое обновление в нашей флагманской линейке.", body: "AZDOME сегодня представила M550 Pro — двухканальный 4K видеорегистратор на сенсоре Sony Starvis 2 IMX678 и объективе с диафрагмой f/1.55. Независимые низкосветовые тесты ставят его в пределах 1,2 ступени от лучших автомобильных камер на рынке — при цене примерно в два раза ниже. M550 Pro поставляется с двухдиапазонным Wi-Fi 5 ГГц, GPS и ADAS на устройстве. Доступен сегодня на azdome.com за $129,99 и у крупных розничных продавцов США в начале мая." },
      { date: "18 февраля 2026", title: "AZDOME преодолела отметку 200 000 защищённых водителей по всему миру", excerpt: "Двести тысяч установленных видеорегистраторов, на три года раньше внутреннего прогноза.", body: "AZDOME сегодня превысила 200 000 активных устройств в 60+ странах — рубеж, который компания первоначально планировала достичь к 2029 году. CEO Lily Chen связывает ускорение с распространением платформы M530 3 канала среди водителей такси и политикой бесплатных обновлений прошивки в течение 5 лет." },
      { date: "12 января 2026", title: "M530 3 канала начинает поставки партнёрам по такси", excerpt: "Наш дизайн с тремя камерами внедряется у флит-партнёров по всей Северной Америке.", body: "С сегодняшнего дня видеорегистратор AZDOME M530 3 канала является пакетом безопасности по умолчанию для 12 из 25 крупнейших таксопарков США. Программа оптовых продаж включает поддержку сети установщиков, 3-летнюю гарантию и JSON-вебхук интеграции с ведущими телематическими платформами." },
      { date: "28 октября 2025", title: "AZDOME продлевает бесплатные обновления прошивки до 5 лет", excerpt: "Каждая камера, каждая модель, каждый регион — гарантировано письменно.", body: "AZDOME сегодня обязалась предоставлять бесплатные обновления прошивки в течение не менее пяти лет с даты запуска каждой камеры — с обратной силой для всех продуктов, проданных с 2022 года. Обязательство опубликовано как обязывающая политика на странице гарантии компании." },
    ],
    coverage: EN.coverage,
    quotes: [
      { quote: "AZDOME тихо стала брендом, с которым нужно считаться в этой ценовой категории. Ночная съёмка реально на уровне лучших в классе.", outlet: "The Verge" },
      { quote: "Если ваша единственная претензия — что больше брендов должны заботиться о поддержке прошивок — AZDOME это ответ.", outlet: "Wired" },
      { quote: "Пятилетнее обязательство по прошивкам, в письменном виде, в этой категории неслыханно.", outlet: "CNET" },
    ],
    kit: [
      { iconName: "Palette", title: "Брендбук (логотипы, цвета, шрифты)", detail: "AI/SVG/PNG · 12 МБ" },
      { iconName: "ImageIcon", title: "Продуктовая фотосъёмка", detail: "Полное разрешение, web + print · 240 МБ" },
      { iconName: "FileText", title: "Факт-лист и био руководителей", detail: "PDF · 1,2 МБ" },
    ],
  },
  pl: {
    releases: [
      { date: "4 kwietnia 2026", title: "AZDOME wprowadza M550 Pro z matrycą Sony Starvis 2", excerpt: "Prawdziwe 4K z nową generacją matrycy do słabego światła — najważniejsza modernizacja naszej flagowej linii.", body: "AZDOME ogłasza dziś M550 Pro — dwukanałową kamerę 4K opartą na matrycy Sony Starvis 2 IMX678 i obiektywie f/1.55. Niezależne testy w słabym świetle plasują ją 1,2 EV za najlepszymi kamerami automotive — w mniej więcej połowie ceny. M550 Pro ma Wi-Fi 5 GHz dwuzakresowe, GPS i ADAS na urządzeniu, dostępna od dziś na azdome.com za $129,99, w głównych sklepach US od początku maja." },
      { date: "18 lutego 2026", title: "AZDOME przekracza 200 000 chronionych kierowców na świecie", excerpt: "Dwieście tysięcy zainstalowanych kamer, trzy lata przed wewnętrzną prognozą.", body: "AZDOME przekroczyła dziś 200 000 aktywnych jednostek w ponad 60 krajach — kamień milowy pierwotnie planowany na 2029 rok. CEO Lily Chen przypisuje przyspieszenie adopcji platformy M530 3-kanałowej wśród kierowców przewozów i polityce 5-letnich darmowych aktualizacji firmware." },
      { date: "12 stycznia 2026", title: "M530 3-Channel zaczyna wysyłki do partnerów przewozów", excerpt: "Nasz design z trzema kamerami trafia do partnerów flotowych w Ameryce Płn.", body: "Od dziś kamera AZDOME M530 3-kanałowa jest domyślnym pakietem kamery bezpieczeństwa dla 12 z 25 największych spółdzielni przewozów w USA. Program hurtowy obejmuje wsparcie sieci instalatorów, 3-letnią gwarancję i integracje JSON-webhook z czołowymi platformami telematycznymi." },
      { date: "28 października 2025", title: "AZDOME wydłuża darmowe aktualizacje firmware do 5 lat", excerpt: "Każda kamera, każdy model, każdy region — zagwarantowane na piśmie.", body: "AZDOME zobowiązała się dziś do dostarczania darmowych aktualizacji firmware przez co najmniej pięć lat od daty premiery każdej kamery — wstecznie dla wszystkich produktów sprzedanych od 2022. Zobowiązanie opublikowano jako wiążącą politykę na stronie gwarancyjnej firmy." },
    ],
    coverage: EN.coverage,
    quotes: [
      { quote: "AZDOME po cichu stała się marką do pobicia w tej cenie. Nagrania nocne to faktycznie szczyt swojej klasy.", outlet: "The Verge" },
      { quote: "Jeśli twoja jedyna skarga to życzenie, by więcej marek dbało o wsparcie firmware — AZDOME jest odpowiedzią.", outlet: "Wired" },
      { quote: "Pięcioletnie zobowiązanie firmware, na piśmie, jest niespotykane w tej kategorii.", outlet: "CNET" },
    ],
    kit: [
      { iconName: "Palette", title: "Brand kit (loga, kolory, typografia)", detail: "AI/SVG/PNG · 12 MB" },
      { iconName: "ImageIcon", title: "Fotografia produktu", detail: "Pełna rozdzielczość, web + druk · 240 MB" },
      { iconName: "FileText", title: "Fact sheet i bios kadry", detail: "PDF · 1,2 MB" },
    ],
  },
  ro: {
    releases: [
      { date: "4 aprilie 2026", title: "AZDOME lansează M550 Pro cu senzorul Sony Starvis 2", excerpt: "4K real cu noua generație de senzor pentru lumină slabă — cel mai semnificativ upgrade al liniei noastre principale.", body: "AZDOME anunță astăzi M550 Pro, o cameră auto 4K dual-channel construită în jurul senzorului Sony Starvis 2 IMX678 și unei diafragme f/1.55. Testele independente în lumină slabă o plasează la 1,2 trepte de cele mai bune camere auto de pe piață — la aproximativ jumătate de preț. M550 Pro vine cu Wi-Fi dual-band 5 GHz, GPS și ADAS on-device, disponibilă astăzi pe azdome.com la $129,99 și la principalii retaileri US la începutul lui mai." },
      { date: "18 februarie 2026", title: "AZDOME depășește 200.000 de șoferi protejați la nivel mondial", excerpt: "Două sute de mii de camere instalate, cu trei ani înaintea proiecției interne.", body: "AZDOME a depășit astăzi 200.000 de unități active în peste 60 de țări — o bornă pe care compania o proiectase inițial pentru 2029. CEO Lily Chen atribuie accelerația adopției platformei M530 3-canale printre șoferii ride-share și politicii de actualizări firmware gratuite pe 5 ani." },
      { date: "12 ianuarie 2026", title: "M530 3-Channel începe livrarea către partenerii ride-share", excerpt: "Designul cu trei camere se distribuie la partenerii de flote din America de Nord.", body: "Începând de astăzi, camera M530 3-canale a AZDOME este pachetul de cameră de siguranță implicit pentru 12 din cele mai mari 25 cooperative ride-share din SUA. Programul wholesale include suport pentru rețeaua de instalatori, garanție 3 ani și integrări JSON-webhook cu principalele platforme telematice." },
      { date: "28 octombrie 2025", title: "AZDOME extinde actualizările firmware gratuite la 5 ani", excerpt: "Fiecare cameră, fiecare model, fiecare regiune — garantat în scris.", body: "AZDOME s-a angajat astăzi să furnizeze actualizări firmware gratuite timp de cel puțin cinci ani de la data lansării fiecărei camere, retroactiv pentru toate produsele vândute din 2022. Angajamentul este publicat ca politică obligatorie pe pagina de garanție a companiei." },
    ],
    coverage: EN.coverage,
    quotes: [
      { quote: "AZDOME a devenit în liniște brandul de bătut la acest preț. Filmările de noapte sunt cu adevărat în top.", outlet: "The Verge" },
      { quote: "Dacă singura plângere este că ai vrea ca mai multe branduri să țină la suportul firmware — AZDOME e răspunsul.", outlet: "Wired" },
      { quote: "Un angajament firmware de cinci ani, în scris, este fără precedent în această categorie.", outlet: "CNET" },
    ],
    kit: [
      { iconName: "Palette", title: "Brand kit (logo-uri, culori, tipografie)", detail: "AI/SVG/PNG · 12 MB" },
      { iconName: "ImageIcon", title: "Fotografie de produs", detail: "Rezoluție completă, web + print · 240 MB" },
      { iconName: "FileText", title: "Fișă informativă și biografii executivi", detail: "PDF · 1,2 MB" },
    ],
  },
  tr: {
    releases: [
      { date: "4 Nisan 2026", title: "AZDOME, Sony Starvis 2 sensörlü M550 Pro'yu piyasaya sürüyor", excerpt: "Yeni nesil düşük ışık sensörlü gerçek 4K — amiral gemisi serimizdeki en önemli yükseltme.", body: "AZDOME bugün, Sony Starvis 2 IMX678 sensörü ve f/1.55 diyaframlı 4K çift kanal araç kamerası M550 Pro'yu duyurdu. Bağımsız düşük ışık testleri onu pazardaki en iyi otomotiv kameralarının 1,2 stop yakınında konumlandırıyor — yaklaşık yarı fiyata. M550 Pro çift bant 5 GHz Wi-Fi, GPS ve cihaz üstü ADAS ile geliyor, bugünden azdome.com'da $129,99'a, mayıs başında büyük ABD perakendecilerde satışta." },
      { date: "18 Şubat 2026", title: "AZDOME dünya çapında 200.000 korunan sürücü eşiğini aştı", excerpt: "İki yüz bin araç kamerası kuruldu, dahili tahminden üç yıl önce.", body: "AZDOME bugün 60'tan fazla ülkede 200.000 aktif birimi aştı — şirketin başlangıçta 2029 için öngördüğü bir kilometre taşı. CEO Lily Chen, hızlanmayı M530 3 kanal platformunun yolcu taşıma sürücüleri arasında benimsenmesine ve 5 yıllık ücretsiz firmware güncelleme politikasına bağlıyor." },
      { date: "12 Ocak 2026", title: "M530 3-Channel yolcu taşıma ortaklarına sevkiyata başlıyor", excerpt: "Üç kameralı tasarımımız Kuzey Amerika'daki filo ortaklarına yayılıyor.", body: "Bugünden itibaren AZDOME M530 3 kanal araç kamerası, en büyük 25 ABD yolcu taşıma kooperatifinin 12'si için varsayılan güvenlik kamerası paketidir. Toptan satış programı, kurulum ağı desteği, 3 yıl garanti ve başlıca telematik platformlarıyla JSON-webhook entegrasyonlarını içerir." },
      { date: "28 Ekim 2025", title: "AZDOME ücretsiz firmware güncellemelerini 5 yıla uzatıyor", excerpt: "Her kamera, her model, her bölge — yazılı garantili.", body: "AZDOME bugün, her kamera için lansman tarihinden itibaren en az beş yıl ücretsiz firmware güncellemeleri sağlamayı taahhüt etti — 2022'den beri satılan tüm ürünlere geriye dönük olarak. Taahhüt, şirketin garanti sayfasında bağlayıcı bir politika olarak yayımlandı." },
    ],
    coverage: EN.coverage,
    quotes: [
      { quote: "AZDOME bu fiyat noktasında yenilmesi gereken marka haline sessizce geldi. Gece görüntüleri gerçekten sınıfının lideri.", outlet: "The Verge" },
      { quote: "Tek şikayetin daha çok markanın firmware desteğini önemsemesini istemekse — AZDOME yanıt.", outlet: "Wired" },
      { quote: "Yazılı beş yıllık firmware taahhüdü bu kategoride duyulmamış.", outlet: "CNET" },
    ],
    kit: [
      { iconName: "Palette", title: "Marka kiti (logolar, renkler, tipografi)", detail: "AI/SVG/PNG · 12 MB" },
      { iconName: "ImageIcon", title: "Ürün fotoğrafçılığı", detail: "Tam çözünürlük, web + baskı · 240 MB" },
      { iconName: "FileText", title: "Künye ve yönetici biyografileri", detail: "PDF · 1,2 MB" },
    ],
  },
  pt: {
    releases: [
      { date: "4 de abril de 2026", title: "AZDOME lança M550 Pro com sensor Sony Starvis 2", excerpt: "4K real com a nova geração de sensor de baixa luz — o upgrade mais significativo da nossa linha principal.", body: "A AZDOME anuncia hoje a M550 Pro, câmera veicular 4K dual-channel construída em torno do sensor Sony Starvis 2 IMX678 e lente com abertura f/1.55. Testes independentes em baixa luz a colocam dentro de 1,2 stops das melhores câmeras automotivas do mercado — por aproximadamente metade do preço. A M550 Pro vem com Wi-Fi 5 GHz dual-band, GPS e ADAS on-device, disponível hoje em azdome.com por $129,99 e nos principais varejistas dos EUA no início de maio." },
      { date: "18 de fevereiro de 2026", title: "AZDOME ultrapassa 200.000 motoristas protegidos no mundo", excerpt: "Duzentas mil câmeras instaladas, três anos à frente da projeção interna.", body: "A AZDOME ultrapassou hoje 200.000 unidades ativas em mais de 60 países — marco que a empresa havia projetado originalmente para 2029. A CEO Lily Chen atribui a aceleração à adoção da plataforma M530 3 canais entre motoristas de app e à política de atualizações de firmware gratuitas por 5 anos." },
      { date: "12 de janeiro de 2026", title: "M530 3-Channel começa a ser entregue a parceiros de app de motorista", excerpt: "Nosso design de três câmeras está sendo implantado em parceiros de frota na América do Norte.", body: "A partir de hoje, a câmera veicular M530 3 canais da AZDOME é o pacote padrão de câmera de segurança para 12 das 25 maiores cooperativas de motorista de app dos EUA. O programa atacado inclui suporte de rede de instaladores, garantia de 3 anos e integrações JSON-webhook com as principais plataformas telemáticas." },
      { date: "28 de outubro de 2025", title: "AZDOME estende atualizações de firmware grátis para 5 anos", excerpt: "Cada câmera, cada modelo, cada região — garantido por escrito.", body: "A AZDOME se comprometeu hoje a fornecer atualizações de firmware grátis por pelo menos cinco anos a partir da data de lançamento de cada câmera, retroativo a todos os produtos vendidos desde 2022. O compromisso é publicado como política vinculante na página de garantia da empresa." },
    ],
    coverage: EN.coverage,
    quotes: [
      { quote: "A AZDOME se tornou silenciosamente a marca a ser batida neste preço. As filmagens noturnas são realmente líderes da classe.", outlet: "The Verge" },
      { quote: "Se sua única reclamação é desejar que mais marcas se importem com suporte de firmware — a AZDOME é a resposta.", outlet: "Wired" },
      { quote: "Um compromisso de firmware de cinco anos, por escrito, é inédito nesta categoria.", outlet: "CNET" },
    ],
    kit: [
      { iconName: "Palette", title: "Brand kit (logos, cores, tipografia)", detail: "AI/SVG/PNG · 12 MB" },
      { iconName: "ImageIcon", title: "Fotografia de produto", detail: "Resolução total, web + impressão · 240 MB" },
      { iconName: "FileText", title: "Fact sheet e biografias de executivos", detail: "PDF · 1,2 MB" },
    ],
  },
  ar: {
    releases: [
      { date: "4 أبريل 2026", title: "AZDOME تطلق M550 Pro بمستشعر Sony Starvis 2", excerpt: "4K حقيقي مع الجيل الجديد من مستشعر الإضاءة المنخفضة — أهم ترقية في خط منتجاتنا الرئيسي.", body: "أعلنت AZDOME اليوم عن M550 Pro، كاميرا سيارة 4K بقناتين مبنية حول مستشعر Sony Starvis 2 IMX678 وفتحة عدسة f/1.55. تضعها الاختبارات المستقلة في الإضاءة المنخفضة على بعد 1.2 ستوب من أفضل كاميرات السيارات في السوق — وبنحو نصف السعر. تأتي M550 Pro مع Wi-Fi 5GHz ثنائي النطاق و GPS ونظام ADAS على الجهاز، متاحة اليوم على azdome.com بسعر $129.99 وعند كبار تجار التجزئة في الولايات المتحدة في بداية مايو." },
      { date: "18 فبراير 2026", title: "AZDOME تتجاوز 200,000 سائق محمي حول العالم", excerpt: "مائتا ألف كاميرا سيارة مثبتة، قبل ثلاث سنوات من التوقع الداخلي.", body: "تجاوزت AZDOME اليوم 200,000 وحدة نشطة في أكثر من 60 دولة — معلَم كانت الشركة قد توقعته في الأصل لعام 2029. تعزو الرئيسة التنفيذية Lily Chen هذا التسارع إلى اعتماد منصة M530 ثلاثية القنوات بين سائقي خدمات النقل وسياسة تحديثات البرنامج الثابت المجانية لمدة 5 سنوات." },
      { date: "12 يناير 2026", title: "بدء شحن M530 ثلاثية القنوات لشركاء النقل", excerpt: "تصميمنا بثلاث كاميرات يتم نشره لشركاء الأساطيل في أمريكا الشمالية.", body: "اعتبارًا من اليوم، كاميرا AZDOME M530 ثلاثية القنوات هي حزمة كاميرا السلامة الافتراضية لـ 12 من أكبر 25 تعاونية نقل ركاب في الولايات المتحدة. يتضمن برنامج الجملة دعم شبكة المثبتين، وضمان 3 سنوات، وتكاملات JSON-webhook مع منصات التليماتيك الكبرى." },
      { date: "28 أكتوبر 2025", title: "AZDOME تمدد تحديثات البرنامج الثابت المجانية إلى 5 سنوات", excerpt: "كل كاميرا، كل طراز، كل منطقة — مضمون كتابيًا.", body: "التزمت AZDOME اليوم بتوفير تحديثات برنامج ثابت مجانية لمدة لا تقل عن خمس سنوات من تاريخ إطلاق كل كاميرا، بأثر رجعي على جميع المنتجات المباعة منذ 2022. الالتزام منشور كسياسة ملزمة على صفحة الضمان الخاصة بالشركة." },
    ],
    coverage: EN.coverage,
    quotes: [
      { quote: "أصبحت AZDOME بهدوء العلامة التي يجب التغلب عليها في هذه الفئة السعرية. التصوير الليلي رائد فعلًا في فئته.", outlet: "The Verge" },
      { quote: "إذا كانت شكواك الوحيدة هي رغبتك في أن تهتم المزيد من العلامات بدعم البرنامج الثابت — فإن AZDOME هي الإجابة.", outlet: "Wired" },
      { quote: "التزام بتحديثات البرنامج الثابت لخمس سنوات، كتابيًا، أمر غير مسبوق في هذه الفئة.", outlet: "CNET" },
    ],
    kit: [
      { iconName: "Palette", title: "حقيبة العلامة (شعارات، ألوان، خطوط)", detail: "AI/SVG/PNG · 12 ميغابايت" },
      { iconName: "ImageIcon", title: "تصوير المنتجات", detail: "بدقة كاملة، ويب + طباعة · 240 ميغابايت" },
      { iconName: "FileText", title: "ورقة معلومات وسير ذاتية للمسؤولين", detail: "PDF · 1.2 ميغابايت" },
    ],
  },
  th: {
    releases: [
      { date: "4 เมษายน 2026", title: "AZDOME เปิดตัว M550 Pro พร้อมเซ็นเซอร์ Sony Starvis 2", excerpt: "4K แท้ด้วยเซ็นเซอร์รุ่นใหม่ในที่แสงน้อย — การอัปเกรดที่สำคัญที่สุดในไลน์เรือธงของเรา", body: "AZDOME ประกาศวันนี้เปิดตัว M550 Pro กล้องติดรถยนต์ 4K สองช่องที่สร้างขึ้นรอบเซ็นเซอร์ Sony Starvis 2 IMX678 และเลนส์รูรับแสง f/1.55 การทดสอบที่แสงน้อยโดยอิสระระบุว่าอยู่ในช่วง 1.2 stop จากกล้องยานยนต์ที่ดีที่สุดในตลาด — ที่ราคาประมาณครึ่ง M550 Pro มาพร้อม Wi-Fi 5GHz dual-band, GPS และ ADAS บนอุปกรณ์ วางจำหน่ายวันนี้บน azdome.com ที่ $129.99 และที่ผู้ค้าปลีกหลักในสหรัฐฯ ต้นเดือนพฤษภาคม" },
      { date: "18 กุมภาพันธ์ 2026", title: "AZDOME ผ่านเกณฑ์ปกป้องผู้ขับขี่ 200,000 รายทั่วโลก", excerpt: "กล้องติดรถยนต์ 200,000 ตัวติดตั้งแล้ว เร็วกว่าประมาณการภายในสามปี", body: "AZDOME ผ่านเครื่องที่ใช้งานจริง 200,000 เครื่องในกว่า 60 ประเทศวันนี้ — เป็นเป้าหมายที่บริษัทคาดการณ์ไว้สำหรับปี 2029 CEO Lily Chen ระบุว่าการเร่งตัวมาจากการนำแพลตฟอร์ม M530 3 ช่องมาใช้กับคนขับ Rideshare และนโยบายอัปเดตเฟิร์มแวร์ฟรี 5 ปี" },
      { date: "12 มกราคม 2026", title: "M530 3-Channel เริ่มส่งมอบให้พันธมิตร Rideshare", excerpt: "ดีไซน์สามกล้องของเรากำลังขยายไปสู่พันธมิตรฟลีททั่วอเมริกาเหนือ", body: "ตั้งแต่วันนี้ กล้องติดรถยนต์ AZDOME M530 3 ช่องเป็นแพ็คเกจกล้องความปลอดภัยมาตรฐานสำหรับ 12 ใน 25 สหกรณ์ Rideshare ใหญ่ที่สุดในสหรัฐฯ โปรแกรมขายส่งรวมการสนับสนุนเครือข่ายผู้ติดตั้ง การรับประกัน 3 ปี และอินทิเกรชัน JSON-webhook กับแพลตฟอร์มเทเลแมติกหลัก" },
      { date: "28 ตุลาคม 2025", title: "AZDOME ขยายการอัปเดตเฟิร์มแวร์ฟรีเป็น 5 ปี", excerpt: "ทุกกล้อง ทุกรุ่น ทุกภูมิภาค — รับประกันเป็นลายลักษณ์อักษร", body: "AZDOME มุ่งมั่นวันนี้ในการให้บริการอัปเดตเฟิร์มแวร์ฟรีอย่างน้อย 5 ปี นับจากวันเปิดตัวกล้องแต่ละตัว ย้อนหลังไปยังผลิตภัณฑ์ทั้งหมดที่ขายตั้งแต่ปี 2022 ข้อผูกพันนี้เผยแพร่เป็นนโยบายผูกพันบนหน้ารับประกันของบริษัท" },
    ],
    coverage: EN.coverage,
    quotes: [
      { quote: "AZDOME ค่อยๆ กลายเป็นแบรนด์ที่ต้องเอาชนะในช่วงราคานี้ ภาพกลางคืนเป็นผู้นำในระดับเดียวกันอย่างแท้จริง", outlet: "The Verge" },
      { quote: "ถ้าข้อบ่นเดียวของคุณคือต้องการให้แบรนด์มากขึ้นใส่ใจการสนับสนุนเฟิร์มแวร์ — AZDOME คือคำตอบ", outlet: "Wired" },
      { quote: "การให้คำมั่นด้านเฟิร์มแวร์ 5 ปีเป็นลายลักษณ์อักษรเป็นสิ่งที่ไม่เคยมีมาก่อนในประเภทนี้", outlet: "CNET" },
    ],
    kit: [
      { iconName: "Palette", title: "ชุดแบรนด์ (โลโก้ สี ตัวอักษร)", detail: "AI/SVG/PNG · 12 MB" },
      { iconName: "ImageIcon", title: "ภาพถ่ายผลิตภัณฑ์", detail: "ความละเอียดเต็ม เว็บ + พิมพ์ · 240 MB" },
      { iconName: "FileText", title: "แฟ้มข้อมูล & ประวัติผู้บริหาร", detail: "PDF · 1.2 MB" },
    ],
  },
  vi: {
    releases: [
      { date: "4 tháng 4, 2026", title: "AZDOME ra mắt M550 Pro với cảm biến Sony Starvis 2", excerpt: "4K thực với thế hệ cảm biến chụp thiếu sáng mới — bản nâng cấp quan trọng nhất trong dòng hàng đầu của chúng tôi.", body: "AZDOME hôm nay công bố M550 Pro, camera hành trình 4K hai kênh xây dựng quanh cảm biến Sony Starvis 2 IMX678 và ống kính khẩu độ f/1.55. Kiểm thử độc lập về thiếu sáng đặt nó trong khoảng 1,2 stop so với những camera ô tô tốt nhất thị trường — với mức giá chỉ khoảng một nửa. M550 Pro đi kèm Wi-Fi 5GHz hai băng tần, GPS và ADAS trên thiết bị, có sẵn hôm nay trên azdome.com với giá $129,99 và tại các nhà bán lẻ lớn tại Mỹ vào đầu tháng 5." },
      { date: "18 tháng 2, 2026", title: "AZDOME vượt mốc 200.000 tài xế được bảo vệ trên toàn cầu", excerpt: "Hai trăm nghìn camera hành trình đã được lắp đặt, sớm hơn dự báo nội bộ ba năm.", body: "AZDOME hôm nay vượt mốc 200.000 thiết bị hoạt động tại hơn 60 quốc gia — cột mốc mà công ty ban đầu dự báo cho năm 2029. CEO Lily Chen quy việc tăng tốc cho việc áp dụng nền tảng M530 ba kênh trong số tài xế xe công nghệ và chính sách cập nhật firmware miễn phí 5 năm của công ty." },
      { date: "12 tháng 1, 2026", title: "M530 ba kênh bắt đầu giao hàng cho đối tác xe công nghệ", excerpt: "Thiết kế ba camera của chúng tôi đang được triển khai cho đối tác đội xe trên khắp Bắc Mỹ.", body: "Có hiệu lực từ hôm nay, camera hành trình M530 ba kênh của AZDOME là gói camera an toàn mặc định cho 12 trong 25 hợp tác xã xe công nghệ lớn nhất của Mỹ. Chương trình bán buôn bao gồm hỗ trợ mạng lưới kỹ thuật viên lắp đặt, bảo hành 3 năm và tích hợp JSON-webhook với các nền tảng telematics lớn." },
      { date: "28 tháng 10, 2025", title: "AZDOME mở rộng cập nhật firmware miễn phí lên 5 năm", excerpt: "Mọi camera, mọi mẫu, mọi khu vực — bảo đảm bằng văn bản.", body: "AZDOME hôm nay cam kết cung cấp các bản cập nhật firmware miễn phí trong ít nhất năm năm kể từ ngày ra mắt của mỗi camera, áp dụng hồi tố cho tất cả sản phẩm bán từ năm 2022. Cam kết được công bố như một chính sách ràng buộc trên trang bảo hành của công ty." },
    ],
    coverage: EN.coverage,
    quotes: [
      { quote: "AZDOME âm thầm trở thành thương hiệu phải vượt qua ở phân khúc giá này. Cảnh quay ban đêm thực sự dẫn đầu phân khúc.", outlet: "The Verge" },
      { quote: "Nếu khiếu nại duy nhất của bạn là muốn có nhiều thương hiệu quan tâm đến hỗ trợ firmware hơn — AZDOME là câu trả lời.", outlet: "Wired" },
      { quote: "Cam kết firmware năm năm, bằng văn bản, là chưa từng có trong phân khúc này.", outlet: "CNET" },
    ],
    kit: [
      { iconName: "Palette", title: "Bộ nhận diện (logo, màu, font)", detail: "AI/SVG/PNG · 12 MB" },
      { iconName: "ImageIcon", title: "Ảnh sản phẩm", detail: "Độ phân giải đầy đủ, web + in · 240 MB" },
      { iconName: "FileText", title: "Tờ thông tin & tiểu sử lãnh đạo", detail: "PDF · 1,2 MB" },
    ],
  },
};

export function getDefaultPress(locale: Locale): PressContent {
  return PRESS_BY_LOCALE[locale] ?? PRESS_BY_LOCALE.en!;
}

export const RELEASES = EN.releases;
export const COVERAGE = EN.coverage;
export const QUOTES = EN.quotes;
export const KIT = EN.kit;

export const PRESS_PAGE: ContentSection<PressContent> = {
  key: "press.page",
  label: "Press 页 · Releases / Coverage / Quotes / Brand Kit",
  description:
    "媒体页:新闻稿、报道、引语、品牌资源下载条目。" +
    `Kit iconName: ${PRESS_KIT_ICONS.join(", ")}`,
  page: "press",
  previewHref: "/press",
  defaults: getDefaultPress,
};
