use barcoders::{
    generators::{image::Image},
    sym::code128::Code128,
};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn create_code128(value: &str) -> Vec<u8> {
    let result = Code128::new(format!("\u{0181}{}", &value)).expect("Failed to create Code128");
    result.encode()
}

#[wasm_bindgen]
pub fn to_png(height: u32, value: Vec<u8>) -> Vec<u8> {
    let res = Image::png(height)
        .generate(value)
        .expect("Failed to generate png.");
    res
}
