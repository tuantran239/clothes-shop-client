import React, { ButtonHTMLAttributes, Fragment } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { Variant } from 'react-bootstrap/esm/types'

interface JSXElement extends React.ReactElement<any> {}
type Element = JSXElement | null

interface PropsType extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: Element
  variant: Variant
  block: boolean
  loading?: boolean
  children: React.ReactNode
}

const ButtonCustom = ({
  children,
  icon: Icon,
  className,
  variant,
  type,
  block,
  loading,
  onClick,
  disabled
}: PropsType) => {
  return (
    <Fragment>
      {block && (
        <div className="d-grid gap-2">
          <Button
            className={className}
            variant={variant}
            type={type}
            onClick={onClick}
            disabled={disabled}
          >
            <span>
              {Icon && !loading && <i>{Icon}</i>}{' '}
              {loading && (
                <>
                  <Spinner size="sm" animation="border" variant="light" />{' '}
                  Loading...
                </>
              )}
              {!loading && children}
            </span>
          </Button>
        </div>
      )}
      {!block && (
        <Button
          className={className}
          variant={variant}
          type={type}
          onClick={onClick}
          disabled={disabled}
        >
          <span>
            {Icon && !loading && <i>{Icon}</i>}
            {loading && (
              <>
                <Spinner size="sm" animation="border" variant="light" />{' '}
                Loading...
              </>
            )}
            {!loading && children}
          </span>
        </Button>
      )}
    </Fragment>
  )
}

export default ButtonCustom
