import { MonthRows } from './MonthRows';
import { GroupingMonthsMap } from '../../service/types';
import { ExpandingArrow } from './ExpandingArrow';
import '../tables.css'

type Props = {
    months: GroupingMonthsMap,
    year: number,
    expandMonth: (type:string, year:number, month:number | undefined) => void
}

export const YearRows = ({ months, year, expandMonth }: Props) => {

    return (
        <>
            {Object.typedKeys(months).map((monthNumber) => {
                const { rows, isExpand } = months[monthNumber];

                return (
                    <>
                        <div key={months.toString() + rows[0].id} className="table-row grouping-table-month-row">
                            <li className="item-cell"></li>
                            <li className="item-cell">{rows[0].month}</li>
                            <li className="item-cell month-arrow-cell">
                                <ExpandingArrow
                                    isExpand={isExpand}
                                    value={monthNumber}
                                    handleClick={(month: number)=>expandMonth('month', year, month)}
                                />
                            </li>
                            <li className="item-cell"></li>
                        </div>

                        {isExpand  ? <MonthRows rows={rows}/> : null}
                    </>
                );
            })}
        </>
    )
}