import React, { createContext, useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

export const LanguageContext = createContext();

export const translations = {
  en: {
    // Nav
    navHome: "Home", navLighthouse: "Lighthouse", navGitHub: "GitHub Scanner",
    navSignIn: "Sign in", navStartFree: "Start free", navProfile: "Profile", navSignOut: "Sign out",

    // Banner & Hero
    bannerText: "New to Web Scanner? Get a free performance audit and identify critical issues in seconds.",
    bannerCta: "Scan now ↓",
    heroTitleLine1: "Stand out",
    heroTitleLine2: "with Web Scanner",
    heroSubtext: "Whatever your performance goal, identify slow load times, SEO gaps, security risks, and accessibility issues instantly.",
    startNow: "Start now",
    runFreeAudit: "Run a free audit",
    lighthousePowered: "Lighthouse powered",
    sslVerified: "SSL verified",
    realTimeResults: "Real-time results",

    // Scanner Form Card
    liveAuditorEngine: "Live Auditor Engine",
    enterDetailsToAnalyze: "Enter details to analyze all core scores",
    websiteUrlLabel: "Website URL",
    emailAddressLabel: "Email address",
    scanRepoBtn: "Scan Repository →",

    // Stats Bar
    maxPerfScore: "Max performance score",
    avgSpeedIndex: "Average speed index",
    wcagStandard: "Accessibility standard",
    sslRating: "SSL security rating",

    // Features Section
    whatWeAudit: "What we audit",
    featuresMainTitle: "Everything your website needs to rank and convert",
    performance: "Performance",
    performanceDesc: "Core Web Vitals, LCP, FID, CLS and full Lighthouse performance score with actionable tips.",
    seo: "SEO Analysis",
    seoDesc: "Meta tags, heading structure, sitemap validation, canonical URLs and search visibility audit.",
    security: "Security & SSL",
    securityDesc: "HTTPS validation, mixed content check, security headers and vulnerability scanning.",
    accessibility: "Accessibility",
    accessibilityDesc: "WCAG 2.1 compliance, ARIA labels, color contrast ratios and keyboard navigation testing.",
    mobile: "Mobile Audit",
    mobileDesc: "Responsive design check, mobile usability score and viewport configuration review.",
    aiSuggestions: "AI Suggestions",
    aiSuggestionsDesc: "Smart recommendations prioritized by impact so you fix what matters most first.",

    // Footer
    footerAbout: "Analyze and improve your website's performance with our comprehensive tools.",
    footerQuickLinks: "Quick Links", footerContactTitle: "Contact",
    footerContactText: "Have questions? Reach out to us for support and inquiries.",
    footerContactBtn: "Contact Us", footerRights: "Web Scanner. All rights reserved.",

    // Auth
    signInTitle: "Sign in", signInSubtitle: "to continue to Web Scanner",
    createAccountTitle: "Create account", createAccountSubtitle: "to get started with Web Scanner",
    usernameLabel: "Username", emailLabel: "Email address", passwordLabel: "Password",
    confirmPasswordLabel: "Confirm password", forgotPasswordLink: "Forgot password?",
    dontHaveAccount: "Don't have an account?", alreadyHaveAccount: "Already have an account?",

    // Lighthouse & Contact
    lighthouseNoData: "No Analysis Data Found", lighthouseBack: "Back to Home",
    lighthouseBackShort: "Back", lighthouseAnalysis: "Analysis Results",
    lighthouseContactMe: "Contact Me", lighthouseOverallScore: "Overall Score",
    contactUs: "Contact Us", contactHeading: "We'd love to hear from you!",
    contactName: "Name", contactEmail: "Email", contactMessage: "Message",
    contactSend: "Send Message", contactSending: "Sending...",
  },

  de: {
    navHome: "Startseite", navLighthouse: "Lighthouse", navGitHub: "GitHub-Scanner",
    navSignIn: "Anmelden", navStartFree: "Kostenlos starten", navProfile: "Profil", navSignOut: "Abmelden",

    bannerText: "Neu bei Web Scanner? Erhalten Sie in Sekunden ein kostenloses Leistungs-Audit.",
    bannerCta: "Jetzt scannen ↓",
    heroTitleLine1: "Heben Sie sich ab",
    heroTitleLine2: "mit Web Scanner",
    heroSubtext: "Identifizieren Sie langsame Ladezeiten, SEO-Lücken, Sicherheitsrisiken und Barrierefreiheit im Handumdrehen.",
    startNow: "Jetzt starten",
    runFreeAudit: "Kostenloses Audit",
    lighthousePowered: "Lighthouse-gestützt",
    sslVerified: "SSL-verifiziert",
    realTimeResults: "Echtzeit-Ergebnisse",

    liveAuditorEngine: "Live-Auditor-Engine",
    enterDetailsToAnalyze: "Geben Sie Details ein, um alle Ergebnisse zu analysieren",
    websiteUrlLabel: "Website-URL",
    emailAddressLabel: "E-Mail-Adresse",
    scanRepoBtn: "Repository scannen →",

    maxPerfScore: "Max. Leistungspunktzahl",
    avgSpeedIndex: "Durchschnittlicher Geschwindigkeitsindex",
    wcagStandard: "Barrierefreiheitsstandard",
    sslRating: "SSL-Sicherheitsbewertung",

    whatWeAudit: "Was wir prüfen",
    featuresMainTitle: "Alles, was Ihre Website braucht, um zu ranken und zu konvertieren",
    performance: "Leistung",
    performanceDesc: "Core Web Vitals, LCP, FID, CLS und vollständige Lighthouse-Leistungsbewertung.",
    seo: "SEO-Analyse",
    seoDesc: "Meta-Tags, Überschriftenstruktur, Sitemap-Validierung und Suchbarkeits-Audit.",
    security: "Sicherheit & SSL",
    securityDesc: "HTTPS-Validierung, Mixed-Content-Prüfung, Sicherheitsheader und Schwachstellenscan.",
    accessibility: "Barrierefreiheit",
    accessibilityDesc: "WCAG 2.1-Konformität, ARIA-Labels, Farbkontrastverhältnisse und Tastaturnavigation.",
    mobile: "Mobil-Audit",
    mobileDesc: "Prüfung des responsiven Designs, mobile Benutzerfreundlichkeit und Viewport-Überprüfung.",
    aiSuggestions: "KI-Vorschläge",
    aiSuggestionsDesc: "Intelligente Empfehlungen, priorisiert nach Auswirkung.",

    footerAbout: "Analysieren und verbessern Sie die Leistung Ihrer Website mit unseren Tools.",
    footerQuickLinks: "Schnelllinks", footerContactTitle: "Kontakt",
    footerContactText: "Haben Sie Fragen? Kontaktieren Sie uns für Support.",
    footerContactBtn: "Kontaktieren Sie uns", footerRights: "Web Scanner. Alle Rechte vorbehalten.",

    signInTitle: "Anmelden", signInSubtitle: "um mit Web Scanner fortzufahren",
    createAccountTitle: "Konto erstellen", createAccountSubtitle: "um mit Web Scanner zu starten",
    usernameLabel: "Benutzername", emailLabel: "E-Mail-Adresse", passwordLabel: "Passwort",
    confirmPasswordLabel: "Passwort bestätigen", forgotPasswordLink: "Passwort vergessen?",
    dontHaveAccount: "Noch kein Konto?", alreadyHaveAccount: "Bereits ein Konto?",

    lighthouseNoData: "Keine Analysedaten gefunden", lighthouseBack: "Zurück zur Startseite",
    lighthouseBackShort: "Zurück", lighthouseAnalysis: "Analyseergebnisse",
    lighthouseContactMe: "Kontaktiere mich", lighthouseOverallScore: "Gesamtpunktzahl",
    contactUs: "Kontaktieren Sie uns", contactHeading: "Wir würden gerne von Ihnen hören!",
    contactName: "Name", contactEmail: "E-Mail", contactMessage: "Nachricht",
    contactSend: "Nachricht senden", contactSending: "Senden...",
  },

  es: {
    navHome: "Inicio", navLighthouse: "Lighthouse", navGitHub: "Escáner GitHub",
    navSignIn: "Iniciar sesión", navStartFree: "Empezar gratis", navProfile: "Perfil", navSignOut: "Cerrar sesión",

    bannerText: "¿Nuevo en Web Scanner? Obtén una auditoría de rendimiento gratuita en segundos.",
    bannerCta: "Escanear ahora ↓",
    heroTitleLine1: "Destaca",
    heroTitleLine2: "con Web Scanner",
    heroSubtext: "Identifica tiempos de carga lentos, brechas de SEO, riesgos de seguridad y problemas de accesibilidad al instante.",
    startNow: "Empezar ahora",
    runFreeAudit: "Auditoría gratuita",
    lighthousePowered: "Impulsado por Lighthouse",
    sslVerified: "SSL verificado",
    realTimeResults: "Resultados en tiempo real",

    liveAuditorEngine: "Motor de Auditoría en Vivo",
    enterDetailsToAnalyze: "Introduce los datos para analizar todas las puntuaciones",
    websiteUrlLabel: "URL del sitio web",
    emailAddressLabel: "Correo electrónico",
    scanRepoBtn: "Escanear repositorio →",

    maxPerfScore: "Puntuación máxima de rendimiento",
    avgSpeedIndex: "Índice de velocidad promedio",
    wcagStandard: "Estándar de accesibilidad",
    sslRating: "Calificación de seguridad SSL",

    whatWeAudit: "Lo que auditamos",
    featuresMainTitle: "Todo lo que tu sitio web necesita para posicionarse y convertir",
    performance: "Rendimiento",
    performanceDesc: "Core Web Vitals, LCP, FID, CLS y puntuación completa de Lighthouse.",
    seo: "Análisis SEO",
    seoDesc: "Etiquetas meta, estructura de encabezados, validación de sitemap y auditoría de visibilidad.",
    security: "Seguridad y SSL",
    securityDesc: "Validación HTTPS, verificación de contenido mixto, encabezados de seguridad y escaneo de vulnerabilidades.",
    accessibility: "Accesibilidad",
    accessibilityDesc: "Cumplimiento de WCAG 2.1, etiquetas ARIA, contraste de color y navegación por teclado.",
    mobile: "Auditoría Móvil",
    mobileDesc: "Prueba de diseño responsivo, usabilidad móvil y revisión de viewport.",
    aiSuggestions: "Sugerencias IA",
    aiSuggestionsDesc: "Recomendaciones inteligentes priorizadas por impacto.",

    footerAbout: "Analice y mejore el rendimiento de su sitio web con nuestras herramientas.",
    footerQuickLinks: "Enlaces rápidos", footerContactTitle: "Contacto",
    footerContactText: "¿Tiene preguntas? Contáctenos.",
    footerContactBtn: "Contáctenos", footerRights: "Web Scanner. Todos los derechos reservados.",

    signInTitle: "Iniciar sesión", signInSubtitle: "para continuar a Web Scanner",
    createAccountTitle: "Crear cuenta", createAccountSubtitle: "para comenzar con Web Scanner",
    usernameLabel: "Nombre de usuario", emailLabel: "Correo electrónico", passwordLabel: "Contraseña",
    confirmPasswordLabel: "Confirmar contraseña", forgotPasswordLink: "¿Olvidaste tu contraseña?",
    dontHaveAccount: "¿No tienes una cuenta?", alreadyHaveAccount: "¿Ya tienes una cuenta?",

    lighthouseNoData: "No se encontraron datos de análisis", lighthouseBack: "Volver al inicio",
    lighthouseBackShort: "Volver", lighthouseAnalysis: "Resultados del análisis",
    lighthouseContactMe: "Contáctame", lighthouseOverallScore: "Puntuación general",
    contactUs: "Contáctenos", contactHeading: "¡Nos encantaría saber de ti!",
    contactName: "Nombre", contactEmail: "Correo", contactMessage: "Mensaje",
    contactSend: "Enviar mensaje", contactSending: "Enviando...",
  },

  fr: {
    navHome: "Accueil", navLighthouse: "Lighthouse", navGitHub: "Scanner GitHub",
    navSignIn: "Se connecter", navStartFree: "Démarrer gratuitement", navProfile: "Profil", navSignOut: "Se déconnecter",

    bannerText: "Nouveau sur Web Scanner ? Obtenez un audit de performance gratuit en quelques secondes.",
    bannerCta: "Scanner maintenant ↓",
    heroTitleLine1: "Démarquez-vous",
    heroTitleLine2: "avec Web Scanner",
    heroSubtext: "Identifiez instantanément les temps de chargement lents, les lacunes SEO, les risques de sécurité et l'accessibilité.",
    startNow: "Démarrer",
    runFreeAudit: "Audit gratuit",
    lighthousePowered: "Propulsé par Lighthouse",
    sslVerified: "SSL vérifié",
    realTimeResults: "Résultats en temps réel",

    liveAuditorEngine: "Moteur d'Audit en Direct",
    enterDetailsToAnalyze: "Entrez vos informations pour analyser tous les scores",
    websiteUrlLabel: "URL du site Web",
    emailAddressLabel: "Adresse email",
    scanRepoBtn: "Scanner le dépôt →",

    maxPerfScore: "Score de performance max",
    avgSpeedIndex: "Indice de vitesse moyen",
    wcagStandard: "Norme d'accessibilité",
    sslRating: "Note de sécurité SSL",

    whatWeAudit: "Ce que nous auditons",
    featuresMainTitle: "Tout ce dont votre site Web a besoin pour se positionner et convertir",
    performance: "Performance",
    performanceDesc: "Core Web Vitals, LCP, FID, CLS et score de performance Lighthouse complet.",
    seo: "Analyse SEO",
    seoDesc: "Balises méta, structure des titres, validation du sitemap et audit de visibilité.",
    security: "Sécurité & SSL",
    securityDesc: "Validation HTTPS, vérification du contenu mixte, en-têtes de sécurité et analyse de vulnérabilité.",
    accessibility: "Accessibilité",
    accessibilityDesc: "Conformité WCAG 2.1, étiquettes ARIA, ratios de contraste et navigation au clavier.",
    mobile: "Audit Mobile",
    mobileDesc: "Vérification du design adaptatif, usabilité mobile et revue du viewport.",
    aiSuggestions: "Suggestions IA",
    aiSuggestionsDesc: "Recommandations intelligentes priorisées par impact.",

    footerAbout: "Analysez et améliorez les performances de votre site Web avec nos outils.",
    footerQuickLinks: "Liens rapides", footerContactTitle: "Contact",
    footerContactText: "Des questions ? Contactez-nous.",
    footerContactBtn: "Nous contacter", footerRights: "Web Scanner. Tous droits réservés.",

    signInTitle: "Se connecter", signInSubtitle: "pour continuer sur Web Scanner",
    createAccountTitle: "Créer un compte", createAccountSubtitle: "pour commencer avec Web Scanner",
    usernameLabel: "Nom d'utilisateur", emailLabel: "Adresse email", passwordLabel: "Mot de passe",
    confirmPasswordLabel: "Confirmer le mot de passe", forgotPasswordLink: "Mot de passe oublié ?",
    dontHaveAccount: "Pas encore de compte ?", alreadyHaveAccount: "Déjà un compte ?",

    lighthouseNoData: "Aucune donnée d'analyse trouvée", lighthouseBack: "Retour à l'accueil",
    lighthouseBackShort: "Retour", lighthouseAnalysis: "Résultats de l'analyse",
    lighthouseContactMe: "Contactez-moi", lighthouseOverallScore: "Score global",
    contactUs: "Nous contacter", contactHeading: "Nous serions ravis d'avoir de vos nouvelles!",
    contactName: "Nom", contactEmail: "Email", contactMessage: "Message",
    contactSend: "Envoyer le message", contactSending: "Envoi...",
  },

  ja: {
    navHome: "ホーム", navLighthouse: "Lighthouse", navGitHub: "GitHubスキャナー",
    navSignIn: "サインイン", navStartFree: "無料で始める", navProfile: "プロフィール", navSignOut: "サインアウト",

    bannerText: "Web Scannerは初めてですか？無料のパフォーマンス監査を数秒で取得できます。",
    bannerCta: "今すぐスキャン ↓",
    heroTitleLine1: "ウェブサイトを差別化",
    heroTitleLine2: "Web Scannerで",
    heroSubtext: "ロード速度の低下、SEOの課題、セキュリティリスク、アクセシビリティの問題を即座に特定します。",
    startNow: "今すぐ開始",
    runFreeAudit: "無料監査を実行",
    lighthousePowered: "Lighthouse搭載",
    sslVerified: "SSL検証済み",
    realTimeResults: "リアルタイム結果",

    liveAuditorEngine: "ライブ監査エンジン",
    enterDetailsToAnalyze: "すべてのコアスコアを分析するための詳細を入力してください",
    websiteUrlLabel: "ウェブサイトURL",
    emailAddressLabel: "メールアドレス",
    scanRepoBtn: "リポジトリをスキャン →",

    maxPerfScore: "最高パフォーマンススコア",
    avgSpeedIndex: "平均スピードインデックス",
    wcagStandard: "アクセシビリティ標準",
    sslRating: "SSLセキュリティレーティング",

    whatWeAudit: "監査項目",
    featuresMainTitle: "ランクインとコンバージョンに必要なすべてを診断",
    performance: "パフォーマンス",
    performanceDesc: "Core Web Vitals、LCP、FID、CLSおよびLighthouse全体のパフォーマンススコア。",
    seo: "SEO分析",
    seoDesc: "メタタグ、見出し構造、サイトマップ検証、検索表示監査。",
    security: "セキュリティ＆SSL",
    securityDesc: "HTTPS検証、混在コンテンツチェック、セキュリティヘッダー、脆弱性スキャン。",
    accessibility: "アクセシビリティ",
    accessibilityDesc: "WCAG 2.1準拠、ARIAラベル、色のコントラスト比、キーボードナビゲーション。",
    mobile: "モバイル監査",
    mobileDesc: "レスポンシブデザインチェック、モバイル操作性スコア、ビューポートレビュー。",
    aiSuggestions: "AIアドバイス",
    aiSuggestionsDesc: "影響度順に優先順位付けされたスマートな推奨事項。",

    footerAbout: "当社の包括的なツールでウェブサイトのパフォーマンスを分析および改善します。",
    footerQuickLinks: "クイックリンク", footerContactTitle: "連絡先",
    footerContactText: "ご質問がありますか？サポートやお問い合わせはこちらから。",
    footerContactBtn: "お問い合わせ", footerRights: "Web Scanner. 無断複写・転載を禁じます。",

    signInTitle: "サインイン", signInSubtitle: "Web Scannerを継続利用",
    createAccountTitle: "アカウント作成", createAccountSubtitle: "Web Scannerを開始する",
    usernameLabel: "ユーザー名", emailLabel: "メールアドレス", passwordLabel: "パスワード",
    confirmPasswordLabel: "パスワード確認", forgotPasswordLink: "パスワードをお忘れですか？",
    dontHaveAccount: "アカウントをお持ちでないですか？", alreadyHaveAccount: "すでにアカウントをお持ちですか？",

    lighthouseNoData: "分析データが見つかりません", lighthouseBack: "ホームに戻る",
    lighthouseBackShort: "戻る", lighthouseAnalysis: "分析結果",
    lighthouseContactMe: "お問い合わせ", lighthouseOverallScore: "総合スコア",
    contactUs: "お問い合わせ", contactHeading: "ぜひご連絡ください！",
    contactName: "お名前", contactEmail: "メール", contactMessage: "メッセージ",
    contactSend: "送信", contactSending: "送信中...",
  },

  pt: {
    navHome: "Início", navLighthouse: "Lighthouse", navGitHub: "Escâner GitHub",
    navSignIn: "Entrar", navStartFree: "Começar grátis", navProfile: "Perfil", navSignOut: "Sair",

    bannerText: "Novo no Web Scanner? Obtenha uma auditoria de desempenho gratuita em segundos.",
    bannerCta: "Escanear agora ↓",
    heroTitleLine1: "Destaque-se",
    heroTitleLine2: "com Web Scanner",
    heroSubtext: "Identifique tempos de carregamento lentos, lacunas de SEO, riscos de segurança e acessibilidade instantaneamente.",
    startNow: "Começar agora",
    runFreeAudit: "Auditoria gratuita",
    lighthousePowered: "Com tecnologia Lighthouse",
    sslVerified: "SSL verificado",
    realTimeResults: "Resultados em tempo real",

    liveAuditorEngine: "Motor de Auditoria ao Vivo",
    enterDetailsToAnalyze: "Insira os detalhes para analisar todas as pontuações",
    websiteUrlLabel: "URL do site",
    emailAddressLabel: "Endereço de e-mail",
    scanRepoBtn: "Escanear repositório →",

    maxPerfScore: "Pontuação máx. de desempenho",
    avgSpeedIndex: "Índice de velocidade média",
    wcagStandard: "Padrão de acessibilidade",
    sslRating: "Classificação de segurança SSL",

    whatWeAudit: "O que auditamos",
    featuresMainTitle: "Tudo o que seu site precisa para ranquear e converter",
    performance: "Desempenho",
    performanceDesc: "Core Web Vitals, LCP, FID, CLS e pontuação completa de desempenho do Lighthouse.",
    seo: "Análise de SEO",
    seoDesc: "Meta tags, estrutura de cabeçalhos, validação de sitemap e auditoria de visibilidade.",
    security: "Segurança e SSL",
    securityDesc: "Validação HTTPS, verificação de conteúdo misto, cabeçalhos de segurança e escaneamento.",
    accessibility: "Acessibilidade",
    accessibilityDesc: "Conformidade com WCAG 2.1, rótulos ARIA, contraste de cores e navegação por teclado.",
    mobile: "Auditoria Móvel",
    mobileDesc: "Verificação de design responsivo, pontuação de usabilidade móvel e viewport.",
    aiSuggestions: "Sugestões de IA",
    aiSuggestionsDesc: "Recomendações inteligentes priorizadas por impacto.",

    footerAbout: "Analise e melhore o desempenho do seu site com nossas ferramentas.",
    footerQuickLinks: "Links rápidos", footerContactTitle: "Contato",
    footerContactText: "Tem perguntas? Entre em contato.",
    footerContactBtn: "Contate-Nos", footerRights: "Web Scanner. Todos os direitos reservados.",

    signInTitle: "Entrar", signInSubtitle: "para continuar no Web Scanner",
    createAccountTitle: "Criar conta", createAccountSubtitle: "para começar no Web Scanner",
    usernameLabel: "Nome de usuário", emailLabel: "Endereço de e-mail", passwordLabel: "Senha",
    confirmPasswordLabel: "Confirmar senha", forgotPasswordLink: "Esqueceu sua senha?",
    dontHaveAccount: "Não tem uma conta?", alreadyHaveAccount: "Já tem uma conta?",

    lighthouseNoData: "Nenhum dado de análise encontrado", lighthouseBack: "Voltar ao início",
    lighthouseBackShort: "Voltar", lighthouseAnalysis: "Resultados da análise",
    lighthouseContactMe: "Contate-me", lighthouseOverallScore: "Pontuação geral",
    contactUs: "Contate-Nos", contactHeading: "Adoraríamos ouvir de você!",
    contactName: "Nome", contactEmail: "E-mail", contactMessage: "Mensagem",
    contactSend: "Enviar mensagem", contactSending: "Enviando...",
  },
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const saved = localStorage.getItem('preferredLanguage');
    if (saved && translations[saved]) setLanguage(saved);
  }, []);

  const handleLanguageChange = (value) => {
    setLanguage(value);
    localStorage.setItem('preferredLanguage', value);
  };

  const t = translations[language] || translations.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleLanguageChange, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = { children: PropTypes.node.isRequired };

export const useLanguage = () => useContext(LanguageContext);
