import { RecommendProductsAction, CHANGE_RECOMMEND_PRODUCT } from "./actions";

export interface RecommendProductsState {
  productList: any[];
  loading: boolean;
  error: string | null;
}

const defaultState: RecommendProductsState = {
  productList: [],
  loading: true,
  error: null,
};

export default (state = defaultState, action: RecommendProductsAction) => {
  switch (action.type) {
    case CHANGE_RECOMMEND_PRODUCT:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
