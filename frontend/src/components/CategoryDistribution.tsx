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
import { CategoryDistributionType } from "../../../mock_backend/types";

type Props = {
  category_distribution: CategoryDistributionType | undefined;
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

const CategoryDistribution = ({ category_distribution }: Props) => {
  let categoryArrayOfObjects;
  if (category_distribution) {
    const categoryArr = Object.entries(category_distribution);
    categoryArrayOfObjects = categoryArr.map((item) => {
      const obj = { name: "", value: 0 };
      obj.name = item[0];
      obj.value = item[1];
      return obj;
    });
  }

  return (
    <div className="graph-section">
      <div className="header-content">
        <h2>Category Distribution</h2>
        <p>Number of queries per category</p>
      </div>

      <ResponsiveContainer height="70%" width="100%">
        <BarChart
          data={categoryArrayOfObjects}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="8 6" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            cursor={{ fill: "transparent" }}
            content={
              <CustomTooltip active={true} payload={[{ value: 0 }]} label="" />
            }
          />

          <Legend payload={[{ value: "Queries vs Category", type: "line" }]} />
          {/* <Bar dataKey="pv" fill="#8884d8" /> */}
          <Bar
            label={{ position: "top", fill: "gray" }}
            dataKey="value"
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

export default CategoryDistribution;
