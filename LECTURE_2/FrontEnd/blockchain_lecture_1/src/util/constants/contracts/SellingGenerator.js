var address = "0x447510b73e91dEEC4309F2e29A26fA2606898Bdf";

const ABI = [
    {
      "inputs": [],
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
          "name": "_newContract",
          "type": "address"
        }
      ],
      "name": "newSelling",
      "type": "event",
      "signature": "0x8abd2b9b75c82f4d24d44b0ebea2edbe5fabbb3f525baae6a39b61bd79de02d0"
    },
    {
      "constant": false,
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
      "name": "sellingContractGenerator",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0xa6412597"
    }
  ]



export {address, ABI}