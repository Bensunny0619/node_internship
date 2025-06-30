const { Web3 } = require('web3');
const web3 = new Web3(`https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`);

module.exports = {
  createWallet: () => {
    return web3.eth.accounts.create();
  },

  getAccount: (privateKey) => {
    return web3.eth.accounts.privateKeyToAccount(privateKey);
  },

  getBalance: async (address) => {
    const balanceWei = await web3.eth.getBalance(address);
    return web3.utils.fromWei(balanceWei, 'ether');
  },

  signMessage: (privateKey, message) => {
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    return account.sign(message).signature;
  },

  transferEther: async (privateKey, to, amount) => {
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    const nonce = await web3.eth.getTransactionCount(account.address);
    const tx = {
      from: account.address,
      to,
      value: web3.utils.toWei(amount, 'ether'),
      gas: 21000,
      nonce,
    };

    const signed = await account.signTransaction(tx);
    const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
    return receipt;
  },
};
