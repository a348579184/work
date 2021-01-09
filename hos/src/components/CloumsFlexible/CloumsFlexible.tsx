import React from 'react'
import { Resizable } from 'react-resizable';
import './index.less'
export const ResizeableTitle = props => {
    const { onResize, width, ...restProps } = props;
    if (!width) {
      return <th {...restProps} />;
    }  
    return (
      <Resizable
        width={width}
        height={0}
        handle={
          <span
            className="react-resizable-handle"
            onClick={e => {
              e.stopPropagation();
            }}
          />
        }
        onResize={onResize}
        draggableOpts={{ enableUserSelectHack: false }}
      >
        <th {...restProps} />
      </Resizable>
    );
  };
export const handleResize = (context,index,columnName,state) => (e, { size }) => {
    console.log(111)
    context.setState((obj) => {
      let column = obj[columnName]
      const nextColumns = [...column];
      nextColumns[index] = {
        ...nextColumns[index],
        width: parseInt(size.width),
      };
      return { [columnName]: nextColumns };
    });
  };
export const columns = (state,handlecallback,columnName,context)=>{
   return state[columnName].map((col, index) => ({
        ...col,
        onHeaderCell: column => ({
          width: column.width,
          onResize: handlecallback(context,index,columnName,state),
        }),
      }));
}



