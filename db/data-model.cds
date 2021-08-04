namespace zvks.db.data_model;

using {
    cuid, // Aspect
    Currency, // Association of SAP.COMMON-CURRENCIES Entity
    managed // Aspect
} from '@sap/cds/common';

using {zvks.db.common} from './common';

context master {

    // zvks.db.data_model.master-employees
    entity employees : cuid {
        NAME_FIRST     : String(40);
        NAME_MIDDLE    : String(40);
        NAME_LAST      : String(40);
        NAME_INITIALS  : String(40);
        GENDER         : common.GenderType;
        LANGUAGE       : String(1);
        PHONE_NUMBER   : common.PhoneNumberType;
        EMAIL          : common.EmailType;
        LOGIN_NAME     : String(12);
        CURRENCY       : Currency; // CURRENCY_CODE
        SALARY_AMOUNT  : common.AmountType default 0;
        ACCOUNT_NUMBER : String(16);
        BANK_ID        : String(20);
        BANK_NAME      : String(64);
    }
}