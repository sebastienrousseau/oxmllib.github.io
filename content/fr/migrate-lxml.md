---
name: "oxml"
short_name: "OXML"
title: "Migration depuis Python lxml vers oxml — oxml"
description: "Guide étape par étape pour migrer de Python lxml et libxml2 vers la sécurité mémoire de Rust, le streaming zéro-copie et XPath 1.0."
keywords: "migration lxml rust, alternative lxml rust, python xml vers rust, oxml vs lxml, xml pur rust, libxml2 rust"
author: "Sebastien Rousseau"
date: "2026-10-05"
layout: "doc"
language: "fr"
lang_code: "FR"
lang_change: "Changer de langue"
schema: "page"
changefreq: "weekly"
copyright_year: "2026"
translation_key: "migrate-lxml"
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
label_skip: "Passer au contenu principal"
label_menu: "Menu"
label_nav: "Principal"
label_langs: "Langue"
label_theme: "Thème"
label_theme_system: "Système"
label_theme_light: "Clair"
label_theme_dark: "Sombre"
label_docs: "Documentation"
label_footer_nav: "Documentation"
label_made_with: "Créé avec SSG"
label_docs_nav: "Sections de documentation"
label_crumbs: "Fil d'Ariane"
label_pager: "Page"
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
nav_cookbook: "Livre de recettes"
nav_playground: "Bac à sable"
nav_compare: "Comparatif des bibliothèques"
nav_benchmarks: "Benchmarks"
nav_security: "Sécurité"
footer_note: "Boîte à outils XML purement Rust sans aucun code unsafe, sous licences MIT ou Apache-2.0."
copyright: "© 2026 Sebastien Rousseau. Sous licence MIT ou Apache-2.0."
eyebrow: "Guide de Migration"
headline: "Migration depuis Python lxml vers oxml"
lead: "Faites évoluer vos flux XML du wrapper C libxml2 vers la sécurité mémoire du Rust pur, le streaming zéro-copie et un parallélisme sans GIL."
prev_href: "/fr/security/"
prev_label: "Sécurité"
next_href: "/fr/migrate-roxmltree/"
next_label: "Migration depuis roxmltree"
toc_1: "Pourquoi migrer ?"
toc_1_id: "pourquoi-migrer"
toc_2: "Correspondance des Concepts"
toc_2_id: "correspondance-concepts"
toc_3: "Comparaisons de Code"
toc_3_id: "comparaisons-code"
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
cur_migrate_lxml: " aria-current=\"page\""
cur_migrate_roxmltree: ""
cur_cookbook: ""
cur_playground: ""
cur_compare: ""
cur_benchmarks: ""
cur_security: ""
form_origin: "https://oxmllib.com"
screenshot_alt: "Le site de documentation oxml montrant la navigation, des exemples de code et des guides d'architecture."
---

## Pourquoi migrer ?

En Python, `lxml` a longtemps dominé en encapsulant les bibliothèques C `libxml2` et `libxslt`. Cependant, les exigences modernes de production ont évolué :

1. **Sécurité Mémoire & Zéro Vulnérabilité :** `libxml2` a subi de nombreuses failles CVE (dépassements de tampon, use-after-free). `oxml` applique `#![forbid(unsafe_code)]` en Rust pur sans compromis.
2. **Parallélisme Réel (Sans GIL) :** `lxml` est restreint par le Global Interpreter Lock de Python. Les structures d'`oxml` (`Document`, `XPath`) implémentent `Send` et `Sync`, permettant un traitement multi-cœur fluide avec Rayon ou Tokio.
3. **Compilation Croisée Sans Dépendance C :** Aucun en-tête C requis (`libxml2-dev`), aucun compilateur externe, fonctionnement identique sous macOS, Linux (glibc/musl) et Windows.
4. **Prise en Charge WebAssembly :** `oxml` compile directement en WebAssembly (`oxml-wasm`), assurant la parité d'exécution sur le web et dans Cloudflare Workers.

