import { Bip39, Random } from "@cosmjs/crypto";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { CosmWasmClient } from "@cosmjs/cosmwasm-launchpad";
import {
  GasLimits,
  GasPrice,
  makeCosmoshubPath,
  OfflineSigner,
  Secp256k1HdWallet,
} from "@cosmjs/launchpad";
import { AppConfig, KeplrConfig } from "../../config/chains/config";

export function generateMnemonic(): string {
  return Bip39.encode(Random.getBytes(16)).toString();
}
export function loadOrCreateMnemonic(): string {
  const key = "burner-wallet";
  const loaded = localStorage.getItem(key);
  if (loaded) return loaded;
  const generated = generateMnemonic();
  localStorage.setItem(key, generated);
  return generated;
}

export async function loadOrCreateWallet(
  chainId: string,
  addressPrefix?: string
): Promise<OfflineSigner> {
  const mnemonic = loadOrCreateMnemonic();
  const hdPath = makeCosmoshubPath(0);
  const wallet = await Secp256k1HdWallet.fromMnemonic(mnemonic, {
    hdPaths: [hdPath],
    prefix: addressPrefix,
  });
  return wallet;
}

export async function loadKeplrWallet(
  keplrConfig: KeplrConfig
): Promise<OfflineSigner | Error> {
  const anyWindow: any = window;
  if (!anyWindow.getOfflineSigner || !anyWindow.keplr) {
    return new Error("Keplr extension is not available");
  }
  if (anyWindow.keplr.experimentalSuggestChain) {
    try {
      await anyWindow.keplr.experimentalSuggestChain(keplrConfig);
    } catch {
      return new Error("Failed to suggest chain");
    }
  } else {
    return new Error("Please use the recent version of keplr extension");
  }
  await anyWindow.keplr.enable(keplrConfig.chainId);
  return anyWindow.getOfflineSigner(keplrConfig.chainId);
}

export function getKeplrSigner(
  keplrConfig: KeplrConfig
): OfflineSigner | undefined {
  const anyWindow: any = window;
  if (anyWindow.getOfflineSigner) {
    return anyWindow.getOfflineSigner(keplrConfig.chainId);
  } else return;
}

export async function createSender(
  config: AppConfig,
  signer: OfflineSigner
): Promise<SigningCosmWasmClient> {
  // const accounts = await signer.getAccounts()
  // if(!accounts || accounts.length == 0){
  //     throw new Error("Cannot get accounts")
  // }
  // const firstAddress = accounts[0].address
  // const gasPrice = GasPrice.fromString(`${config.gasPrice}${config.feeToken}`)
  // const gasLimits: GasLimits<CosmWasmFeeTable> = {
  //     upload: 1500000,
  //     init: 600000,
  //     exec: 400000,
  //     migrate: 600000,
  //     send: 80000,
  //     changeAdmin: 80000,
  // }
  // return new SigningCosmWasmClient(config.lcdUrl, firstAddress, signer, gasPrice, gasLimits)
  const sendingClient = await SigningCosmWasmClient.connectWithSigner(
    config.rpcUrl,
    signer,
    {
      prefix: config.addressPrefix,
      gasPrice: GasPrice.fromString("0" + config.feeToken),
      gasLimits: {
        exec: 200000000,
      },
    }
  );
  console.log(sendingClient);
  return sendingClient;
}

export function createReader(config: AppConfig) : CosmWasmClient{
    return new CosmWasmClient(config.lcdUrl)
}