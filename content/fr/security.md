---
name: "oxml"
short_name: "OXML"
title: "Architecture de sécurité & Modèle de menaces — oxml"
description: "Zéro code unsafe, limites d'expansion d'entités W3C, protection contre XXE et fuzzing continu."
keywords: "sécurité rust xml, xxe rust, billion laughs rust, forbid unsafe code, sécurité parseur xml"
author: "Sebastien Rousseau"
date: "2026-10-06"
layout: "doc"
language: "fr"
lang_code: "FR"
lang_change: "Changer de langue"
schema: "page"
changefreq: "weekly"
copyright_year: "2026"
translation_key: "security"
locale_path: "/fr/"
base_path: "/"
en_current: ""
fr_current: " aria-current=\"true\""
slug_install: "installation"
slug_cli: "cli"
slug_xpath: "xpath"
slug_wasm: "wasm"
slug_mcp: "mcp"
slug_lsp: "lsp"
slug_schema: "schema"
slug_arch: "architecture"
slug_conformance: "conformance"
slug_a11y: "accessibility"
label_skip: "Aller au contenu principal"
label_menu: "Menu"
label_nav: "Navigation principale"
label_langs: "Langue"
label_theme: "Thème"
label_theme_system: "Système"
label_theme_light: "Clair"
label_theme_dark: "Sombre"
label_docs: "Documentation"
label_footer_nav: "Sections de documentation"
label_made_with: "Créé avec SSG"
label_docs_nav: "Navigation documentaire"
label_crumbs: "Fil d'Ariane"
label_pager: "Pagination"
label_prev: "Précédent"
label_next: "Suivant"
label_toc: "Sur cette page"
nav_home: "Accueil"
nav_install: "Installation"
nav_cli: "Outil CLI"
nav_xpath: "XPath 1.0"
nav_wasm: "WebAssembly"
nav_mcp: "Serveur MCP"
nav_lsp: "Serveur de langage"
nav_schema: "Schéma XML"
nav_arch: "Architecture"
nav_conformance: "Conformité"
nav_a11y: "Accessibilité"
nav_migrate_lxml: "Migration depuis lxml"
nav_migrate_roxmltree: "Migration depuis roxmltree"
nav_cookbook: "Recettes"
nav_playground: "Bac à sable"
nav_compare: "Comparatif des bibliothèques"
nav_benchmarks: "Benchmarks"
nav_security: "Sécurité"
footer_note: "Une boîte à outils XML purement Rust sans code unsafe, sous licences MIT ou Apache-2.0."
copyright: "© 2026 Sebastien Rousseau. Sous licences MIT ou Apache-2.0."
eyebrow: "Assurance & Durcissement"
headline: "Architecture de sécurité & Modèle de menaces"
lead: "Conçu dès l'origine pour la sécurité mémoire : #![forbid(unsafe_code)], protections actives contre XXE et attaques Billion Laughs, et fuzzing continu automatisé."
prev_href: "/fr/conformance/"
prev_label: "Conformité W3C"
next_href: "/fr/migrate-lxml/"
next_label: "Migration depuis lxml"
toc_1: "Garanties de sécurité mémoire"
toc_1_id: "memory-safety"
toc_2: "Attaques XML & Atténuation"
toc_2_id: "threat-model"
toc_3: "Fuzzing & Divulgation responsable"
toc_3_id: "fuzzing-policy"
cur_install: ""
cur_cli: ""
cur_xpath: ""
cur_wasm: ""
cur_mcp: ""
cur_lsp: ""
cur_schema: ""
cur_arch: ""
cur_conformance: ""
cur_a11y: ""
cur_migrate_lxml: ""
cur_migrate_roxmltree: ""
cur_cookbook: ""
cur_playground: ""
cur_compare: ""
cur_benchmarks: ""
cur_security: " aria-current=\"page\""
form_origin: "https://oxmllib.com"
screenshot_alt: "Documentation sur l'architecture de sécurité et le modèle de menaces XML pour oxml."
---

