"use client";

import Image from "@/components/ui/HQImage";
import Link from "next/link";
import {
  ArrowRight,
  Eye,
  Globe2,
  Leaf,
  Microscope,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import AnimatedCounter from "@/components/ui/AnimatedCounter";
import CertBadges from "@/components/CertBadges";
import { useLocale } from "@/components/LocaleProvider";
import type { AboutContent } from "@/lib/content/about";
import type { Locale } from "@/lib/i18n/dictionaries";

const ICONS: Record<string, LucideIcon> = {
  Eye, Sparkles, Users, Globe2, ShieldCheck, Microscope, Truck, Leaf,
};

type Copy = {
  eyebrow: string;
  title: string;
  sub: string;
  shopCta: string;
  joinCta: string;
  storyEyebrow: string;
  storyTitle: string;
  storyP1: string;
  storyP2: string;
  storyP3: string;
  timelineEyebrow: string;
  timelineTitle: string;
  valuesEyebrow: string;
  valuesTitle: string;
  commitmentsEyebrow: string;
  commitmentsTitle: string;
  ctaTitle: string;
  ctaSub: string;
  ctaContact: string;
  ctaPress: string;
};

const COPY: Partial<Record<Locale, Copy>> = {
  en: { eyebrow: "About AZDOME", title: "Cameras for the moments you can't replay.", sub: "Since 2014, we've built dash cams that quietly do their job — until the moment you need them. Today, more than 200,000 drivers across 60+ countries rely on AZDOME on every drive.", shopCta: "Shop dash cams", joinCta: "Join the team", storyEyebrow: "Our story", storyTitle: "We started because a camera failed when it mattered most.", storyP1: "In 2013, one of our co-founders was rear-ended at a stoplight in Shenzhen. The dash cam in his car — a name brand at the time — recorded only a smear of light and a blurred license plate. The insurance dispute that followed took eleven months.", storyP2: "He went back to work the next Monday convinced that the entire category was building cameras for spec sheets, not for the one-in-ten-thousand drive where the recording would actually be needed. AZDOME was founded eight months later by a team of three image-sensor engineers and one optics specialist, with a single constraint: every product had to perform under conditions a spec sheet doesn't test for — heat, vibration, voltage drops, low light, and the long-tail of edge cases that real drivers actually encounter.", storyP3: "Twelve years later, we're a team of 84 people across Shenzhen, San Francisco, and Dublin, shipping cameras to 60+ countries. The constraint hasn't changed.", timelineEyebrow: "Timeline", timelineTitle: "Twelve years, one constraint.", valuesEyebrow: "How we build", valuesTitle: "Four principles, every product.", commitmentsEyebrow: "Our commitments", commitmentsTitle: "Things we won't cut corners on.", ctaTitle: "Questions, press inquiries, or want to partner?", ctaSub: "We read every message. Average reply time is under one business day.", ctaContact: "Contact us", ctaPress: "Press inquiries" },
  zh: { eyebrow: "关于 AZDOME", title: "为那些无法重放的瞬间而生的摄像头。", sub: "自 2014 年起,我们一直在打造默默工作的行车记录仪 — 直到你需要它的那一刻。今天,超过 60 个国家的 20 万+ 车主信赖 AZDOME。", shopCta: "选购行车记录仪", joinCta: "加入团队", storyEyebrow: "我们的故事", storyTitle: "我们因为一次关键时刻的摄像头失灵而开始。", storyP1: "2013 年,我们的一位联合创始人在深圳红灯路口被追尾。当时车里那台知名品牌的行车记录仪只录到一片模糊的光和看不清的车牌。随之而来的保险纠纷花了 11 个月。", storyP2: "下周一回到工作岗位,他确信整个行业都在为参数表造摄像头,而不是为那万分之一真正需要录像的瞬间。八个月后,AZDOME 由三位图像传感器工程师和一位光学专家联合创立,一条原则:每个产品都必须在参数表无法测试的条件下表现良好 — 高温、震动、电压波动、低光,以及真实驾驶中那些边缘场景。", storyP3: "十二年后,我们是一支 84 人的团队,分布在深圳、旧金山和都柏林,产品销往 60+ 国家。这条原则从未改变。", timelineEyebrow: "时间线", timelineTitle: "十二年,一条原则。", valuesEyebrow: "我们的工作方式", valuesTitle: "四条原则,贯穿每一个产品。", commitmentsEyebrow: "我们的承诺", commitmentsTitle: "我们绝不省钱的地方。", ctaTitle: "有问题、媒体询问,或想合作?", ctaSub: "我们认真阅读每条消息。平均回复时间不到 1 个工作日。", ctaContact: "联系我们", ctaPress: "媒体询问" },
  ja: { eyebrow: "AZDOME について", title: "やり直せない瞬間のためのカメラ。", sub: "2014 年以来、必要なその瞬間まで静かに役目を果たすドライブレコーダーを作ってきました。今日では 60 以上の国の 20 万人以上のドライバーが、毎ドライブで AZDOME に頼っています。", shopCta: "ドラレコを見る", joinCta: "採用情報", storyEyebrow: "私たちのストーリー", storyTitle: "肝心なときにカメラが役立たなかった経験から始まりました。", storyP1: "2013 年、共同創業者の一人が深圳の信号待ちで追突されました。当時の車に付いていた有名ブランドのドラレコは、光のにじみと判読不能なナンバーしか映していませんでした。その後の保険交渉は 11 か月続きました。", storyP2: "翌月曜に出社した彼は、業界全体が「カタログのため」のカメラを作っており、本当に必要となる一万分の一の瞬間のためには作っていないと確信しました。8 か月後、AZDOME は 3 人のイメージセンサーエンジニアと 1 人の光学スペシャリストにより創業。仕様書ではテストできない条件 — 熱、振動、電圧降下、低照度、実ドライバーが遭遇するエッジケース — でも動くこと、というたった一つの制約を掲げました。", storyP3: "12 年経った今、深圳・サンフランシスコ・ダブリンの 84 人体制で 60 以上の国にカメラを届けています。制約は変わりません。", timelineEyebrow: "沿革", timelineTitle: "12 年、一つの制約。", valuesEyebrow: "ものづくりの姿勢", valuesTitle: "あらゆる製品に貫く 4 つの原則。", commitmentsEyebrow: "私たちの約束", commitmentsTitle: "妥協しないこと。", ctaTitle: "ご質問・取材・パートナーシップは?", ctaSub: "すべてのメッセージを読んでいます。平均応答時間は 1 営業日以内。", ctaContact: "お問い合わせ", ctaPress: "取材のご依頼" },
  de: { eyebrow: "Über AZDOME", title: "Kameras für die Momente, die man nicht wiederholen kann.", sub: "Seit 2014 bauen wir Dashcams, die unauffällig ihre Arbeit tun — bis zu dem Moment, in dem Sie sie brauchen. Heute verlassen sich über 200.000 Fahrer in 60+ Ländern auf AZDOME bei jeder Fahrt.", shopCta: "Dashcams entdecken", joinCta: "Team beitreten", storyEyebrow: "Unsere Geschichte", storyTitle: "Wir haben angefangen, weil eine Kamera versagte, als es darauf ankam.", storyP1: "2013 wurde einer unserer Mitgründer in Shenzhen an einer Ampel hinten aufgefahren. Die Dashcam in seinem Auto — damals eine bekannte Marke — zeichnete nur einen Lichtwisch und ein unscharfes Nummernschild auf. Der folgende Versicherungsstreit dauerte elf Monate.", storyP2: "Am Montag darauf war er überzeugt, dass die ganze Branche Kameras für Datenblätter baut, nicht für die eine Fahrt unter zehntausend, bei der die Aufnahme wirklich gebraucht wird. AZDOME wurde acht Monate später von drei Bildsensor-Ingenieuren und einem Optik-Spezialisten gegründet — mit einer einzigen Vorgabe: Jedes Produkt musste unter Bedingungen funktionieren, die ein Datenblatt nicht testet — Hitze, Vibration, Spannungseinbrüche, schwaches Licht, und der lange Schwanz von Sonderfällen, die echte Fahrer erleben.", storyP3: "Zwölf Jahre später sind wir ein Team von 84 Menschen in Shenzhen, San Francisco und Dublin und liefern Kameras in 60+ Länder. Die Vorgabe hat sich nicht geändert.", timelineEyebrow: "Zeitstrahl", timelineTitle: "Zwölf Jahre, eine Vorgabe.", valuesEyebrow: "So bauen wir", valuesTitle: "Vier Prinzipien, jedes Produkt.", commitmentsEyebrow: "Unsere Verpflichtungen", commitmentsTitle: "Dinge, bei denen wir keine Abkürzungen nehmen.", ctaTitle: "Fragen, Presseanfragen oder Partnerschaft?", ctaSub: "Wir lesen jede Nachricht. Durchschnittliche Antwortzeit unter einem Werktag.", ctaContact: "Kontakt aufnehmen", ctaPress: "Presseanfragen" },
  fr: { eyebrow: "À propos d'AZDOME", title: "Des caméras pour les moments qu'on ne peut pas rejouer.", sub: "Depuis 2014, nous fabriquons des dashcams qui font discrètement leur travail — jusqu'au moment où vous en avez besoin. Aujourd'hui, plus de 200 000 conducteurs dans 60+ pays comptent sur AZDOME à chaque trajet.", shopCta: "Voir les dashcams", joinCta: "Rejoindre l'équipe", storyEyebrow: "Notre histoire", storyTitle: "Tout a commencé parce qu'une caméra a failli quand ça comptait le plus.", storyP1: "En 2013, l'un de nos cofondateurs a été percuté à l'arrière à un feu rouge à Shenzhen. La dashcam de sa voiture — une marque connue à l'époque — n'a enregistré qu'une bavure de lumière et une plaque floue. Le litige d'assurance qui a suivi a duré onze mois.", storyP2: "Le lundi suivant, il était convaincu que toute la catégorie construisait des caméras pour les fiches techniques, pas pour le trajet sur dix mille où l'enregistrement compte vraiment. AZDOME a été fondé huit mois plus tard par trois ingénieurs en capteurs d'image et un spécialiste optique, avec une seule contrainte : chaque produit devait fonctionner dans des conditions qu'une fiche technique ne teste pas — chaleur, vibrations, chutes de tension, faible luminosité et tous les cas limites que rencontrent les vrais conducteurs.", storyP3: "Douze ans plus tard, nous sommes 84 personnes à Shenzhen, San Francisco et Dublin, expédiant nos caméras dans 60+ pays. La contrainte n'a pas changé.", timelineEyebrow: "Chronologie", timelineTitle: "Douze ans, une contrainte.", valuesEyebrow: "Notre méthode", valuesTitle: "Quatre principes, chaque produit.", commitmentsEyebrow: "Nos engagements", commitmentsTitle: "Les choses sur lesquelles nous ne ferons pas de compromis.", ctaTitle: "Questions, demandes presse ou envie de partenariat ?", ctaSub: "Nous lisons chaque message. Délai moyen de réponse sous un jour ouvré.", ctaContact: "Nous contacter", ctaPress: "Demandes presse" },
  es: { eyebrow: "Sobre AZDOME", title: "Cámaras para los momentos que no se pueden repetir.", sub: "Desde 2014 construimos dash cams que hacen su trabajo en silencio — hasta el momento en que las necesitas. Hoy, más de 200.000 conductores en 60+ países confían en AZDOME en cada viaje.", shopCta: "Ver dash cams", joinCta: "Únete al equipo", storyEyebrow: "Nuestra historia", storyTitle: "Empezamos porque una cámara falló cuando más importaba.", storyP1: "En 2013, uno de nuestros cofundadores fue alcanzado por detrás en un semáforo de Shenzhen. La dashcam de su coche — una marca conocida en su momento — solo grabó una mancha de luz y una matrícula borrosa. La disputa de seguros que siguió duró once meses.", storyP2: "El lunes siguiente volvió al trabajo convencido de que toda la categoría fabricaba cámaras para fichas técnicas, no para el viaje uno-entre-diez-mil en el que la grabación importa de verdad. AZDOME se fundó ocho meses después por tres ingenieros de sensor de imagen y un especialista en óptica, con una sola condición: cada producto debía rendir en condiciones que una ficha técnica no prueba — calor, vibración, caídas de tensión, baja luz y la cola larga de casos extremos que los conductores reales encuentran.", storyP3: "Doce años después, somos un equipo de 84 personas en Shenzhen, San Francisco y Dublín, enviando cámaras a 60+ países. La condición no ha cambiado.", timelineEyebrow: "Cronología", timelineTitle: "Doce años, una condición.", valuesEyebrow: "Cómo construimos", valuesTitle: "Cuatro principios, cada producto.", commitmentsEyebrow: "Nuestros compromisos", commitmentsTitle: "Cosas en las que no recortamos.", ctaTitle: "¿Preguntas, prensa o quieres colaborar?", ctaSub: "Leemos cada mensaje. Tiempo medio de respuesta inferior a un día laborable.", ctaContact: "Contáctanos", ctaPress: "Prensa" },
  it: { eyebrow: "Chi è AZDOME", title: "Telecamere per i momenti che non puoi rivedere.", sub: "Dal 2014 costruiamo dash cam che fanno silenziosamente il loro lavoro — fino al momento in cui ti servono. Oggi più di 200.000 conducenti in 60+ paesi si affidano ad AZDOME a ogni viaggio.", shopCta: "Vedi le dash cam", joinCta: "Unisciti al team", storyEyebrow: "La nostra storia", storyTitle: "Abbiamo iniziato perché una telecamera ha fallito quando contava di più.", storyP1: "Nel 2013 uno dei cofondatori è stato tamponato a un semaforo a Shenzhen. La dash cam del suo veicolo — un brand noto all'epoca — ha registrato solo una scia di luce e una targa sfocata. La disputa assicurativa che ne è seguita è durata undici mesi.", storyP2: "Il lunedì successivo era convinto che l'intera categoria costruisse telecamere per le schede tecniche, non per quel viaggio su diecimila in cui la registrazione conta davvero. AZDOME è nata otto mesi dopo, fondata da tre ingegneri di sensori d'immagine e uno specialista di ottica, con un solo vincolo: ogni prodotto doveva funzionare nelle condizioni che una scheda tecnica non testa — caldo, vibrazioni, cali di tensione, luce scarsa e i mille casi limite che i veri conducenti incontrano.", storyP3: "Dodici anni dopo, siamo 84 persone tra Shenzhen, San Francisco e Dublino e spediamo telecamere in 60+ paesi. Il vincolo non è cambiato.", timelineEyebrow: "Cronologia", timelineTitle: "Dodici anni, un vincolo.", valuesEyebrow: "Come costruiamo", valuesTitle: "Quattro principi, ogni prodotto.", commitmentsEyebrow: "I nostri impegni", commitmentsTitle: "Le cose su cui non scendiamo a compromessi.", ctaTitle: "Domande, stampa o partnership?", ctaSub: "Leggiamo ogni messaggio. Tempo medio di risposta inferiore a un giorno lavorativo.", ctaContact: "Contattaci", ctaPress: "Richieste stampa" },
  ru: { eyebrow: "О AZDOME", title: "Камеры для моментов, которые нельзя переснять.", sub: "С 2014 года мы делаем видеорегистраторы, которые тихо работают — пока не понадобятся. Сегодня более 200 000 водителей в 60+ странах полагаются на AZDOME в каждой поездке.", shopCta: "Купить регистратор", joinCta: "Присоединиться к команде", storyEyebrow: "Наша история", storyTitle: "Мы начали потому, что камера подвела в самый важный момент.", storyP1: "В 2013 году одного из наших со-основателей ударили сзади на светофоре в Шэньчжэне. Регистратор в его машине — известный бренд того времени — записал лишь пятно света и размытый номер. Спор со страховой тянулся одиннадцать месяцев.", storyP2: "В следующий понедельник он был уверен, что вся отрасль делает камеры под параметры, а не под ту одну поездку из десяти тысяч, где запись действительно нужна. Через восемь месяцев AZDOME была основана тремя инженерами по сенсорам и одним специалистом по оптике с одним принципом: каждый продукт должен работать в условиях, которых нет в спецификации — жара, вибрации, перепады напряжения, низкая освещённость и редкие сценарии, с которыми сталкиваются реальные водители.", storyP3: "Двенадцать лет спустя нас 84 человека в Шэньчжэне, Сан-Франциско и Дублине, мы поставляем камеры в 60+ стран. Принцип не изменился.", timelineEyebrow: "История", timelineTitle: "Двенадцать лет, один принцип.", valuesEyebrow: "Как мы строим", valuesTitle: "Четыре принципа, в каждом продукте.", commitmentsEyebrow: "Наши обязательства", commitmentsTitle: "То, где мы не экономим.", ctaTitle: "Вопросы, пресс-запросы, партнёрство?", ctaSub: "Мы читаем каждое сообщение. Среднее время ответа — менее одного рабочего дня.", ctaContact: "Связаться", ctaPress: "Пресс-запросы" },
  pl: { eyebrow: "O AZDOME", title: "Kamery na chwile, których nie da się powtórzyć.", sub: "Od 2014 budujemy wideorejestratory, które po cichu wykonują swoją pracę — aż do momentu, gdy są potrzebne. Dziś ponad 200 000 kierowców w 60+ krajach ufa AZDOME na każdej trasie.", shopCta: "Zobacz rejestratory", joinCta: "Dołącz do zespołu", storyEyebrow: "Nasza historia", storyTitle: "Zaczęliśmy, bo kamera zawiodła w najważniejszym momencie.", storyP1: "W 2013 jednego z założycieli uderzono w tył na światłach w Shenzhen. Rejestrator znanej marki tylko rozmazał światło i zatarł tablicę. Spór z ubezpieczycielem trwał jedenaście miesięcy.", storyP2: "W poniedziałek był pewien, że cała branża buduje kamery pod kartę katalogową, a nie pod tę jedną na dziesięć tysięcy podróży, w której nagranie naprawdę się liczy. Osiem miesięcy później AZDOME powstała — trzech inżynierów matryc i jeden specjalista optyki, z jedną zasadą: każdy produkt ma działać w warunkach, których karta katalogowa nie testuje — upał, drgania, spadki napięcia, słabe światło i ogon przypadków brzegowych prawdziwego życia.", storyP3: "Dwanaście lat później jesteśmy zespołem 84 osób w Shenzhen, San Francisco i Dublinie, wysyłając kamery do 60+ krajów. Zasada się nie zmieniła.", timelineEyebrow: "Oś czasu", timelineTitle: "Dwanaście lat, jedna zasada.", valuesEyebrow: "Jak budujemy", valuesTitle: "Cztery zasady, każdy produkt.", commitmentsEyebrow: "Nasze zobowiązania", commitmentsTitle: "Rzeczy, na których nie idziemy na skróty.", ctaTitle: "Pytania, prasa, współpraca?", ctaSub: "Czytamy każdą wiadomość. Średni czas odpowiedzi to mniej niż dzień roboczy.", ctaContact: "Skontaktuj się", ctaPress: "Zapytania prasowe" },
  ro: { eyebrow: "Despre AZDOME", title: "Camere pentru momentele care nu se mai repetă.", sub: "Din 2014 construim camere auto care își fac în liniște treaba — până în clipa în care le ai nevoie. Astăzi, peste 200.000 de șoferi din 60+ țări se bazează pe AZDOME la fiecare drum.", shopCta: "Vezi camerele auto", joinCta: "Alătură-te echipei", storyEyebrow: "Povestea noastră", storyTitle: "Am început pentru că o cameră a cedat când conta cel mai mult.", storyP1: "În 2013, unul dintre cofondatori a fost lovit din spate la un semafor în Shenzhen. Camera auto din mașină — un brand cunoscut atunci — a înregistrat doar o dâră de lumină și o plăcuță neclară. Disputa cu asigurătorul a durat unsprezece luni.", storyP2: "Luni s-a întors la muncă convins că întreaga categorie face camere pentru fișa tehnică, nu pentru drumul de unu-la-zece-mii unde înregistrarea contează cu adevărat. AZDOME a fost fondată opt luni mai târziu de trei ingineri de senzori și un specialist optic, cu o singură condiție: fiecare produs trebuie să funcționeze în condiții pe care fișa tehnică nu le testează — căldură, vibrații, scăderi de tensiune, lumină slabă și șirul de cazuri-limită pe care șoferii reali le întâlnesc.", storyP3: "Doisprezece ani mai târziu, suntem o echipă de 84 de oameni în Shenzhen, San Francisco și Dublin, livrând camere în 60+ țări. Condiția nu s-a schimbat.", timelineEyebrow: "Cronologie", timelineTitle: "Doisprezece ani, o singură condiție.", valuesEyebrow: "Cum construim", valuesTitle: "Patru principii, fiecare produs.", commitmentsEyebrow: "Angajamentele noastre", commitmentsTitle: "Lucrurile la care nu facem rabat.", ctaTitle: "Întrebări, presă sau parteneriat?", ctaSub: "Citim fiecare mesaj. Timp mediu de răspuns sub o zi lucrătoare.", ctaContact: "Contactează-ne", ctaPress: "Solicitări presă" },
  tr: { eyebrow: "AZDOME Hakkında", title: "Tekrar oynatamayacağınız anlar için kameralar.", sub: "2014'ten beri ihtiyacınız olana kadar sessizce işini yapan araç kameraları üretiyoruz. Bugün 60+ ülkede 200.000'den fazla sürücü her sürüşte AZDOME'a güveniyor.", shopCta: "Kameralara göz at", joinCta: "Ekibe katıl", storyEyebrow: "Hikâyemiz", storyTitle: "En önemli anda bir kamera başarısız olduğu için başladık.", storyP1: "2013'te kurucularımızdan biri Shenzhen'de kırmızı ışıkta arkadan vuruldu. Aracındaki kamera — o zamanlar tanınmış bir markaydı — yalnızca bir ışık lekesi ve okunmaz bir plaka kaydetmişti. Ardından gelen sigorta anlaşmazlığı on bir ay sürdü.", storyP2: "Pazartesi işe döndüğünde, tüm sektörün kataloglar için kamera yaptığına, kaydın gerçekten gerekli olduğu o bin-de-bir yolculuk için yapmadığına ikna olmuştu. Sekiz ay sonra AZDOME, üç görüntü sensörü mühendisi ve bir optik uzmanı tarafından tek bir kural ile kuruldu: her ürün, katalogların test etmediği koşullarda — sıcaklık, titreşim, voltaj düşüşleri, düşük ışık ve gerçek sürücülerin yaşadığı uzun-kuyruk durumlar — çalışmak zorunda.", storyP3: "On iki yıl sonra Shenzhen, San Francisco ve Dublin'de 84 kişilik bir ekibiz, 60+ ülkeye kamera gönderiyoruz. Kural değişmedi.", timelineEyebrow: "Zaman çizelgesi", timelineTitle: "On iki yıl, tek kural.", valuesEyebrow: "Nasıl üretiriz", valuesTitle: "Dört ilke, her ürün.", commitmentsEyebrow: "Taahhütlerimiz", commitmentsTitle: "Asla kısmadığımız şeyler.", ctaTitle: "Sorularınız, basın talepleri veya ortaklık mı?", ctaSub: "Her mesajı okuyoruz. Ortalama yanıt süresi bir iş gününden kısa.", ctaContact: "Bize ulaşın", ctaPress: "Basın talepleri" },
  pt: { eyebrow: "Sobre a AZDOME", title: "Câmeras para os momentos que você não pode reviver.", sub: "Desde 2014 construímos câmeras veiculares que fazem seu trabalho em silêncio — até o momento em que você precisa delas. Hoje, mais de 200.000 motoristas em 60+ países confiam na AZDOME a cada viagem.", shopCta: "Ver câmeras", joinCta: "Junte-se à equipe", storyEyebrow: "Nossa história", storyTitle: "Começamos porque uma câmera falhou no momento que mais importava.", storyP1: "Em 2013, um dos nossos cofundadores foi atingido por trás num semáforo em Shenzhen. A câmera do carro — uma marca conhecida na época — só gravou um borrão de luz e uma placa ilegível. A disputa com o seguro durou onze meses.", storyP2: "Na segunda seguinte, ele voltou ao trabalho convencido de que a categoria inteira fazia câmeras para ficha técnica, não para aquela viagem em dez mil em que a gravação realmente importa. Oito meses depois, a AZDOME foi fundada por três engenheiros de sensor de imagem e um especialista em óptica, com uma única restrição: todo produto precisava funcionar em condições que a ficha técnica não testa — calor, vibração, quedas de tensão, pouca luz e a longa cauda de casos extremos que motoristas reais encontram.", storyP3: "Doze anos depois, somos uma equipe de 84 pessoas entre Shenzhen, São Francisco e Dublin, enviando câmeras para 60+ países. A restrição não mudou.", timelineEyebrow: "Linha do tempo", timelineTitle: "Doze anos, uma restrição.", valuesEyebrow: "Como construímos", valuesTitle: "Quatro princípios, cada produto.", commitmentsEyebrow: "Nossos compromissos", commitmentsTitle: "Onde não cortamos custos.", ctaTitle: "Perguntas, imprensa ou parceria?", ctaSub: "Lemos cada mensagem. Tempo médio de resposta menor que um dia útil.", ctaContact: "Fale conosco", ctaPress: "Pedidos de imprensa" },
  ar: { eyebrow: "عن AZDOME", title: "كاميرات للحظات التي لا يمكنك إعادتها.", sub: "منذ 2014 ونحن نصنع كاميرات سيارة تؤدي عملها بهدوء — حتى اللحظة التي تحتاجها فيها. اليوم، أكثر من 200,000 سائق في أكثر من 60 دولة يعتمدون على AZDOME في كل رحلة.", shopCta: "تسوّق كاميرات السيارة", joinCta: "انضم إلى الفريق", storyEyebrow: "قصتنا", storyTitle: "بدأنا لأن كاميرا فشلت في اللحظة الأهم.", storyP1: "في 2013، تعرّض أحد مؤسسينا للارتطام من الخلف عند إشارة في شنزن. الكاميرا التي كانت في سيارته — من علامة معروفة آنذاك — سجّلت فقط بقعة ضوء ولوحة سيارة مشوشة. النزاع مع التأمين استمر أحد عشر شهرًا.", storyP2: "في الاثنين التالي عاد إلى العمل وهو مقتنع بأن الصناعة بأكملها تبني كاميرات للورقات الفنية، لا لتلك الرحلة الواحدة من بين عشرة آلاف التي يكون فيها التسجيل ضروريًا فعلًا. بعد ثمانية أشهر، تأسست AZDOME بفريق من ثلاثة مهندسي مستشعرات صور ومتخصص بصريات واحد، بشرط واحد: كل منتج يجب أن يعمل في ظروف لا تختبرها الورقات الفنية — الحرارة والاهتزاز وانخفاض الجهد والإضاءة المنخفضة وذيل الحالات الحدية التي يواجهها السائقون فعلًا.", storyP3: "بعد اثني عشر عامًا، نحن فريق من 84 شخصًا في شنزن وسان فرانسيسكو ودبلن، نوصل الكاميرات إلى أكثر من 60 دولة. الشرط لم يتغير.", timelineEyebrow: "الجدول الزمني", timelineTitle: "اثنا عشر عامًا، شرط واحد.", valuesEyebrow: "كيف نبني", valuesTitle: "أربعة مبادئ، في كل منتج.", commitmentsEyebrow: "التزاماتنا", commitmentsTitle: "الأشياء التي لا نتنازل فيها.", ctaTitle: "أسئلة، استفسارات صحفية، أو شراكة؟", ctaSub: "نقرأ كل رسالة. متوسط زمن الرد أقل من يوم عمل واحد.", ctaContact: "تواصل معنا", ctaPress: "استفسارات الصحافة" },
  th: { eyebrow: "เกี่ยวกับ AZDOME", title: "กล้องสำหรับช่วงเวลาที่คุณย้อนกลับไม่ได้", sub: "ตั้งแต่ปี 2014 เราสร้างกล้องติดรถยนต์ที่ทำหน้าที่อย่างเงียบ ๆ — จนถึงวินาทีที่คุณต้องการ วันนี้มีผู้ขับขี่กว่า 200,000 คนใน 60+ ประเทศไว้วางใจ AZDOME ในทุกการเดินทาง", shopCta: "ดูกล้องติดรถยนต์", joinCta: "ร่วมทีม", storyEyebrow: "เรื่องราวของเรา", storyTitle: "เราเริ่มต้นเพราะกล้องล้มเหลวในช่วงเวลาที่สำคัญที่สุด", storyP1: "ในปี 2013 หนึ่งในผู้ร่วมก่อตั้งของเราถูกชนท้ายตอนติดไฟแดงที่เซินเจิ้น กล้องในรถ — แบรนด์ดังในสมัยนั้น — บันทึกได้แค่แสงเลือนและทะเบียนเบลอ คดีประกันที่ตามมายืดเยื้อ 11 เดือน", storyP2: "วันจันทร์ถัดมาเขากลับไปทำงานพร้อมความเชื่อว่าทั้งอุตสาหกรรมสร้างกล้องเพื่อแผ่นสเปก ไม่ใช่เพื่อการเดินทาง 1 ใน 10,000 ครั้งที่การบันทึกมีความหมายจริง 8 เดือนต่อมา AZDOME ก่อตั้งโดยวิศวกรเซ็นเซอร์ภาพ 3 คน และผู้เชี่ยวชาญด้านเลนส์ 1 คน ภายใต้กฎข้อเดียว: ทุกผลิตภัณฑ์ต้องทำงานได้ในสภาพที่แผ่นสเปกไม่ทดสอบ — ความร้อน การสั่นสะเทือน แรงดันตก แสงน้อย และเคสปลายแถวที่ผู้ขับจริงเจอ", storyP3: "12 ปีต่อมา เราเป็นทีม 84 คนในเซินเจิ้น ซานฟรานซิสโก และดับลิน ส่งกล้องไป 60+ ประเทศ กฎข้อนั้นยังไม่เปลี่ยน", timelineEyebrow: "เส้นเวลา", timelineTitle: "12 ปี กฎข้อเดียว", valuesEyebrow: "วิธีการของเรา", valuesTitle: "4 หลักการ ทุกผลิตภัณฑ์", commitmentsEyebrow: "พันธสัญญาของเรา", commitmentsTitle: "สิ่งที่เราจะไม่ตัดทอน", ctaTitle: "มีคำถาม สื่อ หรืออยากเป็นพาร์ทเนอร์?", ctaSub: "เราอ่านทุกข้อความ ตอบกลับเฉลี่ยภายใน 1 วันทำการ", ctaContact: "ติดต่อเรา", ctaPress: "ติดต่อสื่อ" },
  vi: { eyebrow: "Về AZDOME", title: "Máy quay cho những khoảnh khắc không thể phát lại.", sub: "Từ năm 2014, chúng tôi tạo ra camera hành trình âm thầm làm việc — cho đến giây bạn cần đến. Hôm nay hơn 200.000 tài xế ở 60+ quốc gia tin dùng AZDOME mỗi chuyến đi.", shopCta: "Xem camera hành trình", joinCta: "Tham gia đội ngũ", storyEyebrow: "Câu chuyện của chúng tôi", storyTitle: "Chúng tôi bắt đầu vì một chiếc camera đã thất bại đúng lúc quan trọng nhất.", storyP1: "Năm 2013, một trong những đồng sáng lập của chúng tôi bị tông phía sau ở đèn đỏ tại Thâm Quyến. Camera hành trình trong xe — của một thương hiệu nổi tiếng lúc bấy giờ — chỉ ghi lại được vệt sáng và biển số mờ. Tranh chấp bảo hiểm kéo dài 11 tháng.", storyP2: "Sáng thứ Hai tuần sau anh trở lại văn phòng với niềm tin rằng cả ngành đang làm camera vì tờ thông số, không phải vì 1 trong 10.000 chuyến đi khi bản ghi thực sự cần thiết. Tám tháng sau, AZDOME được sáng lập bởi 3 kỹ sư cảm biến và 1 chuyên gia quang học, với một ràng buộc duy nhất: mọi sản phẩm phải hoạt động trong điều kiện mà tờ thông số không kiểm thử — nhiệt, rung, điện áp tụt, ánh sáng yếu và đuôi dài các tình huống mà tài xế thật gặp phải.", storyP3: "12 năm sau, chúng tôi là đội 84 người ở Thâm Quyến, San Francisco và Dublin, gửi camera đến 60+ quốc gia. Ràng buộc chưa từng thay đổi.", timelineEyebrow: "Mốc thời gian", timelineTitle: "12 năm, một ràng buộc.", valuesEyebrow: "Cách chúng tôi xây dựng", valuesTitle: "Bốn nguyên tắc, mọi sản phẩm.", commitmentsEyebrow: "Cam kết của chúng tôi", commitmentsTitle: "Những điều chúng tôi không cắt giảm.", ctaTitle: "Câu hỏi, truyền thông hay hợp tác?", ctaSub: "Chúng tôi đọc mọi tin nhắn. Thời gian trả lời trung bình dưới một ngày làm việc.", ctaContact: "Liên hệ", ctaPress: "Truyền thông" },
};

export default function AboutPageClient({ content }: { content: AboutContent }) {
  const { locale } = useLocale();
  const t = COPY[locale] ?? COPY.en!;
  const { stats, values, timeline, commitments } = content;

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-32 md:pb-28 md:pt-40 lg:px-10">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
                {t.eyebrow}
              </p>
              <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
                {t.title}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-500 md:text-lg">
                {t.sub}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/collections/dash-cams"
                  className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold tracking-tight text-white transition-all duration-300 hover:bg-blue-700"
                >
                  {t.shopCta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/careers"
                  className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold tracking-tight text-slate-900 shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  {t.joinCta}
                </Link>
              </div>
            </div>
            <div className="relative aspect-[5/4] w-full overflow-hidden rounded-2xl bg-slate-200 shadow-sm">
              <Image
                src="/images/about-hero.jpg"
                alt="AZDOME team"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-slate-100 bg-white py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 md:grid-cols-4 lg:px-10">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <AnimatedCounter
                to={s.to}
                prefix={s.prefix}
                suffix={s.suffix}
                decimals={s.decimals}
                separator={s.separator}
                className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl"
              />
              <div className="mt-2 text-xs uppercase tracking-[0.14em] text-slate-500 md:text-sm">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
            {t.storyEyebrow}
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            {t.storyTitle}
          </h2>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-slate-600 md:text-lg">
            <p>{t.storyP1}</p>
            <p>{t.storyP2}</p>
            <p>{t.storyP3}</p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-slate-50 py-24 md:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-10">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
            {t.timelineEyebrow}
          </p>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            {t.timelineTitle}
          </h2>
          <ol className="mt-12 space-y-8">
            {timeline.map((ti) => (
              <li key={ti.year} className="grid grid-cols-[80px_1fr] gap-6 md:grid-cols-[100px_1fr]">
                <div className="text-2xl font-bold tracking-tight text-blue-600 md:text-3xl">
                  {ti.year}
                </div>
                <div className="border-l border-slate-200 pl-6">
                  <h3 className="text-lg font-semibold tracking-tight text-slate-900 md:text-xl">
                    {ti.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-slate-600">
                    {ti.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14 max-w-2xl md:mb-20">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
              {t.valuesEyebrow}
            </p>
            <h2 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              {t.valuesTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
            {values.map((v) => {
              const Icon = ICONS[v.iconName] ?? Sparkles;
              return (
                <div
                  key={v.title}
                  className="rounded-2xl bg-slate-50 p-8 shadow-sm transition-shadow duration-300 hover:shadow-md"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-900">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-slate-600">
                    {v.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Commitments */}
      <section className="bg-slate-50 py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-14 max-w-2xl md:mb-20">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
              {t.commitmentsEyebrow}
            </p>
            <h2 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              {t.commitmentsTitle}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {commitments.map((c) => {
              const Icon = ICONS[c.iconName] ?? ShieldCheck;
              return (
                <div key={c.title} className="rounded-2xl bg-white p-7 shadow-sm">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-base font-semibold tracking-tight text-slate-900">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {c.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CertBadges />

      {/* CTA */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            {t.ctaTitle}
          </h2>
          <p className="mt-4 text-base text-slate-500 md:text-lg">{t.ctaSub}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/support/contact"
              className="inline-flex items-center rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700"
            >
              {t.ctaContact}
            </Link>
            <Link
              href="/press"
              className="inline-flex items-center rounded-full bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-900 transition-all duration-300 hover:bg-slate-200"
            >
              {t.ctaPress}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
