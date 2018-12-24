$(function(){
	getData(1);
});
function getData(page_num){
	var _data = "page_num=" + page_num + "&pagesize=9";
	$.ajax({
		url:"http://192.168.1.138:8080/api/category/list",
		type:"get",
		dataType:"json",
		cache:false,
		xhrFields:{
			withCredentials:true
		},
		data:_data,
		success:function(result){
			if (result.code == 200) {
				initData(result.data);
			}
		}
	});
}
	function initData(data){
			var list = data.list;
			var tr_str = "<tr >" + 
				
				// "<th class='t'>主键</th>"+
				// "<th class='t'>商品名称</th>"+
				// "<th class='t'>外键</th>"+
				// "<th class='t'>查看</th>"+
				// "<th class='t'>修改</th>"+
				// "<th class='t'>删除</th>"+

				"</tr>";
				for (var i = 0; i < list.length; i++) {
				tr_str += "<tr  data-id='"+list[i].id+"'>" +		
					// "<td >" + list[i].id + "</td>" +
					// "<td >" + list[i].name + "</td>" +
					// "<td >" + list[i].category_id + "</td>" +
					// "<td ><a href='#'>查看</a></td>" +
					"<td class='lef1'> <a href='#' class='l3' onclick='showActivityUpdateBox(this)'>"+ list[i].name + "</a></td>"+
					// "<td><a  href='#' onclick='showActivityUpdateBox(this)'>修改</td>" +
					// "<td><a  href='#' onclick='deleteItem(this)' >删除</td>"+
					"</tr>";
			}
			$("#left1").html(tr_str);
}

// "<td class='lef1'> <a href='#' class='l3' onclick='showActivityUpdateBox(this)'>"+ list[i].name + "</a></td>"+
var activityXhr;
    var updateTr;
    function showActivityUpdateBox(item) {
        	$(".activity-update-box").show();
         var tr=$(item).closest("tr");
        update_id = tr.data("id");
        if (activityXhr) activityXhr.abort();
            activityXhr = $.ajax({
            url:"http://192.168.1.138:8080/api/category/selectById/" + update_id,
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
                    console.log("id: " + data[x].id);
                    console.log("name: " + data[x].name);
                    

                    var products = data[x].products;
                    for(y in products){
                    	console.log("id: " + products[y].id);
                    	console.log("name: " + products[y].name);
                    	console.log("subtitle: " + products[y].subtitle);
                   		console.log("original_price: " + products[y].original_price);
                    	console.log("promote_price: " + products[y].promote_price);
                    	console.log("stock: " + products[y].stock);
                    	console.log("create_date: " + products[y].create_date);
                    	console.log("category_id: " + products[y].category_id);
                    }
                }
                for(x in data){
                    $("#container").append('<p>'+"商品名称："+data[x].id + '</p>');
                    $("#container").append('<p>'+"商品名称：" + data[x].name + '</p>');

                    var products = data[x].products;
                    for(y in products){
                    	 $("#container").append('<p>'+"主键："+products[y].id + '</p>');
                   		 $("#container").append('<p>'+"商品名称：" + products[y].name + '</p>');
                   		 $("#container").append('<p>'+"小标题："+ products[y].subtitle+'</p>');
                   		 $("#container").append('<p>'+"原价格：" + products[y].original_price + '</p>');
                   		 $("#container").append('<p>'+"优惠价格：" + products[y].promote_price +'</p>');
                   		 $("#container").append('<p>'+"库存：" + products[y].stock + '</p>');
                   		 $("#container").append('<p>'+"创建时间：" + products[y].create_date + '</p>');
                   		 // $("#container").append('<p>'+"商品名称：" + products[y].category_id +'</p>');
                    }
                }
                // alert("zhenshuai");
            }
         },
    });
}
