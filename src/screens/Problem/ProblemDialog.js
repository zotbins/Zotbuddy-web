import React, { useState, useRef, useEffect } from 'react'
import { 
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Select,
  Stack,
  Textarea,
  Checkbox,
  Divider,
  useToast
} from '@chakra-ui/react'
import firebase from 'firebase'
//test texxt

const DEFAULT_PROBLEM = {
  difficulty: 'EASY',
  questionText: '',
}

const DEFAULT_CHOICE = {
  choiceText: '',
  isAnswer: false,
}

const ProblemDialog = props => {
  const { dialog } = props
  const { open, data, state } = dialog
  const difficulies = ['EASY', 'MEDIUM', 'HARD']

  const [editFlag, setEditFlag] = useState(false)
  const [id, setId] = useState(0)
  const [ problem, setProblem ] = useState({...DEFAULT_PROBLEM})
  const [ choices, setChoices ] = useState([])
  const [difficulty, setDifficulty] = useState("")
  const [question, setQuestion] =useState("")
  const [createdat, setCreatedAt] = useState(new Date())

  const toast = useToast()
  const initialRef = useRef()

  useEffect(() => {
    setId('')
    setChoices([])
    setDifficulty('')
    setQuestion('')
    setCreatedAt(new Date())
}, [dialog.open])

  const handleCloseDialog = () => {
    setChoices([])
    setEditFlag(false)
    setProblem({...DEFAULT_PROBLEM})
    props.handleClose()
  }

  const handleEditFill = async () => {

    if (id != '') {
        setEditFlag(true);
        const snapshotc = await firebase.firestore().collection('choice').get()

        let temp_choice = []
        snapshotc.forEach((doc) => {
          temp_choice.push({
            "id": doc.id,
            "isAnswer": doc.data().isAnswer,
            "choiceText": doc.data().choiceText
          })
        })

        const snapshot = await firebase.firestore().collection('question').doc(id).get().then((doc)=>{
          console.log("Id: ", id)
          const c = doc.data().choices
          let choice_t = []
          c.map((c1)=>{
            temp_choice.map((c2) => {
              if(c2.id == c1.id){
                choice_t.push({
                  "isAnswer": c2.isAnswer,
                  "choiceText": c2.choiceText
                })
              }
            })
          })
          setDifficulty(doc.data().difficulty)
          setQuestion(doc.data().question)
          setCreatedAt(doc.data().createdAt)
          setChoices(choice_t)
        })


    }
  }

  const editProblem = async() => {
    
    const db = firebase.firestore()
    console.log("I come to editing the problem")
    const choiceRefs = await Promise.all(choices.map((choice) => db.collection('choice').add({
      choiceText: choice.choiceText,
      isAnswer: choice.isAnswer,
    })))

    console.log("The new choices are ", choices)
    console.log("Difficult is ", difficulty, problem.difficulty)
    console.log("Question is ", question, problem.questionText)
    console.log("created at is ", createdat, problem.createdAt)

    const problemRef = await db.collection('question').doc(id).update({
        choices: [...choiceRefs],
        difficulty: difficulty,
        question: question,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        toast({
            title: 'Success',
            description: 'Edited event in Firebase',
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
    }).catch((error) => {
        toast({
            title: 'Error',
            description: 'An error occured while editing event in Firebase',
            status: 'error',
            duration: 3000,
            isClosable: true,
        })
    })
    setEditFlag(false)
    props.setRefresh(true)
    props.handleClose()

    //don't delete any choices, just make a new choice array
    //add the new choices to this question along with updating the function
  }

  const deleteProblem = async () => {
    const db = firebase.firestore()
    const eventRef = await db.collection('question').doc(id).delete().then(() => {
        toast({
            title: 'Success',
            description: 'Deleted event from Firebase',
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
    }).catch((error) => {
        toast({
            title: 'Error',
            description: 'An error occured while deleting event from Firebase',
            status: 'error',
            duration: 3000,
            isClosable: true,
        })
    })
    props.setRefresh(true)
    props.handleClose()
}

 
  const addProblem = async () => {
    console.log("I come to add the Problem")
    const db = firebase.firestore()
    
    const choiceRefs = await Promise.all(choices.map((choice) => db.collection('choice').add({
      choiceText: choice.choiceText,
      isAnswer: choice.isAnswer,
    })))
    //TODO: Need to delete choiceRefs if add problem mutation fails to run...

    const problemRef = await db.collection('question').add({
      choices: [...choiceRefs],
      difficulty: problem.difficulty,
      question: problem.questionText,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    let difficultyRef = null
    switch (problem.difficulty) {
      case 'EASY':
        difficultyRef = await db.collection('difficulty').doc('XMitd2yPoQx1HALi1LtH').update({
          easyArray: firebase.firestore.FieldValue.arrayUnion(problemRef),
          easyArraySize: firebase.firestore.FieldValue.increment(1),
        })
        break
      case 'MEDIUM':
        difficultyRef = await db.collection('difficulty').doc('XMitd2yPoQx1HALi1LtH').update({
          mediumArray: firebase.firestore.FieldValue.arrayUnion(problemRef),
          mediumArraySize: firebase.firestore.FieldValue.increment(1),
        })
        break
      case 'HARD':
        difficultyRef = await db.collection('difficulty').doc('XMitd2yPoQx1HALi1LtH').update({
          hardArray: firebase.firestore.FieldValue.arrayUnion(problemRef),
          hardArraySize: firebase.firestore.FieldValue.increment(1),
        })
        break
      default:
        break
    }
    toast({
      title: choiceRefs && problemRef && difficultyRef ? 'Success' : 'Error',
      description:  choiceRefs && problemRef && difficultyRef  ? 'Added problem to Firebase' : 'An error occured while adding problem to Firebase',
      status: choiceRefs && problemRef && difficultyRef  ? 'success': 'error',
      duration: 3000,
      isClosable: true,
    })

    props.handleClose()
    
  }

  return (
    <Modal initialFocusRef={initialRef} isOpen={open} onClose={handleCloseDialog} size={'lg'} >
      <ModalOverlay />
            <ModalContent>
              <ModalHeader> 
              {(() => {
                        switch (state) {
                            case "create": return "Add a new problem";
                            case "edit": return "Edit an existing problem";
                            case "delete": return "Delete an existing problem";
                            default: return "ERROR";
                        }
                    })()}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6} >
                {(state == "create") ?
                  <Stack>
                    <Select
                      isRequired
                      value={problem.difficulty}
                      onChange={e => {
                        problem.difficulty = e.target.value
                        setProblem({...problem})
                      }}
                    >
                      {difficulies.map((difficulty, index) => {
                        return (
                          <option key={index} value={difficulty}>
                            {difficulty}
                          </option>
                        )
                      })}
                    </Select>
                    <Textarea
                      value={problem.questionText}
                      onChange={e => { 
                        problem.questionText = e.target.value
                        setProblem({...problem})
                      }}
                      placeholder={'Enter the question text for this problem'}
                      size={'lg'}
                    />
                    {choices.map((choice, index) => {
                      return (
                        <Flex key={index} direction={'column'} >
                          <Divider orientation='horizontal' colorScheme={'gray'}/>
                          <Checkbox 
                            colorScheme='teal'
                            size={'lg'}
                            isChecked={choice.isAnswer}
                            onChange={() => {
                              choices[index].isAnswer = !choices[index].isAnswer
                              setChoices([...choices])
                            }}
                            style={{ marginLeft: 'auto' }}
                          >
                            Answer
                          </Checkbox>
                          <Textarea
                            value={choice.choiceText}
                            onChange={e => { 
                              choices[index].choiceText = e.target.value
                              setChoices([...choices])
                            }}
                            placeholder={'Enter the text for this choice'}
                            size={'lg'}
                          />
                        </Flex>
                      )
                    })}
                    <Button 
                      colorscheme='teal'
                      onClick={() => {
                        choices.push({...DEFAULT_CHOICE})
                        setChoices([...choices])
                      }}
                    >
                      Add Choice
                    </Button>
                  </Stack>
                  : (state == "edit") ?
                      <Stack>
                        <Textarea
                            value={id}
                            onChange={e => {
                                setId(e.target.value)
                            }}
                            placeholder={'Enter the ID of the event to edit'}
                            size={'lg'}
                        />
                        <Button onClick={handleEditFill}>
                            Enter
                        </Button>
                        {(editFlag == true) ?
                          <>
                            <Select
                              isRequired
                              value={problem.difficulty}
                              onChange={e => {
                                problem.difficulty = e.target.value
                                setDifficulty(e.target.value)
                                setProblem({...problem})
                              }}
                            >
                              {difficulies.map((difficulty, index) => {
                                return (
                                  <option key={index} value={difficulty}>
                                    {difficulty}
                                  </option>
                                )
                              })}
                            </Select>
                            <Textarea
                              value={problem.questionText}
                              onChange={e => { 
                                problem.questionText = e.target.value
                                setQuestion(e.target.value)
                                setProblem({...problem})
                              }}
                              placeholder={'Enter the question text for this problem'}
                              size={'lg'}
                            />
                            {choices.map((choice, index) => {
                              return (
                                <Flex key={index} direction={'column'} >
                                  <Divider orientation='horizontal' colorScheme={'gray'}/>
                                  <Checkbox 
                                    colorScheme='teal'
                                    size={'lg'}
                                    isChecked={choice.isAnswer}
                                    onChange={() => {
                                      choices[index].isAnswer = !choices[index].isAnswer
                                      setChoices([...choices])
                                    }}
                                    style={{ marginLeft: 'auto' }}
                                  >
                                    Answer
                                  </Checkbox>
                                  <Textarea
                                    value={choice.choiceText}
                                    onChange={e => { 
                                      choices[index].choiceText = e.target.value
                                      setChoices([...choices])
                                    }}
                                    placeholder={'Enter the text for this choice'}
                                    size={'lg'}
                                  />
                                </Flex>
                              )
                            })}
                            <Button 
                              colorscheme='teal'
                              onClick={() => {
                                choices.push({...DEFAULT_CHOICE})
                                setChoices([...choices])
                              }}
                            >
                              Add Choice
                            </Button>
                          </>:
                          <></>
                      }
                      </Stack>
                  : (state == "delete") ?
                      <Stack>
                        <Textarea
                            value={id}
                            onChange={e => {
                                setId(e.target.value)
                            }}
                            placeholder={'Enter the ID of the event to delete'}
                            size={'lg'}
                        />
                      </Stack>
                  : <Stack></Stack>
                    }
              </ModalBody>
              <ModalFooter>
              <Button
                colorscheme='teal'
                mr={3}
                onClick={(() => {
                    switch (state) {
                        case "create": return addProblem;
                        case "edit": return editProblem;
                        case "delete": return deleteProblem;
                        default: return;
                    }
                })()}
            >
                Save
                    </Button>
                <Button onClick={handleCloseDialog}>
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
    </Modal>
  )

  // return (
  //   <Modal initialFocusRef={initialRef} isOpen={open} onClose={handleCloseDialog} size={'lg'} >
  //     <ModalOverlay />
  //     <ModalContent>
  //       <ModalHeader>Add a new problem</ModalHeader>
  //       <ModalCloseButton />
        // <ModalBody pb={6} >
        //   <Stack>
        //     <Select
        //       isRequired
        //       value={problem.difficulty}
        //       onChange={e => {
        //         problem.difficulty = e.target.value
        //         setProblem({...problem})
        //       }}
        //     >
        //       {difficulies.map((difficulty, index) => {
        //         return (
        //           <option key={index} value={difficulty}>
        //             {difficulty}
        //           </option>
        //         )
        //       })}
        //     </Select>
        //     <Textarea
        //       value={problem.questionText}
        //       onChange={e => { 
        //         problem.questionText = e.target.value
        //         setProblem({...problem})
        //       }}
        //       placeholder={'Enter the question text for this problem'}
        //       size={'lg'}
        //     />
        //     {choices.map((choice, index) => {
        //       return (
        //         <Flex key={index} direction={'column'} >
        //           <Divider orientation='horizontal' colorScheme={'gray'}/>
        //           <Checkbox 
        //             colorScheme='teal'
        //             size={'lg'}
        //             isChecked={choice.isAnswer}
        //             onChange={() => {
        //               choices[index].isAnswer = !choices[index].isAnswer
        //               setChoices([...choices])
        //             }}
        //             style={{ marginLeft: 'auto' }}
        //           >
        //             Answer
        //           </Checkbox>
        //           <Textarea
        //             value={choice.choiceText}
        //             onChange={e => { 
        //               choices[index].choiceText = e.target.value
        //               setChoices([...choices])
        //             }}
        //             placeholder={'Enter the text for this choice'}
        //             size={'lg'}
        //           />
        //         </Flex>
        //       )
        //     })}
        //     <Button 
        //       colorscheme='teal'
        //       onClick={() => {
        //         choices.push({...DEFAULT_CHOICE})
        //         setChoices([...choices])
        //       }}
        //     >
        //       Add Choice
        //     </Button>
        //   </Stack>
        // </ModalBody>
  //       <ModalFooter>
  //         <Button 
  //           colorscheme='teal' 
  //           mr={3}
  //           onClick={addProblem}
  //         >
  //           Save
  //         </Button>
  //         <Button onClick={handleCloseDialog}>
  //           Cancel
  //         </Button>
  //       </ModalFooter>
  //     </ModalContent>
  //   </Modal>
  // )
}

export default ProblemDialog