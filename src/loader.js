		
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

	
