export interface TokenConfig {
  readonly name: string;
  readonly amounts: Array<number>;
  readonly addresses: Array<string>;
}

const oraitestnet: Array<TokenConfig> = [
  {
    name: "ORAI",
    amounts: [0.1, 0.2, 0.5, 1],
    addresses: [
      "orai1wqrav3a604vutg8gxrnmm2w4jkq3ujrnd9cxlp",
      "orai18krwkarng0jz68xk8cs8l44lj9drmy2ddnxxty",
      "orai180dxvg9c54f070xmdwtzadlxfdxt344k7n6dgg",
      "orai1u8n2j6mnxp6mugpc2rlgs2xvxa88r0xx8vezvt",
    ],
  },
];

interface AllToken {
  readonly [key: string]: Array<TokenConfig>;
}
const allToken: AllToken = {
  oraitestnet,
};

export function getTokenList(): Array<TokenConfig> {
  const network = process.env.NETWORK || "oraitestnet";
  const res = allToken[network];
  if (!res) {
    throw new Error("Network has no token available");
  }
  return res;
}
