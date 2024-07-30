import { useEffect, useState } from 'react';
import { Work, GroupingYearsMap, TableProps } from '../../service/types';
import { Spinner } from '../../spinner/Spinner';
import { ExpandingArrow } from './ExpandingArrow';
import { YearRows } from './YearRows';
import '../tables.css'

declare global {
    interface ObjectConstructor {
        typedKeys<T>(obj: T): Array<keyof T>
    }
}
Object.typedKeys = Object.keys as any

export const GroupingTable = ({data}:TableProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [tableData, setTableData] = useState<GroupingYearsMap>({});

    useEffect(() => {
        let cancel = false;
        let tableData: GroupingYearsMap = {}, workList = data;
        
        workList.sort(compareByDate);
        
        workList.forEach((work) => {
            let workDate = new Date(work.workingDate),
                dateFormatter = new Intl.DateTimeFormat("ru"),
                numberFormatter = new Intl.NumberFormat("ru"),
                year:number = workDate.getFullYear(),
                month: number = workDate.getMonth(),
                tempRow = {
                    id: work.id,
                    title: work.title,
                    objectName: work.objectName,
                    workingDate: dateFormatter.format(workDate),
                    sumPlan: numberFormatter.format(work.sumPlan),
                    sumFact: numberFormatter.format(work.sumFact),
                    month: workDate.toLocaleString("default", { month: "long" }),
                    monthNumber: month,
                };

            if (!tableData[year]) {
                tableData[year] = {
                    months: {},
                    isExpand:false
                }
            }

            if (!tableData[year].months[month]) {
                tableData[year].months[month] = {
                    rows: [],
                    isExpand:false
                }
            }

            tableData[year].months[month].rows = [...tableData[year].months[month].rows, tempRow];
        });
        
        setTableData(tableData);
        setIsLoading(false);

      return () => {
        cancel = true;
      };
    }, []);

    if (isLoading) {
        return <Spinner/>;
    }

    const handleExpandBlock = (type: string, year: number, month?: number | undefined) => {
        let data = { ...tableData };

        switch (type) {
            case 'year':
                data[year].isExpand = !data[year].isExpand;
                break;
            case 'month':
                if (month !== undefined) {
                    data[year].months[month].isExpand = !data[year].months[month].isExpand;
                }
                break;
            default:
                return;
        }

        setTableData(data);
    }

    return (
        <div className="table-container">
            <div className="table-head">
                <div className="table-row table-header-row table-row-title grouping-table-header-row">
                    <li className="item-cell">Год</li>
                    <li className="item-cell">Месяц</li>
                    <li className="item-cell"></li>
                    <li className="item-cell">Объект</li>
                    <li className="item-cell">Вид работ</li>
                    <li className="item-cell">Дата</li>
                    <li className="item-cell">Сумма план</li>
                    <li className="item-cell">Сумма факт</li>
                </div>
            </div>
            <div className="table-body">
                {Object.typedKeys(tableData).map((year) => {
                    return (
                        <>
                            <div key={year} className="table-row grouping-table-year-row">
                                <li className="item-cell">{year}</li>
                                <li className="item-cell"></li>
                                <li className="item-cell year-arrow-cell">
                                    <ExpandingArrow
                                        isExpand={tableData[year].isExpand}
                                        value={year}
                                        handleClick={()=>handleExpandBlock('year',year)}
                                    />
                                </li>
                                <li className="item-cell"></li>
                            </div>

                            { tableData[year].isExpand ? <YearRows months={tableData[year].months} year={year} expandMonth={handleExpandBlock}/>: null }
                        </>
                    );
                })}
            </div>
        </div>
    )
}

const compareByDate = (a: Work, b: Work) => {
    let dateA = new Date(a.workingDate),
        yearA = dateA.getFullYear(),
        monthA = dateA.getMonth(),
        dayA = dateA.getDay(),
        dateB = new Date(b.workingDate),
        yearB = dateB.getFullYear(),
        monthB = dateB.getMonth(),
        dayB = dateB.getDay();
    
    if (yearA < yearB) {
      return -1;
    }
    if (yearA > yearB) {
      return 1;
    }
  
    if (yearA === yearB) {
      if (monthA < monthB) {
        return -1;
      }
      if (monthA > monthB) {
        return 1;
        }
        
        if (monthA === monthB) {
            if (dayA < dayB) {
              return -1;
            }
            if (dayA > dayB) {
              return 1;
            }
          }
    }

    return 0;
};