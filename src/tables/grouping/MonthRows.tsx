import { TableDataRow } from "../../service/types";
import '../tables.css'

type Props = {
    rows: TableDataRow[]
}
export const MonthRows = ({rows}: Props) => {
    return (
        <>
            { rows.map((row) => {
                return (
                    <div key={row.id} className="table-row grouping-row">
                        <li className="item-cell"></li>
                        <li className="item-cell">{row.objectName}</li>
                        <li className="item-cell">{row.title}</li>
                        <li className="item-cell">{row.workingDate}</li>
                        <li className="item-cell">{row.sumPlan}</li>
                        <li className="item-cell">{row.sumFact}</li>
                    </div>
                );
            })}
        </>
            
    );    
};