use anchor_lang::prelude::*;

#[account]
pub struct CandiadteAccountState {
    pub election_id: String,
    pub candidate_key: Pubkey,
    pub vote_counts: u8,
}
