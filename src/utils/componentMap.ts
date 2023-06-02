import { ShowItemType } from "../store";

const componentMap: ShoeItemMap = {
    shoe:"laces",
    shoe_1:"mesh",
    shoe_2:"caps",
    shoe_3:"inner",
    shoe_4:"sole",
    shoe_5:"stripes",
    shoe_6:"band",
    shoe_7:"patch",
}

export type ShoeComponent = 'shoe' | 'shoe_1' | 'shoe_2' | 'shoe_3' | 'shoe_4' | 'shoe_5' | 'shoe_6' | 'shoe_7';
export type ShoeItemMap = Record<ShoeComponent, ShowItemType>;
export default componentMap;