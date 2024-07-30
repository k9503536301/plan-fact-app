import { useEffect, useState } from 'react';
import { Work, TableDataRow, TableProps } from '../../service/types';
import { Spinner } from '../../spinner/Spinner';
import '../tables.css'

export const CumulativeTable = ({ data }: TableProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [tableData, setTableData] = useState<TableDataRow[]>([]);

    let sumPlan: number = 0, sumFact: number = 0, workList = data;
    
    workList.sort(compareByDate);
    useEffect(() => {
        let cancel = false;
        let tempData: TableDataRow[] = workList.map((work) => {
            sumFact += work.sumFact;
            sumPlan += work.sumPlan;

            let workDate = new Date(work.workingDate),
                dateFormatter = new Intl.DateTimeFormat("ru"),
                numberFormatter = new Intl.NumberFormat("ru");
                
                return {
                    id: work.id,
                    title: work.title,
                    objectName: work.objectName,
                    workingDate: dateFormatter.format(workDate),
                    sumPlan: numberFormatter.format(sumPlan),
                    sumFact: numberFormatter.format(sumFact),
                    month: workDate.toLocaleString("default", { month: "long" }),
                    monthNumber: workDate.getMonth(),
                    year: workDate.getFullYear()
                };
        });
        setTableData(tempData);
        setIsLoading(false);

        return () => {
        cancel = true;
        };
    }, []);

    if (isLoading) {
        return <Spinner/>;
    }

    return (
        <div className="table-container">
            <div className="table-head">
                <div className="table-row table-row-title">
                    <li className="item-cell">Год</li>
                    <li className="item-cell">Месяц</li>
                    <li className="item-cell">Объект</li>
                    <li className="item-cell">Вид работ</li>
                    <li className="item-cell">Дата</li>
                    <li className="item-cell">Сумма план</li>
                    <li className="item-cell">Сумма факт</li>
                </div>
            </div>
            <div className="table-body">
                {tableData.map((item) => {
                    return (
                        <div key={item.id} className="table-row">
                            <li className="item-cell">{item.year}</li>
                            <li className="item-cell">{item.month}</li>
                            <li className="item-cell">{item.objectName}</li>
                            <li className="item-cell">{item.title}</li>
                            <li className="item-cell">{item.workingDate}</li>
                            <li className="item-cell">{item.sumFact}</li>
                            <li className="item-cell">{item.sumPlan}</li>
                        </div>
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