"use client";

import FaqAccordion from "@/components/FaqAccordion";
import { useLocale } from "@/components/LocaleProvider";
import type { Locale } from "@/lib/i18n/dictionaries";
import type { FAQ } from "@/components/FaqAccordion.data";

// Page-local copy (eyebrow / title / subtitle). Kept here rather than
// in the global dictionary because no other page reuses these strings.
type Copy = { eyebrow: string; title: string; sub: string; section: string; step: string };

const COPY: Partial<Record<Locale, Copy>> = {
  en: { eyebrow: "Troubleshooting", title: "Quick fixes for common issues.", sub: "Try these first. If you're still stuck after 5 minutes, our support team will help — average reply under 2 hours.", section: "Common issues", step: "Step 1" },
  zh: { eyebrow: "故障排查", title: "常见问题的快速解决方案。", sub: "先试试这些。如果 5 分钟后还卡住,联系支持团队 — 平均 2 小时内回复。", section: "常见问题", step: "第 1 步" },
  ja: { eyebrow: "トラブルシューティング", title: "よくある問題のクイック解決法。", sub: "まずはこちらをお試しください。5 分経っても解決しない場合はサポートまで — 平均 2 時間以内に返信します。", section: "よくある問題", step: "ステップ 1" },
  de: { eyebrow: "Fehlerbehebung", title: "Schnelle Lösungen für häufige Probleme.", sub: "Probieren Sie das zuerst. Falls Sie nach 5 Minuten noch feststecken, hilft unser Support-Team — durchschnittliche Antwortzeit unter 2 Stunden.", section: "Häufige Probleme", step: "Schritt 1" },
  fr: { eyebrow: "Dépannage", title: "Solutions rapides aux problèmes courants.", sub: "Essayez ces solutions d'abord. Si vous êtes toujours bloqué après 5 minutes, notre équipe support vous aidera — réponse moyenne en moins de 2 heures.", section: "Problèmes courants", step: "Étape 1" },
  es: { eyebrow: "Solución de problemas", title: "Soluciones rápidas a problemas comunes.", sub: "Prueba esto primero. Si sigues atascado tras 5 minutos, nuestro equipo de soporte te ayudará — respuesta media en menos de 2 horas.", section: "Problemas comunes", step: "Paso 1" },
  it: { eyebrow: "Risoluzione problemi", title: "Soluzioni rapide ai problemi comuni.", sub: "Prova queste prima. Se dopo 5 minuti sei ancora bloccato, il nostro team di assistenza ti aiuterà — tempo medio di risposta inferiore a 2 ore.", section: "Problemi comuni", step: "Passo 1" },
  ru: { eyebrow: "Устранение неполадок", title: "Быстрые решения распространённых проблем.", sub: "Сначала попробуйте это. Если через 5 минут проблема осталась — служба поддержки поможет, среднее время ответа меньше 2 часов.", section: "Частые проблемы", step: "Шаг 1" },
  pl: { eyebrow: "Rozwiązywanie problemów", title: "Szybkie rozwiązania częstych problemów.", sub: "Spróbuj tego najpierw. Jeśli po 5 minutach problem pozostaje, pomoże nasz zespół wsparcia — średni czas odpowiedzi poniżej 2 godzin.", section: "Częste problemy", step: "Krok 1" },
  ro: { eyebrow: "Depanare", title: "Soluții rapide pentru probleme comune.", sub: "Încearcă-le pe acestea mai întâi. Dacă după 5 minute ești încă blocat, echipa de asistență te va ajuta — timp mediu de răspuns sub 2 ore.", section: "Probleme comune", step: "Pasul 1" },
  tr: { eyebrow: "Sorun giderme", title: "Sık karşılaşılan sorunlara hızlı çözümler.", sub: "Önce bunları deneyin. 5 dakika sonra hâlâ sıkıştıysanız destek ekibimiz yardımcı olacak — ortalama yanıt süresi 2 saatten az.", section: "Sık karşılaşılan sorunlar", step: "1. Adım" },
  pt: { eyebrow: "Solução de problemas", title: "Soluções rápidas para problemas comuns.", sub: "Tente isto primeiro. Se ainda estiver travado após 5 minutos, nossa equipe de suporte vai ajudar — resposta média em menos de 2 horas.", section: "Problemas comuns", step: "Passo 1" },
  ar: { eyebrow: "استكشاف الأخطاء", title: "حلول سريعة للمشكلات الشائعة.", sub: "جرّب هذه أولًا. إذا بقيت المشكلة بعد 5 دقائق، سيساعدك فريق الدعم — متوسط الرد أقل من ساعتين.", section: "المشكلات الشائعة", step: "الخطوة 1" },
  th: { eyebrow: "การแก้ปัญหา", title: "วิธีแก้ปัญหาที่พบบ่อยอย่างรวดเร็ว", sub: "ลองสิ่งเหล่านี้ก่อน หากผ่านไป 5 นาทียังติดขัด ทีมงานจะช่วยเหลือ — ตอบกลับเฉลี่ยภายใน 2 ชั่วโมง", section: "ปัญหาที่พบบ่อย", step: "ขั้นตอนที่ 1" },
  vi: { eyebrow: "Khắc phục sự cố", title: "Giải pháp nhanh cho các vấn đề thường gặp.", sub: "Hãy thử trước. Nếu sau 5 phút vẫn vướng, đội hỗ trợ sẽ giúp — thời gian trả lời trung bình dưới 2 giờ.", section: "Vấn đề thường gặp", step: "Bước 1" },
};

