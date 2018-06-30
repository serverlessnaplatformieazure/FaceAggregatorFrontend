import { TreeElement } from "../../../imagemanagement/components/shared/TreeElement";

export interface IPathSelectorData
{
    Elements: Array<TreeElement>;    
    IsMultiSelect: boolean;
    ViewHeader: string;
}