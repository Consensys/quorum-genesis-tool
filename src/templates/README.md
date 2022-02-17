# Quorum Genesis Tool

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

1. Update the **<HOST>**  in both the permissions file and the static nodes files. Please note the selected ports are default and you may need to check firewall rules if using alternate ports
2. As above, update the permissions.json files
3. update **<HOST>** in every Besu nodes' config.toml 



### To start a HLF Besu node: 

```bash
/opt/besu/bin/besu --config-file=/config/config.toml 
```

Please refer to the [docs](https://besu.hyperledger.org/en/latest/HowTo/Configure/Using-Configuration-File/) for details on more cli args 


### To start a GoQuorum node:

```bash
geth --datadir=/data init /config/genesis.json;

# move nodekeys to the /data directory AFTER the init command
cp /config/accountKeystore /data/keystore/key;
cp /config/nodekey /data/geth/nodekey;

export ADDRESS=$$(grep -o '"address": *"[^"]*"' /config/accountKeystore | grep -o '"[^"]*"$$' | sed 's/"//g')

geth \
  --datadir /data \
  --nodiscover \
  --verbosity 5 \
  {%- if consensus === 'raft' -%}
  --raft --raftblocktime 300 --raftport 53000 \
  {%- else -%}
  --istanbul.blockperiod {{ blockperiod }} --mine --miner.threads 1 --miner.gasprice 0 --emitcheckpoints \
  {%- endif -%}
  --syncmode full --nousb \
  --metrics --pprof --pprof.addr 0.0.0.0 --pprof.port 9545 \
  --networkid {{ chainID }} \
  --http --http.addr 0.0.0.0 --http.port 8545 --http.corsdomain "*" --http.vhosts "*" \ 
  --ws --ws.addr 0.0.0.0 --ws.port 8546 --ws.origins "*" \
  {%- if consensus === 'raft' -%}
  --http.api admin,trace,db,eth,debug,miner,net,shh,txpool,personal,web3,quorum,raft \
  --ws.api admin,trace,db,eth,debug,miner,net,shh,txpool,personal,web3,quorum,raft \
  {%- elif consensus === 'ibft' -%}
  --http.api admin,trace,db,eth,debug,miner,net,shh,txpool,personal,web3,quorum,istanbul \
  --ws.api admin,trace,db,eth,debug,miner,net,shh,txpool,personal,web3,quorum,istanbul \
  {%- else -%}
  --http.api admin,trace,db,eth,debug,miner,net,shh,txpool,personal,web3,quorum,istanbul,qbft \
  --ws.api admin,trace,db,eth,debug,miner,net,shh,txpool,personal,web3,quorum,istanbul,qbft \
  {%- endif -%}
  --port 30303 \
  --unlock $${ADDRESS} --allow-insecure-unlock \
  --password /config/accountPassword \
  &> /var/log/quorum/geth-$$HOSTNAME-$$(hostname -i).log | tee -a /var/log/quorum/geth-$$HOSTNAME-$$(hostname -i).log

```

Please refer to the [docs](https://geth.ethereum.org/docs/interface/command-line-options) for details on more cli args 
