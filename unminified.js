init();
		function init() {
			"use strict";
			console.log('Initializing Slider..');
		var wrapper=document.getElementsByClassName('sliderwrapper')[0];
		var slider=document.getElementsByClassName('slider')[0];
		var slides=document.getElementsByClassName('slides');
		var slidescount=slider.childElementCount;
		var wrapperw=wrapper.offsetWidth;
		var autoplay=3000;
		
		var currsliderw=wrapperw/slidescount;
		//set wrapper width
		slider.style.width=wrapperw*slidescount+'px';
		wrapper.style.overflow='hidden';
		
		for(var i=0;i<slidescount;i++){
			slides[i].style.width=wrapperw+'px';
		}
		
		var next=document.getElementsByClassName('next')[0];
		var prev=document.getElementsByClassName('prev')[0];
		var pause=document.getElementsByClassName('pause')[0];
		var fullsc=document.getElementsByClassName('fullsc')[0];
			
			
		var currpos=0;
		
			
		//full screen turn on
		fullsc.onclick=function(){
			wrapper.requestFullscreen();	
		};
			
		//adjust slider on window change
		adjustslider();
		function adjustslider(){
			slider.style.transform="translate3d(-"+currpos+"px, 0px, 0px)";
		}
		
		
		wrapper.onmousemove=function(){
			clearTimeout(overmyVar);
			wrapper.classList.remove('active_over');
			window.overmyVar = setTimeout(remove_ove, autoplay);
		}
		function remove_ove(){
			wrapper.classList.add('active_over');
		}
		wrapper.onmouseout=function(){
			clearTimeout(overmyVar);
			wrapper.classList.remove('active_over');
		}	
		//on mouse leave /remove overlay
		wrapper.onmouseover=function(){
			window.overmyVar = setTimeout(remove_ove, autoplay);
		}
			
		//pause function()
		pause.onclick=function(){
			if(pause.classList.contains('active')==true){
				console.log('paused')
				pause.classList.remove('active');
				
				window.autotimer=setInterval(callauto,autoplay)
			}else{
				pause.classList.add('active')
				console.log('play');
				clearInterval(window.autotimer);
			}
		}
		
		
			
		//next function
		next.onclick=function(){
			
			//check currpos and prevent overclick
			
			if(currpos<parseFloat(wrapperw*slidescount)-wrapperw){
				//get current position of slider
				currpos=currpos+wrapperw;
				slider.style.transform="translate3d(-"+currpos+"px, 0px, 0px)";
				//console.log('curr pos'+ currpos+' wrapper:'+wrapperw*slidescount)
			}
			
			//console.log(currpos)
			
		}
		
		
		//prev func
		prev.onclick=function(){
			//check if state is not default & convert negative number to positive first NO THANOS FIGHT HERE PLEASE
			var temp=Math.abs(currpos)
			if(temp!=0){
				currpos=wrapperw-Math.abs(currpos);
				//console.log('wrapperw:'+wrapperw +' currpos: '+currpos)
				slider.style.transform="translate3d("+currpos+"px, 0px, 0px)";
				//console.log('prev: '+currpos)
			}
		}
		
		
		//auto scroll which is not a REAL AUTO
		
		
		window.autotimer=setInterval(callauto,autoplay)
		function callauto(){
			if(currpos<parseFloat(wrapperw*slidescount)-wrapperw){
				console.log('if mein')
				//get current position of slider
				currpos=currpos+wrapperw;
				slider.style.transform="translate3d(-"+currpos+"px, 0px, 0px)";
				//console.log('curr pos'+ currpos+' wrapper:'+wrapperw*slidescount)
			}else{
				console.log('else mein')
				currpos=currpos-parseFloat(currpos);
				
				slider.style.transform="translate3d(-"+currpos+"px, 0px, 0px)";
				console.log(currpos);
			}
			console.log('current pos:'+currpos+'Slider width:'+wrapperw)
		}
			//var getcurrpos=
		
			
			console.log('Initialization Complete!')
	};
		
		//to make it more realistic
		//autoadjust.onresize =function(){
		document.getElementsByTagName('body')[0].onresize=function(){
			console.log('Document Size is changing, Reload init() slider again')
			  clearInterval(window.autotimer);
			init();
		}
		
		//hide full screen if not chrome browser
		