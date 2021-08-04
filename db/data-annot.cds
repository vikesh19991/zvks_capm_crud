using {
    zvks.db.data_model.master,
    zvks.db.common
} from './data-model';

annotate master.employees with {
    NAME_FIRST     @title : '{i18n>EMP_NAME_FIRST}';
    NAME_MIDDLE    @title : '{i18n>EMP_NAME_MIDDLE}';
    NAME_LAST      @title : '{i18n>EMP_NAME_LAST}';
    NAME_INITIALS  @title : '{i18n>EMP_NAME_INITIALS}';
    GENDER         @assert.enum: true
                   @title : '{i18n>EMP_GENDER}';
    LANGUAGE       @title : '{i18n>EMP_LANGUAGE}';
    PHONE_NUMBER   @title : '{i18n>EMP_PHONE_NUMBER}';
    EMAIL          @title : '{i18n>EMP_EMAIL}';
    LOGIN_NAME     @title : '{i18n>EMP_LOGIN_NAME}';
    CURRENCY       @title : '{i18n>EMP_CURRENCY}';
    SALARY_AMOUNT  @title : '{i18n>EMP_SALARY_AMOUNT}';
    ACCOUNT_NUMBER @title : '{i18n>EMP_ACCOUNT_NUMBER}';
    BANK_ID        @title : '{i18n>EMP_BANK_ID}';
    BANK_NAME      @title : '{i18n>EMP_BANK_NAME}';
    //cuid
    ID             @title : '{i18n>EMP_CUID}';
};