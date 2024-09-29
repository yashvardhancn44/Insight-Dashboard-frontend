import { useEffect, useState } from "react";
import { getAIData } from "../../mock_backend/index";
import { AIDATA } from "../../mock_backend/types";
import CategoryDistribution from "./components/CategoryDistribution";
import "./app.css";
import ResponseTime from "./components/ResponseTime";
import UsageStatistics from "./components/UsageStatistics";
import UserSatisfaction from "./components/UserSatisfaction";

function App() {
  const [aiData, setAiData] = useState<AIDATA>();
  // console.log("aidata", aiData?.category_distribution);
  useEffect(() => {
    // getting data from mock-backend
    const getData = async () => {
      const response = await getAIData()
        .then((data) => data)
        .catch((err) => console.log(err));
      setAiData(response as AIDATA);
    };

    getData();
  }, []);
  return (
    <div className="app">
      <h1>Insight Dashboard</h1>
      <div className="graphs">
        <CategoryDistribution
          category_distribution={aiData?.category_distribution}
        />
        <ResponseTime response_times={aiData?.response_times} />
        <UsageStatistics usage_statistics={aiData?.usage_statistics} />
        <UserSatisfaction user_satisfaction={aiData?.user_satisfaction} />
      </div>
    </div>
  );
}

export default App;
