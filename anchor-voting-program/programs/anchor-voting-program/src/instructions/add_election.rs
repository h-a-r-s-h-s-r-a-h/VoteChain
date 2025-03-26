use crate::{constants::*, contexts::*, errors::*};
use anchor_lang::prelude::*;

pub fn create_election(
    ctx: Context<CreateElection>,
    election_id: String,
    election_title: String,
    election_description: String,
) -> Result<()> {
    require!(
        election_id.len() < MAX_ELECTIONID_LENGTH,
        ElectionAccountError::ElectionIdTooLong
    );

    require!(
        election_title.len() < MAX_TITLE_LENGTH,
        ElectionAccountError::ElectionTitleTooLong
    );

    require!(
        election_description.len() < MAX_DESCRIPTION_LENGTH,
        ElectionAccountError::ElectionDescriptionTooLong
    );

    let election = &mut ctx.accounts.election;
    election.election_generator = ctx.accounts.election_generator.key();
    election.election_id = election_id;
    election.election_title = election_title;
    election.election_description = election_description;
    election.is_active = true;

    msg!("Election added successfully!");
    Ok(())
}
