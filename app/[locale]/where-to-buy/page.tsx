"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  Globe2,
  Headphones,
  MapPin,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Store,
  Truck,
  X,
  Zap,
} from "lucide-react";

import Logo from "@/components/ui/Logo";
import { useLocale } from "@/components/LocaleProvider";
import type { Locale } from "@/lib/i18n/dictionaries";
import {
  REGIONS,
  RETAILERS,
  TOTAL_CHANNELS,
  countForRegion,
  retailersForRegion,
  type RegionCode,
  type Retailer,
} from "@/lib/retailers";

type Copy = {
  eyebrow: string;
  titleA: string;
  titleB: string;
  sub: string;
  statCountries: string;
  statChannels: string;
  statWarranty: string;
  regionLabel: string;
  detected: string;
  searchPh: string;
  clearSearch: string;
  buyDirectLabel: string;
  official: string;
  madeBy: string;
  officialDesc: string;
  pillFreeShip: string;
  pillWarranty: string;
  pill30Day: string;
  pillBundle: string;
  visitOfficial: string;
  authChannelsEyebrow: string;
  authChannelsTitle: string;
  authChannelsSub: string;
  trust1Title: string;
  trust1Body: string;
  trust2Title: string;
  trust2Body: string;
  trust3Title: string;
  trust3Body: string;
  trust4Title: string;
  trust4Body: string;
  marketplacesEyebrow: string;
  marketplacesTitle: string;
  marketplaceCountPrefix: string;
  marketplaceSingular: string;
  marketplacePlural: string;
  inRegion: string;
  retailersEyebrow: string;
  retailersTitle: string;
  retailerCountPrefix: string;
  retailerSingular: string;
  retailerPlural: string;
  noMatchTitle: string;
  noMatchSubA: string;
  noMatchSubB: string;
  unauthorizedTitle: string;
  unauthorizedBody1: string;
  unauthorizedBody2: string;
  wholesaleTitle: string;
  wholesaleSub: string;
  becomePartner: string;
  shopAt: string;
};

