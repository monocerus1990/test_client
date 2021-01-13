function login(account, password) {
    document.getElementById("spinner_login").hidden = false;
    /**
     * {"method":"login","data":{"employee_account":"admin2","password":"admin"}}
     * **/
    $.ajax({
        //Post传参
        type: "POST",
        //服务地址
        url: EmployeeUrl,
        //参数,此处写死值为3，动态获取select1选择值用opt
        data: "{\"method\":\"login\",\"data\":{\"employee_account\":\"" + account + "\",\"password\":\"" + password + "\"}}",
        dataType: "text",
        contentType: "text/plain;charset=utf-8",
        success: function (result) {//result类型为String
            obj = JSON.parse(result);//将result转为JSON
            var data = obj.data;//从返回值JSON中获取DATA字段的数据
            var status = obj.status;
            if (status == 1) {
                sessionStorage.setItem('employee_id', data[0].employee_id);
                sessionStorage.setItem('total_days', data[0].total_days);
                sessionStorage.setItem('remain_days', data[0].remain_days);
                getAllEmployees();
                getAllDepartments();
                getAllPositions();
                setTimeout(function () {
                    document.getElementById("spinner_login").hidden = true;
                    window.location.href = "main.html";
                }, 4 * 1000);

            } else {
                document.getElementById("spinner_login").hidden = true;
                alert("Failed to login system.\r\nPlease Check Your Account And Password");
            }

        },
        error: function (e) {
            window.alert(e.status);
        }
    });
}

function getAllEmployees() {
    $.ajax({
        //Post传参
        type: "GET",
        //服务地址
        url: EmployeeUrl,
        //参数,此处写死值为3，动态获取select1选择值用opt
        data: null,
        dataType: "text",
        async: false,
        contentType: "text/plain;charset=utf-8",
        success: function (result) {//result类型为String
            obj = JSON.parse(result);//将result转为JSON
            var data = obj.data;//从返回值JSON中获取DATA字段的数据
            var status = obj.status;
            if (status == 1) {
                sessionStorage.setItem('all_employees', JSON.stringify(data));
            }
        },
        error: function (e) {
            window.alert(e.status);
        }
    })
}

function getAllDepartments() {
    $.ajax({
        //Post传参
        type: "GET",
        //服务地址
        url: DepartmentUrl,
        //参数,此处写死值为3，动态获取select1选择值用opt
        data: null,
        dataType: "text",
        async: false,
        contentType: "text/plain;charset=utf-8",
        success: function (result) {//result类型为String
            obj = JSON.parse(result);//将result转为JSON
            var data = obj.data;//从返回值JSON中获取DATA字段的数据
            var status = obj.status;
            if (status == 1) {
                sessionStorage.setItem('all_departments', JSON.stringify(data));
            }
        },
        error: function (e) {
            window.alert(e.status);
        }
    })
}

function getAllPositions() {
    $.ajax({
        //Post传参
        type: "GET",
        //服务地址
        url: PositionUrl,
        data: null,
        dataType: "text",
        async: false,
        contentType: "text/plain;charset=utf-8",
        success: function (result) {//result类型为String
            obj = JSON.parse(result);//将result转为JSON
            var data = obj.data;//从返回值JSON中获取DATA字段的数据
            var status = obj.status;
            if (status == 1) {
                sessionStorage.setItem('all_positions', JSON.stringify(data));
            }
        },
        error: function (e) {
            window.alert(e.status);
        }
    })
}