<h2 id="memory-safety">Garanties de sécurité mémoire : Zéro code unsafe</h2>

<p>Historiquement, les bibliothèques XML écrites en C/C++ (notamment <code>libxml2</code> et <code>Expat</code>) ont été exposées à des vulnérabilités de corruption mémoire : dépassements de tampon, utilisation après libération (use-after-free) et calculs de pointeurs invalides.</p>

<p><code>oxml</code> garantit la sécurité mémoire à la compilation :</p>

<ul>
  <li><strong><code>#![forbid(unsafe_code)]</code> :</strong> Règle absolue déclarée à la racine de chacun des crates. L'insertion d'un bloc <code>unsafe</code> bloque immédiatement la compilation.</li>
  <li><strong>Arène générationnelle sécurisée :</strong> Les durées de vie des nœuds sont encapsulées dans le conteneur du document. Les relations entre nœuds reposent sur des index générationnels sans pointeurs bruts.</li>
  <li><strong>Zéro dépendance externe dans le cœur :</strong> Le moteur de parsing n'embarque aucune dépendance tierce dans son noyau.</li>
</ul>

<h2 id="threat-model">Atténuation des attaques XML &amp; Modèle de menaces</h2>

<p>Des documents XML malveillants peuvent tenter de saturer le processeur ou d'exfiltrer des fichiers système. <code>oxml</code> intègre des défenses déterministes par défaut :</p>

<div class="matrix-table-wrapper">
  <table class="matrix-table">
    <thead>
      <tr>
        <th scope="col">Type de vulnérabilité</th>
        <th scope="col">Vecteur d'attaque</th>
        <th scope="col">Stratégie d'atténuation dans oxml</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row"><strong>Injection XXE (CWE-611)</strong></th>
        <td>DTD externes et entités <code>SYSTEM</code> tentant de lire des fichiers locaux (<code>/etc/passwd</code>) ou d'émettre des requêtes SSRF.</td>
        <td class="matrix-badge-pass"><strong>Désactivé par défaut.</strong> Aucun accès réseau ni lecture de système de fichiers n'est exécuté durant le parsing.</td>
      </tr>
      <tr>
        <th scope="row"><strong>Attaque Billion Laughs (CWE-776)</strong></th>
        <td>Expansion exponentielle d'entités internes récursives saturant la mémoire vive.</td>
        <td class="matrix-badge-pass"><strong>Profondeur bornée.</strong> La récursion est limitée à 32 niveaux, et le volume cumulé d'expansion est bridé à 10 Mo.</td>
      </tr>
      <tr>
        <th scope="row"><strong>Dépassement de pile</strong></th>
        <td>Documents XML contenant des milliers de balises imbriquées pour saturer la pile d'exécution.</td>
        <td class="matrix-badge-pass"><strong>Profondeur maximale fixée.</strong> La profondeur maximale d'imbrication est fixée (512 par défaut), déclenchant une erreur immédiate.</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 id="fuzzing-policy">Fuzzing continu &amp; Politique de divulgation</h2>

<h3>Bancs de tests automatisés (Fuzzing)</h3>
<p>Tous les parseurs et évaluateurs XPath sont soumis à un fuzzing continu avec <code>cargo-fuzz</code> (LLVM LibFuzzer) et <code>honggfuzz-rs</code> couvrant les flux malformés et les suites de conformité W3C.</p>

<h3>Divulgation responsable des vulnérabilités</h3>
<p>Pour signaler une anomalie de sécurité ou un cas d'épuisement de ressources :</p>

<ol>
  <li><strong>Courriel :</strong> Envoyez un rapport confidentiel à <a href="mailto:security@oxmllib.com"><code>security@oxmllib.com</code></a>.</li>
  <li><strong>GitHub Security Advisories :</strong> Déposez un signalement privé via l'avis de sécurité GitHub.</li>
  <li><strong>Délais (SLA) :</strong> Accusé de réception sous <strong>24 heures</strong>, évaluation initiale sous <strong>48 heures</strong>, et correctif coordonné sous <strong>7 jours</strong>.</li>
</ol>
