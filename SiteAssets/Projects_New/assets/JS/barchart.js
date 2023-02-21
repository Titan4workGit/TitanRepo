/************************************************************
 *                                                         *
 *                      BARCHARTJS                         *
 *                                                         *
*************************************************************
* TO USE - call createBarChart() with the following arguments:
*************************************************************
* data: an array of n arrays, each of length 2. The first
* value in the n'th array couple is a String that represents
* that bar's label. The second value in each array couple is
* a number and represents the value of the associated bar.
*************************************************************
* options: on object where each property corresponds to a
* setting on the chart. For a full list of available options,
* refer to the README or check below in initOptions()
*************************************************************
* element: The DOM element that the chart will be generated
* inside of. Use either a jQuery or vanilla DOM selector
*************************************************************
* Example:
* let data = [['Oranges', 23], ['Apples', 44], ['Pears', 7]];
* let element = document.getElementById("chart-example-1");
* let options = {
*   title: 'Fruits',
*   titleColor: 'blue',
*   axisColor: 'blue',
*   barColors: ['orange', 'red', 'yellow']
* };
* createBarChart(data, element, options);
************************************************************/

// Number of charts on page, used for creating specific IDs
let numCharts = 0;

/************************************************************
*                      MAIN FUNCTION                        *
************************************************************/
function createBarChart(data, element, options = {}) {

  // Global Variables & Init
  numCharts++;
  let el = element;
  let numBars = data.length;
  let labels = [];
  let values = [];
  let max = 0;
  for (let i = 0; i < data.length; i++) {
    labels.push(data[i][0]);
    values.push(data[i][1]);
    max < data[i][1] ? max = data[i][1] : null;
  }
  const opt = initOptions(options, numBars, max);

  // If element is a DOM element, convert to jQuery. If it is neither, log an error message
  if (!(el instanceof jQuery) && !isDOM(el)) {
    console.log('Please use a valid DOM or jQuery element when you use createBarChart()');
  } else if (isDOM(el)) {
    el = $(el);
  }

  /* Container: Add id #chart-[numChart]-container and class .chart-container to selected
  * element and add dynamic values/CSS settings*/
  el.attr('id', 'chart-' + numCharts + '-container');
  el.addClass('chart-container');
  $('#chart-' + numCharts + '-container').css({
    width: opt.width,
    height: opt.height
  });

  /* Title: Append child div with class .chart-title and id #chart-[numChart]-title
   * and add values/CSS settings */
  el.append('<div class="chart-title" style="display:none;" id="chart-' + numCharts + '-title"><div>' + opt.title + '</div></div>');
  $('#chart-' + numCharts + '-title').css({
    color: opt.titleColor,
    width: opt.width,
    height: Math.floor(opt.height / 6),
    background: opt.titleBG,
    'font-size': opt.titleFontSize
  });

  /* Ticks Area: Append child div with class .chart-ticks and id
   * #chart-[numChart]-ticks and add values/CSS settings */
  el.append('<div class="chart-ticks" id="chart-' + numCharts + '-ticks"></div>');
  let ticksEl = $('#chart-' + numCharts + '-ticks');
  ticksEl.css({
    color: opt.borderColor,
    width: Math.floor(opt.width / 8),
    height: Math.floor(opt.height * 5 / 6)
  });

  /* Ticks: Append child divs with class .chart-tick and id
   * #chart-[numChart]-tick-[i], add values/CSS settings, and return
   * the max bar height for later use */
  maxBarHeight = appendTicks(opt, ticksEl);

  /* Labels Area: Append child div with class .chart-labels and id
   * #chart-[numCharts]-labels and add dynamic values/CSS settings */
  el.append('<div class="chart-labels" id="chart-' + numCharts + '-labels"></div>');
  let labelsEl = $('#chart-' + numCharts + '-labels');
  labelsEl.css({
    'font-size': '0.5em',
    width: Math.floor(opt.width * 7 / 8),
    height: Math.floor(opt.height / 12),
    top: Math.floor(opt.height * 9 / 12)
  });

  /* Labels: Append child divs with class .chart-label and id
   * #chart-label-[i] and add dynamic values/CSS settings */
  appendLabels(opt, labels, labelsEl);

  /* Chart: Append child div with class .chart and id #chart-[numCharts]
   * and add dynamic values/CSS settings */
  el.append('<div class="chart" id="chart-' + numCharts + '"></div>');
  let chartEl = $('#chart-' + numCharts);
  chartEl.css({
    background: opt.chartBG,
    width: Math.floor(opt.width * 7 / 8),
    height: Math.floor(opt.height * 9 / 12),
    'border-left': opt.axisWidth + 'px solid ' + opt.axisColor,
    'border-bottom': opt.axisWidth + 'px solid ' + opt.axisColor
  });

  /* Bars: Append child divs with class .chart-bar and id #chart-bar-i,
   * append grandchild divs with class .chart-val and id #chart-val-i
   * and add dynamic values/CSS settings */
  appendBars(opt, values, maxBarHeight, chartEl);



  /************************************************************
  *                     HELPER FUNCTIONS                      *
  ************************************************************/

  // Function to check if the input is a DOM element
  function isDOM (input) {
    if (typeof HTMLElement === "object") {
      // Check using W3 DOM2
      return input instanceof HTMLElement;
    } else {
      // Check using duck typing for older browsers
      return input && typeof input === "object" && input !== null && input.nodeType === 1 && typeof input.nodeName === "string";
    }
  };

  // Initialize options object
  function initOptions (options, numBars, max) {
    let opt = {
      width: 320,
      height: 210,
      title: '',
      titleFontSize: 18,
      titleColor: 'black',
      titleBG: '#f7f7f7',
      chartBG: '#fff',
      barColors: ['blue'],
      valColors: ['black'],
      labelColors: ['black'],
      valPos: 'center',
      axisColor: 'black',
      axisWidth: 3,
      barSpacing: 0.6,
      ticks: 4,
      decimals: 0
    }

    // Replace defaults with any selected options
    for (let prop in options) {
      if (opt.hasOwnProperty(prop)) {
        opt[prop] = options[prop];
      }
    }

    // Calculate tick increment rounding to next ten
    opt.tickIncrement = Math.ceil(max / 10) * 10 / opt.ticks;

    // Calculate bar width using spacing option
    opt.barWidth = Math.floor(opt.width * 7 / 8 / numBars * opt.barSpacing);

    return opt;
  };



  /* Ticks: Append child divs with class .chart-tick and id #chart-tick-i
  * to parent div class .chart-ticks, add values/CSS settings
  * and return the max height of the bars */
  function appendTicks(options, ticksEl) {
    let tickVal = 0;

    // Calculate the vertical distance between each tick
    let tickHeight = (ticksEl.height() - Math.floor(options.height / 12)) / (options.ticks + 1);

    // Calculate the offset from the bottom of the div before ticks begin
    let bottom = Math.floor(options.height / 12);

    let tickEl;

    // Loop through number of ticks, appending and styling each tick
    for (let i = 0; i <= options.ticks; i++) {
      ticksEl.append('<div class="chart-tick" id="chart-' + numCharts + '-tick-' + i + '"><span>' + formatNum(tickVal, opt.decimals) + '</span> _</div>');
      tickEl = $('#chart-' + numCharts + '-tick-' + i);
      tickEl.css({
        bottom: bottom,
        'font-size': ticksEl.width() * 0.25
      })
      tickVal += options.tickIncrement;
      bottom += tickHeight;
    }

    // Return the max height of the bars for later use
    return (bottom - Math.floor(options.height / 12) - tickHeight);
  };

  /* Labels: Append child divs with class .chart-label and id #chart-label-i
  * to parent div class .chart-labels and add values/CSS settings */
  function appendLabels(opt, labels, labelsEl) {
    let space = (labelsEl.width() - opt.barWidth * labels.length) / (labels.length + 1);
    let left = space;
    let labelEl;

    // Loop through values, appending and styling each label
    for (let i = 1; i <= labels.length; i++) {
      // Inside div added for styling purposes
      labelsEl.append('<div class="chart-label" id="chart-' + numCharts + '-label-' + i + '"><div>' + labels[i - 1] + '</div>');
      labelEl = $('#chart-' + numCharts + '-label-' + i);

      /* Add color from options - if no corresponding color is specified,
       * use the first color from the options array */
      if (!opt.labelColors[i - 1]){
        labelColor = opt.labelColors[0];
      } else {
        labelColor = opt.labelColors[i - 1];
      }

      // Dynamic CSS
      labelEl.css({
        width: opt.barWidth,
        left: left,
        color: labelColor,
        'font-size': opt.barWidth * 0.2
      });

      // Increment the positioning
      left += space + opt.barWidth;
    }
  };

  /* Bars: Append child divs with class .chart-bar and id #chart-bar-i,
  * append grandchild divs with class .chart-val and id #chart-val-i
  * to parent div class .chart and add values/CSS settings */
  function appendBars(opt, values, maxBarHeight, chartEl) {

    // Calculating the space between each bar
    let space = (chartEl.width() - opt.barWidth * values.length) / (values.length + 1);

    // Let the positioning from the left initially be equal to one space
    let left = space;
    let barEl;
    let barHeight;
    let barColor;
    let max = 0;

    // Find highest given value
    for (let i = 0; i < values.length; i++) {
      max < values[i] ? max = values[i] : null;
    }

    // Loop through values, appending and styling each bar
    for (let i = 1; i <= values.length; i++) {
      chartEl.append('<div class="chart-bar" id="chart-' + numCharts + '-bar-' + i + '"></div>');
      barEl = $('#chart-' + numCharts + '-bar-' + i);

      // Calculating height of individual bars
      barHeight = values[i - 1] / (Math.ceil(max / 10) * 10) * maxBarHeight;

      /* Add color from options - if no corresponding color is specified,
       * use the first color from the options array */
      if (!opt.barColors[i - 1]){
        barColor = opt.barColors[0];
      } else {
        barColor = opt.barColors[i - 1];
      }

      // Adding dynamic css
      barEl.css({
        width: opt.barWidth,
        left: left,
        background: barColor,
        'font-size': opt.barWidth * 0.25
      });

      // Animating the height of the bars
      barEl.animate({height: barHeight}, 1400);

      // Incrementing the positioning from the left
      left += space + opt.barWidth;

      // Add the bar value on to the bar
      appendBarValue(opt, barEl, values[i - 1], i);

    }
  };


  /* Values: Append child divs with class .chart-bar-val and id
  * #chart-bar-val-i and add values/CSS settings */
  function appendBarValue(opt, barEl, value, i) {

    // Append the div containing the value and add id
    barEl.append('<div id="chart-' + numCharts + '-bar-val-' + i + '">' + formatNum(value, opt.decimals) + '</div>');

    // Select the ID
    valEl = $('#chart-' + numCharts + '-bar-val-' + i);

    // Specify position of the value within the bar
    if (opt.valPos === 'bottom') {
      valEl.css({
        'align-self': 'flex-end'
      });
    } else if (opt.valPos === 'top') {
      valEl.css({
        'align-self': 'flex-start'
      });
    } else {
      valEl.css({
        'align-self': 'center'
      });
    }

    /* Add color from options - if no corresponding color is specified,
     * use the first color from the options array */
    if (!opt.valColors[i - 1]){
      valEl.css({
        color: opt.valColors[0]
      });
    } else {
      valEl.css({
        color: opt.valColors[i - 1]
      });
    }
  };

  // Format larger numbers to just a few chars so they fit on bars and ticks
  function formatNum(num, decimals) {
    if (num >= 100000000000000) {
      return (num / 1000000000000).toPrecision(3).toString() + 'T';
    } else if (num >= 1000000000000) {
      return (num / 1000000000000).toPrecision(2).toString() + 'T';
    } else if (num >= 1000000000) {
      return (num / 1000000000).toPrecision(3).toString() + 'B';
    } else if (num >= 1000000000) {
      return (num / 1000000000).toPrecision(2).toString() + 'B';
    } else if (num >= 100000000) {
      return (num / 1000000).toPrecision(3).toString() + 'M';
    } else if (num >= 1000000) {
      return (num / 1000000).toPrecision(2).toString() + 'M';
    } else if (num >= 10000) {
      return (num / 1000).toPrecision(3).toString() + 'K';
    } else if (num >= 1000) {
      return (num / 1000).toPrecision(2).toString() + 'K';
    } else {
      return num.toFixed(decimals);
    }
  };

};
