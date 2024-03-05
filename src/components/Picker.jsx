import { HexColorPicker } from "react-colorful"
import { useSnapshot } from "valtio"

export function Picker({ state }) {
    const snap = useSnapshot(state)
    return (
        <div style={{ display: snap.current ? "block" : "none", position: 'absolute', top: 20, left: 20 }}>
            <HexColorPicker className="picker" color={snap.items[snap.current]} onChange={(color) => (state.items[snap.current] = color)} />
            <h1>{snap.current}</h1>
        </div>
    )
}