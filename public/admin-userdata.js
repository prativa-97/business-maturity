var user=[];
var p2p=[0,0,0,0,0];
var o2c=[0,0,0,0,0];
var h2r=[0,0,0,0,0];
window.onload = function () {

    $.getJSON('allusers/data/:id', function( data ) {
    var url = window.location.href;
    var id = url.substring(url.lastIndexOf('/') + 1);
    for(var i in data) {
        if(data[i]._id == id){
            user[0]=data[i];
        }
    }
    console.log(user);
    $.getJSON('http://localhost:3000/assessment/results/allusers/data', function(allusers) {
        console.log(allusers);
        for (var i = 0; i < allusers.length; i++) {
            p2p[0] = p2p[0] + allusers[i].p2p.purchasesection;
            p2p[1] = p2p[1] + allusers[i].p2p.vendoranalysis;
            p2p[2] = p2p[2] + allusers[i].p2p.erpsection;
            p2p[3] = p2p[3] + allusers[i].p2p.finances;
            p2p[4] = p2p[4] + allusers[i].p2p.score;
        }
        p2p[0]=p2p[0]/allusers.length;
        p2p[1]=p2p[1]/allusers.length;
        p2p[2]=p2p[2]/allusers.length;
        p2p[3]=p2p[3]/allusers.length;
        p2p[4]=p2p[4]/allusers.length;
        console.log(p2p);

        for (var i = 0; i < allusers.length; i++) {
            o2c[0] = o2c[0] + allusers[i].o2c.billing;
            o2c[1] = o2c[1] + allusers[i].o2c.cashapplication;
            o2c[2] = o2c[2] + allusers[i].o2c.creditanalysis;
            o2c[3] = o2c[3] + allusers[i].o2c.glposting;
            o2c[4] = o2c[4] + allusers[i].o2c.score;
        }
        o2c[0]=o2c[0]/allusers.length;
        o2c[1]=o2c[1]/allusers.length;
        o2c[2]=o2c[2]/allusers.length;
        o2c[3]=o2c[3]/allusers.length;
        o2c[4]=o2c[4]/allusers.length;
        console.log(o2c);

        for (var i = 0; i < allusers.length; i++) {
            h2r[0] = h2r[0] + allusers[i].h2r.hiring;
            h2r[1] = h2r[1] + allusers[i].h2r.employeemanagement;
            h2r[2] = h2r[2] + allusers[i].h2r.payroll;
            h2r[3] = h2r[3] + allusers[i].h2r.retire;
            h2r[4] = h2r[4] + allusers[i].h2r.score;
        }
        h2r[0]=h2r[0]/allusers.length;
        h2r[1]=h2r[1]/allusers.length;
        h2r[2]=h2r[2]/allusers.length;
        h2r[3]=h2r[3]/allusers.length;
        h2r[4]=h2r[4]/allusers.length;
        console.log(h2r);
            //ProcureToPay        
                var chart = new CanvasJS.Chart("chartContainer", {
                    animationEnabled: true,
                    title:{
                        text: "Procure To Pay"
                    },  
                    axisY: {
                        title: "Maturity",
                        titleFontColor: "#4F81BC",
                        lineColor: "#4F81BC",
                        labelFontColor: "#4F81BC",
                        tickColor: "#4F81BC"
                    },
                    axisY2: {
                        title: "Average",
                        titleFontColor: "#C0504E",
                        lineColor: "#C0504E",
                        labelFontColor: "#C0504E",
                        tickColor: "#C0504E"
                    },  
                    toolTip: {
                        shared: true
                    },
                    legend: {
                        cursor:"pointer",
                        itemclick: toggleDataSeries1
                    },
                    data: [{
                        type: "column",
                        name: "Maturity",
                        legendText: "Maturity",
                        showInLegend: true, 
                        dataPoints:[
                            { label: "Purchase Section", y: user[0].p2p.purchasesection },
                            { label: "Vendor Analysis", y: user[0].p2p.vendoranalysis },
                            { label: "Finances", y: user[0].p2p.finances },
                            { label: "ERP Section", y: user[0].p2p.erpsection }
                        ]
                    },
                    {
                        type: "column", 
                        name: "Average",
                        legendText: "Average",
                        axisYType: "secondary",
                        showInLegend: true,
                        dataPoints:[
                            { label: "Purchase Section", y: p2p[0] },
                            { label: "Vendor Analysis", y: p2p[1] },
                            { label: "Finances", y: p2p[3] },
                            { label: "ERP Section", y: p2p[2] }
                        ]
                    }]
                });
                chart.render();
                function toggleDataSeries1(e) {
                    if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                        e.dataSeries.visible = false;
                    }
                    else {
                        e.dataSeries.visible = true;
                    }
                    chart.render();
                }


//OrderToCash
                    var chart2 = new CanvasJS.Chart("chartContainer2", {
                    animationEnabled: true,
                    title:{
                        text: "Order To Cash"
                    },  
                    axisY: {
                        title: "Maturity",
                        titleFontColor: "#F79E4F",
                        lineColor: "#F79E4F",
                        labelFontColor: "#F79E4F",
                        tickColor: "#F79E4F"
                    },
                    axisY2: {
                        title: "Average",
                        titleFontColor: "#4FA8F7",
                        lineColor: "#4FA8F7",
                        labelFontColor: "#4FA8F7",
                        tickColor: "#4FA8F7"
                    },  
                    toolTip: {
                        shared: true
                    },
                    legend: {
                        cursor:"pointer",
                        itemclick: toggleDataSeries2
                    },
                    data: [{
                        type: "column",
                        name: "Maturity",
                        legendText: "Maturity",
                        color: "#F79E4F",
                        showInLegend: true, 
                        dataPoints:[
                            { label: "Billing", y: user[0].o2c.billing },
                            { label: "Cash Application & Collection", y: user[0].o2c.cashapplication },
                            { label: "Credit Analysis", y: user[0].o2c.creditanalysis },
                            { label: "GL Posting & Reporting", y: user[0].o2c.glposting }
                        ]
                    },
                    {
                        type: "column", 
                        name: "Average",
                        legendText: "Average",
                        color:"#4FA8F7",
                        axisYType: "secondary",
                        showInLegend: true,
                        dataPoints:[
                            { label: "Billing", y: o2c[0] },
                            { label: "Cash Application & Collection", y: o2c[1] },
                            { label: "Credit Analysis", y: o2c[2] },
                            { label: "GL Posting & Reporting", y: o2c[3] }
                        ]
                    }]
                });
                chart2.render();


                function toggleDataSeries2(e) {
                    if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                        e.dataSeries.visible = false;
                    }
                    else {
                        e.dataSeries.visible = true;
                    }
                    chart2.render();
                }

//Hire To Retire
                    var chart3 = new CanvasJS.Chart("chartContainer3", {
                    animationEnabled: true,
                    title:{
                        text: "Hire To Retire"
                    },  
                    axisY: {
                        title: "Maturity",
                        titleFontColor: "#7d46c2",
                        lineColor: "#7d46c2",
                        labelFontColor: "#7d46c2",
                        tickColor: "#7d46c2"
                    },
                    axisY2: {
                        title: "Average",
                        titleFontColor: "#8bc246",
                        lineColor: "#8bc246",
                        labelFontColor: "#8bc246",
                        tickColor: "#8bc246"
                    },  
                    toolTip: {
                        shared: true
                    },
                    legend: {
                        cursor:"pointer",
                        itemclick: toggleDataSeries3
                    },
                    data: [{
                        type: "column",
                        name: "Maturity",
                        legendText: "Maturity",
                        color: "#7d46c2",
                        showInLegend: true, 
                        dataPoints:[
                            { label: "Billing", y: user[0].h2r.hiring },
                            { label: "Cash Application & Collection", y: user[0].h2r.employeemanagement },
                            { label: "Credit Analysis", y: user[0].h2r.payroll },
                            { label: "GL Posting & Reporting", y: user[0].h2r.retire }
                        ]
                    },
                    {
                        type: "column", 
                        name: "Average",
                        legendText: "Average",
                        color:"#8bc246",
                        axisYType: "secondary",
                        showInLegend: true,
                        dataPoints:[
                            { label: "Hiring", y: h2r[0] },
                            { label: "Employee Management", y: h2r[1] },
                            { label: "Payroll", y: h2r[2] },
                            { label: "Retire", y: h2r[3] }
                        ]
                    }]
                });
                chart3.render();


                function toggleDataSeries3(e) {
                    if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                        e.dataSeries.visible = false;
                    }
                    else {
                        e.dataSeries.visible = true;
                    }
                    chart3.render();
                }

//Hire To Retire Ends

//MaturityData for P2P
        window.feed = function(callback) {
        var tick = {};
        tick.plot0 = user[0].p2p.score; //put score
        callback(JSON.stringify(tick));
        };
        var myConfig = {
            type: "gauge",
            title:{
                text:"Procure To Pay",
                position:"0% 0%",
                marginTop:10,
                marginRight:0,
                marginLeft:0,
                marginBottom:10,
                fontWeight : "normal",
                fontStyle : 'italic'
            },
            globals: {
            fontSize: 25
            },
            plotarea: {
            marginTop: 80
            },
            plot: {
            size: '100%',
            valueBox: {
            placement: 'center',
            text: '%v', //default
            fontSize: 25,
            rules: [{
            rule: '%v >= 80',
            text: '<br><br>Score: %v %<br>LEVEL-5'
            }, {
            rule: '%v < 80 && %v >= 60',
            text: '<br><br>Score: %v %<br>LEVEL-4'
            }, {
            rule: '%v < 60 && %v >= 40',
            text: '<br><br>Score: %v %<br>LEVEL-3'
            }, {
            rule: '%v < 40 && %v >= 20',
            text: '<br><br>Score: %v %<br>LEVEL-2'
            },
            {
            rule: '%v < 20 && %v >= 0',
            text: '<br><br>Score: %v %<br>LEVEL-1'
            }]
            }
            },
            tooltip: {
            borderRadius: 6
            },
            scaleR: {
            aperture: 180,
            minValue: 0,
            maxValue: 100,
            step: 20,
            center: {
            visible: false
            },
            tick: {
            visible: false
            },
            item: {
            offsetR: 0,
            rules: [{
            rule: '%i == 9',
            offsetX: 15
            }]
            },
            labels: ['0','20','40','60','80','100'],
            ring: {
                size: 70,
                rules: [{
                rule: '%v >= 80 && %v < 100',
                backgroundColor: '#154f87'
                }, {
                rule: '%v >= 60 && %v < 80',
                backgroundColor: '#1a63a9'
                }, {
                rule: '%v >= 40 && %v < 60',
                backgroundColor: '#2077cb'
                }, {
                rule: '%v >= 20 && %v < 40',
                backgroundColor: '#338adf'
                }, {
                rule: '%v < 20',
                backgroundColor: '#549ee4'
                }]
                }
            },
            refresh: {
            type: "feed",
            transport: "js",
            url: "feed()",
            interval: 1000,
            resetTimeout: 1000
            },
            series: [{
            //values: [], // starting value
            backgroundColor: 'black',
            indicator: [0.1, 5, 10, 10],
            animation: {
            effect: 2,
            method: 1,
            sequence: 4,
            speed: 10
            },
            }]
        };
        zingchart.render({
        id: 'myChart',
        data: myConfig,
        height: 500,
        width: '100%'
        });
//Maturity Data ends
//MaturityData for O2c
        window.feed2 = function(callback) {
        var tick = {};
        tick.plot0 = user[0].o2c.score; //put score
        callback(JSON.stringify(tick));
        };
        var myConfig2 = {
            type: "gauge",
            title:{
                text:"Order To Cash",
                position:"0% 0%",
                marginTop:10,
                marginRight:0,
                marginLeft:0,
                marginBottom:10,
                fontWeight : "normal",
                fontStyle : 'italic'
            },
            globals: {
            fontSize: 25
            },
            plotarea: {
            marginTop: 80
            },
            plot: {
            size: '100%',
            valueBox: {
            placement: 'center',
            text: '%v', //default
            fontSize: 25,
            rules: [{
            rule: '%v >= 80',
            text: '<br><br>Score: %v %<br>LEVEL-5'
            }, {
            rule: '%v < 80 && %v >= 60',
            text: '<br><br>Score: %v %<br>LEVEL-4'
            }, {
            rule: '%v < 60 && %v >= 40',
            text: '<br><br>Score: %v %<br>LEVEL-3'
            }, {
            rule: '%v < 40 && %v >= 20',
            text: '<br><br>Score: %v %<br>LEVEL-2'
            },
            {
            rule: '%v < 20 && %v >= 0',
            text: '<br><br>Score: %v %<br>LEVEL-1'
            }]
            }
            },
            tooltip: {
            borderRadius: 6
            },
            scaleR: {
            aperture: 180,
            minValue: 0,
            maxValue: 100,
            step: 20,
            center: {
            visible: false
            },
            tick: {
            visible: false
            },
            item: {
            offsetR: 0,
            rules: [{
            rule: '%i == 9',
            offsetX: 15
            }]
            },
            labels: ['0','20','40','60','80','100'],
            ring: {
                size: 70,
                rules: [{
                rule: '%v >= 80 && %v < 100',
                backgroundColor: '#ff8c00'
                }, {
                rule: '%v >= 60 && %v < 80',
                backgroundColor: '#ff9514'
                }, {
                rule: '%v >= 40 && %v < 60',
                backgroundColor: '#ff9e27'
                }, {
                rule: '%v >= 20 && %v < 40',
                backgroundColor: '#ffa54e'
                }, {
                rule: '%v < 20',
                backgroundColor: '#ffc17e'
                }]
                }
            },
            refresh: {
            type: "feed",
            transport: "js",
            url: "feed2()",
            interval: 1000,
            resetTimeout: 1000
            },
            series: [{
            //values: [], // starting value
            backgroundColor: 'black',
            indicator: [0.1, 5, 10, 10],
            animation: {
            effect: 2,
            method: 1,
            sequence: 4,
            speed: 10
            },
            }]
        };
        zingchart.render({
        id: 'myChart2',
        data: myConfig2,
        height: 500,
        width: '100%'
        });
//Maturity Data for O2C Ends
//Maturity Data for H2R
        window.feed3 = function(callback) {
        var tick = {};
        tick.plot0 = user[0].h2r.score; //put score
        callback(JSON.stringify(tick));
        };
        var myConfig3 = {
            type: "gauge",
            title:{
                text:"Hire To Retire",
                position:"0% 0%",
                marginTop:10,
                marginRight:0,
                marginLeft:0,
                marginBottom:10,
                fontWeight : "normal",
                fontStyle : 'italic'
            },
            globals: {
            fontSize: 25
            },
            plotarea: {
            marginTop: 80
            },
            plot: {
            size: '100%',
            valueBox: {
            placement: 'center',
            text: '%v', //default
            fontSize: 25,
            rules: [{
            rule: '%v >= 80',
            text: '<br><br>Score: %v %<br>LEVEL-5'
            }, {
            rule: '%v < 80 && %v >= 60',
            text: '<br><br>Score: %v %<br>LEVEL-4'
            }, {
            rule: '%v < 60 && %v >= 40',
            text: '<br><br>Score: %v %<br>LEVEL-3'
            }, {
            rule: '%v < 40 && %v >= 20',
            text: '<br><br>Score: %v %<br>LEVEL-2'
            },
            {
            rule: '%v < 20 && %v >= 0',
            text: '<br><br>Score: %v %<br>LEVEL-1'
            }]
            }
            },
            tooltip: {
            borderRadius: 6
            },
            scaleR: {
            aperture: 180,
            minValue: 0,
            maxValue: 100,
            step: 20,
            center: {
            visible: false
            },
            tick: {
            visible: false
            },
            item: {
            offsetR: 0,
            rules: [{
            rule: '%i == 9',
            offsetX: 15
            }]
            },
            labels: ['0','20','40','60','80','100'],
            ring: {
                size: 70,
                rules: [{
                rule: '%v >= 80 && %v < 100',
                backgroundColor: '#772694'
                }, {
                rule: '%v >= 60 && %v < 80',
                backgroundColor: '#902eb3'
                }, {
                rule: '%v >= 40 && %v < 60',
                backgroundColor: '#a63ccd'
                }, {
                rule: '%v >= 20 && %v < 40',
                backgroundColor: '#b45bd5'
                }, {
                rule: '%v < 20',
                backgroundColor: '#c27add'
                }]
                }
            },
            refresh: {
            type: "feed",
            transport: "js",
            url: "feed3()",
            interval: 1000,
            resetTimeout: 1000
            },
            series: [{
            //values: [], // starting value
            backgroundColor: 'black',
            indicator: [0.1, 5, 10, 10],
            animation: {
            effect: 2,
            method: 1,
            sequence: 4,
            speed: 10
            },
            }]
        };
        zingchart.render({
        id: 'myChart3',
        data: myConfig3,
        height: 500,
        width: '100%'
        });
//Maturity Data for O2C Ends
    
    });
    });
}

