import React, { useState, useContext } from "react";
import { AlertContext } from "../context/alert/alertContext";
import { FirebaseContext } from "../context/firebase/firebaseContext";

export const Form = () => {
    const [value, setValue] = useState(''); 
    const alert = useContext(AlertContext)
    const firebase = useContext(FirebaseContext)

    const submitHandler = event => {
        event.preventDefault()

        if(value.trim()) {
            firebase.addNote(value.trim()).then(() => {
                alert.show('Note was created', 'success')
            }).catch(() => {
                alert.show('Something wrong', 'danger')
            })
            ///alert.show('Note was created', 'success')
            /*firebase.removeNote(value.trim()).then(() => {
                alert.show('Note was removed', 'danger')
            }).catch(() => {
                alert.show('Something wrong', 'danger')
            })*/
            setValue('')
        } else {
            alert.show('Enter text')
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <div className="form-group">
                <input type="text" className="form-control" placeholder="Enter your note text" value={value} onChange={e => setValue(e.target.value)}/>
            </div>
        </form>
    )
}