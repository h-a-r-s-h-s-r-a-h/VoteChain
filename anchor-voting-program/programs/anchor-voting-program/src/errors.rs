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

#[error_code]
pub enum CandidateAccountError {
    #[msg("Election ID too long!")]
    ElectionIdTooLong,
    #[msg("Election Name too long!")]
    CandidateNameTooLong,
    #[msg("Election Slogan too long!")]
    CandidateSloganTooLong,
}

#[error_code]
pub enum VoterAccountError {
    #[msg("Election ID too long!")]
    ElectionIdTooLong,
}
