import React from 'react'

const Foote = () => {
  return (
    <div className={`text-center text-sm text-gray-500 py-4 flex-1`}>
        &copy; {new Date().getFullYear()} Phoenix Firelight. All rights reserved.
    </div>
  )
}

export default Foote;