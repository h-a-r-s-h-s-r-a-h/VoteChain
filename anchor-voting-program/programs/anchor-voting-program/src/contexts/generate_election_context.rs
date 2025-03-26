use crate::{constants::*, errors::*, state::*};
use anchor_lang::prelude::*;





impl Space for CandiadteAccountState {
    const INIT_SPACE: usize = ANCHOR_DISCRIMINATOR
        + STRING_LENGTH_PREFIX
        + PUBKEY_SIZE
        + STRING_LENGTH_PREFIX
        + STRING_LENGTH_PREFIX
        + U32_SIZE;
}

impl Space for VotingAccountState {
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
