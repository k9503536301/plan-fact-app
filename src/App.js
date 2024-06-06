import { useState } from "react";
import GroupingTable from "./groupingTable";
import CumulitiveTable from "./cumulitiveTable";
import FetchData from "./fetchData";

const App = () => {
  const [data, setData] = useState([]);

  const handleChange = fetchedData => {
    let tempData = fetchedData.map(el => {
      let jobDate = new Date(el.jobDate);
      el.jobYear = jobDate.getFullYear();
      el.jobMonth = jobDate.toLocaleString("default", { month: "long" });
      el.jobMonthNumber = jobDate.getMonth();
      el.sumFact = parseInt(el.sumFact);
      el.sumPlan = parseInt(el.sumPlan);

      return el;
    });

    tempData.sort(compareByYear);

    let cumulativeTotalFact = 0,
      cumulativeTotalPlan = 0;
    tempData = tempData.map(el => {
      cumulativeTotalFact += el.sumFact;
      cumulativeTotalPlan += el.sumPlan;
      el.cumulativeTotalFact = cumulativeTotalFact;
      el.cumulativeTotalPlan = cumulativeTotalPlan;

      return el;
    });
    setData(tempData);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <FetchData onChange={handleChange} />
      <div style={{ paddingTop: "30px" }}>
        {data.length > 0 ? <GroupingTable data={data} /> : null}
      </div>

      <div style={{ paddingTop: "50px" }}>
        {data.length > 0 ? <CumulitiveTable data={data} /> : null}
      </div>
    </div>
  );
};

const compareByYear = (a, b) => {
  if (a.jobYear < b.jobYear) {
    return -1;
  }
  if (a.jobYear > b.jobYear) {
    return 1;
  }

  if (a.jobYear === b.jobYear) {
    if (a.jobMonthNumber < b.jobMonthNumber) {
      return -1;
    }
    if (a.jobMonthNumber > b.jobMonthNumber) {
      return 1;
    }
  }
  return 0;
};

export default App;
