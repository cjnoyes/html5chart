
    function defaultConfiguration() {
    	var cfg = {
    		glyphs: true,
    		offset: 0,
    		inner: false,
    		glyphFont: "AstGlyphsWF",
    		textFont:  "Arial"
    	};
    	return cfg;
    }
	
window.cjnoyessw.configuration = window.cjnoyessw.configuration || {

__ckInit: function() {
	if (this.__cfg === undefined) {
		this.__cfg = defaultConfiguration();
	}
},

getConfiguration: function() {
	if (this.__cfg === undefined) {
		this.__cfg = defaultConfiguration();
		return this.__cfg;
	}
	else {         
		return this.__cfg;
	}
},

setConfiguration: function(cfg) {
	this.__cfg = cfg;
},

setGlyphs: function(glyphs) {
	this.__ckInit();
	this.__cfg.glyphs = glyphs;
},

getGlyphs: function() {
	this.__ckInit();
	return this.__cfg.glyphs;
},
	
setOffset: function(offset) {
	this.__ckInit();
	this.__cfg.offset = offset;
},

getOffset: function() {
	this.__ckInit();
	return this.__cfg.offset;
},

setInner: function(inner) {
    this.__ckInit();
	this.__cfg.inner = inner;
},

getInner: function() {
	this.__ckInit();
	return this.__cfg.inner;
}


};	

function blueColors() {
	var clrs = {
			planet:"white",
			house: "red",
	        sign: "green",
	        ascend: "yellow",
	        lines: "#808080",
	        background: ["#000040","#000020"],
	        circleFill: "#000060",
	        signCircle: "#000038"
	};

	return clrs;
}

function redColors() {
	var clrs = {
			planet:"white",
			house: "red",
	        sign: "green",
	        ascend: "yellow",
	        lines: "#808080",
	        background: ["#400000","#200000"],
	        circleFill: "#600000",
	        signCircle: "#380000"
	};

	return clrs;
}

function greenColors() {
	var clrs = {
			planet:"white",
			house: "red",
	        sign: "green",
	        ascend: "yellow",
	        lines: "#808080",
	        background: ["#004000","#002000"],
	        circleFill: "#006000",
	        signCircle: "#003800"
	};

	return clrs;
}

function whiteColors() {
	var clrs = {
			planet:"black",
			house: "red",
	        sign: "green",
	        ascend: "blue",
	        lines: "#808080",
	        background: ["#ffffff","#f0f0f0"],
	        circleFill: "#99CCFF",
	        signCircle: "#cceeff"
	};

	return clrs;
}


function defaultColors() {
	return blueColors();
}


window.cjnoyessw.colors = window.cjnoyessw.colors || {

__ckInit: function() {
	if (this.__clrs === undefined) {
		this.__clrs = defaultColors();
	}
},

setTheme: function (theme) {
	var clrs;
	switch (theme) {
	
	case 'white' :
		clrs = whiteColors();
		break;
	case 'red' :
		clrs = redColors();
		break;
	case 'green' :
		clrs = greenColors();
		break;
	case 'blue':
	default:
		clrs = blueColors();
		break;
	}
	this.__clrs = clrs;
},

getColors: function () {
	if (this.__clrs === undefined) {
		this.__clrs = defaultColors();
		return this.__clrs;
	}
	else {
		return this.__clrs;
	}
},

setColors: function(clrs) {
	this.__clrs = clrs;
}
	


};	


