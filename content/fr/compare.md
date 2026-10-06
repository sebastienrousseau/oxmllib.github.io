---
name: "oxml"
short_name: "OXML"
title: "Comparaison d'oxml avec l'écosystème Rust XML — oxml"
description: "Une évaluation technique honnête entre oxml, quick-xml, roxmltree, xot, xee et libxml2. Compromis, benchmarks et critères de choix."
keywords: "comparatif rust xml, roxmltree vs quick-xml, oxml vs roxmltree, rust xpath, alternative libxml2 rust"
author: "Sebastien Rousseau"
date: "2026-10-06"
layout: "doc"
language: "fr"
lang_code: "FR"
lang_change: "Changer de langue"
schema: "page"
changefreq: "weekly"
copyright_year: "2026"
translation_key: "compare"
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
eyebrow: "Architecture & Compromis"
headline: "Comparatif technique : oxml face aux bibliothèques Rust"
lead: "Une évaluation technique honnête des compromis architecturaux entre quick-xml, roxmltree, xot, xee et libxml2. Quand choisir oxml, et quand privilégier une alternative."
prev_href: "/fr/architecture/"
prev_label: "Architecture"
next_href: "/fr/benchmarks/"
next_label: "Benchmarks"
toc_1: "Matrice de l'écosystème"
toc_1_id: "matrix"
toc_2: "Détails comparatifs"
toc_2_id: "head-to-head"
toc_3: "Quand ne pas utiliser oxml"
toc_3_id: "when-not-to-use"
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
cur_compare: " aria-current=\"page\""
cur_benchmarks: ""
cur_security: ""
form_origin: "https://oxmllib.com"
screenshot_alt: "Tableau comparatif technique entre oxml et les autres crates Rust XML."
---

<h2 id="matrix">Matrice des fonctionnalités de l'écosystème</h2>

<p>Chaque bibliothèque XML adopte des compromis délibérés entre empreinte mémoire, capacité de mutation, débit de streaming et ergonomie de requêtes. Le tableau ci-dessous compare les principales bibliothèques Rust en octobre 2026.</p>