function addNewEmployee(account, name, password, department_id, position_id, status, date) {
    $.ajax({
        //Post传参
        type: "POST",
        //服务地址
        url: EmployeeUrl,
        data: "{\"method\":\"register\",\"data\":{\"employee_name\":\"" + name + "\","
                + "\"employee_account\":\"" + account + "\","
                + "\"department_id\":\"" + department_id + "\","
                + "\"position_id\":\"" + position_id + "\","
                + "\"password\":\"" + password + "\","
                + "\"status\":\"" + status + "\","
                + "\"date\":\"" + date + "\"}}",
        dataType: "text",
        async: false,
        contentType: "text/plain;charset=utf-8",
        success: function (result) {//result类型为String
            //alert(result);//{"data":[{"employee_id":97}],"error":"null","status":"1"}
            obj = JSON.parse(result);//将result转为JSON
            var data = obj.data;//从返回值JSON中获取DATA字段的数据
            var status = obj.status;
            if (status == 1) {
                getAllEmployees();
                var employeeList = JSON.parse(sessionStorage.getItem("all_employees"));
                $("#employee_tbody").html("");
                for (i = 0; i < employeeList.length; i++) {
                    var employee_id = employeeList[i].employee_id;
                    var employee_name = employeeList[i].employee_name;
                    var department = employeeList[i].department_name;
                    var position = employeeList[i].position_name;
                    var status = employeeList[i].status;
                    $str = "<tr onclick=\"employeeDetails(" + i + ")\"><td>" + employee_id + "</td><td>" + employee_name + "</td><td>" + department + "</td><td>" + position + "</td><td>" + status + "</td><td><button class=\"btn btn-sm btn-warning\">MORE</button></td></tr>";
                    $("#employee_tbody").append($str);
                }
                alert("Successful Operation!");
            } else {
                alert("Operation Rejected!");
            }
        },
        error: function (e) {
            window.alert(e.status);
            //alert("添加员工失败");
        }
    });
    //$str = "<tr onclick=\"employeeDetails(" + i + ")\"><td>" + employee_id + "</td><td>" + employee_name + "</td><td>" + department + "</td><td>" + position + "</td><td>" + status + "</td></tr>";
    //$("#employee_tbody").append($str);
}

function updateEmployee(employee_id, department_id, position_id, status, date) {
    //{"method":"update","data":{"employee_id":65,"department_id":"3","position_id":"1","status":"2","date":""}}
    var empId = employee_id;
    var new_department_id = department_id;
    var new_position_id = position_id;
    var new_status = status;
    var new_date = date;

    var new_d_name = "";
    var new_p_name = "";

    var departmentList = JSON.parse(sessionStorage.getItem("all_departments"));
    var positionList = JSON.parse(sessionStorage.getItem("all_positions"))

    for (i = 0; i < departmentList.length; i++) {
        if (departmentList[i].department_id == department_id) {
            new_d_name = departmentList[i].department_name;
        }
    }

    for (i = 0; i < positionList.length; i++) {
        if (positionList[i].position_id == position_id) {
            new_p_name = positionList[i].position_name;
        }
    }

    $.ajax({
        //Post传参
        type: "POST",
        //服务地址
        url: EmployeeUrl,
        data: "{\"method\":\"update\",\"data\":{\"employee_id\":" + employee_id + ",\"department_id\":\"" + department_id + "\",\"position_id\":\"" + position_id + "\",\"status\":\"" + status + "\",\"date\":\"" + date + "\"}}",
        dataType: "text",
        contentType: "text/plain;charset=utf-8",
        success: function (result) {//result类型为String
            obj = JSON.parse(result);//将result转为JSON
            var status = obj.status;
            if (status == 1) {
                getAllEmployees();
                $("#employee_tbody").html("");
                showAllEmployees();
            }
        },
        error: function (e) {
            window.alert(e.status);
        }
    })

}

function modifyPersonalDetails(gender, address, email) {
    //{"method":"update","data":{"employee_id":65,"genre":1,"birthday":"19970214","email":"D00198309@student.dkit.ie","address":"19 Rockfield"}}
    var employee_id = JSON.parse(sessionStorage.getItem("employee_id"));
    $.ajax({
        type: "Post",
        url: EmployeeDetailsUrl,
        data: "{\"method\":\"update\",\"data\":{\"employee_id\":" + employee_id + ",\"genre\":" + gender + ",\"birthday\":\"18400420\",\"email\":\"" + email + "\",\"address\":\"" + address + "\"}}",
        dataType: "text",
        async: false,
        contentType: "text/plain;charset=utf-8",
        success: function (result) {//result类型为String
            obj = JSON.parse(result);//将result转为JSON
            var data = obj.data;//从返回值JSON中获取DATA字段的数据
            var status = obj.status;
            if (status == 1) {
                //sessionStorage.setItem('all_positions', JSON.stringify(data));
                getAllEmployees();
                $('#modifyDetails').removeClass('in').addClass('out');
                $('.modal-backdrop').remove();
                $('body').removeClass('modal-open');
                $('body').removeAttr('style');
                alert("Successful Operation!");
            } else {
                alert("Operation Rejected!");
            }
        },
        error: function (e) {
            window.alert(e.status);
            alert("Error");
        }
    });
}



