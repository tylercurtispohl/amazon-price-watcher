"use client";
import { PricePointsByProductIdAndTimestampQuery } from "@/API";
import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJs,
  TimeScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  LineController,
  LineElement,
  Decimation,
} from "chart.js";
import "chartjs-adapter-moment";

ChartJs.register(
  LineController,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  TimeScale,
  LineElement,
  Decimation
);

export const ProductPriceChart = ({
  pricePointsQueryResult,
}: {
  pricePointsQueryResult: PricePointsByProductIdAndTimestampQuery;
}) => {
  const pricePoints =
    pricePointsQueryResult.pricePointsByProductIdAndTimestamp?.items;

  const [chartData, setChartData] = useState({
    datasets: [
      {
        label: "Price",
        data:
          pricePoints
            // according to typescript, p can be null so just make sure its not
            ?.filter((p) => !!p && !!p.timestamp && !!p.price)
            .map((p) => ({ x: p!.timestamp, y: p!.price })) ?? [],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  return (
    <>
      {!!pricePoints?.length && (
        // The decimation plugin doesn't seem to be working quite right.
        // It should help us show less data points on the chart.
        <Line
          data={chartData}
          options={{
            // Turn off animations and data parsing for performance
            // animation: false,

            // interaction: {
            //   mode: "nearest",
            //   axis: "x",
            //   intersect: false,
            // },
            // plugins: {
            //   decimation: {
            //     enabled: true,
            //     algorithm: "lttb",
            //     samples: 10,
            //   },
            // },
            responsive: true,
            scales: {
              x: {
                type: "time",
                ticks: {
                  source: "auto",
                  // Disabled rotation for performance
                  maxRotation: 0,
                  autoSkip: true,
                },
              },
              y: {
                grace: "50%",
              },
            },
          }}
        />
      )}
    </>
  );
};
