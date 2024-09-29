import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { AppDispatch, RootState } from "../state/store";
import {
  switchToDate,
  switchToWeek,
} from "../state/responseTime/responseTimeSlice";

type Props = {
  response_times:
    | {
        day_wise: { date: string; average_time: number }[];
        week_wise: { week: string; average_time: number }[];
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

type ResponseTimeDate = {
  date: string;
  average_time: number;
}[];
type ResponseTimeWeek = {
  week: string;
  average_time: number;
}[];
const ResponseTime = ({ response_times }: Props) => {
  const responseTabBtn = useSelector(
    (state: RootState) => state.responseTabBtn.value
  );
  const dispatch = useDispatch<AppDispatch>();

  // const [tabState, setTabState] = useState("date");
  const [data, setData] = useState<ResponseTimeDate | ResponseTimeWeek>();
  // console.log("responseTabBtn", responseTabBtn);
  useEffect(() => {
    if (response_times) {
      if (responseTabBtn === "date") {
        // console.log("narndra");
        setData(response_times.day_wise);
      } else {
        // console.log("naren4488");
        setData(response_times.week_wise);
      }
    }
  }, [response_times, responseTabBtn]);

  return (
    <div className="graph-section">
      <div className="response-main-content">
        <div className="header-content">
          <h2>Respnose Time</h2>
          <p>Trends over time on a daily or weekly basis</p>
        </div>
        <div>
          <button
            className={`tab-btn ${responseTabBtn === "date" && "active-btn"}`}
            onClick={() => dispatch(switchToDate())}
          >
            Date Wise
          </button>
          <button
            className={`tab-btn ${responseTabBtn === "week" && "active-btn"}`}
            onClick={() => dispatch(switchToWeek())}
          >
            Week Wise
          </button>
        </div>
      </div>
      <ResponsiveContainer width="100%" height="75%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="8 6" vertical={false} />
          <XAxis dataKey={`${responseTabBtn}`} />
          <YAxis />
          <Tooltip
            cursor={{ fill: "transparent" }}
            content={
              <CustomTooltip active={true} payload={[{ value: 0 }]} label="" />
            }
          />
          <Legend payload={[{ value: "Avg Time vs Day/Week", type: "line" }]} />
          <Line
            type="monotone"
            dataKey="average_time"
            stroke="#4473EC"
            animationDuration={200}
            animationBegin={50}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResponseTime;
