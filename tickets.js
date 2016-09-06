var request = require('request');
var color = require('colors')
var codeList = require('./stationCode');

var queryBaseURL = 'https://kyfw.12306.cn/otn/lcxxcx/query';



ticketsSeeking('2016-09-10', 'nanjing', 'yangzhou');




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
            var info = json_body.data.datas;

// 开始输出
            console.log('-------------------------------------------------------------------------------------'.green);

            console.log('车次\t始发\t到站\t历时\t一等座\t二等座\t软卧\t硬卧\t软座\t硬座\t无座'.magenta);
            console.log('-------------------------------------------------------------------------------------'.green);

            info.forEach(function(element) {
                console.log(element.station_train_code.red + '\t' + element.start_time.cyan + '\t' + element.arrive_time.cyan + '\t' + element.lishi.yellow + '\t' + element.zy_num.white + '\t' + element.ze_num.white + '\t' + element.rw_num.white + '\t' + element.yw_num.white + '\t' + element.rz_num.white + '\t' + element.yz_num.white + '\t' + element.wz_num.white)

                console.log('-------------------------------------------------------------------------------------'.green);

            }, this);

        } else if (error){
            console.log(error);
        } else {
            console.log('fail');
        }
    });
} 