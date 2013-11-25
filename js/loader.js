var site_url = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');

var Loader = function(){
	var that = this;
	var editor;
	var prolog;
	
	var text = {
		terminal_greeting: "[[b;#000;#00ee11] Basic Prolog Interpreter ]\nNote: Facts are auto-magically reloaded when a new command is run."
	}

	var selectors = {
		page: "section",
		editor_element: "editor",
		
		console: "#console",

		//Overlay Selectors
		overlay: "#welcome_overlay",
		overlay_close_trigger: ".closemodal",

		//The STL library textarea store.
		stl_store: "#stl"
	};
	
	var endpoints = {
		stl_lessons: "data/live.json"
	}

	this.init = function(){
		// Setup Editor element, style and syntax highlighting
		that.editor = ace.edit(selectors.editor_element);
		that.editor.setTheme("ace/theme/twilight");
		that.editor.getSession().setMode("ace/mode/prolog");

		that.prepareTerminal();
		that.showWelcomeOverlay();

		//Load the STL and lessons after preparing the overlay
		that.loadLibLessons();
		
		// Prepare the prolog parser.
		that.prolog = new PrologPrepare();
		that.prolog.init();
	};

	this.prepareTerminal = function(){
		$(selectors.console).terminal(function(command, term) {
			if (command !== '') {
				try {
					term.pause();
					// Call the Prolog processing method.
					that.prolog.process(term, command);
					term.flush();
					term.resume();
				} catch(e) {
					term.error(new String(e));
				}
			} else {
				term.echo('');
			}
		}, {
			greetings: text.terminal_greeting,
			name: 'js_demo',
			height: $(selectors.page).height()-40,
			prompt: '?- '
		});
	};
	
	this.showWelcomeOverlay = function(){
		$(function() {
		    $(selectors.overlay).easyModal({
				autoOpen: true,
				overlayOpacity: 0.2,
				overlayColor: "#333",
				overlayClose: true,
				closeOnEscape: true
			});
			$(selectors.overlay_close_trigger).click(function(){
				$(selectors.overlay).trigger('closeModal');
			});
		});
	};
	
	/**
	 * This function loads the prolog Mini-STL and prepares it for use and loads the basic lessons in as well.
	 */
	this.loadLibLessons = function() {
		$.getJSON(endpoints.stl_lessons, function( data ) {
		 	$(selectors.stl_store).val(data.stl);
		  
		  	//Set lesson 1 data when the editor is loaded
		  	that.editor.getSession().setValue(data.lesson1[0]);
		});
	}
};