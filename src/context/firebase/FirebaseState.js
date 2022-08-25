import React, {useReducer} from "react";
import axios from "axios";
import { FirebaseContext } from "./firebaseContext";
import { firebaseReducer } from "./firebaseReducer";
import { ADD_NOTE, DONE_NOTE, EDIT_NOTE, FETCH_NOTES, REMOVE_NOTE, SHOW_LOADER } from "../types";

const url = 'https://react-todo-2d8ac-default-rtdb.firebaseio.com';
//process.env.REACT_APP_DB_URL

export const FirebaseState = ({children}) => {
    const initialState = {
        notes: [],
        loading: false
    }
    const [state, dispatch] = useReducer(firebaseReducer, initialState)

    const showLoader = () => dispatch({type: SHOW_LOADER})

    const fetchNotes = async () => {
        showLoader()
        const res = await axios.get(`${url}/notes.json`)

        const payload = Object.keys(res.data).map( key => {
            return {
                ...res.data[key],
                id:key
            }
        })

        dispatch({type: FETCH_NOTES, payload})
    }

    const addNote = async title => {
        const note = {
            title, date: new Date().toJSON(), done: false
        }

        try {
            const res = await axios.post(`${url}/notes.json`, note)
            
            const payload = {
                ...note,
                id: res.data.name
            }

            dispatch({
                type: ADD_NOTE,
                payload
            })
        } catch (e) {
            throw new Error(e.message)
        }
    }

    const removeNote = async id => {
        try {
            await axios.delete(`${url}/notes/${id}.json`)

            dispatch({
                type: REMOVE_NOTE,
                payload: id
            })
        } catch (e) {
            throw new Error(e.message)
        } 
    }

    const editNote = async (id, title, date = new Date().toJSON()) => {
        /*const note = {
            title,
            date: new Date().toJSON()
        }*/
        try {
            const res = await axios.put(`${url}/notes/${id}.json`, {title, date})
            
            /*const payload = {
                ...note,
                id: res.data.name,
               
            }*/

            /*dispatch({
                type: EDIT_NOTE,
                payload
            })*/

        } catch (e) {
            throw new Error(e.message)
        }
    }

    const stateOfNote = async (id, done) => {
        const note = {
            done
        }

        try {
            const res = await axios.put(`${url}/notes/${id}/done.json`, done)
            
            const payload = {
                ...note,
                done: res.data.done
            }

            dispatch({
                type: DONE_NOTE,
                payload
            })
        } catch (e) {
            throw new Error(e.message)
        }
    }

    return (
        <FirebaseContext.Provider value={{showLoader, addNote, removeNote, fetchNotes, editNote, stateOfNote, loading: state.loading, notes: state.notes}}>
            {children}
        </FirebaseContext.Provider>
    )
}