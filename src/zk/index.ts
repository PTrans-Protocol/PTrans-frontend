

import { toBigIntLE } from "bigint-buffer";
import { config } from "src/config/chains/config";
import { PTransInstance } from "src/contracts/interfaces/ptrans";
import { randomBigint, createDeposit} from "./utils";
export async function deposit(token: string, amount: number, ptrans: PTransInstance): Promise<string | undefined> {
    console.log(amount)
    const nullifier = randomBigint(31);
    const secret = randomBigint(31);
    const deposit = await createDeposit(nullifier, secret)
    if(!deposit.preimage || !deposit.commitmentString || !deposit.nullifierString) return;
    const {is_spent} = await ptrans.check_spent(deposit.nullifierString);
    console.log(is_spent);
    const {last_root} = await ptrans.get_last_root();
    console.log(last_root);
    console.log(ptrans.contractAddress)
    const txHash = await ptrans.deposit_msg(deposit.commitmentString, amount.toString(), token);
    if (!txHash) return;
    const txHashLink = config.explorerUrl ? config.explorerUrl + "/txs/" + txHash : undefined;

    const note = toBigIntLE(deposit.preimage).toString();

    
    const file = new Blob([`${token}-${amount}-${note}`])

    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = `${token}-${amount}-note-${randomBigint(31)}.txt`
    document.body.appendChild(element);
    element.click();
    return txHashLink;
}

export async function withdraw(){
    
}