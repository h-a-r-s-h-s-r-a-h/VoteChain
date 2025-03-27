import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { AnchorVotingProgram } from "../target/types/anchor_voting_program";
import { expect } from "chai";

describe("anchor-voting-program", () => {
  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace
    .AnchorVotingProgram as Program<AnchorVotingProgram>;

  const election = {
    title: "Lok Sabha Election",
    description: "PM election",
    election_id: "12345",
  };

  const [electionPda] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("election"), Buffer.from(election.election_id)],
    program.programId
  );

  it("adds a movie review", async () => {
    try {
      await program.methods
        .createElection(
          election.election_id,
          election.title,
          election.description
        )
        .accounts({})
        .rpc();

      const account = await program.account.electionAccountState.fetch(
        electionPda
      );
      expect(account.electionId).to.equal(election.election_id);
      expect(account.electionTitle).to.equal(election.title);
      expect(account.electionDescription).to.equal(election.description);
      expect(account.electionGenerator.toString()).to.equal(
        provider.wallet.publicKey.toString()
      );
    } catch (error) {
      console.error("Error adding movie review:", error);
      throw error;
    }
  });
});
