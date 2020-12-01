import React from 'react'
import Fontawesome from 'react-fontawesome'

const Rating = ({ value, text, color }) => {
  console.log(value)
  console.log(value >= 3.5)
  return (
    <div className='rating'>
      <span>
        <Fontawesome
          style={{ color }}
          name={
            value >= 1
              ? 'star'
              : value >= 0.5
              ? 'star-half-empty'
              : 'star-o'
          }
        />
      </span>
      <span>
        <Fontawesome
          style={{ color }}
          name={
            value >= 2
              ? 'star'
              : value >= 1.5
              ? 'star-half-empty'
              : 'star-o'
          }
        />
      </span>
      <span>
        <Fontawesome
          style={{ color }}
          name={
            value >= 3
              ? 'star'
              : value >= 2.5
              ? 'star-half-empty'
              : 'star-o'
          }
        />
      </span>
      <span>
        <Fontawesome
          style={{ color }}
          name={
            value >= 4
              ? 'star'
              : value >= 3.5
              ? 'star-half-empty'
              : 'star-o'
          }
        />
      </span>
      <span>
        <Fontawesome
          style={{ color }}
          name={
            value >= 5
              ? 'star'
              : value >= 4.5
              ? 'star-half-empty'
              : 'star-o'
          }
        />
      </span>
      <span>{text && text}</span>
    </div>
  )
}

Rating.defaultProps = {
  color: '#f8e825',
}

export default Rating
