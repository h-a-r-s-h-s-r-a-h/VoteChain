use crate::{constants::*, errors::*, state::*};
use anchor_lang::prelude::*;

#[derive(Accounts)]
#[instruction(election_id:String)]
pub struct CreateElection<'info> {
    #[account(
        init,
        seeds=["election".as_bytes(),election_id.as_bytes()],
        bump,
        payer=election_generator,
        space=ElectionAccountState::INIT_SPACE+MAX_ELECTIONID_LENGTH+MAX_TITLE_LENGTH+MAX_DESCRIPTION_LENGTH
    )]
    pub election: Account<'info, ElectionAccountState>,
    #[account(mut)]
    pub election_generator: Signer<'info>,
    pub system_program: Program<'info, System>,
}



impl Space for CandiadteAccountState {
    const INIT_SPACE: usize = ANCHOR_DISCRIMINATOR
        + STRING_LENGTH_PREFIX
        + PUBKEY_SIZE
        + STRING_LENGTH_PREFIX
        + STRING_LENGTH_PREFIX
        + U32_SIZE;
}

impl Space for ElectionAccountState {
    const INIT_SPACE: usize = ANCHOR_DISCRIMINATOR
        + PUBKEY_SIZE
        + STRING_LENGTH_PREFIX
        + STRING_LENGTH_PREFIX
        + STRING_LENGTH_PREFIX
        + BOOL_SIZE;
}

impl Space for VoteAccount {
    const INIT_SPACE: usize =
        ANCHOR_DISCRIMINATOR + PUBKEY_SIZE + STRING_LENGTH_PREFIX + PUBKEY_SIZE;
}
