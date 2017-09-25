var main = document.getElementById('main');
var img = document.getElementById('img');

var deal = function(ret){
	if(ret.success && ret.result){
		for(var i = 0; i < ret.result.length; i++){
			var tr = document.createElement('tr');
			for(var j = 0; j < 4; j++){
				console.log(j);
				(function(num){
					var td_ele = document.createElement('td');
					td_ele.setAttribute('id',''+i+num);
					tr.appendChild(td_ele);
				})(j)
				
			}
			main.appendChild(tr);
			
			(function(num){
				document.getElementById(num+'0').innerHTML = ret.result[num].days;
				document.getElementById(num+'1').innerHTML = ret.result[num].week;
				document.getElementById(num+'2').innerHTML = ret.result[num].weather;
				document.getElementById(num+'3').innerHTML = ret.result[num].temperature;
			})(i)
		}
	}
	img.remove();
}

var city = '上海';

function httpRequest(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            callback(xhr.responseText);
        }
    }
    xhr.send();
}

var html;


var Province_city = new Province_city('box','province');

document.getElementById('search').addEventListener('click',function(){
	if(document.getElementsByClassName('city').length){
		var sel_info = '';
		var province_search = document.getElementById('province').value;
		var city_search = document.getElementsByClassName('city')[0].value;
		if(province_search[2] == "市"){
			sel_info = province_search.substr(0,2);
		}else{
			sel_info = city_search.substr(0,city_search.length - 1);
			console.log(sel_info);
		}

		document.getElementById('data_search').remove();
		document.getElementById('data_weather').style.display = 'block';
		var url = 'http://api.k780.com/?app=weather.future&weaid='+sel_info+'&&appkey=28462&sign=c5c8a11cf0e6c4375b7448d8aa2cfffa&format=json';		
		httpRequest(url, function(result){
			html = JSON.parse(result);
			deal(html);
		});
	}
});


//document.getElementsByTagName('head')[0].appendChild(ele);