const COPY: Partial<Record<Locale, Copy>> = {
  en: { eyebrow: "Where to Buy", titleA: "Buy AZDOME with confidence,", titleB: "anywhere in the world.", sub: "Authorized resellers in 60+ countries. Same product, same warranty, same support — whether you shop direct or at your favorite marketplace.", statCountries: "Countries", statChannels: "Retail channels", statWarranty: "Warranty", regionLabel: "Region", detected: "Detected", searchPh: "Find a retailer…", clearSearch: "Clear", buyDirectLabel: "Buy direct from AZDOME", official: "Official", madeBy: "Made by AZDOME, sold by AZDOME", officialDesc: "Latest models, exclusive bundles, and the fastest path to warranty support. Best for new launches and dash-cam + accessory deals.", pillFreeShip: "Free shipping over $99", pillWarranty: "2-year warranty", pill30Day: "30-day returns", pillBundle: "Bundle discounts", visitOfficial: "Visit official store", authChannelsEyebrow: "Authorized channels", authChannelsTitle: "Why every listed channel is the same purchase.", authChannelsSub: "We treat every authorized reseller the same way — full warranty, full software support, and direct help from us. Unlisted resellers are not authorized and cannot honor warranty claims.", trust1Title: "Genuine products", trust1Body: "Every listed reseller is an authorized AZDOME channel. We verify serial-number eligibility for warranty support.", trust2Title: "Full 2-year warranty", trust2Body: "Same coverage whether you buy from us directly, Amazon, or a local retailer. We honor warranty across channels.", trust3Title: "Firmware updates", trust3Body: "5 years of free firmware updates from the launch of every camera. Activated automatically via the AZDOME app.", trust4Title: "24×7 support", trust4Body: "Direct technical support from the AZDOME team — chat, email, or phone — no matter where you purchased.", marketplacesEyebrow: "Online marketplaces", marketplacesTitle: "Familiar checkout. Same warranty.", marketplaceCountPrefix: "", marketplaceSingular: "marketplace", marketplacePlural: "marketplaces", inRegion: "in", retailersEyebrow: "Local retailers", retailersTitle: "In-store, near you.", retailerCountPrefix: "", retailerSingular: "retailer", retailerPlural: "retailers", noMatchTitle: "No matching retailers", noMatchSubA: "We're expanding rapidly. Buy direct from", noMatchSubB: "— we ship to your region.", unauthorizedTitle: "Only listed channels are authorized.", unauthorizedBody1: "We can't verify warranty or firmware eligibility for AZDOME cameras purchased from gray-market resellers. If you're unsure whether a seller is authorized, email", unauthorizedBody2: "with the listing URL before you buy.", wholesaleTitle: "Want to stock AZDOME?", wholesaleSub: "We're actively partnering with retailers, fleet integrators, and resellers across all regions. Volume pricing starts at 10 units.", becomePartner: "Become a partner", shopAt: "Shop at" },
  zh: { eyebrow: "购买渠道", titleA: "放心选购 AZDOME,", titleB: "全球可达。", sub: "60+ 国家授权经销商。无论从我们直购,还是从你常用的电商,产品、保修、支持完全一致。", statCountries: "国家", statChannels: "零售渠道", statWarranty: "保修", regionLabel: "区域", detected: "已识别", searchPh: "查找零售商…", clearSearch: "清除", buyDirectLabel: "直接向 AZDOME 购买", official: "官方", madeBy: "由 AZDOME 制造,由 AZDOME 销售", officialDesc: "最新机型、独家套装,以及最快捷的保修支持路径。新品首发与摄像头+配件套装的最佳选择。", pillFreeShip: "$99 以上免运", pillWarranty: "2 年保修", pill30Day: "30 天退货", pillBundle: "套装优惠", visitOfficial: "访问官方商店", authChannelsEyebrow: "授权渠道", authChannelsTitle: "为什么每个列表渠道都是一样的购买。", authChannelsSub: "我们对每个授权经销商一视同仁 — 完整保修、完整软件支持、来自我们的直接帮助。未列入名单的经销商未经授权,无法兑现保修。", trust1Title: "正品保证", trust1Body: "每个列表经销商都是 AZDOME 授权渠道。我们通过序列号验证保修资格。", trust2Title: "完整 2 年保修", trust2Body: "无论从我们直购、Amazon 或本地零售商购买,保修覆盖一致。我们跨渠道履约。", trust3Title: "固件更新", trust3Body: "每台摄像头自发布起 5 年免费固件更新。通过 AZDOME App 自动激活。", trust4Title: "7×24 支持", trust4Body: "无论从哪里购买,都可直接获得 AZDOME 团队的技术支持 — 聊天、邮件或电话。", marketplacesEyebrow: "在线平台", marketplacesTitle: "熟悉的结账流程,同样的保修。", marketplaceCountPrefix: "", marketplaceSingular: "个平台", marketplacePlural: "个平台", inRegion: "·", retailersEyebrow: "本地零售商", retailersTitle: "线下店,就在你身边。", retailerCountPrefix: "", retailerSingular: "家零售商", retailerPlural: "家零售商", noMatchTitle: "暂无匹配的零售商", noMatchSubA: "我们正在快速扩展。可直接从", noMatchSubB: "购买 — 我们发货到你所在的区域。", unauthorizedTitle: "仅列表渠道为授权渠道。", unauthorizedBody1: "对于从灰色市场经销商购买的 AZDOME 摄像头,我们无法验证保修或固件资格。如不确定某经销商是否授权,购买前请将商品链接邮件至", unauthorizedBody2: "确认。", wholesaleTitle: "想做 AZDOME 经销?", wholesaleSub: "我们正积极在所有区域寻找零售商、车队集成商和经销商合作伙伴。批发起订量 10 台。", becomePartner: "成为合作伙伴", shopAt: "在以下平台购买:" },
  ja: { eyebrow: "購入先", titleA: "AZDOME を安心して、", titleB: "世界中どこでも購入できます。", sub: "60 以上の国の認定リセラー。直販でも、いつものマーケットプレイスでも、同じ製品・同じ保証・同じサポート。", statCountries: "国", statChannels: "販売チャネル", statWarranty: "保証", regionLabel: "地域", detected: "検出済み", searchPh: "リセラーを検索…", clearSearch: "クリア", buyDirectLabel: "AZDOME から直接購入", official: "公式", madeBy: "AZDOME 製造、AZDOME 販売", officialDesc: "最新モデル、限定バンドル、最速の保証サポート。新発売やドラレコ+アクセサリーのお得な組み合わせに最適。", pillFreeShip: "$99 以上送料無料", pillWarranty: "2 年保証", pill30Day: "30 日返品", pillBundle: "バンドル割引", visitOfficial: "公式ストアへ", authChannelsEyebrow: "認定チャネル", authChannelsTitle: "どのチャネルでも同じ購入である理由。", authChannelsSub: "認定リセラーは全て同じ扱い — 全保証、全ソフトウェアサポート、当社からの直接ヘルプ。リスト外のリセラーは認定されておらず保証請求に応じられません。", trust1Title: "正規品", trust1Body: "リスト記載のリセラーは全て AZDOME 認定チャネル。シリアル番号で保証資格を検証します。", trust2Title: "2 年保証フル", trust2Body: "当社直販でも Amazon でも地元小売でも同じ補償範囲。チャネルを越えて保証します。", trust3Title: "ファームウェア更新", trust3Body: "全カメラに発売から 5 年間の無料ファームウェア更新。AZDOME アプリで自動有効化。", trust4Title: "24 時間 365 日サポート", trust4Body: "どこで購入しても AZDOME チームのテクニカルサポートに直接アクセス可能 — チャット、メール、電話。", marketplacesEyebrow: "オンラインマーケットプレイス", marketplacesTitle: "慣れたチェックアウト、同じ保証。", marketplaceCountPrefix: "", marketplaceSingular: "件のマーケットプレイス", marketplacePlural: "件のマーケットプレイス", inRegion: "·", retailersEyebrow: "地元小売店", retailersTitle: "店舗で、お近くに。", retailerCountPrefix: "", retailerSingular: "件の小売店", retailerPlural: "件の小売店", noMatchTitle: "該当する小売店なし", noMatchSubA: "急速に展開中です。直販は", noMatchSubB: "から — お住まいの地域に発送します。", unauthorizedTitle: "認定チャネルのみが正規です。", unauthorizedBody1: "並行輸入業者から購入した AZDOME カメラの保証・ファームウェア適格性は検証できません。販売者が認定済みか不明な場合は、購入前に商品 URL を", unauthorizedBody2: "までお送りください。", wholesaleTitle: "AZDOME を取り扱いますか?", wholesaleSub: "全地域で小売店、フリート統合、リセラーパートナーを積極募集中。10 台からのボリュームプライス。", becomePartner: "パートナーに", shopAt: "購入先:" },
  de: { eyebrow: "Wo kaufen", titleA: "Kaufen Sie AZDOME mit Vertrauen,", titleB: "überall auf der Welt.", sub: "Autorisierte Reseller in 60+ Ländern. Gleiches Produkt, gleiche Garantie, gleicher Support — ob Sie direkt oder über Ihren Lieblingshändler kaufen.", statCountries: "Länder", statChannels: "Vertriebskanäle", statWarranty: "Garantie", regionLabel: "Region", detected: "Erkannt", searchPh: "Händler suchen…", clearSearch: "Löschen", buyDirectLabel: "Direkt bei AZDOME kaufen", official: "Offiziell", madeBy: "Hergestellt von AZDOME, verkauft von AZDOME", officialDesc: "Neueste Modelle, exklusive Bundles und der schnellste Weg zum Garantieservice. Ideal für Neuvorstellungen und Dashcam-+-Zubehör-Deals.", pillFreeShip: "Versandkostenfrei ab $99", pillWarranty: "2 Jahre Garantie", pill30Day: "30 Tage Rückgabe", pillBundle: "Bundle-Rabatte", visitOfficial: "Zum Offizial-Store", authChannelsEyebrow: "Autorisierte Kanäle", authChannelsTitle: "Warum jeder gelistete Kanal derselbe Kauf ist.", authChannelsSub: "Wir behandeln jeden autorisierten Reseller gleich — volle Garantie, voller Software-Support, direkte Hilfe von uns. Nicht gelistete Reseller sind nicht autorisiert und können keine Garantieansprüche einlösen.", trust1Title: "Echte Produkte", trust1Body: "Jeder gelistete Reseller ist ein autorisierter AZDOME-Kanal. Wir prüfen Seriennummer-Eligibility für den Garantieservice.", trust2Title: "Volle 2 Jahre Garantie", trust2Body: "Gleicher Schutz, ob Sie direkt, bei Amazon oder einem lokalen Händler kaufen. Wir gewähren Garantie kanalübergreifend.", trust3Title: "Firmware-Updates", trust3Body: "5 Jahre kostenlose Firmware-Updates ab Markteinführung jeder Kamera. Automatisch über die AZDOME-App aktiviert.", trust4Title: "24×7 Support", trust4Body: "Direkter technischer Support vom AZDOME-Team — Chat, E-Mail oder Telefon — egal wo Sie gekauft haben.", marketplacesEyebrow: "Online-Marktplätze", marketplacesTitle: "Vertrauter Checkout. Gleiche Garantie.", marketplaceCountPrefix: "", marketplaceSingular: "Marktplatz", marketplacePlural: "Marktplätze", inRegion: "in", retailersEyebrow: "Lokale Händler", retailersTitle: "Im Laden, in Ihrer Nähe.", retailerCountPrefix: "", retailerSingular: "Händler", retailerPlural: "Händler", noMatchTitle: "Keine passenden Händler", noMatchSubA: "Wir expandieren rasant. Direkt kaufen bei", noMatchSubB: "— wir liefern in Ihre Region.", unauthorizedTitle: "Nur gelistete Kanäle sind autorisiert.", unauthorizedBody1: "Wir können Garantie- oder Firmware-Eligibility für AZDOME-Kameras von Grau-Markt-Resellern nicht verifizieren. Wenn Sie unsicher sind, ob ein Verkäufer autorisiert ist, schreiben Sie vor dem Kauf an", unauthorizedBody2: "mit der Listing-URL.", wholesaleTitle: "AZDOME im Sortiment führen?", wholesaleSub: "Wir bauen aktiv Partnerschaften mit Händlern, Flottenintegratoren und Resellern in allen Regionen auf. Volumenpreise ab 10 Einheiten.", becomePartner: "Partner werden", shopAt: "Kaufen bei" },
  fr: { eyebrow: "Où acheter", titleA: "Achetez AZDOME en toute confiance,", titleB: "partout dans le monde.", sub: "Revendeurs autorisés dans 60+ pays. Même produit, même garantie, même support — que vous achetiez en direct ou sur votre marketplace préférée.", statCountries: "Pays", statChannels: "Canaux de vente", statWarranty: "Garantie", regionLabel: "Région", detected: "Détecté", searchPh: "Trouver un revendeur…", clearSearch: "Effacer", buyDirectLabel: "Achetez directement chez AZDOME", official: "Officiel", madeBy: "Fabriqué par AZDOME, vendu par AZDOME", officialDesc: "Derniers modèles, bundles exclusifs et accès le plus rapide au support garantie. Idéal pour les nouveautés et les packs dashcam + accessoires.", pillFreeShip: "Livraison gratuite > $99", pillWarranty: "Garantie 2 ans", pill30Day: "Retour 30 jours", pillBundle: "Réductions bundle", visitOfficial: "Voir la boutique officielle", authChannelsEyebrow: "Canaux autorisés", authChannelsTitle: "Pourquoi chaque canal listé est le même achat.", authChannelsSub: "Nous traitons tous les revendeurs autorisés de la même manière — garantie complète, support logiciel complet, aide directe. Les revendeurs non listés ne sont pas autorisés et ne peuvent pas honorer les garanties.", trust1Title: "Produits authentiques", trust1Body: "Chaque revendeur listé est un canal AZDOME autorisé. Nous vérifions l'éligibilité par numéro de série pour la garantie.", trust2Title: "Garantie 2 ans complète", trust2Body: "Même couverture si vous achetez chez nous, sur Amazon, ou chez un revendeur local. Nous honorons la garantie tous canaux.", trust3Title: "Mises à jour firmware", trust3Body: "5 ans de mises à jour firmware gratuites à partir du lancement de chaque caméra. Activées via l'app AZDOME.", trust4Title: "Support 24/7", trust4Body: "Support technique direct de l'équipe AZDOME — chat, e-mail ou téléphone — peu importe où vous avez acheté.", marketplacesEyebrow: "Marketplaces en ligne", marketplacesTitle: "Checkout familier. Même garantie.", marketplaceCountPrefix: "", marketplaceSingular: "marketplace", marketplacePlural: "marketplaces", inRegion: "en", retailersEyebrow: "Distributeurs locaux", retailersTitle: "En magasin, près de chez vous.", retailerCountPrefix: "", retailerSingular: "distributeur", retailerPlural: "distributeurs", noMatchTitle: "Aucun distributeur correspondant", noMatchSubA: "Nous nous étendons rapidement. Achetez en direct sur", noMatchSubB: "— nous livrons dans votre région.", unauthorizedTitle: "Seuls les canaux listés sont autorisés.", unauthorizedBody1: "Nous ne pouvons pas vérifier l'éligibilité garantie ou firmware des caméras AZDOME achetées chez des revendeurs gris. En cas de doute sur un vendeur autorisé, envoyez l'URL de l'annonce à", unauthorizedBody2: "avant d'acheter.", wholesaleTitle: "Envie de distribuer AZDOME ?", wholesaleSub: "Nous développons activement nos partenariats avec distributeurs, intégrateurs flottes et revendeurs dans toutes les régions. Tarifs volume dès 10 unités.", becomePartner: "Devenir partenaire", shopAt: "Acheter chez" },
  es: { eyebrow: "Dónde comprar", titleA: "Compra AZDOME con confianza,", titleB: "en cualquier parte del mundo.", sub: "Revendedores autorizados en 60+ países. Mismo producto, misma garantía, mismo soporte — compres directo o en tu marketplace favorito.", statCountries: "Países", statChannels: "Canales de venta", statWarranty: "Garantía", regionLabel: "Región", detected: "Detectado", searchPh: "Buscar revendedor…", clearSearch: "Limpiar", buyDirectLabel: "Compra directa en AZDOME", official: "Oficial", madeBy: "Fabricado por AZDOME, vendido por AZDOME", officialDesc: "Modelos más recientes, bundles exclusivos y la vía más rápida al soporte de garantía. Ideal para lanzamientos y packs dash cam + accesorios.", pillFreeShip: "Envío gratis sobre $99", pillWarranty: "Garantía 2 años", pill30Day: "Devolución 30 días", pillBundle: "Descuentos en bundle", visitOfficial: "Visitar tienda oficial", authChannelsEyebrow: "Canales autorizados", authChannelsTitle: "Por qué cada canal listado es la misma compra.", authChannelsSub: "Tratamos a cada revendedor autorizado igual — garantía completa, soporte de software completo, ayuda directa. Los revendedores no listados no están autorizados y no pueden honrar la garantía.", trust1Title: "Productos genuinos", trust1Body: "Cada revendedor listado es canal AZDOME autorizado. Verificamos la elegibilidad por número de serie para garantía.", trust2Title: "Garantía 2 años completa", trust2Body: "Misma cobertura compres directo, en Amazon o en un local. Honramos la garantía entre canales.", trust3Title: "Actualizaciones de firmware", trust3Body: "5 años de actualizaciones gratis desde el lanzamiento de cada cámara. Activadas vía la app AZDOME.", trust4Title: "Soporte 24×7", trust4Body: "Soporte técnico directo del equipo AZDOME — chat, email o teléfono — independientemente de dónde compraste.", marketplacesEyebrow: "Marketplaces online", marketplacesTitle: "Checkout familiar. Misma garantía.", marketplaceCountPrefix: "", marketplaceSingular: "marketplace", marketplacePlural: "marketplaces", inRegion: "en", retailersEyebrow: "Distribuidores locales", retailersTitle: "En tienda, cerca de ti.", retailerCountPrefix: "", retailerSingular: "distribuidor", retailerPlural: "distribuidores", noMatchTitle: "Sin distribuidores en", noMatchSubA: "Nos expandimos rápido. Compra directo en", noMatchSubB: "— enviamos a tu región.", unauthorizedTitle: "Solo los canales listados están autorizados.", unauthorizedBody1: "No podemos verificar elegibilidad de garantía ni firmware para cámaras AZDOME compradas a revendedores grises. Si dudas si un vendedor está autorizado, escribe a", unauthorizedBody2: "con la URL del anuncio antes de comprar.", wholesaleTitle: "¿Quieres vender AZDOME?", wholesaleSub: "Buscamos activamente alianzas con minoristas, integradores de flotas y revendedores en todas las regiones. Precios por volumen desde 10 unidades.", becomePartner: "Hazte partner", shopAt: "Comprar en" },
  it: { eyebrow: "Dove comprare", titleA: "Compra AZDOME con fiducia,", titleB: "ovunque nel mondo.", sub: "Rivenditori autorizzati in 60+ paesi. Stesso prodotto, stessa garanzia, stesso supporto — sia che acquisti diretto o sul tuo marketplace preferito.", statCountries: "Paesi", statChannels: "Canali di vendita", statWarranty: "Garanzia", regionLabel: "Regione", detected: "Rilevato", searchPh: "Cerca un rivenditore…", clearSearch: "Pulisci", buyDirectLabel: "Acquista direttamente da AZDOME", official: "Ufficiale", madeBy: "Prodotto da AZDOME, venduto da AZDOME", officialDesc: "Modelli più recenti, bundle esclusivi e il percorso più rapido al supporto garanzia. Ideale per nuovi lanci e pacchetti dash cam + accessori.", pillFreeShip: "Spedizione gratis oltre $99", pillWarranty: "Garanzia 2 anni", pill30Day: "Reso 30 giorni", pillBundle: "Sconti bundle", visitOfficial: "Vai al negozio ufficiale", authChannelsEyebrow: "Canali autorizzati", authChannelsTitle: "Perché ogni canale elencato è lo stesso acquisto.", authChannelsSub: "Trattiamo ogni rivenditore autorizzato allo stesso modo — garanzia piena, supporto software pieno, aiuto diretto. I rivenditori non elencati non sono autorizzati e non possono onorare la garanzia.", trust1Title: "Prodotti autentici", trust1Body: "Ogni rivenditore elencato è un canale AZDOME autorizzato. Verifichiamo l'idoneità via numero di serie per la garanzia.", trust2Title: "Garanzia 2 anni piena", trust2Body: "Stessa copertura sia che compri da noi, Amazon o un negozio locale. Onoriamo la garanzia tra canali.", trust3Title: "Aggiornamenti firmware", trust3Body: "5 anni di aggiornamenti firmware gratis dal lancio di ogni telecamera. Attivati via l'app AZDOME.", trust4Title: "Supporto 24×7", trust4Body: "Supporto tecnico diretto dal team AZDOME — chat, email o telefono — indipendentemente da dove hai acquistato.", marketplacesEyebrow: "Marketplace online", marketplacesTitle: "Checkout familiare. Stessa garanzia.", marketplaceCountPrefix: "", marketplaceSingular: "marketplace", marketplacePlural: "marketplace", inRegion: "in", retailersEyebrow: "Rivenditori locali", retailersTitle: "In negozio, vicino a te.", retailerCountPrefix: "", retailerSingular: "rivenditore", retailerPlural: "rivenditori", noMatchTitle: "Nessun rivenditore in", noMatchSubA: "Stiamo espandendo rapidamente. Compra diretto da", noMatchSubB: "— spediamo nella tua regione.", unauthorizedTitle: "Solo i canali elencati sono autorizzati.", unauthorizedBody1: "Non possiamo verificare idoneità garanzia o firmware per telecamere AZDOME acquistate da rivenditori del mercato grigio. In dubbio sull'autorizzazione di un venditore, scrivi a", unauthorizedBody2: "con l'URL del listing prima di acquistare.", wholesaleTitle: "Vuoi rivendere AZDOME?", wholesaleSub: "Attivamente in cerca di partner — rivenditori, integratori di flotte e dealer in tutte le regioni. Prezzi a volume da 10 unità.", becomePartner: "Diventa partner", shopAt: "Compra su" },
  ru: { eyebrow: "Где купить", titleA: "Покупайте AZDOME с уверенностью,", titleB: "в любой точке мира.", sub: "Авторизованные продавцы в 60+ странах. Тот же продукт, та же гарантия, та же поддержка — покупаете ли вы напрямую или у любимого маркетплейса.", statCountries: "Стран", statChannels: "Каналы продаж", statWarranty: "Гарантия", regionLabel: "Регион", detected: "Определено", searchPh: "Найти продавца…", clearSearch: "Очистить", buyDirectLabel: "Купить напрямую у AZDOME", official: "Официально", madeBy: "Произведено AZDOME, продано AZDOME", officialDesc: "Свежие модели, эксклюзивные комплекты и самый быстрый путь к гарантийному сервису. Лучший выбор для новинок и наборов «камера + аксессуары».", pillFreeShip: "Бесплатная доставка от $99", pillWarranty: "Гарантия 2 года", pill30Day: "Возврат 30 дней", pillBundle: "Скидки на комплекты", visitOfficial: "Перейти в официальный магазин", authChannelsEyebrow: "Авторизованные каналы", authChannelsTitle: "Почему каждый указанный канал — это одна и та же покупка.", authChannelsSub: "Мы относимся ко всем авторизованным продавцам одинаково — полная гарантия, полная программная поддержка и прямая помощь. Не указанные продавцы не авторизованы и не могут принять гарантию.", trust1Title: "Подлинные продукты", trust1Body: "Каждый продавец в списке — авторизованный канал AZDOME. Проверяем гарантию по серийному номеру.", trust2Title: "Полная гарантия 2 года", trust2Body: "Одинаковое покрытие, покупаете ли вы у нас, на Amazon или у местного ритейлера. Соблюдаем гарантию между каналами.", trust3Title: "Обновления прошивки", trust3Body: "5 лет бесплатных обновлений прошивки с момента запуска каждой камеры. Активируются автоматически через приложение AZDOME.", trust4Title: "Поддержка 24×7", trust4Body: "Прямая техподдержка команды AZDOME — чат, email или телефон — независимо от места покупки.", marketplacesEyebrow: "Онлайн-маркетплейсы", marketplacesTitle: "Привычный чекаут. Та же гарантия.", marketplaceCountPrefix: "", marketplaceSingular: "маркетплейс", marketplacePlural: "маркетплейсов", inRegion: "в", retailersEyebrow: "Локальные ритейлеры", retailersTitle: "В магазине, рядом с вами.", retailerCountPrefix: "", retailerSingular: "ритейлер", retailerPlural: "ритейлеров", noMatchTitle: "Подходящих ритейлеров нет", noMatchSubA: "Мы быстро расширяемся. Покупайте напрямую на", noMatchSubB: "— мы доставляем в ваш регион.", unauthorizedTitle: "Авторизованы только указанные каналы.", unauthorizedBody1: "Мы не можем подтвердить гарантию или прошивку для камер AZDOME, купленных у серых продавцов. Если не уверены в авторизации продавца, до покупки напишите URL объявления на", unauthorizedBody2: ".", wholesaleTitle: "Хотите продавать AZDOME?", wholesaleSub: "Активно ищем партнёров — ритейлеров, интеграторов автопарков и реселлеров во всех регионах. Объёмные цены — от 10 единиц.", becomePartner: "Стать партнёром", shopAt: "Купить в" },
  pl: { eyebrow: "Gdzie kupić", titleA: "Kupuj AZDOME z pewnością,", titleB: "wszędzie na świecie.", sub: "Autoryzowani sprzedawcy w 60+ krajach. Ten sam produkt, ta sama gwarancja, to samo wsparcie — czy kupujesz bezpośrednio, czy na ulubionym marketplace.", statCountries: "Krajów", statChannels: "Kanały sprzedaży", statWarranty: "Gwarancja", regionLabel: "Region", detected: "Wykryto", searchPh: "Znajdź sprzedawcę…", clearSearch: "Wyczyść", buyDirectLabel: "Kup bezpośrednio od AZDOME", official: "Oficjalny", madeBy: "Wyprodukowane przez AZDOME, sprzedawane przez AZDOME", officialDesc: "Najnowsze modele, ekskluzywne zestawy i najszybsza ścieżka do wsparcia gwarancyjnego. Najlepsze dla nowości i pakietów kamera + akcesoria.", pillFreeShip: "Darmowa wysyłka > $99", pillWarranty: "Gwarancja 2 lata", pill30Day: "30 dni na zwrot", pillBundle: "Rabaty na zestawy", visitOfficial: "Odwiedź oficjalny sklep", authChannelsEyebrow: "Autoryzowane kanały", authChannelsTitle: "Dlaczego każdy wymieniony kanał to ten sam zakup.", authChannelsSub: "Każdego autoryzowanego sprzedawcę traktujemy tak samo — pełna gwarancja, pełne wsparcie oprogramowania, bezpośrednia pomoc od nas. Sprzedawcy spoza listy nie są autoryzowani i nie mogą uznać reklamacji gwarancyjnych.", trust1Title: "Oryginalne produkty", trust1Body: "Każdy wymieniony sprzedawca to autoryzowany kanał AZDOME. Sprawdzamy kwalifikację gwarancji po numerze seryjnym.", trust2Title: "Pełna 2-letnia gwarancja", trust2Body: "Ten sam zakres, czy kupujesz bezpośrednio od nas, na Amazon, czy u lokalnego sprzedawcy. Honorujemy gwarancję między kanałami.", trust3Title: "Aktualizacje firmware", trust3Body: "5 lat darmowych aktualizacji firmware od premiery każdej kamery. Aktywowane automatycznie przez aplikację AZDOME.", trust4Title: "Wsparcie 24×7", trust4Body: "Bezpośrednie wsparcie techniczne zespołu AZDOME — chat, e-mail lub telefon — niezależnie od miejsca zakupu.", marketplacesEyebrow: "Marketplace online", marketplacesTitle: "Znajomy checkout. Ta sama gwarancja.", marketplaceCountPrefix: "", marketplaceSingular: "marketplace", marketplacePlural: "marketplace'ów", inRegion: "w", retailersEyebrow: "Sprzedawcy lokalni", retailersTitle: "W sklepie, niedaleko Ciebie.", retailerCountPrefix: "", retailerSingular: "sprzedawca", retailerPlural: "sprzedawców", noMatchTitle: "Brak pasujących sprzedawców w", noMatchSubA: "Szybko się rozwijamy. Kup bezpośrednio na", noMatchSubB: "— wysyłamy do Twojego regionu.", unauthorizedTitle: "Tylko wymienione kanały są autoryzowane.", unauthorizedBody1: "Nie możemy zweryfikować kwalifikacji gwarancji ani firmware dla kamer AZDOME kupionych u sprzedawców z szarej strefy. Jeśli nie jesteś pewien autoryzacji sprzedawcy, przed zakupem prześlij URL ogłoszenia na", unauthorizedBody2: ".", wholesaleTitle: "Chcesz mieć AZDOME w ofercie?", wholesaleSub: "Aktywnie nawiązujemy partnerstwa ze sprzedawcami, integratorami flot i resellerami we wszystkich regionach. Ceny hurtowe od 10 sztuk.", becomePartner: "Zostań partnerem", shopAt: "Kup na" },
  ro: { eyebrow: "De unde să cumperi", titleA: "Cumpără AZDOME cu încredere,", titleB: "oriunde în lume.", sub: "Revânzători autorizați în 60+ țări. Același produs, aceeași garanție, același suport — fie că achiziționezi direct sau din marketplace-ul favorit.", statCountries: "Țări", statChannels: "Canale retail", statWarranty: "Garanție", regionLabel: "Regiune", detected: "Detectat", searchPh: "Caută un retailer…", clearSearch: "Șterge", buyDirectLabel: "Cumpără direct de la AZDOME", official: "Oficial", madeBy: "Fabricat de AZDOME, vândut de AZDOME", officialDesc: "Cele mai noi modele, pachete exclusive și cel mai rapid drum spre suportul de garanție. Ideal pentru lansări noi și pachete cameră + accesorii.", pillFreeShip: "Transport gratuit peste $99", pillWarranty: "Garanție 2 ani", pill30Day: "Retur 30 zile", pillBundle: "Reduceri la pachet", visitOfficial: "Vizitează magazinul oficial", authChannelsEyebrow: "Canale autorizate", authChannelsTitle: "De ce fiecare canal listat este aceeași achiziție.", authChannelsSub: "Tratăm fiecare revânzător autorizat la fel — garanție completă, suport software complet, ajutor direct de la noi. Revânzătorii nelistați nu sunt autorizați și nu pot onora cererile de garanție.", trust1Title: "Produse autentice", trust1Body: "Fiecare revânzător listat este un canal AZDOME autorizat. Verificăm eligibilitatea prin număr de serie pentru garanție.", trust2Title: "Garanție 2 ani completă", trust2Body: "Aceeași acoperire, fie că cumperi direct, de pe Amazon sau de la un retailer local. Onorăm garanția în toate canalele.", trust3Title: "Actualizări firmware", trust3Body: "5 ani de actualizări firmware gratuite de la lansarea fiecărei camere. Activate automat prin aplicația AZDOME.", trust4Title: "Suport 24×7", trust4Body: "Suport tehnic direct de la echipa AZDOME — chat, email sau telefon — indiferent de unde ai cumpărat.", marketplacesEyebrow: "Marketplace-uri online", marketplacesTitle: "Checkout familiar. Aceeași garanție.", marketplaceCountPrefix: "", marketplaceSingular: "marketplace", marketplacePlural: "marketplace-uri", inRegion: "în", retailersEyebrow: "Retaileri locali", retailersTitle: "În magazin, lângă tine.", retailerCountPrefix: "", retailerSingular: "retailer", retailerPlural: "retaileri", noMatchTitle: "Niciun retailer în", noMatchSubA: "Ne extindem rapid. Cumpără direct de la", noMatchSubB: "— livrăm în regiunea ta.", unauthorizedTitle: "Doar canalele listate sunt autorizate.", unauthorizedBody1: "Nu putem verifica eligibilitatea de garanție sau firmware pentru camerele AZDOME cumpărate de la revânzători din piața gri. Dacă ai dubii, trimite URL-ul listării la", unauthorizedBody2: "înainte de cumpărare.", wholesaleTitle: "Vrei să vinzi AZDOME?", wholesaleSub: "Suntem activ deschiși la parteneriate cu retaileri, integratori de flote și revânzători în toate regiunile. Prețuri volum de la 10 unități.", becomePartner: "Devino partener", shopAt: "Cumpără pe" },
  tr: { eyebrow: "Nereden Alınır", titleA: "AZDOME'u güvenle satın alın,", titleB: "dünyanın her yerinde.", sub: "60+ ülkede yetkili satıcılar. Doğrudan satın alın veya favori pazaryerinizden — aynı ürün, aynı garanti, aynı destek.", statCountries: "Ülke", statChannels: "Satış kanalı", statWarranty: "Garanti", regionLabel: "Bölge", detected: "Algılandı", searchPh: "Satıcı bulun…", clearSearch: "Temizle", buyDirectLabel: "AZDOME'dan doğrudan alın", official: "Resmi", madeBy: "AZDOME üretir, AZDOME satar", officialDesc: "En yeni modeller, özel paketler ve garanti desteğine en hızlı yol. Yeni lansmanlar ve araç kamerası + aksesuar fırsatları için ideal.", pillFreeShip: "$99 üzeri ücretsiz kargo", pillWarranty: "2 yıl garanti", pill30Day: "30 gün iade", pillBundle: "Paket indirimleri", visitOfficial: "Resmi mağazayı ziyaret et", authChannelsEyebrow: "Yetkili kanallar", authChannelsTitle: "Listelenen her kanal neden aynı satın almadır.", authChannelsSub: "Yetkili her satıcıya aynı şekilde davranırız — tam garanti, tam yazılım desteği ve doğrudan yardım. Listelenmeyen satıcılar yetkili değildir ve garanti taleplerini karşılayamaz.", trust1Title: "Orijinal ürünler", trust1Body: "Listelenen her satıcı yetkili bir AZDOME kanalıdır. Garanti için seri numarası uygunluğunu doğrularız.", trust2Title: "Tam 2 yıl garanti", trust2Body: "Bizden, Amazon'dan veya yerel bir mağazadan alsanız da aynı kapsam. Garantiyi kanallar arasında onurlandırırız.", trust3Title: "Yazılım güncellemeleri", trust3Body: "Her kameranın lansmanından itibaren 5 yıl ücretsiz yazılım güncellemeleri. AZDOME uygulaması ile otomatik etkinleştirilir.", trust4Title: "7/24 destek", trust4Body: "Nerede satın aldığınızdan bağımsız olarak AZDOME ekibinden doğrudan teknik destek — sohbet, e-posta veya telefon.", marketplacesEyebrow: "Çevrimiçi pazaryerleri", marketplacesTitle: "Tanıdık ödeme. Aynı garanti.", marketplaceCountPrefix: "", marketplaceSingular: "pazaryeri", marketplacePlural: "pazaryeri", inRegion: "·", retailersEyebrow: "Yerel mağazalar", retailersTitle: "Mağazada, yakınınızda.", retailerCountPrefix: "", retailerSingular: "mağaza", retailerPlural: "mağaza", noMatchTitle: "Eşleşen mağaza yok", noMatchSubA: "Hızla genişliyoruz. Doğrudan", noMatchSubB: "üzerinden alın — bölgenize gönderiyoruz.", unauthorizedTitle: "Yalnızca listelenen kanallar yetkilidir.", unauthorizedBody1: "Gri pazar satıcılarından satın alınan AZDOME kameralar için garanti veya yazılım uygunluğunu doğrulayamayız. Satıcının yetkili olup olmadığından emin değilseniz, satın almadan önce ilan URL'sini şuraya gönderin:", unauthorizedBody2: ".", wholesaleTitle: "AZDOME'u stoklamak ister misiniz?", wholesaleSub: "Tüm bölgelerde perakendeciler, filo entegratörleri ve satıcılarla aktif olarak ortaklık kuruyoruz. Hacim fiyatları 10 adetten başlar.", becomePartner: "Partner olun", shopAt: "Şurada satın al:" },
  pt: { eyebrow: "Onde Comprar", titleA: "Compre AZDOME com confiança,", titleB: "em qualquer lugar do mundo.", sub: "Revendedores autorizados em 60+ países. Mesmo produto, mesma garantia, mesmo suporte — comprando direto ou no seu marketplace favorito.", statCountries: "Países", statChannels: "Canais de venda", statWarranty: "Garantia", regionLabel: "Região", detected: "Detectado", searchPh: "Encontrar um revendedor…", clearSearch: "Limpar", buyDirectLabel: "Compre direto da AZDOME", official: "Oficial", madeBy: "Feito pela AZDOME, vendido pela AZDOME", officialDesc: "Modelos mais recentes, combos exclusivos e o caminho mais rápido para suporte de garantia. Melhor para lançamentos e packs câmera + acessórios.", pillFreeShip: "Frete grátis acima de $99", pillWarranty: "Garantia de 2 anos", pill30Day: "Devolução em 30 dias", pillBundle: "Descontos em combos", visitOfficial: "Visitar loja oficial", authChannelsEyebrow: "Canais autorizados", authChannelsTitle: "Por que cada canal listado é a mesma compra.", authChannelsSub: "Tratamos cada revendedor autorizado da mesma forma — garantia completa, suporte completo de software e ajuda direta. Revendedores não listados não são autorizados e não podem honrar garantias.", trust1Title: "Produtos genuínos", trust1Body: "Cada revendedor listado é um canal AZDOME autorizado. Verificamos elegibilidade pelo número de série para garantia.", trust2Title: "Garantia de 2 anos completa", trust2Body: "Mesma cobertura, comprando direto, na Amazon ou em um varejista local. Honramos garantia entre canais.", trust3Title: "Atualizações de firmware", trust3Body: "5 anos de atualizações de firmware grátis a partir do lançamento de cada câmera. Ativadas automaticamente via app AZDOME.", trust4Title: "Suporte 24×7", trust4Body: "Suporte técnico direto da equipe AZDOME — chat, email ou telefone — não importa onde comprou.", marketplacesEyebrow: "Marketplaces online", marketplacesTitle: "Checkout familiar. Mesma garantia.", marketplaceCountPrefix: "", marketplaceSingular: "marketplace", marketplacePlural: "marketplaces", inRegion: "em", retailersEyebrow: "Varejistas locais", retailersTitle: "Na loja, perto de você.", retailerCountPrefix: "", retailerSingular: "varejista", retailerPlural: "varejistas", noMatchTitle: "Nenhum varejista correspondente em", noMatchSubA: "Estamos expandindo rapidamente. Compre direto em", noMatchSubB: "— enviamos para sua região.", unauthorizedTitle: "Apenas os canais listados são autorizados.", unauthorizedBody1: "Não podemos verificar elegibilidade de garantia ou firmware para câmeras AZDOME compradas de revendedores do mercado paralelo. Se tiver dúvida sobre a autorização, envie a URL do anúncio para", unauthorizedBody2: "antes de comprar.", wholesaleTitle: "Quer ter AZDOME na sua loja?", wholesaleSub: "Estamos ativamente firmando parcerias com varejistas, integradores de frota e revendedores em todas as regiões. Preços por volume a partir de 10 unidades.", becomePartner: "Seja parceiro", shopAt: "Comprar em" },
  ar: { eyebrow: "أين تشتري", titleA: "اشترِ AZDOME بثقة،", titleB: "في أي مكان في العالم.", sub: "موزّعون معتمدون في أكثر من 60 دولة. نفس المنتج، نفس الضمان، نفس الدعم — سواء اشتريت مباشرة أو من المتجر المفضل لديك.", statCountries: "دولة", statChannels: "قنوات البيع", statWarranty: "الضمان", regionLabel: "المنطقة", detected: "تم اكتشافه", searchPh: "ابحث عن موزّع…", clearSearch: "مسح", buyDirectLabel: "اشترِ مباشرة من AZDOME", official: "رسمي", madeBy: "صنعتها AZDOME، تبيعها AZDOME", officialDesc: "أحدث الموديلات، باقات حصرية، وأسرع طريق لدعم الضمان. الأفضل للإصدارات الجديدة وعروض الكاميرا + الإكسسوارات.", pillFreeShip: "شحن مجاني فوق $99", pillWarranty: "ضمان سنتان", pill30Day: "إرجاع خلال 30 يومًا", pillBundle: "خصومات الباقات", visitOfficial: "زر المتجر الرسمي", authChannelsEyebrow: "القنوات المعتمدة", authChannelsTitle: "لماذا كل قناة مدرجة هي نفس عملية الشراء.", authChannelsSub: "نتعامل مع كل موزّع معتمد بنفس الطريقة — ضمان كامل، دعم برمجي كامل، ومساعدة مباشرة منا. الموزّعون غير المدرجين غير معتمدين ولا يمكنهم الوفاء بمطالبات الضمان.", trust1Title: "منتجات أصلية", trust1Body: "كل موزّع مدرج هو قناة AZDOME معتمدة. نتحقق من أهلية الرقم التسلسلي لدعم الضمان.", trust2Title: "ضمان كامل لمدة سنتين", trust2Body: "نفس التغطية سواء اشتريت منا مباشرة أو من Amazon أو من بائع تجزئة محلي. نحترم الضمان عبر القنوات.", trust3Title: "تحديثات البرنامج الثابت", trust3Body: "5 سنوات من تحديثات البرنامج الثابت المجانية من تاريخ إطلاق كل كاميرا. تُفعَّل تلقائيًا عبر تطبيق AZDOME.", trust4Title: "دعم 24×7", trust4Body: "دعم فني مباشر من فريق AZDOME — دردشة، بريد إلكتروني، أو هاتف — بغض النظر عن مكان الشراء.", marketplacesEyebrow: "متاجر إلكترونية", marketplacesTitle: "تجربة دفع مألوفة. نفس الضمان.", marketplaceCountPrefix: "", marketplaceSingular: "متجر", marketplacePlural: "متاجر", inRegion: "في", retailersEyebrow: "متاجر تجزئة محلية", retailersTitle: "في المتجر، قريبًا منك.", retailerCountPrefix: "", retailerSingular: "بائع تجزئة", retailerPlural: "بائعي تجزئة", noMatchTitle: "لا يوجد بائعو تجزئة مطابقون في", noMatchSubA: "نتوسع بسرعة. اشترِ مباشرة من", noMatchSubB: "— نشحن إلى منطقتك.", unauthorizedTitle: "القنوات المدرجة فقط معتمدة.", unauthorizedBody1: "لا يمكننا التحقق من أهلية الضمان أو البرنامج الثابت لكاميرات AZDOME المشتراة من موزعي السوق الموازي. إذا لم تكن متأكدًا من اعتماد البائع، أرسل رابط القائمة قبل الشراء إلى", unauthorizedBody2: ".", wholesaleTitle: "هل تريد بيع AZDOME؟", wholesaleSub: "نقيم بنشاط شراكات مع متاجر التجزئة ومدمجي الأساطيل والموزعين في جميع المناطق. تبدأ أسعار الكميات من 10 وحدات.", becomePartner: "كن شريكًا", shopAt: "تسوّق من" },
  th: { eyebrow: "ซื้อได้ที่ไหน", titleA: "ซื้อ AZDOME ได้อย่างมั่นใจ", titleB: "ทุกที่ทั่วโลก", sub: "ตัวแทนที่ได้รับอนุญาตในกว่า 60 ประเทศ ผลิตภัณฑ์เดียวกัน ประกันเดียวกัน บริการสนับสนุนเดียวกัน ไม่ว่าซื้อตรงหรือผ่านมาร์เก็ตเพลสที่คุณชอบ", statCountries: "ประเทศ", statChannels: "ช่องทางจัดจำหน่าย", statWarranty: "ประกัน", regionLabel: "ภูมิภาค", detected: "ตรวจพบ", searchPh: "ค้นหาร้านค้า…", clearSearch: "ล้าง", buyDirectLabel: "ซื้อตรงจาก AZDOME", official: "ทางการ", madeBy: "ผลิตและจำหน่ายโดย AZDOME", officialDesc: "รุ่นล่าสุด ชุดพิเศษ และเส้นทางที่เร็วที่สุดสำหรับการสนับสนุนประกัน เหมาะสำหรับสินค้าใหม่และดีลกล้อง + อุปกรณ์เสริม", pillFreeShip: "ส่งฟรีเมื่อสั่ง $99 ขึ้นไป", pillWarranty: "รับประกัน 2 ปี", pill30Day: "คืนสินค้าได้ 30 วัน", pillBundle: "ส่วนลดเมื่อซื้อชุด", visitOfficial: "เข้าร้านทางการ", authChannelsEyebrow: "ช่องทางที่ได้รับอนุญาต", authChannelsTitle: "ทำไมทุกช่องทางที่แสดงไว้คือการซื้อแบบเดียวกัน", authChannelsSub: "เราปฏิบัติต่อตัวแทนที่ได้รับอนุญาตทุกรายเหมือนกัน — ประกันเต็ม ซัพพอร์ตซอฟต์แวร์เต็ม และความช่วยเหลือโดยตรงจากเรา ตัวแทนที่ไม่อยู่ในรายชื่อไม่ได้รับอนุญาตและไม่สามารถรับเคลมประกันได้", trust1Title: "สินค้าของแท้", trust1Body: "ตัวแทนทุกรายในรายชื่อเป็นช่องทาง AZDOME ที่ได้รับอนุญาต เราตรวจสอบความถูกต้องของหมายเลขเครื่องสำหรับการสนับสนุนประกัน", trust2Title: "ประกัน 2 ปีเต็ม", trust2Body: "ความคุ้มครองเหมือนกัน ไม่ว่าจะซื้อตรงจากเรา จาก Amazon หรือจากร้านท้องถิ่น เราดูแลประกันข้ามช่องทาง", trust3Title: "อัปเดตเฟิร์มแวร์", trust3Body: "อัปเดตเฟิร์มแวร์ฟรี 5 ปีนับจากวันเปิดตัวของกล้องทุกรุ่น เปิดใช้งานอัตโนมัติผ่านแอป AZDOME", trust4Title: "ซัพพอร์ต 24×7", trust4Body: "ซัพพอร์ตเทคนิคโดยตรงจากทีม AZDOME — แชต อีเมล หรือโทรศัพท์ — ไม่ว่าคุณซื้อจากที่ไหน", marketplacesEyebrow: "มาร์เก็ตเพลสออนไลน์", marketplacesTitle: "ขั้นตอนสั่งซื้อที่คุ้นเคย ประกันเหมือนกัน", marketplaceCountPrefix: "", marketplaceSingular: "มาร์เก็ตเพลส", marketplacePlural: "มาร์เก็ตเพลส", inRegion: "ใน", retailersEyebrow: "ร้านค้าท้องถิ่น", retailersTitle: "ในร้าน ใกล้คุณ", retailerCountPrefix: "", retailerSingular: "ร้านค้า", retailerPlural: "ร้านค้า", noMatchTitle: "ไม่พบร้านค้าใน", noMatchSubA: "เรากำลังขยายตัวอย่างรวดเร็ว ซื้อตรงจาก", noMatchSubB: "— เราจัดส่งไปยังภูมิภาคของคุณ", unauthorizedTitle: "เฉพาะช่องทางที่อยู่ในรายชื่อเท่านั้นที่ได้รับอนุญาต", unauthorizedBody1: "เราไม่สามารถยืนยันความถูกต้องของประกันหรือเฟิร์มแวร์สำหรับกล้อง AZDOME ที่ซื้อจากผู้จำหน่ายตลาดเทาได้ หากไม่แน่ใจว่าผู้ขายได้รับอนุญาต ส่ง URL ของสินค้าไปที่", unauthorizedBody2: "ก่อนซื้อ", wholesaleTitle: "อยากขาย AZDOME ใช่ไหม?", wholesaleSub: "เรากำลังขยายพันธมิตรกับร้านค้าปลีก ผู้รวมระบบฟลีท และผู้จำหน่ายในทุกภูมิภาค ราคาขายส่งเริ่มต้นที่ 10 ชุด", becomePartner: "เป็นพันธมิตร", shopAt: "ซื้อที่" },
  vi: { eyebrow: "Mua ở đâu", titleA: "Mua AZDOME tự tin,", titleB: "ở bất cứ đâu trên thế giới.", sub: "Đại lý ủy quyền ở hơn 60 quốc gia. Cùng sản phẩm, cùng bảo hành, cùng hỗ trợ — dù bạn mua trực tiếp hay tại sàn yêu thích.", statCountries: "Quốc gia", statChannels: "Kênh bán lẻ", statWarranty: "Bảo hành", regionLabel: "Khu vực", detected: "Đã phát hiện", searchPh: "Tìm đại lý…", clearSearch: "Xóa", buyDirectLabel: "Mua trực tiếp từ AZDOME", official: "Chính hãng", madeBy: "Do AZDOME sản xuất, do AZDOME bán", officialDesc: "Các mẫu mới nhất, combo độc quyền và đường đi nhanh nhất tới hỗ trợ bảo hành. Tốt nhất cho hàng mới và bộ máy quay + phụ kiện.", pillFreeShip: "Miễn phí ship trên $99", pillWarranty: "Bảo hành 2 năm", pill30Day: "Đổi trả 30 ngày", pillBundle: "Giảm giá combo", visitOfficial: "Vào cửa hàng chính thức", authChannelsEyebrow: "Kênh ủy quyền", authChannelsTitle: "Vì sao mỗi kênh được liệt kê đều là cùng một giao dịch.", authChannelsSub: "Chúng tôi đối xử với mọi đại lý ủy quyền như nhau — bảo hành đầy đủ, hỗ trợ phần mềm đầy đủ và trợ giúp trực tiếp từ chúng tôi. Các đại lý không được liệt kê không được ủy quyền và không thể chấp nhận yêu cầu bảo hành.", trust1Title: "Sản phẩm chính hãng", trust1Body: "Mỗi đại lý trong danh sách là kênh AZDOME ủy quyền. Chúng tôi xác minh điều kiện bảo hành theo số sê-ri.", trust2Title: "Bảo hành 2 năm đầy đủ", trust2Body: "Cùng mức bảo hành dù bạn mua trực tiếp, trên Amazon hay tại đại lý địa phương. Chúng tôi tôn trọng bảo hành xuyên các kênh.", trust3Title: "Cập nhật firmware", trust3Body: "5 năm cập nhật firmware miễn phí kể từ ngày ra mắt của mỗi camera. Kích hoạt tự động qua ứng dụng AZDOME.", trust4Title: "Hỗ trợ 24×7", trust4Body: "Hỗ trợ kỹ thuật trực tiếp từ đội ngũ AZDOME — chat, email hoặc điện thoại — bất kể bạn mua ở đâu.", marketplacesEyebrow: "Sàn trực tuyến", marketplacesTitle: "Thanh toán quen thuộc. Bảo hành giống nhau.", marketplaceCountPrefix: "", marketplaceSingular: "sàn", marketplacePlural: "sàn", inRegion: "ở", retailersEyebrow: "Đại lý địa phương", retailersTitle: "Tại cửa hàng, gần bạn.", retailerCountPrefix: "", retailerSingular: "đại lý", retailerPlural: "đại lý", noMatchTitle: "Không có đại lý phù hợp ở", noMatchSubA: "Chúng tôi đang mở rộng nhanh. Mua trực tiếp từ", noMatchSubB: "— chúng tôi giao đến khu vực của bạn.", unauthorizedTitle: "Chỉ các kênh được liệt kê mới được ủy quyền.", unauthorizedBody1: "Chúng tôi không thể xác minh điều kiện bảo hành hay firmware cho camera AZDOME mua từ đại lý chợ xám. Nếu không chắc người bán có được ủy quyền không, gửi URL niêm yết đến", unauthorizedBody2: "trước khi mua.", wholesaleTitle: "Muốn bán AZDOME?", wholesaleSub: "Chúng tôi đang tích cực hợp tác với các nhà bán lẻ, đơn vị tích hợp đội xe và đại lý ở mọi khu vực. Giá theo khối lượng từ 10 chiếc.", becomePartner: "Trở thành đối tác", shopAt: "Mua tại" },
};

