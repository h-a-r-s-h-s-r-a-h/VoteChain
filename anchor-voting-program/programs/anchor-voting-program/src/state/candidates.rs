use anchor_lang::prelude::*;

#[account]
pub struct CandiadteAccountState {
    pub election_id: String,
    pub candidate_key: Pubkey,
    pub candidate_name: String,
    pub candidate_slogan: String,
    pub vote_counts: u32,
}
