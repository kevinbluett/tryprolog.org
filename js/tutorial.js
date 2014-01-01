var Tutorial = function(){
	var that = this;
	var loader;
	
	var text = {
		terminal_greeting: "[[b;#000;#00ee11] Basic Prolog Interpreter ]\nNote: Facts are auto-magically reloaded when a new command is run."
	}

	var selectors = {
		page: "section",
		editor_element: "editor",

		tutorial_bar: ".tutorial",
		
		console: "#console",
	};
	
	var endpoints = {
		stl_lessons: "data/live.json"
	}

	this.init = function(ldr){
		that.loader = ldr;
		that.showTutorialBar();
	};

	this.showTutorialBar = function(){
		$(selectors.tutorial_bar).slideUp();
		$(selectors.page).height("60%");
		that.loader.terminal.height($(selectors.page).height()-20);
	};
};