import type { ContentSection } from "./types";
import type { Locale } from "@/lib/i18n/dictionaries";

export const AFFILIATE_STAT_ICONS = ["DollarSign", "Users", "LineChart", "CalendarClock"] as const;
export const AFFILIATE_STEP_ICONS = ["BadgeCheck", "Megaphone", "LineChart", "DollarSign"] as const;

export type AffiliateStat = { iconName: string; value: string; label: string };
export type AffiliateTier = { name: string; rate: string; threshold: string; perks: string[] };
export type AffiliateStep = { n: number; iconName: string; title: string; body: string };
export type AffiliateFAQ = { q: string; a: string };

export type AffiliateContent = {
  stats: AffiliateStat[];
  tiers: AffiliateTier[];
  howItWorks: AffiliateStep[];
  faq: AffiliateFAQ[];
};

const EN: AffiliateContent = {
  stats: [
    { iconName: "DollarSign", value: "10–18%", label: "Tiered commission" },
    { iconName: "Users", value: "60 days", label: "Cookie window" },
    { iconName: "LineChart", value: "$190", label: "Average order value" },
    { iconName: "CalendarClock", value: "Net-30", label: "Payout schedule" },
  ],
  tiers: [
    { name: "Starter", rate: "10%", threshold: "All approved creators", perks: ["10% commission on every approved sale", "60-day cookie window", "Monthly performance dashboard", "Standard creative assets (banners, product photos, video clips)"] },
    { name: "Pro", rate: "14%", threshold: "$5,000 in attributed sales in a rolling 90 days", perks: ["Everything in Starter, plus:", "Dedicated affiliate manager", "Custom discount code (5% off for your audience)", "Early access to new product launches", "Free product seeding for review content"] },
    { name: "Partner", rate: "18%", threshold: "By invitation only", perks: ["Everything in Pro, plus:", "Custom landing pages with your branding", "Co-branded content collaboration budget", "Early-access product samples and pre-launch firmware", "Quarterly business reviews and roadmap previews"] },
  ],
  howItWorks: [
    { n: 1, iconName: "BadgeCheck", title: "Apply", body: "Submit the short form below. We review every application personally — usually within 2 business days." },
    { n: 2, iconName: "Megaphone", title: "Promote", body: "Use your unique link or discount code in YouTube videos, blog posts, newsletters, or rideshare community groups." },
    { n: 3, iconName: "LineChart", title: "Track", body: "Watch clicks, conversions, and earnings in your real-time dashboard. We attribute on a 60-day cookie + last-click model." },
    { n: 4, iconName: "DollarSign", title: "Get paid", body: "Net-30 payouts via PayPal, Wise, or ACH. Minimum payout threshold: $50." },
  ],
  faq: [
    { q: "What can I promote?", a: "Anything sold on azdome.com — dash cameras, accessories, and gift cards. Promotions of refurbished units and current sales are all eligible." },
    { q: "How is commission calculated?", a: "Commission is paid on the final order subtotal after any discounts and before shipping and tax. Returns within 30 days are deducted from the next payout." },
    { q: "Can I run paid ads on AZDOME brand keywords?", a: "No — bidding on AZDOME brand terms or trademarked variants is prohibited and will result in disqualification. Non-brand keyword campaigns are welcomed and supported." },
    { q: "Do I need a minimum audience size?", a: "There is no hard minimum. We accept creators with engaged audiences in automotive, rideshare, family travel, EV ownership, and adjacent verticals. The Partner tier is invitation-only based on track record, not audience size." },
    { q: "Are there geographic restrictions?", a: "Commissions apply to orders shipping to the US, Canada, UK, and EU. Other regions are coming as we expand inventory." },
    { q: "When do I get paid?", a: "Commissions earned in a calendar month are payable on the 1st of the following month, net 30 days to account for returns. PayPal, Wise, and ACH are all supported." },
  ],
};

