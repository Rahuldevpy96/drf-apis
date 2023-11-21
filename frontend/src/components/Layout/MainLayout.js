import { Button, Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { BiMenu, BiX } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { AiOutlineLogout } from "react-icons/ai";
import { RxDashboard } from "react-icons/rx";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Topbar from "./Topbar";
import Cookies from "js-cookie";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const mainMenuItems = [
    {
      key: "product",
      icon: <RxDashboard />,
      label: "Product",
    },
    {
      key: "user",
      icon: <FiUsers />,
      label: "Users",
    },
  ];
  const mainMenuItems2 = [
    {
      key: "logout",
      icon: <AiOutlineLogout />,
      label: "Log Out",
    },
  ];

  const [toggleBar, setToggleBar] = useState(false);
  const [activeItem, setActiveItem] = useState(false);

  useEffect(() => {
    const currentPath = location.pathname.split("/")[1];
    console.log(currentPath)
    setActiveItem(currentPath || "dashboard");
  }, [location.pathname]);

  const handleMenuItemClick = (itemKey) => {
    if (itemKey === 'logout') {
        Cookies.remove('isAuthenticated');
        Cookies.remove('user');
        window.location.reload();
    } else {
        console.log(itemKey)
      setActiveItem(itemKey);
      navigate(`/${itemKey}`);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        className={toggleBar ? "hide_side_navbar" : "side_navbar"}
        style={{bottom: 0, top: 0}}
      >
        {/* <div className="demo-logo-vertical logo">
          <img src={Logo} alt="Logo" className="logo" />
        </div> */}
        <div className="side_bar_menu_list">
          <div className="sidebar_top">
            <Menu theme="dark" mode="inline" selectedKeys={[activeItem]}>
              {mainMenuItems.map((menuItem) => {
                if (menuItem.key === "user") {
                  return null;
                }
                return (
                  <Menu.Item
                    key={menuItem.key}
                    icon={menuItem.icon}
                    onClick={() => handleMenuItemClick(menuItem.key)}
                  >
                    {menuItem.label}
                  </Menu.Item>
                );
              })}
            </Menu>
          </div>
          <div className="sidebar_bottom">
          <Menu theme="dark" mode="inline" selectedKeys={[activeItem]}>
              {mainMenuItems2.map((menuItem) => (
                <Menu.Item
                  key={menuItem.key}
                  icon={menuItem.icon}
                  onClick={() => handleMenuItemClick(menuItem.key)}
                >
                  {menuItem.label}
                </Menu.Item>
              ))}
            </Menu>
            <hr />

          </div>
        </div>
      </Sider>
      <Layout className={toggleBar ? "hide_body_layout" : "body_layout"}>
        <Header
          className="fixed-header"
          style={{
            padding: 0,
            minHeight: 65,
          }}
        >
          <Button
            type="text"
            className="header_toggle_btn"
            icon={
              toggleBar ? (
                <BiX className="icons" />
              ) : (
                <BiMenu className="icons" />
              )
            }
            onClick={() => setToggleBar(!toggleBar)}
          />
          <Topbar />
        </Header>
        <Content
          // className="body_content"
          style={{
            // margin: "24px 24px",
            padding: 24,
            minHeight: 100,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
