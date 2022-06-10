//@ts-ignore
import {groth16} from "snarkjs";

export default async function checkProof() {
    const { proof, publicSignals } = await groth16.fullProve({a: 3, b: 11}, "multiplier2.wasm", "multiplier2_0001.zkey");
    console.log("Proof: ");
    console.log(JSON.stringify(proof, null, 1));
}

checkProof().then(err => console.error(err))