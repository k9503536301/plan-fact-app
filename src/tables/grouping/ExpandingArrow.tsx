type Props = {
    isExpand: boolean,
    value:number,
    handleClick: (value:number) => void
}
export const ExpandingArrow = ({isExpand, value, handleClick}:Props) => {

    return (
        <span style={{cursor: 'pointer'}} onClick={()=>handleClick(value)}>
            {/* <svg focusable="false" aria-hidden="true" aria-expanded="false" viewBox='0 0 24 24 ' className='expanding-button' style={{transform:`rotate(0deg)`}}>
                <path d="M16.59 8.59 12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
            </svg> */}

            <svg className='expanding-button' style={isExpand ? {transform:'rotate(90deg)'} : {transform:'rotate(0deg)'}} viewBox="0 0 5 9" >
                <path d="M0.419,9.000 L0.003,8.606 L4.164,4.500 L0.003,0.394 L0.419,0.000 L4.997,4.500 L0.419,9.000 Z" />
            </svg>
        </span>
    );
}