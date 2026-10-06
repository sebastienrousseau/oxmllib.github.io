---
name: "oxml"
short_name: "OXML"
title: "Livre de Recettes XML pour la Production — Modèles & Bonnes Pratiques"
description: "Recettes éprouvées pour le traitement XML en entreprise : streaming gigaoctet sans copie, protection contre Billion Laughs et résolution d'espaces de noms."
keywords: "recettes xml rust, streaming xml rust, billion laughs rust, espaces de noms xpath, modeles oxml"
author: "Sebastien Rousseau"
date: "2026-10-05"
layout: "doc"
language: "fr"
lang_code: "FR"
lang_change: "Changer de langue"
schema: "page"
changefreq: "weekly"
copyright_year: "2026"
translation_key: "cookbook"
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
label_nav: "Principal"
label_langs: "Langue"
label_theme: "Thème"
label_theme_system: "Système"
label_theme_light: "Clair"
label_theme_dark: "Sombre"
label_docs: "Documentation"
label_footer_nav: "Documentation"
label_made_with: "Créé avec SSG"
label_docs_nav: "Rubriques de la documentation"
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
footer_note: "Boîte à outils XML en pur Rust avec zéro code unsafe, sous licences MIT ou Apache-2.0."
copyright: "© 2026 Sebastien Rousseau. Sous licence MIT ou Apache-2.0."
eyebrow: "Modèles de Production"
headline: "Livre de Recettes XML de Production"
lead: "Modèles architecturaux testés sur le terrain pour le streaming haute performance, la mémoire bornée et la sécurité."
prev_href: "/fr/migrate-roxmltree/"
prev_label: "Migration depuis roxmltree"
next_href: "/fr/playground/"
next_label: "Bac à sable"
toc_1: "Streaming Échelle Gigaoctet"
toc_1_id: "streaming"
toc_2: "Protection Déni de Service"
toc_2_id: "security"
toc_3: "Traversée d'Espaces de Noms"
toc_3_id: "namespaces"
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
cur_cookbook: " aria-current=\"page\""
cur_playground: ""
cur_compare: ""
cur_benchmarks: ""
cur_security: ""
form_origin: "https://oxmllib.com"
screenshot_alt: "Le livre de recettes oxml présentant des modèles en Rust pur sécurisé."
---

## Streaming Échelle Gigaoctet

Lors du traitement de jeux de données XML de plusieurs gigaoctets (dumps Wikipédia, flux OpenStreetMap ou journaux de transactions financières), construire un DOM en mémoire provoque inévitablement des pannes d'épuisement de mémoire (OOM).

`oxml` propose `Reader::next_borrowed()`, qui parcourt les événements en empruntant des tranches de chaînes directement dans le tampon interne sans aucune allocation sur le tas.

### Modèle : Extraction d'Entités Zéro Copie

```rust
use oxml::parser::{BorrowedEvent, Reader};
use std::fs::File;
use std::io::BufReader;

fn process_large_dump(path: &str) -> Result<usize, Box<dyn std::error::Error>> {
    let file = File::open(path)?;
    let mut reader = Reader::from_reader(BufReader::with_capacity(64 * 1024, file));
    let mut total_records = 0;
    let mut in_record = false;

    while let Some(event) = reader.next_borrowed()? {
        match event {
            BorrowedEvent::StartElement { name, .. } if name == "record" => {
                in_record = true;
                total_records += 1;
            }
            BorrowedEvent::Text(content) if in_record => {
                // `content` est une tranche de chaîne empruntée : zéro allocation !
                if content.contains("CRITICAL_ALERT") {
                    println!("Alerte détectée dans l'enregistrement #{total_records}");
                }
            }
            BorrowedEvent::EndElement { name } if name == "record" => {
                in_record = false;
            }
            _ => {}
        }
    }

    Ok(total_records)
}
```

## Protection Déni de Service

Les analyseurs C hérités comme `libxml2` sont notoirement vulnérables aux attaques par expansion d'entités XML (« Billion Laughs » et explosion quadratique), où des entités DTD récursives multiplient la consommation de RAM de manière exponentielle.

### Atténuation Billion Laughs

`oxml` neutralise les attaques par déni de service par conception :

1. **Limites de Récursion d'Entités :** Le remplacement des entités générales est strictement borné.
2. **Plafonds de Profondeur Générationnels :** La profondeur d'imbrication est limitée pour éviter tout débordement de pile.
3. **Mémoire Bornée :** Sans pointeurs bruts, la mémoire ne peut être ni fragmentée ni bloquée par des dépendances circulaires.

```rust
use oxml::parser::Reader;

// Charge utile malveillante : expansions d'entités imbriquées
let attack_xml = r#"<?xml version="1.0"?>
<!DOCTYPE lolz [
 <!ENTITY lol "lol">
 <!ENTITY lol2 "&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;&lol;">
 <!ENTITY lol3 "&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;&lol2;">
]>
<root>&lol3;</root>"#;

let mut reader = Reader::from_str(attack_xml);
// Garanti : terminaison sûre avec erreur explicite, zéro emballement mémoire.
```

## Traversée d'Espaces de Noms

En XML 1.0, les éléments sans préfixe d'un document avec espace de noms appartiennent à l'espace par défaut (`xmlns="http://example.com/ns"`). Selon la spécification W3C XPath 1.0, les noms non préfixés dans une expression XPath ne correspondent **qu'aux** éléments sans espace de noms.

### Le Problème dans les Outils Hérités

Avec `lxml` ou les outils standards, interroger un document ayant un espace de noms par défaut avec `//entry` retourne 0 résultat, déroutant les développeurs :

```xml
<feed xmlns="http://www.w3.org/2005/Atom">
  <entry><title>Hello</title></entry>
</feed>
```

### La Solution oxml

Liez un préfixe explicite à l'URI de l'espace de noms. L'outil `oxml-cli` ainsi que l'API Rust permettent de lier des préfixes stables :

#### Approche CLI :
```bash
oxml query --ns atom=http://www.w3.org/2005/Atom \
  -q "//atom:entry/atom:title/text()" feed.xml
```

#### Approche API Rust :
```rust
use oxml::Document;
use oxml::xpath::Context;

let xml = r#"<feed xmlns="http://www.w3.org/2005/Atom"><title>Release</title></feed>"#;
let doc = Document::parse(xml)?;

let mut ctx = Context::new();
ctx.register_namespace("atom", "http://www.w3.org/2005/Atom");

let nodes = doc.select_with_context("//atom:title", &ctx)?;
assert_eq!(nodes[0].text(), Some("Release"));
```

## Validation avec Schéma XML (XSD)

Validez vos documents par rapport aux définitions d'entreprise XSD dans vos flux CI/CD :

```rust
use xmlschema::Validator;

let schema_source = std::fs::read_to_string("schema.xsd")?;
let validator = Validator::from_str(&schema_source)?;

let xml_input = std::fs::read_to_string("incoming.xml")?;
match validator.validate(&xml_input) {
    Ok(()) => println!("Le document est 100 % conforme au schéma XML W3C."),
    Err(errors) => {
        for err in errors {
            eprintln!("Erreur de validation ligne {}: {}", err.line, err.message);
        }
    }
}
```
