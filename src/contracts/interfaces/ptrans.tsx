import { CosmWasmClient } from "@cosmjs/cosmwasm-launchpad";
import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate";

export interface CheckSpentResponse {
    readonly is_spent: boolean
}

export interface GetLastRootResponse {
    readonly last_root: string
}

export interface ExecuteResponse{
    readonly txHash?: string;
    readonly error?: string;
}

export interface PTransInstance {
    readonly contractAddress: string;

    // queries
    check_spent: (nullifier_hash: string) => Promise<CheckSpentResponse>;
    get_last_root: () => Promise<GetLastRootResponse>;

    // actions
    deposit_msg: (commitment: string, amount: string, denom: string) => Promise<ExecuteResponse>;
}

export interface PTransContract{
    use: (contractAddress: string) => PTransInstance
}

export const PTrans = (reader: CosmWasmClient, sender?: SigningCosmWasmClient, address?: string): PTransContract => {
    const use = (contractAddress: string): PTransInstance => {
        const check_spent = async (nullifier_hash: string): Promise<CheckSpentResponse> => {
            return reader.queryContractSmart(contractAddress, {
                check_spent:{
                    nullifier_hash
                }
            })
        }
        const get_last_root = async (): Promise<GetLastRootResponse> => {
            return reader.queryContractSmart(contractAddress, {
                get_last_root:{}
            })
        }
        const deposit_msg = async (commitment: string, amount: string, denom: string): Promise<ExecuteResponse> => {
            if (!address || !sender) return {
                error: "Address or sender not found"
            };
            
            try{
            const result = await sender.execute(address, contractAddress, {
                deposit_msg:{
                    commitment: commitment
                },
            }, undefined, [{
                denom: denom.toLowerCase(),
                amount: amount
            }])
            return {txHash: result.transactionHash}
            }catch(err){
                return {error: (err as Error).message}
            }
        }
        return {
            contractAddress,
            check_spent,
            get_last_root,
            deposit_msg
        }
    }
    return {use}
}