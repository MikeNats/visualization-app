var Vtool = {

    maps: {},

    charts : {

    	settings : {},

        commonFunctionality  : {}, 

		bar : {},

		area : {},

	    line : {},

	    pie : {},
	}

}

/************** Charts Essential Assets ***************/
Vtool.charts.commonFunctionality = commonChartFunctionality();
Vtool.charts.settings = chartSettings();
/************** Charts PlugIns * **************/
Vtool.charts.bar.vertical = createBarChartVertical();
Vtool.charts.bar.horizontal = createBarChartHorizontal();
Vtool.charts.bar.negative = createBarChartNegative();
Vtool.charts.bar.groupedHorizontal = createBarChartGroupedHorizontal();
Vtool.charts.bar.groupedVertical = createBarChartGroupedVertical();
Vtool.charts.bar.stackHorizontal = createBarChartStackHorizontal();
Vtool.charts.bar.stackVertical = createBarChartStackVertical();
Vtool.charts.bar.stackPersentageHorizontal = createBarChartStackPersentageHorizontal();
Vtool.charts.bar.stackPersentageVertical = createBarChartStackPersentageVertical();
Vtool.charts.area.stack = createAreaChartStack();
Vtool.charts.line.line =  createLineChart();
Vtool.charts.pie.pie =  createPieChart();
/************ Charts Initialization  *****************/
//Vtool.charts.pie.pie.init();