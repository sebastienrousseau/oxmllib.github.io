// SPDX-License-Identifier: MIT OR Apache-2.0
// Homepage hero code snippet verification

use oxml::{parse, XPath};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let doc = parse("<library><book id='b1'>Dune</book></library>")?;
    let xpath = XPath::compile("//book[@id='b1']/text()")?;
    assert_eq!(xpath.evaluate(&doc).to_str(&doc), "Dune");
    println!("Parsed and queried with 100% safe Rust!");
    Ok(())
}
