namespace zvks.srv.emp_annot;

using {zvks.srv.emp_service} from './emp-service';

@path : '/EmployeeSRV'
//@requires : 'authenticated-user'
annotate emp_service.EmployeeSRV with {};

@Capabilities : {
    Readable   : true,
    Insertable : false,
    Updatable  : false,
    Deletable  : false
}
annotate emp_service.EmployeeSRV.EmployeeSet_ReadAll with {};

@Capabilities : {
    Readable   : true,
    Insertable : false,
    Updatable  : false,
    Deletable  : false
}
annotate emp_service.EmployeeSRV.EmployeeSet_ReadIDName with {
    @title : '{i18n>EMPLOYEESET_READIDNAME_ID}'
    ID
};

@Capabilities : {
    Readable   : true,
    Insertable : false,
    Updatable  : false,
    Deletable  : false
}
annotate emp_service.EmployeeSRV.EmployeeSet_ReadExcludingSalary with {};

@Capabilities : {
    Readable   : false,
    Insertable : true,
    Updatable  : false,
    Deletable  : false
}
annotate emp_service.EmployeeSRV.EmployeeSet_InsertOnly with {};

@Capabilities : {
    Readable   : false,
    Insertable : false,
    Updatable  : true,
    Deletable  : false
}
annotate emp_service.EmployeeSRV.EmployeeSet_UpdateOnly with {};

@Capabilities : {
    Readable   : false,
    Insertable : false,
    Updatable  : false,
    Deletable  : true
}
annotate emp_service.EmployeeSRV.EmployeeSet_DeleteOnly with {};