var obj = null;
function getAllVacation() {
    $.ajax({
        //Post传参
        type: "GET",
        //服务地址
        url: VacationUrl,
        //参数,此处写死值为3，动态获取select1选择值用opt
        data: null,
        dataType: "text",
        async: false,
        contentType: "text/plain;charset=utf-8",
        success: function (result) {//result类型为String
            obj = JSON.parse(result);//将result转为JSON
            var data = obj.data;//从返回值JSON中获取DATA字段的数据
            var status = obj.status;
            //alert(status);
            if (status == 1) {
                for (i = 0; i < data.length; i++) {
                    var type = data[i].type;
                    var status = data[i].status;
                    var id = data[i].id;
                    var status_id = "vacation_status_" + id;
                    var div_id = "vacation_div_" + id;
                    //alert(status_id);
                    if (status == 0) {
                        $str_extra = "<td><div id='" + div_id + "'><button class=' btn btn-secondary active ' onclick=\"clickPass('" + div_id + "','" + id + "','" + status_id + "','" + 1 + "')\">Approve</button><button class=' btn btn-secondary active ' onclick=\"clickPass('" + div_id + "','" + id + "','" + status_id + "','" + 2 + "')\">Refuse</button></div></td>" +
                                "</tr>";
                    } else {
                        $str_extra = "<td></td>" +
                                "</tr>";
                    }
                    switch (type) {
                        case 1:
                            type = "Leave";
                            break;
                        case 2:
                            type = "Sick";
                            break;
                        default:
                            break;
                    }
                    switch (status) {
                        case - 1:
                            status = "Disagree";
                            break;
                        case 1:
                            status = "Agree";
                            break;
                        default:
                            status = "Approval";
                            break;
                    }
                    $str = "<tr>" +
                            "<td>" + data[i].employee_id + "</td>" +
                            "<td>" + data[i].employee_name + "</td>" +
                            "<td>" + type + "</td>" +
                            "<td>" + data[i].date_from + "</td>" +
                            "<td>" + data[i].date_end + "</td>" +
                            "<td id = '" + status_id + "'>" + status + "</td>" + $str_extra;
                    $("#vacation_tbody").append($str);
                }
            }
        },
        error: function (e) {
            window.alert(e.status);
        }
    });
}


function clickGetVactions() {
    $.ajax({
        type: "GET",
        //服务地址
        url: VacationUrl,
        //参数,此处写死值为3，动态获取select1选择值用opt
        data: null,
        dataType: "text",
        async: false,
        contentType: "text/plain;charset=utf-8",
        success: function (result) {//result类型为String
            var obj = JSON.parse(result);//将result转为JSON
            var status = obj.status;//从返回值JSON中获取DATA字段的数据
            var data = obj.data
            if (status == 1) {
                for (i = 0; i < data.length; i++) {
                    var employee_id = data[i].employee_id;
                    var employee_name = data[i].employee_name;
                    var count = data[i].count;
                    var remain_days = data[i].remain_days;
                    $str = "<tr onclick='getEmployeeVacation(" + employee_id + ")'>" +
                            "<td>" + employee_id + "</td>" +
                            "<td>" + employee_name + "</td>" +
                            "<td>" + 30 + "</td>" +
                            "<td>" + remain_days + "</td>" +
                            "<td>" + count + "</td><td><button class=\"btn btn-sm btn-warning\">MORE</button></td></tr>";
                    $("#vacation_tbody").append($str);
                }

            }
            getUserRemainDays();
            getMyVacation();
        },
        error: function (e) {
            window.alert(e.status);
        }
    });
}

