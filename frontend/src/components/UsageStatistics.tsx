import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

type Props = {
  usage_statistics:
    | {
        by_platform: {
          iOS: number;
          Android: number;
          Web: number;
        };
        by_country: {
          USA: number;
          India: number;
          Germany: number;
          Japan: number;
          Brazil: number;
        };
      }
    | undefined;
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#E11b71"];

const CustomTooltip = ({
  active,
  payload = [{ value: 100, name: 33 }],
}: {
  active: boolean;
  payload: [{ value: number; name: number }];
  label: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`Rating: ${payload[0].value} `}</p>
        <p className="label">{`Count : ${payload[0].name}`}</p>
      </div>
    );
  }

  return null;
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
}: {
  cx: string;
  cy: string;
  midAngle: string;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  name: string;
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${name} - ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

type dataType = {
  name: string;
  value: number;
}[];

const UsageStatistics = ({ usage_statistics }: Props) => {
  let byCountryArrOfObjects: dataType = [{ name: "", value: 0 }];
  let byPlatformArrOfObjects: dataType = [
    { name: "iOS", value: 600 },
    { name: "Android", value: 700 },
    { name: "Web", value: 200 },
  ];
  if (usage_statistics) {
    const byCountryArr = Object.entries(usage_statistics.by_country);
    byCountryArrOfObjects = byCountryArr.map((item) => {
      const obj = { name: "", value: 0 };
      obj.name = item[0];
      obj.value = item[1];
      return obj;
    });
    const byPlatformArr = Object.entries(usage_statistics.by_platform);
    byPlatformArrOfObjects = byPlatformArr.map((item) => {
      const obj = { name: "", value: 0 };
      obj.name = item[0];
      obj.value = item[1];
      return obj;
    });
  }

  //   console.log("--------", byCountryArrOfObjects, byPlatformArrOfObjects);
  const [tabState, setTabState] = useState("platform");
  const [data, setData] = useState<dataType>(byPlatformArrOfObjects);
  // console.log("data", data);

  useEffect(() => {
    if (tabState === "platform") {
      //   console.log("narndra");
      setData(byPlatformArrOfObjects);
    } else {
      //   console.log("naren4488");
      setData(byCountryArrOfObjects);
    }
  }, [tabState]);

  return (
    <div className="graph-section">
      <div className="response-main-content">
        <div className="header-content">
          <h2>Usage Staticstics</h2>
          <p>Distribution by platform or country</p>
        </div>
        <div>
          <button
            className={`tab-btn ${tabState === "platform" && "active-btn"}`}
            onClick={() => setTabState("platform")}
          >
            Platform
          </button>
          <button
            className={`tab-btn ${tabState === "country" && "active-btn"}`}
            onClick={() => setTabState("country")}
          >
            Country
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="55%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            animationDuration={400}
            animationBegin={50}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip
            cursor={{ fill: "transparent" }}
            content={
              <CustomTooltip
                active={true}
                payload={[{ value: 0, name: 0 }]}
                label=""
              />
            }
          />
        </PieChart>
      </ResponsiveContainer>
      <p className="stats-p">Usage Statistics</p>
    </div>
  );
};

export default UsageStatistics;