const AFFILIATE_BY_LOCALE: Partial<Record<Locale, AffiliateContent>> = {
  en: EN,
  zh: {
    stats: [
      { iconName: "DollarSign", value: "10–18%", label: "分级佣金" },
      { iconName: "Users", value: "60 天", label: "Cookie 周期" },
      { iconName: "LineChart", value: "$190", label: "平均客单价" },
      { iconName: "CalendarClock", value: "Net-30", label: "结算周期" },
    ],
    tiers: [
      { name: "入门", rate: "10%", threshold: "所有审核通过的创作者", perks: ["每笔确认订单 10% 佣金", "60 天 cookie 周期", "月度数据看板", "标准素材包(banner、产品图、视频片段)"] },
      { name: "进阶", rate: "14%", threshold: "滚动 90 天内累计归因销售额 $5,000", perks: ["「入门」全部权益,另加:", "专属客户经理", "自定义折扣码(粉丝享 5% 优惠)", "新品提前体验", "评测样品免费寄送"] },
      { name: "合作伙伴", rate: "18%", threshold: "仅限受邀", perks: ["「进阶」全部权益,另加:", "带你 logo 的定制落地页", "联合内容创作预算", "新品样品 + 上市前固件提前访问", "季度业务回顾与路线图预览"] },
    ],
    howItWorks: [
      { n: 1, iconName: "BadgeCheck", title: "申请", body: "填写下方简短表单。我们亲自审核每一份申请,通常 2 个工作日内回复。" },
      { n: 2, iconName: "Megaphone", title: "推广", body: "在 YouTube、博客、邮件订阅或网约车社群中使用你的专属链接或折扣码。" },
      { n: 3, iconName: "LineChart", title: "追踪", body: "实时仪表板查看点击、转化和收益。我们采用 60 天 cookie + 末次点击归因模型。" },
      { n: 4, iconName: "DollarSign", title: "结算", body: "通过 PayPal、Wise 或 ACH 进行 Net-30 结算。最低结算门槛 $50。" },
    ],
    faq: [
      { q: "可以推广哪些产品?", a: "azdome.com 上的任何产品 — 行车记录仪、配件、礼品卡。包括官翻品和促销商品。" },
      { q: "佣金如何计算?", a: "在折扣后、运费税费前的订单小计基础上计算。30 天内的退货会从下次结算中扣除。" },
      { q: "可以投放 AZDOME 品牌词的付费广告吗?", a: "不可以 — 竞价 AZDOME 品牌词或商标变体会被取消资格。非品牌关键词投放欢迎并提供支持。" },
      { q: "粉丝量有最低要求吗?", a: "没有硬性下限。我们接受汽车、网约车、家庭出行、电动车等领域有粘性受众的创作者。「合作伙伴」级别只看业绩,不看粉丝量。" },
      { q: "有地区限制吗?", a: "美国、加拿大、英国、欧盟订单均可获佣。其他地区随着我们扩展库存逐步开放。" },
      { q: "什么时候发钱?", a: "本月佣金于次月 1 日开始进入 Net-30 结算流程(为退货留 30 天)。支持 PayPal、Wise 和 ACH。" },
    ],
  },
  ja: {
    stats: [
      { iconName: "DollarSign", value: "10–18%", label: "階層別コミッション" },
      { iconName: "Users", value: "60 日", label: "クッキー期間" },
      { iconName: "LineChart", value: "$190", label: "平均注文額" },
      { iconName: "CalendarClock", value: "Net-30", label: "支払いサイクル" },
    ],
    tiers: [
      { name: "Starter", rate: "10%", threshold: "承認された全クリエイター", perks: ["承認売上ごとに 10% コミッション", "60 日のクッキー期間", "月次パフォーマンスダッシュボード", "標準クリエイティブ(バナー、製品写真、動画クリップ)"] },
      { name: "Pro", rate: "14%", threshold: "ローリング 90 日で帰属売上 $5,000", perks: ["Starter の全特典に加えて:", "専任アフィリエイトマネージャー", "カスタム割引コード(視聴者に 5% オフ)", "新製品ローンチへの先行アクセス", "レビュー用サンプル提供"] },
      { name: "Partner", rate: "18%", threshold: "招待制", perks: ["Pro の全特典に加えて:", "ブランディング入りカスタムランディングページ", "共同ブランドコンテンツ予算", "発売前サンプルとファームウェアへの早期アクセス", "四半期ビジネスレビューとロードマップ先行公開"] },
    ],
    howItWorks: [
      { n: 1, iconName: "BadgeCheck", title: "申請", body: "下の短いフォームを送信してください。すべての申請を担当者が確認します — 通常 2 営業日以内。" },
      { n: 2, iconName: "Megaphone", title: "宣伝", body: "YouTube 動画、ブログ、ニュースレター、ライドシェアコミュニティで専用リンクや割引コードを使用してください。" },
      { n: 3, iconName: "LineChart", title: "追跡", body: "リアルタイムダッシュボードでクリック、コンバージョン、収益を確認。60 日クッキー + ラストクリック帰属。" },
      { n: 4, iconName: "DollarSign", title: "受取", body: "PayPal / Wise / ACH で Net-30 支払い。最低支払い額:$50。" },
    ],
    faq: [
      { q: "何を宣伝できますか?", a: "azdome.com のすべて — ドライブレコーダー、アクセサリー、ギフトカード。整備済製品やセール品も対象。" },
      { q: "コミッションの計算方法は?", a: "割引適用後、送料・税金前の最終小計に対して支払われます。30 日以内の返品は次回支払いから差し引かれます。" },
      { q: "AZDOME ブランドキーワードに有料広告を出せますか?", a: "いいえ — AZDOME ブランド用語や商標バリアントへの入札は禁止で、資格剥奪となります。非ブランドキーワードキャンペーンは歓迎します。" },
      { q: "最低フォロワー数の要件は?", a: "厳格な下限はありません。自動車、ライドシェア、ファミリートラベル、EV 所有、関連分野で熱心な視聴者がいるクリエイターを受け入れます。Partner 階層は実績ベースで招待制。" },
      { q: "地域制限はありますか?", a: "米国、カナダ、英国、EU への配送注文が対象。在庫拡大に応じて他地域も追加予定。" },
      { q: "いつ支払われますか?", a: "暦月の収益は翌月 1 日に Net-30 で支払われます(返品調整のため 30 日)。PayPal、Wise、ACH 対応。" },
    ],
  },
  de: {
    stats: [
      { iconName: "DollarSign", value: "10–18%", label: "Gestaffelte Provision" },
      { iconName: "Users", value: "60 Tage", label: "Cookie-Dauer" },
      { iconName: "LineChart", value: "$190", label: "Durchschnittlicher Bestellwert" },
      { iconName: "CalendarClock", value: "Net-30", label: "Auszahlungsrhythmus" },
    ],
    tiers: [
      { name: "Starter", rate: "10%", threshold: "Alle freigeschalteten Creator", perks: ["10% Provision auf jeden bestätigten Verkauf", "60-Tage-Cookie-Fenster", "Monatliches Performance-Dashboard", "Standard-Creatives (Banner, Produktfotos, Video-Clips)"] },
      { name: "Pro", rate: "14%", threshold: "$5.000 attributed Umsatz in rollierenden 90 Tagen", perks: ["Alles aus Starter plus:", "Dedizierter Affiliate-Manager", "Eigener Rabattcode (5% Rabatt für Ihre Zielgruppe)", "Frühzugang zu Produkt-Launches", "Kostenlose Produkt-Seeding für Reviews"] },
      { name: "Partner", rate: "18%", threshold: "Nur auf Einladung", perks: ["Alles aus Pro plus:", "Custom-Landingpages mit Ihrem Branding", "Co-Branded-Content-Kollaborationsbudget", "Vorab-Samples und Pre-Launch-Firmware", "Quartals-Reviews und Roadmap-Vorschauen"] },
    ],
    howItWorks: [
      { n: 1, iconName: "BadgeCheck", title: "Bewerben", body: "Füllen Sie das kurze Formular unten aus. Wir prüfen jede Bewerbung persönlich — meist innerhalb von 2 Werktagen." },
      { n: 2, iconName: "Megaphone", title: "Promoten", body: "Nutzen Sie Ihren persönlichen Link oder Rabattcode in YouTube-Videos, Blogposts, Newslettern oder Rideshare-Communities." },
      { n: 3, iconName: "LineChart", title: "Tracken", body: "Klicks, Conversions und Verdienste live im Dashboard. Wir attribuieren mit 60-Tage-Cookie + Last-Click-Modell." },
      { n: 4, iconName: "DollarSign", title: "Auszahlung", body: "Net-30-Auszahlungen via PayPal, Wise oder ACH. Mindestauszahlung: $50." },
    ],
    faq: [
      { q: "Was kann ich bewerben?", a: "Alles auf azdome.com — Dashcams, Zubehör und Gutscheine. Auch Refurbished-Geräte und Sales sind förderfähig." },
      { q: "Wie wird die Provision berechnet?", a: "Auf den finalen Order-Zwischenbetrag nach Rabatten, vor Versand und Steuer. Retouren innerhalb 30 Tagen werden von der nächsten Auszahlung abgezogen." },
      { q: "Darf ich bezahlte Anzeigen auf AZDOME-Markenbegriffe schalten?", a: "Nein — Gebote auf AZDOME-Markenbegriffe oder Trademark-Varianten sind verboten und führen zur Disqualifikation. Non-Brand-Keyword-Kampagnen sind willkommen." },
      { q: "Gibt es eine Mindestreichweite?", a: "Keine harte Untergrenze. Wir nehmen Creator mit engagiertem Publikum in Automotive, Rideshare, Familienreise, EV und verwandten Bereichen. Partner-Tier ist invitation-only nach Erfolgshistorie." },
      { q: "Gibt es geografische Einschränkungen?", a: "Provisionen gelten für Bestellungen nach US, Kanada, UK und EU. Weitere Regionen folgen mit Lager-Ausbau." },
      { q: "Wann werde ich bezahlt?", a: "Im Kalendermonat verdiente Provisionen werden zum 1. des Folgemonats fällig, net 30 Tage für Retouren. PayPal, Wise und ACH werden unterstützt." },
    ],
  },
  fr: {
    stats: [
      { iconName: "DollarSign", value: "10–18%", label: "Commission par paliers" },
      { iconName: "Users", value: "60 jours", label: "Fenêtre cookie" },
      { iconName: "LineChart", value: "$190", label: "Panier moyen" },
      { iconName: "CalendarClock", value: "Net-30", label: "Calendrier de paiement" },
    ],
    tiers: [
      { name: "Starter", rate: "10%", threshold: "Tous les créateurs approuvés", perks: ["10% de commission sur chaque vente validée", "Fenêtre cookie 60 jours", "Tableau de bord mensuel de performance", "Assets créatifs standard (bannières, photos produit, clips vidéo)"] },
      { name: "Pro", rate: "14%", threshold: "$5 000 de ventes attribuées sur 90 jours glissants", perks: ["Tout Starter, plus :", "Account manager dédié", "Code promo personnalisé (5% pour votre audience)", "Accès anticipé aux lancements", "Envoi de produits pour reviews"] },
      { name: "Partner", rate: "18%", threshold: "Sur invitation uniquement", perks: ["Tout Pro, plus :", "Landing pages personnalisées à vos couleurs", "Budget de collaboration de contenu co-brandé", "Échantillons pré-lancement et firmware avant sortie", "Revues d'activité trimestrielles et previews roadmap"] },
    ],
    howItWorks: [
      { n: 1, iconName: "BadgeCheck", title: "Postuler", body: "Remplissez le court formulaire ci-dessous. Nous étudions chaque candidature personnellement — généralement sous 2 jours ouvrés." },
      { n: 2, iconName: "Megaphone", title: "Promouvoir", body: "Utilisez votre lien unique ou code promo dans vos vidéos YouTube, articles, newsletters ou communautés VTC." },
      { n: 3, iconName: "LineChart", title: "Suivre", body: "Suivez clics, conversions et gains en temps réel. Modèle d'attribution : cookie 60 jours + dernier clic." },
      { n: 4, iconName: "DollarSign", title: "Être payé", body: "Paiements Net-30 via PayPal, Wise ou ACH. Seuil minimum : $50." },
    ],
    faq: [
      { q: "Que puis-je promouvoir ?", a: "Tout ce qui est vendu sur azdome.com — caméras, accessoires et cartes cadeaux. Les promotions sur reconditionné et soldes sont éligibles." },
      { q: "Comment la commission est-elle calculée ?", a: "Sur le sous-total final après remises et avant frais de port et taxes. Les retours sous 30 jours sont déduits du paiement suivant." },
      { q: "Puis-je faire des publicités payantes sur les mots-clés de la marque AZDOME ?", a: "Non — l'enchère sur les termes de marque AZDOME ou ses variantes est interdite et entraîne une disqualification. Les campagnes hors marque sont les bienvenues." },
      { q: "Y a-t-il une taille d'audience minimum ?", a: "Pas de minimum strict. Nous acceptons les créateurs avec une audience engagée dans l'automobile, VTC, voyages en famille, EV et secteurs connexes. Le palier Partner est sur invitation, basé sur les résultats." },
      { q: "Existe-t-il des restrictions géographiques ?", a: "Les commissions s'appliquent aux commandes expédiées aux États-Unis, Canada, Royaume-Uni et UE. D'autres régions arrivent avec l'expansion." },
      { q: "Quand suis-je payé ?", a: "Les commissions d'un mois civil sont payables le 1er du mois suivant, net 30 pour intégrer les retours. PayPal, Wise et ACH supportés." },
    ],
  },
  es: {
    stats: [
      { iconName: "DollarSign", value: "10–18%", label: "Comisión por niveles" },
      { iconName: "Users", value: "60 días", label: "Ventana de cookie" },
      { iconName: "LineChart", value: "$190", label: "Valor medio de pedido" },
      { iconName: "CalendarClock", value: "Net-30", label: "Calendario de pagos" },
    ],
    tiers: [
      { name: "Starter", rate: "10%", threshold: "Todos los creadores aprobados", perks: ["10% de comisión por venta aprobada", "Ventana de cookie de 60 días", "Dashboard mensual de rendimiento", "Recursos creativos estándar (banners, fotos, clips)"] },
      { name: "Pro", rate: "14%", threshold: "$5.000 en ventas atribuidas en 90 días móviles", perks: ["Todo lo de Starter, más:", "Account manager dedicado", "Código de descuento personalizado (5% para tu audiencia)", "Acceso anticipado a lanzamientos", "Envío de producto gratis para reviews"] },
      { name: "Partner", rate: "18%", threshold: "Solo por invitación", perks: ["Todo lo de Pro, más:", "Landing pages a medida con tu marca", "Presupuesto para colaboraciones de contenido co-marca", "Muestras y firmware pre-lanzamiento", "Revisiones trimestrales y previews del roadmap"] },
    ],
    howItWorks: [
      { n: 1, iconName: "BadgeCheck", title: "Aplicar", body: "Envía el formulario corto. Revisamos cada solicitud personalmente — normalmente en 2 días laborables." },
      { n: 2, iconName: "Megaphone", title: "Promocionar", body: "Usa tu enlace o código en vídeos de YouTube, posts, newsletters o grupos de comunidad VTC." },
      { n: 3, iconName: "LineChart", title: "Seguir", body: "Mira clics, conversiones y ganancias en tiempo real. Atribuimos con cookie 60 días + último clic." },
      { n: 4, iconName: "DollarSign", title: "Cobrar", body: "Pagos Net-30 vía PayPal, Wise o ACH. Umbral mínimo: $50." },
    ],
    faq: [
      { q: "¿Qué puedo promocionar?", a: "Cualquier cosa de azdome.com — cámaras, accesorios y tarjetas regalo. Reacondicionados y ofertas también elegibles." },
      { q: "¿Cómo se calcula la comisión?", a: "Sobre el subtotal final tras descuentos, antes de envío e impuestos. Las devoluciones en 30 días se deducen del próximo pago." },
      { q: "¿Puedo hacer ads de pago en keywords de marca AZDOME?", a: "No — pujar por términos de marca AZDOME o variantes registradas está prohibido y descalifica. Campañas no-marca son bienvenidas." },
      { q: "¿Hay tamaño mínimo de audiencia?", a: "Sin mínimo rígido. Aceptamos creadores con audiencia comprometida en automoción, VTC, viajes familiares, EV y verticales adyacentes. El nivel Partner es solo por invitación basado en resultados." },
      { q: "¿Hay restricciones geográficas?", a: "Comisiones para pedidos enviados a EE.UU., Canadá, Reino Unido y UE. Más regiones según ampliemos inventario." },
      { q: "¿Cuándo cobro?", a: "Las comisiones del mes natural se pagan el día 1 del siguiente, net 30 para contemplar devoluciones. PayPal, Wise y ACH disponibles." },
    ],
  },
  it: {
    stats: [
      { iconName: "DollarSign", value: "10–18%", label: "Commissione a fasce" },
      { iconName: "Users", value: "60 giorni", label: "Finestra cookie" },
      { iconName: "LineChart", value: "$190", label: "Valore medio ordine" },
      { iconName: "CalendarClock", value: "Net-30", label: "Pianificazione pagamenti" },
    ],
    tiers: [
      { name: "Starter", rate: "10%", threshold: "Tutti i creator approvati", perks: ["10% di commissione su ogni vendita approvata", "Finestra cookie 60 giorni", "Dashboard mensile delle performance", "Asset creativi standard (banner, foto prodotto, clip video)"] },
      { name: "Pro", rate: "14%", threshold: "$5.000 di vendite attribuite in 90 giorni rolling", perks: ["Tutto Starter, più:", "Account manager dedicato", "Codice sconto custom (5% per il tuo pubblico)", "Accesso anticipato ai lanci", "Invio prodotti per review"] },
      { name: "Partner", rate: "18%", threshold: "Solo su invito", perks: ["Tutto Pro, più:", "Landing page personalizzate con il tuo brand", "Budget per collaborazioni di contenuto co-brand", "Sample pre-lancio e firmware anticipato", "Review trimestrali e anteprime roadmap"] },
    ],
    howItWorks: [
      { n: 1, iconName: "BadgeCheck", title: "Candidati", body: "Compila il modulo. Esaminiamo ogni candidatura personalmente — di solito entro 2 giorni lavorativi." },
      { n: 2, iconName: "Megaphone", title: "Promuovi", body: "Usa link o codice nei video YouTube, blog, newsletter o community ride-share." },
      { n: 3, iconName: "LineChart", title: "Monitora", body: "Click, conversioni e guadagni in dashboard real-time. Attribuzione cookie 60 giorni + last-click." },
      { n: 4, iconName: "DollarSign", title: "Ricevi", body: "Pagamenti Net-30 via PayPal, Wise o ACH. Soglia minima: $50." },
    ],
    faq: [
      { q: "Cosa posso promuovere?", a: "Tutto su azdome.com — dash cam, accessori e gift card. Ricondizionati e saldi inclusi." },
      { q: "Come si calcola la commissione?", a: "Sul subtotale finale dopo sconti, prima di spedizione e tasse. I resi entro 30 giorni sono dedotti dal pagamento successivo." },
      { q: "Posso fare adv a pagamento sui brand keyword AZDOME?", a: "No — fare offerte sui termini di brand AZDOME o varianti registrate è vietato e causa squalifica. Campagne non-brand sono benvenute." },
      { q: "C'è una dimensione minima del pubblico?", a: "Nessun minimo rigido. Accettiamo creator con pubblico coinvolto in automotive, ride-share, viaggi famiglia, EV e settori adiacenti. Il livello Partner è su invito in base ai risultati." },
      { q: "Ci sono restrizioni geografiche?", a: "Commissioni per ordini spediti a USA, Canada, UK e UE. Altre regioni in arrivo con l'espansione." },
      { q: "Quando vengo pagato?", a: "Le commissioni di un mese solare si pagano il 1° del mese successivo, net 30 per i resi. PayPal, Wise e ACH supportati." },
    ],
  },
  ru: {
    stats: [
      { iconName: "DollarSign", value: "10–18%", label: "Многоуровневая комиссия" },
      { iconName: "Users", value: "60 дней", label: "Cookie-окно" },
      { iconName: "LineChart", value: "$190", label: "Средний чек" },
      { iconName: "CalendarClock", value: "Net-30", label: "График выплат" },
    ],
    tiers: [
      { name: "Starter", rate: "10%", threshold: "Все одобренные авторы", perks: ["10% с каждой подтверждённой продажи", "60-дневное cookie-окно", "Ежемесячный дашборд", "Стандартные креативы (баннеры, фото, видео)"] },
      { name: "Pro", rate: "14%", threshold: "$5 000 атрибутированных продаж за 90 дней", perks: ["Всё из Starter, плюс:", "Персональный аффилейт-менеджер", "Свой промокод (-5% для аудитории)", "Ранний доступ к запускам", "Бесплатные семплы для обзоров"] },
      { name: "Partner", rate: "18%", threshold: "Только по приглашению", perks: ["Всё из Pro, плюс:", "Кастомные лендинги с вашим брендингом", "Бюджет на co-branded контент", "Семплы и прошивка до анонса", "Квартальные обзоры и превью дорожной карты"] },
    ],
    howItWorks: [
      { n: 1, iconName: "BadgeCheck", title: "Заявка", body: "Заполните короткую форму. Мы лично проверяем каждую заявку — обычно в течение 2 рабочих дней." },
      { n: 2, iconName: "Megaphone", title: "Продвижение", body: "Используйте уникальную ссылку или промокод в YouTube, блогах, рассылках или сообществах такси." },
      { n: 3, iconName: "LineChart", title: "Аналитика", body: "Клики, конверсии и доходы в реальном времени. Атрибуция: cookie 60 дней + last-click." },
      { n: 4, iconName: "DollarSign", title: "Выплата", body: "Net-30 выплаты через PayPal, Wise или ACH. Минимум: $50." },
    ],
    faq: [
      { q: "Что можно продвигать?", a: "Всё с azdome.com — камеры, аксессуары и подарочные карты. Восстановленные товары и распродажи тоже подходят." },
      { q: "Как считается комиссия?", a: "С итоговой суммы заказа после скидок, до доставки и налогов. Возвраты в течение 30 дней вычитаются из следующей выплаты." },
      { q: "Можно запускать платную рекламу на бренд AZDOME?", a: "Нет — ставки на бренд AZDOME или варианты товарного знака запрещены и ведут к дисквалификации. Не-брендовые кампании приветствуются." },
      { q: "Есть ли минимум подписчиков?", a: "Жёсткого минимума нет. Принимаем авторов с вовлечённой аудиторией в авто, такси, семейных поездках, EV и смежных нишах. Уровень Partner — только по приглашению на основе результатов." },
      { q: "Есть ли географические ограничения?", a: "Комиссии действуют для заказов в США, Канаде, Великобритании и ЕС. Другие регионы — по мере расширения склада." },
      { q: "Когда я получу выплату?", a: "Комиссии за календарный месяц выплачиваются 1-го числа следующего, net 30 дней для возвратов. Поддерживаются PayPal, Wise и ACH." },
    ],
  },
  pl: {
    stats: [
      { iconName: "DollarSign", value: "10–18%", label: "Prowizja stopniowana" },
      { iconName: "Users", value: "60 dni", label: "Okno cookie" },
      { iconName: "LineChart", value: "$190", label: "Średnia wartość zamówienia" },
      { iconName: "CalendarClock", value: "Net-30", label: "Harmonogram wypłat" },
    ],
    tiers: [
      { name: "Starter", rate: "10%", threshold: "Wszyscy zatwierdzeni twórcy", perks: ["10% prowizji od każdej zatwierdzonej sprzedaży", "60-dniowe okno cookie", "Miesięczny dashboard wyników", "Standardowe kreacje (banery, zdjęcia produktu, klipy)"] },
      { name: "Pro", rate: "14%", threshold: "$5 000 przypisanych sprzedaży w 90 dni kroczących", perks: ["Wszystko z Starter, plus:", "Dedykowany affiliate manager", "Własny kod rabatowy (-5% dla twojej publiczności)", "Wczesny dostęp do premier", "Darmowe próbki do recenzji"] },
      { name: "Partner", rate: "18%", threshold: "Tylko na zaproszenie", perks: ["Wszystko z Pro, plus:", "Spersonalizowane landingi z twoim brandingiem", "Budżet na współpracę co-brand", "Wczesny dostęp do próbek i firmware przedpremierowego", "Kwartalne przeglądy i preview roadmapy"] },
    ],
    howItWorks: [
      { n: 1, iconName: "BadgeCheck", title: "Aplikuj", body: "Wyślij krótki formularz. Sprawdzamy każdą aplikację osobiście — zwykle w 2 dni robocze." },
      { n: 2, iconName: "Megaphone", title: "Promuj", body: "Używaj unikalnego linku lub kodu w YouTube, postach, newsletterach lub grupach kierowców." },
      { n: 3, iconName: "LineChart", title: "Śledź", body: "Kliknięcia, konwersje i zarobki w dashboardzie real-time. Atrybucja: cookie 60 dni + last-click." },
      { n: 4, iconName: "DollarSign", title: "Wypłata", body: "Wypłaty Net-30 przez PayPal, Wise lub ACH. Minimalny próg: $50." },
    ],
    faq: [
      { q: "Co mogę promować?", a: "Wszystko na azdome.com — kamery, akcesoria i karty podarunkowe. Odnowione i wyprzedaże również." },
      { q: "Jak liczona jest prowizja?", a: "Od finalnej kwoty zamówienia po rabatach, przed wysyłką i podatkami. Zwroty w 30 dni odejmowane są od kolejnej wypłaty." },
      { q: "Czy mogę reklamować się płatnie na keywordy marki AZDOME?", a: "Nie — licytowanie terminów marki AZDOME lub odmian zastrzeżonych jest zakazane i grozi dyskwalifikacją. Kampanie non-brand są mile widziane." },
      { q: "Czy jest minimalny rozmiar publiczności?", a: "Bez sztywnego minimum. Przyjmujemy twórców z zaangażowaną publicznością w motoryzacji, przewozach, podróżach rodzinnych, EV i pokrewnych. Poziom Partner jest na zaproszenie wg wyników." },
      { q: "Czy są ograniczenia geograficzne?", a: "Prowizje dla zamówień do USA, Kanady, UK i UE. Inne regiony w trakcie wprowadzania." },
      { q: "Kiedy dostaję wypłatę?", a: "Prowizje z miesiąca kalendarzowego są płatne 1-go następnego miesiąca, net 30 dni na zwroty. PayPal, Wise i ACH wspierane." },
    ],
  },
  ro: {
    stats: [
      { iconName: "DollarSign", value: "10–18%", label: "Comision pe trepte" },
      { iconName: "Users", value: "60 zile", label: "Fereastră cookie" },
      { iconName: "LineChart", value: "$190", label: "Valoare medie comandă" },
      { iconName: "CalendarClock", value: "Net-30", label: "Plan plăți" },
    ],
    tiers: [
      { name: "Starter", rate: "10%", threshold: "Toți creatorii aprobați", perks: ["10% comision la fiecare vânzare aprobată", "Fereastră cookie 60 de zile", "Dashboard lunar de performanță", "Asseturi creative standard (bannere, foto produs, clipuri)"] },
      { name: "Pro", rate: "14%", threshold: "$5.000 vânzări atribuite în 90 zile rulante", perks: ["Tot Starter, plus:", "Account manager dedicat", "Cod de reducere custom (-5% pentru publicul tău)", "Acces timpuriu la lansări", "Sample-uri gratis pentru review"] },
      { name: "Partner", rate: "18%", threshold: "Doar pe invitație", perks: ["Tot Pro, plus:", "Landing pages personalizate cu brandingul tău", "Buget colaborare conținut co-brand", "Sample-uri și firmware pre-lansare", "Review-uri trimestriale și preview roadmap"] },
    ],
    howItWorks: [
      { n: 1, iconName: "BadgeCheck", title: "Aplică", body: "Trimite formularul scurt. Verificăm fiecare aplicație personal — de obicei în 2 zile lucrătoare." },
      { n: 2, iconName: "Megaphone", title: "Promovează", body: "Folosește linkul sau codul tău în YouTube, articole, newslettere sau grupuri de ride-share." },
      { n: 3, iconName: "LineChart", title: "Urmărește", body: "Click-uri, conversii și câștiguri în dashboard real-time. Atribuire: cookie 60 zile + last-click." },
      { n: 4, iconName: "DollarSign", title: "Încasează", body: "Plăți Net-30 prin PayPal, Wise sau ACH. Prag minim: $50." },
    ],
    faq: [
      { q: "Ce pot promova?", a: "Orice de pe azdome.com — camere, accesorii și carduri cadou. Recondiționate și reduceri eligibile." },
      { q: "Cum se calculează comisionul?", a: "La subtotalul final după reduceri, înainte de transport și taxe. Returnările în 30 zile se scad din plata următoare." },
      { q: "Pot face publicitate plătită pe cuvintele cheie de brand AZDOME?", a: "Nu — licitarea termenilor de brand AZDOME sau variantelor înregistrate este interzisă și duce la descalificare. Campanii non-brand sunt binevenite." },
      { q: "Există un minim de audiență?", a: "Fără minim strict. Acceptăm creatori cu audiență implicată în auto, ride-share, călătorii familie, EV și nișe adiacente. Nivelul Partner este doar pe invitație, bazat pe rezultate." },
      { q: "Sunt restricții geografice?", a: "Comisioanele se aplică la comenzi spre SUA, Canada, UK și UE. Alte regiuni urmează cu extinderea stocului." },
      { q: "Când primesc plata?", a: "Comisioanele câștigate într-o lună calendaristică se plătesc pe 1 a lunii următoare, net 30 zile pentru returnări. PayPal, Wise și ACH suportate." },
    ],
  },
  tr: {
    stats: [
      { iconName: "DollarSign", value: "10–18%", label: "Kademeli komisyon" },
      { iconName: "Users", value: "60 gün", label: "Çerez penceresi" },
      { iconName: "LineChart", value: "$190", label: "Ortalama sipariş tutarı" },
      { iconName: "CalendarClock", value: "Net-30", label: "Ödeme takvimi" },
    ],
    tiers: [
      { name: "Starter", rate: "10%", threshold: "Onaylanmış tüm içerik üreticileri", perks: ["Her onaylı satışta %10 komisyon", "60 günlük çerez penceresi", "Aylık performans paneli", "Standart kreatif varlıklar (banner, ürün fotoğrafı, video klip)"] },
      { name: "Pro", rate: "14%", threshold: "Hareketli 90 günde $5.000 atfedilmiş satış", perks: ["Starter'daki her şey, ayrıca:", "Özel affiliate yöneticisi", "Özel indirim kodu (kitleniz için %5)", "Yeni ürün lansmanlarına erken erişim", "Review için ücretsiz ürün gönderimi"] },
      { name: "Partner", rate: "18%", threshold: "Yalnızca davetle", perks: ["Pro'daki her şey, ayrıca:", "Sizin brandinginizle özel landing sayfaları", "Co-brand içerik işbirliği bütçesi", "Lansman öncesi numune ve firmware erişimi", "Üç ayda bir iş incelemeleri ve yol haritası önizleme"] },
    ],
    howItWorks: [
      { n: 1, iconName: "BadgeCheck", title: "Başvuru", body: "Aşağıdaki kısa formu gönderin. Her başvuruyu kişisel olarak değerlendiriyoruz — genellikle 2 iş günü içinde." },
      { n: 2, iconName: "Megaphone", title: "Tanıtım", body: "Özel linkinizi veya kodunuzu YouTube videolarında, bloglarda, bültenlerde veya yolcu taşıma topluluklarında kullanın." },
      { n: 3, iconName: "LineChart", title: "Takip", body: "Tıklamalar, dönüşümler ve kazançları gerçek zamanlı panelde izleyin. Atfetme: 60 günlük çerez + son tıklama." },
      { n: 4, iconName: "DollarSign", title: "Ödeme", body: "PayPal, Wise veya ACH ile Net-30 ödemeler. Minimum eşik: $50." },
    ],
    faq: [
      { q: "Neyi tanıtabilirim?", a: "azdome.com'da satılan her şey — kameralar, aksesuarlar ve hediye kartları. Yenilenmiş ürünler ve indirimler de uygun." },
      { q: "Komisyon nasıl hesaplanır?", a: "İndirimlerden sonra, kargo ve vergiden önceki nihai sipariş alt toplamı üzerinden ödenir. 30 gün içindeki iadeler sonraki ödemeden düşülür." },
      { q: "AZDOME marka anahtar kelimelerine ücretli reklam verebilir miyim?", a: "Hayır — AZDOME marka terimlerine veya ticari markalı varyasyonlara teklif vermek yasaktır ve diskalifiye olur. Marka dışı kampanyalar memnuniyetle karşılanır." },
      { q: "Minimum kitle gerekli mi?", a: "Sıkı bir minimum yok. Otomotiv, yolcu taşıma, aile seyahati, EV sahipliği ve komşu alanlarda etkileşimli kitleye sahip içerik üreticilerini kabul ediyoruz. Partner seviyesi sonuçlara göre yalnızca davetlidir." },
      { q: "Coğrafi kısıtlama var mı?", a: "Komisyonlar ABD, Kanada, İngiltere ve AB'ye gönderilen siparişler için geçerlidir. Diğer bölgeler stok genişlemesiyle eklenecek." },
      { q: "Ne zaman ödenirim?", a: "Bir takvim ayında kazanılan komisyonlar bir sonraki ayın 1'inde, iadeleri hesaba katmak için 30 gün net ödenir. PayPal, Wise ve ACH destekleniyor." },
    ],
  },
  pt: {
    stats: [
      { iconName: "DollarSign", value: "10–18%", label: "Comissão por níveis" },
      { iconName: "Users", value: "60 dias", label: "Janela de cookie" },
      { iconName: "LineChart", value: "$190", label: "Ticket médio" },
      { iconName: "CalendarClock", value: "Net-30", label: "Calendário de pagamentos" },
    ],
    tiers: [
      { name: "Starter", rate: "10%", threshold: "Todos os criadores aprovados", perks: ["10% de comissão em cada venda aprovada", "Janela de cookie de 60 dias", "Dashboard mensal de performance", "Criativos padrão (banners, fotos de produto, clipes de vídeo)"] },
      { name: "Pro", rate: "14%", threshold: "$5.000 em vendas atribuídas em 90 dias rolantes", perks: ["Tudo do Starter, mais:", "Gerente de afiliado dedicado", "Código de desconto custom (-5% para sua audiência)", "Acesso antecipado a lançamentos", "Envio gratuito de produto para review"] },
      { name: "Partner", rate: "18%", threshold: "Somente por convite", perks: ["Tudo do Pro, mais:", "Landing pages personalizadas com seu branding", "Orçamento para colaboração de conteúdo co-brand", "Amostras e firmware pré-lançamento", "Reviews trimestrais e prévia do roadmap"] },
    ],
    howItWorks: [
      { n: 1, iconName: "BadgeCheck", title: "Inscrever-se", body: "Envie o formulário curto. Revisamos cada inscrição pessoalmente — normalmente em 2 dias úteis." },
      { n: 2, iconName: "Megaphone", title: "Divulgar", body: "Use seu link ou cupom em vídeos do YouTube, posts, newsletters ou comunidades de motoristas." },
      { n: 3, iconName: "LineChart", title: "Acompanhar", body: "Cliques, conversões e ganhos em dashboard em tempo real. Atribuição: cookie de 60 dias + último clique." },
      { n: 4, iconName: "DollarSign", title: "Receber", body: "Pagamentos Net-30 via PayPal, Wise ou ACH. Mínimo: $50." },
    ],
    faq: [
      { q: "O que posso divulgar?", a: "Tudo na azdome.com — câmeras, acessórios e cartões-presente. Recondicionados e promoções incluídos." },
      { q: "Como a comissão é calculada?", a: "Sobre o subtotal final após descontos, antes de frete e impostos. Devoluções em 30 dias são descontadas do próximo pagamento." },
      { q: "Posso fazer anúncios pagos em palavras-chave da marca AZDOME?", a: "Não — dar lance em termos de marca AZDOME ou variações registradas é proibido e desqualifica. Campanhas non-brand são bem-vindas." },
      { q: "Tem audiência mínima?", a: "Sem mínimo rígido. Aceitamos criadores com audiência engajada em automotivo, motoristas de app, viagens em família, EV e nichos próximos. O nível Partner é só por convite com base em resultados." },
      { q: "Há restrições geográficas?", a: "Comissões aplicam a pedidos enviados para EUA, Canadá, Reino Unido e UE. Outras regiões em breve conforme expandimos." },
      { q: "Quando recebo?", a: "Comissões de um mês civil são pagas no dia 1 do mês seguinte, net 30 para considerar devoluções. PayPal, Wise e ACH suportados." },
    ],
  },
  ar: {
    stats: [
      { iconName: "DollarSign", value: "10–18%", label: "عمولة متدرجة" },
      { iconName: "Users", value: "60 يومًا", label: "نافذة الكوكيز" },
      { iconName: "LineChart", value: "$190", label: "متوسط قيمة الطلب" },
      { iconName: "CalendarClock", value: "Net-30", label: "جدول الدفع" },
    ],
    tiers: [
      { name: "Starter", rate: "10%", threshold: "جميع المنشئين المعتمدين", perks: ["عمولة 10% على كل عملية بيع معتمدة", "نافذة كوكيز 60 يومًا", "لوحة أداء شهرية", "أصول إبداعية قياسية (لافتات، صور منتج، مقاطع فيديو)"] },
      { name: "Pro", rate: "14%", threshold: "$5,000 من المبيعات المنسوبة خلال 90 يومًا متجددة", perks: ["كل ما في Starter، إضافة إلى:", "مدير أفلييت مخصص", "كود خصم مخصص (5% خصم لجمهورك)", "وصول مبكر لإطلاقات المنتجات الجديدة", "إرسال منتجات مجاني للمراجعات"] },
      { name: "Partner", rate: "18%", threshold: "بالدعوة فقط", perks: ["كل ما في Pro، إضافة إلى:", "صفحات هبوط مخصصة بهويتك", "ميزانية تعاون محتوى مشترك", "عينات وبرنامج ثابت قبل الإطلاق", "مراجعات أعمال ربع سنوية ومعاينات لخريطة الطريق"] },
    ],
    howItWorks: [
      { n: 1, iconName: "BadgeCheck", title: "قدّم", body: "أرسل النموذج القصير أدناه. نراجع كل طلب شخصيًا — عادةً خلال يومَي عمل." },
      { n: 2, iconName: "Megaphone", title: "روّج", body: "استخدم رابطك أو كود خصمك في مقاطع YouTube، أو المدونات، أو الرسائل، أو مجتمعات سائقي خدمات النقل." },
      { n: 3, iconName: "LineChart", title: "تتبّع", body: "شاهد النقرات والتحويلات والأرباح في لوحتك الحية. الإسناد: كوكيز 60 يومًا + آخر نقرة." },
      { n: 4, iconName: "DollarSign", title: "احصل على الدفع", body: "مدفوعات Net-30 عبر PayPal أو Wise أو ACH. الحد الأدنى: $50." },
    ],
    faq: [
      { q: "ماذا يمكنني الترويج له؟", a: "أي شيء يُباع على azdome.com — الكاميرات والإكسسوارات وبطاقات الهدايا. الوحدات المجدَّدة والعروض الحالية مؤهَّلة." },
      { q: "كيف تُحسب العمولة؟", a: "على الإجمالي الفرعي النهائي للطلب بعد أي خصومات وقبل الشحن والضرائب. تُخصم المرتجعات خلال 30 يومًا من الدفعة التالية." },
      { q: "هل يمكنني تشغيل إعلانات مدفوعة على كلمات علامة AZDOME؟", a: "لا — المزايدة على مصطلحات علامة AZDOME أو متغيراتها المسجَّلة محظورة وتؤدي إلى الاستبعاد. حملات الكلمات غير المتعلقة بالعلامة مرحَّب بها." },
      { q: "هل هناك حد أدنى لحجم الجمهور؟", a: "لا حد أدنى صارم. نقبل المنشئين بجمهور متفاعل في السيارات، نقل الركاب، السفر العائلي، السيارات الكهربائية، والمجالات المجاورة. المستوى Partner بالدعوة فقط بناءً على النتائج." },
      { q: "هل توجد قيود جغرافية؟", a: "تنطبق العمولات على الطلبات المشحونة إلى الولايات المتحدة، كندا، المملكة المتحدة، والاتحاد الأوروبي. مناطق أخرى قادمة مع توسيع المخزون." },
      { q: "متى أحصل على الدفعة؟", a: "تُدفع عمولات الشهر التقويمي في الأول من الشهر التالي، net 30 يومًا لاحتساب المرتجعات. PayPal و Wise و ACH مدعومة." },
    ],
  },
  th: {
    stats: [
      { iconName: "DollarSign", value: "10–18%", label: "ค่าคอมแบบขั้น" },
      { iconName: "Users", value: "60 วัน", label: "ช่วง Cookie" },
      { iconName: "LineChart", value: "$190", label: "มูลค่าออเดอร์เฉลี่ย" },
      { iconName: "CalendarClock", value: "Net-30", label: "รอบจ่ายเงิน" },
    ],
    tiers: [
      { name: "Starter", rate: "10%", threshold: "ครีเอเตอร์ที่ได้รับอนุมัติทั้งหมด", perks: ["ค่าคอม 10% ทุกการขายที่อนุมัติ", "Cookie 60 วัน", "Dashboard ผลงานรายเดือน", "ชุดครีเอทีฟมาตรฐาน (แบนเนอร์ รูปสินค้า คลิป)"] },
      { name: "Pro", rate: "14%", threshold: "ยอดขายที่นับเป็นของคุณ $5,000 ใน 90 วันต่อเนื่อง", perks: ["ทุกอย่างใน Starter เพิ่ม:", "ผู้จัดการพันธมิตรเฉพาะ", "โค้ดส่วนลดเฉพาะ (-5% สำหรับผู้ติดตาม)", "เข้าถึงการเปิดตัวก่อน", "ส่งสินค้ารีวิวฟรี"] },
      { name: "Partner", rate: "18%", threshold: "เฉพาะคำเชิญ", perks: ["ทุกอย่างใน Pro เพิ่ม:", "Landing page เฉพาะที่มีแบรนด์คุณ", "งบประมาณคอนเทนต์ co-brand", "ตัวอย่างและเฟิร์มแวร์ก่อนเปิดตัว", "รีวิวธุรกิจรายไตรมาสและพรีวิว roadmap"] },
    ],
    howItWorks: [
      { n: 1, iconName: "BadgeCheck", title: "สมัคร", body: "กรอกฟอร์มสั้นๆ ด้านล่าง เราพิจารณาทุกใบสมัครด้วยตัวเอง โดยปกติภายใน 2 วันทำการ" },
      { n: 2, iconName: "Megaphone", title: "โปรโมท", body: "ใช้ลิงก์หรือโค้ดเฉพาะของคุณในคลิป YouTube บล็อก จดหมายข่าว หรือกลุ่ม Rideshare" },
      { n: 3, iconName: "LineChart", title: "ติดตาม", body: "ดูคลิก, conversion และรายได้ใน Dashboard เรียลไทม์ Attribution: cookie 60 วัน + คลิกสุดท้าย" },
      { n: 4, iconName: "DollarSign", title: "รับเงิน", body: "จ่าย Net-30 ผ่าน PayPal, Wise หรือ ACH ขั้นต่ำ $50" },
    ],
    faq: [
      { q: "ฉันโปรโมทอะไรได้บ้าง?", a: "ทุกอย่างบน azdome.com — กล้อง อุปกรณ์เสริม และบัตรของขวัญ รวมเครื่องรีเฟอร์บิชและการลดราคาด้วย" },
      { q: "คำนวณค่าคอมยังไง?", a: "จากยอดสุทธิหลังหักส่วนลด ก่อนค่าจัดส่งและภาษี การคืนสินค้าภายใน 30 วันจะถูกหักจากการจ่ายงวดถัดไป" },
      { q: "ลงโฆษณาคีย์เวิร์ดแบรนด์ AZDOME ได้ไหม?", a: "ไม่ได้ — การประมูลคีย์แบรนด์ AZDOME หรือเครื่องหมายการค้าใกล้เคียงเป็นสิ่งต้องห้ามและจะถูกตัดสิทธิ์ แคมเปญที่ไม่ใช่แบรนด์ยินดีต้อนรับ" },
      { q: "ต้องมีจำนวนผู้ติดตามขั้นต่ำหรือไม่?", a: "ไม่มีขั้นต่ำตายตัว เรารับครีเอเตอร์ที่มีผู้ติดตามกระตือรือร้นในวงการรถยนต์, Rideshare, ครอบครัวเดินทาง, EV และอุตสาหกรรมข้างเคียง ระดับ Partner เฉพาะคำเชิญ พิจารณาจากผลงาน" },
      { q: "มีข้อจำกัดเชิงภูมิศาสตร์ไหม?", a: "ค่าคอมใช้กับออเดอร์ที่ส่งไปยังสหรัฐฯ แคนาดา สหราชอาณาจักร และอียู ภูมิภาคอื่นจะเพิ่มตามการขยายสต็อก" },
      { q: "ได้รับเงินเมื่อไหร่?", a: "ค่าคอมที่ได้ในเดือนปฏิทินจะจ่ายในวันที่ 1 ของเดือนถัดไป net 30 วันสำหรับการคืนสินค้า รองรับ PayPal, Wise และ ACH" },
    ],
  },
  vi: {
    stats: [
      { iconName: "DollarSign", value: "10–18%", label: "Hoa hồng theo bậc" },
      { iconName: "Users", value: "60 ngày", label: "Cửa sổ cookie" },
      { iconName: "LineChart", value: "$190", label: "Giá trị đơn trung bình" },
      { iconName: "CalendarClock", value: "Net-30", label: "Lịch thanh toán" },
    ],
    tiers: [
      { name: "Starter", rate: "10%", threshold: "Mọi creator được duyệt", perks: ["Hoa hồng 10% mỗi đơn được duyệt", "Cửa sổ cookie 60 ngày", "Dashboard hiệu suất hàng tháng", "Bộ creative chuẩn (banner, ảnh sản phẩm, clip)"] },
      { name: "Pro", rate: "14%", threshold: "$5.000 doanh số quy về trong 90 ngày luân phiên", perks: ["Mọi thứ trong Starter, cộng thêm:", "Quản lý affiliate riêng", "Mã giảm giá tùy chỉnh (-5% cho khán giả)", "Truy cập sớm các đợt ra mắt", "Tặng sản phẩm miễn phí cho review"] },
      { name: "Partner", rate: "18%", threshold: "Chỉ theo lời mời", perks: ["Mọi thứ trong Pro, cộng thêm:", "Trang đích tùy chỉnh có thương hiệu của bạn", "Ngân sách hợp tác nội dung co-brand", "Mẫu sản phẩm và firmware trước ra mắt", "Đánh giá kinh doanh hàng quý và xem trước lộ trình"] },
    ],
    howItWorks: [
      { n: 1, iconName: "BadgeCheck", title: "Đăng ký", body: "Gửi biểu mẫu ngắn bên dưới. Chúng tôi xem xét từng đơn cá nhân — thường trong 2 ngày làm việc." },
      { n: 2, iconName: "Megaphone", title: "Quảng bá", body: "Dùng liên kết riêng hoặc mã giảm giá trong video YouTube, bài blog, newsletter hoặc cộng đồng tài xế công nghệ." },
      { n: 3, iconName: "LineChart", title: "Theo dõi", body: "Xem nhấp, chuyển đổi và thu nhập trên dashboard thời gian thực. Phân bổ: cookie 60 ngày + last-click." },
      { n: 4, iconName: "DollarSign", title: "Nhận tiền", body: "Thanh toán Net-30 qua PayPal, Wise hoặc ACH. Mức tối thiểu: $50." },
    ],
    faq: [
      { q: "Tôi có thể quảng bá những gì?", a: "Mọi thứ bán trên azdome.com — camera, phụ kiện và thẻ quà tặng. Bao gồm hàng tân trang và đợt giảm giá." },
      { q: "Hoa hồng được tính thế nào?", a: "Trên tổng phụ cuối cùng sau giảm giá, trước phí vận chuyển và thuế. Đơn trả trong 30 ngày bị trừ vào lần thanh toán tới." },
      { q: "Tôi có thể chạy quảng cáo trả phí trên từ khóa thương hiệu AZDOME không?", a: "Không — đấu giá thuật ngữ thương hiệu AZDOME hoặc biến thể đã đăng ký bị cấm và sẽ bị loại. Chiến dịch từ khóa ngoài thương hiệu được hoan nghênh." },
      { q: "Có yêu cầu lượng khán giả tối thiểu không?", a: "Không có tối thiểu cứng. Chúng tôi nhận creator có khán giả tương tác trong ngành ô tô, xe công nghệ, du lịch gia đình, EV và các ngành liên quan. Hạng Partner chỉ theo lời mời dựa trên thành tích." },
      { q: "Có giới hạn địa lý không?", a: "Hoa hồng áp dụng cho đơn ship đến Mỹ, Canada, Anh và EU. Các khu vực khác sẽ mở rộng sau." },
      { q: "Khi nào tôi được trả tiền?", a: "Hoa hồng kiếm được trong một tháng dương lịch được thanh toán vào ngày 1 tháng sau, net 30 ngày cho hoàn trả. PayPal, Wise và ACH đều hỗ trợ." },
    ],
  },
};

export function getDefaultAffiliate(locale: Locale): AffiliateContent {
  return AFFILIATE_BY_LOCALE[locale] ?? AFFILIATE_BY_LOCALE.en!;
}

export const STATS = EN.stats;
export const TIERS = EN.tiers;
export const HOW_IT_WORKS = EN.howItWorks;
export const FAQ = EN.faq;

export const AFFILIATE_PAGE: ContentSection<AffiliateContent> = {
  key: "affiliate.page",
  label: "Affiliate 页 · Stats / Tiers / How it works / FAQ",
  description:
    "联盟计划页:统计、佣金等级、流程、常见问题。" +
    `Stats iconName: ${AFFILIATE_STAT_ICONS.join(", ")} · ` +
    `Steps iconName: ${AFFILIATE_STEP_ICONS.join(", ")}`,
  page: "affiliate",
  previewHref: "/affiliate",
  defaults: getDefaultAffiliate,
};
