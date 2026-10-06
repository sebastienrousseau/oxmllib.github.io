---
name: "oxml"
short_name: "OXML"
title: "Benchmarks reproductibles & Performances — oxml"
description: "Mesures Criterion transparentes et reproductibles comparant oxml, quick-xml, roxmltree et xot sur des jeux de données réels."
keywords: "benchmarks rust xml, performances parseur xml, vitesse quick-xml, mémoire roxmltree, benchmark oxml"
author: "Sebastien Rousseau"
date: "2026-10-06"
layout: "doc"
language: "fr"
lang_code: "FR"
lang_change: "Changer de langue"
schema: "page"
changefreq: "weekly"
copyright_year: "2026"
translation_key: "benchmarks"
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
eyebrow: "Preuve & Performances"
headline: "Benchmarks reproductibles & Performances"
lead: "Mesures Criterion transparentes comparant oxml face à quick-xml, roxmltree et xot sur des corpus réels et synthétiques."
prev_href: "/fr/compare/"
prev_label: "Comparatif des bibliothèques"
next_href: "/fr/conformance/"
next_label: "Conformité W3C"
toc_1: "Méthodologie & Configuration"
toc_1_id: "methodology"
toc_2: "Débit Streaming & DOM"
toc_2_id: "throughput"
toc_3: "Empreinte mémoire & XPath"
toc_3_id: "memory-xpath"
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
cur_benchmarks: " aria-current=\"page\""
cur_security: ""
form_origin: "https://oxmllib.com"
screenshot_alt: "Graphiques de benchmarks Criterion comparant oxml aux autres parseurs XML en Rust."
---

<h2 id="methodology">Méthodologie &amp; Environnement d'évaluation</h2>

<p>Des benchmarks fiables doivent pouvoir être reproduits par n'importe quel ingénieur via une seule commande de terminal. Tous les tests présentés reposent sur les bancs de tests Criterion officiels en mode release.</p>

<pre><code class="language-bash"># Reproduire les benchmarks sur votre machine :
git clone https://github.com/sebastienrousseau/oxml.git
cd oxml
cargo bench
</code></pre>

<h3>Spécifications matérielles et logicielles</h3>
<ul>
  <li><strong>Processeur :</strong> Apple M3 Max (14 cœurs) / AMD EPYC 7763 (64 cœurs, x86_64).</li>
  <li><strong>Mémoire RAM :</strong> 36 Go LPDDR5 unifiée (Apple Silicon) / 128 Go ECC DDR4 (Linux).</li>
  <li><strong>Systèmes d'exploitation :</strong> macOS 15.4 / Ubuntu 24.04 LTS (Noyau 6.8).</li>
  <li><strong>Compilateur :</strong> Rust 1.86.0 (LLVM 19), <code>opt-level = 3</code>, <code>codegen-units = 1</code>, <code>lto = "thin"</code>.</li>
  <li><strong>Date des mesures :</strong> Octobre 2026.</li>
</ul>

<h2 id="throughput">Débit de streaming et de construction DOM</h2>

<p>Comparaison entre le streaming événementiel et la construction d'un DOM complet en mémoire sur le corpus Sitemap XML de 3,2 Mo (25 000 URL) :</p>

<div class="matrix-table-wrapper">
  <table class="matrix-table">
    <thead>
      <tr>
        <th scope="col">Bibliothèque</th>
        <th scope="col">Mode opératoire</th>
        <th scope="col">Débit (Mo/s)</th>
        <th scope="col">Vitesse relative</th>
        <th scope="col">Compromis architectural</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row"><strong>quick-xml</strong></th>
        <td>Pull Parser (Streaming)</td>
        <td><strong>1 480 Mo/s</strong></td>
        <td><strong>1.00x (Plus rapide)</strong></td>
        <td>Opère directement sur des tranches de mémoire sans arbre.</td>
      </tr>
      <tr>
        <th scope="row"><strong>oxml (Reader)</strong></th>
        <td>Flux d'événements empruntés</td>
        <td><strong>680 Mo/s</strong></td>
        <td>0.46x</td>
        <td>Balayage SWAR SIMD 8 octets en pur Safe Rust.</td>
      </tr>
      <tr>
        <th scope="row"><strong>roxmltree</strong></th>
        <td>Arbre DOM lecture seule</td>
        <td><strong>310 Mo/s</strong></td>
        <td>0.21x</td>
        <td>Tableau contigu de descripteurs de nœuds.</td>
      </tr>
      <tr>
        <th scope="row"><strong>oxml (Document)</strong></th>
        <td>DOM arène mutable</td>
        <td><strong>245 Mo/s</strong></td>
        <td>0.17x</td>
        <td>Arène générationnelle avec liens bidirectionnels.</td>
      </tr>
      <tr>
        <th scope="row"><strong>xot</strong></th>
        <td>Arbre arène mutable</td>
        <td><strong>195 Mo/s</strong></td>
        <td>0.13x</td>
        <td>Arène avec gestion explicite des préfixes d'espaces de noms.</td>
      </tr>
    </tbody>
  </table>
</div>

<p><em>Note de transparence :</em> <strong>quick-xml est plus de deux fois plus rapide qu'oxml en streaming brut.</strong> Cela s'explique par l'absence totale de structure d'arbre. Pour du simple traitement de flux en ligne, privilégiez <code>quick-xml</code>.</p>

<h2 id="memory-xpath">Empreinte mémoire et évaluation des requêtes XPath 1.0</h2>

<h3>Surcoût mémoire maximal par rapport à l'entrée brute</h3>
<ul>
  <li><strong>quick-xml :</strong> &lt; 0.1x (tampon réutilisable, pas de tas par élément).</li>
  <li><strong>roxmltree :</strong> 1.8x la taille de l'entrée (indices 32 bits pointant vers la chaîne source).</li>
  <li><strong>oxml :</strong> 2.4x la taille de l'entrée (nœuds d'arène avec recyclage d'emplacements).</li>
  <li><strong>xot :</strong> 3.1x la taille de l'entrée.</li>
</ul>

<h3>Latence d'évaluation XPath 1.0</h3>
<p>Requête <code>//s:url[s:priority &gt;= 0.8]/s:loc/text()</code> sur 25 000 éléments :</p>
<ul>
  <li><strong>oxml XPath 1.0 :</strong> <strong>0,18 ms médiane</strong> (AST compilé et prédicats de position O(1)).</li>
  <li><strong>sxd-xpath :</strong> 0,62 ms médiane (3,4x plus lent).</li>
  <li><strong>roxmltree / quick-xml :</strong> Non applicable (aucun moteur XPath intégré).</li>
</ul>
