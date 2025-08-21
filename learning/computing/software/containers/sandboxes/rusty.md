# Rusty

Get information about the sandbox system

```rust
use std::env;
use std::process;
use std::time::SystemTime;

fn main() {
    println!("=== Sandbox Environment Information ===\n");

    // Operating System Information
    println!("Operating System:");
    println!("  OS: {}", std::env::consts::OS);
    println!("  Architecture: {}", std::env::consts::ARCH);
    println!("  Family: {}", std::env::consts::FAMILY);
    println!();

    // Process Information
    println!("Process Information:");
    println!("  Process ID: {}", process::id());
    if let Ok(exe_path) = env::current_exe() {
        println!("  Executable Path: {:?}", exe_path);
    } else {
        println!("  Executable Path: Unavailable in sandbox");
    }
    if let Ok(current_dir) = env::current_dir() {
        println!("  Current Directory: {:?}", current_dir);
    } else {
        println!("  Current Directory: Unavailable in sandbox");
    }
    println!();

    // Environment Variables
    println!("Environment Variables:");
    let mut env_count = 0;
    for (key, value) in env::vars() {
        println!("  {}: {}", key, value);
        env_count += 1;
    }
    if env_count == 0 {
        println!("  No environment variables accessible in sandbox");
    }
    println!();

    // System Time
    println!("System Time:");
    if let Ok(now) = SystemTime::now().duration_since(SystemTime::UNIX_EPOCH) {
        println!("  Current UNIX Timestamp: {} seconds", now.as_secs());
    } else {
        println!("  System Time: Unavailable");
    }
    println!();

    // CPU Information
    println!("CPU Information:");
    #[cfg(target_arch = "x86_64")]
    {
        if let Some(cpu_info) = get_cpu_info() {
            println!("  CPU: {}", cpu_info);
        } else {
            println!("  CPU: Information unavailable");
        }
    }
    #[cfg(not(target_arch = "x86_64"))]
    println!("  CPU: Detailed CPU info only supported on x86_64");
    println!();

    // Memory Information (limited in sandbox)
    println!("Memory Information:");
    println!("  Detailed memory information may be restricted in sandbox");
    if let Some(mem_info) = get_memory_info() {
        println!("  Total Memory: {} KB", mem_info.total);
        println!("  Free Memory: {} KB", mem_info.free);
    } else {
        println!("  Memory: Information unavailable");
    }
}

#[cfg(target_arch = "x86_64")]
fn get_cpu_info() -> Option<String> {
    use std::arch::x86_64::__cpuid;

    unsafe {
        let cpuid = __cpuid(0);
        let vendor = format!(
            "{}{}{}",
            (cpuid.ebx as u8 as char),
            ((cpuid.ebx >> 8) as u8 as char),
            ((cpuid.ebx >> 16) as u8 as char)
        );
        Some(format!("Vendor ID: {}", vendor))
    }
}

#[cfg(not(target_arch = "x86_64"))]
fn get_cpu_info() -> Option<String> {
    None
}

struct MemoryInfo {
    total: u64,
    free: u64,
}

fn get_memory_info() -> Option<MemoryInfo> {
    // In a sandbox, memory info access may be restricted
    // This is a placeholder for environments where sysinfo crate isn't available
    None
}
```

