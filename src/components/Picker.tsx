import { useCallback } from "react";
import { HexColorPicker } from "react-colorful";
import { useSnapshot } from "valtio";
import state from "../store";

export function Picker() {
    const snap = useSnapshot(state)
    const componentName = snap.selected;
    const onColorChange = useCallback((color: string) => {
      if (!snap.selected) return;
      if (!componentName) return;
      state.items[componentName] = color;
    }, [snap, componentName]);
    return (
      <div hidden={!snap.showPicker}>
        <HexColorPicker
          onChange={onColorChange}
          className="picker"
          color={"#ffffff"}
        />
        <h1 style={{textTransform: "capitalize"}}>{componentName}</h1>
      </div>
    )
  }