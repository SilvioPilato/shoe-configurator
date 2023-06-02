import { proxy } from "valtio";

const state: AppState = {
    items: {
      laces: "#ffffff",
      mesh: "#1a3f63",
      caps: "#000000",
      inner: "#ffffff",
      sole: "#d4ff00",
      stripes: "#07ff83",
      band: "#ffffff",
      patch: "#ffffff",
    },
    selected: null,
    showPicker: false,
}

export type AppState  = {
    items: Record<ShowItemType, string>;
    selected: ShowItemType | null;
    showPicker: boolean;
}
export type ShowItemType = 'laces' | 'mesh' | 'caps' | 'inner' | 'sole' | 'stripes' | 'band' | 'patch';
export type ShoeItems = typeof state.items;
export default proxy<AppState>(state);