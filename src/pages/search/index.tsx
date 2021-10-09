import React, { useEffect } from "react";
import styles from "./index.module.scss";
import { Header, Footer, FilterArea, ProductList, Boundary } from "components";
import { useParams } from "react-router-dom";
import { searchProduct } from "store/productSearch/slice";
import { useSelector } from "store/hooks";
import { useDispatch } from "react-redux";
import { Dispatch } from "store";

interface MatchParams {
  keywords: string;
}

export function SearchPage() {
  const { keywords } = useParams<MatchParams>();
  const { loading, pagination, error, data } = useSelector(
    (state) => state.productSearch
  );

  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    dispatch(searchProduct({ nextPage: 1, pageSize: 10, keywords }));
  }, [dispatch, keywords]);

  const onPageChange = (nextPage: number, pageSize: number) => {
    console.log(nextPage, pageSize);
    dispatch(searchProduct({ nextPage, pageSize, keywords }));
  };

  return (
    <Boundary
      loading={loading}
      error={error}
      render={() => (
        <>
          <Header />
          <div className={styles["page-content"]}>
            {/* 分类过滤器 */}
            <div className={styles["product-list-container"]}>
              <FilterArea />
            </div>
            {/* 产品列表 */}
            <div className={styles["product-list-container"]}>
              <ProductList
                data={data}
                paging={pagination}
                onPageChange={onPageChange}
              />
            </div>
          </div>
          <Footer />
        </>
      )}
    />
  );
}
