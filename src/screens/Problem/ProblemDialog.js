import React, { useState, useRef, useEffect } from 'react'
import { useForm } from 'react-hook-form'
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
} from '@chakra-ui/react'

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

  const [ problem, setProblem ] = useState(DEFAULT_PROBLEM)
  const [ choices, setChoices ] = useState([])

  const initialRef = useRef()

  const handleCloseDialog = () => {
    setChoices([])
    setProblem(DEFAULT_PROBLEM)
    props.handleClose()
  }


  return (
    <Modal initialFocusRef={initialRef} isOpen={open} onClose={handleCloseDialog} size={'lg'}>
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
                      choices[index] = e.target.value
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
                choices.push(DEFAULT_CHOICE)
                setChoices([...choices])
              }}
            >
              Add Choice
            </Button>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button colorscheme='teal' mr={3}>
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