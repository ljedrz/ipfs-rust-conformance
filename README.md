# ipfs-rust-conformance
> Conformance testing for Rust IPFS

This repository contains the scripts used to run interface conformance testing for Rust IPFS. It uses `js-ipfsd-ctl`, `npm-rust-ipfs-dep`, and `interface-js-ipfs-core`. This code will likely either be integrated into `ipfs-rust/rust-ipfs` directly or integrated via CI.

# Install

To install the script and ready it for use, clone this repo:

```bash
$ git clone https://github.com/ipfs-rust/ipfs-rust-conformance
```

# Usage

```bash
$ npm test
```

For development, you can symlink http to your rust-ipfs-http executable, and
then use the `rust.sh` as IPFS_RUST_EXEC to run tests and capture all output
from the binary.

```bash
$ ln -s /path/to/rust-ipfs/target/ipfs-http ./http
$ IPFS_RUST_EXEC=$(pwd)/rust.sh npm test
$ cat /tmp/rust.log
```

# Contributing

Issues and pull requests welcome.

# License

TBD

## Trademarks

The [Rust logo and wordmark](https://www.rust-lang.org/policies/media-guide) are trademarks owned and protected by the [Mozilla Foundation](https://mozilla.org). The Rust and Cargo logos (bitmap and vector) are owned by Mozilla and distributed under the terms of the [Creative Commons Attribution license (CC-BY)](https://creativecommons.org/licenses/by/4.0/).
