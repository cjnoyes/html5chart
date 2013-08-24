
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