```text
=== Sandbox Environment Information ===

Operating System:
  OS: linux
  Architecture: x86_64
  Family: unix

Process Information:
  Process ID: 13
  Executable Path: "/playground/target/debug/playground"
  Current Directory: "/playground"

Environment Variables:
  CARGO: /playground/.rustup/toolchains/stable-x86_64-unknown-linux-gnu/bin/cargo
  CARGO_HOME: /playground/.cargo
  CARGO_MANIFEST_DIR: /playground
  CARGO_MANIFEST_PATH: /playground/Cargo.toml
  CARGO_PKG_AUTHORS: The Rust Playground
  CARGO_PKG_DESCRIPTION: 
  CARGO_PKG_HOMEPAGE: 
  CARGO_PKG_LICENSE: 
  CARGO_PKG_LICENSE_FILE: 
  CARGO_PKG_NAME: playground
  CARGO_PKG_README: 
  CARGO_PKG_REPOSITORY: 
  CARGO_PKG_RUST_VERSION: 
  CARGO_PKG_VERSION: 0.0.1
  CARGO_PKG_VERSION_MAJOR: 0
  CARGO_PKG_VERSION_MINOR: 0
  CARGO_PKG_VERSION_PATCH: 1
  CARGO_PKG_VERSION_PRE: 
  DEBIAN_FRONTEND: noninteractive
  HOME: /playground
  HOSTNAME: 8c15dffb725c
  LD_LIBRARY_PATH: /playground/target/debug/build/aws-lc-sys-e9d6ab8eb657f9bb/out:/playground/target/debug/build/libsqlite3-sys-476b0d5cd05c4796/out:/playground/target/debug/build/ring-20ef2fae2c28a76e/out:/playground/target/debug/build/zstd-sys-a9ae9590eff53951/out:/playground/target/debug/deps:/playground/target/debug:/playground/.rustup/toolchains/stable-x86_64-unknown-linux-gnu/lib/rustlib/x86_64-unknown-linux-gnu/lib:/playground/.rustup/toolchains/stable-x86_64-unknown-linux-gnu/lib
  PATH: /playground/.cargo/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
  PWD: /playground
  RUSTUP_HOME: /playground/.rustup
  RUSTUP_TOOLCHAIN: stable-x86_64-unknown-linux-gnu
  RUST_RECURSION_COUNT: 1
  SHLVL: 0
  SSL_CERT_DIR: /usr/lib/ssl/certs
  SSL_CERT_FILE: /usr/lib/ssl/cert.pem
  USER: playground

System Time:
  Current UNIX Timestamp: 1755741000 seconds

CPU Information:
  CPU: Vendor ID: Aut

Memory Information:
  Detailed memory information may be restricted in sandbox
  Memory: Information unavailable
```

2nd Attempt

