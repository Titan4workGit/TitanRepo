/*!
 * D3 Instant Charts 0.2.*
 *
 * https://github.com/forink/D3-Instant-Charts
 *
 * Depends on jquery 3.x and D3.js v5 library
 *
 * Copyright (c) 2018 Yifong Jiang
 * Released under the BSD 2-clause License.
 */

/*eslint no-extra-parens: [2, "functions"]*/

(function ($) {
    'use strict';
    var svgDefaultWidth = 500, svgDefaultHeight = 350, svgMinWidth = 300, svgMinHeight = 200;

    $.fn.extend({
        barChart: function (options) {
            // Default options
            var settings = $.extend({
                jsonUrl: '',
                width: svgDefaultWidth,  //svg width
                height: svgDefaultHeight,  //svg height
                marginTop: 30,  //svg margin top
                marginRight: 30,  //svg margin right
                marginButtom: 50,  //svg margin buttom
                marginLeft: 20,  //svg margin left
                barSpacing: 0.1,  //設定Bar間距
                barWidthRate: 0.3,  //設定Bar寬比率 (0~1，數字越小越粗)
                axisXScaleCount: 10,  //X軸刻度數量
                axisYPadding: 0,  // Y軸標題略縮字數: =0 顯示完整標題; >0 省略點在右邊; <0 省略點在左邊
                axisYPaddingEllipses: '…',  // Y軸省略標題時的代替字串
                autoFitAxisY: true,  //自動判定Y軸字串長度以調整左邊寬度
                autoFitScaling: 1,  //縮放比率
                toolTipFormat: '{%name%} - {%value%}', //{%name%} 名稱; {%value%} 數值
                ajaxType: 'GET',
                blankDataMessage: 'No Data Available.'
            }, options);

            var targetId = $(this).attr('id');
            var jsonObj = settings.jsonUrl;//callJson(settings.jsonUrl, settings.ajaxType);
            //console.log(jsonObj.d3chart);

            //設定畫布邊界
            var margin = {
                top: settings.marginTop,
                right: settings.marginRight,
                bottom: settings.marginButtom,
                left: settings.marginLeft
            };

            //設定畫布大小(若未設定，則檢查客戶端的尺寸，若客戶端的尺寸小於最小可容許尺寸，則使用預設尺寸)
            var suitableSize = getSuitableSize(targetId, settings.width, settings.height);
            var svgWidth = suitableSize.width;
            var svgHeight = suitableSize.height;
            //console.log(suitableSize);

            //建立圖框
            var svg = d3.select('#' + targetId)
                .append('svg')
                .attr('class', 'd3-instant-charts')
                .attr('width', svgWidth)
                .attr('height', svgHeight);

            //檢查資料是否可輸出，否則繪出錯誤訊息
            if (!checkJsonIsValid(jsonObj)) {
                drawNoDataMsg(targetId, svgWidth, svgHeight, settings.blankDataMessage);
                return;
            }

            //設定資料Root
            var dataset = jsonObj.d3chart;

            //取得資料最大值
            var maxDataVal = d3.max(dataset, function (d) { return d.value; });

            //取得Y軸標題文字長度的最大值
            var maxLengthAxisYLabel = d3.max(dataset, function (d) { return d.name; });

            //如果有省略字元，連最寬文字長度也要處理
            maxLengthAxisYLabel = getPaddingText(maxLengthAxisYLabel, settings.axisYPadding, settings.axisYPaddingEllipses);

            if (settings.autoFitAxisY) {
                margin.left = calculateTextLength(maxLengthAxisYLabel) * settings.autoFitScaling + settings.marginLeft;
            }

            //刻度值
            var tickVal = d3.tickStep(0, maxDataVal, settings.axisXScaleCount);

            //計算出X軸最大值
            var axisXMaxVal = (tickVal - (maxDataVal % tickVal)) + maxDataVal;

            //設定圖表大小
            var chartWidth = svgWidth - (margin.left + margin.right);
            var chartHeight = svgHeight - (margin.top + margin.bottom);

            //建立坐標軸圖層
            var axisLayer = svg.append('g')
                .classed('axis-layer', true)
                .attr('width', svgWidth)
                .attr('height', svgHeight);

            //建立主圖表圖層
            var chartLayer = svg.append('g')
                .classed('chart-layer', true)
                .attr('width', chartWidth)
                .attr('height', chartHeight)
                .attr('transform', 'translate(' + [margin.left, margin.top] + ')');

            //設定X軸尺度
            var xScale = d3.scaleLinear()
                .domain([0, axisXMaxVal])
                .range([0, chartWidth]);

            //設定Y軸尺度
            var yScale = d3.scaleBand()
                .rangeRound([0, chartHeight])
                .padding(settings.barSpacing)
                .domain(dataset.map(function (d) { return d.name; }))
                .paddingInner(settings.barWidthRate);

            //繪製 X Grid
            var gridX = axisLayer.append('g')
                .attr('class', 'grid-x')
                .attr('transform', 'translate(' + margin.left + ',' + (chartHeight + margin.top) + ')')
                .call(d3.axisBottom(xScale)
                    .ticks()
                    .tickSizeInner(-chartHeight)
                    .tickFormat('')
                );

            //繪製X軸
            var axisX = axisLayer.append('g')
                .attr('class', 'axis-x')
                .attr('transform', 'translate(' + margin.left + ',' + (chartHeight + margin.top) + ')')
                .call(d3.axisBottom(xScale)
                    .ticks()
                );

            //繪製Y軸
            var axisY = axisLayer.append('g')
                .attr('class', 'axis-y')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                .call(d3.axisLeft(yScale)
                    .ticks()
                    .tickFormat(function (d) {
                        return getPaddingText(d, settings.axisYPadding, settings.axisYPaddingEllipses);
                    })
                );

            //滑鼠移過時的Tooltip區塊
            var tooltip = d3.select('body').append('div')
                .attr('class', 'd3-instant-charts-tooltip');

            //建立長條圖POOL
            var gs = chartLayer.append('g')
                .selectAll('rect')
                .data(dataset)
                .enter()
                .append('g');

            //繪製長條圖 (含滑鼠移過時的Tooltip)
            gs.append('rect')
                .attr('x', 2)
                .attr('y', function (d) { return (yScale(d.name)); })
                .attr('class', 'bar')
                .attr('height', yScale.bandwidth())
                .on('mouseover', function (d) {
                    tooltip.transition().duration(200)
                        .style('opacity', 0.8);
                    tooltip.html(String(settings.toolTipFormat)
                            .replace('{%name%}', d.name)
                            .replace('{%value%}', d.value))
                        .style('left', (d3.event.pageX) + 'px')
                        .style('top', (d3.event.pageY - 28) + 'px');
                    d3.select(this)
                        .style('fill', '#3379c4')
                        .style('stroke-width', '2px')
                        .attr('x', 3)
                        .attr('width', function (d) {
                            return xScale(d.value) - 2;
                        });
                })
                .on('mousemove', function () {
                    return tooltip
                        .style('top', (d3.event.pageY - 10) + 'px')
                        .style('left', (d3.event.pageX + 10) + 'px');
                })
                .on('mouseout', function (d) {
                    tooltip
                        .transition()
                        .duration(500)
                        .style('opacity', 0);
                    d3.select(this)
                        .style('fill', '#65a7ef')
                        .style('stroke-width', '0')
                        .attr('x', 2)
                        .attr('width', function (d) {
                            return xScale(d.value);
                        });
                })
                .transition()
                .duration(1200)
                .attr('width', function (d) {
                    return xScale(d.value);
                });

            //Bar後面的文字
            /*
            gs.append('text')
                .attr('class', 'bar-text')
                .attr('x', padding.left)
                .attr('y', function (d) { return yScale(d.name); })
                .attr('dx', 5)
                .attr('dy', ((yScale.bandwidth()) / 2)+4)
                .text(function (d) {
                    return d.value;
                })
                .transition()
                .duration(1200)
                .attr('x', function (d) {
                    return xScale(d.value);
                })
                */

            /*************************************/
        },

        //$.fn.columnChart = function (options) {};

        //$.fn.dataBar = function (options) {};

        lineChart: function (options) {

            // Default options
            var settings = $.extend({
                jsonUrl: '',
                width: svgDefaultWidth,  //svg width
                height: svgDefaultHeight,  //svg height
                marginTop: 50,  //svg margin top
                marginRight: 50,  //svg margin right
                marginButtom: 50,  //svg margin buttom
                marginLeft: 50,  //svg margin left
                axisYScaleCount: 10,  //Y軸刻度數量
                toolTipFormat: '{%name%}: {%values.x%} - {%values.y%}',
                xAxisTimeFormat: '%m/%d',
                legendWidthRate: 0.5,
                ajaxType: 'GET',
                blankDataMessage: 'No Data Available.'
            }, options);

            var targetId = $(this).attr('id');
            var jsonObj = settings.jsonUrl;//callJson(settings.jsonUrl, settings.ajaxType);
            //console.log(jsonObj.d3chart);

            //設定畫布邊界
            var margin = {
                top: settings.marginTop,
                right: settings.marginRight,
                bottom: settings.marginButtom,
                left: settings.marginLeft
            };

            //設定畫布大小(若未設定，則檢查客戶端的尺寸，若客戶端的尺寸小於最小可容許尺寸，則使用預設尺寸)
            var suitableSize = getSuitableSize(targetId, settings.width, settings.height);
            var svgWidth = suitableSize.width;
            var svgHeight = suitableSize.height;
            //console.log(suitableSize);

            //設定資料Root
            var dataset = jsonObj.d3chart[0];

            //取得X軸組數
            var axisXPointsCount = dataset[0].values.length;

            //日期資料Parse格式
            var timeParseFormat = d3.timeParse('%m-%d');
            var outputTimeFormat = (axisXPointsCount > 2) ?
                d3.timeFormat(settings.xAxisTimeFormat) : d3.timeFormat('%Y-%m-%d');

            //處理時間序列資料
            dataset.forEach(function (d) {
                d.values.forEach(function (d) {
                    d.x = timeParseFormat(d.x);
                    d.y = +d.y;
                });
            });

            //取得資料最大值
            var maxDataVal = d3.max(dataset, function (d) {
                return d3.max(d.values, function (d) {
                    return d.y;
                });
            });

            //取得資料最小值
            var minDataVal = d3.min(dataset, function (d) {
                return d3.min(d.values, function (d) {
                    return d.y;
                });
            });

            //設定圖表大小
            var chartWidth = svgWidth - (margin.left + margin.right);
            var chartHeight = svgHeight - (margin.top + margin.bottom);

            //設定圖例圖層寬度
            var legendWidth = svgWidth * settings.legendWidthRate;

            //建立圖框
            var svg = d3.select('#' + targetId)
                .append('svg')
                .attr('class', 'd3-instant-charts')
                .attr('width', svgWidth)
                .attr('height', svgHeight);

            //檢查資料是否可輸出，否則繪出錯誤訊息
            if (!checkJsonIsValid(jsonObj) || (maxDataVal === 0 && minDataVal === 0)) {
                drawNoDataMsg(targetId, svgWidth, svgHeight, settings.blankDataMessage);
                return;
            }

            //建立坐標軸圖層
            var axisLayer = svg.append('g')
                .classed('axis-layer', true)
                .attr('width', svgWidth)
                .attr('height', svgHeight);

            //建立主圖表圖層
            var chartLayer = svg.append('g')
                .classed('chart-layer', true)
                .attr('width', chartWidth)
                .attr('height', chartHeight)
                .attr('transform', 'translate(' + [margin.left, margin.top] + ')');

            //建立圖例圖層
            var legendLayer = svg.append('g')
                .classed('legend-layer', true)
                .attr('width', legendWidth)
                .attr('height', margin.top);

            //取得Y軸可變級距的座標陣列
            var yTicks = (maxDataVal / settings.axisYScaleCount >= 1) ?
                d3.range(settings.axisYScaleCount).map(function (i) {
                    //檢查Y軸資料最大值是否大於指定刻度數量，符合條件轉整數，否則使用自動刻度
                    return Math.round(d3.quantile([minDataVal, maxDataVal], i / (settings.axisYScaleCount - 1)));
                }) : null;

            //console.log(yTicks);

            //設定X軸尺度
            var xScale = d3.scaleTime()
                .domain(d3.extent(dataset[0].values, function (d) { return d.x; }))
                .range([0, chartWidth]);

            //設定Y軸尺度
            var yScale = d3.scaleLinear()
                .domain([0, maxDataVal])
                .range([chartHeight, 0]);

            //繪製 X Grid
            var gridX = axisLayer.append('g')
                .attr('class', 'grid-x')
                .attr('transform', 'translate(' + margin.left + ',' + (chartHeight + margin.top) + ')')
                .call(d3.axisBottom(xScale)
                    .ticks(axisXPointsCount)
                    .tickSizeInner(-chartHeight)
                    .tickFormat('')
                );

            //繪製 Y Grid
            var gridY = axisLayer.append('g')
                .attr('class', 'grid-y')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                .call(d3.axisLeft(yScale)
                    .tickValues(yTicks)
                    .tickSizeInner(-chartWidth)
                    .tickFormat('')
                );

            //繪製X軸
            var axisX = axisLayer.append('g')
                .attr('class', 'axis-x')
                .attr('transform', 'translate(' + margin.left + ',' + (chartHeight + margin.top) + ')')
                .call(d3.axisBottom(xScale)
                    .ticks(axisXPointsCount)
                    .tickFormat(outputTimeFormat)
                );

            //繪製Y軸
            var axisY = axisLayer.append('g')
                .attr('class', 'axis-y')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
                .call(d3.axisLeft(yScale)
                    .tickValues(yTicks)
                );

            //滑鼠移過時的Tooltip區塊
            var tooltip = d3.select('body').append('div')
                .attr('class', 'd3-instant-charts-tooltip');

            //設定折線顏色
            var lineColor = d3.scaleOrdinal(d3.schemeCategory10);

            //設定折線綁定
            var line = d3.line()
                .x(function (d) { return xScale(d.x); })
                .y(function (d) { return yScale(d.y); })
                .curve(d3.curveMonotoneX);

            //建立折線
            var lines = chartLayer.append('g')
                .attr('class', 'lines');

            //繪製折線
            lines.selectAll('.line-group')
                .data(dataset)
                .enter()
                .append('g')
                .attr('class', 'line-group')
                .attr('data-id', function (d) { return d.name; })
                .append('path')
                .attr('class', 'line')
                .attr('d', function (d) { return line(d.values); })
                .style('stroke', function (d, i) { return lineColor(d.name); })
                .style('opacity', 0.3)
                .call(lineTransition)
                .on('mouseover', function (d) {
                    tooltip.transition().duration(200)
                        .style('opacity', 0.8);
                    tooltip.html(d.name)
                        .style('left', (d3.event.pageX) + 'px')
                        .style('top', (d3.event.pageY - 28) + 'px');
                    d3.select(this).style('opacity', 0.8);
                })
                .on('mousemove', function () {
                    return tooltip
                        .style('top', (d3.event.pageY - 10) + 'px')
                        .style('left', (d3.event.pageX + 10) + 'px');
                })
                .on('mouseout', function (d) {
                    tooltip.transition().duration(500).style('opacity', 0);
                    d3.select(this).style('opacity', 0.3);
                });

            //繪製折線點
            lines.selectAll('.circle-group')
                .data(dataset)
                .enter()
                .append('g')
                .attr('class', 'circle-group')
                .attr('data-id', function (d) { return d.name; })
                .style('fill', function (d, i) { return lineColor(d.name); })
                .selectAll('circle')
                .data(function (d) { return d.values; })
                .enter()
                .append('g')
                .attr('class', 'circle')
                .append('circle')
                .attr('cx', function (d) { return xScale(d.x); })
                .attr('cy', function (d) { return yScale(d.y); })
                .attr('r', 0)
                .style('opacity', 0.6)
                .on('mouseover', function (d) {
                    tooltip.transition().duration(200)
                        .style('opacity', 0.8);
                    tooltip.html(String(settings.toolTipFormat)
                            .replace('{%name%}', d3.select(this.parentNode.parentNode).datum().name)
                            .replace('{%values.x%}', outputTimeFormat(d.x))
                            .replace('{%values.y%}', d.y))
                        .style('left', (d3.event.pageX) + 'px')
                        .style('top', (d3.event.pageY - 28) + 'px');
                    d3.select(this)
                        .style('opacity', 1)
                        .style('stroke-width', '2px');
                })
                .on('mousemove', function () {
                    return tooltip.style('top', (d3.event.pageY - 10) + 'px')
                        .style('left', (d3.event.pageX + 10) + 'px');
                })
                .on('mouseout', function (d) {
                    tooltip.transition().duration(500).style('opacity', 0);
                    d3.select(this).style('opacity', 0.6).style('stroke-width', '0');
                })
                .transition()
                .duration(2800)
                .attr('r', 6);

            //圖例的大小應該要計算項目與文字長度
            var legendRectSize = 12;
            var legendSpacing = 6;
            var horz = 0, vert = 0;

            //繪製圖例
            var legend = legendLayer.selectAll('.legend')
                .data(lineColor.domain())
                .enter()
                .append('g')
                .attr('class', 'legend');

            //繪製圖例方塊
            var blankColor = '#FFFFFF';
            legend.append('rect')
                .attr('width', legendRectSize)
                .attr('height', legendRectSize)
                .style('fill', lineColor)
                .style('stroke', lineColor)
                .on("click", function (d) {
                    clickLegendIcon(this, d);
                });

            //繪製圖例文字
            legend.append('text')
                .attr('x', legendRectSize + legendSpacing)
                .attr('y', legendRectSize - legendSpacing / 2)
                .text(function (d) { return d; });

            //喬位置
            var textLoc = 0;
            var lastWidth = 0;
            legend.attr('transform', function (d, i) {
                horz += textLoc;
                var textWidth = d3.select(this).select('text').node().getComputedTextLength();
                textLoc = legendRectSize + legendSpacing * 3 + textWidth * 1.2;
                textLoc = textLoc + 70;//Priyanshu change
                vert = -2 * legendRectSize;
                legendLayer
                    .attr('transform', 'translate(' + [(svgWidth / 2) - (legendWidth / 2), margin.top - legendRectSize] + ')');
                return 'translate(' + horz + ',' + vert + ')';
            });

            //Function-點擊圖例
            function clickLegendIcon(target, data) {
                if (d3.color(d3.select(target).style('fill')).hex() === d3.color(blankColor).hex()) {
                    d3.selectAll('g[data-id="' + data + '"]').style('display', 'unset');
                    d3.selectAll('g[data-id="' + data + '"]').transition().duration(500).attr('opacity', 1);
                    d3.select(target).transition().duration(500).style('fill', lineColor);
                } else {
                    d3.selectAll('g[data-id="' + data + '"]').attr('opacity', 0);
                    d3.selectAll('g[data-id="' + data + '"]').style('display', 'none');
                    d3.select(target).style('fill', blankColor);
                }
            }

            //Function-設定折線漸變效果
            function lineTransition(line) {
                line.transition().duration(2000).attrTween("stroke-dasharray", calcTween);
            }

            //Function-計算折線方位
            function calcTween() {
                var len = this.getTotalLength();
                var ips = d3.interpolateString("0," + len, len + "," + len);
                return function (t) { return ips(t); };
            }
        }
    }
    );

    //$.fn.areaChart = function (options) { };

    //$.fn.pieChart = function (options) {};

    //$.fn.radarChart = function (options) { };

    //$.fn.gaugeChart = function (options) {};

    //Get json data from url
    var callJson = function (url, ajaxType) {

        var jsonData = '';

        $.ajax({
            url: url,
            type: ajaxType,
            async: false,
            cache:false,
            dataType: 'json',
            success: function (data) {
                jsonData = data;
            },
            error: function () {
                jsonData = 'IO ERROR';
            }
        });
        //console.log(jsonData);
        return jsonData;
    };

    var checkJsonIsValid = function (jsonObj) {

        var isValid = false;
        try {
            if (jsonObj === 'IO ERROR') {
                console.log('An error occurred while reading the JSON source.');
            } else if ($.isEmptyObject(jsonObj)) {
                console.log('The JSON object is null or empty.');
            } else if (JSON.parse(JSON.stringify(jsonObj)) === 'ERROR') {
                console.log('The JSON format is invalid.');
            } else if (!jsonObj.hasOwnProperty('d3chart')) {
                console.log('The root element of JSON is invalid.');
            } else if (jsonObj['d3chart'].length === 0 || Object.keys(jsonObj['d3chart'][0]).length === 0) {
                console.log('The root element of JSON is null or empty.');
            } else {
                isValid = true;
            }
        }
        catch (e) {
            console.log('An error occurred while validating the JSON format.');
        }
        return isValid;
    };

    var drawNoDataMsg = function (targetId, svgWidth, svgHeight, blankDataMessage) {

        var svg = d3.select('#' + targetId)
            .select('svg.d3-instant-charts');

        svg.append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('class', 'no-data-frame')
            .attr('width', svgWidth)
            .attr('height', svgHeight)
            .style('fill', '#EEEEEE');

        svg.append('rect')
            .attr('x', svgWidth / 8)
            .attr('y', (svgHeight * 3) / 8)
            .attr('class', 'no-data-box')
            .attr('width', (svgWidth * 3) / 4)
            .attr('height', svgHeight / 4)
            .style('fill', '#FFFFFF')
            .style('stroke', '#999999')
            .style('stroke-dasharray', '5 2')
            .style('stroke-width', '1px')
            .style('opacity', 0)
            .transition()
            .duration(1000)
            .style('opacity', 0.6);

        //繪製沒資料的錯誤訊息
        svg.append('text')
            .attr('x', svgWidth / 2)
            .attr('y', (svgHeight / 2) + 5)
            .text(blankDataMessage)
            .style("text-anchor", "middle")
            .style('opacity', 0)
            .transition()
            .duration(1000)
            .style('opacity', 0.6);
    };

    var getPaddingText = function (text, padding, paddingStr) {
        if (padding !== 0 && text.length > Math.abs(padding)) {
            if (padding > 0) {
                text = text.substring(0, padding) + paddingStr;
            } else {
                text = paddingStr + text.substring(text.length + padding, text.length);
            }
        }
        return text;
    };

    var calculateTextLength = function (text) {

        var tempText = d3.select('svg')
            .append('text')
            .attr('class', 'temp-text')
            .attr('x', 0)
            .attr('y', 0)
            .text(text)
            .style('visibility', 'hidden');

        var textLength = tempText.node().getComputedTextLength();
        tempText.remove();

        return textLength;
    };

    var getSuitableSize = function (targetId, alterWidth, alterHeight) {
        var svgWidth, svgHeight;

        if (alterWidth !== svgDefaultWidth) { //有設定
            svgWidth = (alterWidth > svgMinWidth) ? alterWidth : svgDefaultWidth;
        } else { //沒設定
            //取得客戶端寬度，若太小則設定為預設寬度
            svgWidth = document.querySelector('#' + targetId).clientWidth;
            if (svgWidth <= svgMinWidth) {
                svgWidth = svgDefaultWidth;
            }
        }

        if (alterHeight !== svgDefaultHeight) { //有設定
            svgHeight = (alterHeight > svgMinHeight) ? alterHeight : svgDefaultHeight;
        } else { //沒設定
            svgHeight = svgDefaultHeight;
        }

        return { width: svgWidth, height: svgHeight };
    };

}(jQuery));