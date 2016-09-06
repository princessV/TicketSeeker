var request = require('request');
var codeList = require('./stationCode');
var queryBaseURL = 'https://kyfw.12306.cn/otn/lcxxcx/query';



ticketsSeeking('2016-09-10', 'shanghai', 'beijing');


function getStationCodeByStationName(stationName) {
    var code = codeList.codesAndNames.match('\\|([A-Z]*)\\|' + stationName)[1];
    console.log(code)
}



function ticketsSeeking(queryDate, from_station, to_station) {

    var fsCode = codeList.codesAndNames.match('\\|([A-Z]*)\\|' + from_station)[1];
    var tsCode = codeList.codesAndNames.match('\\|([A-Z]*)\\|' + to_station)[1];

    var options = {
        url: queryBaseURL + '?purpose_codes=ADULT&queryDate=' + queryDate + '&from_station=' + fsCode + '&to_station=' + tsCode
    }


    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var json_body = JSON.parse(body);

            console.log(json_body.data.datas);
        } else if (error){
            console.log(error);
        } else {
            console.log('fail');
        }
    });
} 