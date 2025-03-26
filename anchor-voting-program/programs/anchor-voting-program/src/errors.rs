use anchor_lang::prelude::*;

#[error_code]
pub enum ElectionAccountError {
    #[msg("Election ID too long!")]
    ElectionIdTooLong,
    #[msg("Election Title too long!")]
    ElectionTitleTooLong,
    #[msg("Election Description too long!")]
    ElectionDescriptionTooLong,
}
