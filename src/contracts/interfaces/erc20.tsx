import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-launchpad";

export interface AllowanceResponse {
    readonly allowance: string
}

export interface BalanceResponse {
    readonly balance: string
}

export interface ERC20Instance {
    readonly contractAddress: string;

    // queries
    balance: (address: string) => Promise<BalanceResponse>;
    allowance: (owner: string, spender: string) => Promise<AllowanceResponse>;

    // actions
    approve: (spender: string, amount: string) => Promise<string>;
    transfer: (recipient: string, amount: string) => Promise<string>;
    transferFrom: (owner: string, recipient: string, amount: string) => Promise<string>;
    burn: (amount: string) => Promise<string>;
}

export interface ERC20Contract{
    use: (contractAddress: string) => ERC20Instance
}

export const ERC20 = (client: SigningCosmWasmClient): ERC20Contract => {
    const use = (contractAddress: string): ERC20Instance => {
        const balance = async (address: string): Promise<BalanceResponse> => {
            return client.queryContractSmart(contractAddress, {
                balance: {address}
            })
        }
        const allowance = async (owner:string, spender: string): Promise<AllowanceResponse> => {
            return client.queryContractSmart(contractAddress, {
                allowance:{
                    owner, spender
                }
            })
        }
        const approve = async (spender: string, amount: string): Promise<string> => {
            const result = await client.execute(contractAddress, {approve:{spender, amount}})
            return result.transactionHash
        }
        const transfer = async (recipient: string, amount: string): Promise<string> => {
            const result = await client.execute(contractAddress, {transfer: {recipient, amount}})
            return result.transactionHash
        }
        const transferFrom = async (owner: string, recipient: string, amount: string): Promise<string> => {
            const result = await client.execute(contractAddress, {transfer_from: {owner, recipient, amount}})
            return result.transactionHash
        }
        const burn = async (amount: string): Promise<string> => {
            const result = await client.execute(contractAddress, {burn: {amount}})
            return result.transactionHash
        }
        return {
            contractAddress,
            balance,
            allowance,
            approve,
            transfer,
            transferFrom,
            burn
        }
    }
    return {use}
}