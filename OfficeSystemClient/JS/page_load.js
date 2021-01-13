var departmentList = JSON.parse(sessionStorage.getItem("all_departments"));
var positionList = JSON.parse(sessionStorage.getItem("all_positions"));
var remain_days = sessionStorage.getItem("remain_days");


function init() {
    showAllEmployees();
    departmentSelectOptions();
    displayApplyRemainDays();
}

function displayApplyRemainDays() {
    document.getElementById("apply_vacation_remain").innerText = remain_days;
}

function displayPersonalDetails() {
    var employee_id = JSON.parse(sessionStorage.getItem("employee_id"));
    var employeeList = JSON.parse(sessionStorage.getItem("all_employees"));
    for (i = 0; i < employeeList.length; i++) {
        if (employeeList[i].employee_id == employee_id) {
            document.getElementById("modify_details_address").value = employeeList[i].address;
            document.getElementById("modify_details_email").value = employeeList[i].email;
            if (employeeList[i].genre == 1) {
                $("#modify_details_gender").find("option").each(function () {
                    if ($(this).text() == "Male") {
                        $(this).attr("selected", true);
                    }
                });
            } else {
                $("#modify_details_gender").find("option").each(function () {
                    if ($(this).text() == "Female") {
                        $(this).attr("selected", true);
                    }
                });
            }
            //document.getElementById("modify_details_birthday").value = employeeList[i].birthday;
        }
    }
}

function departmentSelectOptions() {

    $("#register_department").empty();
    $("#register_position").empty();

    $("#employee_details_position").empty();
    $("#employee_details_department").empty();

    //员工详情中的部门职位下拉框加载和触发
    var department_select = document.getElementById("employee_details_department");
    for (i = 0; i < departmentList.length; i++) {
        department_select.options.add(new Option(departmentList[i].department_name, departmentList[i].department_id));
    }

    $('#employee_details_department').change(function (data) {
        var value = $("#employee_details_department option:selected").attr("value");

        $("#employee_details_position").find("option").remove();
        var position_select = document.getElementById("employee_details_position");
        for (i = 0; i < positionList.length; i++) {
            if (positionList[i].department_id == value) {
                position_select.options.add(new Option(positionList[i].position_name, positionList[i].position_id));
            }
        }
    });

    //注册中的部门职位下拉框加载和触发
    var department_select_register = document.getElementById("register_department");
    for (i = 0; i < departmentList.length; i++) {
        department_select_register.options.add(new Option(departmentList[i].department_name, departmentList[i].department_id));
    }
    var position_select_register = document.getElementById("register_position");
    for (i = 0; i < positionList.length; i++) {
        if (positionList[i].department_id == department_select_register.value) {
            position_select_register.add(new Option(positionList[i].position_name, positionList[i].position_id));
        }
    }
    $('#register_department').change(function (data) {
        var value = $("#register_department option:selected").attr("value");
        $("#register_position").find("option").remove();
        for (i = 0; i < positionList.length; i++) {
            if (positionList[i].department_id == value) {
                position_select_register.options.add(new Option(positionList[i].position_name, positionList[i].position_id));
            }
        }
    });
}

function showAllEmployees() {
    var employeeList = JSON.parse(sessionStorage.getItem("all_employees"));
    
    //var test_ligt = JSON.parse(sessionStorage.getItem("all_employees"));
    //var employeeList = test_ligt.filter(employee => employee.employee_id == 65)
    
    for (i = 0; i < employeeList.length; i++) {
        var employee_id = employeeList[i].employee_id;
        var employee_name = employeeList[i].employee_name;
        var department = employeeList[i].department_name;
        var position = employeeList[i].position_name;
        var status = employeeList[i].status;
        var status_text = "";
        if (status == 1) {
            status_text = "In Service";
        } else if (status == 2) {
            status_text = "Resignation";
        } else if (status == 3) {
            status_text = "Internship";
        } else {
            status_text = "On Holiday";
        }
        $str = "<tr onclick=\"employeeDetails(" + i + ")\"><td>" + employee_id + "</td><td>" + employee_name + "</td><td>" + department + "</td><td>" + position + "</td><td>" + status_text + "</td><td><button class=\"btn btn-sm btn-warning\">MORE</button></td></tr>";
        $("#employee_tbody").append($str);
    }
}

function employeeListPage() {
    document.getElementById("init_page").hidden = true;
    document.getElementById("employee_list").hidden = false;
    document.getElementById("vacation_list").hidden = true;
    document.getElementById("attendence_page").hidden = true;
    document.getElementById("my_vacation_list").hidden = true;
}

function vacationListPage() {
    document.getElementById("init_page").hidden = true;
    document.getElementById("employee_list").hidden = true;
    document.getElementById("vacation_list").hidden = false;
    document.getElementById("attendence_page").hidden = true;
    document.getElementById("my_vacation_list").hidden = true;
    document.getElementById("vacation_tbody").innerHTML = "";
    clickGetVactions();
}

function attendencePage() {
    document.getElementById("init_page").hidden = true;
    document.getElementById("employee_list").hidden = true;
    document.getElementById("vacation_list").hidden = true;
    document.getElementById("attendence_page").hidden = false;
    document.getElementById("my_vacation_list").hidden = true;
}

function myVacationListPage() {
    document.getElementById("init_page").hidden = true;
    document.getElementById("employee_list").hidden = true;
    document.getElementById("vacation_list").hidden = true;
    document.getElementById("attendence_page").hidden = true;
    document.getElementById("my_vacation_list").hidden = false;
    document.getElementById("my_vacation_tbody").innerHTML = "";
    getMyVacation();
}

function logout() {
    sessionStorage.clear();
    window.location.href = "login.html";
}



function employeeDetails(index) {
    departmentSelectOptions();
    var employeeList = JSON.parse(sessionStorage.getItem("all_employees"));
    var position_select = document.getElementById("employee_details_position");
    document.getElementById("employee_details_id").value = employeeList[index].employee_id;
    document.getElementById("employee_details_account").value = employeeList[index].employee_account;
    document.getElementById("employee_details_name").value = employeeList[index].employee_name;
    document.getElementById("employee_details_gender").value = employeeList[index].genre;
    document.getElementById("employee_details_email").value = employeeList[index].email;
    document.getElementById("employee_details_address").value = employeeList[index].address;
    $("#employee_details_department").find("option").each(function () {
        if ($(this).text() == employeeList[index].department_name) {
            $(this).attr("selected", true);
        }
    });


    for (i = 0; i < positionList.length; i++) {
        if (positionList[i].department_id == employeeList[index].department_id) {
            position_select.options.add(new Option(positionList[i].position_name, positionList[i].position_id));
        }
    }
    $("#employee_details_position").find("option").each(function () {
        if ($(this).text() == employeeList[index].position_name) {
            $(this).attr("selected", true);
        }
    });
}

function clickPass(div_id, vacation_id, status_id, method) {
    switch (method) {
        case "1":
            approveVacation(vacation_id, 1, status_id, div_id);
            break;
        case "2":
            approveVacation(vacation_id, -1, status_id, div_id);
            break;
        case "3":
            approveVacation(vacation_id, -2, status_id, div_id);
            break;
        default:
            break;
    }
}

function hideModal() {
    $('#modifyDetails').removeClass('in').addClass('out');
    //$('#modifyDetails').removeAttr('style');
    //$('#modifyDetails').css("display", "none");
    $('.modal-backdrop').remove();
    $('body').removeClass('modal-open');
    $('body').removeAttr('style');
}



