import { CosmWasmClient } from "@cosmjs/cosmwasm-launchpad";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { OfflineSigner } from "@cosmjs/launchpad";
import * as React from "react";
import { useEffect, useState } from "react";
import { AppConfig, keplrConfig } from "../../config/chains/config";
import { createSender, createReader, getKeplrSigner } from "./sdk";

interface CosmWasmContextType {
  readonly initialized: boolean;
  readonly address: string;
  readonly config: Partial<AppConfig>;
  readonly init: (signer: OfflineSigner) => void;
  readonly clear: () => void;
  readonly getSigner: () => OfflineSigner;
  readonly getSender: () => SigningCosmWasmClient;
  readonly getReader: () => CosmWasmClient;
  readonly changeConfig: (updates: Partial<AppConfig>) => void;
  readonly changeSigner: (newSigner: OfflineSigner) => void;
}

function notInitialized(): any {
  return undefined;
}

const defaultContext: CosmWasmContextType = {
  initialized: false,
  address: "",
  config: {},
  init: notInitialized,
  clear: notInitialized,
  getSigner: notInitialized,
  getSender: notInitialized,
  getReader: notInitialized,
  changeConfig: notInitialized,
  changeSigner: notInitialized,
};

const CosmWasmContext =
  React.createContext<CosmWasmContextType>(defaultContext);

export const useSdk = (): CosmWasmContextType =>
  React.useContext(CosmWasmContext);

interface SdkProviderProps extends React.HTMLAttributes<HTMLOrSVGElement> {
  readonly config: AppConfig;
}

export function SdkProvider({
  config: configProp,
  children,
}: SdkProviderProps): JSX.Element {
  const [config, setConfig] = useState(configProp);
  const [signer, setSigner] = useState<OfflineSigner>();
  const [client, setClient] = useState<SigningCosmWasmClient>();

  const contextWithInit = { ...defaultContext, init: setSigner, getReader: () => createReader(configProp) };
  const [value, setValue] = useState<CosmWasmContextType>(contextWithInit);

  function clear() {
    setValue({ ...contextWithInit });
    localStorage.setItem("clear", "true");
  }

  function changeConfig(updates: Partial<AppConfig>) {
    setConfig((config) => ({ ...config, ...updates }));
  }

  useEffect(() => {
    if (!signer) {
      const cleared = localStorage.getItem("clear");
      if (cleared === "true") return;
      const keplr = getKeplrSigner(keplrConfig);

      if (!keplr) return;
      (async function updateClient() {
        const client = await createSender(config, keplr);
        setClient(client);
      })();
      setSigner(keplr);
    } else
      (async function updateClient() {
        const client = await createSender(config, signer);
        setClient(client);
      })();
  }, [signer, config]);

  useEffect(() => {
    if (!signer || !client) return;

    (async function updateValue() {
      const address = (await signer.getAccounts())[0].address;
      setValue(prev => ({
        ...prev,
        initialized: true,
        address,
        config,
        init: () => {},
        clear,
        getSigner: () => signer,
        getSender: () => client,
        changeConfig,
        changeSigner: setSigner,
      }));
    })();
  }, [client]);

  return (
    <CosmWasmContext.Provider value={value}>
      {children}
    </CosmWasmContext.Provider>
  );
}
