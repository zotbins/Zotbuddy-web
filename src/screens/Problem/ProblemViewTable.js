import React, { useState } from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { Route, Switch } from 'react-router-dom'
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import './GlobalFilter.js'
import './problem-table.css'
import firebase from 'firebase'
import { GlobalFilter } from './GlobalFilter';
import {format} from 'date-fns'
import { formatISO } from 'date-fns'


const COLUMN = [
 
    {
      Header: "Id",
      accessor: "id",
    },
    {
      Header: "Question",
      accessor: "question",
    },

    {
      Header: "Answer Choices",
      accessor: (values) => {
        var ch = ""
        var ctr= 0;
        values.choices.map((choice) => {
          if (ctr == 0){
            ch = ch + choice;
            ctr = 1;
          } else{
          ch = ch + " , " + choice;
        }
        })
        // values.choices.map((choice) => {
        //   if (choice.isAnswer === true){
        //     ch = ch + choice.choiceText + " ✅ \r\n"
        //   }else if(choice.choiceText === undefined || choice.choiceText === ""){
        //     console.log(choice.choiceText)
        //     ch = ch
        //   }
        //   else{
        //     ch = ch + choice.choiceText + " ❌ \
        //     "
        //   }
          
        // })
        return ch
      },
      width: 50,

    },

    {
      Header: "Difficulty",
      accessor: "difficulty",
    },

    
    {
      Header: "Correct Answer",
      accessor: "correctAnswer"
    }
]

const ProblemViewTable = (props) => {

  console.log(props.pdata[0])
  const tableInstance = useTable({
    columns: COLUMN,
    data: props.pdata
    }, useGlobalFilter, useSortBy)

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      prepareRow,
      state,
      setGlobalFilter
    } = tableInstance;

    const { globalFilter } = state

    const generateSortingIndicator = column => {
      return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""
    }

    return (
      <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <Flex>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render("Header")} {generateSortingIndicator(column)}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    
                    return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </Flex>
      </>
 
    )
  }


export default ProblemViewTable


