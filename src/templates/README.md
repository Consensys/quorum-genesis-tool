
# Quorum Genesis Tool

This configuration does not generate any monitoring configuration. We strongly recommend you follow the [notes](https://besu.hyperledger.org/en/stable/HowTo/Monitor/Metrics/) in the documentation to have something setup.    


```bash
├── validator-0
│   ├── config.toml
│   ├── key
│   ├── nodeData.json
│   └── pubKey
├── validator-n
│   ├── config.toml
│   ├── key
│   ├── nodeData.json
│   └── pubKey
├── bootnode-0
│   ├── config.toml
│   ├── key
│   ├── nodeData.json
│   └── pubKey
├── bootnode-n
│   ├── config.toml
│   ├── key
│   ├── nodeData.json
│   └── pubKey
├── member-0
│   ├── config.toml
│   ├── key
│   ├── nodeData.json
│   └── pubKey
├── member-n
│   ├── config.toml
│   ├── key
│   ├── nodeData.json
│   ├── orion.conf
│   └── pubKey
├── genesis.json
└── userData.json
```