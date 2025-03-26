use anchor_lang::prelude::*;

#[account]
pub struct VotingAccountState {
    pub election_generator: Pubkey,
    pub election_id: String,
    pub election_title: String,
    pub candidates: Vec<Pubkey>,
    pub voters: Vec<Pubkey>,
    pub is_active: bool,
}