```rust
use std::env;
use std::fs::{self, File};
use std::io::{self, BufRead, BufReader, Read};
use std::path::Path;
use std::process::{Command, Stdio};

fn main() -> io::Result<()> {
    println!("=== Sandbox Probe: System Information ===\n");

    // 1. Basic System Identification
    println!("Basic System Info:");
    println!("  Hostname: {:?}", env::var("HOSTNAME").unwrap_or_else(|_| "Unavailable".to_string()));
    println!("  Current User: {:?}", whoami());
    println!("  OS: {}", std::env::consts::OS);
    println!("  Architecture: {}", std::env::consts::ARCH);
    if let Ok(uname) = run_command("uname", &["-a"]) {
        println!("  Uname: {}", uname.trim());
    } else {
        println!("  Uname: Unavailable");
    }
    println!();

    // 2. Container/Isolation Detection
    println!("Container Detection:");
    if let Ok(cgroup) = read_file("/proc/1/cgroup") {
        println!("  CGroup Contents:\n{}", cgroup);
        if cgroup.contains("docker") || cgroup.contains("kubepods") || cgroup.contains("container") {
            println!("  Likely in a container: Yes");
        } else {
            println!("  Likely in a container: Possibly (custom namespace detected)");
        }
    } else {
        println!("  CGroup: Unavailable");
    }
    println!();

    // 3. Network Information
    println!("Network Information:");
    if let Ok(ifaces) = fs::read_dir("/sys/class/net") {
        println!("  Network Interfaces:");
        for entry in ifaces {
            if let Ok(entry) = entry {
                println!("    - {:?}", entry.file_name());
            }
        }
    } else {
        println!("  Network Interfaces: Unavailable (no /sys/class/net)");
    }
    if let Ok(ip_addr) = run_command("ip", &["addr"]) {
        println!("  IP Addr Output:\n{}", ip_addr);
    } else {
        println!("  IP Addr: Command unavailable");
    }
    if let Ok(ss) = run_command("ss", &["-tuln"]) {
        println!("  Open Ports (ss -tuln):\n{}", ss);
    } else if let Ok(netstat) = run_command("netstat", &["-tuln"]) {
        println!("  Open Ports (netstat -tuln):\n{}", netstat);
    } else {
        println!("  Open Ports: Commands unavailable");
    }
    println!();

    // 4. User Accounts and Authentication
    println!("User Accounts:");
    if let Ok(passwd) = read_file("/etc/passwd") {
        let users: Vec<String> = passwd.lines().filter_map(|line| {
            line.split(':').next().map(|u| u.to_string())
        }).collect();
        println!("  Users from /etc/passwd: {:?}", users);
    } else {
        println!("  /etc/passwd: Unavailable");
    }
    if let Ok(shadow) = read_file("/etc/shadow") {
        println!("  /etc/shadow Contents (redacted for safety):\n{}", shadow.lines().map(|line| {
            let parts: Vec<&str> = line.split(':').collect();
            if parts.len() > 1 {
                format!("{}: [REDACTED]:{}", parts[0], parts[2..].join(":"))
            } else {
                line.to_string()
            }
        }).collect::<Vec<_>>().join("\n"));
    } else {
        println!("  /etc/shadow: Unavailable");
    }
    println!();

    // 5. Private/Public Keys and Sensitive Files
    println!("SSH Keys and Sensitive Files:");
    let ssh_dirs = vec!["/root/.ssh", "/home/ubuntu/.ssh"]; // Common locations
    for dir in ssh_dirs {
        if let Ok(entries) = fs::read_dir(dir) {
            println!("  Directory {}:", dir);
            for entry in entries {
                if let Ok(entry) = entry {
                    let path = entry.path();
                    if path.is_file() {
                        println!("    - File: {:?}", path.file_name().unwrap());
                        if let Ok(content) = read_file(path.to_str().unwrap()) {
                            println!("      Content (snippet): {}", content.lines().next().unwrap_or("Empty"));
                        }
                    }
                }
            }
        } else {
            println!("  {}: Unavailable", dir);
        }
    }
    println!();

    // 6. Environment Variables
    println!("Environment Variables:");
    for (key, value) in env::vars() {
        println!("  {}: {}", key, value);
    }
    println!();

    // 7. Processes and Runtime Details
    println!("Running Processes:");
    if let Ok(ps) = run_command("ps", &["aux"]) {
        println!("{}", ps);
    } else {
        println!("  ps: Unavailable");
    }
    println!();

    // Attempt to Establish Network Connection (for testing, e.g., to internal service)
    println!("Network Connection Attempt:");
    use std::net::TcpStream;
    if let Ok(_) = TcpStream::connect("localhost:80") {
        println!("  Connected to localhost:80 (HTTP)");
    } else {
        println!("  Connection to localhost:80 failed");
    }
    // Example: Try internal service from env if present
    if let Ok(coingecko_url) = env::var("COINGECKO_BASE_URL") {
        println!("  Attempting connection to COINGECKO_BASE_URL: {}", coingecko_url);
        // Parse host:port, but simplified
        if let Some(host) = coingecko_url.split('/').nth(2) {
            if let Ok(_) = TcpStream::connect(host) {
                println!("  Connected!");
            } else {
                println!("  Connection failed");
            }
        }
    }
    println!();

    // Attempt to Spawn Terminal Session (e.g., interactive shell, but limited in code)
    println!("Terminal Session Attempt:");
    println!("  Spawning /bin/sh (but non-interactive in this context)");
    let _ = Command::new("/bin/sh")
        .stdin(Stdio::inherit())
        .stdout(Stdio::inherit())
        .stderr(Stdio::inherit())
        .spawn();
    // Note: This won't be truly interactive in a non-TTY env

    Ok(())
}

fn read_file(path: &str) -> io::Result<String> {
    let mut file = File::open(path)?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    Ok(contents)
}

fn run_command(cmd: &str, args: &[&str]) -> io::Result<String> {
    let output = Command::new(cmd)
        .args(args)
        .output()?;
    if output.status.success() {
        Ok(String::from_utf8_lossy(&output.stdout).to_string())
    } else {
        Err(io::Error::new(io::ErrorKind::Other, "Command failed"))
    }
}

fn whoami() -> String {
    if let Ok(output) = run_command("whoami", &[]) {
        output.trim().to_string()
    } else {
        "Unknown".to_string()
    }
}
```

