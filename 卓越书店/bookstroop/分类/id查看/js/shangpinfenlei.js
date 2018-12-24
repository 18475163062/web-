function subjectPersonnalPost() {
    $.ajax({
        url: "http://192.168.1.138:8080/api/product/add",
        type: "post",
        data: $("#subject-personnel-post-form").serialize(),
        dataType: "json",
        cache: false,
        xhrFields: {
            withCredentials: true
        },
        beforeSend: function () {},
        complete: function () {},
        success: function (result) {
            alert(result.msg);
            if (result.code == 200) {
                alert(result.msg);
                window.location.href = "tianjialiebiao.html";
            }else{
                    alert(result.mag);
                }
        },
        error: function (result) {
            alert("网络连接出错！");
        }
    });
}