	function ajaxNeedData(param, resUrl) {
		var needData = null;
		$.ajax({
			type: 'get',
			url: resUrl,
			data: param,
			async:false, 
			dataType: "json",
			success: function(msg) {
				needData = msg;
			},
			error: function(e) {
				console.log('获取数据失败');
			}
		});
		return needData;
	}

	function getAjaxReturnData(atype,param, resUrl) {
		var needData = null;
		$.ajax({
			type: atype,
			url: resUrl,
			data: param,
			async:false, 
			dataType: "json",
			success: function(msg) {
				needData = msg;
			},
			error: function(e) {
				console.log('获取数据失败');
			}
		});
		return needData;
	}
	function ajaxMappingSave(param, resUrl) {
		gd.showLoading('保存中,请稍后…');
		$.ajax({
			//type:'post',
			type: 'get',
			url: resUrl, //ctx+"/report/insertreportname.do?"+csrfName+"="+csrfValue,
			data: param,
			dataType: "json",
			success: function(msg) {
				console.log(msg.flag)
				gd.closeLoading(); //关闭loading
				if(msg.flag == 1) {
					gd.showSuccess('保存成功')
				} else {
					gd.showError('保存失败');
				}
			},
			error: function(e) {
				gd.closeLoading(); //关闭loading
				gd.showError('保存失败');
			}
		});
	}