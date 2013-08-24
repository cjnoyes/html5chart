/**
 * 
 */

window.cjnoyessw = window.cjnoyessw || {};

(function () {

var __360DEGREES = 21600;


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




//const __360DEGREES = 21600;

var signText = new Array("ARI","TAU","GEM","CAN","LEO","VIR","LIB","SCO","SAG","CAP","AQU","PIS");	
var signGlyph = new Array("\xb8","\xb9","\xba","\xbb","\xbc","\xbd","\xbe","\xbf", "\xc0","\xc1","\xc2","\xc3");

function padLeft0s(str, len) {
	var diff = len - str.length;
	if (diff <= 0) {
		return str;
	}
	var fill="";
	for (var i = 0; i < diff; i++) {
		fill += '0';
	}
	return fill + str;
}


function format(degs,min,sign,retrograde,glyph) {
	var str = padLeft0s(degs.toString(),2);
	if (glyph) {
		str+= signGlyph[sign];
	}
	else {
		str+= signText[sign];
	}
	str += padLeft0s(min.toString(),2);
	if (retrograde) {
		str += 'R';
	}
	return str;
}


	
function calcMidpoints(ary,asc,offset) {
	if (ary[0]==0 && ary[1]==0) {
		return ary;
	}
	var retn = new Array();
	for (var i = 0; i < ary.length; i++) {
		var v1 = ary[i];
		v1+=offset;
		if (v1 < 0) {
			v1 += __360DEGREES;
		}
		else if (v1 > __360DEGREES) {
			v1 -= __360DEGREES;
		}
		var v2 = 0;
		if (i < 11) {
			v2 = ary[i+1];
		}
		else {
			v2 = ary[0];
		}
		if (v2 < v1) {
			v2 += __360DEGREES;
		}
		var diff = (v2-v1)/2;
		diff = Math.floor(diff);
		v1 += diff;
		if (v1 > __360DEGREES) {
			v1 -= __360DEGREES;
		}
		v1 = asc - v1;
		if (v1 < 0) {
			v1 +=  __360DEGREES;
		}
		retn.push(v1);
	}
	return retn;
}		
	

function splitMinutes(minutes,glyph,asc,offset) {
	asc += offset;
	if (asc < 0) {
		asc += __360DEGREES;
	}
	else if (asc > __360DEGREES) {
		asc -= __360DEGREES;
	}
	var result = new Object();
	if (minutes ==-1) {
		result.skip = true;
		result.formatted = "";
	}
	else {
		result.skip = false;
	}
	if (minutes < 0) {
		result.retrograde=true;
		minutes = Math.abs(minutes);
	}
	else {
		result.retrograde=false;
	}
	if (minutes > __360DEGREES) {
		minutes -= __360DEGREES;
	}
	result.total_minutes = minutes;
	result.minutes = minutes % 60;
	minutes -= result.minutes;
	var degrees = minutes/60;
	//console.log(degrees);
	result.total_degrees = degrees;
	result.degrees = degrees % 30;
	degrees -= result.degrees;
	result.sign = degrees / 30;
    result.formatted = format(result.degrees,result.minutes,result.sign,result.retrograde,glyph);
    var min = asc-minutes;
	if (min < 0) {
		min +=  __360DEGREES;
	}
	if (result.skip==true) {
		min = -1;
		result.formatted='';
	}
	result.adjustedMin = min;
	return result;
}	

function doHouseMidpts(data, glyph, asc, offset) {
	data.houseMidpoints = calcMidpoints(data.housecusps, asc, offset);
}

function natalHouseMidpts(data,glyph, offset, inner) {
	var asc = (inner==true?data.other.housecusps[0]:data.natal.housecusps[0]);
	doHouseMidpts(data.natal,glyph, asc, offset);
}

function otherHouseMidpts(data,glyph, offset, inner) {
	var asc = (inner==true?data.natal.housecusps[0]:data.other.housecusps[0]);
	doHouseMidpts(data.other,glyph, asc, offset);
}


function doSplitMinutes(data, glyph, asc, offset) {
	if (asc < 0) {
		asc += __360DEGREES;
	}
	else if (asc > __360DEGREES) {
		asc -= __360DEGREES;
	}
	var array = new Array();
	for (var i = 0; i < data.minutes.length; i++) {
		var min = data.minutes[i];
		if (min == 0) {
			break;
		}
		var obj = splitMinutes(min,glyph,asc,offset);
		array.push(obj);
	}
	
	data.splitMinutes = array;
}

function natalSplitMinutes(data,glyph,offset,inner) {
	var asc = (inner==true?data.other.housecusps[0]:data.natal.housecusps[0]);
	doSplitMinutes(data.natal,glyph,asc,offset);
}


function otherSplitMinutes(data,glyph,offset,inner) {
	var asc = (inner==true?data.other.housecusps[0]:data.natal.housecusps[0]);
	doSplitMinutes(data.other,glyph,asc,offset);
}



function doSplitHouseCusps(data,glyph,asc, offset) {
	var array = new Array();
	for (var i = 0; i < 12; i++) {
		var min = data.housecusps[i];
		min += offset;
		array.push(splitMinutes(min,glyph,asc,offset));
	}
	data.splitHousecusps = array;
}

function natalSplitHouseCusps(data, glyph,offset,inner) {
	var asc = (inner==true?data.other.housecusps[0]:data.natal.housecusps[0]);
	doSplitHouseCusps(data.natal,glyph,asc,offset);
}

function otherSplitHouseCusps(data,glyph,offset,inner) {
	var asc = (inner==true?data.other.housecusps[0]:data.natal.housecusps[0]);
	doSplitHouseCusps(data.other,glyph,asc,offset);
}

function transitsInit(data,glyph,offset,inner) {
	if (data.transits.length == 0) {
		return;
	}
	if (data.chartIndex > data.transits.length-1) {
		data.chartIndex = 0;
	}
	var transit = data.transits[data.chartIndex];
	data.other.minutes = transit.minutes;
	data.natal.date2 = transit.date;
	data.other.gridaspects = transit.aspects;
	data.other.maxpt = transit.maxpt;
	data.natal.maxpt = data.maxpt;
}

function init(data,glyph,offset,inner) {
	data.natal.maxpt = data.maxpt;
	data.other.maxpt = 0;
}

function biwheelInit(data,glyph,offset,inner) {
	data.natal.maxpt = data.maxpt;
	data.other.maxpt = data.maxpt;
}


window.cjnoyessw.datacalc = window.cjnoyessw.datacalc || {
	
	process: function(list,data) {
		var cfg = window.cjnoyessw.configuration.getConfiguration();
		for (var i = 0; i < list.length; i++) {
			var fnc = list[i];
			fnc(data,cfg.glyphs,cfg.offset,cfg.inner);
		}
	},
	
	getList: function(type) {
		switch (type) {
		case 'Transits' : 
			return new Array(transitsInit,natalHouseMidpts,natalSplitMinutes,natalSplitHouseCusps,otherHouseMidpts,otherSplitMinutes,otherSplitHouseCusps);
			break;
		case 'Natal' :
		case 'Relocation':
		case 'Numeric':
		case 'Composite':
			return new Array(init,natalHouseMidpts,natalSplitMinutes,natalSplitHouseCusps);
			break;
		default:
			return new Array(biwheelInit,natalHouseMidpts,natalSplitMinutes,natalSplitHouseCusps,otherHouseMidpts,otherSplitMinutes,otherSplitHouseCusps);
			break;
		}
	},
	
		
};


	//const __360DEGREES = 21600;
	

	function minToRads(minutes) {
		var degrees = minutes / 60.0;
		var rads = degrees * (Math.PI / 180.0);
		return rads;
	}

	function formatFont(name,size) {
		var weight = 'normal';
		var style = 'normal';
		if (arguments.length==3) {
			weight = arguments[2];
		}
		else if (arguments.length == 4) {
			weight = arguments[2];
			style = arguments[3];
		}
		return weight + ' ' + style + ' ' + size + ' ' + name;
	}
	
	function getWheelData(data,config) {
		if (config.inner == true) {
			return data.other;
		}
		else {
			return data.natal;
		}
	}
	
	function getOtherWheelData(data,config) {
		if (config.inner == false) {
			return data.other;
		}
		else {
			return data.natal;
		}
	}
	
	function showAspects(data) {
		if (data.natal.numaspects > 0 ) {
			return true;
		}
		else {
			return false;
		}
	}
	
	// function drawable(wheel,data) {}

	function background(wheel,data,config,colors) {
		var dim = wheel.dimensions();
		var ctx = wheel.context();
		if (colors.background.length==1) {
			ctx.fillStyle = colors.background[0];
		}
		else {
			var grad = ctx.createLinearGradient(0,0,dim.height,dim.width);
			grad.addColorStop(0,colors.background[0]);
	        grad.addColorStop(1,colors.background[1]);
	        ctx.fillStyle = grad;
		}
		
		ctx.fillRect(0,0,dim.width,dim.height);

	}

	function doCircles(wheel,data,config,colors,natal,aspects) {
		var dim = wheel.dimensions();
		dim = dim.circles;
		var ctx = wheel.context();
		ctx.fillStyle=colors.circleFill;
		var start=0.0;
		var end=360.1 * (Math.PI/180.0);
		ctx.beginPath();
		ctx.arc(dim.xPolarOrigin,dim.yPolarOrigin,dim.outerRadius,start,end,false);
		ctx.fill();
		ctx.fillStyle=colors.signCircle;
		ctx.beginPath();
		ctx.arc(dim.xPolarOrigin,dim.yPolarOrigin,dim.signRadius,start,end,false);
		ctx.fill();
		ctx.lineWidth=2.0;
		ctx.strokeStyle=colors.lines;
		ctx.beginPath();
		ctx.arc(dim.xPolarOrigin,dim.yPolarOrigin,dim.signRadius,start,end,false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(dim.xPolarOrigin,dim.yPolarOrigin,dim.outerRadius,start,end,false);
		ctx.stroke();
		if (natal == true) {
		   if (aspects==true) {
		      ctx.beginPath();
		      ctx.arc(dim.xPolarOrigin,dim.yPolarOrigin,dim.aspectRadius,start,end,false);
		      ctx.stroke();
		   }
		}
		else {
			ctx.beginPath();
			ctx.arc(dim.xPolarOrigin,dim.yPolarOrigin,dim.innerRadius,start,end,false);
			ctx.stroke();
		}
	}

	function natalCircles(wheel,data,config,colors) {
		doCircles(wheel,data,config,colors,true,showAspects(data));
	}
	
	function biwheelCircles(wheel,data,config,colors) {
		doCircles(wheel,data,config,colors,false,false);
	}
	
	function doSignLines(wheel,data,config,colors,radius) {
		var dim = wheel.dimensions();
		dim = dim.circles;
		var ctx = wheel.context();
		ctx.save();
		ctx.lineWidth = 2.0;
		ctx.translate(dim.xPolarOrigin,dim.yPolarOrigin);
		ctx.strokeStyle=colors.sign;
		var angles = new Array();
		var thedata = getWheelData(data,config);
		var asc = thedata.housecusps[0];
		for (var start=0; start < 360; start+=30) {
			var ang=start * 60;
			ang = asc - ang;
			if (ang < 0) {
				ang += 360.0;
			}
			angles.push(ang);
		}
		for (var i = 0; i < angles.length; i++) {
			ctx.beginPath();
			ctx.moveTo(wheel.getPolarX(angles[i],radius),wheel.getPolarY(angles[i],radius));
			ctx.lineTo(wheel.getPolarX(angles[i],dim.outerRadius),wheel.getPolarY(angles[i],dim.outerRadius));
			ctx.stroke();
		}
		ctx.restore();
	}

	function signLines(wheel,data,config,colors) {
		var dim = wheel.dimensions();
		dim = dim.circles;
		var aspects = showAspects(data);
		doSignLines(wheel,data,config,colors,aspects==true?dim.aspectRadius:0);
	}
	
	function biwheelSignLines(wheel,data,config,colors) {
		doSignLines(wheel,data,config,colors,0);
	}
	
	
	function signCircle(wheel, data,config,colors) {
		var dim = wheel.dimensions();
		dim = dim.circles;
		var ctx = wheel.context();
		ctx.save();
		ctx.translate(dim.xPolarOrigin,dim.yPolarOrigin);
		ctx.fillStyle=colors.planet;
		var angles = new Array();
		var thedata = getWheelData(data,config);
		var asc = thedata.housecusps[0];
		for (var start=15; start < 375; start+=30) {
			var ang=start * 60;
			ang = asc - ang;
			if (ang < 0) {
				ang += 360.0;
			}
			angles.push(ang);
		}
		ctx.font=formatFont(config.glyphFont,wheel.getFontSize(14),'400');
		ctx.textAlign="center";
		ctx.textBaseline="alphabetic";
		var rad = dim.signRadius+12;
		for (var i = 0; i < angles.length; i++) {
			var y = wheel.getPolarY(angles[i],rad);
			y+=3;
			ctx.fillText(wheel.getSign(i,config.glyphs),wheel.getPolarX(angles[i], rad),y);
		}
		ctx.restore();
	}

	function doHouseLines(wheel,data,config,colors,radius) {
		var dim = wheel.dimensions();
		dim = dim.circles;
		var ctx = wheel.context();
		ctx.save();
		ctx.lineWidth = 2.0;
		ctx.translate(dim.xPolarOrigin,dim.yPolarOrigin);
		ctx.strokeStyle=colors.house;
		var thedata = getWheelData(data,config);
		var angles = thedata.splitHousecusps;
		for (var i = 0; i < angles.length; i++) {
			if (i==0 || i==6) {
				ctx.strokeStyle=colors.ascend;
			}
			else {
				ctx.strokeStyle=colors.house;
			}
			var ang=angles[i].adjustedMin;
			ctx.beginPath();
			ctx.moveTo(wheel.getPolarX(ang,radius),wheel.getPolarY(ang,radius));
			ctx.lineTo(wheel.getPolarX(ang,dim.signRadius),wheel.getPolarY(ang,dim.signRadius));
			ctx.stroke();
		}
		ctx.restore();
	}

	function houseLines(wheel,data,config,colors) {
		var dim = wheel.dimensions();
		dim = dim.circles;
		var aspects = showAspects(data);
		doHouseLines(wheel,data,config,colors,aspects==true?dim.aspectRadius:0);
	}
	
	function biwheelHouseLines(wheel,data,config,colors) {
		doHouseLines(wheel,data,config,colors,0);
	}
	
	function houseDegrees(wheel,data,config,colors) {
		var dim = wheel.dimensions();
		dim = dim.circles;
		var ctx = wheel.context();
		ctx.save();
		ctx.fillStyle=colors.house;
		ctx.translate(dim.xPolarOrigin,dim.yPolarOrigin);
		var thedata = getWheelData(data,config);
		var angles = thedata.splitHousecusps;
		ctx.font=formatFont(config.glyphFont,wheel.getFontSize(14),'400');
		var rad=dim.outerRadius+12;
		for (var i = 0; i < 12; i++) {
			var x = wheel.getPolarX(angles[i].adjustedMin,rad);
			var y = wheel.getPolarY(angles[i].adjustedMin,rad);
			if (x < 0) {
				ctx.textAlign="right";
			}
			else {
				ctx.textAlign="left";
			}
			if (y > 0) {
				ctx.textBaseline="bottom";
			}
			else {
				ctx.textBaseline="top";
			}
			ctx.fillText(angles[i].formatted,x,y);
		}
		ctx.restore();
	}
	
	
    function doHouseNumbers(wheel,data,config,colors,rad) {
    	var dim = wheel.dimensions();
		dim = dim.circles;
		var ctx = wheel.context();
		ctx.save();
		ctx.translate(dim.xPolarOrigin,dim.yPolarOrigin);
		ctx.strokeStyle=colors.house;
		ctx.fillStyle=colors.house;
		ctx.font=formatFont(config.textFont,wheel.getFontSize(13));
		ctx.textAlign="center";
		ctx.textBaseline="alphabetic";
		var thedata = getWheelData(data,config);
		var ary = thedata.houseMidpoints;
		
		for (var i =0; i < 12; i++) {
			var y = wheel.getPolarY(ary[i],rad);
			y+=6;
			var num = i+1;
			ctx.fillText(num.toString(),wheel.getPolarX(ary[i], rad),y);
		}
		ctx.restore();
    }
	
    function houseNumbers(wheel,data,config,colors) {
    	var dim = wheel.dimensions();
		dim = dim.circles;
		var aspects = showAspects(data);
		var rad = aspects==true?(dim.aspectRadius+12):75;
    	doHouseNumbers(wheel,data,config,colors,rad);
    }
    
    function biwheelHouseNumbers(wheel,data,config,colors) {
    	var dim = wheel.dimensions();
		dim = dim.circles;
    	doHouseNumbers(wheel,data,config,colors,75);
    }
    
    function doDatalist(wheel,data,config,colors,title,rightoff,natal) {
    	var ctx = wheel.context();
		ctx.save();
		var dim = wheel.dimensions();
		var incr = wheel.getScaledSize(20);
		ctx.translate(dim.width-rightoff,incr);
		ctx.font=formatFont(config.textFont,wheel.getFontSize(12));
		ctx.fillStyle=colors.lines;
		var thedata = natal==true?data.natal:data.other;
		var ary = thedata.splitMinutes;
		ctx.fillText(title,0,0);
		ctx.font=formatFont(config.glyphFont,wheel.getFontSize(16),'400');
		var ofs = wheel.getScaledSize(30);
		for (var i = 0; i < thedata.maxpt; i++) {
			if (thedata.splitMinutes[i].skip==true) {
				continue;
			}
			ctx.fillText(wheel.getPlanet(i,config.glyphs),0,(i+1)*incr);
			ctx.fillText(ary[i].formatted,ofs,(i+1)*incr);
		}
		ctx.restore();
		
    }
    
    function datalist(wheel,data,config,colors) {
    	doDatalist(wheel,data,config,colors,data.natal.name1,wheel.getScaledSize(110),true);
    }
	
    function biwheelDatalist(wheel,data,config,colors) {
    	doDatalist(wheel,data,config,colors,data.natal.name1,wheel.getScaledSize(220),true);
    	var title = data.natal.name2;
    	if (title=='') {
    		title = data.strType;
    	}
    	doDatalist(wheel,data,config,colors,title,wheel.getScaledSize(110),false);
    }
    
	function titles(wheel,data,config,colors) {
		var ctx = wheel.context();
		ctx.save();
		ctx.translate(wheel.getScaledSize(12),wheel.getScaledSize(20));
		var thedata = getWheelData(data,config);
		ctx.font=formatFont(config.textFont,wheel.getFontSize(14),'bold');
		ctx.fillStyle=colors.ascend;
		var incr = wheel.getScaledSize(18);
		ctx.fillText(data.strType.toUpperCase() + " HOROSCOPE", 0,0);
		ctx.fillStyle=colors.house;
		ctx.fillText("Name: " + thedata.name1, 0,incr);
		ctx.font=formatFont(config.textFont,wheel.getFontSize(13));
		ctx.fillStyle=colors.planet;
		var y = incr*2;
		ctx.fillText("Birth Date: " + thedata.date1, 0,y);
		y+= incr;
		ctx.fillText("Time: " + thedata.time1, 0,y);
		y+= incr;
		switch (data.strType) {
		case "Natal":
			ctx.fillText("Location: " + thedata.name2, 0,y);
			y+= incr;
			ctx.fillText("Longitude: " + thedata.date2, 0,y);
			y+= incr;
			ctx.fillText("Latitude: " + thedata.time2, 0,y);
			break;
		case "Compatability":
		case "Composite":
			ctx.font=formatFont(config.textFont,wheel.getFontSize(14),'bold');
			ctx.fillStyle=colors.house;
			ctx.fillText("Name: " + thedata.name2, 0,y);
			ctx.fillStyle=colors.planet;
			ctx.font=formatFont(config.textFont,wheel.getFontSize(13));
			y+= incr;
			ctx.fillText("Birth Date: " + thedata.date2, 0,y);
			y+= incr;
			ctx.fillText("Time: " + thedata.time2, 0,y);
			break;
		case "Transits":
			ctx.fillText("Event: " + thedata.name2, 0,y);
			y+= incr;
			ctx.fillText("Event Date: " + thedata.date2, 0,y);
			y+= incr;
			ctx.fillText("Event Time: " + thedata.time2, 0,y);
			break;
		case "Relocation" :
			break;
		case "Harmonic" :
			ctx.fillText("Harmonic: " + thedata.date2, 0,y);
			break;
		case "Solar Arc" :
		case "Progressed":
			ctx.fillText("Offset: " + thedata.date2, 0,y);
			break;
		}
		
		y+= incr;
		ctx.fillText(thedata.tropside, 0,y);
		y+= incr;
		ctx.fillText(thedata.houseproc, 0,y);
		ctx.restore();
	}

	function legend(wheel,data,config,colors) {
       var aColors = new Array(colors.sign,colors.house,colors.planet,colors.ascend);
       var labels = new Array("Signs/Hard Aspects","Houses","Planets","Ascendant/Soft Aspects");
       var dim = wheel.dimensions();
       var ctx = wheel.context();
		ctx.save();
		var incr = wheel.getScaledSize(18);
		ctx.translate(10,dim.height-(incr*6));
		ctx.font=formatFont(config.textFont,wheel.getFontSize(14),'bold');
		ctx.fillStyle=colors.lines;
		
		var ht=incr;
		var y = incr;
		ctx.textBaseline="top";
		ctx.fillText("Color Key:",0,0);
		ctx.font=formatFont(config.textFont,wheel.getFontSize(14));
		for ( var i = 0; i < aColors.length; i++, y+= incr) {
			ctx.fillStyle= aColors[i];
			ctx.fillRect(0,y,incr,incr);
			ctx.fillStyle=colors.lines;
			ctx.fillText(labels[i],incr+5,y);
		}
		ctx.restore();
	}

	
	function doPlotMinutes(wheel,ctx,theradius,data,maxpt,config,colors,diff) {
		ctx.textBaseline="top";
		ctx.font=formatFont(config.glyphFont,wheel.getFontSize(30));
		ctx.fillStyle=colors.planet;
		ctx.textAlign="center";
		var ary=new Array();
		for (var i = 0; i < maxpt; i++) {
			ary.push({planet:i, min: data.splitMinutes[i].adjustedMin, pos:0, skip:data.splitMinutes[i].skip });
		}
		ary.sort(function(a,b) { return a.min-b.min;});
		for (var i = 0; i < maxpt; i++) {
			if (i > 0 && ary[i].skip==false && (ary[i].min-ary[i-1].min) < diff ) {
				ary[i].pos = ary[i-1].pos+1;
			}
		}
		
		var radius = theradius - wheel.getScaledSize(25);
		ctx.textAlign="center";
		ctx.textBaseline="middle";
		var step = wheel.getScaledSize(30);
		for (var i =0; i < maxpt; i++) {
			if (ary[i].skip==true) {
				continue;
			}
			var min = ary[i].min;
			//console.log(i);
			var rad = radius - (step * ary[i].pos);
			//console.log(rad);
			var y = wheel.getPolarY(min,rad);
			var x = wheel.getPolarX(min, rad);
			y-=step;
			if (ary[i].planet ==0) {
				ctx.fillStyle=colors.ascend;
			}
			else {
				ctx.fillStyle=colors.planet;
			}
			ctx.fillText(wheel.getPlanet(ary[i].planet,config.glyphs),x,y);
		}
	}
	
	
	function plotNatalMinutes(wheel,data,config,colors) {
		var dim = wheel.dimensions();
		dim = dim.circles;
		var ctx = wheel.context();
		ctx.save();
		var thedata = getWheelData(data,config);
		ctx.translate(dim.xPolarOrigin,dim.yPolarOrigin);
		doPlotMinutes(wheel,ctx,dim.signRadius-wheel.getScaledSize(15),thedata,data.maxpt,config,colors,600);
		ctx.restore();
	}
	
	function plotBiwheelMinutes(wheel,data,config,colors) {
		var dim = wheel.dimensions();
		dim = dim.circles;
		var ctx = wheel.context();
		ctx.save();
		var thedata = getWheelData(data,config);
		var other = getOtherWheelData(data,config);
		ctx.translate(dim.xPolarOrigin,dim.yPolarOrigin);
		doPlotMinutes(wheel,ctx,dim.signRadius-wheel.getScaledSize(15),thedata,data.maxpt,config,colors,600);
		doPlotMinutes(wheel,ctx,dim.innerRadius,other,data.maxpt,config,colors,1200);
		ctx.restore();
	}
	
	function aspects(wheel,data,config,colors) {
		var dim = wheel.dimensions();
		dim = dim.circles;
		var ctx = wheel.context();
		ctx.save();
		ctx.lineWidth = 1.0;
		var hard = new Array(0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0);
		var thedata = getWheelData(data,config);
		var pts = thedata.aspects;
		var asc = thedata.housecusps[0];
		ctx.translate(dim.xPolarOrigin,dim.yPolarOrigin);
		var max = 360*60;
		for (var i = 0; i < pts.length; i++) {
			var aspect = pts[i];
			aspect.aspect = hard[aspect.aspect];
			if (aspect.aspect ==1) {
				ctx.strokeStyle=colors.sign;
			}
			else {
				ctx.strokeStyle=colors.planet;
			}
			if (aspect.first >= max) {
				aspect.first -= max;
			}
			aspect.first = asc - aspect.first;
			if (aspect.first < 0) {
				aspect.first += __360DEGREES;
			}
			aspect.second = asc - aspect.second;
			if (aspect.second < 0) {
				aspect.second += __360DEGREES;
			}
			ctx.beginPath();
			ctx.moveTo(wheel.getPolarX(aspect.first,dim.aspectRadius),wheel.getPolarY(aspect.first,dim.aspectRadius));
			ctx.lineTo(wheel.getPolarX(aspect.second,dim.aspectRadius),wheel.getPolarY(aspect.second,dim.aspectRadius));
			ctx.stroke();
		}
		ctx.restore();
	}

	

	window.cjnoyessw.drawables = window.cjnoyessw.drawables || {
		
		getDrawables: function(type) {
			switch (type) {
			case 'Natal' :
			case 'Relocation':
			case 'Numeric':
			case 'Composite':
				return new Array(background,natalCircles,signLines,houseLines,legend,titles,houseNumbers,aspects,signCircle,datalist,houseDegrees,plotNatalMinutes);
				break;
			default:
				return new Array(background,biwheelCircles,biwheelSignLines,biwheelHouseLines,legend,titles,biwheelHouseNumbers,signCircle,biwheelDatalist,houseDegrees,plotBiwheelMinutes);
				break;
			}
		}


	};

/**
 * 
 */



var signText = new Array("ARI","TAU","GEM","CAN","LEO","VIR","LIB","SCO","SAG","CAP","AQU","PIS");	
var planText = new Array("AS", "SU", "MO", "ME", "VE", "MA", "JU", "SA", "UR",
		 "NE", "PL", "NN", "SN", "MC", "IC", "PF", "VT", "EP",
		 "CR", "PA", "JN", "VS", "CN");
var planGlyph = new Array("\xa1","\xa2","\xa3","\xa4","\xa5","\xa6","\xa7","\xa8","\xa9","\xaa","\xab","\xac","\xad","\xae","\xaf","\xb0","\xb1","\xb2","\xb3","\xb4","\xb5","\xb6","\xb7","\xb8","\xb9");
var signGlyph = new Array("\xb8","\xb9","\xba","\xbb","\xbc","\xbd","\xbe","\xbf", "\xc0","\xc1","\xc2","\xc3","\xc4","\xc5","\xc6","\xc7","\xc8");


function minToRads(minutes) {
	var degrees = minutes / 60.0;
	var rads = degrees * (Math.PI / 180.0);
	return rads;
}


window.cjnoyessw.cartwheel = window.cjnoyessw.cartwheel || {
	
 getPolarY: function(minutes,radius) {
		var rads = minToRads(minutes);
		var val = Math.sin(rads) * radius;
		return Math.round(val);
	},

 getPolarX: function(minutes,radius) {
		var rads = minToRads(minutes);
		var val = Math.cos(rads) * radius;
		return -Math.round(val);
	},

 getPlanet: function(index,glyph) {
		if (glyph) {
			return planGlyph[index];
		}
		else {
			return planText[index];
		}
	},

 getSign: function(index,glyph) {
		if (glyph) {
			return signGlyph[index];
		}
		else {
			return signText[index];
		}
	},

  getAspect: function(index) {
	  return signGlyph[index+12];
  },
	
  calcCircles: function(height, width) {
		var obj = new Object();
		obj.orientation = height > width?"portrait":"landscape";
		var small = height>width?width:height;
		var diff = height>width?height-width:width-height;
		obj.outerRadius = Math.floor((small*0.95)/2.0);
		obj.offset = Math.floor(diff * .45);
		var off = Math.floor((small-obj.outerRadius)/2);
		var smallctr = off + (obj.outerRadius/2);
	    if (obj.orientation=="portrait") {
	    	obj.xPolarOrigin = smallctr;
	    	obj.yPolarOrigin = smallctr +obj.offset;
	    }
	    else {
	    	obj.yPolarOrigin = smallctr;
	    	obj.xPolarOrigin = smallctr +obj.offset;
	    }
	    obj.signRadius = obj.outerRadius-25;
	    obj.aspectRadius = Math.floor(obj.outerRadius*.30);
	    obj.innerRadius = Math.floor(obj.outerRadius*.55);
	    var diag = (height * height)+(width * width);
	    var diag = Math.sqrt(diag);
	    obj.fontScale = 1.60 * (diag/1909.0);
		return obj;
	},
		
 getFontSize: function(size) {
	size *= this.__circles.fontScale;
	size = Math.round(size);
	return size + 'px';
 },	

 getScaledSize: function(size) {
		size *= this.__circles.fontScale;
		size = Math.round(size);
		return size;
	 },	

getYScaled: function(size) {
	return Math.round(this.__scaleY * size);
},

getXScaled: function(size) {
	return Math.round(this.__scaleX * size);
},


 init: function(selector) {
   var canvas = $(selector);
   if (canvas.length ==0) {
	   return false;
   }
   var context = canvas[0].getContext("2d");
   context.scale(1.0,1.0);
   this.__context = context;
   this.__canvas = canvas;
   this.__height = canvas.height();
   console.log(this.__height);
   this.__width = canvas.width();
   console.log(this.__width);
   this.__drawables = new Array();
   this.__circles=this.calcCircles(this.__height,this.__width);
   this.__scaleX = this.__width/1720.0;
   this.__scaleY = this.__height/829.0;
   return this;
},

 setDimension : function(height, width) {
	this.__height = height;
	this.__canvas.height(height);
	this.__width = width;
	this.__canvas.width(width);
	this.__circles=this.calcCircles(this.__height,this.__width);
	return this;
},

 addDrawable: function(func) {
	this.__drawables.push(func);
	return this;
},

 addDrawables: function(ary) {
	for (var i = 0; i < ary.length; i++) {
		this.addDrawable(ary[i]);
	}
	return this;
},

 context: function() {
	return this.__context;
},

 dimensions: function() {
	return { height: this.__height,width: this.__width, circles:this.__circles};
},



draw: function(data) {
	this.__context.save();
	var config = window.cjnoyessw.configuration.getConfiguration();
    var colors = window.cjnoyessw.colors.getColors();
	for (var i = 0; i < this.__drawables.length; i++) {
		var fnc = this.__drawables[i];
		fnc(this,data,config,colors);
	}
	this.__context.restore();
}

};
		
window.cjnoyessw.loader = window.cjnoyessw.loader || {


getData : function() {
	return this.__data;
},

getChartHeader : function() {
	return this.__chartHeader;
},

getFileHeader : function() {
	return this.__fileHeader;
},

load : function(source, callback) {
		var hr = $.getJSON(source, function(data) {
			data.data.chartIndex=0;
			window.cjnoyessw.loader.__data = data.data;
			window.cjnoyessw.loader.__chartHeader = data.chartheader;
			window.cjnoyessw.loader.__fileHeader = data.fileheader;
			if (callback != undefined) {
				callback("success");
			}
		}).fail(function() {
			if (callback != undefined) {
				callback("fail");
			}
		});
	}
	
	};

	

}());


