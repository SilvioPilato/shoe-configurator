import React, { useCallback } from "react";
import { HexColorPicker } from "react-colorful";
import { useSnapshot } from "valtio";
import state, { ShowItemType } from "../store";
import componentMap from "../utils/componentMap";

export function Picker() {
    const snap = useSnapshot(state)
    const componentName: ShowItemType | null = snap.selected ? componentMap[snap.selected] : null;
    const onColorChange = useCallback((color) => {
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
        <h1>{componentName}</h1>
      </div>
    )
  }