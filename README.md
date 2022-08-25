# Quorum Genesis Tool

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Usage](#usage)
3. [Troubleshooting](#troubleshooting)

## Prerequisites

- [Nodejs](https://nodejs.org/en/download/)

## Usage

**NOTE**: Where possible, based on the consensus algortithm selected, the Quorum Genesis Tool will create keys and genesis files for both HLF Besu and GoQuorum and you can pick the one you'd like to use. At present only **QBFT** has cross client compatibility.

### Generation of Keys

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

(GoQ only) Set your emptyblockperiodseconds value: (integer) Default: 60

Set your requestTimeoutSeconds value: (integer) Default: 10

Set your epoch length value: (integer) Default: 30000

Set your difficulty: (integer) Default: 1

Set your gas limit value: (string) Default: 0xFFFF

Set your coinbase address for rewards: (string) Default: 0x0000000000000000000000000000000000000000

Set your max code size value: (integer) Default: 64

Set your transaction size limit value: (integer) Default: 64

Choose number of validator node keys to generate: (integer) Default: 4

Choose number of member node keys to generate: (integer) Default: 1

Choose number of bootnode node keys to generate: (integer) Default: 2

Set your account password: (empty for none)


```

This prompts you to pick a consensus algorithm variant, and specifics for your genesis file. By default,
artifact files are stored at `./output/<TIMESTAMP>`, where _TIMESTAMP_ is the time in a user friendly string:

Alternatively, you can use cli options and skip the prompt above like so:

```
npx quorum-genesis-tool --help

Options:
  --help                   Show help                                   [boolean]
  --version                Show version number                         [boolean]
  --consensus              Consensus algorithm to use
        [string] [required] [choices: "ibft", "ibft2", "qbft", "clique", "raft"]
                                                               [default: "qbft"]
  --chainID                ChainID for blockchain
                                             [number] [required] [default: 1337]
  --blockperiod            Number of seconds per block
                                                [number] [required] [default: 5]
  --requestTimeout         Minimum request timeout for each round
                                                          [number] [default: 10]
  --emptyBlockPeriod       Reduce number (seconds) of blocks produced when there
                           are no transactions            [number] [default: 60]
  --epochLength            Number of blocks after which votes reset
                                            [number] [required] [default: 30000]
  --difficulty             Difficulty of network[number] [required] [default: 1]
  --gasLimit               Block gas limit
                                         [string] [required] [default: "0xFFFF"]
  --coinbase               Address to pay mining rewards to
                [string] [default: "0x0000000000000000000000000000000000000000"]
  --maxCodeSize            Maximum contract size (kb)     [number] [default: 64]
  --txnSizeLimit           Maximum transaction size (kb)  [number] [default: 64]
  --validators             Number of validator node keys to generate
                                                [number] [required] [default: 4]
  --members                Number of member node keys to generate
                                                [number] [required] [default: 1]
  --bootnodes              Number of bootnode node keys to generate
                                                [number] [required] [default: 2]
  --accountPassword        Password for keys              [string] [default: ""]
  --outputPath             Output path relative to current directory
                                                  [string] [default: "./output"]
  --tesseraEnabled         Whether to generate tessera keys
                                                      [boolean] [default: false]
  --tesseraPassword        Set password to encrypt generated keys
                                                          [string] [default: ""]
  --quickstartDevAccounts  Include quorum-dev-quickstart test accounts
                                           [boolean] [required] [default: false]
```

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

### Eth Accounts and Tessera Passwords

**Eth Accounts**

For each node (bootnode/validator/member) an account is generated (files in their respective directories start with `account*`) to perform transactions and prefilled with a large balance. If you would like to remove or edit certain accounts from the genesis before the network has been spun up, you can find the genesis for Besu and goQuorum under each of their respective directories (`besu/genesis.json` or `goQuorum/genesis.json`). 

If the flag `quickstartDevAccounts` is set to `true`, it will include the [quorum-dev-quickstart](https://github.com/ConsenSys/quorum-dev-quickstart) test accounts. _**It is important to remove these accounts when going into production!**_

If the flag is not specified, then it will default to `false` with the assumption that the genesis is to be used in production. You should specify the flag only if you would like the accounts in testing/dev.

**Tessera Passwords and Configuration**

If you opt to provide a tesseraPassword to encrypt the tessera private keys, you will need to pass a `passwordFile` field with the password in a file. You will also need to update the `privateKeyPath` and `publicKeyPath` to the paths where you store your keys. See more [here](https://docs.tessera.consensys.net/en/stable/HowTo/Configure/Keys/File-Based-Key-Pairs/).

### Using the keys and genesis files on instances

Once generated, the output should resemble the file structure below.

```bash
  ├── validator0
  │   └──  nodekey                      # the node private key
  │   └──  nodekey.pub                  # the node's public key which is used in the enode
  │   └──  address                      # the node's address which is used to vote the validator in/out
  │   └──  accountAddress               # GoQuorum only - the accountAddress
  │   └──  accountKeystore              # GoQuorum only - the account's v3 keystore
  │   └──  accountPassword              # GoQuorum only - the account's password (you would have supplied this)
  │   └──  accountPrivateKey            # GoQuorum only - the account's private key
  │               └── ...
  ├── validatorN
  │   └──  nodekey                      # the node private key
  │   └──  nodekey.pub                  # the node's public key which is used in the enode
  │   └──  ...
  |
  ├── bootnodeN
  │   └──  nodekey                      # the node private key
  │   └──  nodekey.pub                  # the node's public key which is used in the enode
  │   └──  ...
  |
  ├── memberN
  │   └──  nodekey                      # the node private key
  │   └──  nodekey.pub                  # the node's public key which is used in the enode
  │   └──  ...
  |
  └── besu
  │   └──  static-nodes.json            # a list of static nodes to make peering faster
  │   └──  genesis.json                 # this genesis file for any HLF Besu nodes
  │   └──  permissioned-nodes.json      # local permissions for any HLF Besu node
  │
  └── goQuorum
  │   └──  static-nodes.json            # a list of static nodes to make peering faster
  │   └──  genesis.json                 # this genesis file for any GoQuorum nodes
  │   └──  permissioned-nodes.json      # local permissions for any GoQuorum node
  │   └──  disallowed-nodes.json        # disallowed nodes for any GoQuorum node ie this new nodes will not connect to any nodes on this list
  │
  └── userData.json                     # this answers provided in a single map
  └── README.md                         # this file

```

Please remember to do the following:

1. Update the **<HOST>** in both the permissions file and the static nodes files. Please note the selected ports are default and you may need to check firewall rules if using alternate ports
2. As above, update the permissions.json files
3. Update **<HOST>** in every Besu nodes' config.toml
