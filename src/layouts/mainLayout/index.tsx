import React, { PropsWithChildren } from "react";
import styles from "./index.module.scss";
import { Header, Footer } from "components";

export function MainLayout({ children }: PropsWithChildren<{}>) {
  return (
    <>
      <Header />
      <div className={styles["page-content"]}>{children}</div>
      <Footer />
    </>
  );
}
