/**
 * 
 * @param {Object} map     地图
 * @param {Object} longitude 经度
 * @param {Object} latitude	纬度
 * @param {Object} content  内容
 */
function drawPoint(map, longitude, latitude, content) {
	map.centerAndZoom(new BMap.Point(longitude, latitude), 14); // 初始化地图,设置中心点坐标和地图级别
	//map.addControl(new BMap.MapTypeControl()); //添加地图类型控件 离线只支持电子地图，卫星/三维不支持
	//map.setCurrentCity(“北京”); // 设置地图显示的城市 离线地图不支持！！
	map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
	map.addControl(new BMap.NavigationControl()); //缩放按钮
	map.clearOverlays();
	var new_point = new BMap.Point(longitude, latitude);
	var marker = new BMap.Marker(new_point); // 创建标注
	if(null != content && "" != content) {
		marker.setLabel(setLabelStyle(content));
	}
	map.addOverlay(marker); // 将标注添加到地图中
	map.panTo(new_point);

}
/**
 * 使用默认图标标注
 * 重新描点且控制是否移动中心点
 * @param {Object} map
 * @param {Object} longitude
 * @param {Object} latitude
 * @param {Object} content
 * @param {Object} paneFlag  是否移动地图使得所画点位于中心点
 */
function drawPointWithNoPane(map, longitude, latitude, content, paneFlag) {
	map.clearOverlays(); //清除其他的标注点
	var new_point = new BMap.Point(longitude, latitude);
	var marker = new BMap.Marker(new_point); // 创建标注

	if(null != content && "" != content) {
		marker.setLabel(setLabelStyle(content));
	}
	map.addOverlay(marker); // 将标注添加到地图中
	if(paneFlag) {
		map.panTo(new_point);
	}
}
/**
 * 
 * @param {Object} map
 * @param {Object} node
 * longitude, latitude,content,iconType
 */
function drawIconPoint(map, node) {
	console.log("drawIconPoint")
	if(null != node) {
		var new_point = new BMap.Point(node.longitude, node.latitude);
		var imgSizew = 28;
		var imgSizeh = 28;
		if("" != node.label && undefined != node.label) {
			imgSizew = 50;
			imgSizeh = 90;
		}
		//var pointIcon = new BMap.Icon("http://lbsyun.baidu.com/jsdemo/img/fox.gif", new BMap.Size(300,157));
		var pointIcon = new BMap.Icon(node.iconPath, new BMap.Size(imgSizew, imgSizeh));
		// 创建标注
		var marker = new BMap.Marker(new_point, {
			icon: pointIcon
		});
		//创建提示语
		if("" != node.title && undefined != node.title) {
			marker.setTitle(node.title);
		}
		//创建标签
		if("" != node.label && undefined != node.label) {
			marker.setLabel(setLabelStyle(node.label));
		}
		map.addOverlay(marker); // 将标注添加到地图中
	}

}
/**
 * 设置标签的样式--固定宽度换行
 * @param {Object} content
 */
function setLabelStyle(content) {
	var offsetSize = new BMap.Size(0, 0);
	var labelStyle = {
		color: "#fff",
		backgroundColor: "#333333",
		border: "0",
		fontSize: "14px",
		width: "200px",
		opacity: "0.8",
		verticalAlign: "center",
		borderRadius: "2px",
		whiteSpace: "normal",
		wordWrap: "break-word",
		padding: "7px",
	};

	var spanA = "<span class='angle'><span>"
	//不同数字长度需要设置不同的样式。
	var num = parseInt(content.length / 10)
	switch(num) {
		case 0:
			offsetSize = new BMap.Size(-20, -40);
			break;
		case 1:
			offsetSize = new BMap.Size(-20, -40);
			break;
		case 2:
			offsetSize = new BMap.Size(-20, -60);
			break;
		case 3:
			offsetSize = new BMap.Size(-20, -80);
			break;
		default:
			break;
	}

	var label = new BMap.Label(content + spanA, {
		offset: offsetSize
	});
	label.setStyle(labelStyle);
	return label;
}
/**
 * 自适应长度
 * @param {Object} content
 */
function setLabelAutoStyle(content) {
	var offsetSize = new BMap.Size(0, 0);
	//自适应不换行样式
	var labelStyle = {
		color: "#fff",
		backgroundColor: "#333333",
		border: "0",
		fontSize: "14px",
		minWidth: "100px",
		whiteSpace: "nowrap",
		opacity: "0.8",
		verticalAlign: "center",
		borderRadius: "2px",
		padding: "7px",
	};
	var spanA = "<span class='angle'><span>"
	offsetSize = new BMap.Size(-20, -40);
	var label = new BMap.Label(content + spanA, {
		offset: offsetSize
	});
	label.setStyle(labelStyle);
	return label;
}
/**
 * 添加覆盖物
 * @param {Object} map
 * @param {Object} point
 * @param {Object} num			半径
 * @param {Object} opacity
 */
function addCirclePane(map, point, num, opacity) {
	//单位m
	var circle = new BMap.Circle(point, parseInt(num), {
		fillColor: "#52bad7", //填充颜色。当参数为空时，圆形将没有填充效果。
		strokeColor: "#000000", //设置边的颜色
		strokeStyle: "dashed", //设置边的样式
		strokeWeight: 1, //边线的宽度，以像素为单位。
		fillOpacity: opacity, //填充的透明度，取值范围0 - 1。
		strokeOpacity: 0 //边的透明度
	});
	map.addOverlay(circle); //增加圆

	function showOver() {
		circle.show();
	}

	function hideOver() {
		circle.hide();
	}
	return circle;
}
/**
 * 添加比例尺控件
 * @param {Object} map
 */
