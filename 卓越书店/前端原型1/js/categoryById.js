function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) return pair[1];
    }
}
$(function () {
    showActivityBox(getQueryVariable("id"));
});

function showActivityBox(id, page_num) {
    var _data = "page_num=" + page_num + "&page_size=10";
    $.ajax({
        url: "http://192.168.1.138:8080/api/category/selectById/" + 34,
        type: "get",
        dataType: "json",
        cache: false,
        xhrFields: {
            withCredentials: true
        },
        beforeSend: function () {},
        complete: function () {},
        data: _data,
        success: function (result) {
            if (result.code == 200) {
            	alert("nihao");
                initData(result.data);
            }

        }
    });
}

function initData(data) {
    var list = data.list;
    var tr_str = "<tr>" +
        "<th >id：</th>" +
        "<th >名字：</th>" +
     
        "</tr>";
    for (var i = 0; i < list.length; i++) {
        tr_str += "<tr data-id='" + list[i].id + "'>" +
            '<td class="cc">' + list[i].id+ '</td>' +
            '<td class="cc">' + list[i].name + '</td>' +
            
            
        "</tr>";
    }


    $("#table").html(tr_str);

    $(".M-box").pagination({
        pageCount: data.pages,
        current: data.page_num,
        callback: 'pageselectCallback',
        prevContent: "上一页",
        nextContent: "下一页",
        jump: true,
        coping: true,
        callback: function (api) {
            getData(api.getCurrent())
        }
    });
}