function getEmployeeVacation(employee_id) {
    document.getElementById("my_vacation_list_remain_days").innerText = sessionStorage.getItem("remain_days");
    var eid = employee_id;
    $.ajax({
        type: "POST",
        url: VacationUrl,
        data: "{\"method\":\"myVacation\",\"data\":{\"employee_id\":" + employee_id + "}}",
        dataType: "text",
        async: false,
        contentType: "text/plain;charset=utf-8",
        success: function (result) {//result类型为String
            obj = JSON.parse(result);//将result转为JSON
            var data = obj.data;//从返回值JSON中获取DATA字段的数据
            var status = obj.status;
            if (status == 1) {
                $str = "<link href=\"../CSS/Vaction.css\" rel=\"stylesheet\"><link rel=\"stylesheet\" href=\"//brick.a.ssl.fastly.net/Roboto:400\"/>";
                for (i = 0; i < data.length; i++) {
                    var type = data[i].type;
                    var from = data[i].date_from;
                    var end = data[i].date_end;
                    var status = data[i].status;
                    var reason = data[i].description;

                    var vacation_id = data[i].id;

                    if (type == 1) {
                        type = "Leave";
                    } else if (type == 2) {
                        type = "Sick";
                    }
                    var now_seconds = new Date().getTime();
                    var from_seconds = new Date(from).getTime();
                    var end_seconds = new Date(end).getTime();
                    var total = (end_seconds - from_seconds) / 86400000;

                    var passed = (now_seconds - from_seconds) / 86400000;
                    if (now_seconds - end_seconds > 0) {
                        passed = (end_seconds - from_seconds) / 86400000;
                    }
                    if (passed < 0) {
                        passed = "Not arrived";
                    } else {
                        passed = parseInt(passed) + 1;
                    }
                    var status = data[i].status;
                    var status_text;
                    if (status == -1) {
                        status_text = "Disagress";
                        passed = "0";
                    }
                    if (status == 0) {
                        status_text = "Approving";
                    }
                    if (status == 1) {
                        status_text = "Agree";
                        if (now_seconds >= from_seconds && now_seconds < end_seconds) {
                            status_text = "On holiday";
                        }
                        if (now_seconds >= end_seconds) {
                            status_text = "Done";
                        }
                    }
                    if (status == -2) {
                        status_text = "Canceled";
                    }
                    if (status == -3) {
                        status_text = "Done";
                    }
                    if (status == 2) {
                        status_text = "On holiday";
                    }
                    if (status_text == "Approving") {
                        $div_style = "<div class=\"vacationBlock_r\">";
                        $extra_str = "<td><button class=\"btn btn-primary\" onclick = 'approveVacationV2(" + vacation_id + ", 1," + eid + ")'>Approve</button></td>"
                                + "<td><button class=\"btn btn-primary\" onclick = 'approveVacationV2(" + vacation_id + ", -1," + eid + ")' >Refuse</button></td>";
                    } else {
                        $div_style = "<div class=\"vacationBlock_b\">";
                        $extra_str = "<td></td>"
                                + "<td></td>";
                    }

                    $str = $str + $div_style
                            + "<table class=\"table\">"
                            + "<thead>"
                            + "<tr>"
                            + "<th>" + type + "</th><td></td><td></td><td></td>"
                            + "</tr>"
                            + "</thead>"
                            + "<tbody>"
                            + "<tr>"
                            + "<td>From:</td>"
                            + "<td>" + from + "</td>"
                            + "<td>To:</td>"
                            + "<td>" + end + "</td>"
                            + "</tr>"
                            + "<tr>"
                            + "<td>Total days:</td>"
                            + "<td>" + total + "</td>"
                            + "<td>Passed days:</td>"
                            + "<td>" + passed + "</td>"
                            + "</tr>"
                            + "<tr>"
                            + "<td>Reason:</td> "
                            + "<td></td>"
                            + "<td class=\"ReasonTd\">" + reason + "</td>"
                            + "<td></td> "
                            + "</tr>"
                            + "<tr>"
                            + "<td >Status:</td>"
                            + "<td>" + status_text + "</td>"
                            + $extra_str
                            + "</tr>"
                            + "</tbody>"
                            + "</table>"
                            + "</div><br/>";
                }
                $("#right_employee_vacation").html("");
                $("#right_employee_vacation").append($str);
            }
        },
        error: function (e) {
            window.alert(e.status);
        }
    });

}




