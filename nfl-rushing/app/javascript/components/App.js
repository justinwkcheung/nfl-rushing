import React from "react";
import { useTable, useFilters, useSortBy, usePagination } from 'react-table'
import "./styles.scss";

const App = (props) => {
  console.log(props);

  const data = props.players;

  function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    const count = preFilteredRows.length

    return (
      <input
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
        }}
        placeholder={`Search players`}
        className="search-players"
      />
    )
  }
  
  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  )

  const columns = React.useMemo(
    () => [
      {
        Header: 'Player',
        accessor: row => `${row.first_name} ${row.last_name}`,
        disableSortBy: true,
      },
      {
        Header: 'Team',
        accessor: 'team',
        disableSortBy: true,
        disableFilters: true,
      },
      {
        Header: 'Pos',
        accessor: 'position',
        disableSortBy: true,
        disableFilters: true,
      },
      {
        Header: 'Att',
        accessor: 'att',
        disableSortBy: true,
        disableFilters: true,
      },
      {
        Header: 'Att/G',
        accessor: 'att_per_g',
        disableSortBy: true,
        disableFilters: true,
      },
      {
        Header: 'Yds',
        accessor: 'yds',
        disableFilters: true,
      },
      {
        Header: 'Avg',
        accessor: 'yds_avg',
        disableSortBy: true,
        disableFilters: true,
      },
      {
        Header: 'Yds/G',
        accessor: 'yds_per_g',
        disableSortBy: true,
        disableFilters: true,
      },
      {
        Header: 'TD',
        accessor: 'td',
        disableFilters: true,
      },
      {
        Header: 'Lng',
        accessor: 'lng',
        disableFilters: true,
      },
      {
        Header: '1st',
        accessor: 'first',
        disableSortBy: true,
        disableFilters: true,
      },
      {
        Header: '1st%',
        accessor: 'first_percentage',
        disableSortBy: true,
        disableFilters: true,
      },
      {
        Header: '20+',
        accessor: 'twenty_yard_carries',
        disableSortBy: true,
        disableFilters: true,
      },
      {
        Header: '40+',
        accessor: 'fourty_yard_carries',
        disableSortBy: true,
        disableFilters: true,
      },
      {
        Header: 'FUM',
        accessor: 'fum',
        disableSortBy: true,
        disableFilters: true,
      },
    ],
    []
  );

  const tableInstance = useTable({ columns, data, defaultColumn, initialState: { pageIndex: 0 }, }, useFilters, useSortBy, usePagination );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageCount,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    state: { pageIndex, pageSize },
  } = tableInstance;

  return (
    <div>
      <pre>
        <code>
          {JSON.stringify(
            {
              pageSize,
              pageIndex,
              pageCount,
              canNextPage,
              canPreviousPage,
            },
            null,
            2
          )}
        </code>
      </pre>
      <h1 className="title">NFL Rushing Stats</h1>
      <table {...getTableProps()}>
        <thead>
          {
          headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
              headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.canFilter ? column.render('Filter') : null}
                    {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {
          page.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {
                row.cells.map(cell => {
                  return (
                    <td {...cell.getCellProps()}>
                      {
                      cell.render('Cell')}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>

      <div className="pagination">
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {`<`}
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {`>`}
        </button>
      </div>
    </div>
  )
}

export default App;