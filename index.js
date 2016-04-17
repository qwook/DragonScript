
if (typeof require != "undefined") {
	var fs = require('fs');
	var script = fs.readFileSync('./test.dsx', 'utf8');
}

var dragonSpeakLine = /\s?\([0-9]+:[0-9]+\)[^\n]+\n/g;

function compile(script) {
	script = script.replace(/DSPK V[0-9.]+ Furcadia/g, function(match) {
		return '_script += "' + match + '\\n";\n';
	})

	script = script.replace(/\*Endtriggers\* [0-9]+ \*Endtriggers\*/g, function(match) {
		return '_script += "' + match + '\\n";\n';
	})

	script = script.replace(dragonSpeakLine, function(match) {
		var line = match
			.replace('"', '\\"').trim()
			.replace(/`([^`]+)`/g, function(match, p1) {
				return "\" + (" + p1 + ") + \"";
			});
		return '_script += "' + line + '\\n";\n';
	});

	script = "var _script = '';\n" + script;

	compiled = eval(script);

	return compiled;
}

if (typeof require != "undefined") {
	fs.writeFileSync('../Furcadia/Dreams/Bomberman.ds', compile(script), 'utf8');
}
