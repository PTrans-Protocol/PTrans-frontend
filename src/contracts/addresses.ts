
export declare interface AddressList {
    readonly [key: string]: string
}

export declare interface Addresses {
    readonly default: AddressList,
    readonly [key: string]: AddressList
}

const cliffnet: AddressList = {
    ERC20: "wasm1xu6r6ngle89840pp8pp0t80gky6yfpqyhnpn998dg8ypvnqn3fss8emaxc"
}

const allAddresses: Addresses = {
    default: cliffnet,
    cliffnet
}

export const getContractAddress = (contractName: string): string => {
    const network = process.env.NETWORK
    if (!network){
        return allAddresses.default[contractName] ?? ""
    }
    if (!allAddresses[network]){
        return ""
    }
    return allAddresses[network][contractName] ?? ""
}