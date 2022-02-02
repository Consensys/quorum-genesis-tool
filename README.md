# Quorum Genesis Tool


## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Troubleshooting](#troubleshooting)

## Prerequisites

- [Nodejs](https://nodejs.org/en/download/) or [Yarn](https://yarnpkg.com/cli/node)


## Usage

Create the artifacts with:

```bash


```


## Troubleshooting

txnsizelimit = yourNumber.toString('hex');


## TODO

- static files & permissions

//static-nodes.json
[
"enode://8208a3f344695d44e9cf2c023683cbea7b9343e2f70a5e804bd2c93858e945f8f91439eef96a4ab6c47ff06637d6fbe6472f96de1655a1bee57ea896654f3a22@172.16.239.11:30303",
"enode://b9050e002aa42464e6b07c811a1f9dfec01249af03f67b753e8415420649b184447bb2a784863ccbf327ad9e31aaba803464979dfe6a7facc669151a5fa6ad1b@172.16.239.12:30303",
...
]
  
//permissions
nodes-allowlist=[
"enode://8208a3f344695d44e9cf2c023683cbea7b9343e2f70a5e804bd2c93858e945f8f91439eef96a4ab6c47ff06637d6fbe6472f96de1655a1bee57ea896654f3a22@172.16.239.11:30303",
"en

//disallowed-nodes.json - template copy
[]

- besu config.toml
- tessera config.json
- check the hex string and number values in the genesis & quorumConfig
- check out the genesis files with the quickstart
- yargs 
- readme

