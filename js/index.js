$(function() {
	init();
})

function init() {
	var response = ajaxNeedData({}, "/BaiduSDK/data/pointJson.json")
	console.log(response)
	var pointList = null;
	var rlarge = 0;
	var rsmall = 0;
	if(null != response) {
		pointList = response.data;
		rlarge = response.total
		rsmall = response.rows
	} else {
		pointList = [];
	}
	var one = {};
	one.lon = 113.66979288042;
	one.lat = 34.7597156749347;
	one.lable = "郑州银行(民主路支行)"
	one.type = "financial";

	var centerPoint = new BMap.Point(one.lon, one.lat);
	if(null != pointList && pointList.length > 0) {
		var onebean = pointList[0];
		centerPoint = new BMap.Point(onebean.lon, onebean.lat);
	}

	//百度地图API功能
	var map = new BMap.Map("map_demo", {
		enableMapClick: false,
		vectorMapLevel: 99,
		minZoom: 8,
		maxZoom: 18
	});
	var mapLevel = 16;
	map.centerAndZoom(centerPoint, mapLevel); // 初始化地图,设置中心点坐标和地图级别
	map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

	addScaleController(map);
	//批量插入点以及坐标
	var nodeListA = pointList.splice(0, 60)
	drawPointList(map, nodeListA);
	addFullScreen(map, "clickFullScreen");
	addCirclePane(map, centerPoint, rlarge, 0.2)
	addCirclePane(map, centerPoint, rsmall, 0.6)

}

function drawPointList(map, nodeList) {
	if(null != nodeList && nodeList.length > 0) {

		for(var i in nodeList) {
			var one = nodeList[i];
			var node = {};
			node.longitude = one.lon;
			node.latitude = one.lat;
			node.label = one.label;
			node.title = one.name;
			var typeName = one.type;
			if(null != one.label && one.label != "" && one.label != undefined) {
				typeName = "center"
			}
			node.iconPath = "/BaiduSDK/img/mappoint/" + changeTypeToImg(typeName) + ".png"
			drawIconPoint(map, node)
		}
	}
}

function changeTypeToImg(type) {
	var imgName = "map_education"
	if(type == "financial") {
		imgName = "map_financial"
	} else if(type == "government") {
		imgName = "map_government"
	} else if(type == "police") {
		imgName = "map_police"
	} else if(type == "traffic") {
		imgName = "map_traffic"
	} else if(type == "medical") {
		imgName = "map_medical"
	} else if(type == "center") {
		imgName = "center_position"
	} else if(type == "equipment") {
		imgName = "map_equipment"
	}
	return imgName;
}

function clickFullScreen() {

	if($("#map_demo").hasClass("fullscreen")) {
		$("#map_demo").removeClass("fullscreen")
		$("#app").css("overflow", "auto");
		$("#map_demo").css("left", "0");
		$("#map_demo").css("height", "262px");
		$("#map_demo").css("z-index", "555");

	} else { //
		$("#map_demo").addClass("fullscreen")
		$("#map_demo").css("height", "100%");
		$("#map_demo").css("top", "0px");
		$("#map_demo").css("margin-bottom", "0px");
		$("#map_demo").css("z-index", "555");
		$("#app").css("overflow", "hidden");
	}

	//map.setZoom(map.getZoom() + 2);

}