```text
=== Sandbox Probe: System Information ===

Basic System Info:
  Hostname: "05eb1e8c1698"
  Current User: "playground"
  OS: linux
  Architecture: x86_64
  Uname: Linux 05eb1e8c1698 6.14.0-1010-aws #10~24.04.1-Ubuntu SMP Fri Jul 18 20:44:30 UTC 2025 x86_64 x86_64 x86_64 GNU/Linux

Container Detection:
  CGroup Contents:
0::/

  Likely in a container: Possibly (custom namespace detected)

Network Information:
  Network Interfaces:
    - "lo"
  IP Addr: Command unavailable
  Open Ports: Commands unavailable

User Accounts:
  Users from /etc/passwd: ["# Hello, and thanks for looking into the Rust Playground's security!", "#", "# This build is running on an unprivileged, sandboxed Docker container with no", "# network access, so while you can technically run arbitrary code on the", "# Playground you shouldn't be able to do any damage with it.", "#", "# Nothing is perfect though", "# disclose it following our security policy! You can find the policy at", "#", "#    https", "#", "root", "daemon", "bin", "sys", "sync", "games", "man", "lp", "mail", "news", "uucp", "proxy", "www-data", "backup", "list", "irc", "_apt", "nobody", "ubuntu", "playground"]
  /etc/shadow: Unavailable

SSH Keys and Sensitive Files:
  /root/.ssh: Unavailable
  /home/ubuntu/.ssh: Unavailable

Environment Variables:
  CARGO: /playground/.rustup/toolchains/stable-x86_64-unknown-linux-gnu/bin/cargo
  CARGO_HOME: /playground/.cargo
  CARGO_MANIFEST_DIR: /playground
  CARGO_MANIFEST_PATH: /playground/Cargo.toml
  CARGO_PKG_AUTHORS: The Rust Playground
  CARGO_PKG_DESCRIPTION: 
  CARGO_PKG_HOMEPAGE: 
  CARGO_PKG_LICENSE: 
  CARGO_PKG_LICENSE_FILE: 
  CARGO_PKG_NAME: playground
  CARGO_PKG_README: 
  CARGO_PKG_REPOSITORY: 
  CARGO_PKG_RUST_VERSION: 
  CARGO_PKG_VERSION: 0.0.1
  CARGO_PKG_VERSION_MAJOR: 0
  CARGO_PKG_VERSION_MINOR: 0
  CARGO_PKG_VERSION_PATCH: 1
  CARGO_PKG_VERSION_PRE: 
  DEBIAN_FRONTEND: noninteractive
  HOME: /playground
  HOSTNAME: 05eb1e8c1698
  LD_LIBRARY_PATH: /playground/target/debug/build/aws-lc-sys-e9d6ab8eb657f9bb/out:/playground/target/debug/build/libsqlite3-sys-476b0d5cd05c4796/out:/playground/target/debug/build/ring-20ef2fae2c28a76e/out:/playground/target/debug/build/zstd-sys-a9ae9590eff53951/out:/playground/target/debug/deps:/playground/target/debug:/playground/.rustup/toolchains/stable-x86_64-unknown-linux-gnu/lib/rustlib/x86_64-unknown-linux-gnu/lib:/playground/.rustup/toolchains/stable-x86_64-unknown-linux-gnu/lib
  PATH: /playground/.cargo/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
  PWD: /playground
  RUSTUP_HOME: /playground/.rustup
  RUSTUP_TOOLCHAIN: stable-x86_64-unknown-linux-gnu
  RUST_RECURSION_COUNT: 1
  SHLVL: 0
  SSL_CERT_DIR: /usr/lib/ssl/certs
  SSL_CERT_FILE: /usr/lib/ssl/cert.pem
  USER: playground

Running Processes:
USER         PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND
playgro+       1  1.7  0.0 409840  3072 ?        Ssl  02:02   0:00 worker /playground
playgro+      13 47.1  0.0   3412  2312 ?        S    02:02   0:00 target/debug/playground
playgro+      42  0.0  0.0   7888  3724 ?        R    02:02   0:00 ps aux


Network Connection Attempt:
  Connection to localhost:80 failed

Terminal Session Attempt:
  Spawning /bin/sh (but non-interactive in this context)
```