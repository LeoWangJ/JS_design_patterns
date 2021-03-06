var retain = {
	
	init: function(){
		retain.model.init();
	    retain.view.init();
	},
	/**
	* 負責網頁上的視圖
	* @param {function} init - 用來處理在input中提交後的動作
	* @param {function} render - 渲染每筆資料到網頁上
	*/
	view:{
		init:function(){
			var content = $('#new-note-content');
             $('#new-note-form').on('submit',function(e){
             	retain.octopus.addNewData(content.val())
             	e.preventDefault();
             	content.val('');
             	retain.view.render();
             })
		},
		render:function(){
			var html = '';
			retain.octopus.getData().forEach(function(object){
				html += '<li class="note">'+
							'<span class="note-date">'+ 
								new Date(object.date).toString() +
							'</span>'+
							object.data + 
					    '</li>';
			})
			$('#notes').html(html);
		}
	},
	/**
	* 處理資料的地方,例如新增或取得
	* @param {function} init - 若在localStorage中的data 沒有資料,則給空陣列
	* @param {function} add - 對localStorage.data存想要的資料
	* @param {function} getData - 回傳在localStorage.data中的資料
	*/
	model:{
       init:function(){
           if(localStorage.data == undefined){
               localStorage.data = JSON.stringify([]);
           }    	
       },
       add:function(value){
       	   var data = JSON.parse(localStorage.data);
       	   data.push({
       	       data:value,
       	       date:Date.now(),	
       	   });
           localStorage.setItem('data',JSON.stringify(data));
       },
       getData: function(){
           return JSON.parse(localStorage.getItem('data'));	
       }

	},
	/**
	* view與model 的接口
	* @param {function} addNewData - 接收將要新增的資料
	* @param {function} getData - 回傳取得到的資料
	*/
	octopus:{
	    addNewData:function(value){
	        retain.model.add(value);	
	    },
	    getData: function(){
	    	return retain.model.getData().reverse();
	    }
	}
}

$(function(){
	retain.init();
})
