import { ReactNode } from "react"

export type Work = {
    id: string,
    objectName: string,
    title: string,
    workingDate: string,
    sumFact: number,
    sumPlan: number
}

export type TableProps = {
    data: Work[]
}

export type GroupingYearsMap = {
    [year: number]: {
        months: GroupingMonthsMap,
        isExpand: boolean
    }
}
export type GroupingMonthsMap = {
    [month:number]: {
        rows: TableDataRow[],
        isExpand: boolean
    }
}

export type TableDataRow = { [key: string]: string | number };

type Data = {
    workList: Work[];
};

export function assertIsData(data: unknown): asserts data is Data {
    if (typeof data !== 'object') {
      throw new Error("Data isn't an object");
    }
    if (data === null) {
      throw new Error('Data is null');
    }
    if (!('workList' in data)) {
      throw new Error("data doesn't contain workList");
    }
}
  
export interface TabProps {
    label: string;
    children: ReactNode;
  }