import { getProductCollections } from "api";
import { Dispatch } from "store";
import { RecommendProductsState } from "./reducer";

export const CHANGE_RECOMMEND_PRODUCT = "change_recommend_product";

interface ChangeRecommendProductsAction {
  type: typeof CHANGE_RECOMMEND_PRODUCT;
  payload: Partial<RecommendProductsState>;
}

export type RecommendProductsAction = ChangeRecommendProductsAction;

export const changeRecommendProductsActionCreator = (
  payload: Partial<RecommendProductsState>
): ChangeRecommendProductsAction => {
  return {
    type: CHANGE_RECOMMEND_PRODUCT,
    payload,
  };
};

export const fetchRecommendProductsActionCreator = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(changeRecommendProductsActionCreator({ loading: true }));
      const productList = await getProductCollections();
      dispatch(
        changeRecommendProductsActionCreator({
          loading: false,
          productList,
          error: null,
        })
      );
    } catch (e: any) {
      dispatch(
        changeRecommendProductsActionCreator({
          loading: false,
          error: e.message,
        })
      );
    }
  };
};
