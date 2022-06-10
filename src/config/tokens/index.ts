export interface TokenConfig{
    readonly name: string;
    readonly amounts: Array<number>;
}

const oraitestnet: Array<TokenConfig> = [
    {
        name: 'ORAI',
        amounts: [0.1, 1, 10, 100]
    },
    {
        name: 'ETH',
        amounts: [1,2,3,4]
    },
    {
        name: 'BNB',
        amounts: [10,20,50,100]
    }
] 

interface AllToken{
    readonly [key: string]: Array<TokenConfig>
}
const allToken: AllToken = {
    oraitestnet
}

export function getTokenList():Array<TokenConfig>{
    const network = process.env.NETWORK || 'oraitestnet'
    const res = allToken[network]
    if (!res){
        throw new Error("Network has no token available")
    }
    return res;
}