function addScaleController(map) {
	var top_left_control = new BMap.ScaleControl({
		anchor: BMAP_ANCHOR_TOP_LEFT
	}); // 左上角，添加比例尺
	map.addControl(top_left_control);
}
/**
 * 单位km
 * @param {Object} number
 */
function getRadiusOfCircle(number) {
	var num = parseInt(number)
	return num * 1000
}
/**
 * 弹出框
 * @param {Object} map
 * @param {Object} longitude
 * @param {Object} latitude
 * @param {Object} info
 */
function mapInfo(map, longitude, latitude, info) {
	var infoOption = {
		width: 100, // 信息窗口宽度
		height: 50, // 信息窗口高度
		title: info, // 信息窗口标题
	}
	var infoWindow = new BMap.InfoWindow("", infoOption); // 创建信息窗口对象 
	var new_point = new BMap.Point(longitude, latitude);
	map.openInfoWindow(infoWindow, new_point); //开启信息窗口
}
// 用经纬度设置地图中心点
function getClickLocation(map, longitude, latitude, content) {
	drawPoint(map, longitude, latitude, content);
	return map;
}

function jw_arr_push(dealer_arr) {
	var arr = [];
	for(var i = 0; i < dealer_arr.length; i++) {
		arr.push({
			jd: dealer_arr[i].gpsx,
			wd: dealer_arr[i].gpsy
		})
	}
	return arr;
}

function baiduMap_all_view(city_jw_arr) {
	map = new BMap.Map("map_demo", {
		enableMapClick: false,
		vectorMapLevel: 99,
		minZoom: 3,
		maxZoom: 17
	});
	var points = new Array;

	function SquareOverlay(center, length, icon, url) {
		this._center = center;
		this._length = length;
		this._icon = icon;
		this._url = url
	}
	SquareOverlay.prototype = new BMap.Overlay;
	SquareOverlay.prototype.initialize = function(map) {
		this._map = map;
		var div = document.createElement("div");
		div.setAttribute("data-url", this._url);
		div.innerHTML = "<img src=" + this._icon + ' width="25" height="40">';
		div.style.position = "absolute";
		div.style.width = "79px";
		div.style.height = "50px";
		div.style.cursor = "pointer";
		map.getPanes().markerPane.appendChild(div);
		this._div = div;
		return div
	};
	SquareOverlay.prototype.draw = function() {
		var position = this._map.pointToOverlayPixel(this._center);
		this._div.style.left = position.x - this._length / 2 + "px";
		this._div.style.top = position.y - this._length / 2 + "px"
	};
	city_jw_arr.forEach(function(elem, index) {
		points[index] = new BMap.Point(elem.jd, elem.wd);
		if(elem.jd > 0 && elem.wd > 0) {
			map.centerAndZoom(new BMap.Point(elem.jd, elem.wd), 11);
			map.enableScrollWheelZoom();
			var icon = "https://js.xcar.com.cn/search/images/" + (index + 1) + "-1.png";
			var mySquare = new SquareOverlay(map.getCenter(), 25, icon, elem.url);
			map.addOverlay(mySquare);
		}
	});
	var top_left_control = new BMap.ScaleControl({
		anchor: BMAP_ANCHOR_BOTTOM_LEFT
	});
	var top_left_navigation = new BMap.NavigationControl({
		anchor: BMAP_ANCHOR_TOP_LEFT
	});
	map.addControl(top_left_control);
	map.addControl(top_left_navigation);
	map.setViewport(points);
}
/**
 * 添加全屏控件
 * @param {Object} map
 * @param {Object} clickFunction
 */
function addFullScreen(map, clickFunction) {

	// 定义一个控件类,即function
	function ZoomControl() {
		// 默认停靠位置和偏移量
		this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
		this.defaultOffset = new BMap.Size(10, 10);
	}

	// 通过JavaScript的prototype属性继承于BMap.Control
	ZoomControl.prototype = new BMap.Control();

	// 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
	// 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
	ZoomControl.prototype.initialize = function(map) {
		// 创建一个DOM元素
		var div = document.createElement("div");
		// 添加文字说明
		div.innerHTML = "<span class='big'>全屏</span>";
		// 设置样式
		div.style.cursor = "pointer";
		div.style.border = "1px solid gray";
		div.style.backgroundColor = "white";
		div.style.backgroundImg = "white";
		// 绑定事件,点击一次放大两级
		div.onclick = function(e) {
			if(clickFunction && typeof clickFunction == 'function') {
				clickFunction();
			} else if(clickFunction && typeof clickFunction == 'string') {
				try {
					var func = eval(clickFunction);
					new func();
				} catch(err) {
					console.log(err)
				}
			} else {
				console.log("err")
			}

		}
		// 添加DOM元素到地图中
		map.getContainer().appendChild(div);
		// 将DOM元素返回
		return div;
	}
	// 创建控件
	var myZoomCtrl = new ZoomControl();
	// 添加到地图当中
	map.addControl(myZoomCtrl);
}