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
  const anotherElection = {
    title: "Vidhan Sabha",
    description: "CM Bihar election",
    election_id: "123456",
  };

  const candidate1 = {
    candidate_key: "100",
    candidate_name: "Nitish Kumar",
    candidate_slogan: "Mein tho Bihar ko lutunga",
  };

  const [candidatePda] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("candidate"),
      Buffer.from(candidate1.candidate_key),
      Buffer.from(election.election_id),
    ],
    program.programId
  );

  const [anotherElectionPda] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("election"),
      Buffer.from(anotherElection.election_id),
      provider.wallet.publicKey.toBuffer(),
    ],
    program.programId
  );

  const [electionPda] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      Buffer.from("election"),
      Buffer.from(election.election_id),
      provider.wallet.publicKey.toBuffer(),
    ],
    program.programId
  );

  it("adds a election", async () => {
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
      console.error("Error adding election:", error);
      throw error;
    }
  });

  it("adds another election", async () => {
    try {
      await program.methods
        .createElection(
          anotherElection.election_id,
          anotherElection.title,
          anotherElection.description
        )
        .accounts({})
        .rpc();

      const account = await program.account.electionAccountState.fetch(
        anotherElectionPda
      );
      expect(account.electionId).to.equal(anotherElection.election_id);
      expect(account.electionTitle).to.equal(anotherElection.title);
      expect(account.electionDescription).to.equal(anotherElection.description);
      expect(account.electionGenerator.toString()).to.equal(
        provider.wallet.publicKey.toString()
      );
    } catch (error) {
      console.error("Error adding election:", error);
      throw error;
    }
  });

  it("adds candidate", async () => {
    try {
      await program.methods
        .addCandidate(
          candidate1.candidate_key,
          election.election_id,
          candidate1.candidate_name,
          candidate1.candidate_slogan
        )
        .accounts({})
        .rpc();

      const account = await program.account.candidateAccountState.fetch(
        candidatePda
      );
      expect(account.candidateKey).to.equal(candidate1.candidate_key);
      expect(account.candidateName).to.equal(candidate1.candidate_name);
      expect(account.candidateSlogan).to.equal(candidate1.candidate_slogan);
      expect(account.electionId).to.equal(election.election_id);
    } catch (error) {
      console.error("Error adding candidate:", error);
      throw error;
    }
  });
});
