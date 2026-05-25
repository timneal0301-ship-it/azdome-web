"use client";

import Link from "@/components/ui/Link";
import { ArrowRight, Clock, CheckCircle2 } from "lucide-react";

import { useLocale } from "@/components/LocaleProvider";
import type { Locale } from "@/lib/i18n/dictionaries";

type Step = { n: number; title: string; body: string };
type Copy = {
  eyebrow: string;
  title: string;
  avgTime: string;
  done: string;
  doneNote: string;
  firmwareCta: string;
  steps: Step[];
};

const COPY: Partial<Record<Locale, Copy>> = {
  en: {
    eyebrow: "Installation Guide",
    title: "Install in under 20 minutes.",
    avgTime: "Average install time · 18 minutes",
    done: "Done!",
    doneNote:
      "Need help with parking mode? You'll want the hardwire kit and a slightly longer install. Read the parking mode guide next.",
    firmwareCta: "Update firmware before first use",
    steps: [
      { n: 1, title: "Choose mounting position", body: "Mount the front camera centered just below the rearview mirror — this gives you the widest, least-obstructed view. For rear cameras, mount near the top of the rear windshield, centered." },
      { n: 2, title: "Apply 3M adhesive mount", body: "Clean the glass with the included alcohol wipe, peel the backing off the 3M mount, and press firmly for 30 seconds. Let it cure for 5 minutes before attaching the camera." },
      { n: 3, title: "Route the power cable", body: "Use the included trim removal tool to tuck the Type-C cable along the headliner, down the A-pillar, and under the dashboard. For rear cameras, route along the side trim and under floor mats." },
      { n: 4, title: "Connect & test", body: "Plug the cable into your 12V port (or hardwire kit). Start your car — the camera should boot in under 3 seconds. Format the SD card from the app on first use." },
    ],
  },
  zh: {
    eyebrow: "安装指南",
    title: "20 分钟内完成安装。",
    avgTime: "平均安装时间 · 18 分钟",
    done: "完成!",
    doneNote: "需要停车监控?那要加装降压线套件,稍微多花一点时间。接下来看停车模式指南。",
    firmwareCta: "首次使用前请更新固件",
    steps: [
      { n: 1, title: "选择安装位置", body: "前摄居中安装在后视镜正下方 — 视野最广、遮挡最少。后摄安装在后挡风玻璃顶部居中位置。" },
      { n: 2, title: "贴 3M 支架", body: "用附赠的酒精棉片清洁玻璃,撕下 3M 背胶,用力按压 30 秒。等 5 分钟让胶水固化,再装上摄像头。" },
      { n: 3, title: "走电源线", body: "用附赠的撬棒工具把 Type-C 线沿车顶内衬、A 柱内饰、仪表下方走线。后摄沿侧饰板和地毯下方走线。" },
      { n: 4, title: "连接与测试", body: "把线插入 12V 接口(或降压线套件)。启动车辆 — 摄像头应在 3 秒内开机。首次使用请从 App 格式化 SD 卡。" },
    ],
  },
  ja: {
    eyebrow: "取り付けガイド",
    title: "20 分以内に取り付け完了。",
    avgTime: "平均取り付け時間 · 18 分",
    done: "完了!",
    doneNote: "駐車モードも使いたい?ハードワイヤーキットの追加と少し長めの作業が必要です。次は駐車モードガイドへ。",
    firmwareCta: "初回使用前にファームウェアを更新",
    steps: [
      { n: 1, title: "取り付け位置を選ぶ", body: "フロントカメラはルームミラーの真下中央に取り付け、視界が最も広く障害物が少なくなります。リアカメラは後部ガラス上部の中央へ。" },
      { n: 2, title: "3M マウントを貼る", body: "付属のアルコールクロスでガラスを拭き、3M テープのフィルムを剥がし、30 秒しっかり押し付けます。5 分間圧着してからカメラを装着してください。" },
      { n: 3, title: "電源ケーブルを配線", body: "付属のはがし工具で Type-C ケーブルをルーフライナー → A ピラー → ダッシュボード下と配線。リアカメラはサイドトリムとフロアマット下を通します。" },
      { n: 4, title: "接続とテスト", body: "ケーブルを 12V ソケット(またはハードワイヤーキット)に挿します。エンジンをかけると 3 秒以内にカメラが起動。初回はアプリから SD カードをフォーマットしてください。" },
    ],
  },
  de: {
    eyebrow: "Installationsanleitung",
    title: "In unter 20 Minuten installiert.",
    avgTime: "Durchschnittliche Installationszeit · 18 Minuten",
    done: "Fertig!",
    doneNote:
      "Brauchen Sie Hilfe beim Parkmodus? Dafür benötigen Sie den Festeinbau-Satz und etwas mehr Installationszeit. Lesen Sie als Nächstes den Parkmodus-Leitfaden.",
    firmwareCta: "Firmware vor der ersten Nutzung aktualisieren",
    steps: [
      { n: 1, title: "Montageposition wählen", body: "Front-Kamera mittig direkt unter dem Rückspiegel montieren — beste Sicht ohne Verdeckung. Heck-Kameras am oberen Rand der Heckscheibe mittig anbringen." },
      { n: 2, title: "3M-Halterung anbringen", body: "Glas mit dem mitgelieferten Alkoholtuch reinigen, Schutzfolie vom 3M-Mount abziehen, 30 Sekunden fest andrücken. 5 Minuten aushärten lassen, bevor die Kamera angebracht wird." },
      { n: 3, title: "Stromkabel verlegen", body: "Mit dem mitgelieferten Verkleidungswerkzeug das Type-C-Kabel entlang Dachhimmel, A-Säule und unter dem Armaturenbrett verlegen. Heck-Kameras entlang Seitenverkleidung und unter Fußmatten." },
      { n: 4, title: "Anschließen & testen", body: "Kabel in 12V-Buchse (oder Festeinbau-Satz) stecken. Auto starten — die Kamera sollte in unter 3 Sekunden hochfahren. SD-Karte beim ersten Mal über die App formatieren." },
    ],
  },
  fr: {
    eyebrow: "Guide d'installation",
    title: "Installation en moins de 20 minutes.",
    avgTime: "Temps moyen d'installation · 18 minutes",
    done: "Terminé !",
    doneNote:
      "Besoin d'aide pour le mode parking ? Vous voudrez le kit d'alimentation et un peu plus de temps. Consultez ensuite le guide du mode parking.",
    firmwareCta: "Mettre à jour le firmware avant la première utilisation",
    steps: [
      { n: 1, title: "Choisir la position de montage", body: "Montez la caméra avant centrée juste sous le rétroviseur — pour une vue la plus large et dégagée possible. Pour la caméra arrière, montez en haut au centre de la lunette arrière." },
      { n: 2, title: "Appliquer le support adhésif 3M", body: "Nettoyez le verre avec la lingette alcoolisée fournie, retirez le film du 3M et appuyez fermement 30 secondes. Laissez sécher 5 minutes avant de fixer la caméra." },
      { n: 3, title: "Faire passer le câble", body: "Utilisez l'outil de démontage fourni pour glisser le câble Type-C le long du plafond, de la colonne A et sous le tableau de bord. Pour l'arrière, passez par la garniture latérale et sous les tapis." },
      { n: 4, title: "Brancher et tester", body: "Branchez le câble sur la prise 12V (ou le kit d'alimentation). Démarrez la voiture — la caméra doit démarrer en moins de 3 secondes. Formatez la carte SD depuis l'application à la première utilisation." },
    ],
  },
  es: {
    eyebrow: "Guía de instalación",
    title: "Instalación en menos de 20 minutos.",
    avgTime: "Tiempo medio de instalación · 18 minutos",
    done: "¡Listo!",
    doneNote:
      "¿Necesitas ayuda con el modo aparcamiento? Te hará falta el kit de alimentación directa y un poco más de tiempo. Lee a continuación la guía del modo aparcamiento.",
    firmwareCta: "Actualiza el firmware antes del primer uso",
    steps: [
      { n: 1, title: "Elige la posición de montaje", body: "Monta la cámara frontal centrada justo debajo del retrovisor — para la vista más amplia y sin obstrucciones. Para la trasera, en la parte alta del cristal trasero, centrada." },
      { n: 2, title: "Pega el soporte adhesivo 3M", body: "Limpia el cristal con la toallita alcohólica incluida, retira el film del 3M y presiona firme 30 segundos. Deja curar 5 minutos antes de poner la cámara." },
      { n: 3, title: "Pasa el cable de alimentación", body: "Usa la herramienta incluida para meter el cable Type-C por el techo, la columna A y bajo el salpicadero. La cámara trasera por la moldura lateral y debajo de las alfombrillas." },
      { n: 4, title: "Conecta y prueba", body: "Conecta el cable a la toma 12V (o al kit de alimentación). Arranca el coche — la cámara debe encender en menos de 3 segundos. Formatea la tarjeta SD desde la app la primera vez." },
    ],
  },
  it: {
    eyebrow: "Guida all'installazione",
    title: "Installazione in meno di 20 minuti.",
    avgTime: "Tempo medio di installazione · 18 minuti",
    done: "Fatto!",
    doneNote:
      "Servono aiuto con la modalità parcheggio? Ti serve il kit di alimentazione fissa e un po' più di tempo. Leggi la guida alla modalità parcheggio.",
    firmwareCta: "Aggiorna il firmware prima del primo utilizzo",
    steps: [
      { n: 1, title: "Scegli la posizione di montaggio", body: "Monta la telecamera anteriore centrata sotto lo specchietto retrovisore — vista più ampia e meno ostruita. Per la posteriore, in alto al centro del lunotto." },
      { n: 2, title: "Applica il supporto adesivo 3M", body: "Pulisci il vetro con la salvietta alcolica inclusa, stacca la pellicola dal 3M e premi forte per 30 secondi. Lascia maturare 5 minuti prima di montare la telecamera." },
      { n: 3, title: "Fai passare il cavo", body: "Usa lo strumento incluso per far passare il cavo Type-C lungo il cielo, il montante A e sotto il cruscotto. Per la posteriore, lungo le rifiniture laterali e sotto i tappetini." },
      { n: 4, title: "Collega e testa", body: "Collega il cavo alla presa 12V (o al kit di alimentazione fissa). Avvia l'auto — la telecamera deve partire in meno di 3 secondi. Al primo utilizzo formatta la SD dall'app." },
    ],
  },
  ru: {
    eyebrow: "Руководство по установке",
    title: "Установка менее чем за 20 минут.",
    avgTime: "Среднее время установки · 18 минут",
    done: "Готово!",
    doneNote:
      "Нужна помощь с парковочным режимом? Понадобится hardwire-комплект и немного больше времени. Дальше — руководство по парковочному режиму.",
    firmwareCta: "Обновите прошивку перед первым использованием",
    steps: [
      { n: 1, title: "Выберите место крепления", body: "Переднюю камеру установите по центру под зеркалом заднего вида — самый широкий обзор без помех. Заднюю — наверху по центру заднего стекла." },
      { n: 2, title: "Приклейте 3M-крепление", body: "Протрите стекло прилагаемой спиртовой салфеткой, снимите защитную плёнку с 3M и плотно прижмите на 30 секунд. Подождите 5 минут перед установкой камеры." },
      { n: 3, title: "Проложите кабель питания", body: "С помощью прилагаемого инструмента уложите Type-C-кабель вдоль потолочной обшивки, по стойке A и под приборной панелью. Заднюю — по боковой обшивке и под ковриками." },
      { n: 4, title: "Подключите и проверьте", body: "Подключите кабель в гнездо 12V (или к hardwire-комплекту). Запустите машину — камера включится менее чем за 3 секунды. При первом запуске отформатируйте SD-карту в приложении." },
    ],
  },
  pl: {
    eyebrow: "Instrukcja montażu",
    title: "Instalacja w mniej niż 20 minut.",
    avgTime: "Średni czas instalacji · 18 minut",
    done: "Gotowe!",
    doneNote:
      "Potrzebujesz pomocy z trybem parkowania? Będziesz potrzebować zestawu hardwire i trochę więcej czasu. Następnie zajrzyj do przewodnika trybu parkowania.",
    firmwareCta: "Zaktualizuj firmware przed pierwszym użyciem",
    steps: [
      { n: 1, title: "Wybierz miejsce montażu", body: "Kamerę przednią umieść centralnie tuż pod lusterkiem — najszerszy widok bez przeszkód. Tylną — u góry pośrodku tylnej szyby." },
      { n: 2, title: "Naklej uchwyt 3M", body: "Wyczyść szybę dołączoną chusteczką alkoholową, zdejmij folię z taśmy 3M i dociśnij mocno przez 30 sekund. Odczekaj 5 minut przed zamontowaniem kamery." },
      { n: 3, title: "Poprowadź kabel zasilania", body: "Dołączonym narzędziem schowaj kabel Type-C wzdłuż podsufitki, słupka A i pod kokpitem. Kamerę tylną prowadź wzdłuż listew bocznych i pod dywanikami." },
      { n: 4, title: "Podłącz i przetestuj", body: "Wepnij kabel w gniazdo 12V (lub w zestaw hardwire). Uruchom auto — kamera ruszy w mniej niż 3 sekundy. Przy pierwszym użyciu sformatuj kartę SD w aplikacji." },
    ],
  },
  ro: {
    eyebrow: "Ghid de instalare",
    title: "Instalare în mai puțin de 20 de minute.",
    avgTime: "Timp mediu de instalare · 18 minute",
    done: "Gata!",
    doneNote:
      "Ai nevoie de modul parcare? Îți trebuie kit-ul hardwire și puțin mai mult timp. Citește în continuare ghidul modului parcare.",
    firmwareCta: "Actualizează firmware-ul înainte de prima utilizare",
    steps: [
      { n: 1, title: "Alege poziția de montaj", body: "Montează camera față centrat, sub oglinda retrovizoare — vedere amplă, fără obstrucții. Camera spate, sus, centrat pe luneta spate." },
      { n: 2, title: "Aplică suportul 3M", body: "Curăță geamul cu șervețelul cu alcool inclus, scoate folia de pe banda 3M și apasă ferm 30 de secunde. Lasă 5 minute să se fixeze înainte de a monta camera." },
      { n: 3, title: "Trece cablul de alimentare", body: "Cu unealta inclusă, treci cablul Type-C de-a lungul plafonului, montantului A și sub bord. Pentru spate, pe lângă ornamentele laterale și sub covorașe." },
      { n: 4, title: "Conectează și testează", body: "Conectează cablul la priza 12V (sau la kit-ul hardwire). Pornește mașina — camera ar trebui să pornească în mai puțin de 3 secunde. La prima utilizare formatează cardul SD din aplicație." },
    ],
  },
  tr: {
    eyebrow: "Kurulum Kılavuzu",
    title: "20 dakikadan kısa sürede kurulum.",
    avgTime: "Ortalama kurulum süresi · 18 dakika",
    done: "Tamam!",
    doneNote:
      "Park modu için yardım mı? Hardwire kit gerekecek ve birazcık daha uzun kurulum. Sırada park modu kılavuzu var.",
    firmwareCta: "İlk kullanım önce yazılımı güncelleyin",
    steps: [
      { n: 1, title: "Montaj konumunu seçin", body: "Ön kamerayı dikiz aynasının hemen altına ortalı şekilde monte edin — en geniş ve engelsiz görüş. Arka kamera için arka camın üst ortasına monte edin." },
      { n: 2, title: "3M tutucuyu yapıştırın", body: "Camı gelen alkol mendiliyle silin, 3M'in arka filmini soyun ve 30 saniye sıkıca bastırın. Kamerayı takmadan önce 5 dakika beklesin." },
      { n: 3, title: "Güç kablosunu döşeyin", body: "Gelen aletle Type-C kabloyu tavan döşemesi, A direği ve gösterge altından geçirin. Arka kamera için yan döşeme ve paspas altından geçirin." },
      { n: 4, title: "Bağlayın ve test edin", body: "Kabloyu 12V soketine (veya hardwire kit'ine) takın. Aracı çalıştırın — kamera 3 saniyeden kısa sürede açılmalı. İlk kullanımda SD kartı uygulamadan biçimlendirin." },
    ],
  },
  pt: {
    eyebrow: "Guia de instalação",
    title: "Instale em menos de 20 minutos.",
    avgTime: "Tempo médio de instalação · 18 minutos",
    done: "Pronto!",
    doneNote:
      "Precisa de ajuda com o modo estacionamento? Vai precisar do kit hardwire e um pouco mais de tempo. Em seguida, leia o guia do modo estacionamento.",
    firmwareCta: "Atualize o firmware antes do primeiro uso",
    steps: [
      { n: 1, title: "Escolha a posição de montagem", body: "Monte a câmera frontal centralizada logo abaixo do retrovisor — vista mais ampla e sem obstruções. A traseira no topo central da janela traseira." },
      { n: 2, title: "Cole o suporte adesivo 3M", body: "Limpe o vidro com o lenço alcoólico incluso, retire o filme do 3M e pressione firme por 30 segundos. Deixe curar 5 minutos antes de fixar a câmera." },
      { n: 3, title: "Passe o cabo de alimentação", body: "Com a ferramenta inclusa, passe o cabo Type-C pelo teto, coluna A e sob o painel. Para a traseira, pela moldura lateral e sob os tapetes." },
      { n: 4, title: "Conecte e teste", body: "Ligue o cabo na tomada 12V (ou no kit hardwire). Dê partida no carro — a câmera deve ligar em menos de 3 segundos. Na primeira vez, formate o cartão SD pelo app." },
    ],
  },
  ar: {
    eyebrow: "دليل التركيب",
    title: "تركيب في أقل من 20 دقيقة.",
    avgTime: "متوسط وقت التركيب · 18 دقيقة",
    done: "تم!",
    doneNote:
      "تحتاج إلى مساعدة في وضع الوقوف؟ ستحتاج إلى عُدّة التوصيل المباشر ومزيد من الوقت. تابع مع دليل وضع الوقوف.",
    firmwareCta: "حدّث البرنامج الثابت قبل أول استخدام",
    steps: [
      { n: 1, title: "اختر موضع التركيب", body: "ركّب الكاميرا الأمامية في الوسط أسفل المرآة الأمامية مباشرة — أوسع مجال رؤية وأقل عوائق. للكاميرا الخلفية، ركّبها أعلى وسط الزجاج الخلفي." },
      { n: 2, title: "ثبّت حامل 3M", body: "نظّف الزجاج بالمنديل الكحولي المرفق، انزع الفيلم عن لاصق 3M، واضغط بقوة لمدة 30 ثانية. اترك اللاصق يجف 5 دقائق قبل تركيب الكاميرا." },
      { n: 3, title: "مرّر كابل الطاقة", body: "باستخدام أداة فك التجهيزات المرفقة، مرّر كابل Type-C على طول السقف، عمود A، وأسفل لوحة العدادات. للكاميرا الخلفية على طول التجهيزات الجانبية وتحت السجاد." },
      { n: 4, title: "وصّل واختبر", body: "وصّل الكابل بمنفذ 12V (أو بعُدّة التوصيل المباشر). شغّل السيارة — يجب أن تعمل الكاميرا خلال أقل من 3 ثوانٍ. عند الاستخدام لأول مرة، هيّئ البطاقة من التطبيق." },
    ],
  },
  th: {
    eyebrow: "คู่มือการติดตั้ง",
    title: "ติดตั้งภายใน 20 นาที",
    avgTime: "เวลาติดตั้งเฉลี่ย · 18 นาที",
    done: "เสร็จแล้ว!",
    doneNote:
      "ต้องการใช้โหมดจอด? คุณต้องเพิ่มชุดสายตรงและใช้เวลาติดตั้งเพิ่มอีกเล็กน้อย จากนั้นอ่านคู่มือโหมดจอดต่อ",
    firmwareCta: "อัปเดตเฟิร์มแวร์ก่อนใช้งานครั้งแรก",
    steps: [
      { n: 1, title: "เลือกตำแหน่งติดตั้ง", body: "ติดกล้องหน้าตรงกลางใต้กระจกมองหลังพอดี — จะได้มุมกว้างที่สุดและบดบังน้อยที่สุด สำหรับกล้องหลังให้ติดด้านบนตรงกลางของกระจกหลัง" },
      { n: 2, title: "ติดแผ่นยึด 3M", body: "เช็ดกระจกด้วยทิชชู่แอลกอฮอล์ที่ให้มา ลอกฟิล์มออกจากแผ่น 3M แล้วกดให้แน่น 30 วินาที ทิ้งไว้ 5 นาทีก่อนติดกล้อง" },
      { n: 3, title: "เดินสายไฟ", body: "ใช้ที่งัดคิ้วที่ให้มา ซ่อนสาย Type-C ตามแนวเพดาน เสา A และใต้แดชบอร์ด สำหรับกล้องหลังให้เดินตามคิ้วข้างและใต้พรม" },
      { n: 4, title: "เชื่อมต่อและทดสอบ", body: "เสียบสายเข้าช่อง 12V (หรือชุดสายตรง) สตาร์ทรถ — กล้องจะติดภายใน 3 วินาที การใช้งานครั้งแรกให้ฟอร์แมตการ์ด SD จากแอป" },
    ],
  },
  vi: {
    eyebrow: "Hướng dẫn lắp đặt",
    title: "Lắp đặt dưới 20 phút.",
    avgTime: "Thời gian lắp trung bình · 18 phút",
    done: "Xong!",
    doneNote:
      "Cần dùng chế độ đậu xe? Bạn sẽ cần bộ đấu nối điện và thêm chút thời gian. Tiếp theo đọc hướng dẫn chế độ đậu xe.",
    firmwareCta: "Cập nhật firmware trước lần dùng đầu",
    steps: [
      { n: 1, title: "Chọn vị trí lắp", body: "Lắp camera trước chính giữa, ngay dưới gương chiếu hậu — góc rộng nhất, ít bị che. Camera sau gắn ở trên cùng giữa kính sau." },
      { n: 2, title: "Dán đế 3M", body: "Lau kính bằng khăn cồn kèm theo, bóc keo 3M, ấn mạnh 30 giây. Để keo cứng lại 5 phút trước khi gắn camera." },
      { n: 3, title: "Đi dây nguồn", body: "Dùng dụng cụ tháo ốp kèm theo, đi dây Type-C dọc trần xe, cột A và dưới táp-lô. Camera sau đi dọc ốp bên và dưới thảm sàn." },
      { n: 4, title: "Cắm và kiểm tra", body: "Cắm dây vào cổng 12V (hoặc bộ đấu nối điện). Nổ máy — camera sẽ khởi động trong dưới 3 giây. Lần đầu dùng hãy format thẻ SD từ app." },
    ],
  },
};

export default function InstallPage() {
  const { locale } = useLocale();
  const copy = COPY[locale] ?? COPY.en!;

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-3xl px-6 pb-24 pt-32 md:pt-40 lg:px-10">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
          {copy.eyebrow}
        </p>
        <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          {copy.title}
        </h1>
        <p className="mt-5 inline-flex items-center gap-1.5 text-sm text-slate-500">
          <Clock className="h-4 w-4" />
          {copy.avgTime}
        </p>

        <ol className="mt-14 space-y-10">
          {copy.steps.map((s) => (
            <li key={s.n} className="flex gap-5">
              <span className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-base font-bold text-white">
                {s.n}
              </span>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-slate-900 md:text-2xl">
                  {s.title}
                </h2>
                <p className="mt-2 text-base leading-relaxed text-slate-600">
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div className="mt-16 rounded-2xl bg-slate-50 p-7">
          <p className="inline-flex items-center gap-1.5 text-sm font-semibold tracking-tight text-emerald-700">
            <CheckCircle2 className="h-4 w-4" />
            {copy.done}
          </p>
          <p className="mt-2 text-sm text-slate-600">{copy.doneNote}</p>
          <Link
            href="/support/firmware"
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            {copy.firmwareCta}
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </main>
  );
}
