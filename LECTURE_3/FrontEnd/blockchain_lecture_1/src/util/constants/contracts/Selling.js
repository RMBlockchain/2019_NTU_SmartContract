var address = "0x53d876C5143ee7C3bdcc29e5CaECfb4170db0E84";

const ABI = [
    {
      "constant": true,
      "inputs": [],
      "name": "seller",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x08551a53"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "sellCount",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x0c6b6737"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "productName",
      "outputs": [
        {
          "name": "",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x7f7650eb"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "price",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xa035b1fe"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "buyer",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xb7748208"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "contractActive",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xe289fcb6"
    },
    {
      "inputs": [
        {
          "name": "_seller",
          "type": "address"
        },
        {
          "name": "_price",
          "type": "uint256"
        },
        {
          "name": "_productName",
          "type": "string"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor",
      "signature": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "_buyer",
          "type": "address"
        }
      ],
      "name": "Sold",
      "type": "event",
      "signature": "0xfbd6287d9242307b2750fc8252314857896e312d167cdbc9eed322bae8828e00"
    },
    {
      "constant": false,
      "inputs": [],
      "name": "buyItems",
      "outputs": [],
      "payable": true,
      "stateMutability": "payable",
      "type": "function",
      "signature": "0xc0258191"
    }
  ]



export {address, ABI}