import React, { useEffect, useState } from "react";
import styles from "./Header.module.scss";
import logo from "assets/logo.svg";
import { Dropdown, Input, Layout, Typography, Menu, Button } from "antd";
import { GlobalOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "store/hooks";
import { useDispatch } from "react-redux";
import {
  addLanguageActionCreator,
  changeLanguageWithEffectActionCreator,
} from "store/language/languageActions";
import { useTranslation } from "react-i18next";
import { Dispatch } from "store";
import jwt_decode, { JwtPayload as DefaultJwtPayload } from "jwt-decode";
import { userSliceActions } from "store/user/slice";

interface JwtPayload extends DefaultJwtPayload {
  username: string;
}

interface MatchParams {
  keywords: string;
}

export const Header: React.FC = () => {
  const history = useHistory();
  const { t } = useTranslation();

  const { keywords } = useParams<MatchParams>();

  const language = useSelector((state) => state.language.language);
  const languageList = useSelector((state) => state.language.languageList);

  const { items: shoppingCartItems, loading: shoppingCartLoading } =
    useSelector((state) => state.shoppingCart);

  console.log(shoppingCartItems);

  const { token } = useSelector((state) => state.user);
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (token != null) {
      const jwt = jwt_decode<JwtPayload>(token);
      setUsername(jwt.username);
    }
  }, [token]);

  // const dispatch = useDispatch<Dispatch<LanguageActionTypes>>();
  const dispatch = useDispatch<Dispatch>();

  const menuClickHandler = (e: any) => {
    if (e.key === "new") {
      // 新语言添加
      dispatch(addLanguageActionCreator("新语言", "new_lang"));
    } else {
      dispatch(changeLanguageWithEffectActionCreator(e.key));
    }
  };

  const onLogout = () => {
    dispatch(userSliceActions.logOut());
    history.push("/");
  };

  return (
    <div className={styles["app-header"]}>
      {/* top header */}
      <div className={styles["top-header"]}>
        <div className={styles.inner}>
          <Typography.Text>{t("header.slogan")}</Typography.Text>
          <Dropdown.Button
            style={{ marginLeft: 15 }}
            overlay={
              <Menu onClick={menuClickHandler}>
                {languageList.map((l) => (
                  <Menu.Item key={l.code}>{l.name}</Menu.Item>
                ))}
                <Menu.Item key="new">{t("header.add_new_language")}</Menu.Item>
              </Menu>
            }
            icon={<GlobalOutlined />}
          >
            {language === "zh" ? "中文" : "English"}
          </Dropdown.Button>
          {token != null ? (
            <Button.Group className={styles["button-group"]}>
              <span>
                {t("header.welcome")}
                <Typography.Text>{username}</Typography.Text>
              </span>
              <Button
                loading={shoppingCartLoading}
                onClick={() => history.push("/shoppingCart")}
              >
                {t("header.shoppingCart")}({shoppingCartItems.length})
              </Button>
              <Button onClick={onLogout}>{t("header.signOut")}</Button>
            </Button.Group>
          ) : (
            <Button.Group className={styles["button-group"]}>
              <Button onClick={() => history.push("/register")}>
                {t("header.register")}
              </Button>
              <Button onClick={() => history.push("/signIn")}>
                {t("header.signin")}
              </Button>
            </Button.Group>
          )}
        </div>
      </div>
      <Layout.Header className={styles["main-header"]}>
        <span onClick={() => history.push("/")}>
          <img src={logo} alt="logo" className={styles["App-logo"]} />
          <Typography.Title level={3} className={styles.title}>
            {t("header.title")}
          </Typography.Title>
        </span>
        <Input.Search
          defaultValue={keywords}
          placeholder="请输入旅游目的地、主题或关键字"
          className={styles["search-input"]}
          onSearch={(keywords) => {
            history.push(`/search/${keywords}`);
          }}
        />
      </Layout.Header>
      <Menu mode="horizontal" className={styles["main-menu"]}>
        <Menu.Item key="1"> {t("header.home_page")} </Menu.Item>
        <Menu.Item key="2"> {t("header.weekend")} </Menu.Item>
        <Menu.Item key="3"> {t("header.group")} </Menu.Item>
        <Menu.Item key="4"> {t("header.backpack")} </Menu.Item>
        <Menu.Item key="5"> {t("header.private")} </Menu.Item>
        <Menu.Item key="6"> {t("header.cruise")} </Menu.Item>
        <Menu.Item key="7"> {t("header.hotel")} </Menu.Item>
        <Menu.Item key="8"> {t("header.local")} </Menu.Item>
        <Menu.Item key="9"> {t("header.theme")} </Menu.Item>
        <Menu.Item key="10"> {t("header.custom")} </Menu.Item>
        <Menu.Item key="11"> {t("header.study")} </Menu.Item>
        <Menu.Item key="12"> {t("header.visa")} </Menu.Item>
        <Menu.Item key="13"> {t("header.enterprise")} </Menu.Item>
        <Menu.Item key="14"> {t("header.high_end")} </Menu.Item>
        <Menu.Item key="15"> {t("header.outdoor")} </Menu.Item>
        <Menu.Item key="16"> {t("header.insurance")} </Menu.Item>
      </Menu>
    </div>
  );
};
