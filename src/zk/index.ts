
import checkProof from "./proof/genProof";
import { randomBigint, createDeposit, genRandomCommitments, getMerkleProofFromCommitments} from "./utils";
export async function deposit(token: string, amount: number) {
    const nullifier = randomBigint(31);
    const secret = randomBigint(31);
    const deposit = await createDeposit(nullifier, secret)
    await checkProof()
    const note = deposit.preimage?.toString('hex');
    if (!note) return;
    const file = new Blob([`${token}-${amount}-${note}`])

    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = `${token}-${amount}-note-${randomBigint(31)}.txt`
    document.body.appendChild(element);
    element.click();

}

export async function withdraw(){
    
}