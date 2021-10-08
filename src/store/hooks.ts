import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from "react-redux";
import { RootState } from ".";

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
