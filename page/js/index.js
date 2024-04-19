$(document).ready(function () {
    // 定义定时器，每隔一段时间自动发送Ajax请求
    setInterval(function () {
        $.ajax({
            url: '/time', // 向该URL发送Ajax请求以获取新的数据
            type: 'GET', // 请求类型为GET
            success: function (data) {
                // console.log(data);
                $('#time_diff').text('' + data.time_diff);
                $('#formatSecond').text('' + data.formatSecond);
            },
            error: function () {
                alert('An error occurred while fetching data.');
            }
        });
    }, 200); // 200毫秒（即0.2秒）执行一次Ajax请求
});