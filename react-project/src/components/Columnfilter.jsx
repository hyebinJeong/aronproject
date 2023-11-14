import { useEffect } from "react";

const ColumnFilter = ({ column, selectedColumn, searchTerm }) => {
  const { filterValue, setFilter } = column;

  const handleFilterChange = (e) => {
    const value = e.target.value || undefined; // 빈 문자열을 undefined로 변경
    setFilter(value); // 필터 값 설정
};

useEffect(() => {
  if (column.id === selectedColumn) {
      setFilter(searchTerm || '');
  }
}, [selectedColumn, column.id, searchTerm]);

// console.log('id :', column.id)
// console.log('col :', selectedColumn)
// console.log('term :', searchTerm)
console.log(filterValue)

  return (
      <input 
      style={{'display' : 'none'}}
          value={filterValue || ''}
          onChange={handleFilterChange}
          placeholder={`Search ${column.Header}`}
      />
  );
};

export default ColumnFilter;