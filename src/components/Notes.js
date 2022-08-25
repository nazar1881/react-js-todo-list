import React, { useContext, useState } from "react";
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import Note from "./Note";

export const Notes = ({notes, onRemove, onEditNote, stateOfNote}) =>  {

    /*{
                            
        editMode === true 
        ? <div>
            <input placeholder="Edit note" onChange={onInputChange}></input> 
            <button onClick={() => {onEditNote(note.id, note.title) 
            setEditMode(true)}}>Save</button>
        </div>
        : <strong onDoubleClick={setEditMode(true)}>{note.title}</strong>
        }*/
   
    return (
    <TransitionGroup component="ul" className="list-group">
        {notes.map(note => (
            <CSSTransition key={note.id} classNames={'note'} timeout={800}>
                <Note note={note} onRemove={onRemove} onEditNote={onEditNote} stateOfNote={stateOfNote}/>
            </CSSTransition>
        ))}
    </TransitionGroup>
)}