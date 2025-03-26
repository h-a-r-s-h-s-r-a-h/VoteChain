use anchor_lang::prelude::*;

mod constants;
mod contexts;
mod errors;
mod state;
mod instructions;


use contexts::*;
use instructions::*;


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
