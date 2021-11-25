import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context'
import { useDictionary } from '../../hooks/dictionary.hook'
import Button from '../UI/button/Button'

export default function FormColor({column, enableDefaultColors, ...props}) {
    const {lang} = useContext(AuthContext)
    const [columnColor, setColumnColor] = useState(column.colorColumn)
    const [taskColor, setTaskColor] = useState(column.colorTask)
    const words = useDictionary(lang)

    return (
        <form {...props}> 
            <div className='wrapper'>
                <div className='input-wrapper'>
                    <input 
                        type="color" 
                        name="colorColumn" 
                        id="list" 
                        value={columnColor} 
                        onChange={(e) => setColumnColor(e.target.value)} 
                    />
                    <label htmlFor="list">{words.colorColumn}</label>
                </div>
                <div className='input-wrapper'>
                    <input 
                        type="color" 
                        name="colorTask" 
                        id="task" 
                        value={taskColor}
                        onChange={(e) => setTaskColor(e.target.value)} 
                    />
                    <label htmlFor="task">{words.colorTask}</label>
                </div>
                <div style={{display:'flex', flexDirection: 'column', gap: 5}}>
                    <Button type='submit'>{words.apply}</Button>
                    <Button type='button' onClick={enableDefaultColors}>{words.default}</Button>
                </div>
            </div>
        </form>
    )
}
