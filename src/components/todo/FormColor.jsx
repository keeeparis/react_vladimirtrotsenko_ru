import React, { useState } from 'react'
import Button from '../UI/button/Button'

export default function FormColor({column, ...props}) {
    const [columnColor, setColumnColor] = useState(column.colorColumn)
    const [taskColor, setTaskColor] = useState(column.colorTask)

    return (
        <form {...props}>
            <div style={{display: 'flex', gap: 15}}>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <input 
                        type="color" 
                        name="colorColumn" 
                        id="list" 
                        value={columnColor} 
                        onChange={(e) => setColumnColor(e.target.value)} 
                    />
                    <label htmlFor="list">Фон списка</label>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <input 
                        type="color" 
                        name="colorTask" 
                        id="task" 
                        value={taskColor}
                        onChange={(e) => setTaskColor(e.target.value)} 
                    />
                    <label htmlFor="task">Фон задачи</label>
                </div>
                <Button>Change</Button>
            </div>
        </form>
    )
}
