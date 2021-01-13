var isSign = false;
            var myday = new Array(); //已签到的数组
        //			myday[0] = "1528646400"
        //			myday[1] = "1528387200"
        //			myday[2] = "1525708800"

            var cale = new Calendar("idCalendar", {
                qdDay: myday,
                onToday: function (o) {
                    o.className = "onToday";
                },
                onSignIn: function () {
                    $$("sign-txt").innerHTML = 'signed';
                },
                onFinish: function () {
                    $$("sign-count").innerHTML = myday.length //已签到次数
                    $$("idCalendarYear").innerHTML = this.Year;
                    $$("idCalendarMonth").innerHTML = this.Month; //表头年份

                }
            });
            $$("idCalendarPre").onclick = function () {
                cale.PreMonth();
            }
            $$("idCalendarNext").onclick = function () {
                cale.NextMonth();
            }
            //添加今天签到
            $$("signIn").onclick = function () {
                if (isSign == false) {
                    var res = cale.SignIn();
                    if (res == '1') {
                        $$("sign-txt").innerHTML = 'signed';
                        $$("sign-count").innerHTML = parseInt($$("sign-count").innerHTML) + 1;
                        isSign = true;
                    } else if (res == '2') {
                        $$("sign-txt").innerHTML = 'signed';
                        alert('Signed in today')
                    }
                } else {
                    alert('Signed in today')
                }

            }