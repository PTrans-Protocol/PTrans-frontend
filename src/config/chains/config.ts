import { CoinMap } from "./utils";
export interface KeplrCoin {
    readonly coinDenom: string;
    readonly coinMinimalDenom: string;
    readonly coinDecimals: number;
    readonly coinGeckoId: string;
}
export interface KeplrConfig {
    readonly chainId: string;
    readonly chainName: string;
    readonly rpc: string;
    readonly rest: string;
    readonly bech32Config: {
      readonly bech32PrefixAccAddr: string;
      readonly bech32PrefixAccPub: string;
      readonly bech32PrefixValAddr: string;
      readonly bech32PrefixValPub: string;
      readonly bech32PrefixConsAddr: string;
      readonly bech32PrefixConsPub: string;
    };
    readonly currencies: readonly KeplrCoin[];
    readonly feeCurrencies: readonly KeplrCoin[];
    readonly stakeCurrency: KeplrCoin;
    readonly gasPriceStep: {
      readonly low: number;
      readonly average: number;
      readonly high: number;
    };
    readonly bip44: { readonly coinType: number };
    readonly coinType: number;
  }
export interface AppConfig{
    readonly chainId: string;
    readonly chainName: string;
    readonly addressPrefix: string;
    readonly rpcUrl: string;
    readonly faucetUrl: string;
    readonly lcdUrl: string;
    readonly explorerUrl?: string;
    readonly feeToken: string;
    readonly stakingToken: string;
    readonly coinMap: CoinMap;
    readonly gasPrice: number;
}

export interface NetworkConfigs{
    readonly defaultConfig: AppConfig;
    readonly [key: string]: AppConfig;
}


export function getAppConfig(configs: NetworkConfigs): AppConfig{
    const network = process.env.NETWORK
    if(!network) return configs.defaultConfig

    const config = configs[network]
    if(!config){
        return configs.defaultConfig
    }
    return config
}

export function configKeplr(config: AppConfig): KeplrConfig{
    // return {
    //     chainId: config.chainId,
    //     chainName: config.chainName,
    //     rpc: config.rpcUrl,
    //     rest: config.lcdUrl,
    //     bech32Config: {
    //       bech32PrefixAccAddr: `${config.addressPrefix}`,
    //       bech32PrefixAccPub: `${config.addressPrefix}pub`,
    //       bech32PrefixValAddr: `${config.addressPrefix}valoper`,
    //       bech32PrefixValPub: `${config.addressPrefix}valoperpub`,
    //       bech32PrefixConsAddr: `${config.addressPrefix}valcons`,
    //       bech32PrefixConsPub: `${config.addressPrefix}valconspub`,
    //     },
    //     currencies: [
    //       {
    //         coinDenom: config.coinMap[config.feeToken].denom,
    //         coinMinimalDenom: config.feeToken,
    //         coinDecimals: config.coinMap[config.feeToken].fractionalDigits,
    //       },
    //       {
    //         coinDenom: config.coinMap[config.stakingToken].denom,
    //         coinMinimalDenom: config.stakingToken.slice(1),
    //         coinDecimals: config.coinMap[config.stakingToken].fractionalDigits,
    //       },
    //     ],
    //     feeCurrencies: [
    //       {
    //         coinDenom: config.coinMap[config.feeToken].denom,
    //         coinMinimalDenom: config.feeToken.slice(1),
    //         coinDecimals: config.coinMap[config.feeToken].fractionalDigits,
    //       },
    //     ],
    //     stakeCurrency: {
    //       coinDenom: config.coinMap[config.stakingToken].denom,
    //       coinMinimalDenom: config.stakingToken.slice(1),
    //       coinDecimals: config.coinMap[config.stakingToken].fractionalDigits,
    //     },
    //     gasPriceStep: {
    //       low: config.gasPrice / 2,
    //       average: config.gasPrice,
    //       high: config.gasPrice * 2,
    //     },
    //     bip44: { coinType: 118 },
    //     coinType: 118,
    //   };
    return {chainId: "Oraichain-testnet",
    chainName: "Orai Test",
    rpc: "https://testnet-rpc.orai.io",
    rest: "https://testnet-lcd.orai.io",
    bip44: {
      coinType: 118,
    },
    bech32Config: {
      bech32PrefixAccAddr: "orai",
      bech32PrefixAccPub: "orai" + "pub",
      bech32PrefixValAddr: "orai" + "valoper",
      bech32PrefixValPub: "orai" + "valoperpub",
      bech32PrefixConsAddr: "orai" + "valcons",
      bech32PrefixConsPub: "orai" + "valconspub",
    },
    currencies: [
      {
        coinDenom: "ORAI",
        coinMinimalDenom: "orai",
        coinDecimals: 6,
        coinGeckoId: "oraichain-token",
      },
    ],
    feeCurrencies: [
      {
        coinDenom: "ORAI",
        coinMinimalDenom: "orai",
        coinDecimals: 6,
        coinGeckoId: "oraichain-token",
      },
    ],
    stakeCurrency: {
      coinDenom: "ORAI",
      coinMinimalDenom: "orai",
      coinDecimals: 6,
      coinGeckoId: "oraichain-token",
    },
    coinType: 118,
    gasPriceStep: {
      low: 0,
      average: 0.00005,
      high: 0.0001,
    },
  };
}

const cliffnet: AppConfig = {
  chainId: "cliffnet-1",
  chainName: "cliffnet-1",
  addressPrefix: "wasm",
  rpcUrl: "https://rpc.cliffnet.cosmwasm.com:443",
  lcdUrl: "https://lcd.cliffnet.cosmwasm.com",
  faucetUrl: "https://faucet.cliffnet.cosmwasm.com",
  feeToken: "upebble",
  stakingToken: "urock",
  coinMap: {
    upebble: { denom: "PEBBLE", fractionalDigits: 6 },
    urock: { denom: "ROCK", fractionalDigits: 6 },
  },
  gasPrice: 0.025,
}
const oraitestnet: AppConfig = {
    chainId: "Oraichain-testnet",
    chainName: "Oraichain-testnet",
    addressPrefix: "orai",
    rpcUrl: "https://testnet-rpc.orai.io",
    lcdUrl: "https://testnet-lcd.orai.io",
    faucetUrl: "",
    explorerUrl: "https://testnet.scan.orai.io",
    feeToken: "uorai",
    stakingToken: "uorai",
    coinMap:{
        uorai: {denom: "ORAI", fractionalDigits: 6}
    },
    gasPrice: 0.025,
}
const defaultConfig: AppConfig = oraitestnet

const configs: NetworkConfigs = {defaultConfig, cliffnet, oraitestnet}

export const config: AppConfig = getAppConfig(configs)

export const keplrConfig: KeplrConfig = configKeplr(config)