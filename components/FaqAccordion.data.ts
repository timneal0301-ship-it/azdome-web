import type { Locale } from "@/lib/i18n/dictionaries";

export type FAQ = {
  q: string;
  a: string;
  /** Set to true to skip rendering this question. */
  hidden?: boolean;
};

const FAQS_BY_LOCALE: Partial<Record<Locale, FAQ[]>> = {
  en: [
    {
      q: "How do I install the M550 Pro?",
      a: "Most drivers finish install in under 20 minutes. Peel the 3M mount, position the camera behind your rearview mirror, route the Type-C cable along the trim using the included tool, and plug into your 12V port. For 24-hour parking mode, add the optional hardwire kit.",
    },
    {
      q: "Does it record while my car is parked?",
      a: "Yes — with the optional hardwire kit, buffered parking mode records the seconds before and after any motion or impact, preserving incidents while protecting your car battery via low-voltage cutoff.",
    },
    {
      q: "What microSD card should I use?",
      a: "We recommend a high-endurance Class 10 / U3 card, 64GB to 512GB. Cards rated for surveillance / dash-cam use last significantly longer than standard cards.",
    },
    {
      q: "Will it drain my car battery?",
      a: "No. The included cigarette-lighter cable only powers the camera while your car is running. The hardwire kit includes a smart low-voltage cutoff to protect your battery during parking mode.",
    },
    {
      q: "Can I view footage on my phone?",
      a: "Yes. Pair the M550 Pro over its built-in 5GHz Wi-Fi using the free AZDOME app. Browse, download, and share full 4K clips — no SD card removal required.",
    },
    {
      q: "What's covered by the warranty?",
      a: "All AZDOME cameras include a 12-month limited warranty against manufacturing defects, plus 30-day returns from the date of delivery, and 24×7 technical support. Register your product within 30 days for fast-track service.",
    },
    {
      q: "Can I control the camera with my voice?",
      a: "Yes — the M550 Pro and M550 Max support hands-free voice commands including \"Lock Video\", \"Take Photo\", and \"Turn on WiFi\". The microphone is always-on while the camera is recording.",
    },
  ],
  zh: [
    {
      q: "M550 Pro 怎么安装?",
      a: "大多数车主 20 分钟内就能完成安装。撕开 3M 背胶,把摄像头贴在后视镜后面,用附赠工具沿车顶饰板走线 Type-C 电源线,插入 12V 点烟器接口即可。需要 24 小时停车监控,请加购降压线套件。",
    },
    {
      q: "停车时也能录像吗?",
      a: "可以 — 配合降压线套件,缓冲停车模式会持续录制任何震动或碰撞的前后几秒。同时低压保护可避免亏电。",
    },
    {
      q: "应该用什么 SD 卡?",
      a: "推荐高耐久 Class 10 / U3 卡,64GB 到 512GB。监控级 / 行车记录仪专用卡寿命远长于普通卡。",
    },
    {
      q: "会不会把电瓶用亏电?",
      a: "不会。随附的点烟器线只在车辆运行时供电。降压线套件内置智能低压保护,停车监控期间也不会亏电。",
    },
    {
      q: "能在手机上看回放吗?",
      a: "可以。免费 AZDOME App 通过内置 5GHz Wi-Fi 连接 M550 Pro,可浏览、下载、分享完整 4K 片段,无需拔卡。",
    },
    {
      q: "保修包含什么?",
      a: "全部 AZDOME 摄像头提供 12 个月有限质保(针对制造缺陷)、30 天无理由退货、7×24 技术支持。30 天内注册产品可享加急服务。",
    },
    {
      q: "支持语音控制吗?",
      a: "M550 Pro 与 M550 Max 支持免提语音指令,包括「锁定视频」「拍照」「打开 WiFi」等。录制时麦克风始终开启。",
    },
  ],
  ja: [
    {
      q: "M550 Pro はどう取り付けますか?",
      a: "ほとんどの方は 20 分以内に取り付けを完了します。3M 両面テープを剥がし、ルームミラーの裏に本体を貼り付け、Type-C ケーブルを内装はがし工具で配線し、12V ソケットに差し込みます。24 時間駐車監視には別売のハードワイヤーキットを追加してください。",
    },
    {
      q: "駐車中も録画できますか?",
      a: "別売のハードワイヤーキットを使えば、バッファ式駐車モードが衝撃・動きの前後数秒を録画し、低電圧カット機能でバッテリーを保護します。",
    },
    {
      q: "どの microSD カードを使えばいいですか?",
      a: "高耐久クラス 10 / U3、64GB ~ 512GB を推奨します。監視 / ドライブレコーダー対応カードは通常品より大幅に長持ちします。",
    },
    {
      q: "バッテリー上がりは大丈夫ですか?",
      a: "問題ありません。付属のシガーケーブルはエンジン稼働中のみ給電します。ハードワイヤーキットはインテリジェント低電圧カット機能でバッテリーを保護します。",
    },
    {
      q: "スマホで映像を確認できますか?",
      a: "はい。無料の AZDOME アプリで内蔵 5GHz Wi-Fi 接続し、4K 映像の閲覧・ダウンロード・共有が可能。SD カードを抜く必要はありません。",
    },
    {
      q: "保証内容は?",
      a: "AZDOME 全カメラに製造上の欠陥に対する 12 ヶ月限定保証、配送日から 30 日返品、24 時間 365 日テクニカルサポートが付帯します。30 日以内の登録で優先サポート対象です。",
    },
    {
      q: "音声操作は可能ですか?",
      a: "M550 Pro と M550 Max は「ロック」「写真」「WiFi オン」などのハンズフリー音声コマンドに対応。録画中はマイク常時オンです。",
    },
  ],
  de: [
    {
      q: "Wie installiere ich die M550 Pro?",
      a: "Die meisten Fahrer brauchen weniger als 20 Minuten. Klebehalterung abziehen, hinter dem Rückspiegel positionieren, Type-C-Kabel mit dem mitgelieferten Werkzeug entlang der Verkleidung verlegen und an die 12V-Buchse anschließen. Für den 24-h-Parkmodus ist der optionale Festeinbau-Satz erforderlich.",
    },
    {
      q: "Nimmt sie auch beim Parken auf?",
      a: "Ja — mit dem optionalen Festeinbau-Satz zeichnet der gepufferte Parkmodus die Sekunden vor und nach Bewegung/Aufprall auf und schützt die Autobatterie über eine Unterspannungsabschaltung.",
    },
    {
      q: "Welche microSD-Karte soll ich verwenden?",
      a: "Wir empfehlen eine Hochleistungskarte Class 10 / U3, 64 GB bis 512 GB. Überwachungs-/Dashcam-Karten halten deutlich länger als Standardkarten.",
    },
    {
      q: "Entlädt sie meine Autobatterie?",
      a: "Nein. Das mitgelieferte 12-V-Kabel versorgt die Kamera nur bei laufendem Motor. Der Festeinbau-Satz enthält eine intelligente Unterspannungsabschaltung, die die Batterie im Parkmodus schützt.",
    },
    {
      q: "Kann ich Aufnahmen auf dem Handy ansehen?",
      a: "Ja. Mit der kostenlosen AZDOME-App über das integrierte 5-GHz-WLAN koppeln. Volle 4K-Clips ansehen, herunterladen und teilen — ohne SD-Karte zu entnehmen.",
    },
    {
      q: "Was deckt die Garantie ab?",
      a: "Alle AZDOME-Kameras haben 12 Monate beschränkte Garantie auf Herstellungsfehler, 30 Tage Rückgaberecht ab Lieferdatum und 24×7-Support. Innerhalb von 30 Tagen registrieren für Fast-Track-Service.",
    },
    {
      q: "Funktioniert die Sprachsteuerung?",
      a: "Ja — M550 Pro und M550 Max unterstützen freihändige Sprachbefehle wie \"Lock Video\", \"Take Photo\" und \"Turn on WiFi\". Das Mikrofon ist während der Aufnahme stets aktiv.",
    },
  ],
  fr: [
    {
      q: "Comment installer la M550 Pro ?",
      a: "La plupart des conducteurs terminent l'installation en moins de 20 minutes. Décollez l'adhésif 3M, positionnez la caméra derrière le rétroviseur, faites passer le câble Type-C le long des garnitures avec l'outil inclus, et branchez dans la prise 12V. Pour le mode parking 24h, ajoutez le kit d'alimentation en option.",
    },
    {
      q: "Enregistre-t-elle quand la voiture est garée ?",
      a: "Oui — avec le kit d'alimentation en option, le mode parking tamponné enregistre les secondes avant et après tout mouvement ou impact, et protège la batterie via une coupure basse tension.",
    },
    {
      q: "Quelle carte microSD utiliser ?",
      a: "Nous recommandons une carte haute endurance Class 10 / U3, de 64 Go à 512 Go. Les cartes prévues pour la vidéosurveillance / dashcam durent bien plus longtemps que les cartes standard.",
    },
    {
      q: "Va-t-elle décharger ma batterie ?",
      a: "Non. Le câble allume-cigare fourni n'alimente la caméra que moteur tournant. Le kit d'alimentation intègre une coupure basse tension intelligente qui protège la batterie en mode parking.",
    },
    {
      q: "Puis-je voir les vidéos sur mon téléphone ?",
      a: "Oui. Appairez la M550 Pro via son Wi-Fi 5 GHz intégré avec l'application AZDOME gratuite. Naviguez, téléchargez et partagez vos clips 4K complets — sans retirer la carte SD.",
    },
    {
      q: "Que couvre la garantie ?",
      a: "Toutes les caméras AZDOME bénéficient d'une garantie limitée de 12 mois contre les défauts de fabrication, d'un retour sous 30 jours et d'un support technique 24×7. Enregistrez votre produit sous 30 jours pour un traitement prioritaire.",
    },
    {
      q: "Le contrôle vocal fonctionne-t-il ?",
      a: "Oui — la M550 Pro et la M550 Max prennent en charge les commandes vocales mains libres dont \"Lock Video\", \"Take Photo\" et \"Turn on WiFi\". Le micro reste activé pendant l'enregistrement.",
    },
  ],
  es: [
    {
      q: "¿Cómo se instala la M550 Pro?",
      a: "La mayoría de conductores la instalan en menos de 20 minutos. Despega el adhesivo 3M, coloca la cámara detrás del espejo retrovisor, pasa el cable Type-C por la moldura con la herramienta incluida y conéctalo a la toma de 12 V. Para modo aparcamiento 24 h, añade el kit de alimentación directa opcional.",
    },
    {
      q: "¿Graba mientras el coche está aparcado?",
      a: "Sí — con el kit de alimentación directa, el modo aparcamiento con búfer graba los segundos previos y posteriores a cualquier movimiento o impacto, protegiendo la batería con corte por baja tensión.",
    },
    {
      q: "¿Qué tarjeta microSD debo usar?",
      a: "Recomendamos una tarjeta de alta resistencia Class 10 / U3, de 64 GB a 512 GB. Las tarjetas certificadas para videovigilancia / dashcam duran mucho más que las estándar.",
    },
    {
      q: "¿Descargará mi batería?",
      a: "No. El cable de mechero incluido solo alimenta la cámara con el motor en marcha. El kit de alimentación directa integra un corte de baja tensión inteligente que protege la batería en modo aparcamiento.",
    },
    {
      q: "¿Puedo ver las grabaciones en el móvil?",
      a: "Sí. Empareja la M550 Pro mediante su Wi-Fi 5 GHz con la app gratuita AZDOME. Navega, descarga y comparte vídeos 4K completos — sin sacar la tarjeta SD.",
    },
    {
      q: "¿Qué cubre la garantía?",
      a: "Todas las cámaras AZDOME incluyen 12 meses de garantía limitada contra defectos de fabricación, 30 días para devolución desde la entrega y soporte técnico 24×7. Registra tu producto en los primeros 30 días para servicio prioritario.",
    },
    {
      q: "¿Puedo controlar la cámara con la voz?",
      a: "Sí — la M550 Pro y la M550 Max soportan comandos por voz como \"Lock Video\", \"Take Photo\" y \"Turn on WiFi\". El micrófono está siempre activo durante la grabación.",
    },
  ],
  it: [
    {
      q: "Come si installa la M550 Pro?",
      a: "La maggior parte degli automobilisti completa l'installazione in meno di 20 minuti. Stacca il supporto 3M, posiziona la dash cam dietro lo specchietto retrovisore, fai passare il cavo Type-C lungo le finiture con lo strumento incluso e collegalo alla presa 12 V. Per la modalità parcheggio 24 h, aggiungi il kit di alimentazione fissa opzionale.",
    },
    {
      q: "Registra quando l'auto è parcheggiata?",
      a: "Sì — con il kit di alimentazione fissa opzionale, la modalità parcheggio con buffer registra i secondi prima e dopo qualsiasi movimento o impatto, proteggendo la batteria tramite cutoff a bassa tensione.",
    },
    {
      q: "Quale microSD usare?",
      a: "Consigliamo una scheda ad alta resistenza Class 10 / U3, da 64 GB a 512 GB. Le schede pensate per videosorveglianza / dash cam durano molto di più di quelle standard.",
    },
    {
      q: "Scarica la batteria dell'auto?",
      a: "No. Il cavo accendisigari incluso alimenta la telecamera solo a motore acceso. Il kit di alimentazione fissa integra un cutoff a bassa tensione intelligente per proteggere la batteria durante il parcheggio.",
    },
    {
      q: "Posso vedere i filmati sul telefono?",
      a: "Sì. Abbina la M550 Pro tramite il Wi-Fi 5 GHz integrato con l'app gratuita AZDOME. Sfoglia, scarica e condividi clip 4K complete — senza rimuovere la microSD.",
    },
    {
      q: "Cosa copre la garanzia?",
      a: "Tutte le AZDOME hanno 12 mesi di garanzia limitata sui difetti di fabbricazione, 30 giorni di reso dalla consegna e supporto 24×7. Registra il prodotto entro 30 giorni per ricevere assistenza prioritaria.",
    },
    {
      q: "C'è il controllo vocale?",
      a: "Sì — M550 Pro e M550 Max supportano comandi vocali hands-free tra cui \"Lock Video\", \"Take Photo\" e \"Turn on WiFi\". Il microfono è sempre attivo durante la registrazione.",
    },
  ],
  ru: [
    {
      q: "Как установить M550 Pro?",
      a: "Большинство водителей справляются менее чем за 20 минут. Снимите защитную плёнку с крепления 3M, разместите камеру за зеркалом заднего вида, проложите кабель Type-C по обшивке с помощью прилагаемого инструмента и подключите к гнезду 12 В. Для парковочного режима 24 ч добавьте дополнительный hardwire-комплект.",
    },
    {
      q: "Записывает ли камера, когда машина припаркована?",
      a: "Да — с дополнительным hardwire-комплектом буферизованный парковочный режим записывает несколько секунд до и после любого движения или удара и защищает аккумулятор отключением по низкому напряжению.",
    },
    {
      q: "Какую карту microSD использовать?",
      a: "Рекомендуем карты повышенной выносливости Class 10 / U3, от 64 ГБ до 512 ГБ. Карты для видеонаблюдения и dash-cam служат значительно дольше обычных.",
    },
    {
      q: "Не посадит ли камера аккумулятор?",
      a: "Нет. Прилагаемый кабель от прикуривателя питает камеру только при работающем двигателе. Hardwire-комплект имеет интеллектуальное отключение по низкому напряжению, защищающее батарею в режиме парковки.",
    },
    {
      q: "Можно смотреть записи со смартфона?",
      a: "Да. Подключите M550 Pro по встроенному Wi-Fi 5 ГГц через бесплатное приложение AZDOME. Просматривайте, скачивайте и делитесь 4K-роликами без извлечения карты.",
    },
    {
      q: "Что входит в гарантию?",
      a: "Все камеры AZDOME покрываются 12-месячной ограниченной гарантией на производственные дефекты, 30 днями возврата с даты доставки и поддержкой 24×7. Зарегистрируйте товар в течение 30 дней для приоритетного обслуживания.",
    },
    {
      q: "Поддерживается ли голосовое управление?",
      a: "Да — M550 Pro и M550 Max понимают команды без рук, включая \"Lock Video\", \"Take Photo\" и \"Turn on WiFi\". Микрофон всегда активен во время записи.",
    },
  ],
  pl: [
    {
      q: "Jak zainstalować M550 Pro?",
      a: "Większość kierowców kończy montaż w mniej niż 20 minut. Odklej taśmę 3M, umieść kamerę za lusterkiem wstecznym, przeprowadź kabel Type-C wzdłuż listew dołączonym narzędziem i podłącz do gniazda 12 V. Do trybu parkowania 24 h potrzebny jest opcjonalny zestaw hardwire.",
    },
    {
      q: "Czy nagrywa, gdy samochód stoi?",
      a: "Tak — z opcjonalnym zestawem hardwire buforowy tryb parkowania nagrywa sekundy przed i po każdym ruchu lub uderzeniu, a inteligentne odcięcie chroni akumulator.",
    },
    {
      q: "Jakiej karty microSD użyć?",
      a: "Polecamy karty wzmocnione Class 10 / U3, od 64 GB do 512 GB. Karty dedykowane do monitoringu / dashcam wytrzymują znacznie dłużej niż standardowe.",
    },
    {
      q: "Czy rozładuje akumulator?",
      a: "Nie. Dołączony kabel do gniazda 12 V zasila kamerę tylko przy pracującym silniku. Zestaw hardwire posiada inteligentne odcięcie chroniące akumulator w trybie parkowania.",
    },
    {
      q: "Czy obejrzę nagrania w telefonie?",
      a: "Tak. Sparuj M550 Pro przez wbudowane Wi-Fi 5 GHz w darmowej aplikacji AZDOME. Przeglądaj, pobieraj i udostępniaj pełne klipy 4K — bez wyjmowania karty.",
    },
    {
      q: "Co obejmuje gwarancja?",
      a: "Wszystkie kamery AZDOME mają 12-miesięczną ograniczoną gwarancję na wady fabryczne, 30-dniowy zwrot od dostawy oraz wsparcie 24×7. Zarejestruj produkt w ciągu 30 dni dla szybszej obsługi.",
    },
    {
      q: "Czy działa sterowanie głosowe?",
      a: "Tak — M550 Pro i M550 Max obsługują komendy głosowe bez użycia rąk, w tym \"Lock Video\", \"Take Photo\" i \"Turn on WiFi\". Mikrofon jest aktywny przez cały czas nagrywania.",
    },
  ],
  ro: [
    {
      q: "Cum instalez M550 Pro?",
      a: "Majoritatea șoferilor termină instalarea în mai puțin de 20 de minute. Dezlipiți suportul 3M, poziționați camera în spatele oglinzii retrovizoare, treceți cablul Type-C de-a lungul ornamentelor cu unealta inclusă și conectați-l la priza de 12 V. Pentru modul parcare 24 h adăugați kit-ul de alimentare permanentă opțional.",
    },
    {
      q: "Înregistrează când mașina e parcată?",
      a: "Da — cu kit-ul de alimentare permanentă opțional, modul parcare cu buffer înregistrează secundele de dinainte și de după orice mișcare sau impact, protejând bateria prin întreruperea la tensiune scăzută.",
    },
    {
      q: "Ce card microSD să folosesc?",
      a: "Recomandăm un card de înaltă rezistență Class 10 / U3, 64 GB până la 512 GB. Cardurile pentru supraveghere / dashcam rezistă mult mai mult decât cele obișnuite.",
    },
    {
      q: "Va consuma bateria mașinii?",
      a: "Nu. Cablul de la bricheta inclus alimentează camera doar cu motorul pornit. Kit-ul de alimentare permanentă include o întrerupere inteligentă la tensiune scăzută care protejează bateria în modul parcare.",
    },
    {
      q: "Pot vedea înregistrările pe telefon?",
      a: "Da. Conectați M550 Pro prin Wi-Fi 5 GHz integrat folosind aplicația gratuită AZDOME. Vizualizați, descărcați și partajați clipuri 4K complete — fără să scoateți cardul.",
    },
    {
      q: "Ce acoperă garanția?",
      a: "Toate camerele AZDOME au garanție limitată de 12 luni pentru defectele de fabricație, retur 30 de zile de la livrare și suport 24×7. Înregistrați produsul în 30 de zile pentru service prioritar.",
    },
    {
      q: "Camera poate fi controlată prin voce?",
      a: "Da — M550 Pro și M550 Max acceptă comenzi vocale hands-free precum \"Lock Video\", \"Take Photo\" și \"Turn on WiFi\". Microfonul este activ pe toată durata înregistrării.",
    },
  ],
  tr: [
    {
      q: "M550 Pro nasıl kurulur?",
      a: "Çoğu sürücü kurulumu 20 dakikadan kısa sürede tamamlar. 3M bandı soyun, kamerayı dikiz aynanızın arkasına yerleştirin, Type-C kabloyu birlikte gelen aletle döşemenin altından geçirin ve 12V soketine takın. 24 saat park modu için opsiyonel hardwire kitini ekleyin.",
    },
    {
      q: "Arabam park halindeyken kayıt yapıyor mu?",
      a: "Evet — opsiyonel hardwire kitiyle, tamponlu park modu her hareket veya darbeden önceki ve sonraki saniyeleri kaydeder ve düşük voltaj kesicisiyle akünüzü korur.",
    },
    {
      q: "Hangi microSD kartı kullanmalıyım?",
      a: "Yüksek dayanıklılıkta Class 10 / U3 kart, 64 GB ila 512 GB öneriyoruz. Güvenlik / dashcam için sertifikalı kartlar standart kartlardan çok daha uzun ömürlüdür.",
    },
    {
      q: "Aküyü bitirir mi?",
      a: "Hayır. Birlikte gelen çakmak kablosu kamerayı yalnızca araç çalışırken besler. Hardwire kit, park modunda aküyü koruyan akıllı düşük voltaj kesicisi içerir.",
    },
    {
      q: "Görüntüleri telefonumdan izleyebilir miyim?",
      a: "Evet. Ücretsiz AZDOME uygulamasıyla M550 Pro'yu dahili 5 GHz Wi-Fi üzerinden eşleştirin. Tam 4K klipleri görüntüleyin, indirin ve paylaşın — SD kartı çıkarmaya gerek yok.",
    },
    {
      q: "Garanti neleri kapsıyor?",
      a: "Tüm AZDOME kameralarda üretim hatalarına karşı 12 aylık sınırlı garanti, teslimden itibaren 30 günlük iade ve 24×7 teknik destek bulunur. Hızlı hizmet için ürününüzü 30 gün içinde kaydedin.",
    },
    {
      q: "Sesle kontrol edebilir miyim?",
      a: "Evet — M550 Pro ve M550 Max, \"Lock Video\", \"Take Photo\", \"Turn on WiFi\" gibi eller serbest sesli komutları destekler. Kayıt sırasında mikrofon sürekli açık kalır.",
    },
  ],
  pt: [
    {
      q: "Como instalo a M550 Pro?",
      a: "A maioria dos motoristas conclui a instalação em menos de 20 minutos. Retire o adesivo 3M, posicione a câmera atrás do retrovisor, passe o cabo Type-C pelos acabamentos com a ferramenta inclusa e conecte na tomada 12V. Para o modo estacionamento 24h, adicione o kit de alimentação direta opcional.",
    },
    {
      q: "Grava enquanto o carro está estacionado?",
      a: "Sim — com o kit de alimentação direta opcional, o modo estacionamento com buffer grava os segundos antes e depois de qualquer movimento ou impacto, protegendo a bateria com corte de baixa tensão.",
    },
    {
      q: "Que cartão microSD devo usar?",
      a: "Recomendamos um cartão de alta durabilidade Class 10 / U3, de 64 GB a 512 GB. Cartões para vigilância / dashcam duram muito mais que os comuns.",
    },
    {
      q: "Vai descarregar a bateria do carro?",
      a: "Não. O cabo de isqueiro incluído só alimenta a câmera com o motor ligado. O kit de alimentação direta tem corte inteligente de baixa tensão que protege a bateria no modo estacionamento.",
    },
    {
      q: "Posso ver as gravações no celular?",
      a: "Sim. Pareie a M550 Pro pelo Wi-Fi 5 GHz integrado usando o app gratuito AZDOME. Visualize, baixe e compartilhe clipes 4K completos — sem precisar tirar o cartão.",
    },
    {
      q: "O que a garantia cobre?",
      a: "Todas as câmeras AZDOME têm garantia limitada de 12 meses contra defeitos de fabricação, 30 dias para devolução a partir da entrega e suporte 24×7. Registre o produto em 30 dias para atendimento prioritário.",
    },
    {
      q: "Posso controlar pela voz?",
      a: "Sim — a M550 Pro e a M550 Max aceitam comandos por voz como \"Lock Video\", \"Take Photo\" e \"Turn on WiFi\". O microfone fica sempre ativo durante a gravação.",
    },
  ],
  ar: [
    {
      q: "كيف أركّب كاميرا M550 Pro؟",
      a: "ينتهي معظم السائقين من التركيب في أقل من 20 دقيقة. انزع لاصق 3M وضع الكاميرا خلف المرآة الأمامية، ومرّر كابل Type-C على طول التجهيزات بالأداة المرفقة، ثم وصّله بمنفذ 12 فولت. لوضع المراقبة 24 ساعة، أضف عُدّة التوصيل المباشر الاختيارية.",
    },
    {
      q: "هل تسجّل أثناء وقوف السيارة؟",
      a: "نعم — مع عُدّة التوصيل المباشر، يسجّل وضع وقوف السيارة الثواني التي تسبق وتلي أي حركة أو اصطدام، ويحمي البطارية بقاطع جهد منخفض ذكي.",
    },
    {
      q: "أي بطاقة microSD أستخدم؟",
      a: "نوصي ببطاقة عالية التحمّل من فئة Class 10 / U3 بسعة 64GB إلى 512GB. بطاقات المراقبة وكاميرات السيارة تدوم أطول بكثير من البطاقات العادية.",
    },
    {
      q: "هل ستستهلك بطارية السيارة؟",
      a: "لا. كابل الولاعة المرفق يغذّي الكاميرا فقط أثناء تشغيل المحرك. عُدّة التوصيل المباشر تحتوي على قاطع ذكي لحماية البطارية في وضع المراقبة.",
    },
    {
      q: "هل يمكنني مشاهدة الفيديو على هاتفي؟",
      a: "نعم. اقرن M550 Pro عبر شبكة Wi-Fi المدمجة 5GHz من تطبيق AZDOME المجاني. تصفّح وحمّل وشارك مقاطع 4K الكاملة — دون نزع البطاقة.",
    },
    {
      q: "ما الذي يشمله الضمان؟",
      a: "تتضمن كل كاميرات AZDOME ضمانًا محدودًا لمدة 12 شهرًا ضد عيوب التصنيع، وإمكانية إرجاع خلال 30 يومًا من الاستلام، ودعمًا فنيًا 24×7. سجّل المنتج خلال 30 يومًا للحصول على خدمة سريعة.",
    },
    {
      q: "هل أتحكم بالكاميرا صوتيًا؟",
      a: "نعم — تدعم M550 Pro و M550 Max أوامر صوتية بدون لمس مثل \"Lock Video\" و\"Take Photo\" و\"Turn on WiFi\". الميكروفون يبقى مفعّلًا أثناء التسجيل.",
    },
  ],
  th: [
    {
      q: "ติดตั้ง M550 Pro ยังไง?",
      a: "ผู้ขับขี่ส่วนใหญ่ติดตั้งเสร็จในไม่ถึง 20 นาที ลอกเทป 3M ติดกล้องหลังกระจกมองหลัง เดินสาย Type-C ไปตามคิ้วโดยใช้เครื่องมือที่ให้มา แล้วเสียบที่ช่อง 12V ถ้าต้องการโหมดจอด 24 ชั่วโมง ให้เพิ่มชุดต่อสายตรง",
    },
    {
      q: "บันทึกตอนจอดรถได้ไหม?",
      a: "ได้ — เมื่อใช้ชุดต่อสายตรง โหมดจอดแบบบัฟเฟอร์จะบันทึกวินาทีก่อนและหลังการเคลื่อนไหวหรือกระแทก พร้อมตัดไฟอัตโนมัติเมื่อแรงดันต่ำเพื่อรักษาแบตเตอรี่",
    },
    {
      q: "ควรใช้การ์ด microSD แบบไหน?",
      a: "แนะนำการ์ดความทนสูง Class 10 / U3 ความจุ 64GB - 512GB การ์ดสำหรับกล้องวงจรปิดและกล้องติดรถยนต์มีอายุการใช้งานยาวกว่าการ์ดทั่วไปมาก",
    },
    {
      q: "จะกินไฟแบตรถไหม?",
      a: "ไม่ สายเสียบไฟอัตโนมัติที่ให้มาจ่ายไฟเฉพาะตอนรถสตาร์ท ชุดต่อสายตรงมีระบบตัดไฟอัตโนมัติเมื่อแรงดันต่ำเพื่อปกป้องแบตเตอรี่ระหว่างโหมดจอด",
    },
    {
      q: "ดูภาพในมือถือได้ไหม?",
      a: "ได้ จับคู่ M550 Pro ผ่าน Wi-Fi 5GHz ในตัวด้วยแอป AZDOME ฟรี เปิดดู ดาวน์โหลด และแชร์คลิป 4K เต็มได้โดยไม่ต้องถอดการ์ด",
    },
    {
      q: "การรับประกันครอบคลุมอะไร?",
      a: "กล้อง AZDOME ทุกรุ่นมีรับประกันจำกัด 12 เดือนสำหรับข้อบกพร่องจากการผลิต, คืนสินค้าได้ภายใน 30 วันหลังรับสินค้า และซัพพอร์ตเทคนิค 24×7 ลงทะเบียนภายใน 30 วันเพื่อรับบริการด่วน",
    },
    {
      q: "สั่งงานด้วยเสียงได้ไหม?",
      a: "ได้ — M550 Pro และ M550 Max รองรับคำสั่งเสียงแบบไม่ต้องสัมผัส เช่น \"Lock Video\", \"Take Photo\" และ \"Turn on WiFi\" ไมโครโฟนจะเปิดตลอดเวลาที่กำลังบันทึก",
    },
  ],
  vi: [
    {
      q: "Cài đặt M550 Pro thế nào?",
      a: "Hầu hết tài xế lắp xong trong dưới 20 phút. Bóc keo 3M, đặt camera sau gương chiếu hậu, đi dây Type-C dọc theo ốp bằng dụng cụ kèm theo, và cắm vào cổng 12V. Để có chế độ đậu xe 24h, thêm bộ đấu nối điện trực tiếp.",
    },
    {
      q: "Có ghi khi xe đậu không?",
      a: "Có — với bộ đấu nối điện trực tiếp, chế độ đậu xe có bộ đệm ghi lại các giây trước và sau bất kỳ chuyển động hay va chạm nào, đồng thời ngắt khi điện áp thấp để bảo vệ ắc-quy.",
    },
    {
      q: "Nên dùng thẻ microSD nào?",
      a: "Khuyến nghị thẻ độ bền cao Class 10 / U3, 64GB đến 512GB. Thẻ chuyên dụng cho giám sát / dashcam dùng được lâu hơn rất nhiều so với thẻ thường.",
    },
    {
      q: "Có làm hao ắc-quy không?",
      a: "Không. Dây cắm tẩu thuốc kèm theo chỉ cấp điện khi xe đang nổ máy. Bộ đấu nối điện trực tiếp tích hợp ngắt thông minh khi điện áp thấp để bảo vệ ắc-quy trong chế độ đậu xe.",
    },
    {
      q: "Có xem được clip trên điện thoại không?",
      a: "Được. Ghép M550 Pro qua Wi-Fi 5GHz tích hợp bằng app AZDOME miễn phí. Xem, tải và chia sẻ clip 4K nguyên gốc — không cần tháo thẻ.",
    },
    {
      q: "Bảo hành những gì?",
      a: "Mọi camera AZDOME có bảo hành giới hạn 12 tháng cho lỗi sản xuất, đổi trả 30 ngày kể từ ngày giao và hỗ trợ 24×7. Đăng ký sản phẩm trong 30 ngày để được xử lý ưu tiên.",
    },
    {
      q: "Có điều khiển bằng giọng nói không?",
      a: "Có — M550 Pro và M550 Max hỗ trợ lệnh thoại rảnh tay gồm \"Lock Video\", \"Take Photo\" và \"Turn on WiFi\". Micro luôn bật trong khi đang ghi.",
    },
  ],
};

export function getDefaultFaqs(locale: Locale): FAQ[] {
  return FAQS_BY_LOCALE[locale] ?? FAQS_BY_LOCALE.en!;
}

export const DEFAULT_FAQS: FAQ[] = FAQS_BY_LOCALE.en!;
