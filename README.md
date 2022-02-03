# Quorum Genesis Tool


## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Troubleshooting](#troubleshooting)

## Prerequisites

- [Nodejs](https://nodejs.org/en/download/) 

## Usage

**NOTE**: Where possible, based on the consensus algortithm selected, the Quorum Genesis Tool will create keys and genesis files for both HLF Besu and GoQuorum and you can pick the one you'd like to use. At present only **QBFT** has cross client compatibility.


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




Alternatively, you can use cli options and skip the prompt above like so:

To generate keys for QBFT (default) with 4 validators, 2 bootnodes and 2 members:
```
npx quorum-genesis-tool --consensus QBFT
```

To generate config for HLF Besu using QBFT
```
npx quorum-genesis-tool --consensus qbft --chainID 400 --blockperiod 5 --requestTimeout 10 --epochLength 30000 --difficulty 1 --gasLimit '0xFFFFFF' --coinbase '0x0000000000000000000000000000000000000000' --validators 4 --members 1 --bootnodes 0
```

To generate config for GoQuorum using IBFT
```
npx quorum-genesis-tool --consensus ibft --chainID 400 --blockperiod 5 --requestTimeout 10 --epochLength 30000 --difficulty 1 --gasLimit '0xFFFFFF' --coinbase '0x0000000000000000000000000000000000000000' --validators 4 --members 1 --bootnodes 0
```

## Troubleshooting
