var main = document.getElementById('main');
var img = document.getElementById('img');

var deal = function(ret){
	console.log(ret);
	if(ret.success){
		console.log('00000');
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
var url = 'http://api.k780.com/?app=weather.future&weaid='+city+'&&appkey=28462&sign=c5c8a11cf0e6c4375b7448d8aa2cfffa&format=json';

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
httpRequest(url, function(result){
    html = JSON.parse(result);
	deal(html);
});



//document.getElementsByTagName('head')[0].appendChild(ele);