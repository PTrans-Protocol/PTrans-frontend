import React from "react"
import { useSdk } from "src/contexts/wallet/wallet-context"
import { getContractAddress } from "./addresses"
import { ERC20, ERC20Instance } from "./interfaces/erc20"

export const useERC20Instance = (): ERC20Instance | undefined => {
    const sdk = useSdk()
    try{
        const client = sdk.getClient()
        const address = getContractAddress("ERC20")
        if (address === "") return undefined
            return ERC20(client).use(address)
    }
    catch(err){
        return undefined
    }
}