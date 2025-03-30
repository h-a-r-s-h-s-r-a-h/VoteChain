use crate::{constants::*, contexts::*, errors::*, state::election_account};
use anchor_lang::prelude::*;

pub fn close_election(ctx: Context<CloseElection>, election_id: String) -> Result<()> {
    let election = &mut ctx.accounts.election;
    require!(
        election.is_active == true,
        CloseElectionError::ElectionClosedEarlier
    );

    election.is_active = false;
    msg!("Election closed successfully!");
    Ok(())
}
