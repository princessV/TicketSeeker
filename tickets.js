var request = require('request');
var queryBaseURL = 'https://kyfw.12306.cn/otn/lcxxcx/query';


getStationCodeByStationName('1');
// ticketsSeeking();


function getStationCodeByStationName(stationName) {
    var options = {
        url: 'https://kyfw.12306.cn/otn/resources/js/framework/station_name.js?station_version=1.8964'
    }

// solve self-signed error
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            
            var nameList = body.toString();

            console.log(nameList);
        } else if (error){
            console.log(error);
        } else {
            console.log('fail to get station code');
        }
    })
}



function ticketsSeeking(queryDate, from_station, to_station) {
    var options = {
        url: queryBaseURL + '?purpose_codes=ADULT&queryDate=' + queryDate + '&from_station=' + from_station + '&to_station=' + to_station
    }


    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var json_body = JSON.parse(body);

            console.log(json_body.data.datas.length);
        } else if (error){
            console.log(error);
        } else {
            console.log('fail');
        }
    });
} 