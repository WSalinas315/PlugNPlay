import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

function ViewSettings (){
let newItem= "test"

  return (
    
    <div>
    <h1>Settings</h1>
    (edit) 
    <form onSubmit={(event) => handleSubmit(event)}>
        <input
            className="input"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Edit "
         />
    </form>
    </div>
 )
}


export default ViewSettings