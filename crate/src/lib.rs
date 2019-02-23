#[macro_use]
extern crate cfg_if;
extern crate web_sys;
extern crate wasm_bindgen;
extern crate shamir;

use shamir::SecretData;
use wasm_bindgen::prelude::*;

cfg_if! {
    // When the `console_error_panic_hook` feature is enabled, we can call the
    // `set_panic_hook` function to get better error messages if we ever panic.
    if #[cfg(feature = "console_error_panic_hook")] {
        extern crate console_error_panic_hook;
        use console_error_panic_hook::set_once as set_panic_hook;
    } else {
        #[inline]
        fn set_panic_hook() {}
    }
}

cfg_if! {
    // When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
    // allocator.
    if #[cfg(feature = "wee_alloc")] {
        extern crate wee_alloc;
        #[global_allocator]
        static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;
    }
}

// Called by our JS entry point to run the example.
#[wasm_bindgen]
pub fn run() -> Result<(), JsValue> {
    set_panic_hook();
    Ok(())
}

#[wasm_bindgen]
pub fn add(a: u32, b: u32) -> u32 {
    a + b
}

#[wasm_bindgen]
pub fn split_shamir(secret: &str, threshold: u8, shares: u8) -> Vec<u8> {
    let secret_data = SecretData::with_secret(secret, threshold);
    let mut shares_arr : Vec<u8> = vec![];
    for share_idx in 1..(shares+1) {
        let next_share : Vec<u8> = secret_data.get_share(share_idx);
        shares_arr.extend(next_share);
    }
    shares_arr
}

#[wasm_bindgen]
pub fn restore_shamir(shares: Vec<u8>, shares_num: u8) -> String {
    let total_size = shares.len();
    let slice_size = total_size / shares_num as usize;
    let recover_payload: Vec<Vec<u8>> = shares
        .chunks(slice_size)
        .map(|item| item.to_vec())
        .collect();
    let result = SecretData::recover_secret(shares_num, recover_payload).unwrap();
    result
}