// @ts-ignore
import snarkjs from "snarkjs";

// @ts-ignore
import {buildPedersenHash, buildBabyjub, buildMimcSponge} from "circomlibjs";
// @ts-ignore
import crypto from "crypto-browserify"

import MerkleTree from "./fixed-merkle-tree"

import { toBufferLE, toBigIntLE} from 'bigint-buffer';

export const randomBigint = (nbytes: number) : bigint => toBigIntLE(crypto.randomBytes(nbytes))
export const pedersenHash = async (data: Buffer) : Promise<Buffer> => {
    const hasher = await buildPedersenHash();
    const h = hasher.hash(data);
    const babyJub = await buildBabyjub();
    const hash = babyJub.unpackPoint(h)[0];
    console.log("hash: ",babyJub.F.toObject(hash))
    return hash;
}

interface DepositProps{
    nullifier?: bigint,
    secret?: bigint,
    preimage?: Buffer,
    commitment?: Buffer,
    commitmentHex?: string,
    nullifierHash?: Buffer,
    nullifierHex?: string 
}
export async function createDeposit(nullifier: bigint, secret: bigint) : Promise<DepositProps>{
    let deposit: DepositProps = {};
    deposit.nullifier = nullifier;
    deposit.secret = secret;
    const nullifierBuf = toBufferLE(nullifier, 31);
    const secretBuf = toBufferLE(secret, 31);
    deposit.preimage = Buffer.concat([nullifierBuf , secretBuf])
    deposit.commitment = await pedersenHash(deposit.preimage)
    deposit.commitmentHex = deposit.commitment.toString('hex')
    deposit.nullifierHash = await pedersenHash(nullifierBuf)
    deposit.nullifierHex = deposit.nullifierHash.toString('hex')
    return deposit;
}

export async function getMerkleProofFromCommitments(commitments: Array<string>, leafIndex: number){
    const mimc = await buildMimcSponge()
    const hashFunction = (left: string | number, right: string | number): string =>{
        const {xL, xR} = mimc.hash( BigInt('0x' + left), BigInt('0x' + right), 0);
        return Buffer.from(xL).toString('hex');
    }
    const tree = new MerkleTree(30, commitments, {hashFunction: hashFunction, zeroElement: 0})
    const {pathElements, pathIndices} = tree.path(leafIndex)
    return {pathElements, pathIndices, root: tree.root}
}

export async function genRandomCommitments(length: number): Promise<Array<string>>{
    let res: Array<string> = [];
    for(let i = 0; i < length; i++){
        const nullifier = randomBigint(31);
        const secret = randomBigint(31);
        const nullifierBuf = Buffer.from(nullifier.toString(16), 'hex');
        const secretBuf = Buffer.from(secret.toString(16), 'hex');
        const preimage = Buffer.concat([Uint8Array.from(nullifierBuf) , Uint8Array.from(secretBuf)])
        const commitment = await pedersenHash(preimage)
        res.push(commitment.toString('hex'))
    }
    return res;
}

