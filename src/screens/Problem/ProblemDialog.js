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

  const [ problem, setProblem ] = useState({...DEFAULT_PROBLEM})
  const [ choices, setChoices ] = useState([])
  const toast = useToast()
  const initialRef = useRef()

  const handleCloseDialog = () => {
    setChoices([])
    setProblem({...DEFAULT_PROBLEM})
    props.handleClose()
  }

  const addProblem = async () => {
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
        <ModalHeader>Add a new problem</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6} >
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
        </ModalBody>
        <ModalFooter>
          <Button 
            colorscheme='teal' 
            mr={3}
            onClick={addProblem}
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
}

export default ProblemDialog