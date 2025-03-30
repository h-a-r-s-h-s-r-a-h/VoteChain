import React, { createContext, useContext, useEffect, useState } from "react";
import {
  useConnection,
  useAnchorWallet,
  useWallet,
} from "@solana/wallet-adapter-react";
import * as anchor from "@coral-xyz/anchor";
import { getAssociatedTokenAddress } from "@solana/spl-token";
import idl from "../idl.json";
import { AnchorVotingProgram } from "../types/anchor_voting_program";

interface SolanaContextType {
  program?: anchor.Program<AnchorVotingProgram>;
  electionId: string;
  setElectionId: React.Dispatch<React.SetStateAction<string>>;
  electionTitle: string;
  setElectionTitle: React.Dispatch<React.SetStateAction<string>>;
  electionDescription: string;
  setElectionDescription: React.Dispatch<React.SetStateAction<string>>;
  candidateKey: string;
  setCandidateKey: React.Dispatch<React.SetStateAction<string>>;
  candidateName: string;
  setCandidateSlogan: React.Dispatch<React.SetStateAction<string>>;
  transactionUrl: string;
  setTransactionUrl: React.Dispatch<React.SetStateAction<string>>;
  electionPda: anchor.web3.PublicKey | null;
  candidatePda: anchor.web3.PublicKey | null;
  votePda: anchor.web3.PublicKey | null;
  contextPublicKey: anchor.web3.PublicKey | null;
}

const SolanaContext = createContext<SolanaContextType | undefined>(undefined);

export const SolanaProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const [contextPublicKey, setContextPublicKey] =
    useState<anchor.web3.PublicKey | null>(null);
  const { publicKey } = useWallet();

  const [program, setProgram] =
    useState<anchor.Program<AnchorVotingProgram>>();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [transactionUrl, setTransactionUrl] = useState("");
  const [moviePda, setMoviePda] = useState<anchor.web3.PublicKey | null>(null);
  const [mint, setMint] = useState<anchor.web3.PublicKey | null>(null);
  const [tokenAccount, setTokenAccount] =
    useState<anchor.web3.PublicKey | null>(null);

  useEffect(() => {
    if (!wallet) return;
    setContextPublicKey(publicKey);

    let provider: anchor.Provider;
    try {
      provider = anchor.getProvider();
    } catch {
      provider = new anchor.AnchorProvider(connection, wallet, {});
      anchor.setProvider(provider);
    }

    const programInstance = new anchor.Program(
      idl as AnchorVotingProgram
    ) as anchor.Program<AnchorVotingProgram>;

    setProgram(programInstance);

    const [pda] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from(title), wallet.publicKey.toBuffer()],
      programInstance.programId
    );
    setMoviePda(pda);

    const [mintAddress] = anchor.web3.PublicKey.findProgramAddressSync(
      [Buffer.from("mint")],
      programInstance.programId
    );
    setMint(mintAddress);
  }, [connection, wallet, title]);

  useEffect(() => {
    if (!wallet || !mint) return;
    (async () => {
      const associatedTokenAddress = await getAssociatedTokenAddress(
        mint,
        wallet.publicKey
      );
      setTokenAccount(associatedTokenAddress);
    })();
  }, [mint, wallet]);

  const contextValue = React.useMemo(
    () => ({
      program,
      title,
      setTitle,
      description,
      setDescription,
      rating,
      setRating,
      transactionUrl,
      setTransactionUrl,
      moviePda,
      mint,
      tokenAccount,
      contextPublicKey,
    }),
    [
      program,
      title,
      setTitle,
      description,
      setDescription,
      rating,
      setRating,
      transactionUrl,
      setTransactionUrl,
      moviePda,
      mint,
      tokenAccount,
      contextPublicKey,
    ]
  );

  return (
    <SolanaContext.Provider value={contextValue}>
      {children}
    </SolanaContext.Provider>
  );
};

export const useSolana = (): SolanaContextType => {
  const context = useContext(SolanaContext);
  if (!context) {
    throw new Error("useSolana must be used within a SolanaProvider");
  }
  return context;
};
