#![cfg_attr(target_os = "windows", windows_subsystem = "windows")]

fn main() {
    std::env::set_var("RUST_BACKTRACE", "1");
    std::env::set_var("RUST_LIB_BACKTRACE", "1");
    harbor_lib::run()
}
