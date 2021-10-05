import React from "react";
import styles from "./SideMenu.module.scss";
import { sideMenuList } from "./mockup";
import { Menu } from "antd";
import { GifOutlined } from "@ant-design/icons";

export const SideMenu: React.FC = () => {
  return (
    <Menu mode="vertical" className={styles["side-menu"]}>
      {sideMenuList.map((menu, index) => (
        <Menu.SubMenu
          key={`side-menu-${index}`}
          title={
            <span>
              <GifOutlined />
              {menu.title}
            </span>
          }
        >
          {menu.subMenu.map((sm, smIndex) => (
            <Menu.SubMenu
              key={`sub-menu-${index}-${smIndex}`}
              title={
                <span>
                  <GifOutlined />
                  {sm.title}
                </span>
              }
            >
              {sm.subMenu.map((sms, smsIndex) => (
                <Menu.Item key={`sub-sub-menu-${index}-${smIndex}-${smsIndex}`}>
                  <span>
                    <GifOutlined />
                    {sms}
                  </span>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ))}
        </Menu.SubMenu>
      ))}
    </Menu>
  );
};
