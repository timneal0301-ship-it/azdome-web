"use client";

import { useState } from "react";
import Link from "@/components/ui/Link";
import { CheckCircle2, Mail, MessageCircle, Phone } from "lucide-react";

import { useLocale } from "@/components/LocaleProvider";
import type { Locale } from "@/lib/i18n/dictionaries";

type Copy = {
  eyebrow: string;
  title: string;
  subPrefix: string;
  subLink: string;
  subSuffix: string;
  topic: string;
  topics: string[];
  name: string;
  email: string;
  order: string;
  body: string;
  send: string;
  received: string;
  receivedSub: string;
  reference: string;
  liveChat: string;
  liveChatHours: string;
  emailLabel: string;
  phoneLabel: string;
};

const COPY: Partial<Record<Locale, Copy>> = {
  en: { eyebrow: "Contact Support", title: "We're here to help.", subPrefix: "Most installation questions are answered in our ", subLink: "support center", subSuffix: ". For everything else, reach us below.", topic: "Topic", topics: ["Order issue", "Installation", "Firmware / App", "Warranty", "Press", "Other"], name: "Name", email: "Email", order: "Order number (optional)", body: "Describe the issue. Photos can be attached after submission.", send: "Send message", received: "Message received.", receivedSub: "A specialist will reply within 1 business day.", reference: "Reference:", liveChat: "Live chat", liveChatHours: "Mon–Fri, 9 AM – 6 PM PT", emailLabel: "Email", phoneLabel: "Phone" },
  zh: { eyebrow: "联系支持", title: "我们在这里帮助你。", subPrefix: "大多数安装问题都能在", subLink: "支持中心", subSuffix: "里找到答案。其他问题请在下方联系我们。", topic: "主题", topics: ["订单问题", "安装", "固件 / App", "保修", "媒体", "其他"], name: "姓名", email: "邮箱", order: "订单号(可选)", body: "请描述问题。提交后可上传照片。", send: "发送消息", received: "消息已收到。", receivedSub: "专家将在 1 个工作日内回复。", reference: "工单号:", liveChat: "在线咨询", liveChatHours: "周一至周五,上午 9 点 – 下午 6 点 (PT)", emailLabel: "邮箱", phoneLabel: "电话" },
  ja: { eyebrow: "サポートに問い合わせ", title: "サポートいたします。", subPrefix: "取り付けに関する多くのご質問は", subLink: "サポートセンター", subSuffix: "に回答があります。その他はこちらからお問い合わせください。", topic: "種別", topics: ["注文の問題", "取り付け", "ファームウェア / アプリ", "保証", "メディア", "その他"], name: "お名前", email: "メールアドレス", order: "注文番号(任意)", body: "問題をご記入ください。送信後に写真を添付できます。", send: "送信", received: "送信完了しました。", receivedSub: "担当者が 1 営業日以内にご返信します。", reference: "受付番号:", liveChat: "ライブチャット", liveChatHours: "月〜金 9:00〜18:00(太平洋時間)", emailLabel: "メール", phoneLabel: "電話" },
  de: { eyebrow: "Support kontaktieren", title: "Wir helfen Ihnen gerne.", subPrefix: "Die meisten Installationsfragen beantwortet unser ", subLink: "Support-Center", subSuffix: ". Für alles andere erreichen Sie uns unten.", topic: "Thema", topics: ["Bestellproblem", "Installation", "Firmware / App", "Garantie", "Presse", "Sonstiges"], name: "Name", email: "E-Mail", order: "Bestellnummer (optional)", body: "Beschreiben Sie das Problem. Fotos können nach dem Absenden angehängt werden.", send: "Nachricht senden", received: "Nachricht erhalten.", receivedSub: "Ein Spezialist meldet sich innerhalb eines Werktags.", reference: "Vorgangsnummer:", liveChat: "Live-Chat", liveChatHours: "Mo–Fr, 9–18 Uhr PT", emailLabel: "E-Mail", phoneLabel: "Telefon" },
  fr: { eyebrow: "Contacter le support", title: "Nous sommes là pour vous aider.", subPrefix: "La plupart des questions d'installation trouvent réponse dans notre ", subLink: "centre d'aide", subSuffix: ". Pour le reste, contactez-nous ci-dessous.", topic: "Sujet", topics: ["Problème de commande", "Installation", "Firmware / Appli", "Garantie", "Presse", "Autre"], name: "Nom", email: "E-mail", order: "Numéro de commande (facultatif)", body: "Décrivez le problème. Vous pourrez joindre des photos après l'envoi.", send: "Envoyer", received: "Message reçu.", receivedSub: "Un spécialiste vous répondra sous 1 jour ouvré.", reference: "Référence :", liveChat: "Chat en direct", liveChatHours: "Lun–Ven, 9 h – 18 h PT", emailLabel: "E-mail", phoneLabel: "Téléphone" },
  es: { eyebrow: "Contactar con soporte", title: "Estamos aquí para ayudarte.", subPrefix: "La mayoría de preguntas de instalación se responden en nuestro ", subLink: "centro de soporte", subSuffix: ". Para todo lo demás, contáctanos abajo.", topic: "Tema", topics: ["Problema de pedido", "Instalación", "Firmware / App", "Garantía", "Prensa", "Otro"], name: "Nombre", email: "Correo electrónico", order: "Número de pedido (opcional)", body: "Describe el problema. Puedes adjuntar fotos tras enviar.", send: "Enviar mensaje", received: "Mensaje recibido.", receivedSub: "Un especialista responderá en 1 día laborable.", reference: "Referencia:", liveChat: "Chat en directo", liveChatHours: "Lun–Vie, 9:00 – 18:00 PT", emailLabel: "Correo", phoneLabel: "Teléfono" },
  it: { eyebrow: "Contatta l'assistenza", title: "Siamo qui per aiutarti.", subPrefix: "La maggior parte delle domande sull'installazione trova risposta nel ", subLink: "centro assistenza", subSuffix: ". Per tutto il resto, contattaci qui sotto.", topic: "Argomento", topics: ["Problema d'ordine", "Installazione", "Firmware / App", "Garanzia", "Stampa", "Altro"], name: "Nome", email: "Email", order: "Numero d'ordine (opzionale)", body: "Descrivi il problema. Potrai allegare foto dopo l'invio.", send: "Invia messaggio", received: "Messaggio ricevuto.", receivedSub: "Uno specialista risponderà entro 1 giorno lavorativo.", reference: "Riferimento:", liveChat: "Chat dal vivo", liveChatHours: "Lun–Ven, 9:00 – 18:00 PT", emailLabel: "Email", phoneLabel: "Telefono" },
  ru: { eyebrow: "Связаться с поддержкой", title: "Мы здесь, чтобы помочь.", subPrefix: "Большинство вопросов по установке есть в нашем ", subLink: "центре поддержки", subSuffix: ". По остальным вопросам — свяжитесь ниже.", topic: "Тема", topics: ["Проблема с заказом", "Установка", "Прошивка / Приложение", "Гарантия", "Пресса", "Другое"], name: "Имя", email: "Email", order: "Номер заказа (необязательно)", body: "Опишите проблему. После отправки можно прикрепить фото.", send: "Отправить", received: "Сообщение получено.", receivedSub: "Специалист ответит в течение 1 рабочего дня.", reference: "Номер:", liveChat: "Онлайн-чат", liveChatHours: "Пн–Пт, 09:00–18:00 PT", emailLabel: "Email", phoneLabel: "Телефон" },
  pl: { eyebrow: "Kontakt ze wsparciem", title: "Jesteśmy tu, żeby pomóc.", subPrefix: "Większość pytań o montaż znajdziesz w naszym ", subLink: "centrum wsparcia", subSuffix: ". W pozostałych sprawach skontaktuj się poniżej.", topic: "Temat", topics: ["Problem z zamówieniem", "Montaż", "Firmware / Aplikacja", "Gwarancja", "Prasa", "Inne"], name: "Imię", email: "Email", order: "Numer zamówienia (opcjonalnie)", body: "Opisz problem. Zdjęcia można dołączyć po wysłaniu.", send: "Wyślij wiadomość", received: "Wiadomość odebrana.", receivedSub: "Specjalista odpowie w ciągu 1 dnia roboczego.", reference: "Numer:", liveChat: "Czat na żywo", liveChatHours: "Pn–Pt, 9:00–18:00 PT", emailLabel: "Email", phoneLabel: "Telefon" },
  ro: { eyebrow: "Contactează asistența", title: "Suntem aici să te ajutăm.", subPrefix: "Majoritatea întrebărilor despre instalare au răspuns în ", subLink: "centrul de asistență", subSuffix: ". Pentru orice altceva, contactează-ne mai jos.", topic: "Subiect", topics: ["Problemă comandă", "Instalare", "Firmware / Aplicație", "Garanție", "Presă", "Altul"], name: "Nume", email: "Email", order: "Număr comandă (opțional)", body: "Descrie problema. Poți atașa poze după trimitere.", send: "Trimite mesaj", received: "Mesaj primit.", receivedSub: "Un specialist va răspunde în 1 zi lucrătoare.", reference: "Referință:", liveChat: "Chat live", liveChatHours: "Lun–Vin, 9:00–18:00 PT", emailLabel: "Email", phoneLabel: "Telefon" },
  tr: { eyebrow: "Destek ile İletişim", title: "Yardım için buradayız.", subPrefix: "Çoğu kurulum sorusu ", subLink: "destek merkezimizde", subSuffix: " yanıtlanıyor. Geri kalan için aşağıdan ulaşın.", topic: "Konu", topics: ["Sipariş sorunu", "Kurulum", "Yazılım / Uygulama", "Garanti", "Basın", "Diğer"], name: "İsim", email: "E-posta", order: "Sipariş numarası (isteğe bağlı)", body: "Sorunu anlatın. Gönderdikten sonra fotoğraf ekleyebilirsiniz.", send: "Mesajı gönder", received: "Mesaj alındı.", receivedSub: "Bir uzman 1 iş günü içinde yanıtlayacak.", reference: "Referans:", liveChat: "Canlı sohbet", liveChatHours: "Pzt–Cum, 09:00–18:00 PT", emailLabel: "E-posta", phoneLabel: "Telefon" },
  pt: { eyebrow: "Falar com o suporte", title: "Estamos aqui para ajudar.", subPrefix: "A maioria das dúvidas de instalação está em nossa ", subLink: "central de suporte", subSuffix: ". Para o resto, fale conosco abaixo.", topic: "Assunto", topics: ["Problema com pedido", "Instalação", "Firmware / App", "Garantia", "Imprensa", "Outro"], name: "Nome", email: "Email", order: "Número do pedido (opcional)", body: "Descreva o problema. Você pode anexar fotos após enviar.", send: "Enviar mensagem", received: "Mensagem recebida.", receivedSub: "Um especialista responderá em 1 dia útil.", reference: "Protocolo:", liveChat: "Chat ao vivo", liveChatHours: "Seg–Sex, 9h – 18h PT", emailLabel: "Email", phoneLabel: "Telefone" },
  ar: { eyebrow: "تواصل مع الدعم", title: "نحن هنا لمساعدتك.", subPrefix: "تجد إجابات معظم أسئلة التركيب في ", subLink: "مركز الدعم", subSuffix: ". لأي شيء آخر، تواصل معنا أدناه.", topic: "الموضوع", topics: ["مشكلة طلب", "التركيب", "البرنامج الثابت / التطبيق", "الضمان", "الإعلام", "أخرى"], name: "الاسم", email: "البريد الإلكتروني", order: "رقم الطلب (اختياري)", body: "صف المشكلة. يمكن إرفاق الصور بعد الإرسال.", send: "إرسال الرسالة", received: "تم استلام الرسالة.", receivedSub: "سيرد عليك أحد المختصين خلال يوم عمل واحد.", reference: "المرجع:", liveChat: "محادثة مباشرة", liveChatHours: "الإثنين–الجمعة، 9 ص – 6 م بتوقيت المحيط الهادئ", emailLabel: "البريد", phoneLabel: "الهاتف" },
  th: { eyebrow: "ติดต่อฝ่ายสนับสนุน", title: "เราพร้อมช่วยเหลือ", subPrefix: "คำถามการติดตั้งส่วนใหญ่หาคำตอบได้ใน", subLink: "ศูนย์ช่วยเหลือ", subSuffix: " สำหรับเรื่องอื่นๆ ติดต่อด้านล่าง", topic: "หัวข้อ", topics: ["ปัญหาคำสั่งซื้อ", "การติดตั้ง", "เฟิร์มแวร์ / แอป", "การรับประกัน", "สื่อมวลชน", "อื่นๆ"], name: "ชื่อ", email: "อีเมล", order: "เลขที่คำสั่งซื้อ (ไม่จำเป็น)", body: "อธิบายปัญหา สามารถแนบรูปภาพได้หลังส่ง", send: "ส่งข้อความ", received: "ได้รับข้อความแล้ว", receivedSub: "ผู้เชี่ยวชาญจะตอบกลับภายใน 1 วันทำการ", reference: "อ้างอิง:", liveChat: "แชทสด", liveChatHours: "จันทร์-ศุกร์ 9:00-18:00 (PT)", emailLabel: "อีเมล", phoneLabel: "โทรศัพท์" },
  vi: { eyebrow: "Liên hệ hỗ trợ", title: "Chúng tôi ở đây để giúp.", subPrefix: "Hầu hết câu hỏi về lắp đặt có sẵn ở ", subLink: "trung tâm hỗ trợ", subSuffix: ". Cho mọi việc khác, liên hệ bên dưới.", topic: "Chủ đề", topics: ["Vấn đề đơn hàng", "Lắp đặt", "Firmware / App", "Bảo hành", "Báo chí", "Khác"], name: "Tên", email: "Email", order: "Số đơn hàng (tùy chọn)", body: "Mô tả vấn đề. Có thể đính kèm ảnh sau khi gửi.", send: "Gửi tin nhắn", received: "Đã nhận tin nhắn.", receivedSub: "Chuyên viên sẽ phản hồi trong 1 ngày làm việc.", reference: "Mã:", liveChat: "Chat trực tiếp", liveChatHours: "T2–T6, 9h–18h PT", emailLabel: "Email", phoneLabel: "Điện thoại" },
};

