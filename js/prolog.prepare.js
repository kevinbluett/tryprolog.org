var PrologPrepare = function(){
	var that = this;

	this.init = function(){};
	
	/**
	 * Provides some preparsing support for the prolog interpreter.
	 */
	this.process = function(term, command){
		freeform(term, that.prepareCommand(command));
	};
	
	/**
	 * Provide support for unification using '=' and other features, ie. arithmetic.
	 */
	this.prepareCommand = function(command) {
		command = command.replace(".","");
		
		// Unification.
		if(command.indexOf("=") !== -1) {
			var parts = command.split("=");
			
			if (parts.length == 2) {
				command = "unify("+$.trim(parts[0])+","+$.trim(parts[1])+").";
			}
		}  
		
		return that.recursivePrepare(command)+".";
	};
	
	this.recursivePrepare = function(command){
		// Addition.
		if(command.indexOf("+") !== -1) {
			alert("lol");
			var parts = command.split("/\+(.+)?/");
			alert(parts[0]);
			alert(parts[1]);
			
			if (parts.length == 2) {
				alert(parts[0]);
				alert(parts[1]);
				command = "add("+$.trim(parts[0])+","+$.trim(parts[1].replace(".",""))+").";
			} else {
				return command;
			}
		} /*else if () {} */
		else {
			return command;
		}
	};
};