var PrologPrepare = function(){
	var that = this;

	this.init = function(){};
	
	/**
	 * Provides some preparsing support for the prolog interpreter.
	 */
	this.process = function(term, command){
		var cmd = that.prepareCommand(command);
		freeform(term, cmd);
	};
	
	/**
	 * Provide support for unification using '=' and other features, ie. arithmetic.
	 */
	this.prepareCommand = function(command) {
		command = command.replace(".","");
		
		// Unification.
		if(command.indexOf("=(") !== -1) {
			command = command.replace("=(","unify(");
		}else if(command.indexOf("=") !== -1) {
			var parts = command.split("=");
			
			if (parts.length == 2) {
				command = "unify("+$.trim(parts[0])+","+$.trim(parts[1])+")";
			}
		}
		
		return command+".";
	};
	
	this.splitFirst = function(str, needle) {
		var parts = new Array();
		parts[0] = str.substr(0,str.indexOf(needle));
		parts[1] = str.substr(str.indexOf(needle)+1);
		return parts;
	};
};