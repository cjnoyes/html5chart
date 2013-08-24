

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

