use anchor_lang::prelude::*;

mod constants;
mod errors;
mod state;

declare_id!("7QFYjVpv8vsSyxuiuLcTPpErcNkVZ1Liag8F9K5tqhVD");

#[program]
pub mod anchor_voting_program {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
