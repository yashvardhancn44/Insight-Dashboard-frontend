import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

type Props = {
  user_satisfaction:
    | {
        ratings: {
          rating: number;
          count: number;
        }[];
      }
    | undefined;
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active: boolean;
  payload: [{ value: number }];
  label: string;
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} - ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

const UserSatisfaction = ({ user_satisfaction }: Props) => {
  let data;
  if (user_satisfaction) data = user_satisfaction.ratings;
  // console.log("data: ", data);

  return (
    <div className="graph-section">
      <div className="header-content">
        <h2>User Satisfaction</h2>
        <p>User's count based on rating</p>
      </div>
      <ResponsiveContainer height="70%" width="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="8 6" vertical={false} />
          <XAxis dataKey="rating" />
          <YAxis domain={[0, "dataMax + 200"]} />
          <Tooltip
            cursor={{ fill: "transparent" }}
            content={
              <CustomTooltip active={true} payload={[{ value: 0 }]} label="" />
            }
          />

          <Legend payload={[{ value: "User Satisfaction", type: "line" }]} />
          <Bar
            label={{ position: "top", fill: "gray" }}
            dataKey="count"
            fill="#659BF2"
            activeBar={{
              stroke: "#4473EC",
              strokeWidth: 2,
              fill: "#4473EC",
            }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserSatisfaction;