function approveVacation(vacation_id, status, status_id, div_id) {
    $.ajax({
        type: "Post",
        url: VacationUrl,
        data: "{\"method\":\"approval\",\"data\":{\"id\":" + vacation_id + ",\"is_salary\":false,\"status\":" + status + "}}",
        dataType: "text",
        contentType: "text/plain;charset=utf-8",
        success: function (result) {//result类型为String
            var obj = JSON.parse(result);//将result转为JSON
            var data = obj.status;//从返回值JSON中获取DATA字段的数据
            if (data == 1) {
                if (status == 1) {
                    document.getElementById(status_id).innerText = "Agree";
                } else if (status == -1) {
                    document.getElementById(status_id).innerText = "Disagree";
                }
                document.getElementById(div_id).style.visibility = "hidden";
            }
            getUserRemainDays();
            getMyVacation();
        },
        error: function (e) {
            window.alert(e.status);
        }
    });
}


function approveVacationV2(vacation_id, status, id) {
    var employee_id = id;
    $.ajax({
        type: "Post",
        url: VacationUrl,
        data: "{\"method\":\"approval\",\"data\":{\"id\":" + vacation_id + ",\"is_salary\":false,\"status\":" + status + "}}",
        dataType: "text",
        contentType: "text/plain;charset=utf-8",
        success: function (result) {//result类型为String
            var obj = JSON.parse(result);//将result转为JSON
            var data = obj.status;//从返回值JSON中获取DATA字段的数据
            if (data == 1) {
                getEmployeeVacation(employee_id);
            }
            getUserRemainDays();
            getMyVacation();
            $("#vacation_tbody").html("");
            clickGetVactions();
        },
        error: function (e) {
            window.alert(e.status);
        }
    });
}


function cancelVacation(vacation_id) {
    $.ajax({
        type: "Post",
        url: VacationUrl,
        data: "{\"method\":\"approval\",\"data\":{\"id\":" + vacation_id + ",\"is_salary\":false,\"status\":-2}}",
        dataType: "text",
        contentType: "text/plain;charset=utf-8",
        success: function (result) {//result类型为String
            var obj = JSON.parse(result);//将result转为JSON
            var data = obj.status;//从返回值JSON中获取DATA字段的数据
            if (data == 1) {
                getUserRemainDays();
                getMyVacation();
            }
        },
        error: function (e) {
            window.alert(e.status);
        }
    });
}


function applyVacation(from, end, type, desc) {
    //{"method":"apply","data":{"employee_id":65,"date_from":"20200314","date_end":"20200316","type":1,"description":""}}
    var remain_days = sessionStorage.getItem("remain_days");
    var from_time = (new Date(from)).getTime();
    var end_time = (new Date(end)).getTime();
    var now_time = (new Date()).getTime();
    if (from_time < now_time) {
        alert("From date can not smaller than current date");
    } else if (from_time > end_time) {
        alert("From date can not bigger than end date");
    } else if ((end_time - from_time) / 86400000 > remain_days) {
        alert("Remaining days are not enough for this vacation!");
    } else {
        var employee_id = JSON.parse(sessionStorage.getItem("employee_id"));
        $.ajax({
            type: "Post",
            url: VacationUrl,
            data: "{\"method\":\"apply\",\"data\":{\"employee_id\":" + employee_id + ",\"date_from\":\"" + from + "\",\"date_end\":\"" + end + "\",\"type\":" + type + ",\"description\":\"" + desc + "\"}}",
            dataType: "text",
            async: false,
            contentType: "text/plain;charset=utf-8",
            success: function (result) {//result类型为String
                obj = JSON.parse(result);//将result转为JSON
                var data = obj.data;//从返回值JSON中获取DATA字段的数据
                var status = obj.status;
                if (status == 1) {
                    document.getElementById("vacation_tbody").innerHTML = "";
                    clickGetVactions();
                    $('#apply_vacation').removeClass('in').addClass('out');
                    $('.modal-backdrop').remove();
                    $('body').removeClass('modal-open');
                    $('body').removeAttr('style');
                    alert("Already Submit!");
                    getUserRemainDays();
                    getMyVacation();
                    obj = null;
                }
            },
            error: function (e) {
                window.alert(e.status);
                alert("Error");
            }
        });
    }
}