## Correspondance des Concepts

| Python `lxml.etree` | Écosystème Rust `oxml` | Avantage Clé |
| :--- | :--- | :--- |
| `etree.fromstring(xml)` | `oxml::parse(xml)` | Arène générationnelle rapide et compacte |
| `etree.parse(file)` | `oxml::stream::Reader::from_reader(f)` | Tampon borné à 34 Ko |
| `tree.xpath("//book/text()")` | `doc.select("//book/text()")` | Moteur XPath 1.0 complet avec raccourci entier $O(1)$ |
| `XPath(expr)(tree)` | `oxml::XPath::compile(expr)?` | Expression précompilée partageable entre threads |
| `etree.iterparse(...)` | `reader.next_borrowed()` | Emprunt `&str` zéro-copie sans allocation sur le tas |
| `etree.tostring(el)` | `oxml::format_xml(doc, ...)` | Indentation, minification et balises vides personnalisables |
| `etree.XMLSchema(xsd).validate(doc)` | `xmlschema::validate(&doc, &schema)` | Validateur XSD en Rust pur (95,2 % conformité W3C) |
| Scripts d'agents LLM sur mesure | `oxml-mcp` | 5 outils MCP natifs pour Claude, Cursor et agents IA |

## Comparaisons de Code

### 1. Analyse et Requêtes XPath

En Python avec `lxml` :

```python
from lxml import etree

xml = """<catalog>
    <book id="bk101"><title>Dune</title><price>19.95</price></book>
    <book id="bk102"><title>Fondation</title><price>15.95</price></book>
</catalog>"""

root = etree.fromstring(xml.encode("utf-8"))
titles = root.xpath("//book[price > 18]/title/text()")
print(titles)  # ['Dune']
```

En Rust avec `oxml` :

```rust
use oxml::{parse, XPath};

fn main() -> Result<(), Box<dyn std::error.Error>> {
    let xml = r#"<catalog>
        <book id="bk101"><title>Dune</title><price>19.95</price></book>
        <book id="bk102"><title>Fondation</title><price>15.95</price></book>
    </catalog>"#;

    let doc = parse(xml)?;
    let xpath = XPath::compile("//book[price > 18]/title/text()")?;
    let titles = xpath.evaluate(&doc);
    assert_eq!(titles.to_str(&doc), "Dune");
    Ok(())
}
```

### 2. Flux à Haute Performance et Mémoire Bornée

En Python, `iterparse` impose un appel systématique à `elem.clear()` pour éviter les fuites mémoire :

```python
for event, elem in etree.iterparse(file_obj, tag="item"):
    process(elem)
    elem.clear()  # Requis pour libérer la mémoire en C
```

En Rust avec `oxml`, la mémoire est strictement bornée avec emprunt de tranches zéro-copie :

```rust
use oxml::stream::{BorrowedEvent, Reader};

let mut reader = Reader::from_reader(file)?;
while let Some(event) = reader.next_borrowed()? {
    match event {
        BorrowedEvent::StartElement { name, .. } if name.local == "item" => {
            // Emprunt direct depuis le tampon sans allocation sur le tas
        }
        _ => {}
    }
}
```

### 3. Validation de Schémas XML (XSD)

En Python avec `lxml` :

```python
schema = etree.XMLSchema(etree.parse("schema.xsd"))
doc = etree.parse("document.xml")
is_valid = schema.validate(doc)
if not is_valid:
    print(schema.error_log)
```

En Rust avec `xmlschema` :

```rust
use xmlschema::{parse_schema, validate};

let schema = parse_schema(&std::fs::read_to_string("schema.xsd")?)?;
let doc = oxml::parse(&std::fs::read_to_string("document.xml")?)?;
let report = validate(&doc, &schema);

if report.is_valid() {
    println!("Document strictement valide !");
} else {
    for violation in &report.violations {
        eprintln!("{violation}");
    }
}
```
