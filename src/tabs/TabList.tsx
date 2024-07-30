import { Children, ReactNode, ReactElement, useState, useMemo } from "react";

import { TabItemProps } from "./TabItem";
import './tabs.css';

export type TabListProps = {
    children?: ReactNode;
}

export const TabList = ({ children }: TabListProps) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const allChildrens = useMemo(
        () =>
          Children.map(
            children,
            (item) => (item as ReactElement<TabItemProps>)?.props?.children
          ),
        [children]
    );
    
    return (
        <>
            <div className='tabs'>
                {Children.map(children, (item, index) => (
                    <div
                        key={index}
                        className={ index === activeIndex ? 'tab is-tab-selected' : 'tab' }
                        onClick={() => {setActiveIndex(index);}}
                    >
                        {(item as ReactElement<TabItemProps>)?.props?.title}
                    </div>
                ))}
            </div>
            <div className="tab-content">
                {allChildrens?.[activeIndex]}
            </div>
        </>
    );
}