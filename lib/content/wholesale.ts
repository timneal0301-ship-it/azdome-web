import type { ContentSection } from "./types";
import type { Locale } from "@/lib/i18n/dictionaries";

export const WHOLESALE_BENEFIT_ICONS = ["Package2", "Truck", "ShieldCheck", "Headset", "Wrench", "Building2"] as const;
export const WHOLESALE_VERTICAL_ICONS = ["Briefcase", "Boxes", "Building2"] as const;

export type WholesaleTier = { range: string; discount: string };
export type WholesaleBenefit = { iconName: string; title: string; body: string };
export type WholesaleVertical = { iconName: string; title: string; body: string };
export type WholesaleFAQ = { q: string; a: string };

export type WholesaleContent = {
  tiers: WholesaleTier[];
  benefits: WholesaleBenefit[];
  verticals: WholesaleVertical[];
  faq: WholesaleFAQ[];
};

const EN: WholesaleContent = {
  tiers: [
    { range: "10 – 49 units", discount: "12% off MSRP" },
    { range: "50 – 199 units", discount: "18% off MSRP" },
    { range: "200 – 499 units", discount: "23% off MSRP" },
    { range: "500+ units", discount: "Custom quote" },
  ],
  benefits: [
    { iconName: "Package2", title: "Volume pricing", body: "Tiered discounts from MOQ 10 units, up to negotiated rates for orders of 500+." },
    { iconName: "Truck", title: "Bulk shipping", body: "Free freight on orders over $5,000 to the contiguous US. International quotes within 24h." },
    { iconName: "ShieldCheck", title: "Extended warranty", body: "3-year warranty on all wholesale units (vs. 2 years retail)." },
    { iconName: "Headset", title: "Dedicated account manager", body: "A single human contact who knows your account, your fleet, and your timeline." },
    { iconName: "Wrench", title: "Installation services", body: "Optional white-glove install network across major US metros via our certified-installer partners." },
    { iconName: "Building2", title: "Co-branded packaging", body: "Custom packaging available for fleet partners (MOQ 500). 4–6 week lead time." },
  ],
  verticals: [
    { iconName: "Briefcase", title: "Rideshare & delivery fleets", body: "M530 3-channel cameras are standard issue for 12 of the top 25 US rideshare cooperatives. Driver-portal integrations for incident review available on request." },
    { iconName: "Boxes", title: "Logistics & last-mile", body: "Stealth-mounted M300S deployed in last-mile delivery vehicles across 4 of the largest North American 3PLs. Telematics-system handoffs supported via standard JSON webhooks." },
    { iconName: "Building2", title: "Auto dealerships", body: "Dealer-installed M550 Pro and GS63H as an upsell package on new- and used-vehicle sales. Includes co-branded install certificates and end-customer onboarding emails." },
  ],
  faq: [
    { q: "What's the minimum order quantity?", a: "Our entry-level wholesale tier starts at 10 units across any combination of SKUs. Below that, our retail pricing on azdome.com is your best path." },
    { q: "How long is lead time?", a: "In-stock SKUs ship within 3 business days. Co-branded packaging or custom firmware loads take 4–6 weeks. Large orders (500+) typically ship in 7–10 days from order confirmation." },
    { q: "Do you support international wholesale?", a: "Yes. We ship wholesale to the US, Canada, UK, EU, Australia, and the UAE. Other regions are handled case by case — talk to a specialist about your destination." },
    { q: "What payment terms are available?", a: "First orders are prepaid. After two paid orders, Net-30 terms are available with credit approval. Larger accounts (Fleet 500+) can request Net-45 or Net-60 with line-of-credit setup." },
    { q: "Can I integrate AZDOME with my fleet telematics system?", a: "Yes. We provide a JSON webhook API for incident, GPS, and event data on M530 and M550 Pro. Reference integrations exist for Geotab, Samsara, and Verizon Connect. Our solutions team will help validate your stack." },
    { q: "Do wholesale units come with the same warranty as retail?", a: "Wholesale units get a 3-year warranty (vs. 2 years retail). Out-of-warranty service is available at preferential rates for wholesale partners." },
  ],
};

