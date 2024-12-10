'use client';
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  coinbaseWallet,
  metaMaskWallet,
  rainbowWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { Chain, Transport, createPublicClient, defineChain } from "viem";

import { getDefaultConfig } from "@rainbow-me/rainbowkit";

import { useMemo } from 'react';
import { http, createConfig } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';
import { NEXT_PUBLIC_WC_PROJECT_ID } from '@/config';

export function useWagmiConfig() {
  const projectId = NEXT_PUBLIC_WC_PROJECT_ID ?? '';
  if (!projectId) {
    const providerErrMessage =
      'To connect to all Wallets you need to provide a NEXT_PUBLIC_WC_PROJECT_ID env variable';
    throw new Error(providerErrMessage);
  }

  return useMemo(() => {
    const connectors = connectorsForWallets(
      [
        {
          groupName: 'Recommended Wallet',
          wallets: [coinbaseWallet],
        },
        {
          groupName: 'Other Wallets',
          wallets: [rainbowWallet, metaMaskWallet],
        },
      ],
      {
        appName: 'Kombat',
        projectId,
      },
    );

    // Define BLE testnet chain
const bleTestnet = defineChain({
  id: 52085143,
  name: "Ethena Testnet Network",
  nativeCurrency: {
    decimals: 18,
    name: "USDe",
    symbol: "USDe",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc-ethena-testnet-0.t.conduit.xyz"]
    }
  },
  blockExplorers: {
    default: {
      name: "Ethena Testnet Network",
      url: "https://explorer-ethena-testnet-0.t.conduit.xyz"
    }
  }
});

    const wagmiConfig = getDefaultConfig({
      appName: 'RockPaperScissors',
      projectId: '6ff8eb59587cd5a38c24cc85d30763ea',
      chains: [bleTestnet],
      ssr: true,
      transports: {
        [bleTestnet.id]: http(
          'https://rpc-ethena-testnet-0.t.conduit.xyz'
        ),
      },
    });

    return wagmiConfig;
  }, [projectId]);
}
