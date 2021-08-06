using { zvks.srv.emp_service.EmployeeSRV } from './emp-service';

// Any User ID nad Password will authenticate, even blank 
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


