const EmailValidator = require('email-deep-validator');

export interface ValidationResult {
  emailAddress: string;
  isValid: boolean;
  wellFormed: boolean;
  validDomain: boolean;
  validMailbox: boolean | null;
}

export class EmailValidatorService {
  async validate(emailAddress: string): Promise<ValidationResult> {
    const emailValidator = new EmailValidator();
    const {
      wellFormed,
      validDomain,
      validMailbox
    } = await emailValidator.verify(emailAddress);
    console.debug(`validating email address ${emailAddress}`);
    return {
      emailAddress,
      validDomain,
      validMailbox,
      wellFormed,
      isValid: wellFormed && validDomain && (validMailbox === null || validMailbox)
    };
  }
}
