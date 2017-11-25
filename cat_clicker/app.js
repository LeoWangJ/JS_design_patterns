var app = {
		data:[],
        control:{
        	init:function(){
        		app.model.init();
        		app.view.init(app.data);
        	},
        	bindEvent:function(data){
        		console.log('test');
        		for(var i =0 ; i< data.length; i++){
        			$('#' + data[i]['name']).on('click',(function(data){
        				return function(){
        					app.view.show(data);
        				}
        			})(data[i]))
        		}
        	},
        	counts:function(data){
        		$('.count').on('click','#img_'+data,(function(data){
        			return function(){
        				app.model.count(data,function(result){
        					app.view.count(result);
        				})
        			};
        		})(data))
        	}
     	},
     	view:{
	         init:function(data){
	             var list = $('.catList');
	             var html = ''
	             for(var i = 0 ; i< data.length; i++){
	                 html += '<li id="' + data[i]['name'] + '"><a>' + data[i]['name']+'</a></li>';	
	             }
	             list.append(html);
	             app.control.bindEvent(data);
	             this.show(data[0]);
	         },
	         show:function(data){
	         	 var html = '';
	         	 html = '<div class="count">'+
	         	 			'<h2>'+ data.name+'</h2>' + 
	         	 		    '<span class="counter">'+ data.click+'</span>clicks' + 
	         	 		    '<br>'+
	         	 		    '<img id="img_'+ data.name+'" src='+data.pic+'>'
	         	 		'</div>';
	         	$('.catSection').html(html);
	         	app.control.counts(data.name);
	         },
	         count:function(counts){
	         	$('.counter').html(counts);
	         }
	     },
	     model:{
	         init:function(){
	            app.data = [
	             	{ name:'cat1',
	             	  pic : "cat_picture1.jpg",
	             	  click:0
	                },
	                { name:'cat2',
	             	  pic : "cat_picture2.jpeg",
	             	  click:0
	                },
	                { name:'cat3',
	             	  pic : "cat_picture3.jpeg",
	             	  click:0
	                },
	                { name:'cat4',
	             	  pic : "cat_picture4.jpeg",
	             	  click:0
	                },
	                { name:'cat5',
	             	  pic : "cat_picture5.jpeg",
	             	  click:0
	                },
	            ]
	         },
	         count:function(data,callback){
	         	for(var i =0 ; i<app.data.length; i++){
        			if(data === app.data[i]['name']){
        				app.data[i]['click'] += 1;
        				callback(app.data[i]['click']);
        			}
        		}

	         }
	     },
    
}

$(function(){
	app.control.init();
})
