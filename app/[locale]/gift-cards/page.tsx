"use client";

import { useState } from "react";
import { CheckCircle2, Clock, Gift, Mail, ShieldCheck, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { useLocale } from "@/components/LocaleProvider";
import type { Locale } from "@/lib/i18n/dictionaries";

const PRESET = [25, 50, 100, 200];

const ICONS: Record<string, LucideIcon> = { Mail, Sparkles, Clock, ShieldCheck };

type How = { iconName: keyof typeof ICONS; title: string; body: string };
type Faq = { q: string; a: string };

type Copy = {
  eyebrow: string;
  title: string;
  sub: string;
  cardLabel: string;
  sent: string;
  sentSub: string;
  chooseAmount: string;
  recipientEmail: string;
  emailPh: string;
  message: string;
  messagePh: string;
  sendGift: string;
  howTitle: string;
  faqTitle: string;
  termsTitle: string;
  how: How[];
  faq: Faq[];
  terms: string[];
};

const COPY: Partial<Record<Locale, Copy>> = {
  en: {
    eyebrow: "Gift Cards",
    title: "The gift that's always in focus.",
    sub: "Digital AZDOME gift cards are delivered instantly via email. Redeem at checkout — they never expire.",
    cardLabel: "AZDOME Gift Card",
    sent: "Gift sent.",
    sentSub: "The recipient will get a beautifully formatted email with a redemption code.",
    chooseAmount: "Choose amount",
    recipientEmail: "Recipient email",
    emailPh: "them@example.com",
    message: "Personal message (optional)",
    messagePh: "Hope this gets you on the road safely.",
    sendGift: "Send gift",
    howTitle: "How it works.",
    faqTitle: "Common questions.",
    termsTitle: "Terms.",
    how: [
      { iconName: "Mail", title: "Delivered instantly", body: "Sent via email the moment your order is placed (or scheduled to a future date)." },
      { iconName: "Sparkles", title: "Apply at checkout", body: "Recipients enter their code on the checkout page. Partial use is supported." },
      { iconName: "Clock", title: "Never expires", body: "AZDOME gift cards have no expiration date and no inactivity fees." },
      { iconName: "ShieldCheck", title: "Refundable to the buyer", body: "Unused gift cards are refundable to the original purchaser within 30 days of issue." },
    ],
    faq: [
      { q: "Can the recipient use the card on accessories or only dash cams?", a: "Anything on azdome.com — dash cameras, accessories, shipping costs, and even applicable taxes." },
      { q: "Can I schedule delivery for a future date?", a: "Yes. Choose a delivery date during checkout and we'll email the recipient on that morning." },
      { q: "Can I include a personal message?", a: "Absolutely. Up to 500 characters. We render it in a clean, brand-consistent design — no clipart or cheesy fonts." },
      { q: "What if the gift recipient doesn't want to use it?", a: "Unused gift cards are refundable to the original purchaser within 30 days. Email gifts@azdome.com." },
      { q: "Does the gift card work internationally?", a: "Yes — anywhere AZDOME ships. Local taxes and shipping for the recipient's country apply at checkout." },
    ],
    terms: [
      "Gift cards are denominated in US dollars and redeemable on azdome.com.",
      "Codes are delivered via email to the recipient address you provide. They can be forwarded; treat them like cash.",
      "Cards never expire and carry no inactivity fees. Partial balances remain on the card until depleted.",
      "Gift cards cannot be combined with promotional discount codes that exclude them. The site will tell you if there's a conflict at checkout.",
      "Gift cards cannot be used to purchase other gift cards.",
      "Lost or stolen cards: we can re-issue if you have the original purchase receipt and the unused balance.",
    ],
  },
  zh: {
    eyebrow: "礼品卡",
    title: "永远聚焦的礼物。",
    sub: "电子 AZDOME 礼品卡通过邮件即时送达。结账时使用 — 永不过期。",
    cardLabel: "AZDOME 礼品卡",
    sent: "礼品已发送。",
    sentSub: "收件人会收到一封精美邮件,附带兑换码。",
    chooseAmount: "选择金额",
    recipientEmail: "收件人邮箱",
    emailPh: "them@example.com",
    message: "个性消息(可选)",
    messagePh: "愿这份礼物让你的旅途更安心。",
    sendGift: "发送礼品",
    howTitle: "使用方式。",
    faqTitle: "常见问题。",
    termsTitle: "条款。",
    how: [
      { iconName: "Mail", title: "即时送达", body: "下单瞬间通过邮件发送(也可预约未来日期送达)。" },
      { iconName: "Sparkles", title: "结账时使用", body: "收件人在结账页输入兑换码,支持部分抵扣。" },
      { iconName: "Clock", title: "永不过期", body: "AZDOME 礼品卡无过期日,无闲置费。" },
      { iconName: "ShieldCheck", title: "可向购买人退款", body: "未使用的礼品卡可在开卡后 30 天内退给原购买人。" },
    ],
    faq: [
      { q: "礼品卡只能买行车记录仪,还是配件也行?", a: "azdome.com 上的任何东西 — 行车记录仪、配件、运费,甚至适用税费。" },
      { q: "可以预约未来日期送达吗?", a: "可以。结账时选择送达日期,我们会在当天上午发邮件给收件人。" },
      { q: "可以附个性消息吗?", a: "当然。最多 500 字。我们会以简洁的品牌风格渲染 — 没有花哨字体或剪贴画。" },
      { q: "如果收件人不想用怎么办?", a: "未使用的礼品卡可在 30 天内退给原购买人。请联系 gifts@azdome.com。" },
      { q: "礼品卡能国际使用吗?", a: "可以 — AZDOME 配送的任何地区都行。当地税费和运费在结账时另算。" },
    ],
    terms: [
      "礼品卡以美元计价,可在 azdome.com 兑换。",
      "兑换码通过邮件发送至你填写的收件邮箱。可转发,请视为现金妥善保管。",
      "卡片永不过期,无闲置费。剩余余额保留在卡上直到用完。",
      "若推广优惠码声明不可与礼品卡叠加,结账时会提示冲突。",
      "礼品卡不能用来购买其他礼品卡。",
      "丢失或被盗:凭原购买凭证及剩余余额,我们可补发。",
    ],
  },
  ja: {
    eyebrow: "ギフトカード",
    title: "いつもピントが合うギフト。",
    sub: "デジタル AZDOME ギフトカードはメールで即時配信。期限なし、レジで利用するだけ。",
    cardLabel: "AZDOME ギフトカード",
    sent: "ギフトを送信しました。",
    sentSub: "受取人にはきれいにデザインされたメールと引換コードが届きます。",
    chooseAmount: "金額を選ぶ",
    recipientEmail: "受取人のメール",
    emailPh: "them@example.com",
    message: "メッセージ(任意)",
    messagePh: "安全な旅路を願って。",
    sendGift: "ギフトを送る",
    howTitle: "ご利用の流れ。",
    faqTitle: "よくある質問。",
    termsTitle: "規約。",
    how: [
      { iconName: "Mail", title: "即時配信", body: "ご注文と同時にメール送信(または将来の日付に予約配信)。" },
      { iconName: "Sparkles", title: "レジで利用", body: "受取人がチェックアウト画面でコードを入力。部分利用にも対応。" },
      { iconName: "Clock", title: "期限なし", body: "AZDOME ギフトカードに有効期限はなく、休眠手数料もありません。" },
      { iconName: "ShieldCheck", title: "購入者に返金可", body: "未使用のギフトカードは発行から 30 日以内に元の購入者へ返金可能です。" },
    ],
    faq: [
      { q: "受取人は周辺機器にも使えますか?", a: "azdome.com 上のあらゆる商品に使えます — ドライブレコーダー、アクセサリー、送料、対象となる税金まで。" },
      { q: "未来の日付に配信を予約できますか?", a: "はい。チェックアウトで配信日を選ぶと、その日の朝に受取人へメールが送られます。" },
      { q: "メッセージを添えられますか?", a: "もちろん。500 文字まで。安っぽいクリップアートを使わず、ブランド統一感のあるデザインで表示します。" },
      { q: "受取人が使いたくない場合は?", a: "未使用のギフトカードは 30 日以内に元の購入者へ返金できます。gifts@azdome.com までご連絡ください。" },
      { q: "海外でも使えますか?", a: "はい — AZDOME が配送する地域なら使えます。受取人の国の税金と送料はチェックアウト時に計算されます。" },
    ],
    terms: [
      "ギフトカードは米ドル建てで、azdome.com で利用できます。",
      "コードは指定の受取人メールに届きます。転送可能ですが、現金同様に扱ってください。",
      "期限なし、休眠手数料なし。残高は使い切るまでカードに残ります。",
      "対象外の割引コードとは併用できません。チェックアウトで矛盾があればお知らせします。",
      "ギフトカードで別のギフトカードを購入することはできません。",
      "紛失・盗難:購入レシートと未使用残高があれば再発行可能です。",
    ],
  },
  de: {
    eyebrow: "Gutscheine",
    title: "Das Geschenk, das immer im Fokus ist.",
    sub: "Digitale AZDOME-Gutscheine werden sofort per E-Mail geliefert. An der Kasse einlösen — sie verfallen nicht.",
    cardLabel: "AZDOME-Gutschein",
    sent: "Geschenk versendet.",
    sentSub: "Der Empfänger erhält eine schön gestaltete E-Mail mit dem Einlösecode.",
    chooseAmount: "Betrag wählen",
    recipientEmail: "E-Mail des Empfängers",
    emailPh: "them@example.com",
    message: "Persönliche Nachricht (optional)",
    messagePh: "Komm sicher an dein Ziel.",
    sendGift: "Geschenk senden",
    howTitle: "So funktioniert's.",
    faqTitle: "Häufige Fragen.",
    termsTitle: "Bedingungen.",
    how: [
      { iconName: "Mail", title: "Sofortige Lieferung", body: "Sofort nach Bestellung per E-Mail versendet (oder auf ein zukünftiges Datum geplant)." },
      { iconName: "Sparkles", title: "An der Kasse einlösen", body: "Empfänger geben den Code an der Kasse ein. Teilbeträge möglich." },
      { iconName: "Clock", title: "Kein Verfall", body: "AZDOME-Gutscheine verfallen nicht und es fallen keine Inaktivitätsgebühren an." },
      { iconName: "ShieldCheck", title: "Käufer-Rückerstattung", body: "Nicht eingelöste Gutscheine sind innerhalb von 30 Tagen an den Käufer erstattbar." },
    ],
    faq: [
      { q: "Kann der Empfänger den Gutschein auch für Zubehör verwenden?", a: "Alles auf azdome.com — Dashcams, Zubehör, Versand und sogar anwendbare Steuern." },
      { q: "Kann ich die Zustellung für ein späteres Datum planen?", a: "Ja. Datum an der Kasse wählen, am Morgen des Tages erhält der Empfänger die Mail." },
      { q: "Kann ich eine persönliche Nachricht hinzufügen?", a: "Klar. Bis zu 500 Zeichen. Wir gestalten sie sauber und markenkonform — keine Clipart, keine kitschigen Schriftarten." },
      { q: "Was, wenn der Empfänger ihn nicht einlösen möchte?", a: "Nicht eingelöste Gutscheine sind innerhalb von 30 Tagen an den Käufer erstattbar. E-Mail an gifts@azdome.com." },
      { q: "Funktioniert der Gutschein international?", a: "Ja — überall, wohin AZDOME versendet. Lokale Steuern und Versand fallen an der Kasse für das Land des Empfängers an." },
    ],
    terms: [
      "Gutscheine lauten auf US-Dollar und können auf azdome.com eingelöst werden.",
      "Codes werden per E-Mail an die angegebene Empfängeradresse versendet. Sie können weitergeleitet werden — wie Bargeld behandeln.",
      "Karten verfallen nicht und es fallen keine Inaktivitätsgebühren an. Teilbeträge bleiben auf der Karte, bis sie aufgebraucht sind.",
      "Gutscheine können nicht mit Promo-Codes kombiniert werden, die Gutscheine ausschließen. Konflikte werden an der Kasse angezeigt.",
      "Gutscheine können nicht zum Kauf weiterer Gutscheine verwendet werden.",
      "Verlorene oder gestohlene Karten: Wir können neu ausstellen, wenn der ursprüngliche Kaufbeleg und das ungenutzte Guthaben vorliegen.",
    ],
  },
  fr: {
    eyebrow: "Cartes cadeaux",
    title: "Le cadeau toujours au point.",
    sub: "Les cartes cadeaux AZDOME sont livrées instantanément par e-mail. Utilisables à la caisse — elles n'expirent jamais.",
    cardLabel: "Carte cadeau AZDOME",
    sent: "Cadeau envoyé.",
    sentSub: "Le destinataire recevra un e-mail joliment mis en page avec un code de remboursement.",
    chooseAmount: "Choisir le montant",
    recipientEmail: "E-mail du destinataire",
    emailPh: "lui@exemple.com",
    message: "Message personnel (facultatif)",
    messagePh: "Roule en toute sécurité.",
    sendGift: "Envoyer le cadeau",
    howTitle: "Comment ça marche.",
    faqTitle: "Questions fréquentes.",
    termsTitle: "Conditions.",
    how: [
      { iconName: "Mail", title: "Livraison instantanée", body: "Envoyé par e-mail dès la commande (ou programmé pour une date future)." },
      { iconName: "Sparkles", title: "Utiliser à la caisse", body: "Le destinataire saisit le code au paiement. Utilisation partielle possible." },
      { iconName: "Clock", title: "Pas d'expiration", body: "Les cartes AZDOME n'expirent pas et n'ont pas de frais d'inactivité." },
      { iconName: "ShieldCheck", title: "Remboursable à l'acheteur", body: "Les cartes non utilisées sont remboursables à l'acheteur d'origine sous 30 jours." },
    ],
    faq: [
      { q: "Le destinataire peut-il l'utiliser sur des accessoires ?", a: "Tout ce qui est sur azdome.com — caméras, accessoires, frais de port et même taxes applicables." },
      { q: "Puis-je programmer une date d'envoi future ?", a: "Oui. Choisissez la date au paiement, nous envoyons l'e-mail le matin du jour choisi." },
      { q: "Puis-je inclure un message personnel ?", a: "Bien sûr. Jusqu'à 500 caractères. Affichage soigné et cohérent avec la marque — pas de cliparts ni de polices ringardes." },
      { q: "Et si le destinataire ne veut pas l'utiliser ?", a: "Les cartes non utilisées sont remboursables à l'acheteur d'origine sous 30 jours. E-mail à gifts@azdome.com." },
      { q: "Fonctionne-t-elle à l'international ?", a: "Oui — partout où AZDOME livre. Les taxes locales et le port du pays du destinataire s'appliquent au paiement." },
    ],
    terms: [
      "Les cartes cadeaux sont libellées en dollars américains et utilisables sur azdome.com.",
      "Les codes sont envoyés par e-mail à l'adresse du destinataire que vous indiquez. Ils peuvent être transférés — traitez-les comme de l'argent.",
      "Les cartes n'expirent pas et n'ont pas de frais d'inactivité. Le solde restant demeure sur la carte jusqu'à épuisement.",
      "Les cartes ne se cumulent pas avec les codes promo qui les excluent. Le site vous prévient à la caisse en cas de conflit.",
      "Les cartes cadeaux ne peuvent pas servir à acheter d'autres cartes cadeaux.",
      "Cartes perdues ou volées : nous pouvons les réémettre avec le reçu d'achat original et le solde non utilisé.",
    ],
  },
  es: {
    eyebrow: "Tarjetas regalo",
    title: "El regalo siempre en foco.",
    sub: "Las tarjetas regalo digitales de AZDOME se entregan al instante por correo. Canjéalas en el checkout — nunca caducan.",
    cardLabel: "Tarjeta regalo AZDOME",
    sent: "Regalo enviado.",
    sentSub: "El destinatario recibirá un correo con un diseño cuidado y el código de canje.",
    chooseAmount: "Elegir importe",
    recipientEmail: "Correo del destinatario",
    emailPh: "destinatario@ejemplo.com",
    message: "Mensaje personal (opcional)",
    messagePh: "Que tengas un viaje seguro.",
    sendGift: "Enviar regalo",
    howTitle: "Cómo funciona.",
    faqTitle: "Preguntas frecuentes.",
    termsTitle: "Términos.",
    how: [
      { iconName: "Mail", title: "Entrega inmediata", body: "Enviada por correo en cuanto se realiza el pedido (o programada para una fecha futura)." },
      { iconName: "Sparkles", title: "Canjear en el checkout", body: "El destinatario introduce el código en la página de pago. Se admite uso parcial." },
      { iconName: "Clock", title: "No caduca", body: "Las tarjetas AZDOME no tienen fecha de caducidad ni comisiones por inactividad." },
      { iconName: "ShieldCheck", title: "Reembolsable al comprador", body: "Las tarjetas no usadas son reembolsables al comprador original en los 30 días siguientes a la emisión." },
    ],
    faq: [
      { q: "¿Sirve solo para cámaras o también para accesorios?", a: "Cualquier cosa en azdome.com — cámaras, accesorios, gastos de envío e incluso impuestos aplicables." },
      { q: "¿Puedo programar la entrega para una fecha futura?", a: "Sí. Elige la fecha en el checkout y enviaremos el correo al destinatario esa mañana." },
      { q: "¿Puedo incluir un mensaje personal?", a: "Por supuesto. Hasta 500 caracteres. Lo presentamos con un diseño limpio, sin tipografías cursis ni cliparts." },
      { q: "¿Y si el destinatario no quiere usarla?", a: "Las tarjetas no usadas son reembolsables al comprador original en 30 días. Escribe a gifts@azdome.com." },
      { q: "¿Funciona internacionalmente?", a: "Sí — en cualquier sitio donde AZDOME envíe. Los impuestos y envíos locales del destinatario se aplican en el checkout." },
    ],
    terms: [
      "Las tarjetas regalo están denominadas en dólares estadounidenses y son canjeables en azdome.com.",
      "Los códigos se envían por correo a la dirección que indiques. Pueden reenviarse — trátalos como dinero en efectivo.",
      "Las tarjetas no caducan ni tienen comisiones por inactividad. El saldo restante permanece en la tarjeta hasta agotarse.",
      "Las tarjetas regalo no se combinan con códigos promocionales que las excluyan. La web te avisa de conflictos en el checkout.",
      "No se pueden usar tarjetas regalo para comprar más tarjetas regalo.",
      "Tarjetas perdidas o robadas: podemos reemitirlas con el recibo de compra original y el saldo no usado.",
    ],
  },
  it: {
    eyebrow: "Buoni regalo",
    title: "Il regalo sempre a fuoco.",
    sub: "I buoni regalo digitali AZDOME sono consegnati subito via email. Da usare al checkout — non scadono.",
    cardLabel: "Buono regalo AZDOME",
    sent: "Regalo inviato.",
    sentSub: "Il destinatario riceverà un'email curata con il codice di riscatto.",
    chooseAmount: "Scegli l'importo",
    recipientEmail: "Email del destinatario",
    emailPh: "lui@esempio.com",
    message: "Messaggio personale (opzionale)",
    messagePh: "Buon viaggio in tutta sicurezza.",
    sendGift: "Invia regalo",
    howTitle: "Come funziona.",
    faqTitle: "Domande frequenti.",
    termsTitle: "Termini.",
    how: [
      { iconName: "Mail", title: "Consegna istantanea", body: "Inviato via email al momento dell'ordine (o programmato per una data futura)." },
      { iconName: "Sparkles", title: "Riscatta al checkout", body: "Il destinatario inserisce il codice in cassa. Uso parziale supportato." },
      { iconName: "Clock", title: "Senza scadenza", body: "I buoni AZDOME non scadono e non hanno commissioni di inattività." },
      { iconName: "ShieldCheck", title: "Rimborsabile all'acquirente", body: "I buoni non usati sono rimborsabili all'acquirente originale entro 30 giorni dall'emissione." },
    ],
    faq: [
      { q: "Si può usare anche per gli accessori?", a: "Qualsiasi cosa su azdome.com — dash cam, accessori, spedizione e anche tasse applicabili." },
      { q: "Posso programmare la consegna in futuro?", a: "Sì. Scegli la data al checkout, invieremo l'email al destinatario quella mattina." },
      { q: "Posso aggiungere un messaggio personale?", a: "Certo. Fino a 500 caratteri. Lo rendiamo in un design pulito e coerente — niente clipart o caratteri kitsch." },
      { q: "E se il destinatario non vuole usarlo?", a: "I buoni non usati sono rimborsabili all'acquirente entro 30 giorni. Scrivi a gifts@azdome.com." },
      { q: "Funziona a livello internazionale?", a: "Sì — ovunque AZDOME spedisca. Le tasse locali e la spedizione del paese del destinatario si applicano al checkout." },
    ],
    terms: [
      "I buoni regalo sono in dollari USA e si possono riscattare su azdome.com.",
      "I codici arrivano via email all'indirizzo del destinatario indicato. Sono inoltrabili — trattali come contante.",
      "I buoni non scadono e non hanno commissioni di inattività. Il saldo residuo rimane sul buono fino all'esaurimento.",
      "I buoni non si combinano con codici promo che li escludono. Il sito segnala eventuali conflitti al checkout.",
      "Non puoi usare buoni regalo per acquistare altri buoni regalo.",
      "Buoni smarriti o rubati: possiamo riemetterli con la ricevuta originale e il saldo non usato.",
    ],
  },
  ru: {
    eyebrow: "Подарочные карты",
    title: "Подарок, который всегда в фокусе.",
    sub: "Цифровые подарочные карты AZDOME отправляются на email мгновенно. Используйте на оформлении — они не сгорают.",
    cardLabel: "Подарочная карта AZDOME",
    sent: "Подарок отправлен.",
    sentSub: "Получатель получит красиво оформленное письмо с кодом активации.",
    chooseAmount: "Выберите сумму",
    recipientEmail: "Email получателя",
    emailPh: "they@example.com",
    message: "Личное сообщение (необязательно)",
    messagePh: "Безопасной дороги.",
    sendGift: "Отправить подарок",
    howTitle: "Как это работает.",
    faqTitle: "Частые вопросы.",
    termsTitle: "Условия.",
    how: [
      { iconName: "Mail", title: "Моментальная доставка", body: "Отправляется письмом в момент оформления заказа (или планируется на будущую дату)." },
      { iconName: "Sparkles", title: "Применяется на оформлении", body: "Получатель вводит код на странице оплаты. Частичное использование поддерживается." },
      { iconName: "Clock", title: "Не сгорает", body: "Подарочные карты AZDOME не имеют срока годности и комиссий за неактивность." },
      { iconName: "ShieldCheck", title: "Возврат покупателю", body: "Неиспользованные карты возвращаются исходному покупателю в течение 30 дней после выпуска." },
    ],
    faq: [
      { q: "Подходит для аксессуаров или только для камер?", a: "Всё на azdome.com — камеры, аксессуары, доставка и применимые налоги." },
      { q: "Можно ли запланировать доставку на будущее?", a: "Да. Выберите дату при оформлении — отправим письмо утром того дня." },
      { q: "Можно добавить личное сообщение?", a: "Конечно. До 500 символов. Оформляем в чистом фирменном стиле — без китчевых шрифтов и клипарта." },
      { q: "Что если получатель не хочет использовать?", a: "Неиспользованные карты возвращаются исходному покупателю в течение 30 дней. Пишите на gifts@azdome.com." },
      { q: "Работает ли карта за рубежом?", a: "Да — везде, куда AZDOME доставляет. Местные налоги и доставка страны получателя добавляются при оплате." },
    ],
    terms: [
      "Подарочные карты выпускаются в долларах США и принимаются на azdome.com.",
      "Коды отправляются на указанный вами email получателя. Их можно пересылать — относитесь как к наличным.",
      "Карты не сгорают и не имеют комиссий за неактивность. Остаток сохраняется на карте до полного использования.",
      "Карты не суммируются с промокодами, которые их исключают. Сайт предупредит о конфликте на оплате.",
      "Подарочными картами нельзя покупать другие подарочные карты.",
      "Утерянные или украденные карты: перевыпустим при наличии чека и неиспользованного остатка.",
    ],
  },
  pl: {
    eyebrow: "Karty podarunkowe",
    title: "Prezent, który zawsze trafia w punkt.",
    sub: "Cyfrowe karty AZDOME są dostarczane natychmiast e-mailem. Wykorzystaj przy płatności — nie wygasają.",
    cardLabel: "Karta podarunkowa AZDOME",
    sent: "Prezent wysłany.",
    sentSub: "Odbiorca dostanie pięknie zaprojektowany e-mail z kodem do realizacji.",
    chooseAmount: "Wybierz kwotę",
    recipientEmail: "Email odbiorcy",
    emailPh: "odbiorca@przyklad.pl",
    message: "Wiadomość osobista (opcjonalnie)",
    messagePh: "Bezpiecznej podróży.",
    sendGift: "Wyślij prezent",
    howTitle: "Jak to działa.",
    faqTitle: "Częste pytania.",
    termsTitle: "Warunki.",
    how: [
      { iconName: "Mail", title: "Natychmiastowa dostawa", body: "Wysyłana e-mailem zaraz po zamówieniu (lub zaplanowana na przyszłą datę)." },
      { iconName: "Sparkles", title: "Realizacja przy płatności", body: "Odbiorca wpisuje kod przy zamówieniu. Częściowe użycie dozwolone." },
      { iconName: "Clock", title: "Bez daty ważności", body: "Karty AZDOME nie wygasają i nie mają opłat za nieaktywność." },
      { iconName: "ShieldCheck", title: "Zwrot do kupującego", body: "Niewykorzystane karty można zwrócić oryginalnemu kupującemu w ciągu 30 dni od emisji." },
    ],
    faq: [
      { q: "Tylko na kamery czy też na akcesoria?", a: "Wszystko na azdome.com — kamery, akcesoria, wysyłka, a nawet stosowne podatki." },
      { q: "Mogę zaplanować dostawę na przyszłość?", a: "Tak. Wybierz datę przy płatności — e-mail zostanie wysłany rano w tym dniu." },
      { q: "Mogę dodać osobistą wiadomość?", a: "Oczywiście. Do 500 znaków. Wyświetlamy w czystym, spójnym z marką stylu — bez klipartów ani kiczowatych fontów." },
      { q: "Co jeśli odbiorca nie chce z niej skorzystać?", a: "Niewykorzystane karty można zwrócić oryginalnemu kupującemu w ciągu 30 dni. Napisz na gifts@azdome.com." },
      { q: "Działa międzynarodowo?", a: "Tak — wszędzie, gdzie AZDOME dostarcza. Lokalne podatki i wysyłka kraju odbiorcy doliczane są przy płatności." },
    ],
    terms: [
      "Karty są w dolarach amerykańskich i realizowane na azdome.com.",
      "Kody trafiają e-mailem na adres odbiorcy, który podasz. Można je przekazywać — traktuj jak gotówkę.",
      "Karty nie wygasają i nie mają opłat za nieaktywność. Saldo zostaje na karcie do wyczerpania.",
      "Karty nie łączą się z kodami promocyjnymi, które je wykluczają. Strona poinformuje o konflikcie przy płatności.",
      "Kartami podarunkowymi nie można kupić innych kart podarunkowych.",
      "Zgubione lub skradzione: wystawimy ponownie po okazaniu dowodu zakupu i niewykorzystanego salda.",
    ],
  },
  ro: {
    eyebrow: "Carduri cadou",
    title: "Cadoul care e mereu în focus.",
    sub: "Cardurile cadou digitale AZDOME se livrează instant prin email. Folosește-le la checkout — nu expiră.",
    cardLabel: "Card cadou AZDOME",
    sent: "Cadou trimis.",
    sentSub: "Destinatarul va primi un email frumos formatat cu un cod de utilizare.",
    chooseAmount: "Alege suma",
    recipientEmail: "Emailul destinatarului",
    emailPh: "destinatar@exemplu.ro",
    message: "Mesaj personal (opțional)",
    messagePh: "Drum bun și în siguranță.",
    sendGift: "Trimite cadoul",
    howTitle: "Cum funcționează.",
    faqTitle: "Întrebări frecvente.",
    termsTitle: "Termeni.",
    how: [
      { iconName: "Mail", title: "Livrare instantanee", body: "Se trimite prin email la plasarea comenzii (sau programat pentru o dată viitoare)." },
      { iconName: "Sparkles", title: "Folosește la checkout", body: "Destinatarul introduce codul pe pagina de checkout. Utilizare parțială permisă." },
      { iconName: "Clock", title: "Nu expiră", body: "Cardurile AZDOME nu au dată de expirare și nu au taxe de inactivitate." },
      { iconName: "ShieldCheck", title: "Rambursabil cumpărătorului", body: "Cardurile nefolosite pot fi rambursate cumpărătorului inițial în 30 de zile de la emitere." },
    ],
    faq: [
      { q: "Se poate folosi pe accesorii sau doar pe camere?", a: "Orice de pe azdome.com — camere, accesorii, transport și chiar taxe aplicabile." },
      { q: "Pot programa livrarea pentru o dată viitoare?", a: "Da. Alege data la checkout — vom trimite emailul destinatarului în acea dimineață." },
      { q: "Pot include un mesaj personal?", a: "Sigur. Până la 500 de caractere. Redăm într-un design curat și consistent cu brandul — fără cliparturi sau fonturi kitsch." },
      { q: "Ce dacă destinatarul nu vrea să-l folosească?", a: "Cardurile nefolosite pot fi rambursate cumpărătorului inițial în 30 de zile. Email la gifts@azdome.com." },
      { q: "Funcționează internațional?", a: "Da — oriunde livrează AZDOME. Taxele și transportul țării destinatarului se aplică la checkout." },
    ],
    terms: [
      "Cardurile cadou sunt denominate în dolari americani și se folosesc pe azdome.com.",
      "Codurile se trimit prin email la adresa destinatarului indicat. Pot fi redirecționate — tratați-le ca pe bani.",
      "Cardurile nu expiră și nu au taxe de inactivitate. Soldul rămâne pe card până la epuizare.",
      "Cardurile nu se combină cu coduri promoționale care le exclud. Site-ul vă anunță la checkout dacă există conflict.",
      "Cardurile cadou nu se pot folosi pentru a cumpăra alte carduri cadou.",
      "Carduri pierdute sau furate: putem reemite cu chitanța originală și soldul nefolosit.",
    ],
  },
  tr: {
    eyebrow: "Hediye Kartları",
    title: "Hep odakta olan hediye.",
    sub: "Dijital AZDOME hediye kartları anında e-postayla teslim edilir. Kasada kullanın — süresi yoktur.",
    cardLabel: "AZDOME Hediye Kartı",
    sent: "Hediye gönderildi.",
    sentSub: "Alıcı, kullanım koduyla birlikte güzel tasarlanmış bir e-posta alacak.",
    chooseAmount: "Tutar seçin",
    recipientEmail: "Alıcının e-postası",
    emailPh: "onlar@ornek.com",
    message: "Kişisel mesaj (isteğe bağlı)",
    messagePh: "Güvenli yolculuklar.",
    sendGift: "Hediyeyi gönder",
    howTitle: "Nasıl çalışır.",
    faqTitle: "Sık sorulanlar.",
    termsTitle: "Şartlar.",
    how: [
      { iconName: "Mail", title: "Anında teslim", body: "Sipariş verilir verilmez e-postayla gönderilir (veya ileri bir tarih için planlanır)." },
      { iconName: "Sparkles", title: "Kasada kullan", body: "Alıcı, ödeme sayfasında kodu girer. Kısmi kullanım desteklenir." },
      { iconName: "Clock", title: "Süresiz", body: "AZDOME hediye kartlarının son kullanma tarihi yoktur, hareketsizlik ücreti alınmaz." },
      { iconName: "ShieldCheck", title: "Alıcıya iade edilebilir", body: "Kullanılmayan kartlar, düzenleme tarihinden itibaren 30 gün içinde orijinal alıcısına iade edilebilir." },
    ],
    faq: [
      { q: "Aksesuarlarda da kullanılabilir mi?", a: "azdome.com'daki her şeyde — kameralar, aksesuarlar, kargo ve uygulanabilir vergiler." },
      { q: "Teslimi ileri bir tarihe planlayabilir miyim?", a: "Evet. Kasada tarihi seçin, alıcıya o sabah e-posta göndeririz." },
      { q: "Kişisel mesaj ekleyebilir miyim?", a: "Tabii. 500 karaktere kadar. Sade, marka uyumlu bir tasarımla gösteririz — clip art ya da klişe yazı tipleri yok." },
      { q: "Alıcı kullanmak istemezse?", a: "Kullanılmayan kartlar 30 gün içinde orijinal alıcısına iade edilebilir. gifts@azdome.com adresine yazın." },
      { q: "Yurt dışında çalışır mı?", a: "Evet — AZDOME'un gönderim yaptığı her yerde. Alıcının ülkesinin yerel vergi ve kargo bedelleri ödemede uygulanır." },
    ],
    terms: [
      "Hediye kartları ABD doları cinsindendir ve azdome.com'da kullanılır.",
      "Kodlar belirttiğiniz alıcı e-postasına gönderilir. Yönlendirilebilir — nakit gibi muamele edin.",
      "Kartlar süresiz, hareketsizlik ücreti yok. Kalan bakiye tükenene kadar kartta kalır.",
      "Hediye kartları, onları hariç tutan promosyon kodlarıyla birleştirilemez. Kasada çakışma uyarısı çıkar.",
      "Hediye kartlarıyla başka hediye kartı satın alınamaz.",
      "Kayıp veya çalıntı: orijinal satın alma makbuzu ve kullanılmamış bakiyeyle yeniden düzenleyebiliriz.",
    ],
  },
  pt: {
    eyebrow: "Cartões-presente",
    title: "O presente que está sempre em foco.",
    sub: "Cartões-presente digitais da AZDOME chegam por email na hora. Use no checkout — não expiram.",
    cardLabel: "Cartão-presente AZDOME",
    sent: "Presente enviado.",
    sentSub: "O destinatário receberá um email bem formatado com o código de resgate.",
    chooseAmount: "Escolha o valor",
    recipientEmail: "Email do destinatário",
    emailPh: "destinatario@exemplo.com",
    message: "Mensagem pessoal (opcional)",
    messagePh: "Boa viagem em segurança.",
    sendGift: "Enviar presente",
    howTitle: "Como funciona.",
    faqTitle: "Perguntas frequentes.",
    termsTitle: "Termos.",
    how: [
      { iconName: "Mail", title: "Entrega instantânea", body: "Enviado por email assim que o pedido é feito (ou agendado para data futura)." },
      { iconName: "Sparkles", title: "Resgate no checkout", body: "O destinatário insere o código na página de pagamento. Uso parcial permitido." },
      { iconName: "Clock", title: "Nunca expira", body: "Cartões-presente AZDOME não têm prazo de validade nem taxa de inatividade." },
      { iconName: "ShieldCheck", title: "Reembolsável ao comprador", body: "Cartões não usados são reembolsáveis ao comprador original em 30 dias da emissão." },
    ],
    faq: [
      { q: "Serve para acessórios ou só para câmeras?", a: "Tudo no azdome.com — câmeras, acessórios, frete e até impostos aplicáveis." },
      { q: "Posso agendar entrega para uma data futura?", a: "Sim. Escolha a data no checkout — enviamos o email ao destinatário na manhã do dia escolhido." },
      { q: "Posso incluir uma mensagem pessoal?", a: "Claro. Até 500 caracteres. Apresentamos em um design limpo e alinhado à marca — sem clipart nem fontes bregas." },
      { q: "E se o destinatário não quiser usar?", a: "Cartões não usados são reembolsáveis ao comprador em 30 dias. Email para gifts@azdome.com." },
      { q: "Funciona internacionalmente?", a: "Sim — em qualquer lugar onde a AZDOME entrega. Impostos locais e frete do país do destinatário são aplicados no checkout." },
    ],
    terms: [
      "Cartões-presente são em dólares americanos e resgatáveis em azdome.com.",
      "Os códigos vão por email ao endereço do destinatário informado. Podem ser encaminhados — trate-os como dinheiro.",
      "Os cartões não expiram e não têm taxa de inatividade. O saldo restante permanece no cartão até ser usado.",
      "Cartões-presente não se combinam com códigos promocionais que os excluam. O site avisa de conflito no checkout.",
      "Cartões-presente não podem ser usados para comprar outros cartões-presente.",
      "Cartões perdidos ou roubados: podemos reemitir com o recibo original e o saldo não utilizado.",
    ],
  },
  ar: {
    eyebrow: "بطاقات الهدايا",
    title: "الهدية التي تبقى دائمًا في البؤرة.",
    sub: "بطاقات هدايا AZDOME الرقمية تُسلَّم فورًا عبر البريد. استبدلها عند الدفع — لا تنتهي صلاحيتها.",
    cardLabel: "بطاقة هدية AZDOME",
    sent: "تم إرسال الهدية.",
    sentSub: "سيستلم المستلم بريدًا منسّقًا بشكل أنيق مع رمز الاستبدال.",
    chooseAmount: "اختر المبلغ",
    recipientEmail: "بريد المستلم",
    emailPh: "them@example.com",
    message: "رسالة شخصية (اختياري)",
    messagePh: "أتمنى لك طريقًا آمنًا.",
    sendGift: "إرسال الهدية",
    howTitle: "كيف تعمل.",
    faqTitle: "أسئلة شائعة.",
    termsTitle: "الشروط.",
    how: [
      { iconName: "Mail", title: "تسليم فوري", body: "تُرسل بالبريد فور إتمام الطلب (أو تُجدوَل لتاريخ مستقبلي)." },
      { iconName: "Sparkles", title: "استبدال عند الدفع", body: "يُدخل المستلم الرمز في صفحة الدفع. الاستخدام الجزئي مدعوم." },
      { iconName: "Clock", title: "لا تنتهي", body: "بطاقات AZDOME ليس لها تاريخ انتهاء ولا رسوم خمول." },
      { iconName: "ShieldCheck", title: "قابلة للاسترداد للمشتري", body: "البطاقات غير المستخدمة قابلة للاسترداد للمشتري الأصلي خلال 30 يومًا من الإصدار." },
    ],
    faq: [
      { q: "هل يمكن استخدامها للإكسسوارات؟", a: "أي شيء على azdome.com — كاميرات وإكسسوارات وتكاليف شحن وحتى الضرائب المطبقة." },
      { q: "هل يمكنني جدولة التسليم لتاريخ مستقبلي؟", a: "نعم. اختر التاريخ عند الدفع، وسنرسل البريد للمستلم في صباح ذلك اليوم." },
      { q: "هل يمكن إضافة رسالة شخصية؟", a: "بالتأكيد. حتى 500 حرف. نعرضها بتصميم أنيق منسجم مع الهوية — بلا صور قص أو خطوط مبتذلة." },
      { q: "ماذا لو لم يرغب المستلم في استخدامها؟", a: "البطاقات غير المستخدمة قابلة للاسترداد للمشتري الأصلي خلال 30 يومًا. راسلنا على gifts@azdome.com." },
      { q: "هل تعمل دوليًا؟", a: "نعم — في أي مكان تشحن إليه AZDOME. تُطبَّق الضرائب المحلية والشحن لبلد المستلم عند الدفع." },
    ],
    terms: [
      "بطاقات الهدايا مقوَّمة بالدولار الأمريكي ويمكن استبدالها على azdome.com.",
      "تُسلَّم الرموز عبر البريد إلى عنوان المستلم الذي تحدده. يمكن إعادة توجيهها — تعامل معها كالنقود.",
      "البطاقات لا تنتهي ولا تتضمن رسوم خمول. يبقى الرصيد على البطاقة حتى يُستنفد.",
      "لا تُجمَع البطاقات مع رموز الخصومات الترويجية التي تستبعدها. سيُعلمك الموقع بأي تعارض عند الدفع.",
      "لا يمكن استخدام البطاقات لشراء بطاقات هدايا أخرى.",
      "البطاقات المفقودة أو المسروقة: يمكن إعادة إصدارها بإيصال الشراء الأصلي والرصيد غير المستخدم.",
    ],
  },
  th: {
    eyebrow: "บัตรของขวัญ",
    title: "ของขวัญที่อยู่ในโฟกัสเสมอ",
    sub: "บัตรของขวัญ AZDOME ดิจิทัล ส่งทางอีเมลทันที ใช้ตอนชำระเงิน — ไม่มีวันหมดอายุ",
    cardLabel: "บัตรของขวัญ AZDOME",
    sent: "ส่งของขวัญแล้ว",
    sentSub: "ผู้รับจะได้รับอีเมลที่ออกแบบสวยงามพร้อมรหัสแลกรับ",
    chooseAmount: "เลือกจำนวน",
    recipientEmail: "อีเมลผู้รับ",
    emailPh: "them@example.com",
    message: "ข้อความส่วนตัว (ไม่บังคับ)",
    messagePh: "ขอให้เดินทางปลอดภัย",
    sendGift: "ส่งของขวัญ",
    howTitle: "วิธีการทำงาน",
    faqTitle: "คำถามที่พบบ่อย",
    termsTitle: "เงื่อนไข",
    how: [
      { iconName: "Mail", title: "ส่งทันที", body: "ส่งทางอีเมลทันทีหลังสั่งซื้อ (หรือกำหนดเวลาส่งในอนาคต)" },
      { iconName: "Sparkles", title: "ใช้ตอนชำระเงิน", body: "ผู้รับใส่รหัสบนหน้าชำระเงิน รองรับการใช้บางส่วน" },
      { iconName: "Clock", title: "ไม่มีวันหมดอายุ", body: "บัตรของขวัญ AZDOME ไม่มีวันหมดอายุและไม่มีค่าธรรมเนียมไม่ใช้งาน" },
      { iconName: "ShieldCheck", title: "คืนเงินให้ผู้ซื้อได้", body: "บัตรที่ยังไม่ได้ใช้สามารถคืนเงินให้ผู้ซื้อภายใน 30 วันนับจากออก" },
    ],
    faq: [
      { q: "ใช้กับอุปกรณ์เสริมได้ไหม?", a: "ทุกอย่างบน azdome.com — กล้อง อุปกรณ์เสริม ค่าจัดส่ง และภาษีที่เกี่ยวข้อง" },
      { q: "กำหนดวันส่งล่วงหน้าได้ไหม?", a: "ได้ เลือกวันที่ตอนชำระเงิน เราจะส่งอีเมลให้ผู้รับในเช้าวันนั้น" },
      { q: "ใส่ข้อความส่วนตัวได้ไหม?", a: "ได้ ไม่เกิน 500 ตัวอักษร แสดงด้วยดีไซน์เรียบหรูตามแบรนด์ — ไม่มีคลิปอาร์ตหรือฟอนต์เชยๆ" },
      { q: "ถ้าผู้รับไม่อยากใช้?", a: "บัตรที่ไม่ได้ใช้สามารถคืนเงินให้ผู้ซื้อภายใน 30 วัน ติดต่อ gifts@azdome.com" },
      { q: "ใช้ในต่างประเทศได้ไหม?", a: "ได้ — ทุกที่ที่ AZDOME จัดส่ง ภาษีและค่าจัดส่งของประเทศผู้รับคำนวณตอนชำระเงิน" },
    ],
    terms: [
      "บัตรของขวัญเป็นสกุลดอลลาร์สหรัฐและใช้ได้บน azdome.com",
      "รหัสส่งทางอีเมลไปยังที่อยู่ผู้รับที่คุณระบุ ส่งต่อได้ — ปฏิบัติเหมือนเงินสด",
      "บัตรไม่หมดอายุและไม่มีค่าธรรมเนียมไม่ใช้งาน ยอดคงเหลือยังอยู่ในบัตรจนหมด",
      "บัตรของขวัญใช้ร่วมกับโค้ดส่งเสริมการขายที่ระบุยกเว้นไม่ได้ ระบบจะแจ้งหากมีข้อขัดแย้งตอนชำระเงิน",
      "บัตรของขวัญใช้ซื้อบัตรของขวัญใบอื่นไม่ได้",
      "บัตรหายหรือถูกขโมย: เราออกใหม่ได้หากมีใบเสร็จเดิมและยอดคงเหลือที่ยังไม่ได้ใช้",
    ],
  },
  vi: {
    eyebrow: "Thẻ quà tặng",
    title: "Món quà luôn lấy nét.",
    sub: "Thẻ quà tặng AZDOME kỹ thuật số gửi qua email ngay lập tức. Đổi tại thanh toán — không hết hạn.",
    cardLabel: "Thẻ quà tặng AZDOME",
    sent: "Đã gửi quà.",
    sentSub: "Người nhận sẽ nhận một email được thiết kế đẹp kèm mã đổi.",
    chooseAmount: "Chọn số tiền",
    recipientEmail: "Email người nhận",
    emailPh: "them@example.com",
    message: "Tin nhắn cá nhân (tùy chọn)",
    messagePh: "Chúc bạn lái xe an toàn.",
    sendGift: "Gửi quà",
    howTitle: "Cách hoạt động.",
    faqTitle: "Câu hỏi thường gặp.",
    termsTitle: "Điều khoản.",
    how: [
      { iconName: "Mail", title: "Gửi tức thì", body: "Gửi qua email ngay khi đặt hàng (hoặc lên lịch cho ngày tương lai)." },
      { iconName: "Sparkles", title: "Đổi tại thanh toán", body: "Người nhận nhập mã ở trang thanh toán. Hỗ trợ dùng một phần." },
      { iconName: "Clock", title: "Không hết hạn", body: "Thẻ quà tặng AZDOME không có ngày hết hạn và không phí ngừng hoạt động." },
      { iconName: "ShieldCheck", title: "Hoàn cho người mua", body: "Thẻ chưa dùng có thể hoàn cho người mua gốc trong vòng 30 ngày từ ngày phát hành." },
    ],
    faq: [
      { q: "Dùng được cho phụ kiện hay chỉ camera?", a: "Mọi thứ trên azdome.com — camera, phụ kiện, phí vận chuyển và cả thuế áp dụng." },
      { q: "Có thể đặt lịch gửi ngày tương lai không?", a: "Có. Chọn ngày khi thanh toán — chúng tôi sẽ gửi email vào sáng ngày đó." },
      { q: "Có thể kèm tin nhắn cá nhân không?", a: "Tất nhiên. Tối đa 500 ký tự. Hiển thị theo thiết kế gọn gàng, đúng brand — không clipart hay font rườm rà." },
      { q: "Nếu người nhận không muốn dùng?", a: "Thẻ chưa dùng có thể hoàn cho người mua gốc trong 30 ngày. Email gifts@azdome.com." },
      { q: "Thẻ có dùng được quốc tế không?", a: "Có — bất cứ nơi nào AZDOME ship đến. Thuế và phí vận chuyển nội địa của nước người nhận tính ở thanh toán." },
    ],
    terms: [
      "Thẻ quà tặng tính bằng đô la Mỹ và đổi được trên azdome.com.",
      "Mã được gửi qua email đến địa chỉ người nhận bạn cung cấp. Có thể chuyển tiếp — coi như tiền mặt.",
      "Thẻ không hết hạn và không có phí ngừng hoạt động. Số dư còn lại nằm trên thẻ đến khi dùng hết.",
      "Thẻ không kết hợp được với mã khuyến mãi loại trừ chúng. Website sẽ báo nếu có xung đột ở thanh toán.",
      "Không dùng thẻ quà tặng để mua thẻ quà tặng khác.",
      "Thẻ bị mất hoặc trộm: chúng tôi có thể phát hành lại nếu có biên lai gốc và số dư chưa dùng.",
    ],
  },
};

export default function GiftCardsPage() {
  const { locale } = useLocale();
  const copy = COPY[locale] ?? COPY.en!;
  const [amount, setAmount] = useState(50);
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-5xl px-6 pb-24 pt-32 md:pt-40 lg:px-10">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
          {copy.eyebrow}
        </p>
        <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
          {copy.title}
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg">
          {copy.sub}
        </p>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="relative flex aspect-[8/5] flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-blue-700 to-blue-500 p-8 text-white shadow-lg">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
              <Gift className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">
                {copy.cardLabel}
              </p>
              <p className="mt-3 text-5xl font-bold tracking-tight">${amount}</p>
            </div>
          </div>

          {submitted ? (
            <div className="flex flex-col items-start justify-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="h-6 w-6" />
              </span>
              <h2 className="mt-5 text-2xl font-bold tracking-tight text-slate-900">
                {copy.sent}
              </h2>
              <p className="mt-2 text-sm text-slate-500">{copy.sentSub}</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-5"
            >
              <div>
                <p className="mb-2 text-xs font-semibold tracking-tight text-slate-600">
                  {copy.chooseAmount}
                </p>
                <div className="flex flex-wrap gap-2">
                  {PRESET.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setAmount(p)}
                      className={[
                        "rounded-full px-5 py-2 text-sm font-semibold tracking-tight transition-all duration-300",
                        amount === p
                          ? "bg-slate-900 text-white"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200",
                      ].join(" ")}
                    >
                      ${p}
                    </button>
                  ))}
                </div>
              </div>

              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold tracking-tight text-slate-600">
                  {copy.recipientEmail}
                </span>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder={copy.emailPh}
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
                  />
                </div>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold tracking-tight text-slate-600">
                  {copy.message}
                </span>
                <textarea
                  rows={3}
                  placeholder={copy.messagePh}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
                />
              </label>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-semibold tracking-tight text-white shadow-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-md"
              >
                {copy.sendGift} · ${amount}
              </button>
            </form>
          )}
        </div>

        {/* How it works */}
        <section className="mt-24">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            {copy.howTitle}
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {copy.how.map((h) => {
              const Icon = ICONS[h.iconName] ?? Mail;
              return (
                <div key={h.title} className="rounded-2xl bg-slate-50 p-7 shadow-sm">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-base font-semibold tracking-tight text-slate-900">{h.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">{h.body}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-20">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            {copy.faqTitle}
          </h2>
          <dl className="mt-8 divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-white shadow-sm">
            {copy.faq.map((f) => (
              <div key={f.q} className="px-6 py-6 md:px-8">
                <dt className="text-base font-semibold tracking-tight text-slate-900">{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-slate-600 md:text-base">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Terms */}
        <section className="mt-20">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            {copy.termsTitle}
          </h2>
          <ul className="mt-8 space-y-3 text-sm leading-relaxed text-slate-600 md:text-base">
            {copy.terms.map((t) => (
              <li key={t} className="flex gap-3">
                <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-slate-400" />
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
