using { zvks.srv.emp_service.EmployeeSRV } from './emp-service';

@requires : 'authenticated-user'
annotate EmployeeSRV with {};

@restrict : [
    {
        grant : 'READ',
        to    : 'Viewer',
        where : 'BANK_NAME = $user.BankName'
    },
    {
        grant : 'WRITE',
        to    : 'Admin'
    }
]
annotate EmployeeSRV.EmployeeSet_Authorized with {};

