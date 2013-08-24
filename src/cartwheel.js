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
