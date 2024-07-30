import { useLoaderData, Await } from "react-router-dom";
import { Suspense } from 'react';

import { assertIsData } from "../service/types"
import { CumulativeTable } from "./cumulative/Cumulativetable";
import { GroupingTable } from "./grouping/GroupingTable";
import { TabList } from "../tabs/TabList";
import { TabItem } from "../tabs/TabItem";

export const Table = () => {
  const data = useLoaderData();
  assertIsData(data);

  return (
    <Suspense fallback={<div>Fetching...</div>}>
      <Await resolve={data.workList}>
        {(workList) => {
          return (
            <div style={{ margin: '30px 20px' }}>
              <TabList>
                <TabItem title="Сводная таблица нарастающим итогом">
                  <CumulativeTable data={workList} />
                </TabItem>

                <TabItem title="Группировка по месяцам">
                  <GroupingTable data={workList} />
                </TabItem>
              </TabList>
            </div>
          );
        }}
      </Await>
    </Suspense>
  );
}