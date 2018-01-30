$(function(){
	$.ajax({
				type: 'get',
                url: './data/all_pian.json',
                dataType: 'json',
                 contentType:"application/json",
           	 async:true,
           	 cache:false,
		success:function(data){
			var data=data.data;
			var htmls="";
			$("#hist_ul").empty();
			$.map(data, function(item) {//动态创建  计划   列表
				htmls+='<li class="mui-table-view-cell">'+item.plan+'</li>'
			});
			$("#hist_ul").html(htmls);
			
			$("#hist_ul li").each(function(){
					$(this).click(function(e){//点击   计划  发生的事件
						e.preventDefault();
					$(".head_cent").text($(this).text());
					$("#hist_one").hide();
					$("#hist_two").hide();
					$("#hist").hide();
					 $("body").unbind("touchmove")
				})
			})
			
		}
	})
	$.ajax({
				type: 'get',
                url: './data/data_msg.json',
                dataType: 'json',
                 contentType:"application/json",
           	 async:true,
           	 cache:false,
		success:function(data){
			var data=data.data;
			var html="";
			$("#cent_mag").empty();
			$.map(data, function(item) {//动态创建具体开奖种类  ：大小单双
				html+='<li class="lis_plan">'+item.plan+'</li>'
			});
			$("#cent_mag").html(html)
			$("#hist_two").click(function(){//点击蒙版执行的代码
					$(this).hide();
					$("#hist_one").hide();	
					$("#shuju").hide();
					$("#hist").hide();
					 $("body").unbind("touchmove")
				})
			$("#dianjia").on('click',function(e){//点击分类执行的代码
				e.preventDefault();
				$(".hidde").show();//显示所影藏的部分
				 $("body").bind("touchmove",function(ev){
			        	ev.preventDefault();
			        })
				
			})
		$("#btns").click(function(){//点击取消按钮执行的代码
					$(".hidde").hide();
					$("#shuju").hide();
					 $("body").unbind("touchmove")
				})
			$("#cent_mag .lis_plan").each(function(){//点击创建的大小单双计划执行的代码
				$(this).click(function(){

						 $("body").bind("touchmove",function(ev){
	        				ev.preventDefault();
	       						 })
					dataIsShow($(this));//创建动态显示数据
					$("#shuju").show();
					$("#hist_two").show();
				$(this).css({"background":"red","color":"#ffffff"})
				.siblings().css({"background":"#e0d6d6","color":"orange"});
				})
			})	
	
		}
	})
	
		function dataIsShow(item){
			$("#data_h1").text($(".head_cent").text()+item.text());//标题的内容
			$.ajax({
				type: 'get',
                url: './data/ssc_data.json',
                dataType: 'json',
                 contentType:"application/json",
           	 async:true,
           	 cache:false,
		success:function(data){
			var pps='<p>第一期开奖号码:'+data.number+'</p>';
			var data=data.datas;
				data=data.reverse();
			var htmls="";
			$("#jutidata").empty();
			$.map(data, function(item) {
				htmls+='<li>'+
				'<span>'+item.start+"-"+item.end+'期<span>'+
				'<span>'+item.name+':<i>['+item.number+']</i><span>'+
				'<span>&nbsp;'+item.wintime+'<span>'+
				'<span>'+item.winNum+'<span>'+
				'</li>'
			});
			html=htmls+pps;
			$("#jutidata").html(html);
		}
	})
		}
		
		
		
		
		
		
	var clipboard = new Clipboard('.btn_list');

    // 复制成功or失败后的回调函数，可以弹窗（toast）提示（可选）
    clipboard.on('success', function(e) {
    	$("#shuju").hide();
    	$("#hist_two").hide();
        console.info('Action:', e.action);
        console.info('Text:', e.text);
        console.info('Trigger:', e.trigger);
//        			alert("已复制")
//	      function alert(e){
//			        $("body").append('<div id="hides_li"></div><div id="msg"><div id="msg_cont">'+e+'</div><div class="msg_close" id="msg_clear">确定</div></div>');
			     	$("body").unbind("touchmove")
// 					$("#shuju").hide();
   					
	        
//  }
//							$(".msg_close").click(function (){
//						            $("#hides_li").remove();
//						            $("#msg").remove();
//						            $("body").unbind("touchmove")
//					        })
        e.clearSelection();
    });
    clipboard.on('error', function(e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
    });
	
})
