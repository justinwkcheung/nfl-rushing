import React from "react";
import { useTable, useFilters, useSortBy, usePagination } from 'react-table'
import { CSVLink } from "react-csv";
import "./styles.scss";

const App = (props) => {
  const data = props.players;

  const getExportableData = (tableInstance) => {
    const filteredData = tableInstance.filteredRows.map((filteredRow) => {
      return filteredRow["values"];
    })

    return filteredData;
  }

  const getAllData = (tableInstance) => {
    const filteredData = tableInstance.preFilteredRows.map((filteredRow) => {
      return filteredRow["values"];
    })

    return filteredData; 
  }

  function DefaultColumnFilter({
    column: { filterValue, setFilter },
  }) {

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
        accessor: row => row.team,
        disableSortBy: true,
        disableFilters: true,
      },
      {
        Header: 'Pos',
        accessor: row => row.position,
        disableSortBy: true,
        disableFilters: true,
      },
      {
        Header: 'Att',
        accessor: row => row.att,
        disableSortBy: true,
        disableFilters: true,
      },
      {
        Header: 'Att/G',
        accessor: row => row.att_per_g,
        disableSortBy: true,
        disableFilters: true,
      },
      {
        Header: 'Yds',
        accessor: row => row.yds,
        disableFilters: true,
      },
      {
        Header: 'Avg',
        accessor: row => row.yds_avg,
        disableSortBy: true,
        disableFilters: true,
      },
      {
        Header: 'Yds/G',
        accessor: row => row.yds_per_g,
        disableSortBy: true,
        disableFilters: true,
      },
      {
        Header: 'TD',
        accessor: row => row.td,
        disableFilters: true,
      },
      {
        Header: 'Lng',
        accessor: row => row.lng,
        disableFilters: true,
      },
      {
        Header: '1st',
        accessor: row => row.first,
        disableSortBy: true,
        disableFilters: true,
      },
      {
        Header: '1st%',
        accessor: row => row.first_percentage,
        disableSortBy: true,
        disableFilters: true,
      },
      {
        Header: '20+',
        accessor: row => row.twenty_yard_carries,
        disableSortBy: true,
        disableFilters: true,
      },
      {
        Header: '40+',
        accessor: row => row.fourty_yard_carries,
        disableSortBy: true,
        disableFilters: true,
      },
      {
        Header: 'FUM',
        accessor: row => row.fum,
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
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    state: { pageIndex, pageSize },
  } = tableInstance;

  return (
    <div>
      <h1 className="title">NFL Rushing Stats</h1>

      <div className="export-buttons">
        <CSVLink data={getExportableData(tableInstance)} filename="nfl-rushing.csv">Download Filtered Stats</CSVLink>
        <CSVLink data={getAllData(tableInstance)} filename="nfl-rushing.csv">Download All Stats</CSVLink>
      </div>

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