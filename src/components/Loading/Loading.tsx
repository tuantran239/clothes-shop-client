import React from 'react'
import { ScaleLoader } from 'react-spinners'
import styled from 'styled-components'

const Container = styled.div`
  background-color: white;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
`

const Loading = () => {
  return (
    <Container>
      <ScaleLoader color="#36d7b7" />
    </Container>
  )
}

export default Loading
