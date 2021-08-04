namespace zvks.srv.emp_service;

using {zvks.db.data_model.master} from '../db/data-model';

service EmployeeSRV {

    //Project All
    entity EmployeeSet_ReadAll             as projection on master.employees;

    //Project All, Excluding
    entity EmployeeSet_ReadExcludingSalary as projection on master.employees excluding {
        ACCOUNT_NUMBER,
        BANK_ID,
        BANK_NAME,
        SALARY_AMOUNT,
        CURRENCY
    };

    //Project Selective
    entity EmployeeSet_ReadIDName          as projection on master.employees {
        ID, NAME_FIRST, NAME_MIDDLE, NAME_LAST
    };

    entity EmployeeSet_InsertOnly          as projection on master.employees;
    entity EmployeeSet_UpdateOnly          as projection on master.employees;
    entity EmployeeSet_DeleteOnly          as projection on master.employees;
    entity EmployeeSet_Authorized          as projection on master.employees;
}
