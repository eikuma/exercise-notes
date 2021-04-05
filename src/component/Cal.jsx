import Calendar from "react-calendar"
import React, { useState } from 'react'

const Cal = () => {
    const [value, onChange]=useState(new Date())

    return(
        <Calendar
        locale="ja-JP"
        onChange={onChange}
        value={value}
        />
    )
}

export default Cal

