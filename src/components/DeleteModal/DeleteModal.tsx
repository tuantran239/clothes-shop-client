import React from 'react'
import useAlert from '@App/hooks/useAlert'
import { Col, Container, Row } from 'react-bootstrap'
import { useMutation } from 'react-hooks-axios'
import ButtonCustom from '@App/components/ButtonCustom'
import { handleError } from '@App/utils'

interface PropsType {
  url: string
  title?: string
  buttonText?: string
  onCompleted?: () => void
  handleClose: () => void
}

const DeleteModal = ({
  url,
  handleClose,
  title = 'Are you sure delete this item?',
  onCompleted,
  buttonText = 'Delete'
}: PropsType) => {
  const { mutationCallback } = useMutation()
  const [deleteMutation, { loading }] = mutationCallback()

  const alert = useAlert()

  const onDeleteHandler = () => {
    deleteMutation({
      url,
      method: 'delete',
      onCompleted() {
        alert.successToast('Delete successfully!')
        handleClose()
        if (onCompleted) {
          onCompleted()
        }
      },
      onError(error) {
        alert.errorModal(handleError(error))
      }
    })
  }

  return (
    <Container className="p-4 text-center">
      <Row>
        <Col>
          <h3>{title}</h3>
          <div className="gap-2 mt-5">
            <ButtonCustom
              onClick={onDeleteHandler}
              loading={loading}
              textloading="Handling..."
              disabled={loading}
              variant="danger"
            >
              { buttonText }
            </ButtonCustom>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default DeleteModal