// Locale-keyed troubleshoot FAQs. Translated across all 15 supported
// locales; falls back to English when a locale isn't listed.
const TROUBLESHOOT_BY_LOCALE: Partial<Record<Locale, FAQ[]>> = {
  en: [
    { q: "Camera won't power on", a: "Check that the cable is fully seated in both the camera and the 12V port. Try a different USB-C cable. If the issue persists with multiple cables, the fuse may have blown — check your fuse box." },
    { q: "Recording stops mid-trip", a: "Usually an SD card issue. Format the card from inside the AZDOME app or camera settings. If the issue continues, try a different high-endurance SD card (we recommend our 128GB)." },
    { q: "App can't find the camera", a: "Make sure your phone is connected to the camera's 5GHz Wi-Fi network (not your home Wi-Fi). Toggle the camera's Wi-Fi off and on again from settings, then re-pair." },
    { q: "Footage looks blurry at night", a: "Clean the lens with a microfiber cloth. Tinted or dirty windshields can also cut quality. Check that your firmware is up to date — recent updates significantly improve low-light performance." },
    { q: "Parking mode draining battery", a: "The hardwire kit has a low-voltage cutoff. Verify it's wired to the constant-on fuse and not bypassed. Default cutoff is 11.8V — adjust in settings if your battery is older." },
    { q: "Audio not recording", a: "Audio recording can be toggled in settings (it's off by default in some regions for legal reasons). Make sure it's enabled and that the camera firmware is up to date." },
  ],
  zh: [
    { q: "摄像头无法开机", a: "检查电源线是否在摄像头和 12V 接口两端都插紧。换一根 USB-C 线试试。如果换多根线都不行,可能是保险丝烧了,检查保险盒。" },
    { q: "行驶中录像中断", a: "通常是 SD 卡问题。从 AZDOME app 或摄像头设置里格式化卡。如果还不行,换一张高耐久 SD 卡(推荐我们的 128GB)。" },
    { q: "App 找不到摄像头", a: "确认手机连接的是摄像头的 5GHz Wi-Fi(不是家里的 Wi-Fi)。在设置里关闭再打开摄像头 Wi-Fi,然后重新配对。" },
    { q: "夜间画面模糊", a: "用超细纤维布擦镜头。深色或脏的挡风玻璃也会降低画质。检查固件是否最新 — 近期更新大幅改善了低光表现。" },
    { q: "停车模式耗电", a: "降压线套件有低压保护。确认接在常电保险位置且未被绕过。默认 11.8V 切断 — 电瓶较旧可在设置中调整。" },
    { q: "无声音", a: "音频录制可在设置里切换(部分地区因法律默认关闭)。确认已开启并且固件为最新版本。" },
  ],
  ja: [
    { q: "カメラの電源が入らない", a: "ケーブルがカメラと 12V ソケットの両側にしっかり差し込まれているか確認してください。別の USB-C ケーブルを試してください。複数のケーブルでもダメな場合、ヒューズが切れている可能性 — ヒューズボックスを確認。" },
    { q: "走行中に録画が止まる", a: "通常は SD カードの問題です。AZDOME アプリまたはカメラ設定からカードをフォーマットしてください。それでも改善しない場合、別の高耐久 SD カードに交換(128GB を推奨)。" },
    { q: "アプリがカメラを見つけられない", a: "スマホがカメラの 5GHz Wi-Fi(自宅 Wi-Fi ではない)に接続されているか確認。設定からカメラの Wi-Fi をオフ→オンして、再ペアリングしてください。" },
    { q: "夜間映像がぼやける", a: "マイクロファイバークロスでレンズを拭いてください。スモークガラスや汚れたフロントガラスも画質を下げます。ファームウェアが最新か確認 — 近年のアップデートで低照度性能が大幅向上しました。" },
    { q: "駐車モードでバッテリーが減る", a: "ハードワイヤーキットには低電圧カットオフがあります。常時 ON ヒューズに正しく接続され、迂回されていないか確認。デフォルトは 11.8V — 古いバッテリーの場合は設定で調整。" },
    { q: "音声が録音されない", a: "音声録音は設定で切り替えられます(一部地域では法律上デフォルトでオフ)。有効になっており、ファームウェアが最新であることを確認してください。" },
  ],
  de: [
    { q: "Kamera schaltet nicht ein", a: "Prüfen Sie, ob das Kabel an Kamera und 12V-Buchse vollständig steckt. Versuchen Sie ein anderes USB-C-Kabel. Bleibt das Problem bei mehreren Kabeln bestehen, könnte die Sicherung durchgebrannt sein — prüfen Sie den Sicherungskasten." },
    { q: "Aufnahme stoppt während der Fahrt", a: "Meist ein SD-Karten-Problem. Formatieren Sie die Karte in der AZDOME-App oder den Kamera-Einstellungen. Bei anhaltendem Problem eine andere Hochleistungs-SD-Karte verwenden (wir empfehlen unsere 128 GB)." },
    { q: "App findet die Kamera nicht", a: "Stellen Sie sicher, dass Ihr Telefon mit dem 5-GHz-WLAN der Kamera verbunden ist (nicht Ihrem Heim-WLAN). Kamera-WLAN in den Einstellungen aus- und wieder einschalten, dann erneut koppeln." },
    { q: "Aufnahmen bei Nacht unscharf", a: "Reinigen Sie das Objektiv mit einem Mikrofasertuch. Getönte oder schmutzige Scheiben mindern ebenfalls die Qualität. Prüfen Sie, ob die Firmware aktuell ist — neuere Updates verbessern die Nachtsicht erheblich." },
    { q: "Parkmodus entlädt Batterie", a: "Der Festeinbau-Satz hat eine Unterspannungsabschaltung. Stellen Sie sicher, dass er an der Dauerplus-Sicherung angeschlossen und nicht umgangen ist. Standard ist 11,8V — bei älterer Batterie in den Einstellungen anpassen." },
    { q: "Audio wird nicht aufgenommen", a: "Audio-Aufzeichnung kann in den Einstellungen aktiviert werden (in einigen Regionen aus rechtlichen Gründen standardmäßig deaktiviert). Stellen Sie sicher, dass sie aktiviert ist und die Firmware aktuell ist." },
  ],
  fr: [
    { q: "La caméra ne s'allume pas", a: "Vérifiez que le câble est bien enfoncé côté caméra et côté prise 12V. Essayez un autre câble USB-C. Si le problème persiste avec plusieurs câbles, le fusible est peut-être grillé — vérifiez votre boîte à fusibles." },
    { q: "L'enregistrement s'arrête en route", a: "C'est généralement un problème de carte SD. Formatez la carte depuis l'application AZDOME ou les paramètres de la caméra. Si le problème continue, essayez une autre carte haute endurance (nous recommandons notre 128 Go)." },
    { q: "L'application ne trouve pas la caméra", a: "Assurez-vous que votre téléphone est connecté au Wi-Fi 5 GHz de la caméra (pas à votre Wi-Fi domestique). Désactivez puis réactivez le Wi-Fi de la caméra dans les paramètres, puis réappairez." },
    { q: "Images floues la nuit", a: "Nettoyez l'objectif avec un chiffon microfibre. Les pare-brise teintés ou sales réduisent aussi la qualité. Vérifiez que votre firmware est à jour — les mises à jour récentes améliorent considérablement la performance en basse lumière." },
    { q: "Le mode parking décharge la batterie", a: "Le kit d'alimentation a une coupure basse tension. Vérifiez qu'il est branché sur le fusible permanent et non contourné. Coupure par défaut à 11,8V — ajustez dans les paramètres si votre batterie est ancienne." },
    { q: "L'audio n'est pas enregistré", a: "L'enregistrement audio se règle dans les paramètres (désactivé par défaut dans certaines régions pour raisons légales). Vérifiez qu'il est activé et que le firmware est à jour." },
  ],
  es: [
    { q: "La cámara no enciende", a: "Comprueba que el cable esté bien encajado en la cámara y en la toma de 12V. Prueba con otro cable USB-C. Si el problema persiste con varios cables, puede haberse fundido el fusible — revisa la caja de fusibles." },
    { q: "La grabación se detiene en marcha", a: "Suele ser un problema de tarjeta SD. Formatea la tarjeta desde la app AZDOME o los ajustes de la cámara. Si el problema continúa, prueba con otra tarjeta de alta resistencia (recomendamos la nuestra de 128 GB)." },
    { q: "La app no encuentra la cámara", a: "Asegúrate de que tu móvil está conectado al Wi-Fi 5 GHz de la cámara (no al de tu casa). Apaga y vuelve a encender el Wi-Fi de la cámara en los ajustes y vuelve a emparejar." },
    { q: "Vídeo borroso de noche", a: "Limpia el objetivo con un paño de microfibra. Los parabrisas tintados o sucios también reducen la calidad. Comprueba que el firmware esté al día — las últimas actualizaciones mejoran mucho el rendimiento con poca luz." },
    { q: "El modo aparcamiento descarga la batería", a: "El kit de alimentación directa tiene corte de baja tensión. Verifica que está conectado al fusible permanente y no en bypass. Por defecto corta a 11,8V — ajústalo en los ajustes si la batería es antigua." },
    { q: "No graba audio", a: "La grabación de audio se activa en los ajustes (desactivada por defecto en algunas regiones por motivos legales). Comprueba que está activada y que el firmware está al día." },
  ],
  it: [
    { q: "La telecamera non si accende", a: "Verifica che il cavo sia inserito correttamente sia nella telecamera sia nella presa 12V. Prova un altro cavo USB-C. Se il problema persiste con più cavi, potrebbe essersi bruciato il fusibile — controlla la centralina." },
    { q: "La registrazione si interrompe in viaggio", a: "Di solito è un problema di scheda SD. Formatta la scheda dall'app AZDOME o dalle impostazioni della telecamera. Se il problema continua, prova un'altra scheda ad alta resistenza (consigliamo la nostra 128 GB)." },
    { q: "L'app non trova la telecamera", a: "Assicurati che il telefono sia collegato al Wi-Fi 5 GHz della telecamera (non al Wi-Fi di casa). Disattiva e riattiva il Wi-Fi della telecamera dalle impostazioni e ri-accoppia." },
    { q: "Immagini sfocate di notte", a: "Pulisci l'obiettivo con un panno in microfibra. Parabrezza oscurati o sporchi riducono la qualità. Verifica che il firmware sia aggiornato — gli aggiornamenti recenti migliorano molto le riprese in scarsa luce." },
    { q: "La modalità parcheggio scarica la batteria", a: "Il kit di alimentazione fissa ha un cutoff a bassa tensione. Verifica che sia collegato al fusibile permanente e non bypassato. Default 11,8V — regolalo nelle impostazioni se la batteria è vecchia." },
    { q: "L'audio non viene registrato", a: "La registrazione audio si attiva nelle impostazioni (in alcune regioni è disattivata per motivi legali). Verifica che sia abilitata e che il firmware sia aggiornato." },
  ],
  ru: [
    { q: "Камера не включается", a: "Убедитесь, что кабель полностью вставлен в камеру и в гнездо 12V. Попробуйте другой кабель USB-C. Если с несколькими кабелями проблема остаётся, мог сгореть предохранитель — проверьте блок." },
    { q: "Запись прерывается на ходу", a: "Обычно проблема с SD-картой. Отформатируйте карту через приложение AZDOME или настройки камеры. Если не помогло — попробуйте другую карту повышенной выносливости (рекомендуем нашу 128 ГБ)." },
    { q: "Приложение не видит камеру", a: "Убедитесь, что телефон подключён к Wi-Fi 5 ГГц камеры (а не к домашней сети). Выключите и снова включите Wi-Fi камеры в настройках, затем переподключите." },
    { q: "Размытые ночные кадры", a: "Протрите объектив салфеткой из микрофибры. Тонированные или грязные стёкла тоже снижают качество. Проверьте, обновлена ли прошивка — последние обновления значительно улучшают съёмку в темноте." },
    { q: "Парковочный режим садит АКБ", a: "Hardwire-комплект имеет отключение по низкому напряжению. Проверьте, подключён ли он к постоянной шине и не обойдён. По умолчанию 11,8V — в настройках можно поднять, если АКБ старая." },
    { q: "Аудио не пишется", a: "Запись звука включается в настройках (в некоторых регионах выключена по умолчанию по юридическим причинам). Убедитесь, что включена и прошивка обновлена." },
  ],
  pl: [
    { q: "Kamera nie włącza się", a: "Sprawdź, czy kabel jest do końca wpięty w kamerę i gniazdo 12V. Spróbuj innego kabla USB-C. Jeśli problem występuje z wieloma kablami, mógł przepalić się bezpiecznik — sprawdź skrzynkę bezpieczników." },
    { q: "Nagrywanie zatrzymuje się w trasie", a: "Zwykle problem z kartą SD. Sformatuj kartę z poziomu aplikacji AZDOME lub ustawień kamery. Jeśli problem trwa, użyj innej karty o wysokiej wytrzymałości (polecamy naszą 128 GB)." },
    { q: "Aplikacja nie znajduje kamery", a: "Upewnij się, że telefon jest połączony z Wi-Fi 5 GHz kamery (nie domowym). Wyłącz i ponownie włącz Wi-Fi kamery w ustawieniach, potem ponów parowanie." },
    { q: "Rozmyty obraz w nocy", a: "Wyczyść obiektyw ściereczką z mikrofibry. Przyciemniana lub brudna szyba też pogarsza jakość. Sprawdź, czy firmware jest aktualne — ostatnie aktualizacje znacząco poprawiają tryb słabego oświetlenia." },
    { q: "Tryb parkowania rozładowuje akumulator", a: "Zestaw hardwire ma odcięcie niskiego napięcia. Sprawdź, czy podpięty jest do stałego bezpiecznika i nie omija obwodu. Domyślnie 11,8V — przy starszym akumulatorze podnieś w ustawieniach." },
    { q: "Brak nagrywania dźwięku", a: "Nagrywanie dźwięku można włączyć w ustawieniach (w niektórych regionach domyślnie wyłączone ze względów prawnych). Upewnij się, że jest włączone i że firmware jest aktualne." },
  ],
  ro: [
    { q: "Camera nu pornește", a: "Verifică dacă cablul este complet introdus și în cameră și în priza de 12V. Încearcă alt cablu USB-C. Dacă problema persistă cu mai multe cabluri, posibil să se fi ars siguranța — verifică panoul." },
    { q: "Înregistrarea se oprește în timpul drumului", a: "De obicei o problemă cu cardul SD. Formatează cardul din aplicația AZDOME sau setările camerei. Dacă problema continuă, încearcă alt card de înaltă rezistență (recomandăm 128 GB)." },
    { q: "Aplicația nu găsește camera", a: "Asigură-te că telefonul este conectat la Wi-Fi 5 GHz al camerei (nu la cel de acasă). Oprește și reactivează Wi-Fi-ul camerei din setări, apoi reasociază." },
    { q: "Imagine neclară noaptea", a: "Curăță obiectivul cu o lavetă de microfibră. Parbrize fumurii sau murdare reduc calitatea. Verifică dacă firmware-ul este actualizat — actualizările recente îmbunătățesc semnificativ performanța în lumină slabă." },
    { q: "Modul parcare descarcă bateria", a: "Kit-ul hardwire are întrerupere la tensiune scăzută. Verifică să fie conectat pe siguranța permanentă și să nu fie bypass. Implicit 11,8V — ajustează în setări dacă bateria e veche." },
    { q: "Nu se înregistrează audio", a: "Înregistrarea audio se activează din setări (dezactivată implicit în unele regiuni din motive legale). Asigură-te că e activă și că firmware-ul este actualizat." },
  ],
  tr: [
    { q: "Kamera açılmıyor", a: "Kablonun hem kameraya hem de 12V soketine tam oturduğunu kontrol edin. Farklı bir USB-C kablo deneyin. Birden fazla kabloyla sorun devam ediyorsa sigorta atmış olabilir — sigorta kutusunu kontrol edin." },
    { q: "Yolda kayıt duruyor", a: "Genellikle SD kart sorunu. AZDOME uygulamasından veya kamera ayarlarından kartı biçimlendirin. Sorun devam ederse farklı yüksek dayanıklı bir SD kart deneyin (128 GB öneriyoruz)." },
    { q: "Uygulama kamerayı bulamıyor", a: "Telefonunuzun kameranın 5 GHz Wi-Fi'sine bağlı olduğundan emin olun (ev Wi-Fi'sine değil). Ayarlardan kameranın Wi-Fi'sini kapatıp açın, ardından yeniden eşleştirin." },
    { q: "Geceleri görüntü bulanık", a: "Lensi mikrofiber bezle silin. Filmli veya kirli ön cam da kaliteyi düşürür. Yazılımın güncel olduğundan emin olun — son güncellemeler düşük ışık performansını önemli ölçüde iyileştirir." },
    { q: "Park modu aküyü bitiriyor", a: "Hardwire kit'inin düşük voltaj kesicisi var. Devamlı (+) sigortaya bağlı ve baypas edilmemiş olduğundan emin olun. Varsayılan 11,8V — eski akülerde ayarlardan yükseltin." },
    { q: "Ses kaydedilmiyor", a: "Ses kaydı ayarlardan açılır (bazı bölgelerde yasal sebeplerle varsayılan olarak kapalı). Etkin olduğundan ve yazılımın güncel olduğundan emin olun." },
  ],
  pt: [
    { q: "A câmera não liga", a: "Verifique se o cabo está totalmente encaixado na câmera e na tomada 12V. Tente outro cabo USB-C. Se o problema persistir com vários cabos, o fusível pode ter queimado — verifique a caixa de fusíveis." },
    { q: "Gravação para no meio do trajeto", a: "Normalmente é problema do cartão SD. Formate o cartão pelo app AZDOME ou nas configurações da câmera. Se continuar, troque por outro cartão de alta durabilidade (recomendamos nosso 128 GB)." },
    { q: "O app não encontra a câmera", a: "Confirme que o celular está conectado ao Wi-Fi 5 GHz da câmera (não ao Wi-Fi de casa). Desligue e religue o Wi-Fi da câmera nas configurações e pareie novamente." },
    { q: "Imagem desfocada à noite", a: "Limpe a lente com pano de microfibra. Vidros insulfilmados ou sujos reduzem a qualidade. Verifique se o firmware está atualizado — atualizações recentes melhoram muito a visão noturna." },
    { q: "Modo estacionamento descarrega a bateria", a: "O kit hardwire tem corte de baixa tensão. Verifique se está ligado ao fusível permanente e não em bypass. Padrão 11,8V — ajuste nas configurações se a bateria for antiga." },
    { q: "Áudio não está gravando", a: "A gravação de áudio é ativada nas configurações (desativada por padrão em algumas regiões por motivos legais). Confirme que está ativa e o firmware atualizado." },
  ],
  ar: [
    { q: "الكاميرا لا تعمل", a: "تأكد من أن الكابل مثبّت بالكامل في الكاميرا وفي منفذ 12V. جرّب كابل USB-C آخر. إذا استمرت المشكلة مع عدة كابلات، فقد يكون الفيوز قد احترق — افحص صندوق الفيوزات." },
    { q: "التسجيل يتوقف أثناء الرحلة", a: "غالبًا مشكلة في بطاقة SD. هيّئ البطاقة من تطبيق AZDOME أو من إعدادات الكاميرا. إذا استمرت، جرّب بطاقة عالية التحمّل أخرى (نوصي بـ 128GB من علامتنا)." },
    { q: "التطبيق لا يجد الكاميرا", a: "تأكد من اتصال هاتفك بشبكة Wi-Fi 5GHz الخاصة بالكاميرا (وليس شبكة المنزل). أوقف Wi-Fi الكاميرا من الإعدادات ثم شغّله وأعد الإقران." },
    { q: "اللقطات الليلية مشوشة", a: "نظّف العدسة بقطعة قماش من الألياف الدقيقة. الزجاج الملوّن أو المتسخ يقلل الجودة أيضًا. تأكد من تحديث البرنامج الثابت — التحديثات الأخيرة تحسّن الأداء في الإضاءة المنخفضة." },
    { q: "وضع الوقوف يستهلك البطارية", a: "عُدّة التوصيل المباشر تحتوي على قاطع جهد منخفض. تأكد من توصيلها بفيوز الإمداد المستمر ودون تجاوز. الإعداد الافتراضي 11.8V — اضبطه في الإعدادات إذا كانت البطارية قديمة." },
    { q: "الصوت لا يُسجَّل", a: "يمكن تفعيل تسجيل الصوت من الإعدادات (مغلَق افتراضيًا في بعض المناطق لأسباب قانونية). تأكد من تفعيله ومن تحديث البرنامج الثابت." },
  ],
  th: [
    { q: "กล้องเปิดไม่ติด", a: "ตรวจว่าสายเสียบสุดทั้งฝั่งกล้องและช่อง 12V ลองสาย USB-C อันอื่น ถ้ายังไม่ได้แม้เปลี่ยนหลายสาย อาจฟิวส์ขาด — เช็กกล่องฟิวส์" },
    { q: "บันทึกหยุดกลางคัน", a: "มักเป็นปัญหาที่การ์ด SD ฟอร์แมตการ์ดจากแอป AZDOME หรือเมนูตั้งค่ากล้อง ถ้ายังไม่หาย ลองเปลี่ยนการ์ดความทนสูง (แนะนำของเรา 128GB)" },
    { q: "แอปหากล้องไม่เจอ", a: "ตรวจสอบว่าโทรศัพท์เชื่อม Wi-Fi 5GHz ของกล้อง (ไม่ใช่ Wi-Fi บ้าน) ปิด-เปิด Wi-Fi กล้องในเมนูตั้งค่า แล้วจับคู่ใหม่" },
    { q: "ภาพกลางคืนเบลอ", a: "เช็ดเลนส์ด้วยผ้าไมโครไฟเบอร์ กระจกฟิล์มเข้มหรือสกปรกก็ลดคุณภาพ ตรวจว่าเฟิร์มแวร์เป็นเวอร์ชั่นล่าสุด — อัปเดตล่าสุดช่วยปรับปรุงในที่แสงน้อยมาก" },
    { q: "โหมดจอดทำให้แบตหมด", a: "ชุดสายตรงมีระบบตัดไฟแรงดันต่ำ ตรวจว่าต่อกับฟิวส์ไฟตลอดและไม่ข้ามวงจร ค่าเริ่มต้น 11.8V — ปรับเพิ่มในเมนูถ้าแบตเก่า" },
    { q: "ไม่บันทึกเสียง", a: "เปิด/ปิดเสียงในเมนูตั้งค่า (บางภูมิภาคปิดเป็นค่าเริ่มต้นตามกฎหมาย) ตรวจให้แน่ใจว่าเปิด และเฟิร์มแวร์เป็นรุ่นล่าสุด" },
  ],
  vi: [
    { q: "Camera không lên", a: "Kiểm tra dây cắm chặt cả phía camera và cổng 12V. Thử dây USB-C khác. Nếu nhiều dây vẫn không được, có thể cầu chì đứt — kiểm tra hộp cầu chì." },
    { q: "Đang chạy ghi hình dừng", a: "Thường là vấn đề thẻ SD. Format thẻ trong app AZDOME hoặc cài đặt camera. Nếu vẫn lỗi, thử thẻ độ bền cao khác (khuyên dùng 128GB của chúng tôi)." },
    { q: "App không tìm thấy camera", a: "Đảm bảo điện thoại đã kết nối Wi-Fi 5GHz của camera (không phải Wi-Fi nhà). Tắt rồi bật lại Wi-Fi camera trong cài đặt, ghép lại." },
    { q: "Hình ban đêm bị mờ", a: "Lau ống kính bằng khăn microfiber. Kính dán film hoặc bẩn cũng làm giảm chất lượng. Cập nhật firmware — các bản mới cải thiện rất nhiều khả năng chụp thiếu sáng." },
    { q: "Chế độ đậu xe làm hao ắc-quy", a: "Bộ đấu nối điện có ngắt khi điện áp thấp. Kiểm tra đã đấu vào cầu chì luôn có điện và không bị bypass. Mặc định 11,8V — chỉnh trong cài đặt nếu ắc-quy đã cũ." },
    { q: "Không thu được tiếng", a: "Bật ghi âm trong cài đặt (một số khu vực mặc định tắt vì lý do pháp lý). Đảm bảo đã bật và firmware mới nhất." },
  ],
};

export default function TroubleshootPage() {
  const { locale } = useLocale();
  const copy = COPY[locale] ?? COPY.en!;
  const faqs = TROUBLESHOOT_BY_LOCALE[locale] ?? TROUBLESHOOT_BY_LOCALE.en!;

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-3xl px-6 pt-32 md:pt-40 lg:px-10">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-blue-600">
          {copy.eyebrow}
        </p>
        <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          {copy.title}
        </h1>
        <p className="mt-5 text-base leading-relaxed text-slate-500 md:text-lg">
          {copy.sub}
        </p>
      </div>
      <FaqAccordion faqs={faqs} title={copy.section} eyebrow={copy.step} />
    </main>
  );
}
