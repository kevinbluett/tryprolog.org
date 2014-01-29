var Tutorial = function(){
	var that = this;
	var loader;
	var data;
	var step;
	
	var text = {
		terminal_greeting: "[[b;#000;#00ee11] Basic Prolog Interpreter ]\nNote: Facts are auto-magically reloaded when a new command is run."
	}

	var selectors = {
		page: "section",
		editor_element: "editor",

		tutorial_bar: ".tutorial",
		lesson: ".lesson",
		
		console: "#console",
	};
	
	var endpoints = {
		stl_lessons: "data/live.json"
	}

	this.init = function(ldr){
		that.loader = ldr;
		that.step = 0;

		$.getJSON(endpoints.stl_lessons, function( data ) {
			that.data = data;
		 	that.showTutorialBar();
		 	that.setTutorialContent(data.lessons[that.step].title, data.lessons[that.step].content);
		});

		$(".next-step").click(function(){
			if (that.step < that.data.lessons.length-1) {
				that.step += 1;
				that.setTutorialContent(that.data.lessons[that.step].title, that.data.lessons[that.step].content);
			}
		});

		$(".previous-step").click(function(){
			if (that.step > 0) {
				that.step -= 1;
				that.setTutorialContent(that.data.lessons[that.step].title, that.data.lessons[that.step].content);
			}
		});

		var i = 0;
		var dragging = false;
		$('#dragbar').mousedown(function(e){
			e.preventDefault();

			dragging = true;
			var main = $('body');
			var ghostbar = $('<div>',
				{id:'ghostbar',
				css: {
					height: main.outerHeight(),
					top: e.pageY+2,
					left: main.offset().left
				}
			}).appendTo('body');

			$('#mousestatus').html("mousedown" + i++);

			$(document).mousemove(function(e){
				ghostbar.css("top",e.pageY+2);
			});
		});

		$(document).mouseup(function(e){
			$('#clickevent').html('in another mouseUp event' + i++);
			if (dragging) 
			{
				//$('#sidebar').css("width",e.pageX+2);
				//$('body').css("left",e.pageX+2);
				$(selectors.tutorial_bar).height($("body").height()-e.pageY);
				$(selectors.tutorial_bar).width("100%");
				$(selectors.page).height(e.pageY);
				that.loader.terminal.height($(selectors.page).height()-20);

				$('#ghostbar').remove();
				$(document).unbind('mousemove');
				dragging = false;
			}
		});

		$( window ).resize(function() {
			$(selectors.tutorial_bar).hide();
			$(selectors.page).height($(window).height()-$(selectors.tutorial_bar).height());
			that.loader.terminal.height($(selectors.page).height()-20);
		});
	};

	this.showTutorialBar = function(){
		$(selectors.tutorial_bar).hide();
		$(selectors.tutorial_bar).height("40%");
		$(selectors.tutorial_bar).width("100%");
		$(selectors.tutorial_bar).slideDown(800, function(){
			$(selectors.page).height("60%");
			that.loader.terminal.height($(selectors.page).height()-20);
		});
	};

	this.setTutorialContent = function(title, content) {
		$(selectors.lesson+" h1").html(title);
		$(selectors.lesson+" p").html(content);
	}
};