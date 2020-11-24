const EmailValidator = require("email-deep-validator");
const fs = require("fs");
const ADDRESSES = require("./web-Q3_2020.json");

// spain 13
// brazil 11

const emailValidator = new EmailValidator();

const validate = async () => {
    for (let i = 0; i < ADDRESSES.length; i++) {
        let {email, checked, domain} = ADDRESSES[i];
        if (!email || email.length === 0) {
            email = 'info@' + domain;
            ADDRESSES[i].email = email;
            checked = false;
        }
        if (checked) {
            continue;
        }
        const {
            wellFormed,
            validDomain,
            validMailbox
        } = await emailValidator.verify(email);
        const isValid =
            wellFormed && validDomain && (validMailbox === null || validMailbox);

        console.error(
            i +
            " / " +
            ADDRESSES.length +
            " :: " +
            (isValid ? "VALID       " : "INVALID        ") +
            email +
            "   { wellFormed =   " +
            wellFormed +
            "; validDomain =  " +
            validDomain +
            "; validMailbox = " +
            validMailbox + " }"
        );
        ADDRESSES[i].checked = true;
        ADDRESSES[i].isValid = isValid;
        ADDRESSES[i].wellFormed = wellFormed;
        ADDRESSES[i].validDomain = validDomain;
        ADDRESSES[i].validMailbox = validMailbox;
        fs.writeFileSync(
            "./web-Q3_2020.json",
            JSON.stringify(ADDRESSES, null, 1)
        );
    }
};

validate().catch(e => console.log(e));