function changePassword(oldPwd, newPwd, curPwd) {
    //{"method":"change_password","data":{"employee_id":66,"old_password":"12345","new_password":"admiin"}}
    if (newPwd == curPwd) {
        var employee_id = JSON.parse(sessionStorage.getItem("employee_id"));
        $.ajax({
            type: "Post",
            url: EmployeeUrl,
            data: "{\"method\":\"change_password\",\"data\":{\"employee_id\":" + employee_id + ",\"old_password\":\"" + oldPwd + "\",\"new_password\":\"" + newPwd + "\"}}",
            dataType: "text",
            async: false,
            contentType: "text/plain;charset=utf-8",
            success: function (result) {//result类型为String
                obj = JSON.parse(result);//将result转为JSON
                var data = obj.data;//从返回值JSON中获取DATA字段的数据
                var status = obj.status;
                if (status == 1) {
                    $('#change_password').removeClass('in').addClass('out');
                    $('.modal-backdrop').remove();
                    $('body').removeClass('modal-open');
                    $('body').removeAttr('style');
                    alert("Change Password Successed");
                } else {
                    alert("Change Password Failed");
                }
            },
            error: function (e) {
                window.alert(e.status);
                alert("Error");
            }
        });
    } else {
        alert("Current Password is not same as NEW PASSWORD! ");
    }

}

function getNowMonth(date) {
    var mydate = new Date(date);
    var year = mydate.getFullYear();
    var month = mydate.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    var t2 = year + '/' + month + '/01 00:00:00';
    return (new Date(t2)).getTime();
}

function getPreMonth(date) {
    var mydate = new Date(date);
    var year = mydate.getFullYear();
    var month = mydate.getMonth() + 1 - 1;
    if (month == 0) {
        month = 12;
        year = year - 1;
    }
    if (month < 10) {
        month = '0' + month;
    }
    var t2 = year + '/' + month + '/01 00:00:00';
    return (new Date(t2)).getTime();
}

/**
 * 获取下一个月
 *
 * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
 */
function getNextMonth(date) {
    var mydate = new Date(date);
    var year = mydate.getFullYear();
    var month = mydate.getMonth() + 1 + 1;
    if (month > 12) {
        month = 1;
        year = year + 1;

    }
    if (month < 10) {
        month = '0' + month;
    }
    var t2 = year + '/' + month + '/01 00:00:00';
    return (new Date(t2)).getTime();
}

function getAttendence(employee_id, from, to) {
    var myday = new Array();
    $.ajax({
        type: "POST",
        url: AttendenceUrl,
        data: "{\"method\":\"get_attendence\",\"data\":{\"employee_id\":" + employee_id + ",\"from\":" + (from / 1000) + ",\"to\":" + (to / 1000) + "}}",
        dataType: "text",
        async: false,
        contentType: "text/plain;charset=utf-8",
        success: function (result) {//result类型为String
            obj = JSON.parse(result);//将result转为JSON
            var data = obj.data;//从返回值JSON中获取DATA字段的数据
            var status = obj.status;
            if (status == 1) {
                for (var i = 0; i < data.length; i++) {
                    myday[i] = data[i].seconds;
                }
            }
        },
        error: function (e) {
            window.alert(e.status);
        }
    });
    return myday;
}

function signAttendance(employee_id, seconds) {
    $.ajax({
        type: "POST",
        url: AttendenceUrl,
        data: "{\"method\":\"signed\",\"data\":{\"employee_id\":" + employee_id + ",\"seconds\":" + seconds + "}}",
        dataType: "text",
        async: false,
        contentType: "text/plain;charset=utf-8",
        success: function (result) {//result类型为String
            obj = JSON.parse(result);//将result转为JSON
            var data = obj.data;//从返回值JSON中获取DATA字段的数据
            var status = obj.status;
            if (status == 1) {
                alert("Great!");
            }
        },
        error: function (e) {
            window.alert(e.status);
        }
    });
}