// Browser locale → region best-guess. Falls back to "us" if unknown.
function guessRegion(): RegionCode {
  if (typeof navigator === "undefined") return "us";
  const lang = (navigator.language || "").toLowerCase();
  if (lang.startsWith("zh") || lang.startsWith("ja")) return "jp";
  if (lang.startsWith("de")) return "de";
  if (lang.startsWith("fr")) return "fr";
  if (lang.startsWith("it")) return "it";
  if (lang.startsWith("es")) return "es";
  if (lang === "en-gb" || lang === "en-uk") return "uk";
  if (lang === "en-ca") return "ca";
  if (lang === "en-au") return "au";
  if (lang.startsWith("en-us") || lang === "en") return "us";
  return "us";
}

const TRUST_ICONS = [BadgeCheck, ShieldCheck, Sparkles, Headphones] as const;

export default function WhereToBuyPage() {
  const { locale } = useLocale();
  const t = COPY[locale] ?? COPY.en!;
  const TRUST_ROWS = [
    { icon: TRUST_ICONS[0], title: t.trust1Title, body: t.trust1Body },
    { icon: TRUST_ICONS[1], title: t.trust2Title, body: t.trust2Body },
    { icon: TRUST_ICONS[2], title: t.trust3Title, body: t.trust3Body },
    { icon: TRUST_ICONS[3], title: t.trust4Title, body: t.trust4Body },
  ];
  const [region, setRegion] = useState<RegionCode>("us");
  const [autoDetected, setAutoDetected] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const r = guessRegion();
    if (r !== "us") {
      setRegion(r);
      setAutoDetected(true);
    }
  }, []);

  const list = useMemo(() => retailersForRegion(region), [region]);
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return list;
    return list.filter((r) => r.name.toLowerCase().includes(q));
  }, [list, query]);

  const official = filtered.find((r) => r.tier === "official");
  const marketplaces = filtered.filter((r) => r.tier === "marketplace");
  const retailChains = filtered.filter((r) => r.tier === "retailer");

  const activeRegion = REGIONS.find((r) => r.code === region);

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.08),_transparent_55%)]"
        />
        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-32 md:pt-40 lg:px-10">
          <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                {t.eyebrow}
              </p>
              <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
                {t.titleA}
                <br className="hidden sm:block" />{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {t.titleB}
                </span>
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg">
                {t.sub}
              </p>
            </div>
            {/* Hero stats */}
            <dl className="flex divide-x divide-slate-200 self-stretch overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
              <Stat label={t.statCountries} value="60+" icon={Globe2} />
              <Stat label={t.statChannels} value={`${TOTAL_CHANNELS}+`} icon={Store} />
              <Stat label={t.statWarranty} value="2 yrs" icon={ShieldCheck} />
            </dl>
          </div>
        </div>
      </section>

      {/* Region picker (sticky) */}
      <section className="sticky top-[100px] z-20 border-b border-slate-100 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-4 lg:px-10">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 flex-shrink-0 text-slate-400" />
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                {t.regionLabel}
              </span>
            </div>
            {autoDetected && activeRegion && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-emerald-700">
                <Zap className="h-3 w-3" />
                {t.detected} · {activeRegion.flag}
              </span>
            )}
            <div className="flex flex-1 items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {REGIONS.map((r) => {
                const active = region === r.code;
                const count = countForRegion(r.code);
                return (
                  <button
                    key={r.code}
                    onClick={() => {
                      setRegion(r.code);
                      setAutoDetected(false);
                    }}
                    title={`${r.name} · ${count} channels`}
                    className={[
                      "inline-flex flex-shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-tight transition-all duration-300 md:text-sm",
                      active
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200",
                    ].join(" ")}
                  >
                    <span aria-hidden>{r.flag}</span>
                    {r.name}
                    {count > 0 && (
                      <span
                        className={[
                          "ml-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums",
                          active ? "bg-white/20" : "bg-white text-slate-500",
                        ].join(" ")}
                      >
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.searchPh}
                className="w-full rounded-full border border-slate-200 bg-white py-2 pl-9 pr-9 text-xs focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label={t.clearSearch}
                  className="absolute right-2.5 top-1/2 inline-flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Official tier */}
      {official && (
        <section className="bg-white py-14 md:py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mb-5 flex items-baseline justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                {t.buyDirectLabel}
              </p>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                <BadgeCheck className="h-3 w-3" />
                {t.official}
              </span>
            </div>
            <a
              href={official.urls[region]}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block overflow-hidden rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-900 p-8 shadow-md transition-shadow duration-300 hover:shadow-lg md:p-12"
            >
              <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(59,130,246,0.3),_transparent_55%)]"
              />
              <div
                aria-hidden
                className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"
              />
              <div className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_auto]">
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85 backdrop-blur-sm">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {t.madeBy}
                  </div>
                  <Logo size={36} inverse />
                  <h2 className="mt-5 text-balance text-3xl font-bold tracking-tight text-white md:text-4xl">
                    {official.name}
                  </h2>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-300 md:text-base">
                    {t.officialDesc}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <Pill icon={Truck}>{t.pillFreeShip}</Pill>
                    <Pill icon={ShieldCheck}>{t.pillWarranty}</Pill>
                    <Pill icon={Store}>{t.pill30Day}</Pill>
                    <Pill icon={Sparkles}>{t.pillBundle}</Pill>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-white px-7 py-3.5 text-sm font-semibold tracking-tight text-slate-900 shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-md md:self-center">
                  {t.visitOfficial}
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </a>
          </div>
        </section>
      )}

      {/* Trust band */}
      <section className="bg-slate-50 py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                {t.authChannelsEyebrow}
              </p>
              <h2 className="text-balance text-2xl font-bold tracking-tight text-slate-900 md:text-4xl">
                {t.authChannelsTitle}
              </h2>
            </div>
            <p className="max-w-md text-sm text-slate-500">
              {t.authChannelsSub}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TRUST_ROWS.map((t) => (
              <div
                key={t.title}
                className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <t.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-sm font-bold tracking-tight text-slate-900 md:text-base">
                  {t.title}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-500 md:text-sm">
                  {t.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marketplaces */}
      {marketplaces.length > 0 && (
        <section className="bg-white py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                  {t.marketplacesEyebrow}
                </p>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                  {t.marketplacesTitle}
                </h2>
              </div>
              <p className="text-xs text-slate-500">
                <ShoppingBag className="mr-1 inline-block h-3 w-3 -mt-0.5" />
                {marketplaces.length}{" "}
                {marketplaces.length === 1 ? t.marketplaceSingular : t.marketplacePlural}{" "}
                {t.inRegion} {activeRegion?.name}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {marketplaces.map((r) => (
                <RetailerCard key={r.id} retailer={r} region={region} shopAtLabel={t.shopAt} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Retailers */}
      {retailChains.length > 0 ? (
        <section className="bg-slate-50 py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                  {t.retailersEyebrow}
                </p>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                  {t.retailersTitle}
                </h2>
              </div>
              <p className="text-xs text-slate-500">
                <Store className="mr-1 inline-block h-3 w-3 -mt-0.5" />
                {retailChains.length}{" "}
                {retailChains.length === 1 ? t.retailerSingular : t.retailerPlural}{" "}
                {t.inRegion} {activeRegion?.name}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {retailChains.map((r) => (
                <RetailerCard key={r.id} retailer={r} region={region} shopAtLabel={t.shopAt} />
              ))}
            </div>
          </div>
        </section>
      ) : (
        marketplaces.length === 0 && (
          <section className="bg-slate-50 py-24">
            <div className="mx-auto max-w-2xl px-6 text-center lg:px-10">
              <Store className="mx-auto h-10 w-10 text-slate-300" />
              <h2 className="mt-5 text-balance text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                {t.noMatchTitle} {t.inRegion} {activeRegion?.name}.
              </h2>
              <p className="mt-3 text-base text-slate-500">
                {t.noMatchSubA}{" "}
                <a
                  href="https://www.azdomevip.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  azdomevip.com
                </a>{" "}
                {t.noMatchSubB}
              </p>
            </div>
          </section>
        )
      )}

      {/* Unauthorized notice */}
      <section className="bg-amber-50/40 py-10">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <div className="flex items-start gap-4 rounded-2xl bg-white px-6 py-5 shadow-sm ring-1 ring-amber-100 md:px-8 md:py-6">
            <span className="inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
              <ShieldCheck className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold tracking-tight text-slate-900 md:text-base">
                {t.unauthorizedTitle}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-600 md:text-sm">
                {t.unauthorizedBody1}{" "}
                <a
                  href="mailto:support@azdome.com"
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  support@azdome.com
                </a>{" "}
                {t.unauthorizedBody2}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Wholesale CTA */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto flex max-w-4xl flex-col items-center rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 px-8 py-12 text-center text-white shadow-md md:flex-row md:gap-10 md:text-left">
          <Store className="h-12 w-12 flex-shrink-0 opacity-80" />
          <div className="mt-5 flex-1 md:mt-0">
            <h2 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
              {t.wholesaleTitle}
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-blue-100 md:text-base">
              {t.wholesaleSub}
            </p>
          </div>
          <Link
            href="/wholesale"
            className="mt-7 inline-flex flex-shrink-0 items-center gap-1.5 rounded-full bg-white px-6 py-3 text-sm font-semibold tracking-tight text-blue-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md md:mt-0"
          >
            {t.becomePartner}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}

// ─── Components ──────────────────────────────────────────────────────

function Stat({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="flex-1 px-6 py-5 text-center md:px-8">
      <Icon className="mx-auto h-4 w-4 text-blue-600" />
      <div className="mt-2 text-2xl font-bold tracking-tight tabular-nums text-slate-900 md:text-3xl">
        {value}
      </div>
      <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </div>
    </div>
  );
}

function RetailerCard({
  retailer,
  region,
  shopAtLabel,
}: {
  retailer: Retailer;
  region: RegionCode;
  shopAtLabel: string;
}) {
  const url = retailer.urls[region];
  if (!url) return null;
  const mono =
    retailer.monogram ??
    retailer.name
      .replace(/[^A-Za-z]/g, "")
      .slice(0, 2)
      .toUpperCase();
  const color = retailer.brandColor ?? "bg-slate-700";
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start gap-3">
        <span
          className={[
            "inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-sm font-bold tracking-tight text-white shadow-sm",
            color,
          ].join(" ")}
        >
          {mono}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-bold tracking-tight text-slate-900 md:text-lg">
              {retailer.name}
            </h3>
            <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-slate-300 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue-600" />
          </div>
          {retailer.perk && (
            <p className="mt-1 text-xs text-slate-500">{retailer.perk}</p>
          )}
        </div>
      </div>
      {retailer.models && retailer.models.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {retailer.models.slice(0, 4).map((m) => (
            <span
              key={m}
              className="inline-flex items-center rounded-full bg-slate-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-600 ring-1 ring-slate-100"
            >
              {m}
            </span>
          ))}
          {retailer.models.length > 4 && (
            <span className="inline-flex items-center rounded-full bg-slate-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              +{retailer.models.length - 4}
            </span>
          )}
        </div>
      )}
      <span className="mt-auto pt-5 text-xs font-semibold text-blue-600 transition-colors duration-300 group-hover:text-blue-700">
        {shopAtLabel} {retailer.name} →
      </span>
    </a>
  );
}

function Pill({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs text-white ring-1 ring-white/15 backdrop-blur-sm">
      <Icon className="h-3.5 w-3.5" />
      {children}
    </span>
  );
}
