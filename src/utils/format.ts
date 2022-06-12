import { toBigIntLE, toBufferLE } from 'bigint-buffer';
import {config} from 'src/config/chains/config'
import { getTokenList, TokenConfig } from 'src/config/tokens';

export function formatAddress(address: string, first = 6, last = 4): string {
    if (first < 0 || last <= 0) {
      throw new Error('Invalid parameter(s)');
    }
    return address.slice(0, first) + '...' + address.slice(-last);
}

export function invalidBech32Address(address: string): boolean{
  const {addressPrefix} = config;

  if(!address.startsWith(addressPrefix)) return false;

  const subAddr = address.substring(addressPrefix.length)

  if(subAddr.length !== 39) return false;

  for (let i = 0; i < 39; i++){
    let c = subAddr[i];
    if ('0' <= c && c <= '9'){
      if(i > 0 && c === '1') return false;
    }
    else if('a' <= c && c <= 'z'){
      if(c in ['b', 'i', 'o']) return false;
    }
    else return false;
  }

  return true;
}

export function validateAndExtractNote(note: string) : {tokenConfig: TokenConfig, nullifier: BigInt, secret: BigInt} | undefined
{
  const infos = note.split("-")
  if(infos.length !== 3) return undefined;
  const tokenList = getTokenList();
  const tokenConfig = tokenList.find(element => element.name === infos[0] && parseInt(infos[1]) in element.amounts)
  if (!tokenConfig) return undefined;
  const preimageString = infos[2]
  const preimage = toBufferLE(BigInt(preimageString), 62)
  if (preimage.length !== 62) return undefined;
  const nullifier = toBigIntLE(preimage.slice(0, 31))
  const secret = toBigIntLE(preimage.slice(31, 62))
  return {tokenConfig, nullifier, secret}
}