function getUserRemainDays() {
    var employee_id = sessionStorage.getItem('employee_id');
    $.ajax({
        type: "POST",
        url: VacationUrl,
        data: "{\"method\":\"user_remain_days\",\"data\":{\"employee_id\":" + employee_id + "}}",
        dataType: "text",
        async: false,
        contentType: "text/plain;charset=utf-8",
        success: function (result) {//result类型为String
            obj = JSON.parse(result);//将result转为JSON
            var data = obj.data;//从返回值JSON中获取DATA字段的数据
            var status = obj.status;
            if (status == 1) {
                sessionStorage.setItem('remain_days', data[0].remain_days);
                document.getElementById("apply_vacation_remain").innerText = data[0].remain_days;
                document.getElementById("my_vacation_list_remain_days").innerText = data[0].remain_days;
            }
        },
        error: function (e) {
            window.alert(e.status);
        }
    });
}

function getMyVacation() {
    document.getElementById("my_vacation_list_remain_days").innerText = sessionStorage.getItem("remain_days");
    var employee_id = sessionStorage.getItem('employee_id');
    $.ajax({
        type: "POST",
        url: VacationUrl,
        data: "{\"method\":\"myVacation\",\"data\":{\"employee_id\":" + employee_id + "}}",
        dataType: "text",
        async: false,
        contentType: "text/plain;charset=utf-8",
        success: function (result) {//result类型为String
            obj = JSON.parse(result);//将result转为JSON
            var data = obj.data;//从返回值JSON中获取DATA字段的数据
            var status = obj.status;
            if (status == 1) {
                $("#my_vacation_tbody").html("");
                for (i = 0; i < data.length; i++) {
                    var type = data[i].type;
                    var vacation_id = data[i].id;

                    if (type == 1) {
                        type = "Leave";
                    } else if (type == 2) {
                        type = "Sick";
                    }
                    var from = data[i].date_from;
                    var end = data[i].date_end;
                    var now_seconds = new Date().getTime();
                    var from_seconds = new Date(from).getTime();
                    var end_seconds = new Date(end).getTime();
                    var total = (end_seconds - from_seconds) / 86400000;

                    var passed = (now_seconds - from_seconds) / 86400000;
                    if (now_seconds - end_seconds > 0) {
                        passed = (end_seconds - from_seconds) / 86400000;
                    }
                    if (passed < 0) {
                        passed = "Not arrived";
                    } else {
                        passed = parseInt(passed) + 1;
                    }
                    var status = data[i].status;
                    var status_text;
                    var isShowButton = false;
                    if (status == -1) {
                        status_text = "Disagress";
                        passed = "0";
                        isShowButton = false;
                    }
                    if (status == 0) {
                        status_text = "Approving";
                        isShowButton = true;
                    }
                    if (status == 1) {
                        status_text = "Agree";
                        isShowButton = true;
                        if (now_seconds >= from_seconds && now_seconds < end_seconds) {
                            status_text = "On holiday";
                            isShowButton = true;
                        }
                        if (now_seconds >= end_seconds) {
                            status_text = "Done";
                            isShowButton = false;
                        }
                    }
                    if (status == -2) {
                        status_text = "Canceled";
                        isShowButton = false;
                    }
                    if (status == 2) {
                        status_text = "On Holiday";
                        isShowButton = true;
                    }
                    if (status == -3) {
                        status_text = "Done";
                        isShowButton = false;
                    }
                    if (isShowButton) {
                        $strHtmlShowButton = "<tr><td>" + type + "</td><td>" + from + "</td><td>" + end + "</td>"
                                + "<td>" + (total + 1) + "</td><td>" + passed + "</td><td>" + status_text + "</td><td><button class=' btn btn-secondary active ' onclick='cancelVacation(" + vacation_id + ")'>Cancel</button></td></tr>";
                        $("#my_vacation_tbody").append($strHtmlShowButton);
                    } else {
                        $strHtmlNoButton = "<tr><td>" + type + "</td><td>" + from + "</td><td>" + end + "</td>"
                                + "<td>" + (total + 1) + "</td><td>" + passed + "</td><td>" + status_text + "</td><td></td></tr>";
                        $("#my_vacation_tbody").append($strHtmlNoButton);
                    }
                }

            }
        },
        error: function (e) {
            window.alert(e.status);
        }
    });

}

function test() {
    alert("触发了");
}

