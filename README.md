# Quorum Genesis Tool


## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Troubleshooting](#troubleshooting)

## Prerequisites

- [Nodejs](https://nodejs.org/en/download/) 

## Usage

Create the artifacts with:

```bash
npx quorum-genesis-tool

   ___
  / _ \  _   _   ___   _ __  _   _  _ __ ___
 | | | || | | | / _ \ | '__|| | | || '_'  _  \
 | |_| || |_| || (_) || |   | |_| || | | | | |
  \__\_\ \__,_| \___/ |_|    \__,_||_| |_| |_|

      / ___|  ___  _ __    ___  ___ (_) ___
     | |  _  / _ \| '_ \  / _ \/ __|| |/ __|
     | |_| ||  __/| | | ||  __/\__ \| |\__ \
      \____| \___||_| |_|_\___||___/|_||___/
              _____              _
             |_   _|___    ___  | |
               | | / _ \  / _ \ | |
               | || (_) || (_) || |
               |_| \___/  \___/ |_|



Welcome to the Quorum Genesis Tool. This tool can be used
to rapidly generate genesis, account keys, and configs for Besu and GoQuorum.

To get started, be sure that you have read Besu and GoQuorum documentation regarding
genesis config options, then answer the following questions.

Which consensus algorithm will you use? Default: QBFT
        1. IBFT1
        2. IBFT2
        3. QBFT
        4. Clique
        5. RAFT
 
Set your chainID value: (integer) Default: 1337
 
Set your blockperiodseconds value: (integer) Default: 5
 
Set your requestTimeoutSeconds value: (integer) Default: 10
 
Set your epoch length value: (integer) Default: 30000
 
Set your difficulty: (integer) Default: 1
 
Set your gas limit value: (string) Default: 0xFFFF
 
Set your coinbase address for rewards: (string) Default: 0x0000000000000000000000000000000000000000
 
Set your max code size value: (integer) Default: 64
 
Set your transaction size limit value: (integer) Default: 64
 
Choose number of validator node keys to generate: (integer) Default: 4
 
Choose number of member node keys to generate: (integer) Default: 2
 
Choose number of bootnode node keys to generate: (integer) Default: 2
 
Choose your encryption curve: Default: [1]
        1. secp256k1
        2. secp256r1
 
Set your account password: (empty for none)


```
 
This prompts you to pick a consensus algorithm variant, and specifics for your genesis file. By default, 
artifact files are stored at `./output/<TIMESTAMP>`, where *TIMESTAMP* is the time in a user friendly string:

```


Alternatively, you can use cli options and skip the prompt above like so:

TODO: update me
```
npx quorum-genesis-tool --clientType besu --outputPath ./quorum-test-network --monitoring default --privacy true --orchestrate false --quorumKeyManager false
```

The arguments ```--consensus``` and ```--clientType``` are required, the others contain defaults if left blank.


## Troubleshooting

## TODO

- check out the genesis files with the quickstart
- yargs 


