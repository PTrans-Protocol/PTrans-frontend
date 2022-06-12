

import { toBigIntLE } from "bigint-buffer";
import { config } from "src/config/chains/config";
import { ExecuteResponse, PTransInstance } from "src/contracts/interfaces/ptrans";
import { randomBigint, createDeposit} from "./utils";
export async function deposit(token: string, decimals: number, amount: number, ptrans: PTransInstance): Promise<ExecuteResponse> {
    console.log(amount)
    const nullifier = randomBigint(31);
    const secret = randomBigint(31);
    const deposit = await createDeposit(nullifier, secret)
    if(!deposit.preimage || !deposit.commitmentString || !deposit.nullifierString) return {error: "Fail to create deposit information"};
    const {is_spent} = await ptrans.check_spent(deposit.nullifierString);
    console.log(is_spent);
    const {last_root} = await ptrans.get_last_root();
    console.log(last_root);
    
    const res = await ptrans.deposit_msg(deposit.commitmentString, (amount * (10 ** decimals)).toString(), token);
    console.log(res);
    if (res.error) return res;

    const note = toBigIntLE(deposit.preimage).toString();

    
    const file = new Blob([`${token}-${amount}-${note}`])

    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = `${token}-${amount}-note-${randomBigint(31)}.txt`
    document.body.appendChild(element);
    element.click();
    return res;
}

export async function withdraw(){
    
}