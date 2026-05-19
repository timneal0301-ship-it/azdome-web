// Legal documents. Data lives here as the single source of truth;
// app/legal/[slug]/page.tsx imports DOCS at render time (with overlay).

import type { ContentSection } from "./types";

export type Section = {
  id: string;
  heading: string;
  paragraphs?: string[];
  list?: { term: string; def: string }[];
};

export type Doc = {
  slug: string;
  title: string;
  intro: string;
  updated: string;
  effective: string;
  sections: Section[];
};

export const DOCS: Doc[] = [
  // ───────── PRIVACY ─────────
  {
    slug: "privacy",
    title: "Privacy Policy",
    updated: "Last updated April 4, 2026",
    effective: "Effective April 18, 2026",
    intro:
      "AZDOME Inc. (\"AZDOME\", \"we\", \"us\") respects your privacy. This Privacy Policy describes how we collect, use, share, and protect personal information when you visit azdome.com, use the AZDOME mobile applications, or purchase and use AZDOME products. It also explains your rights and choices regarding that information.",
    sections: [
      {
        id: "scope",
        heading: "1. Scope of this Policy",
        paragraphs: [
          "This Policy applies to information we collect through our websites (azdome.com and its subdomains), the AZDOME iOS and Android apps, customer support channels, retail and trade-show interactions, and the products and accessories we sell.",
          "It does not apply to footage stored locally on the microSD card inside your dash cam, which remains under your physical and legal control. We never automatically upload, scan, or analyze on-device video footage. Footage only leaves your device when you choose to download, share, or back it up to a destination you control.",
          "Third-party services we link to (e.g., Stripe checkout, the App Store, Klarna, YouTube) operate under their own privacy policies. Where we have meaningful influence, we describe their roles below.",
        ],
      },
      {
        id: "info-we-collect",
        heading: "2. Information we collect",
        paragraphs: [
          "We collect information in three ways: (a) information you provide directly, (b) information collected automatically through use of our services, and (c) information from third parties acting on our behalf.",
        ],
        list: [
          {
            term: "Account information",
            def: "Email address, hashed password, display name, profile photo if you choose to add one, language and region preferences, and product registration details.",
          },
          {
            term: "Order and payment information",
            def: "Billing address, shipping address, items ordered, order history, refund and return history. Payment card details are entered directly into our payment processor (Stripe, PayPal, or Klarna) and are never stored on AZDOME servers; we receive only a tokenized reference, the last four digits of the card, the card brand, and the expiration date.",
          },
          {
            term: "Device and usage information",
            def: "When you use the AZDOME app, we receive device model, operating system, app version, language, time zone, crash logs, and feature usage events. These help us diagnose bugs and prioritize improvements.",
          },
          {
            term: "Customer support information",
            def: "Conversation transcripts, attachments (e.g., serial number photos, install pictures you choose to send), the issue you reported, and the resolution. Phone calls to our support line are not recorded.",
          },
          {
            term: "Cookies and similar technologies",
            def: "First-party cookies used for cart persistence, login session, and consent state. Third-party cookies are only set with your consent. See Section 6 and our Cookie Settings page.",
          },
          {
            term: "Marketing preferences",
            def: "Email subscription state, click and open events for transactional and promotional emails (where permitted), and unsubscribe history.",
          },
          {
            term: "Information from partners",
            def: "If you reach us through a retailer (e.g., Amazon, Best Buy), we receive the order number and shipping confirmation needed to provide warranty support. We do not buy or rent personal information from data brokers.",
          },
        ],
      },
      {
        id: "how-we-use",
        heading: "3. How we use your information",
        paragraphs: [
          "We use information only for the purposes described below, and we minimize what we collect to what is necessary for each purpose.",
        ],
        list: [
          { term: "Fulfilling orders", def: "Processing payments, shipping products, handling returns and warranty claims." },
          { term: "Providing the AZDOME app", def: "Authenticating your account, syncing settings across devices, delivering firmware updates, surfacing release notes." },
          { term: "Customer support", def: "Responding to your requests; routing escalations; improving our self-serve documentation in aggregated, anonymized form." },
          { term: "Product safety", def: "Investigating reports of malfunction, defective hardware, or safety incidents that may require recall." },
          { term: "Marketing (with consent)", def: "Sending newsletters, product launches, and offers. You can unsubscribe at any time using the link in every email or in your account preferences." },
          { term: "Security & fraud prevention", def: "Detecting unauthorized account access, payment fraud, abuse of our affiliate program, and policy violations." },
          { term: "Legal compliance", def: "Complying with tax, accounting, consumer protection, export control, and other applicable laws." },
        ],
      },
      {
        id: "legal-bases",
        heading: "4. Legal bases (EEA, UK, Switzerland)",
        paragraphs: [
          "If you are in the European Economic Area, the United Kingdom, or Switzerland, we rely on the following lawful bases under GDPR Article 6:",
        ],
        list: [
          { term: "Performance of a contract", def: "When the processing is necessary to deliver the product or service you ordered (e.g., shipping address to fulfill an order)." },
          { term: "Legitimate interests", def: "When processing serves our legitimate interests in operating, securing, and improving our business, and your interests do not override ours (e.g., fraud detection, product analytics)." },
          { term: "Consent", def: "Where you have given specific, informed, and freely given consent — for example, marketing emails and non-essential cookies." },
          { term: "Legal obligation", def: "When processing is required to comply with a law that applies to us (e.g., tax records)." },
        ],
      },
      {
        id: "sharing",
        heading: "5. How we share information",
        paragraphs: [
          "We share personal information only with the categories of recipients listed below, and only to the extent necessary for the stated purpose. We do not sell personal information and have not in the past twelve months.",
        ],
        list: [
          { term: "Payment processors", def: "Stripe, PayPal, Klarna — to charge your card and detect payment fraud." },
          { term: "Carriers", def: "FedEx, UPS, USPS, DHL — to deliver your order and provide tracking." },
          { term: "Cloud infrastructure", def: "Amazon Web Services (US-East and EU-West regions) — to host our websites, app backend, and databases." },
          { term: "Email & SMS providers", def: "Postmark and Twilio — to deliver transactional and (with consent) marketing communications." },
          { term: "Analytics", def: "Plausible (EU-hosted, no personal data) for site analytics. App analytics use first-party identifiers only." },
          { term: "Customer support tooling", def: "Front (helpdesk) and Intercom (live chat) — to manage and respond to your support conversations." },
          { term: "Professional advisors", def: "Auditors, accountants, lawyers, and insurers, under confidentiality obligations." },
          { term: "Legal & safety", def: "When required by valid legal process, or where strictly necessary to protect rights, property, or safety. We require court orders or equivalent before producing user data." },
          { term: "Corporate transactions", def: "In connection with a merger, acquisition, or sale of assets, with notice to affected users before any transfer." },
        ],
      },
      {
        id: "cookies",
        heading: "6. Cookies & similar technologies",
        paragraphs: [
          "We classify cookies as strictly necessary, performance & analytics, and marketing. Only strictly necessary cookies are set by default; the other categories are enabled only with your consent (or implied consent where allowed by local law).",
          "You can review and change your preferences anytime via the Cookie Settings page or by clearing cookies in your browser. Disabling strictly necessary cookies will break checkout and account login.",
        ],
      },
      {
        id: "retention",
        heading: "7. Data retention",
        paragraphs: [
          "We retain personal information only as long as needed for the purposes described in this Policy or as required by law.",
        ],
        list: [
          { term: "Account data", def: "For the life of your account, plus 30 days after deletion to allow for recovery requests." },
          { term: "Order records", def: "7 years from order date, to comply with US and EU tax law." },
          { term: "Support transcripts", def: "3 years from the last interaction." },
          { term: "Marketing analytics", def: "26 months, then aggregated or deleted." },
          { term: "Backups", def: "Encrypted off-site backups are retained 90 days and then overwritten." },
        ],
      },
      {
        id: "international",
        heading: "8. International data transfers",
        paragraphs: [
          "AZDOME is headquartered in the United States and operates services in the EU. When we transfer personal data from the EEA, UK, or Switzerland to a country that has not been deemed adequate by the European Commission (including the US), we rely on the European Commission's Standard Contractual Clauses (SCCs) and, where applicable, supplementary measures such as encryption in transit and at rest.",
          "You can request a copy of the SCCs that apply to your data by writing to privacy@azdome.com.",
        ],
      },
      {
        id: "security",
        heading: "9. Security",
        paragraphs: [
          "We implement technical and organizational measures to protect personal information: TLS 1.3 for all data in transit, AES-256 encryption at rest for databases and backups, hardware-bound secrets, mandatory two-factor authentication for employee access, principle of least privilege for production systems, and quarterly third-party penetration testing.",
          "No method of transmission or storage is 100% secure. If a personal data breach affects you and presents a risk to your rights, we will notify you and the relevant authorities within 72 hours, in accordance with applicable law.",
        ],
      },
      {
        id: "your-rights",
        heading: "10. Your rights and choices",
        paragraphs: [
          "Subject to your jurisdiction and verification of your identity, you may exercise the following rights:",
        ],
        list: [
          { term: "Access", def: "Request a copy of the personal information we hold about you." },
          { term: "Correction", def: "Ask us to fix inaccurate or incomplete information." },
          { term: "Deletion", def: "Ask us to delete your account and personal information, subject to legal retention obligations." },
          { term: "Portability", def: "Receive a copy of your information in a structured, machine-readable format." },
          { term: "Restriction & objection", def: "Restrict or object to certain processing activities, including direct marketing." },
          { term: "Withdraw consent", def: "Withdraw any consent you previously gave, without affecting the lawfulness of prior processing." },
          { term: "Complain to a regulator", def: "Lodge a complaint with your local data protection authority." },
        ],
      },
      {
        id: "california",
        heading: "11. California residents (CCPA/CPRA)",
        paragraphs: [
          "If you are a California resident, the California Consumer Privacy Act, as amended by the CPRA, grants you additional rights including the right to know what categories of personal information are collected, the right to delete, the right to correct, the right to opt out of sale or sharing (we do neither), and the right to limit use of sensitive personal information.",
          "To exercise these rights, email privacy@azdome.com from the email address associated with your account. We respond within 45 days. You may also designate an authorized agent in writing.",
          "We do not knowingly sell or share the personal information of California residents.",
        ],
      },
      {
        id: "children",
        heading: "12. Children's privacy",
        paragraphs: [
          "Our products and services are intended for adults aged 18 and over. We do not knowingly collect personal information from children under 16. If you believe we have collected information from a child, please contact privacy@azdome.com and we will delete it promptly.",
        ],
      },
      {
        id: "third-party-links",
        heading: "13. Third-party links",
        paragraphs: [
          "Our sites may link to third-party websites or services that we do not operate. We are not responsible for their privacy practices. We encourage you to read their privacy policies before sharing any information.",
        ],
      },
      {
        id: "changes",
        heading: "14. Changes to this Policy",
        paragraphs: [
          "We may update this Policy from time to time to reflect changes in our practices, technology, or legal requirements. Material changes will be communicated by email to registered users at least 15 days before they take effect. The \"Last updated\" date at the top of this page always reflects the most recent revision.",
        ],
      },
      {
        id: "contact",
        heading: "15. Contact",
        paragraphs: [
          "Data Controller: AZDOME Inc., 700 Mission St., Suite 200, San Francisco, CA 94105, USA.",
          "EU Representative (Art. 27 GDPR): EU Rep Services Ltd., Dublin, Ireland.",
          "UK Representative: UK Rep Services Ltd., London, United Kingdom.",
          "Privacy inquiries: privacy@azdome.com — we acknowledge requests within 5 business days and substantively respond within 30 days (45 for CCPA).",
        ],
      },
    ],
  },

  // ───────── TERMS ─────────
  {
    slug: "terms",
    title: "Terms of Service",
    updated: "Last updated April 4, 2026",
    effective: "Effective April 18, 2026",
    intro:
      "These Terms of Service (\"Terms\") govern your use of azdome.com, the AZDOME mobile apps, and any products and services we sell. By creating an account, placing an order, or otherwise using our services, you agree to these Terms. Please read them carefully.",
    sections: [
      {
        id: "eligibility",
        heading: "1. Eligibility & accounts",
        paragraphs: [
          "You must be at least 18 years old (or the age of majority in your jurisdiction) to create an account or place an order. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account.",
          "You agree to provide accurate, current, and complete information when registering and to keep it up to date. We may suspend or terminate accounts that provide false information, attempt to defraud, or violate these Terms.",
        ],
      },
      {
        id: "orders",
        heading: "2. Orders, pricing & availability",
        paragraphs: [
          "All prices are listed in US dollars unless otherwise stated and exclude applicable taxes and shipping. Prices, promotions, and product availability are subject to change without notice. We reserve the right to cancel orders for any reason, including suspected fraud, pricing errors, and inventory shortages.",
          "Your purchase contract is formed when we ship the order, not when we accept payment. Until shipment, we may decline or cancel the order with a full refund. For pre-orders, the estimated ship date is an estimate, not a guaranteed delivery date.",
        ],
      },
      {
        id: "shipping",
        heading: "3. Shipping & delivery",
        paragraphs: [
          "We ship to the contiguous United States, Alaska, Hawaii, Canada, the UK, and most of the EU. Free standard shipping is included on orders over $99 to the contiguous US. Shipping times are estimates from the date of dispatch.",
          "Risk of loss passes to you upon delivery to the carrier. We are not responsible for delays caused by carriers or customs. International orders may be subject to import duties, taxes, and customs fees collected by the carrier on delivery.",
        ],
      },
      {
        id: "returns",
        heading: "4. Returns & refunds",
        paragraphs: [
          "We offer a 30-day return window from the date of delivery. Returned items must be in original condition with all included accessories and packaging. To initiate a return, email returns@azdome.com or visit your account orders page.",
          "Refunds are issued to the original payment method within 5 business days of receiving the return. Original shipping is non-refundable for non-defective returns. Return shipping is paid by the customer except for warranty claims, which we cover.",
          "Custom and clearance items are non-returnable unless defective. Digital gift cards are non-refundable but never expire.",
        ],
      },
      {
        id: "warranty",
        heading: "5. Warranty",
        paragraphs: [
          "Hardware is covered by a limited warranty against manufacturing defects: 2 years for dash cameras and 1 year for accessories, from the date of delivery. Full terms, exclusions, and the claim process are described on our Warranty page. The warranty is not transferable.",
        ],
      },
      {
        id: "license",
        heading: "6. License to use our software",
        paragraphs: [
          "We grant you a personal, non-exclusive, non-transferable, revocable license to use the AZDOME app and the firmware embedded in your camera, solely for personal use with AZDOME hardware. You may not modify, distribute, decompile, or reverse-engineer the software except as expressly permitted by applicable law.",
          "Firmware updates are provided at our discretion and may add, change, or remove features. We strive to provide updates for at least 5 years from a product's launch date.",
        ],
      },
      {
        id: "acceptable-use",
        heading: "7. Acceptable use",
        paragraphs: [
          "You agree not to use our services to: (a) violate applicable laws or regulations, including recording laws in your jurisdiction; (b) infringe the intellectual property or privacy rights of others; (c) attempt to gain unauthorized access to our systems; (d) interfere with the operation of our services; (e) scrape, frame, or systematically extract content from our sites; or (f) misrepresent your identity or affiliation.",
          "Recording audio inside vehicles is regulated differently across jurisdictions. You are responsible for complying with all applicable consent and recording laws.",
        ],
      },
      {
        id: "ugc",
        heading: "8. User-submitted content",
        paragraphs: [
          "If you submit reviews, photos, videos, or other content to our services (\"User Content\"), you grant AZDOME a worldwide, non-exclusive, royalty-free, perpetual license to use, reproduce, modify, and display that content in connection with our business. You represent that you own or have permission to share the content and that it does not violate any law or third-party right.",
          "We may remove User Content that violates these Terms or for any other reason at our discretion.",
        ],
      },
      {
        id: "ip",
        heading: "9. Intellectual property",
        paragraphs: [
          "All content on our sites — including text, graphics, logos, photographs, software, and design — is owned by or licensed to AZDOME and is protected by copyright, trademark, and other laws. \"AZDOME\" and our logo are trademarks of AZDOME Inc. and may not be used without permission.",
          "DMCA notices may be sent to dmca@azdome.com with the information required under 17 U.S.C. § 512(c)(3).",
        ],
      },
      {
        id: "disclaimers",
        heading: "10. Disclaimers",
        paragraphs: [
          "Our services and products are provided \"as is\" and \"as available\" without warranties of any kind, except as expressly stated in our written warranty. We do not warrant that our services will be uninterrupted, secure, or error-free.",
          "AZDOME products are aids to safety and evidence preservation. They do not replace careful driving or guarantee outcomes in legal proceedings. We make no representation that recordings will be admissible in any court.",
        ],
      },
      {
        id: "liability",
        heading: "11. Limitation of liability",
        paragraphs: [
          "To the maximum extent permitted by law, AZDOME's total liability arising out of or relating to these Terms or your use of our services is limited to the amount you paid us in the 12 months preceding the event giving rise to the claim, or USD 100, whichever is greater.",
          "AZDOME is not liable for indirect, incidental, special, consequential, or punitive damages, including lost profits or data, even if advised of the possibility. Some jurisdictions do not allow the exclusion of certain warranties or the limitation of liability for consequential damages, so some of the above limitations may not apply to you.",
        ],
      },
      {
        id: "indemnification",
        heading: "12. Indemnification",
        paragraphs: [
          "You agree to indemnify and hold AZDOME, its officers, directors, employees, and agents harmless from any claim arising out of your breach of these Terms, your User Content, or your misuse of our products or services.",
        ],
      },
      {
        id: "disputes",
        heading: "13. Disputes & arbitration",
        paragraphs: [
          "Any dispute arising out of these Terms or your use of our services will be resolved through binding individual arbitration administered by JAMS in San Francisco, California, in accordance with its Streamlined Arbitration Rules. You waive any right to a jury trial or to participate in a class action, except where prohibited by law.",
          "You may opt out of arbitration within 30 days of first accepting these Terms by emailing legal@azdome.com with the subject line \"Arbitration Opt-Out\" and your full name. Small-claims court actions remain available to either party.",
          "Notwithstanding the above, EU and UK consumers retain all rights granted by their local consumer protection laws.",
        ],
      },
      {
        id: "governing",
        heading: "14. Governing law",
        paragraphs: [
          "These Terms are governed by the laws of the State of California, USA, without regard to its conflict-of-laws principles, except where mandatory consumer-protection laws of your country of residence provide otherwise.",
        ],
      },
      {
        id: "changes",
        heading: "15. Changes",
        paragraphs: [
          "We may update these Terms from time to time. Material changes will be communicated by email to registered users at least 15 days before they take effect. Your continued use after the effective date constitutes acceptance.",
        ],
      },
      {
        id: "contact",
        heading: "16. Contact",
        paragraphs: [
          "Questions about these Terms? Write to AZDOME Inc., 700 Mission St., Suite 200, San Francisco, CA 94105, USA, or email legal@azdome.com.",
        ],
      },
    ],
  },

  // ───────── WARRANTY ─────────
  {
    slug: "warranty",
    title: "Limited Warranty",
    updated: "Last updated April 4, 2026",
    effective: "Effective April 18, 2026",
    intro:
      "AZDOME products are designed to last. Every camera and accessory ships with a limited warranty against manufacturing defects. This page lists what's covered, what isn't, how to file a claim, and how long replacements take.",
    sections: [
      {
        id: "coverage",
        heading: "1. Coverage by product line",
        paragraphs: [
          "Coverage begins on the date of delivery, as reflected in the carrier's tracking record. The warranty is not transferable and applies only to the original purchaser.",
        ],
        list: [
          { term: "Flagship dash cameras (M550 Pro, M530, GS63H)", def: "2-year limited warranty. Includes sensor, lens, internal capacitor, GPS module, Wi-Fi radio, and firmware-related defects." },
          { term: "Compact dash cameras (M27, M17, M300S)", def: "2-year limited warranty. Covers the camera body, lens, and capacitor." },
          { term: "Hardwire kits", def: "1-year limited warranty against manufacturing defects. Does not cover damage from incorrect installation." },
          { term: "Memory cards & cables", def: "1-year limited warranty against manufacturing defects." },
          { term: "Mounts & adhesives", def: "90 days against adhesive failure. Replaceable at no charge during this window." },
          { term: "Refurbished units", def: "1-year limited warranty from the date of delivery." },
        ],
      },
      {
        id: "what-covered",
        heading: "2. What's covered",
        paragraphs: [
          "We will repair or replace, at our option, any AZDOME product that fails due to manufacturing defects during the applicable warranty period. \"Manufacturing defects\" means defects in materials or workmanship that arise during normal use of the product.",
        ],
      },
      {
        id: "exclusions",
        heading: "3. What's not covered",
        paragraphs: [
          "The following are excluded from warranty coverage:",
        ],
        list: [
          { term: "Physical damage", def: "Drops, impact damage, broken lens glass, severed cables, or damage from improper installation." },
          { term: "Water damage", def: "Liquid intrusion outside of normal cabin conditions (our products are not waterproof)." },
          { term: "Cosmetic damage", def: "Scratches, dents, and finish wear that don't affect functionality." },
          { term: "Misuse", def: "Use outside the operating temperature range (-20°C to 70°C), use with non-AZDOME power adapters, or modification of firmware via unofficial channels." },
          { term: "Theft or loss", def: "We can't replace stolen or lost cameras under warranty. Renter's or auto insurance may cover these events." },
          { term: "Consumables", def: "SD card wear from normal recording cycles, mounting adhesive residue, included install accessories." },
          { term: "Acts of nature", def: "Damage from floods, fire, lightning, hail, or vehicle accidents." },
        ],
      },
      {
        id: "filing",
        heading: "4. How to file a claim",
        paragraphs: [
          "Filing a warranty claim takes about 5 minutes. We aim to authorize most claims within 1 business day.",
        ],
        list: [
          { term: "Step 1 — Gather your details", def: "Order number (in your confirmation email), product serial number (on a sticker under the device or visible in the AZDOME app under Settings → About), and a short description of the issue. Photos or short video help us diagnose faster." },
          { term: "Step 2 — Submit", def: "Email warranty@azdome.com or use the form at azdome.com/support/contact. Choose \"Warranty\" as the topic." },
          { term: "Step 3 — Authorization", def: "We respond within 1 business day with a Return Merchandise Authorization (RMA) number and a prepaid return label (US orders) or shipping instructions (international)." },
          { term: "Step 4 — Replacement", def: "Once we receive the returned unit, we ship a replacement within 2 business days. End-to-end turnaround is typically 7–10 days for US orders." },
        ],
      },
      {
        id: "out-of-warranty",
        heading: "5. Out-of-warranty repair",
        paragraphs: [
          "Need help after warranty expires? We offer flat-rate out-of-warranty service for most models at our cost, plus return shipping. Email service@azdome.com for a quote.",
        ],
      },
      {
        id: "extended",
        heading: "6. Extended warranty (optional)",
        paragraphs: [
          "AZDOME Care extends warranty coverage by an additional 2 years for $19.99/year, with accidental damage protection (one claim per year for a $39 service fee). Purchase within 30 days of delivery on your order page.",
        ],
      },
      {
        id: "regional",
        heading: "7. Regional consumer law",
        paragraphs: [
          "Where you live may grant you additional rights. The limited warranty does not exclude, restrict, or modify any non-excludable consumer guarantees under the laws of your jurisdiction, including those of Australia, the EU, the UK, and the State of California. Where local law provides longer warranty periods or stricter remedies, those apply automatically.",
        ],
      },
    ],
  },

  // ───────── ACCESSIBILITY ─────────
  {
    slug: "accessibility",
    title: "Accessibility Statement",
    updated: "Last updated April 4, 2026",
    effective: "Effective immediately",
    intro:
      "AZDOME is committed to making our digital experiences usable for everyone, including people with disabilities. We design and develop our website and mobile applications to conform with WCAG 2.1 AA and are working toward AAA on critical commerce flows.",
    sections: [
      {
        id: "conformance",
        heading: "1. Conformance status",
        paragraphs: [
          "The Web Content Accessibility Guidelines (WCAG) define how to make web content more accessible for people with disabilities. We target WCAG 2.1 Level AA across azdome.com and the AZDOME app.",
          "Our most recent third-party audit was performed in February 2026 by Inclusive Lab. The audit covered the homepage, product detail page, cart, checkout, support center, and account pages. Outstanding findings are tracked in our public accessibility backlog and prioritized within 90 days.",
        ],
      },
      {
        id: "practices",
        heading: "2. Practices we follow",
        list: [
          { term: "Semantic HTML", def: "We use the right element for the job. Buttons are buttons, links are links, headings are properly nested." },
          { term: "Keyboard navigation", def: "Every interactive element is reachable and operable via keyboard, with visible focus indicators." },
          { term: "Color contrast", def: "Text contrast meets AA on every page. Our color tokens are tested at design time, not after the fact." },
          { term: "Reduced motion", def: "We respect the prefers-reduced-motion media query and disable non-essential animations for users who request them." },
          { term: "Alt text", def: "Functional images include descriptive alternative text; decorative images use empty alt attributes." },
          { term: "Forms", def: "Every input has an associated label and clear error messages. Required fields are marked." },
          { term: "Screen reader testing", def: "We test critical flows with VoiceOver (macOS, iOS), NVDA (Windows), and TalkBack (Android) before each release." },
        ],
      },
      {
        id: "limitations",
        heading: "3. Known limitations",
        paragraphs: [
          "We are actively working on these areas, all expected to ship by Q3 2026:",
        ],
        list: [
          { term: "Video captions", def: "Our older marketing videos do not yet have captions. We are adding them progressively." },
          { term: "Live chat", def: "Our live chat widget has limited screen-reader support; we are migrating to a fully accessible vendor." },
          { term: "PDF documents", def: "Some legacy PDFs (warranty cards, install guides) are not fully tagged. New documents are accessible." },
        ],
      },
      {
        id: "feedback",
        heading: "4. Feedback & alternative access",
        paragraphs: [
          "If something on AZDOME doesn't work for you, please tell us. Email accessibility@azdome.com or call +1 (415) 555-0148, option 4. We respond within 1 business day.",
          "We will provide information in an alternative format on request (large print, plain-text email, voice). If you'd like a person to walk you through ordering, we're happy to do that by phone.",
        ],
      },
    ],
  },

  // ───────── COOKIES ─────────
  {
    slug: "cookies",
    title: "Cookie Policy",
    updated: "Last updated April 4, 2026",
    effective: "Effective immediately",
    intro:
      "This Cookie Policy explains what cookies and similar technologies are, which ones we use, and how you can control them. It supplements our Privacy Policy.",
    sections: [
      {
        id: "what-are",
        heading: "1. What are cookies?",
        paragraphs: [
          "A cookie is a small text file that a website stores on your device when you visit. Cookies let the site remember your actions and preferences (login, region, cart contents) so you don't have to re-enter them every time. Similar technologies include local storage, session storage, pixels, and SDK identifiers in our mobile app — we treat these together.",
        ],
      },
      {
        id: "categories",
        heading: "2. Categories of cookies we use",
        list: [
          { term: "Strictly necessary", def: "Required for the site to function: login session, cart contents, consent preferences, security tokens. These are set automatically and cannot be disabled without breaking the site." },
          { term: "Performance & analytics", def: "Help us understand how visitors use the site (which pages, which actions) so we can improve. We use Plausible, an EU-hosted, cookieless analytics tool that does not set cookies or collect personal data." },
          { term: "Marketing", def: "Used to measure the effectiveness of marketing campaigns and to show relevant ads on third-party sites. Set only with your explicit consent." },
        ],
      },
      {
        id: "table",
        heading: "3. Cookies we set",
        list: [
          { term: "azdome_session", def: "Strictly necessary · session cookie · authentication token, expires when browser closes." },
          { term: "azdome_cart", def: "Strictly necessary · localStorage · stores your cart contents, no expiration (cleared on logout or manual cart clear)." },
          { term: "azdome_consent", def: "Strictly necessary · 12 months · remembers your cookie preferences." },
          { term: "csrf_token", def: "Strictly necessary · session · prevents cross-site request forgery." },
          { term: "_plausible", def: "Analytics · this is a placeholder — Plausible does not set a cookie. Hostnames are aggregated server-side." },
        ],
      },
      {
        id: "third-party",
        heading: "4. Third-party cookies",
        paragraphs: [
          "Some pages embed content from third parties (e.g., YouTube videos, Stripe checkout). Those third parties may set their own cookies when you interact with their content. We minimize this — for example, YouTube embeds use the privacy-enhanced \"youtube-nocookie.com\" domain, and Stripe is only loaded on the checkout page.",
        ],
      },
      {
        id: "controls",
        heading: "5. How to control cookies",
        paragraphs: [
          "You have three ways to control cookies on AZDOME:",
        ],
        list: [
          { term: "Site preferences", def: "Open the Cookie Settings panel at the bottom of any page to opt in or out of each category." },
          { term: "Browser settings", def: "All major browsers let you block all cookies, block third-party cookies, or clear stored cookies. Note that blocking strictly necessary cookies will prevent checkout." },
          { term: "Mobile OS", def: "iOS and Android both offer Limit Ad Tracking and Reset Advertising Identifier controls in system settings." },
        ],
      },
      {
        id: "changes",
        heading: "6. Changes",
        paragraphs: [
          "If we change the cookies we use, we'll update this page and (for material changes) re-prompt for consent. Check the \"Last updated\" date at the top.",
        ],
      },
    ],
  },
];

export const LEGAL_DOCS: ContentSection<Doc[]> = {
  key: "legal.docs",
  label: "Legal · All policies",
  description:
    "Privacy / Terms / Warranty / Accessibility / Cookies. Edit any of the 5 documents — each is keyed by `slug` and rendered at /legal/<slug>.",
  page: "legal",
  previewHref: "/legal/privacy",
  defaults: DOCS,
};
