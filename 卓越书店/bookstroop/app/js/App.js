var basePath = "http://192.168.1.138:8080";

$(function () {
    getData(1);
});

function getData(page_num) {
    var _data = "page_num=" + page_num + "&page_size=10";
    $.ajax({
        url: "http://192.168.1.138:8080/app/list",
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
        "<th>版本号</th>" +
        "<th >开发者</th>" +
        "<th >文件名</th>" +
        "<th >文件</th>" +
        "<th >时间</th>" +
        "<th >操作</th>" +
        "</tr>";
    for (var i = 0; i < list.length; i++) {
        tr_str += "<tr data-developer='" + list[i].developer + "'>" +
            '<td class="cc">' + list[i].version_code + '</td>' +
            "<td  class='cc'>" + list[i].developer + "</td>" +
            "<td  class='cc'>" + list[i].file_name + "</td>" +
            "<td  class='cc'>&nbsp&nbsp<a  href='#" + list[i].file_url + "' onclick='ShowDiv(this)'   >下载</a></td>" +

            "<td  class='cc'>" + list[i].turnover_time + "</td>" +
            "<td  class='cc'>&nbsp&nbsp<a  href='#'  onclick='showActivityUpdateBox(this)'   >查看</a></td>" +

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

// 二维码
function ShowDiv(item) {
    var host = window.location.host;
    jQuery('#qrcodeTable').qrcode({
        width: 180, //生成的二维码的宽度
        height: 180, //生成的二维码的高度
        render: "table",
        correctLevel: 0,
        text: ""
    })
}


// 查看
var activityXhr;
    var updateTr;
    function showActivityUpdateBox(item) {
        $(".activity-update-box").show();
         var tr=$(item).closest("tr");
        update_id = tr.data("developer");
        if (activityXhr) activityXhr.abort();
            activityXhr = $.ajax({
            url:"http://192.168.1.138:8080/app/listDeveloper/" +update_id,
            type: "get",
            dataType: "json",
            cache: false,
            xhrFields: {
               withCredentials: true
          },
            
            success: function (result) {
                    if (result.code == 200) {
                        var data = result.data.list;
                        for(x in data){
                            console.log("id: " +data[x].id);
                            console.log("version_code: " + data[x].version_code);
                            console.log("developer: " + data[x].developer);
                            console.log("turnover_time: " + data[x].turnover_time);
                        }
                        

                        
                        for(x in data){
                        $("#container").append('<p>'+ "主键：" +"<input type='text' name='id'   value='"+data[x].id  +"'>"+ '</p>');
                        $("#container").append('<p>'+"商品名称："+"<input type='text' name='version_code' value='"+data[x].version_code +"'>" + '</p>');
                        $("#container").append('<p>'+ "外键："+"<input type='text'  name='developer' value='"+data[x].developer +"'>"+ '</p>');
                        $("#container").append('<p>'+ "外键："+"<input type='text'  name='turnover_time' value='"+data[x].turnover_time +"'>"+ '</p>');
                            }
                    }
                    
                },
        });
    }
 
// function submit3(developer) {

//     var txtSearch = $("#txtSearch").val()
//     var pars = 'developer=' + txtSearch;


//     $.ajax({
//         url: "http://192.168.1.138:8080/app/listDeveloper/" + developer,
//         type: "get",
//         dataType: "json",
//         cache: false,
//         xhrFields: {
//             withCredentials: true
//         },
//         beforeSend: function () {},
//         complete: function () {},
//         data: pars,
//         success: function (result) {
//             if (result.code == 200) {
//                 initDate(result.data);
//             }
//         }
//     });
// }


// function initDate(data) {

//     var list = data.list;
//     var tr_str = "<tr>" +
//         "<th>版本号</th>" +
//         "<th >开发者</th>" +
//         "<th >文件名</th>" +
//         "<th >文件</th>" +
//         "<th >时</th>" +

//         "</tr>";
//     for (var i = 0; i < list.length; i++) {
//         tr_str += "<tr data-developer= '" + list[i].developer + "' > " +
//             '<td class="cc">' + list[i].version_code + '</td>' +
//             "<td  class='cc'>" + list[i].developer + "</td>" +
//             "<td  class='cc'>" + list[i].file_name + "</td>" +
//             "<td  class='cc'>&nbsp&nbsp<a  href='#" + list[i].file_url + "' onclick='ShowDiv(this)'   >下载</a></td>" +

//             "<td  class='cc'>" + list[i].turnover_time + "</td>" +


//             "</tr>";
//     }



//     $("#table").html(tr_str);
// }