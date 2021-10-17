import React, { useState, useEffect } from 'react'
import { 
  Flex, 
  Text,
} from '@chakra-ui/react'
import firebase from 'firebase'

import ProblemViewSidebar from './ProblemViewSidebar'
import ProblemViewTable from './ProblemViewTable'
import ProblemDialog from './ProblemDialog'

const ProblemView = props => {
  const [refresh, setRefresh] = useState(false)
  const [dialog, setDialog] = useState({
    open: false,
    data: null,
    state: 'create',
  })

  const handleOpenAddDialog = () => {
    setDialog({
      open: true,
      data: null,
      state: 'create'
    })
  }

  const handleEditDialog = () => {
    setDialog({
      open: true,
      data: null,
      state: 'edit'
    })
  }

  const handleDeleteDialog = () => {
    setDialog({
      open: true,
      data: null,
      state: 'delete'
    })
  }

  const handleCloseDialog = () => {
    setDialog({
      open: false,
      data: null,
    })
    setRefresh(false)
  }
  
  const [problemData, setProblemData] = useState([]);

  useEffect(() => {
    //get all the data from the choices and store it inside of an array
    //get all the questions data, compare IDs
    const queryProblems = async () => {
      //const snapshotc = await firebase.firestore().collection('choice').get()

      // let choices = []
      // snapshotc.forEach((doc) => {
      //   choices.push({
      //     "id": doc.id,
      //     "isAnswer": doc.data().isAnswer,
      //     "choiceText": doc.data().choiceText
      //   })
      // })


      const snapshot = await firebase.firestore().collection('questions').get()
      let questions = []
      snapshot.forEach((doc)=>{
        //const c = doc.data().choices
        //let choice_t = []
        //c.map((c1)=>{
          //choices.map((c2) => {
            //if(c2.id == c1.id){
              //choice_t.push({
                //"isAnswer": c2.isAnswer,
                //"choiceText": c2.choiceText
              //})
            //}
          //})
        //})
        questions.push({
          "id": doc.id,
          "correctAnswer": doc.data().correctAnswer,
          "difficulty": doc.data().difficulty,
          "question": doc.data().question,
          "choices": doc.data().choices,

        })

        console.log(questions)
      })


      // snapshot.forEach((doc)=>{
      //   const c = doc.data().choices
      //   c.map((x)=>{
      //     console.log("hello", x.id)
      //   })

      // })

      setProblemData(questions)
      
    }
    queryProblems();
  },[refresh])

  // useEffect(() => {
  //   const queryProblems = async () => {
  //     const snapshot = await firebase.firestore().collection('question').get()
  //     let questions = []
  //     snapshot.forEach((doc) => {
  //       questions.push({
  //           "id": doc.id,
  //           "createdAt": doc.data().createdAt ? doc.data().createdAt.toDate() :"" ,
  //           "difficulty": doc.data().difficulty,
  //           "question": doc.data().question,
  //           "choices": doc.data().choices,
  //       })
  //   })
  //     setProblemData(questions)
      
  //   }
  //   queryProblems();
  // },[refresh])

  

  return (
    <Flex>
      <ProblemViewSidebar 
        handleOpenAddDialog={handleOpenAddDialog}
        handleOpenEditDialog={handleEditDialog}
        handleOpenDeleteDialog = {handleDeleteDialog}
      />
      <Flex align={'left'} direction={'column'} grow={1}>
        <ProblemViewTable pdata = {problemData}/>
      </Flex>
      <ProblemDialog
        dialog={dialog}
        handleClose={handleCloseDialog}
        setRefresh={setRefresh}
        
      />
    </Flex>
  )
}

export default ProblemView