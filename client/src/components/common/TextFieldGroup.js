import React from 'react'
import Proptypes from 'prop-types'
import classnames from 'classnames'

const TextFieldGroup = ({
  name,
  placeholder,
  type,
  value,
  label,
  info,
  error,
  onChange,
  disabled

}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        className={classnames('form-control form-control-lg', {
        'is-invalid': error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && (<small className='form-text text-muted'>{info}</small>)}
      {error && (<div className='invalid-feedback'>{error}</div>)}
    </div>
  )
}

TextFieldGroup.propTypes = {
  name: Proptypes.string.isRequired,
  value: Proptypes.string.isRequired,
  disabled: Proptypes.string,
  placeholder: Proptypes.string,
  type: Proptypes.string.isRequired,
  onChange: Proptypes.func.isRequired,
  error: Proptypes.string,
  label: Proptypes.string,
  info: Proptypes.string,
}

TextFieldGroup.defaultProps = {
  type:'text'
}

export default TextFieldGroup
