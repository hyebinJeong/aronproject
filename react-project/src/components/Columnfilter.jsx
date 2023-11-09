const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;

  const handleFilterChange = (e) => {
    const value = e.target.value || undefined; // 빈 문자열을 undefined로 변경
    setFilter(value); // 필터 값 설정
};

  return (
      <input style={{'display' : 'none'}}
          value={filterValue || ''}
          onChange={handleFilterChange}
          placeholder={`Search ${column.Header}`}
      />
  );
};

export default ColumnFilter;