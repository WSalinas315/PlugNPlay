import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

function ViewSettings (){

  const [ newItem, setNewItem ] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // write reducer, saga, and PUT route to db
  }

  return (
    
    <div>
    <h1>Settings</h1>
    Change Profile Picture 
    <form onSubmit={handleSubmit}>
        <input
            className="input"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Edit "
         />
    <div>
      <img src="image-url" alt="image" />
    </div>
         <div align="center">
            <button type='submit'>
              Edit
            </button>
          </div>
    </form>
    </div>
 )
}


export default ViewSettings