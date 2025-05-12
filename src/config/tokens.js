// ERC20 代币的 ABI，只需要 balanceOf 方法
export const ERC20_ABI = [
  {
    "constant": true,
    "inputs": [{"name": "_owner", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "balance", "type": "uint256"}],
    "type": "function"
  }
];

export const tokens = {
  ethereum: {
    USDT: {
      name: 'Tether USD',
      symbol: 'USDT',
      decimals: 6,
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7'
    },
    USDC: {
      name: 'USD Coin',
      symbol: 'USDC',
      decimals: 6,
      address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
    },
    DAI: {
      name: 'Dai Stablecoin',
      symbol: 'DAI',
      decimals: 18,
      address: '0x6B175474E89094C44Da98b954EedeAC495271d0F'
    },
    UNI: {
      name: 'Uniswap',
      symbol: 'UNI',
      decimals: 18,
      address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'
    }
  },
  bsc: {
    USDT: {
      name: 'Tether USD',
      symbol: 'USDT',
      decimals: 18,
      address: '0x55d398326f99059fF775485246999027B3197955'
    },
    USDC: {
      name: 'USD Coin',
      symbol: 'USDC',
      decimals: 18,
      address: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d'
    },
    BUSD: {
      name: 'Binance USD',
      symbol: 'BUSD',
      decimals: 18,
      address: '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56'
    }
  },
  polygon: {
    USDT: {
      name: 'Tether USD',
      symbol: 'USDT',
      decimals: 6,
      address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F'
    },
    USDC: {
      name: 'USD Coin',
      symbol: 'USDC',
      decimals: 6,
      address: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174'
    },
    DAI: {
      name: 'Dai Stablecoin',
      symbol: 'DAI',
      decimals: 18,
      address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063'
    }
  },
  arbitrum: {
    USDT: {
      name: 'Tether USD',
      symbol: 'USDT',
      decimals: 6,
      address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9'
    },
    USDC: {
      name: 'USD Coin',
      symbol: 'USDC',
      decimals: 6,
      address: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8'
    },
    DAI: {
      name: 'Dai Stablecoin',
      symbol: 'DAI',
      decimals: 18,
      address: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1'
    }
  },
  wanchain: {
    USDT: {
      name: 'Tether USD',
      symbol: 'USDT',
      decimals: 6,
      address: '0x11e77E27Af5539872efEd10abaA0b408cfd9fBBD'
    }
  }
};
