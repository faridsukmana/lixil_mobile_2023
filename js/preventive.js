$(document).ready(function(){ 
	//alert(localStorage.getItem('user'));
	$.ajax({
		type: 'POST',
		url:glo_url+"get_wopmcheck.php",
		dataType: 'JSON',
		crossDomain:true,
		cache:false,
		beforeSend: function(){
			$('#wo_val').text('...');
			$('#pm_val').text('...');
			$('#check_val').text('...');
		},
		success:function(data){
			$('#wo_val').text(data.wo);
			$('#pm_val').text(data.pm);
			$('#check_val').text(data.ck);
		}
		
	})
})

function pagePMHistory(varpass){
	$("#the_head").text("History Preventive Maintenance");
    $("#detail_asset_window").hide();
    $("#addAssetButton").hide();
    $("#backButton").hide();
    $("#searchAssetButton").hide();

    $('#data_content').empty();
	
	//======Mendefinisikan id baru di dalam id data content
	$('#data_content').append('<div id="data_content_option"></div><div id="data_content_append"></div>');
	
	get_full_calender_pm(varpass);
}

function get_full_calender_pm(varpass){ //alert(varpass);
	let today = new Date().toISOString().slice(0, 10);
	$('#data_content_append').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay,listWeek'
		},
		defaultDate: today,
		navLinks: true, // can click day/week names to navigate views
		displayEventTime: false,
		//weekNumbers: true,
		weekNumbersWithinDays: true,
		weekNumberCalculation: 'ISO',
		textColor: 'white',

		editable: true,
		eventLimit: true, 
		height : 500,
		events: {
			type: 'POST',
			url:glo_url+"get_page.php",
			data:{'page':'historyPreventive','assetid':varpass},
			error: function() {
				$('#script-warning').show();
			}
		},
		eventTextColor: 'white',
		eventRender: function(event, element) {
			$(element).find('.fc-time').remove();
		},
		eventClick: function(info) {
			//alert(info.AssetID+' '+info.date);
			$("#data_content").empty();
			var user = localStorage.getItem('user');
			var dataString = {'woid':info.WorkOrderNo, 'username':user, 'userPermit':cek_user()}; 
			 $.ajax({
				type: "POST",
				url:glo_url+"detail_wo.php",
				data:dataString,
				crossDomain:true,
				cache:false,
				beforeSend: function(){
					loading('Please wait...');
				},
				success:function(data){
					closeLoading(); 
					$("#data_content").append(data);
				}
			})
		}
	});
}



