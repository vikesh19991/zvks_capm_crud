namespace zvks.db.common;

using {
    cuid,    // Aspect
    sap,
    Currency // Type for Assocation
} from '@sap/cds/common';

//------------------------------------------------------------
// Types (~Data Elements)
//------------------------------------------------------------
type GenderType : String(1) enum {
    // (~Domain)
    MALE          = 'M';
    FEMALE        = 'F';
    NON_BINARY    = 'N';
    NO_DISCLOSURE = 'D';
    SELF_DESCRIBE = 'S';
};

type AmountType : Decimal(15, 2);
type PhoneNumberType : String(30);
type EmailType : String(255);

//------------------------------------------------------------
// Aspects (~Include)
//------------------------------------------------------------
aspect Amount {
    CURRENCY     : Currency; // CURRENCY_CODE
    GROSS_AMOUNT : AmountType default 0;
    NET_AMOUNT   : AmountType default 0;
    TAX_AMOUNT   : AmountType default 0;
}

//------------------------------------------------------------
// Annotations
//------------------------------------------------------------
annotate common.AmountType with @(
    Semantics.amount.currencyCode : 'CURRENCY_CODE',
    sap.unit                      : 'CURRENCY_CODE'
);

annotate common.PhoneNumberType with @(assert.format : '[0-9]' );
annotate common.EmailType with @(assert.format : '^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$');