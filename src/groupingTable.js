import { useState, useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

import { Stack } from "@mui/material";
import DemoRadioGroup from "./demoRadioGroup";

const GroupingTable = props => {
  let data = props.data;

  const columns = useMemo(
    () => [
      {
        accessorKey: "objectName",
        header: "Объект",
      },
      {
        accessorKey: "jobName",
        header: "Вид работ",
      },

      {
        accessorKey: "jobDate",
        header: "Дата",
      },
      {
        accessorKey: "sumPlan",
        header: "Сумма план",
      },
      {
        accessorKey: "sumFact",
        header: "Сумма факт",
      },
      {
        accessorKey: "jobYear",
        header: "Год",
      },
      {
        accessorKey: "jobMonth",
        header: "Месяц",
      },
    ],
    []
  );

  const [groupedColumnMode, setGroupedColumnMode] = useState("reorder");

  const table = useMaterialReactTable({
    columns,
    data,
    enableGrouping: true,
    groupedColumnMode,
    initialState: {
      expanded: true, //expand all groups by default
      grouping: ["jobYear", "jobMonth"], //an array of columns to group by by default (can be multiple)
      pagination: { pageIndex: 0, pageSize: 20 },
    },
    muiTableContainerProps: { sx: { maxHeight: "800px" } },
  });

  return (
    <Stack gap="1rem">
      <DemoRadioGroup
        groupedColumnMode={groupedColumnMode}
        setGroupedColumnMode={setGroupedColumnMode}
      />
      <MaterialReactTable table={table} />
    </Stack>
  );
};

export default GroupingTable;
