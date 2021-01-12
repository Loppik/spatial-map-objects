import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Table as ReactVirtualizedTable, Column } from 'react-virtualized';
import useWindowSize from '../../hooks/useWindowSize';

const TextArea = styled.textarea`
  width: 90%;
  resize: none;
`
const Square = styled.div`
  width: 36px;
  height: 36px;
  opacity: 0.35;
  background: ${props => props.color}
`
const Flex = styled.div`
  display: flex;
`
const NameInput = styled.input`
  width: 90%;
  height: 30px;
`
const ColorInput = styled.input`
  width: calc(90% - 35px);
  margin-left: 5px
`

const DateCell = ({ cellData }) => cellData && `${cellData.getDate()}.${cellData.getMonth()+1}.${cellData.getFullYear()}`
const NameCell = ({ cellData, rowData, onChange }) => (
  <NameInput value={cellData} onChange={onChange(rowData.id)} />
)
const ColorCell = ({ cellData, rowData, onChange }) => (
  <Flex>
    <Square color={cellData} />
    <ColorInput value={cellData} onChange={onChange(rowData.id)} />
  </Flex>
)
const CommentCell = ({ cellData, rowData, onChange }) => (
  <TextArea value={cellData} onChange={onChange(rowData.id)} />
)

const Table = ({ polygons, onPolygonMouseOver, onPolygonMouseOut, hoveredPolygonId, changePolygon, setColorToMapPolygon }) => {
  const [width] = useWindowSize();
  const [columnWidth, setColumnWidth] = useState();

  useEffect(() => {
    setColumnWidth((width-100)/4)
  }, [width])

  const onChangeCell = (propertyName) => (polygonId) => (event) => {
    changePolygon(polygonId, propertyName, event.target.value);
  }
  const onChangeColor = (polygonId) => (event) => {
    const color = event.target.value;
    changePolygon(polygonId, 'color', color);
    setColorToMapPolygon(polygonId, color)
  }

  if (!polygons || !columnWidth) return null;
  return (
    <ReactVirtualizedTable
      width={width-100}
      height={300}
      headerHeight={20}
      rowHeight={40}
      rowCount={polygons.length}
      rowGetter={({index}) => polygons[index]}
      onRowMouseOver={({rowData}) => onPolygonMouseOver(rowData)}
      onRowMouseOut={({rowData}) => onPolygonMouseOut(rowData)}
      rowStyle={({index}) => (polygons[index] && polygons[index].id === hoveredPolygonId) ? {background: '#848484b5'} : {}}
      style={{margin: '20px auto'}}
    >
      <Column label="Date" dataKey="date" width={columnWidth} className="table-column" cellRenderer={DateCell} />
      <Column label="Name" dataKey="name" width={columnWidth} className="table-column" cellRenderer={(props) => <NameCell {...props} onChange={onChangeCell('name')} />} />
      <Column label="Color" dataKey="color" width={columnWidth} className="table-column" cellRenderer={(props) => <ColorCell {...props} onChange={onChangeColor} />} />
      <Column label="Comment" dataKey="comment" width={columnWidth} className="table-column" cellRenderer={(props) => <CommentCell {...props} onChange={onChangeCell('comment')} />} />
    </ReactVirtualizedTable>
  )
};

export default Table;