export default function ContactPage() {
  const { locale } = useLocale();
  const copy = COPY[locale] ?? COPY.en!;
  const [topic, setTopic] = useState(copy.topics[0]);
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-5xl px-6 pb-24 pt-32 md:pt-40 lg:px-10">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
          {copy.eyebrow}
        </p>
        <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          {copy.title}
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-500 md:text-lg">
          {copy.subPrefix}
          <Link href="/support" className="text-blue-600 hover:text-blue-700">
            {copy.subLink}
          </Link>
          {copy.subSuffix}
        </p>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_320px]">
          {submitted ? (
            <div className="rounded-2xl bg-emerald-50 p-10 text-emerald-900">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-emerald-600">
                <CheckCircle2 className="h-6 w-6" />
              </span>
              <h2 className="mt-5 text-2xl font-bold tracking-tight">
                {copy.received}
              </h2>
              <p className="mt-2 text-sm">
                {copy.receivedSub} {copy.reference}{" "}
                <span className="font-mono">
                  AZ-SUP-{Math.floor(Math.random() * 90000 + 10000)}
                </span>
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-5"
            >
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold tracking-tight text-slate-600">
                  {copy.topic}
                </span>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
                >
                  {copy.topics.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <input
                  required
                  placeholder={copy.name}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
                />
                <input
                  required
                  type="email"
                  placeholder={copy.email}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
                />
              </div>
              <input
                placeholder={copy.order}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
              />
              <textarea
                required
                rows={5}
                placeholder={copy.body}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/15"
              />
              <button
                type="submit"
                className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold tracking-tight text-white shadow-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-md"
              >
                {copy.send}
              </button>
            </form>
          )}

          <aside className="space-y-4">
            <div className="rounded-2xl bg-slate-50 p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
                <MessageCircle className="h-5 w-5" />
              </span>
              <p className="mt-4 text-sm font-semibold tracking-tight text-slate-900">
                {copy.liveChat}
              </p>
              <p className="mt-1 text-xs text-slate-500">{copy.liveChatHours}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
                <Mail className="h-5 w-5" />
              </span>
              <p className="mt-4 text-sm font-semibold tracking-tight text-slate-900">
                {copy.emailLabel}
              </p>
              <a
                href="mailto:support@azdome.com"
                className="mt-1 block text-xs text-blue-600 hover:text-blue-700"
              >
                support@azdome.com
              </a>
            </div>
            <div className="rounded-2xl bg-slate-50 p-6">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
                <Phone className="h-5 w-5" />
              </span>
              <p className="mt-4 text-sm font-semibold tracking-tight text-slate-900">
                {copy.phoneLabel}
              </p>
              <p className="mt-1 text-xs text-slate-500">+1 (415) 555-0148</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
