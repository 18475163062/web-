$(function () {
    getData(1);
});

function getData(page_num) {
    var _data = "page_num=" + page_num + "&page_size=5";
    $.ajax({
        url: "http://192.168.1.138:8080/api/category/list",
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
                initData(result.data);
            }
        }
    });
}

function initData(data) {
    var list = data.list;
    var tr_str = "<tr>" +
        "<th>主键</th>" +
        "<th>分类的名称</th>" +
        "<th >属性管理</th>" +
        
        "</tr>";
    for (var i = 0; i < list.length; i++) {
        tr_str += "<tr data-id='" + list[i].id + "'>" +
            '<td class="cc">' + list[i].id + '</td>' +
            '<td class="cc">' + list[i].name + '</td>' +
            "<td  class='cc'>&nbsp&nbsp<a  href='#' onclick='showActivityBox(this)'>详情</a></td>" +
           
            '</td>'
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
function showActivityBox(item) {
    window.location.href = "fenleiliebiao.html?id=" + $(item).closest("tr").data("id");
    return;
}