// SPDX-License-Identifier: MIT OR Apache-2.0
// Direct tree traversal snippet verification

use oxml::parse;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let doc = parse("<a><b id='1'>text</b></a>")?;
    let root = doc.root_element().expect("a root element");

    assert_eq!(doc.element_name(root).unwrap().local, "a");

    let b = doc.children(root)[0];
    assert_eq!(doc.attribute(b, "id"), Some("1"));
    assert_eq!(doc.text(b), "text");
    Ok(())
}
