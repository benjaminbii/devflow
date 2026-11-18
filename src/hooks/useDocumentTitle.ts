import { useEffect } from "react";


/** Each route sets its own title so browser tabs and history entries are meaningful. */
export function useDocumentTitle(title: string){
    useEffect(()=>{
        document.title = title;

    },[title])
}