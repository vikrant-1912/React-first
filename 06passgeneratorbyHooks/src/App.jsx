import { useState , useCallback , useEffect, useRef } from 'react'


function App() {
  const [length , setLength] = useState(8)
  
  const [ numberAllowed , setNumberAllowed] = useState(false);

  const [ charAllowed , setCharAllowed] = useState(false);
  
  const [ password , setPassword] = useState("");

//useRef Hook 
const passwordRef = useRef(null)  

  // useCallback (() => {} , [])  // ()func , []dependencies//
  const passwordGenerator = useCallback( () => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "! @ # $ % ^ & * ( ) - _ = + \\ | { } ; : / ? . >."
      
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    } 

    setPassword(pass)

    
  } , [length, numberAllowed , charAllowed ])

  const copyPasswordToClipboard = useCallback( () => {
    passwordRef.current?.select() 
    window.navigator.clipboard.writeText(password)
  } ,[password])

    
// useEffect (() => {} , [])  
useEffect (() => { passwordGenerator()
  
} , [length , numberAllowed , charAllowed, passwordGenerator])

  return ( 
    <>  
     
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center my-3'> Password Generator </h1>
              <div className='className="flex shadow rounded-lg overflow-hidden mb-4"'>

                <input 
                type='text'
                value={password}
                className='outline-none w-full py-1 px-3'
                placeholder='password'
                readOnly

                 />
 
                 <button 
                 onClick={copyPasswordToClipboard}
                 className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'> Copy </button>
              </div> 
              <div className='flex text-sm gap-x-2'>
                <div className='flex items-center gap-x-1'>
                  <input type="range"
                  min={6}
                  max={100}
                  value={length}
                  onChange={(e) => {setLength (e.target.value)}}
                  className='cursor-pointer'


                  />
                  <label>length: {length} </label>

                </div>
                <div className='flex items-center gap-x-1'> 
                  <input 
                  type="checkbox"
                  defaultChecked={numberAllowed}
                  onChange={ () => {
                    setNumberAllowed((prev) => !prev);   // agr prev value h to reverse krdo
                  }}   
                 />
                 <label> Numbers </label> 
                </div>
                <div className='flex items-center gap-x-1'>
                   <input 
                  type="checkbox"
                  defaultChecked={numberAllowed}
                  onChange={ () => {
                    setNumberAllowed((prev) => !prev);
                  }}   
                 />
                 <label> Characters </label> 

                </div>
              </div>
      </div>
 

        

    </>
  )
}


export default App
