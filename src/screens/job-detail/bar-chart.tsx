import React from 'react';
import { View } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const data = {
  labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
  datasets: [
    {
      data: [80, 130, 180, 300, 25, 110, 50],
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 0) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
};

const VerticalBarChart = () => {
  return (
    <View>
      <BarChart
        data={data}
        width={400}
        height={200}
        chartConfig={chartConfig}
        fromZero={true}
        yAxisLabel="" // Add an empty string for yAxisLabel
        yAxisSuffix="" // Add an empty string for yAxisSuffix
      />
    </View>
  );
};

export default VerticalBarChart;
