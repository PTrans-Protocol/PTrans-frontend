import {Coin} from "@cosmjs/launchpad"
import {Decimal} from "@cosmjs/math"


export function printableCoin(coin?: Coin): string{
    if(!coin){
        return "0";
    }
    if(coin.denom.startsWith("u")){
        const ticker = coin.denom.slice(1).toUpperCase()
        return Decimal.fromAtomics(coin.amount, 6).toString() + " " + ticker
    }else{
        return coin.amount + " " + coin.denom
    }
}

export function printableBalance(balance?: readonly Coin[]): string{
    if (!balance || balance.length === 0) return "-"
    return balance.map(printableCoin).join(",")
}

export interface MappedCoin {
    readonly denom: string,
    readonly fractionalDigits: number
}

export interface CoinMap{
    readonly [key: string]: MappedCoin
}

export function nativeCoinToDisplay(coin: Coin, coinMap?: CoinMap): Coin{
    if(!coinMap) return coin

    const coinToDisplay = coinMap[coin.denom]

    if(!coinToDisplay) return coin
    const amountToDisplay = Decimal.fromAtomics(coin.amount, coinToDisplay.fractionalDigits).toString();
    return {denom: coinToDisplay.denom, amount: amountToDisplay}
}

export function displayAmountToNative(
    amountToDisplay: string,
    coinMap: CoinMap,
    nativeDenom: string,
): string{
    const fractionalDigits = coinMap[nativeDenom]?.fractionalDigits
    if(fractionalDigits){
        return Decimal.fromUserInput(amountToDisplay, fractionalDigits).atomics
    }
    return amountToDisplay
}