import React, { useContext, useEffect, useState } from "react";
import { AlertContext } from "../context/alert/alertContext";

const Note = ({ note, onRemove, onEditNote, stateOfNote }) => {
    const [editMode, setEditMode] = useState(false)
    const [value, setValue] = useState('')
    const alert = useContext(AlertContext)

    useEffect( () => {
        setValue(note.title);
    }, [note.title] );

    const onRemoveNote = (id) => {
        if (id) {
            onRemove(id).then(() => {
                alert.show('Note was deleted', 'danger')
            }).catch(() => {
                alert.show('Something wrong', 'danger')
            })
        }
    }

    const editedNote = (id, value) => {
        onEditNote(id, value).then(() => {
            alert.show('Note was edited')
        }).catch(() => {
            alert.show('Something wrong', 'danger')
        })
    } 

    const onInputChange = (e) => {
        setValue(e.target.value)
    }

    const toggleStateOfNote = (id, done) => {
        stateOfNote(id, done)
    }

    return (
        <li className="list-group-item note">
            <span onDoubleClick={() => setEditMode(true)}>
                {editMode ?
                    <div>
                        <input  onChange={onInputChange} value={value}></input>
                        <button onClick={() => {
                            editedNote(note.id, value)
                            setEditMode(false)
                        }}>Save</button>
                    </div>
                    : <strong>{value}</strong>}
                <small>{note.date}</small>
            </span>

            <div className="btns-wraper">
                {
                note.done 
                ? <button type="button" className="btn btn-outline-danger doneBtn" onClick={() => {toggleStateOfNote(note.id, false )}}>Not Done yet</button>
                : <button type="button" className="btn btn-outline-success doneBtn" onClick={() => {toggleStateOfNote(note.id, true )}}>Mark as Done</button>
                }
            
            <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => {
                onRemove(note.id)
                onRemoveNote(note.id)
            }}>&times;</button>
            </div> 
        </li>
    )
}

export default Note