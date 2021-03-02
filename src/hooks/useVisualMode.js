
import { useState } from "react";


export default function useVisualMode(initial) {

    const [history, setHistory] = useState([initial]);
    const mode = history[history.length-1] || initial;

    function transition(newmode, replace = false) {
        setHistory(replace ? [...history.slice(0,-1), newmode] : [...history, newmode])
    };

    function back() {
        if (history.length > 1) {
            setHistory(history.slice(0, -1))
        }
    };
    
    return {mode, transition, back};
};