const WHOLESALE_BY_LOCALE: Partial<Record<Locale, WholesaleContent>> = {
  en: EN,
  zh: {
    tiers: [
      { range: "10 – 49 台", discount: "MSRP 折扣 12%" },
      { range: "50 – 199 台", discount: "MSRP 折扣 18%" },
      { range: "200 – 499 台", discount: "MSRP 折扣 23%" },
      { range: "500+ 台", discount: "一对一定价" },
    ],
    benefits: [
      { iconName: "Package2", title: "批量价", body: "起订 10 台即享阶梯折扣,500+ 台可一对一谈价。" },
      { iconName: "Truck", title: "大批量物流", body: "美国本土订单满 $5,000 免运。海外报价 24 小时内回复。" },
      { iconName: "ShieldCheck", title: "延长保修", body: "批发产品 3 年保修(零售 2 年)。" },
      { iconName: "Headset", title: "专属客户经理", body: "一个真人对接你的账号、车队和时间表。" },
      { iconName: "Wrench", title: "安装服务", body: "在美国主要都市通过认证安装合作伙伴提供白手套式安装服务。" },
      { iconName: "Building2", title: "联名包装", body: "为车队伙伴提供定制包装(起订 500 台),4-6 周交期。" },
    ],
    verticals: [
      { iconName: "Briefcase", title: "网约车 & 外卖车队", body: "M530 三路摄像头是美国前 25 家网约车合作社中 12 家的标配。如需事件审查的司机门户集成,可定制。" },
      { iconName: "Boxes", title: "物流 & 最后一公里", body: "隐藏式 M300S 部署在北美四大 3PL 的最后一公里配送车队中。通过标准 JSON Webhook 对接现有车联网系统。" },
      { iconName: "Building2", title: "汽车经销商", body: "新车/二手车销售时,经销商安装 M550 Pro 与 GS63H 作为加装套餐。含联名安装证书和终端客户上手邮件。" },
    ],
    faq: [
      { q: "最低起订量是多少?", a: "我们入门级批发档起订 10 台,任意 SKU 组合。低于这个数量,建议直接在 azdome.com 走零售价。" },
      { q: "交期多久?", a: "现货 SKU 3 个工作日内发货。联名包装或定制固件需 4-6 周。500+ 台大单一般在确认订单后 7-10 天发货。" },
      { q: "支持海外批发吗?", a: "支持。我们批发覆盖美、加、英、欧盟、澳、阿联酋。其他地区可根据具体情况协商,请联系专员。" },
      { q: "付款条件有哪些?", a: "首单预付。两单付款后,经信用审批可享 Net-30。大客户(500+)经授信线设立后可申请 Net-45 或 Net-60。" },
      { q: "能与我现有的车联网系统集成吗?", a: "可以。M530 和 M550 Pro 提供事件、GPS、事件数据的 JSON Webhook API。已有 Geotab、Samsara、Verizon Connect 参考集成。方案团队会协助验证你的技术栈。" },
      { q: "批发产品保修和零售一样吗?", a: "批发产品 3 年保修(零售 2 年)。过保维修对批发伙伴有优惠价格。" },
    ],
  },
  ja: {
    tiers: [
      { range: "10 – 49 台", discount: "MSRP から 12% 引き" },
      { range: "50 – 199 台", discount: "MSRP から 18% 引き" },
      { range: "200 – 499 台", discount: "MSRP から 23% 引き" },
      { range: "500+ 台", discount: "個別見積もり" },
    ],
    benefits: [
      { iconName: "Package2", title: "ボリューム割引", body: "MOQ 10 台から段階的割引、500+ 台は個別交渉。" },
      { iconName: "Truck", title: "一括配送", body: "米国本土 $5,000 以上で送料無料。海外見積もりは 24 時間以内。" },
      { iconName: "ShieldCheck", title: "延長保証", body: "卸売製品は 3 年保証(小売は 2 年)。" },
      { iconName: "Headset", title: "専任アカウントマネージャー", body: "アカウント・フリート・スケジュールを把握する一人の担当者。" },
      { iconName: "Wrench", title: "取付サービス", body: "認定取付パートナーによる、米国主要都市での白手袋取り付けネットワーク(任意)。" },
      { iconName: "Building2", title: "コブランドパッケージング", body: "フリート向けカスタムパッケージ(MOQ 500)。リードタイム 4-6 週間。" },
    ],
    verticals: [
      { iconName: "Briefcase", title: "ライドシェア & 配達フリート", body: "M530 3 チャンネルカメラは米国上位 25 のライドシェア協同組合のうち 12 社で標準装備。インシデントレビュー用ドライバーポータル統合も対応。" },
      { iconName: "Boxes", title: "物流 & ラストマイル", body: "ステルス取付の M300S を北米最大級 3PL の 4 社のラストマイル配送車両に展開。標準 JSON Webhook でテレマティクス連携可能。" },
      { iconName: "Building2", title: "自動車ディーラー", body: "ディーラー取付の M550 Pro と GS63H を新車・中古車販売時のアップセルとして提供。コブランド取付証明書とエンドユーザーオンボーディングメールを含む。" },
    ],
    faq: [
      { q: "最低発注数量は?", a: "卸売エントリー階層は SKU 組み合わせ 10 台から。それ以下は azdome.com の小売価格をご利用ください。" },
      { q: "リードタイムは?", a: "在庫 SKU は 3 営業日以内発送。コブランドパッケージや独自ファームウェアは 4-6 週間。大口注文(500+)は通常、発注確認から 7-10 日で出荷。" },
      { q: "海外卸売に対応していますか?", a: "はい。米、加、英、EU、豪、UAE に卸売出荷可能。その他地域はケースバイケース — 担当者にお問い合わせください。" },
      { q: "支払い条件は?", a: "初回は前払い。2 回の支払い後、与信審査を経て Net-30 可。大口アカウント(Fleet 500+)はクレジットライン設定後 Net-45 / Net-60 を申請可。" },
      { q: "車載テレマティクスシステムと連携できますか?", a: "可能です。M530 と M550 Pro でインシデント、GPS、イベントデータ用 JSON Webhook API を提供。Geotab、Samsara、Verizon Connect のリファレンス統合あり。ソリューションチームがスタックの検証をサポート。" },
      { q: "卸売品は小売と同じ保証ですか?", a: "卸売品は 3 年保証(小売は 2 年)。保証外サービスは卸売パートナー向け優遇価格で提供。" },
    ],
  },
  de: {
    tiers: [
      { range: "10 – 49 Einheiten", discount: "12% Rabatt auf MSRP" },
      { range: "50 – 199 Einheiten", discount: "18% Rabatt auf MSRP" },
      { range: "200 – 499 Einheiten", discount: "23% Rabatt auf MSRP" },
      { range: "500+ Einheiten", discount: "Individuelles Angebot" },
    ],
    benefits: [
      { iconName: "Package2", title: "Mengenpreise", body: "Gestaffelte Rabatte ab MOQ 10 Einheiten, bis zu verhandelten Sätzen bei 500+ Bestellungen." },
      { iconName: "Truck", title: "Sammelversand", body: "Kostenloser Versand bei Bestellungen über $5.000 in die kontinentalen USA. Internationale Angebote in 24 h." },
      { iconName: "ShieldCheck", title: "Erweiterte Garantie", body: "3 Jahre Garantie auf alle Großhandelseinheiten (statt 2 Jahre Einzelhandel)." },
      { iconName: "Headset", title: "Dedizierter Account Manager", body: "Ein einziger Ansprechpartner, der Ihr Konto, Ihre Flotte und Ihren Zeitplan kennt." },
      { iconName: "Wrench", title: "Installationsservices", body: "Optionales White-Glove-Installationsnetzwerk in großen US-Metropolen über unsere zertifizierten Partner." },
      { iconName: "Building2", title: "Co-Branded-Verpackung", body: "Custom-Verpackung für Flottenpartner (MOQ 500). Vorlaufzeit 4-6 Wochen." },
    ],
    verticals: [
      { iconName: "Briefcase", title: "Ride-Share- & Lieferflotten", body: "Die 3-Kanal-Kamera M530 ist Standard bei 12 der 25 größten US-Rideshare-Kooperativen. Driver-Portal-Integrationen für Incident Review auf Anfrage." },
      { iconName: "Boxes", title: "Logistik & Last-Mile", body: "Unauffällig montierte M300S im Einsatz in den Last-Mile-Lieferfahrzeugen von 4 der größten nordamerikanischen 3PLs. Telematik-Übergaben via Standard-JSON-Webhooks." },
      { iconName: "Building2", title: "Autohäuser", body: "Händler-installierte M550 Pro und GS63H als Upsell beim Neu- und Gebrauchtwagenverkauf. Inkl. Co-Branded-Installationsnachweisen und Onboarding-E-Mails." },
    ],
    faq: [
      { q: "Wie hoch ist die Mindestabnahme?", a: "Unser Wholesale-Einstieg beginnt bei 10 Einheiten in beliebiger SKU-Kombination. Darunter ist unser Retail-Preis auf azdome.com die beste Option." },
      { q: "Wie lange ist die Lieferzeit?", a: "Lagerware versandt innerhalb von 3 Werktagen. Co-Branded-Verpackung oder Custom-Firmware 4-6 Wochen. Großaufträge (500+) typischerweise 7-10 Tage ab Bestätigung." },
      { q: "Unterstützen Sie internationalen Großhandel?", a: "Ja. Wholesale-Versand in USA, Kanada, UK, EU, Australien und VAE. Andere Regionen case-by-case — sprechen Sie mit einem Spezialisten." },
      { q: "Welche Zahlungsbedingungen gibt es?", a: "Erste Bestellungen vorausbezahlt. Nach zwei bezahlten Bestellungen Net-30 mit Kreditprüfung. Größere Accounts (Fleet 500+) können Net-45 / Net-60 mit Kreditlinie beantragen." },
      { q: "Kann ich AZDOME mit meiner Flotten-Telematik integrieren?", a: "Ja. JSON-Webhook-API für Incident, GPS und Event-Daten auf M530 und M550 Pro. Referenzintegrationen für Geotab, Samsara und Verizon Connect. Unser Solutions-Team validiert Ihren Stack." },
      { q: "Gilt für Großhandelseinheiten dieselbe Garantie wie für den Einzelhandel?", a: "Großhandelseinheiten erhalten 3 Jahre Garantie (Einzelhandel 2 Jahre). Out-of-Warranty-Service zu Vorzugskonditionen für Wholesale-Partner." },
    ],
  },
  fr: {
    tiers: [
      { range: "10 – 49 unités", discount: "12% sur le MSRP" },
      { range: "50 – 199 unités", discount: "18% sur le MSRP" },
      { range: "200 – 499 unités", discount: "23% sur le MSRP" },
      { range: "500+ unités", discount: "Devis sur mesure" },
    ],
    benefits: [
      { iconName: "Package2", title: "Tarif volume", body: "Remises par paliers dès une MOQ de 10 unités, jusqu'à des tarifs négociés pour les commandes de 500+." },
      { iconName: "Truck", title: "Expédition en gros", body: "Fret gratuit pour les commandes de plus de 5 000 $ aux États-Unis continentaux. Devis internationaux sous 24 h." },
      { iconName: "ShieldCheck", title: "Garantie étendue", body: "3 ans de garantie sur toutes les unités wholesale (vs 2 ans en retail)." },
      { iconName: "Headset", title: "Account manager dédié", body: "Un contact unique qui connaît votre compte, votre flotte et votre planning." },
      { iconName: "Wrench", title: "Services d'installation", body: "Réseau d'installateurs certifiés dans les grandes métropoles US (option white-glove)." },
      { iconName: "Building2", title: "Emballage co-marqué", body: "Emballage personnalisé pour partenaires flottes (MOQ 500). Délai 4-6 semaines." },
    ],
    verticals: [
      { iconName: "Briefcase", title: "Flottes VTC & livraison", body: "Les caméras 3 canaux M530 sont standard dans 12 des 25 plus grandes coopératives VTC US. Intégrations driver-portal pour incident review sur demande." },
      { iconName: "Boxes", title: "Logistique & last-mile", body: "M300S à montage discret déployés dans les véhicules last-mile de 4 des plus grands 3PL nord-américains. Liaisons télématiques via webhooks JSON standard." },
      { iconName: "Building2", title: "Concessionnaires auto", body: "M550 Pro et GS63H installés par les concessions en upsell sur véhicules neufs et d'occasion. Inclut certificats d'installation co-marqués et e-mails d'onboarding clients." },
    ],
    faq: [
      { q: "Quelle est la quantité minimum de commande ?", a: "Notre palier wholesale d'entrée commence à 10 unités toutes SKU confondues. En dessous, notre prix retail sur azdome.com est la meilleure option." },
      { q: "Quel est le délai ?", a: "SKUs en stock expédiés sous 3 jours ouvrés. Emballage co-marqué ou firmware custom : 4-6 semaines. Gros volumes (500+) typiquement 7-10 jours après confirmation." },
      { q: "Faites-vous du wholesale international ?", a: "Oui. Wholesale vers US, Canada, Royaume-Uni, UE, Australie et EAU. Autres régions au cas par cas — contactez un spécialiste." },
      { q: "Quels sont les délais de paiement ?", a: "Premières commandes prépayées. Après deux commandes payées, Net-30 avec validation crédit. Grands comptes (Fleet 500+) peuvent demander Net-45/Net-60 avec ligne de crédit." },
      { q: "Puis-je intégrer AZDOME à mon télématique flotte ?", a: "Oui. API webhook JSON pour incidents, GPS et événements sur M530 et M550 Pro. Intégrations de référence pour Geotab, Samsara et Verizon Connect. Notre équipe solutions valide votre stack." },
      { q: "Les unités wholesale ont-elles la même garantie qu'en retail ?", a: "Les unités wholesale ont une garantie de 3 ans (vs 2 ans retail). Service hors garantie à tarif préférentiel pour les partenaires wholesale." },
    ],
  },
  es: {
    tiers: [
      { range: "10 – 49 unidades", discount: "12% sobre PVP" },
      { range: "50 – 199 unidades", discount: "18% sobre PVP" },
      { range: "200 – 499 unidades", discount: "23% sobre PVP" },
      { range: "500+ unidades", discount: "Presupuesto personalizado" },
    ],
    benefits: [
      { iconName: "Package2", title: "Precio por volumen", body: "Descuentos por tramos desde MOQ 10 unidades, hasta tarifas negociadas en pedidos de 500+." },
      { iconName: "Truck", title: "Envío masivo", body: "Flete gratis en pedidos superiores a $5.000 a EE.UU. continental. Cotizaciones internacionales en 24h." },
      { iconName: "ShieldCheck", title: "Garantía extendida", body: "3 años de garantía en todas las unidades wholesale (vs. 2 años en retail)." },
      { iconName: "Headset", title: "Account manager dedicado", body: "Un único contacto humano que conoce tu cuenta, tu flota y tu calendario." },
      { iconName: "Wrench", title: "Servicios de instalación", body: "Red opcional de instalación white-glove en grandes metrópolis US a través de nuestros instaladores certificados." },
      { iconName: "Building2", title: "Embalaje co-brand", body: "Embalaje personalizado para partners de flotas (MOQ 500). Plazo 4-6 semanas." },
    ],
    verticals: [
      { iconName: "Briefcase", title: "Flotas VTC & reparto", body: "Las cámaras 3 canales M530 son estándar en 12 de las 25 mayores cooperativas VTC de EE.UU. Integraciones de portal del conductor para revisión de incidentes bajo petición." },
      { iconName: "Boxes", title: "Logística & última milla", body: "M300S de montaje discreto desplegado en vehículos de última milla de 4 de los mayores 3PL de Norteamérica. Handoffs telemáticos vía JSON webhooks estándar." },
      { iconName: "Building2", title: "Concesionarios", body: "M550 Pro y GS63H instalados por concesionarios como upsell en ventas de coche nuevo y usado. Incluye certificados de instalación co-brand y emails de onboarding al cliente final." },
    ],
    faq: [
      { q: "¿Cuál es el pedido mínimo?", a: "Nuestro tramo wholesale de entrada empieza en 10 unidades combinando cualquier SKU. Por debajo, nuestro precio retail en azdome.com es lo mejor." },
      { q: "¿Cuál es el plazo de entrega?", a: "SKUs en stock se envían en 3 días laborables. Embalaje co-brand o firmware custom 4-6 semanas. Pedidos grandes (500+) suelen enviarse en 7-10 días desde la confirmación." },
      { q: "¿Hacéis wholesale internacional?", a: "Sí. Enviamos wholesale a EE.UU., Canadá, Reino Unido, UE, Australia y EAU. Otras regiones caso por caso — habla con un especialista." },
      { q: "¿Qué condiciones de pago hay?", a: "Primeros pedidos prepagados. Tras dos pedidos pagados, Net-30 con aprobación crediticia. Cuentas grandes (Fleet 500+) pueden solicitar Net-45/Net-60 con línea de crédito." },
      { q: "¿Puedo integrar AZDOME con mi sistema telemático?", a: "Sí. API JSON webhook para datos de incidente, GPS y eventos en M530 y M550 Pro. Integraciones de referencia para Geotab, Samsara y Verizon Connect. Nuestro equipo de soluciones valida tu stack." },
      { q: "¿Las unidades wholesale tienen la misma garantía que las retail?", a: "Las unidades wholesale tienen 3 años de garantía (vs. 2 retail). Servicio fuera de garantía con tarifas preferentes para partners wholesale." },
    ],
  },
  it: {
    tiers: [
      { range: "10 – 49 unità", discount: "12% sul MSRP" },
      { range: "50 – 199 unità", discount: "18% sul MSRP" },
      { range: "200 – 499 unità", discount: "23% sul MSRP" },
      { range: "500+ unità", discount: "Preventivo personalizzato" },
    ],
    benefits: [
      { iconName: "Package2", title: "Prezzo a volume", body: "Sconti a fasce da MOQ 10 unità, fino a tariffe negoziate per ordini di 500+." },
      { iconName: "Truck", title: "Spedizione massiva", body: "Trasporto gratuito su ordini oltre $5.000 negli USA continentali. Preventivi internazionali entro 24h." },
      { iconName: "ShieldCheck", title: "Garanzia estesa", body: "3 anni di garanzia su tutte le unità wholesale (vs. 2 anni retail)." },
      { iconName: "Headset", title: "Account manager dedicato", body: "Un solo contatto umano che conosce il tuo account, la tua flotta e la tua tempistica." },
      { iconName: "Wrench", title: "Servizi di installazione", body: "Rete opzionale di installatori certificati nelle grandi metropoli US (white-glove)." },
      { iconName: "Building2", title: "Packaging co-brand", body: "Packaging personalizzato per partner flotte (MOQ 500). Lead time 4-6 settimane." },
    ],
    verticals: [
      { iconName: "Briefcase", title: "Flotte ride-share & consegne", body: "Le telecamere 3 canali M530 sono standard in 12 delle 25 maggiori cooperative ride-share USA. Integrazioni driver-portal per incident review su richiesta." },
      { iconName: "Boxes", title: "Logistica & last-mile", body: "M300S montaggio discreto, schierati nei veicoli last-mile di 4 dei maggiori 3PL nordamericani. Handoff telematici via webhook JSON standard." },
      { iconName: "Building2", title: "Concessionari auto", body: "M550 Pro e GS63H installati dal concessionario come upsell su vetture nuove e usate. Include certificati installazione co-brand ed email onboarding cliente finale." },
    ],
    faq: [
      { q: "Qual è l'ordine minimo?", a: "La nostra fascia wholesale d'ingresso parte da 10 unità in qualsiasi combinazione di SKU. Sotto, il prezzo retail su azdome.com è la scelta migliore." },
      { q: "Quanto è il lead time?", a: "SKU a magazzino spediti entro 3 giorni lavorativi. Packaging co-brand o firmware custom 4-6 settimane. Ordini grandi (500+) tipicamente 7-10 giorni dalla conferma." },
      { q: "Fate wholesale internazionale?", a: "Sì. Wholesale in USA, Canada, UK, UE, Australia e EAU. Altre regioni caso per caso — parla con uno specialista." },
      { q: "Quali condizioni di pagamento offrite?", a: "Primi ordini prepagati. Dopo due ordini saldati, Net-30 con approvazione fido. Grandi account (Fleet 500+) possono richiedere Net-45/Net-60 con linea di credito." },
      { q: "Posso integrare AZDOME con la mia telematica?", a: "Sì. API webhook JSON per dati di incident, GPS ed event su M530 e M550 Pro. Integrazioni reference per Geotab, Samsara e Verizon Connect. Il team solutions valida il tuo stack." },
      { q: "Le unità wholesale hanno la stessa garanzia di quelle retail?", a: "Le unità wholesale hanno 3 anni di garanzia (vs. 2 anni retail). Servizio fuori garanzia a tariffe agevolate per partner wholesale." },
    ],
  },
  ru: {
    tiers: [
      { range: "10 – 49 шт.", discount: "12% от MSRP" },
      { range: "50 – 199 шт.", discount: "18% от MSRP" },
      { range: "200 – 499 шт.", discount: "23% от MSRP" },
      { range: "500+ шт.", discount: "Индивидуальный расчёт" },
    ],
    benefits: [
      { iconName: "Package2", title: "Объёмные цены", body: "Многоуровневые скидки от MOQ 10 шт., до согласованных тарифов для заказов 500+." },
      { iconName: "Truck", title: "Оптовая доставка", body: "Бесплатная отгрузка по континентальным США при заказе от $5 000. Международные расчёты в течение 24 часов." },
      { iconName: "ShieldCheck", title: "Расширенная гарантия", body: "3 года гарантии на все оптовые позиции (против 2 лет в рознице)." },
      { iconName: "Headset", title: "Персональный менеджер", body: "Один контакт, знающий ваш аккаунт, парк и сроки." },
      { iconName: "Wrench", title: "Услуги установки", body: "Опциональная сеть white-glove установки в крупных городах США через наших сертифицированных партнёров." },
      { iconName: "Building2", title: "Кобренд-упаковка", body: "Кастомная упаковка для флит-партнёров (MOQ 500). Срок 4-6 недель." },
    ],
    verticals: [
      { iconName: "Briefcase", title: "Парки такси и доставки", body: "Камеры M530 с 3 каналами — стандарт в 12 из 25 крупнейших таксопарков США. Интеграция с порталом водителя для разбора инцидентов по запросу." },
      { iconName: "Boxes", title: "Логистика и last-mile", body: "Скрытно установленные M300S в last-mile парках 4 крупнейших 3PL Северной Америки. Передача данных в телематику через стандартные JSON-вебхуки." },
      { iconName: "Building2", title: "Автодилеры", body: "M550 Pro и GS63H устанавливаются дилером как апсейл при продаже новых и б/у авто. Включает кобренд-сертификаты и онбординг-письма клиенту." },
    ],
    faq: [
      { q: "Какой минимальный заказ?", a: "Стартовый оптовый уровень — от 10 единиц в любой комбинации SKU. Ниже — лучше брать по рознице на azdome.com." },
      { q: "Каков срок поставки?", a: "SKU в наличии отгружаются в течение 3 рабочих дней. Кобренд-упаковка или кастомная прошивка — 4-6 недель. Большие заказы (500+) обычно за 7-10 дней с подтверждения." },
      { q: "Делаете ли международный опт?", a: "Да. Оптовая отгрузка в США, Канаду, Великобританию, ЕС, Австралию и ОАЭ. Другие регионы — индивидуально, обратитесь к специалисту." },
      { q: "Какие условия оплаты?", a: "Первые заказы — предоплата. После двух оплаченных заказов доступен Net-30 с одобрением кредита. Крупные клиенты (Fleet 500+) могут запросить Net-45/Net-60 с открытием кредитной линии." },
      { q: "Можно интегрировать AZDOME с моей телематикой?", a: "Да. JSON-вебхук API для инцидентов, GPS и событийных данных на M530 и M550 Pro. Готовые интеграции для Geotab, Samsara и Verizon Connect. Команда решений поможет с валидацией." },
      { q: "У опта та же гарантия, что и у розницы?", a: "Опт получает 3-летнюю гарантию (розница — 2). Послегарантийный сервис по льготным тарифам для оптовых партнёров." },
    ],
  },
  pl: {
    tiers: [
      { range: "10 – 49 sztuk", discount: "12% rabatu od MSRP" },
      { range: "50 – 199 sztuk", discount: "18% rabatu od MSRP" },
      { range: "200 – 499 sztuk", discount: "23% rabatu od MSRP" },
      { range: "500+ sztuk", discount: "Indywidualna wycena" },
    ],
    benefits: [
      { iconName: "Package2", title: "Cena hurtowa", body: "Rabaty stopniowane od MOQ 10 sztuk, do negocjowanych stawek przy 500+ zamówień." },
      { iconName: "Truck", title: "Wysyłka hurtowa", body: "Darmowa wysyłka dla zamówień powyżej $5 000 w kontynentalnych USA. Międzynarodowe wyceny w 24 h." },
      { iconName: "ShieldCheck", title: "Rozszerzona gwarancja", body: "3-letnia gwarancja na wszystkie sztuki hurtowe (vs. 2 lata detal)." },
      { iconName: "Headset", title: "Dedykowany opiekun", body: "Jeden kontakt, który zna twoje konto, flotę i terminy." },
      { iconName: "Wrench", title: "Usługi montażu", body: "Opcjonalna sieć montażu white-glove w głównych miastach US przez certyfikowanych partnerów." },
      { iconName: "Building2", title: "Opakowanie co-brand", body: "Indywidualne opakowanie dla partnerów flot (MOQ 500). Czas realizacji 4-6 tygodni." },
    ],
    verticals: [
      { iconName: "Briefcase", title: "Floty przewozów i dostaw", body: "Kamery 3-kanałowe M530 to standard w 12 z 25 największych spółdzielni przewozów w USA. Integracje portalu kierowcy do przeglądu incydentów na zamówienie." },
      { iconName: "Boxes", title: "Logistyka & last-mile", body: "Dyskretnie montowane M300S w pojazdach last-mile 4 z największych 3PL w Ameryce Płn. Telematyczne wymiany przez standardowe webhooki JSON." },
      { iconName: "Building2", title: "Dealerzy samochodów", body: "M550 Pro i GS63H montowane przez dealera jako upsell przy sprzedaży aut nowych i używanych. Z certyfikatami montażu co-brand i mailami onboardingowymi dla klienta." },
    ],
    faq: [
      { q: "Jakie jest minimalne zamówienie?", a: "Nasz próg hurtowy startuje od 10 sztuk w dowolnej kombinacji SKU. Poniżej lepsza będzie cena detaliczna na azdome.com." },
      { q: "Jaki jest czas realizacji?", a: "SKU z magazynu wysyłane w 3 dni robocze. Opakowanie co-brand lub firmware custom 4-6 tygodni. Duże zamówienia (500+) zwykle 7-10 dni od potwierdzenia." },
      { q: "Czy macie hurt międzynarodowy?", a: "Tak. Hurt do USA, Kanady, UK, UE, Australii i ZEA. Inne regiony case-by-case — porozmawiaj ze specjalistą." },
      { q: "Jakie są warunki płatności?", a: "Pierwsze zamówienia przedpłata. Po dwóch opłaconych Net-30 z weryfikacją kredytową. Większe konta (Fleet 500+) mogą wnioskować o Net-45/Net-60 z linią kredytową." },
      { q: "Czy mogę zintegrować AZDOME z moją telematyką flotową?", a: "Tak. JSON webhook API dla danych incydentu, GPS i zdarzeń na M530 i M550 Pro. Integracje referencyjne dla Geotab, Samsara i Verizon Connect. Nasz zespół solutions waliduje stack." },
      { q: "Czy hurt ma tę samą gwarancję co detal?", a: "Hurt: 3 lata gwarancji (detal: 2). Serwis pogwarancyjny w preferencyjnych cenach dla partnerów hurtowych." },
    ],
  },
  ro: {
    tiers: [
      { range: "10 – 49 unități", discount: "12% reducere de la MSRP" },
      { range: "50 – 199 unități", discount: "18% reducere de la MSRP" },
      { range: "200 – 499 unități", discount: "23% reducere de la MSRP" },
      { range: "500+ unități", discount: "Ofertă personalizată" },
    ],
    benefits: [
      { iconName: "Package2", title: "Preț pe volum", body: "Reduceri pe trepte de la MOQ 10 unități, până la tarife negociate pentru comenzi de 500+." },
      { iconName: "Truck", title: "Transport în vrac", body: "Transport gratuit la comenzi peste $5.000 în SUA continentală. Cotații internaționale în 24h." },
      { iconName: "ShieldCheck", title: "Garanție extinsă", body: "3 ani garanție pe toate unitățile wholesale (vs. 2 ani retail)." },
      { iconName: "Headset", title: "Account manager dedicat", body: "Un singur contact uman care îți cunoaște contul, flota și calendarul." },
      { iconName: "Wrench", title: "Servicii instalare", body: "Rețea opțională white-glove de instalare în marile metropole US prin parteneri certificați." },
      { iconName: "Building2", title: "Ambalaj co-brand", body: "Ambalaj personalizat pentru parteneri de flote (MOQ 500). Lead time 4-6 săptămâni." },
    ],
    verticals: [
      { iconName: "Briefcase", title: "Flote ride-share & livrare", body: "Camerele 3 canale M530 sunt standard în 12 din cele mai mari 25 cooperative ride-share din SUA. Integrări portal șofer pentru analiza incidentelor la cerere." },
      { iconName: "Boxes", title: "Logistică & last-mile", body: "M300S cu montaj discret în vehiculele last-mile la 4 dintre cei mai mari 3PL nord-americani. Transferuri telematice prin webhook-uri JSON standard." },
      { iconName: "Building2", title: "Dealeri auto", body: "M550 Pro și GS63H instalate de dealer ca upsell la vânzări auto noi și second-hand. Include certificate instalare co-brand și emailuri de onboarding client." },
    ],
    faq: [
      { q: "Care e cantitatea minimă de comandă?", a: "Treapta wholesale de bază pornește de la 10 unități în orice combinație de SKU. Sub, prețul retail pe azdome.com este cea mai bună opțiune." },
      { q: "Care e timpul de livrare?", a: "SKU-uri în stoc se livrează în 3 zile lucrătoare. Ambalaj co-brand sau firmware custom 4-6 săptămâni. Comenzi mari (500+) de obicei 7-10 zile de la confirmare." },
      { q: "Faceți wholesale internațional?", a: "Da. Livrăm wholesale în SUA, Canada, UK, UE, Australia și EAU. Alte regiuni caz cu caz — vorbește cu un specialist." },
      { q: "Ce termeni de plată sunt?", a: "Primele comenzi preplătite. După două comenzi achitate, Net-30 cu aprobare credit. Conturi mari (Fleet 500+) pot solicita Net-45/Net-60 cu linie de credit." },
      { q: "Pot integra AZDOME cu telematica flotei mele?", a: "Da. API webhook JSON pentru date de incident, GPS și evenimente pe M530 și M550 Pro. Integrări de referință pentru Geotab, Samsara și Verizon Connect. Echipa noastră de soluții validează stackul." },
      { q: "Unitățile wholesale au aceeași garanție ca retailul?", a: "Unitățile wholesale primesc 3 ani garanție (retail 2). Service post-garanție la tarife preferențiale pentru parteneri wholesale." },
    ],
  },
  tr: {
    tiers: [
      { range: "10 – 49 adet", discount: "MSRP'den %12 indirim" },
      { range: "50 – 199 adet", discount: "MSRP'den %18 indirim" },
      { range: "200 – 499 adet", discount: "MSRP'den %23 indirim" },
      { range: "500+ adet", discount: "Özel teklif" },
    ],
    benefits: [
      { iconName: "Package2", title: "Hacim fiyatlandırması", body: "MOQ 10 adetten itibaren kademeli indirimler, 500+ siparişlerde müzakereli tarifeler." },
      { iconName: "Truck", title: "Toplu sevkiyat", body: "ABD anakarasına $5.000 üzeri siparişlerde ücretsiz kargo. Uluslararası teklifler 24 saat içinde." },
      { iconName: "ShieldCheck", title: "Uzatılmış garanti", body: "Tüm toptan birimlerde 3 yıl garanti (perakende 2 yıla karşı)." },
      { iconName: "Headset", title: "Özel müşteri yöneticisi", body: "Hesabınızı, filonuzu ve takviminizi tanıyan tek bir insan iletişimi." },
      { iconName: "Wrench", title: "Kurulum hizmetleri", body: "Sertifikalı kurulum partnerleri aracılığıyla büyük ABD metropolitanlarında opsiyonel white-glove kurulum ağı." },
      { iconName: "Building2", title: "Ortak markalı ambalaj", body: "Filo partnerleri için özel ambalaj (MOQ 500). 4-6 hafta teslim süresi." },
    ],
    verticals: [
      { iconName: "Briefcase", title: "Yolcu taşıma & teslimat filoları", body: "M530 3 kanal kameralar, en büyük 25 ABD yolcu taşıma kooperatifinin 12'sinde standart. Olay incelemesi için sürücü portal entegrasyonları talep üzerine." },
      { iconName: "Boxes", title: "Lojistik & son adım", body: "Gizli monteli M300S, Kuzey Amerika'nın en büyük 4 3PL'sinin son adım teslimat araçlarında konuşlandırıldı. Standart JSON webhook ile telematik aktarımları desteklenir." },
      { iconName: "Building2", title: "Otomobil bayileri", body: "Bayi tarafından monteli M550 Pro ve GS63H, yeni ve ikinci el araç satışlarında ek satış paketi. Ortak markalı kurulum sertifikaları ve son müşteri başlangıç e-postaları dahil." },
    ],
    faq: [
      { q: "Minimum sipariş miktarı nedir?", a: "Giriş seviyesi toptan dilimimiz herhangi bir SKU kombinasyonunda 10 adetten başlar. Bunun altında azdome.com'daki perakende fiyatımız en iyi seçim." },
      { q: "Teslim süresi ne kadar?", a: "Stoktaki SKU'lar 3 iş günü içinde sevk edilir. Ortak markalı ambalaj veya özel firmware 4-6 hafta. Büyük siparişler (500+) genellikle onaydan sonra 7-10 günde sevk edilir." },
      { q: "Uluslararası toptan satış yapıyor musunuz?", a: "Evet. ABD, Kanada, İngiltere, AB, Avustralya ve BAE'ye toptan sevk ediyoruz. Diğer bölgeler vaka bazında — uzmanla konuşun." },
      { q: "Hangi ödeme koşulları mevcut?", a: "İlk siparişler peşin. İki ödenmiş siparişten sonra kredi onayıyla Net-30. Daha büyük hesaplar (Fleet 500+) kredi limiti açılışıyla Net-45/Net-60 talep edebilir." },
      { q: "AZDOME'u filo telematik sistemimle entegre edebilir miyim?", a: "Evet. M530 ve M550 Pro üzerinde olay, GPS ve etkinlik verileri için JSON webhook API'si sunuyoruz. Geotab, Samsara ve Verizon Connect için referans entegrasyonlar mevcut. Çözüm ekibimiz stackinizi doğrulamada yardımcı olur." },
      { q: "Toptan birimler perakendeyle aynı garantiye mi sahip?", a: "Toptan birimler 3 yıl garanti alır (perakende 2 yıla karşı). Garanti dışı servis toptan partnerleri için tercihli oranlarda sunulur." },
    ],
  },
  pt: {
    tiers: [
      { range: "10 – 49 unidades", discount: "12% off MSRP" },
      { range: "50 – 199 unidades", discount: "18% off MSRP" },
      { range: "200 – 499 unidades", discount: "23% off MSRP" },
      { range: "500+ unidades", discount: "Cotação personalizada" },
    ],
    benefits: [
      { iconName: "Package2", title: "Preço por volume", body: "Descontos por faixas a partir de MOQ 10 unidades, até tarifas negociadas para pedidos de 500+." },
      { iconName: "Truck", title: "Envio em volume", body: "Frete grátis em pedidos acima de $5.000 para os EUA continentais. Cotações internacionais em 24h." },
      { iconName: "ShieldCheck", title: "Garantia estendida", body: "3 anos de garantia em todas as unidades atacado (vs. 2 anos varejo)." },
      { iconName: "Headset", title: "Gerente de conta dedicado", body: "Um único contato humano que conhece sua conta, sua frota e seu cronograma." },
      { iconName: "Wrench", title: "Serviços de instalação", body: "Rede opcional de instalação white-glove nas grandes metrópoles dos EUA via nossos parceiros instaladores certificados." },
      { iconName: "Building2", title: "Embalagem co-branded", body: "Embalagem custom para parceiros de frota (MOQ 500). Prazo 4-6 semanas." },
    ],
    verticals: [
      { iconName: "Briefcase", title: "Frotas de motorista app & entrega", body: "As câmeras 3 canais M530 são padrão em 12 das 25 maiores cooperativas de motorista app dos EUA. Integrações de portal do motorista para revisão de incidentes mediante solicitação." },
      { iconName: "Boxes", title: "Logística & última milha", body: "M300S montados discretamente em veículos de última milha de 4 dos maiores 3PLs norte-americanos. Handoffs de telemática via webhooks JSON padrão." },
      { iconName: "Building2", title: "Concessionárias", body: "M550 Pro e GS63H instalados pela concessionária como upsell em vendas de veículos novos e usados. Inclui certificados de instalação co-brand e e-mails de onboarding ao cliente." },
    ],
    faq: [
      { q: "Qual o pedido mínimo?", a: "Nossa faixa de entrada do atacado começa em 10 unidades em qualquer combinação de SKUs. Abaixo disso, nosso preço varejo na azdome.com é a melhor opção." },
      { q: "Qual o prazo de entrega?", a: "SKUs em estoque enviados em 3 dias úteis. Embalagem co-brand ou firmware custom 4-6 semanas. Pedidos grandes (500+) tipicamente 7-10 dias da confirmação." },
      { q: "Vocês fazem atacado internacional?", a: "Sim. Enviamos atacado para EUA, Canadá, Reino Unido, UE, Austrália e EAU. Outras regiões caso a caso — fale com um especialista." },
      { q: "Quais condições de pagamento?", a: "Primeiros pedidos pré-pagos. Após dois pedidos pagos, Net-30 com aprovação de crédito. Contas maiores (Fleet 500+) podem solicitar Net-45/Net-60 com linha de crédito." },
      { q: "Posso integrar a AZDOME com minha telemática de frota?", a: "Sim. API webhook JSON para dados de incidente, GPS e evento em M530 e M550 Pro. Integrações de referência para Geotab, Samsara e Verizon Connect. Nosso time de soluções valida sua stack." },
      { q: "As unidades de atacado têm a mesma garantia que o varejo?", a: "Unidades de atacado têm 3 anos de garantia (vs. 2 varejo). Serviço fora da garantia em tarifas preferenciais para parceiros de atacado." },
    ],
  },
  ar: {
    tiers: [
      { range: "10 – 49 وحدة", discount: "خصم 12% من MSRP" },
      { range: "50 – 199 وحدة", discount: "خصم 18% من MSRP" },
      { range: "200 – 499 وحدة", discount: "خصم 23% من MSRP" },
      { range: "500+ وحدة", discount: "عرض سعر مخصص" },
    ],
    benefits: [
      { iconName: "Package2", title: "تسعير الكميات", body: "خصومات متدرجة بدءًا من حد أدنى للطلب 10 وحدات، وصولًا إلى أسعار تفاوضية للطلبات من 500+." },
      { iconName: "Truck", title: "شحن بالجملة", body: "شحن مجاني للطلبات فوق $5,000 إلى الولايات المتحدة المتجاورة. عروض دولية خلال 24 ساعة." },
      { iconName: "ShieldCheck", title: "ضمان ممتد", body: "ضمان 3 سنوات على جميع وحدات الجملة (مقابل سنتين للتجزئة)." },
      { iconName: "Headset", title: "مدير حساب مخصص", body: "نقطة اتصال بشرية واحدة تعرف حسابك وأسطولك وجدولك." },
      { iconName: "Wrench", title: "خدمات التركيب", body: "شبكة تركيب اختيارية بدرجة white-glove في المدن الأمريكية الكبرى عبر شركائنا المعتمدين." },
      { iconName: "Building2", title: "تغليف بعلامة مشتركة", body: "تغليف مخصص لشركاء الأساطيل (MOQ 500). مدة التنفيذ 4-6 أسابيع." },
    ],
    verticals: [
      { iconName: "Briefcase", title: "أساطيل النقل والتوصيل", body: "كاميرات M530 ثلاثية القنوات هي معيار في 12 من أكبر 25 تعاونية نقل ركاب في الولايات المتحدة. تكاملات بوابة السائق لمراجعة الحوادث متوفرة عند الطلب." },
      { iconName: "Boxes", title: "اللوجستيات والميل الأخير", body: "كاميرا M300S بتركيب خفي منشورة في مركبات الميل الأخير في 4 من أكبر شركات 3PL في أمريكا الشمالية. تسليمات أنظمة التليماتيك عبر JSON Webhooks قياسية." },
      { iconName: "Building2", title: "وكلاء السيارات", body: "تركيب M550 Pro و GS63H من قبل الوكيل كباقة upsell على مبيعات السيارات الجديدة والمستعملة. تشمل شهادات تركيب بعلامة مشتركة ورسائل بدء الاستخدام للعميل النهائي." },
    ],
    faq: [
      { q: "ما الحد الأدنى للطلب؟", a: "المستوى التمهيدي للجملة لدينا يبدأ من 10 وحدات بأي مزيج من SKU. أقل من ذلك، أسعار التجزئة لدينا على azdome.com هي الأفضل." },
      { q: "كم تستغرق مدة التسليم؟", a: "تُشحن SKU المتوفرة في المخزون خلال 3 أيام عمل. التغليف بعلامة مشتركة أو البرامج الثابتة المخصصة 4-6 أسابيع. الطلبات الكبيرة (500+) عادةً 7-10 أيام من تأكيد الطلب." },
      { q: "هل تدعمون الجملة الدولية؟", a: "نعم. نشحن بالجملة إلى الولايات المتحدة وكندا والمملكة المتحدة والاتحاد الأوروبي وأستراليا والإمارات. مناطق أخرى تُعالج حالة بحالة — تحدث مع مختص." },
      { q: "ما شروط الدفع المتاحة؟", a: "الطلبات الأولى مدفوعة مقدمًا. بعد طلبين مدفوعين، تتوفر شروط Net-30 بموافقة الائتمان. الحسابات الأكبر (Fleet 500+) يمكنها طلب Net-45 أو Net-60 مع إعداد خط ائتمان." },
      { q: "هل يمكنني دمج AZDOME مع نظام تليماتيك أسطولي؟", a: "نعم. نوفر JSON Webhook API لبيانات الحادث و GPS والأحداث على M530 و M550 Pro. توجد تكاملات مرجعية لـ Geotab و Samsara و Verizon Connect. سيساعدك فريق الحلول لدينا على التحقق من stack." },
      { q: "هل تحصل وحدات الجملة على نفس الضمان مثل التجزئة؟", a: "وحدات الجملة تحصل على ضمان 3 سنوات (مقابل سنتين للتجزئة). تتوفر الخدمة خارج الضمان بأسعار تفضيلية لشركاء الجملة." },
    ],
  },
  th: {
    tiers: [
      { range: "10 – 49 ชุด", discount: "ลด 12% จาก MSRP" },
      { range: "50 – 199 ชุด", discount: "ลด 18% จาก MSRP" },
      { range: "200 – 499 ชุด", discount: "ลด 23% จาก MSRP" },
      { range: "500+ ชุด", discount: "เสนอราคาเฉพาะ" },
    ],
    benefits: [
      { iconName: "Package2", title: "ราคาตามปริมาณ", body: "ส่วนลดเป็นขั้นตั้งแต่ MOQ 10 ชุด ไปจนถึงราคาตกลงเฉพาะสำหรับออเดอร์ 500+" },
      { iconName: "Truck", title: "ขนส่งจำนวนมาก", body: "ค่าขนส่งฟรีสำหรับออเดอร์เกิน $5,000 ในสหรัฐแผ่นดินใหญ่ ใบเสนอราคาสำหรับต่างประเทศใน 24 ชม." },
      { iconName: "ShieldCheck", title: "รับประกันต่อ", body: "รับประกัน 3 ปี สำหรับทุกชุดขายส่ง (เทียบกับ 2 ปีของขายปลีก)" },
      { iconName: "Headset", title: "ผู้จัดการบัญชีเฉพาะ", body: "ผู้ติดต่อรายเดียวที่รู้จักบัญชี ฟลีท และตารางเวลาของคุณ" },
      { iconName: "Wrench", title: "บริการติดตั้ง", body: "เครือข่ายติดตั้งแบบ white-glove แบบเลือกได้ในเมืองใหญ่ของสหรัฐผ่านพันธมิตรช่างที่ได้รับการรับรอง" },
      { iconName: "Building2", title: "บรรจุภัณฑ์ co-brand", body: "บรรจุภัณฑ์เฉพาะสำหรับพันธมิตรฟลีท (MOQ 500) ระยะเวลา 4-6 สัปดาห์" },
    ],
    verticals: [
      { iconName: "Briefcase", title: "ฟลีท Rideshare & ส่งของ", body: "กล้อง M530 3 ช่องเป็นมาตรฐานใน 12 จาก 25 สหกรณ์ Rideshare ที่ใหญ่ที่สุดในสหรัฐ มีอินทิเกรชันพอร์ทัลคนขับสำหรับรีวิวเหตุการณ์ตามคำขอ" },
      { iconName: "Boxes", title: "โลจิสติกส์ & ไมล์สุดท้าย", body: "M300S ติดตั้งซ่อนถูกใช้งานในรถส่งของไมล์สุดท้ายของ 3PL ที่ใหญ่ที่สุด 4 รายในอเมริกาเหนือ การส่งต่อข้อมูลเทเลแมติกผ่าน JSON Webhooks มาตรฐาน" },
      { iconName: "Building2", title: "ดีลเลอร์รถยนต์", body: "M550 Pro และ GS63H ติดตั้งโดยดีลเลอร์เป็นแพ็กเสริมสำหรับการขายรถใหม่และมือสอง รวมใบรับรองการติดตั้ง co-brand และอีเมลต้อนรับลูกค้าปลายทาง" },
    ],
    faq: [
      { q: "ปริมาณสั่งซื้อขั้นต่ำเท่าไหร่?", a: "ระดับขายส่งเริ่มต้นของเราเริ่มที่ 10 ชุด ผสม SKU ใดก็ได้ ต่ำกว่านี้แนะนำราคาปลีกบน azdome.com" },
      { q: "ระยะเวลาส่งมอบนานแค่ไหน?", a: "SKU พร้อมส่งภายใน 3 วันทำการ บรรจุภัณฑ์ co-brand หรือเฟิร์มแวร์เฉพาะใช้ 4-6 สัปดาห์ ออเดอร์ใหญ่ (500+) โดยปกติส่งภายใน 7-10 วันหลังยืนยันออเดอร์" },
      { q: "ขายส่งระหว่างประเทศไหม?", a: "ใช่ เราจัดส่งขายส่งไปยังสหรัฐฯ แคนาดา สหราชอาณาจักร อียู ออสเตรเลีย และยูเออี ภูมิภาคอื่นพิจารณาเป็นกรณี — คุยกับผู้เชี่ยวชาญ" },
      { q: "เงื่อนไขการชำระเงินมีอะไรบ้าง?", a: "ออเดอร์แรกชำระล่วงหน้า หลัง 2 ออเดอร์ที่ชำระแล้ว มีเงื่อนไข Net-30 พร้อมอนุมัติเครดิต บัญชีใหญ่ (Fleet 500+) ขอ Net-45/Net-60 ได้พร้อมตั้งวงเงิน" },
      { q: "เชื่อมต่อ AZDOME กับระบบเทเลแมติกของฟลีทผมได้ไหม?", a: "ได้ เรามี JSON Webhook API สำหรับข้อมูลเหตุการณ์ GPS และอีเวนต์บน M530 และ M550 Pro มีอินทิเกรชันอ้างอิงสำหรับ Geotab, Samsara และ Verizon Connect ทีมโซลูชันของเราจะช่วยตรวจสอบ stack" },
      { q: "ชุดขายส่งรับประกันเหมือนขายปลีกไหม?", a: "ชุดขายส่งได้รับประกัน 3 ปี (ขายปลีก 2 ปี) บริการนอกประกันในราคาพิเศษสำหรับพันธมิตรขายส่ง" },
    ],
  },
  vi: {
    tiers: [
      { range: "10 – 49 chiếc", discount: "Giảm 12% từ MSRP" },
      { range: "50 – 199 chiếc", discount: "Giảm 18% từ MSRP" },
      { range: "200 – 499 chiếc", discount: "Giảm 23% từ MSRP" },
      { range: "500+ chiếc", discount: "Báo giá riêng" },
    ],
    benefits: [
      { iconName: "Package2", title: "Giá theo khối lượng", body: "Chiết khấu theo bậc từ MOQ 10 chiếc, đến mức thỏa thuận cho đơn 500+." },
      { iconName: "Truck", title: "Vận chuyển số lượng lớn", body: "Miễn phí vận chuyển cho đơn trên $5.000 đến đại lục Mỹ. Báo giá quốc tế trong 24h." },
      { iconName: "ShieldCheck", title: "Bảo hành mở rộng", body: "Bảo hành 3 năm cho mọi đơn bán buôn (so với 2 năm bán lẻ)." },
      { iconName: "Headset", title: "Quản lý tài khoản chuyên trách", body: "Một liên hệ duy nhất nắm rõ tài khoản, đội xe và lịch trình của bạn." },
      { iconName: "Wrench", title: "Dịch vụ lắp đặt", body: "Mạng lưới lắp đặt white-glove tùy chọn tại các đô thị lớn của Mỹ qua đối tác kỹ thuật viên được chứng nhận." },
      { iconName: "Building2", title: "Bao bì co-brand", body: "Bao bì tùy chỉnh cho đối tác đội xe (MOQ 500). Thời gian thực hiện 4-6 tuần." },
    ],
    verticals: [
      { iconName: "Briefcase", title: "Đội xe công nghệ & giao hàng", body: "Camera M530 3 kênh là tiêu chuẩn ở 12 trong 25 hợp tác xã xe công nghệ lớn nhất Mỹ. Tích hợp cổng tài xế để xem lại sự cố có sẵn theo yêu cầu." },
      { iconName: "Boxes", title: "Logistics & last-mile", body: "M300S lắp kín đáo được triển khai trong các xe giao chặng cuối của 4 trong số 3PL lớn nhất Bắc Mỹ. Trao đổi telematics qua webhook JSON tiêu chuẩn." },
      { iconName: "Building2", title: "Đại lý ô tô", body: "M550 Pro và GS63H do đại lý lắp đặt làm gói upsell trong bán xe mới và đã qua sử dụng. Bao gồm chứng nhận lắp đặt co-brand và email onboarding khách hàng cuối." },
    ],
    faq: [
      { q: "Số lượng đặt tối thiểu là bao nhiêu?", a: "Bậc bán buôn cơ bản bắt đầu từ 10 chiếc với bất kỳ tổ hợp SKU nào. Dưới mức đó, giá bán lẻ trên azdome.com là tốt nhất." },
      { q: "Thời gian giao hàng bao lâu?", a: "SKU có sẵn giao trong 3 ngày làm việc. Bao bì co-brand hoặc firmware tùy chỉnh 4-6 tuần. Đơn lớn (500+) thường giao trong 7-10 ngày từ khi xác nhận." },
      { q: "Bạn có hỗ trợ bán buôn quốc tế không?", a: "Có. Chúng tôi vận chuyển bán buôn đến Mỹ, Canada, Anh, EU, Úc và UAE. Khu vực khác xử lý theo từng trường hợp — trao đổi với chuyên viên." },
      { q: "Có những điều khoản thanh toán nào?", a: "Đơn đầu trả trước. Sau hai đơn đã thanh toán, có Net-30 với duyệt tín dụng. Tài khoản lớn (Fleet 500+) có thể yêu cầu Net-45/Net-60 khi thiết lập hạn mức tín dụng." },
      { q: "Tôi có thể tích hợp AZDOME với hệ thống telematics đội xe không?", a: "Có. Chúng tôi cung cấp JSON webhook API cho dữ liệu sự cố, GPS và sự kiện trên M530 và M550 Pro. Có sẵn tích hợp tham chiếu cho Geotab, Samsara và Verizon Connect. Đội ngũ giải pháp sẽ giúp xác thực stack của bạn." },
      { q: "Hàng bán buôn có cùng bảo hành như bán lẻ không?", a: "Hàng bán buôn được bảo hành 3 năm (so với 2 năm bán lẻ). Dịch vụ ngoài bảo hành theo giá ưu đãi cho đối tác bán buôn." },
    ],
  },
};

export function getDefaultWholesale(locale: Locale): WholesaleContent {
  return WHOLESALE_BY_LOCALE[locale] ?? WHOLESALE_BY_LOCALE.en!;
}

export const TIERS = EN.tiers;
export const BENEFITS = EN.benefits;
export const VERTICALS = EN.verticals;
export const FAQ = EN.faq;

export const WHOLESALE_PAGE: ContentSection<WholesaleContent> = {
  key: "wholesale.page",
  label: "Wholesale 页 · Tiers / Benefits / Verticals / FAQ",
  description:
    "批发/团购页:价格阶梯、福利、行业案例、常见问题。" +
    `Benefits iconName: ${WHOLESALE_BENEFIT_ICONS.join(", ")} · ` +
    `Verticals iconName: ${WHOLESALE_VERTICAL_ICONS.join(", ")}`,
  page: "wholesale",
  previewHref: "/wholesale",
  defaults: getDefaultWholesale,
};
