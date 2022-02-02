
# Quorum Genesis Tool

This configuration does not generate any monitoring configuration. We strongly recommend you follow the [notes](https://besu.hyperledger.org/en/stable/HowTo/Monitor/Metrics/) in the documentation to have something setup.    

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
  └── static-nodes.json                 # a list of static nodes to make peering faster
  └── genesisBesu.json                  # this genesis file for any HLF Besu nodes
  └── genesisGoQuorum.json              # this genesis file for any GoQuorum nodes
  └── userData.json                     # this answers provided in a single map
  └── besu-permissioned-nodes.json      # local permissions for any HLF Besu node
  └── goQuorum-permissioned-nodes.json  # local permissions for any GoQuorum node
  └── goQuorum-disallowed-nodes.json    # disallowed nodes for any GoQuorum node ie this new nodes will not connect to any nodes on this list
  └── userData.json                     # this answers provided in a single map
  └── README.md                         # this file     
  
```

## Usage

After the artifacts are created, please do the following:

1. Update the **<HOST>**  in both the permissions file and the static nodes files. Please note the selected ports are default and you may need to check firewall rules if using alternate ports
2. As above, update the permissions.json files
3. update **<HOST>** in every Besu nodes' config.toml 