<div class="matrix-table-wrapper">
  <table class="matrix-table">
    <thead>
      <tr>
        <th scope="col">Fonctionnalité</th>
        <th scope="col">oxml</th>
        <th scope="col">quick-xml</th>
        <th scope="col">roxmltree</th>
        <th scope="col">xot</th>
        <th scope="col">xee</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Modèle principal</th>
        <td>DOM arène mutable</td>
        <td>Pull parser (Streaming)</td>
        <td>Arbre lecture seule</td>
        <td>Arbre arène mutable</td>
        <td>Arbre lecture seule</td>
      </tr>
      <tr>
        <th scope="row">Sécurité mémoire</th>
        <td class="matrix-badge-pass"><code>#![forbid(unsafe_code)]</code></td>
        <td class="matrix-badge-pass">Safe Rust</td>
        <td class="matrix-badge-pass">Safe Rust</td>
        <td class="matrix-badge-pass">Safe Rust</td>
        <td class="matrix-badge-pass">Safe Rust</td>
      </tr>
      <tr>
        <th scope="row">Mutation DOM</th>
        <td class="matrix-badge-pass">Générationnelle O(1)</td>
        <td class="matrix-badge-fail">Aucune (Flux d'événements)</td>
        <td class="matrix-badge-fail">Aucune (Lecture seule)</td>
        <td class="matrix-badge-pass">Mutation arène</td>
        <td class="matrix-badge-fail">Aucune (Lecture seule)</td>
      </tr>
      <tr>
        <th scope="row">Support XPath</th>
        <td class="matrix-badge-pass">W3C XPath 1.0</td>
        <td class="matrix-badge-fail">Aucun</td>
        <td class="matrix-badge-fail">Aucun (Itérateur seul)</td>
        <td class="matrix-badge-fail">Aucun (Itérateur seul)</td>
        <td class="matrix-badge-pass">W3C XPath 3.1</td>
      </tr>
      <tr>
        <th scope="row">Schéma XML (XSD)</th>
        <td class="matrix-badge-pass">Partiel (95.2% W3C)</td>
        <td class="matrix-badge-fail">Aucun</td>
        <td class="matrix-badge-fail">Aucun</td>
        <td class="matrix-badge-fail">Aucun</td>
        <td class="matrix-badge-fail">Aucun</td>
      </tr>
      <tr>
        <th scope="row">WebAssembly</th>
        <td class="matrix-badge-pass">Natif (&lt;220 Ko)</td>
        <td>Supporté (Lecteur)</td>
        <td>Supporté (Lecture seule)</td>
        <td>Supporté (Arbre)</td>
        <td>Supporté (Moteur)</td>
      </tr>
      <tr>
        <th scope="row">Agents IA (MCP)</th>
        <td class="matrix-badge-pass">Natif (oxml-mcp)</td>
        <td class="matrix-badge-fail">Aucun</td>
        <td class="matrix-badge-fail">Aucun</td>
        <td class="matrix-badge-fail">Aucun</td>
        <td class="matrix-badge-fail">Aucun</td>
      </tr>
    </tbody>
  </table>
</div>

<h2 id="head-to-head">Comparaison détaillée point par point</h2>

<h3>1. oxml face à quick-xml</h3>

<p><strong>Forces de quick-xml :</strong> Avec plus de 379 millions de téléchargements, <code>quick-xml</code> est la référence en matière de streaming pull-parsing en Rust. Ne construisant aucun arbre en mémoire, il atteint des débits entre 1,2 Go/s et 1,5 Go/s sans allocation sur le tas. Pour les fichiers de logs de plusieurs gigaoctets ou les pipelines ETL de streaming, <strong>quick-xml est le choix optimal</strong>.</p>

<p><strong>Avantages d'oxml :</strong> <code>quick-xml</code> ne propose ni DOM, ni requêtes XPath, ni validation XSD. Dès lors que votre application doit cibler des nœuds avec des expressions XPath complexes, modifier des attributs ou sérialiser du XML formaté, <code>oxml</code> fournit un arbre en arène clé en main.</p>

<h3>2. oxml face à roxmltree</h3>

<p><strong>Forces de roxmltree :</strong> <code>roxmltree</code> (&gt;66M téléchargements) est une référence de compacité pour l'inspection de documents en lecture seule. N'autorisant aucune modification, il stocke les nœuds dans un tableau contigu avec une empreinte mémoire minime (1,5x à 2x la taille du document).</p>

<p><strong>Avantages d'oxml :</strong> <code>roxmltree</code> est strictement en lecture seule et ne dispose d'aucun moteur XPath intégré. <code>oxml</code> allie un arbre mutable complet, l'évaluation XPath 1.0 et la validation de schémas.</p>

<h3>3. oxml face à xot</h3>

<p><strong>Forces de xot :</strong> <code>xot</code> est une bibliothèque d'arbres mutables traitant les espaces de noms et les commentaires comme des citoyens de premier ordre, reposant également sur un allocateur d'arène.</p>

<p><strong>Avantages d'oxml :</strong> <code>oxml</code> propose une suite complète unifiée : XPath 1.0, validation XSD partielle (<code>xmlschema</code>), WebAssembly, binaire CLI et serveur MCP pour agents IA, le tout synchronisé sous un numéro de version unique.</p>

<h3>4. oxml face à xee</h3>

<p><strong>Forces de xee :</strong> Développé par Paligo, <code>xee</code> est l'implémentation Rust de pointe pour <strong>W3C XPath 3.1</strong> et XSLT 3.0 partiel. Si vos besoins requièrent des expressions régulières, des cartes dynamiques ou des feuilles de style XSLT, <strong>choisissez xee</strong>.</p>

<p><strong>Avantages d'oxml :</strong> <code>oxml</code> se focalise sur le standard W3C XPath 1.0 couplé à un DOM mutable, la validation XSD et l'intégration d'agents IA (MCP).</p>

<h2 id="when-not-to-use">Quand ne pas utiliser oxml — En toute transparence</h2>

<p>Une démarche technique rigoureuse repose sur la clarté des limites. Nous recommandons d'autres outils dans les situations suivantes :</p>

<ol>
  <li><strong>Streaming sur flux de plusieurs gigaoctets :</strong> Utilisez <code>quick-xml</code> pour éviter l'allocation d'un arbre mémoire.</li>
  <li><strong>Parcours strict en lecture seule :</strong> Utilisez <code>roxmltree</code> pour une empreinte mémoire minimale sans besoin de mutation ni XPath.</li>
  <li><strong>XPath 3.1 et transformations XSLT :</strong> Utilisez <code>xee</code> ou <code>Saxon</code>.</li>
  <li><strong>Validation XSD 1.1 exhaustive :</strong> Utilisez <code>libxml2</code> ou <code>Saxon</code> en attendant la maturité 1.0 complète de <code>xmlschema</code>.</li>
</ol>
