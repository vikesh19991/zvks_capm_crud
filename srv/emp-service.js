const cds = require("@sap/cds");

module.exports = cds.service.impl(async function (EmployeeService) {
  //Secondary Services (Primary is EmployeeService)
  const DataBaseService = await cds.connect.to("db");

  // Constant declaration using absoluate path
  // const customName = cds.entities("zvks.db.data_model.master.employees");

  // Constant declaration using relative path, preffered for chaining declarations
  const { employees } = cds.entities("zvks.db.data_model.master");
  const {
    EmployeeSet_ReadAll,
    EmployeeSet_ReadExcludingSalary,
    EmployeeSet_ReadIDName,
    EmployeeSet_InsertOnly,
    EmployeeSet_DeleteOnly,
    EmployeeSet_UpdateOnly,
  } = cds.entities("zvks.srv.emp_service.EmployeeSRV");

  //----------------------------------------------------------------------------------
  // Read Sample
  // 1. READ using EmployeeService.on event(EmployeeSet_ReadAll, EmployeeSet_ReadExcludingSalary)
  //----------------------------------------------------------------------------------
  EmployeeService.on("READ", EmployeeSet_ReadAll, async function (request) {
    console.log("           --------------------------");
    console.log(" Executing READ for EmployeeSet_ReadAll");

    //Check Header
    //console.log("check header", request.headers);

    // Read from custom service
    console.log(request.query.SELECT);

    const {
      distinct,
      one,
      from,
      columns,
      excluding,
      where,
      having,
      groupBy,
      orderBy,
      limit,
    } = request.query.SELECT;

    console.log("distinct: ", distinct);
    console.log("one: ", one);
    console.log("from: ", from);
    console.log("columns: ", columns);
    console.log("excluding: ", excluding);
    console.log("where: ", where);
    console.log("having: ", having);
    console.log("groupBy: ", groupBy);
    console.log("limit: ", limit);
    console.log("orderBy: ", orderBy);
    if (limit === !undefined) {
      console.log("limit row: ", limit.row);
    }
    if (limit === !undefined) {
      console.log("limit offset: ", limit.offset);
    }

    console.log("request.data-- ", request.data);

    if (request.params.length !== 0) {
      // Key is being passed
      // No limit
      // Pass key to where explicitly, as the keys mentioned in URL
      // will be NOT populated in  request.query rather keys will be
      // available in request.params[] array (URL) or request.data objects

      //Read key from URL
      const ID = request.params[0]; //const [ID1,ID2,ID3] = request.params;
      // console.log("Parameter ID: ", ID);

      // Key fields can also be read from Payload
      // const PAYLOAD_ID = request.data.ID;
      // console.log("Payload ID: ", PAYLOAD_ID);

      return await DataBaseService.tx(request).run(
        SELECT.distinct(distinct)
          .columns(columns) //Performance (optional)
          .from(employees) //Custom Service > Data Model > Entity
          .where({ ID: ID })
      );
    } else {
      //limit is mandatory
      //Either, defined explicitly using $top
      //Or, framework will set limit = 1000
      return await DataBaseService.tx(request).run(
        SELECT.distinct(distinct)
          .columns(columns) //Performance (optional)
          .from(employees) //Custom service~source
          .limit(limit.row, limit.offset)
          .orderBy(orderBy)
      );
    }
  });

  //----------------------------------------------------------------------------------
  // Read Sample
  // Reject read using EmployeeService.on event(EmployeeSet_ReadExcludingSalary)
  //----------------------------------------------------------------------------------
  EmployeeService.on(
    "READ",
    EmployeeSet_ReadExcludingSalary,
    async (request) => {
      console.log("           --------------------------");
      console.log(" Executing READ for EmployeeSet_ReadExcludingSalary");

      //----------------------------
      //  500 + Error in Payload
      //----------------------------

      // //Breaks the Code
      // request.reject(500, "Rejected", request.target.name, [
      //   "EmployeeSet_ReadExcludingSalary",
      // ]);

      request.error(500, "READ_NOT_ALLOWED", request.target.name, [
        "EmployeeSet_ReadExcludingSalary",
      ]);

      request.error(500, "READ_NOT_ALLOWED", request.target.name, [
        "EmployeeSet_ReadExcludingSalary",
      ]);

      //----------------------------
      //  200 OK + sap-message
      //----------------------------

      request.notify(500, "READ_NOT_ALLOWED", request.target.name, [
        "EmployeeSet_ReadExcludingSalary",
      ]);

      // //Breaks the Code and overwrites the error messages
      // request.reject(500, "Rejected", request.target.name, [
      //   "EmployeeSet_ReadExcludingSalary",
      // ]);

      request.info(500, "READ_NOT_ALLOWED", request.target.name, [
        "EmployeeSet_ReadExcludingSalary",
      ]);

      request.warn(500, "READ_NOT_ALLOWED", request.target.name, [
        "EmployeeSet_ReadExcludingSalary",
      ]);

      if (request.errors) {
        console.log("Error messages found!");
        console.log(request.errors);
      }

      if (request.messages) {
        console.log("Notify/Info/Warning messages found!");
        console.log(request.messages);
      }
    }
  );

  //----------------------------------------------------------------------------------
  // READ Sample
  // Loop while reading using EmployeeService.on event (EmployeeSet_ReadIDName)
  //----------------------------------------------------------------------------------
  EmployeeService.on("READ", EmployeeSet_ReadIDName, async function (request) {
    //Pass the CQN read AS-IS to CQL
    //var lt_employee = await DataBaseService.tx(request).run(request.query);

    // Read from Custom Source
    const { distinct, columns, orderBy, limit } = request.query.SELECT;

    if (request.params.length !== 0) {
      const ID = request.params[0];

      var lt_employee = await DataBaseService.tx(request).run(
        SELECT.distinct(distinct)
          .columns(columns)
          .from(employees)
          .where({ ID: ID })
      );
    } else {
      lt_employee = await DataBaseService.tx(request).run(
        SELECT.distinct(distinct)
          .columns(columns)
          .from(employees)
          .limit(limit.row, limit.offset)
          .orderBy(orderBy)
      );
    }

    for (let lfs_employee of lt_employee) {
      //console.log(ls_employee.NAME_FIRST);
      if (lfs_employee.NAME_FIRST !== null) {
        lfs_employee.NAME_FIRST = "!" + lfs_employee.NAME_FIRST;
      }
    }

    // For sample, we have done synchronous task, but
    // EmployeeService.on usually used for asynchronous tasks ex:
    // making another SELECT call to DB and loop that table

    // ----------- Dummy Code to hint Async Call -----------
    // const ls_emp_details = await DataBaseService.tx(request).run(
    //        SELECT.from(emp_det).where({ID:ls_employee.ID})
    // );
    return lt_employee;
  });

  //----------------------------------------------------------------------------------
  // Sample: Loop "after" Read - EmployeeSet_ReadIDName
  //----------------------------------------------------------------------------------
  EmployeeService.after("READ", EmployeeSet_ReadIDName, (each) => {
    //console.log(each);

    if (each.NAME_LAST !== null) {
      each.NAME_LAST = `${each.NAME_LAST}!`; //Using backtick
    }
  });

  //----------------------------------------------------------------------------------
  // Create
  //----------------------------------------------------------------------------------
  EmployeeService.on("CREATE", EmployeeSet_InsertOnly, async (request) => {
    const { ID, NAME_FIRST, NAME_MIDDLE, NAME_LAST } = request.data;

    console.log("Generated ID: ", ID);

    return await DataBaseService.tx(request)
      .run(
        INSERT.into(employees).entries({
          ID: ID,
          NAME_FIRST: NAME_FIRST,
          NAME_MIDDLE: NAME_MIDDLE,
          NAME_LAST: NAME_LAST,
        })
      )
      .then((resolve) => {
        if (typeof resolve !== undefined) {
          return request.data;
        } else {
          request.error(500, "INSERT_FAILED", request.target.name, [
            "zvks.db.data_model.master",
          ]);
        }
      })
      .catch((error) => {
        request.error(500, "ERROR", request.target.name, [error.toString()]);
      });
  });

  //----------------------------------------------------------------------------------
  // Validations Sample
  // Validations "before" Create, Update and Delete
  //----------------------------------------------------------------------------------
  EmployeeService.before("UPDATE", EmployeeSet_UpdateOnly, async (request) => {
    // To Do: Check if ID exist in DB
    // Or else, new record gets generated

    // Fallback Code: Convert incoming values using parseFloat()
    // & parseInt() to decmial and integer respectively, just in case if
    // they are being received as string
    const SalaryAmount = parseFloat(request.data.SALARY_AMOUNT);

    if (SalaryAmount > 10000000) {
      request.error(500, "Salary cannt be greater than 1 Crore.");
    }

    //Check if the record for the key exists
    const ID = request.params[0];
    const ls_employee = await DataBaseService.tx(request).run(
      SELECT.one.from(employees).where({ ID: ID })
    );
    if (ls_employee === null) {
      //Not found
      request.error(500, "RECORD_NOT_FOUND", request.target.name, [ID]);
    }
  });

  //----------------------------------------------------------------------------------
  // Update
  //----------------------------------------------------------------------------------
  EmployeeService.on("UPDATE", EmployeeSet_UpdateOnly, async (request) => {
    return await DataBaseService.tx(request)
      .run(
        UPDATE(employees).set({
          SALARY_AMOUNT: request.data.SALARY_AMOUNT
        }).where({ ID: request.data.ID })
      )
      .then((resolve) => {
        if (typeof resolve !== undefined) {
          return request.notify(200, "Updated!");
        } else {
          request.error(500, "UPDATE_FAILED", request.target.name, [employees]);
        }
      })
      .catch((error) => {
        request.error(500, "SERVER_ERROR", request.target.name, [
          error.toString(),
        ]);
      });
  });

  //----------------------------------------------------------------------------------
  // Delete Sample
  // Restricting CRUD capability from Service Implementation
  //----------------------------------------------------------------------------------
  //EmployeeService.reject("DELETE", EmployeeSet_DeleteOnly);
  EmployeeService.on("DELETE", EmployeeSet_DeleteOnly, async (request) => {
    return await DataBaseService.tx(request)
      .run(DELETE.from(employees).where({ ID: request.data.ID }))
      .then((resolve) => {
        if (typeof resolve !== undefined) {
          return request.notify(200, "Deleted!");
        } else {
          request.error(500, "DELETE_FAILED", request.target.name, [employees]);
        }
      })
      .catch((error) => {
        request.error(500, "SERVER_ERROR", request.target.name, [
          error.toString(),
        ]);
      });
  });

});