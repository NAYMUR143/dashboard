import styled from "@emotion/styled";
import Sidebar from "../../components/dashboard/sidebar/Navbar";
import Image from "next/image";
import Link from "next/link";
import logo from "../../components/images/logo.svg";
import { Box } from "@mui/system";
import CreateProject from "../../components/dashboard/create-project";

import React from "react";

import { Avatar, Menu, Dropdown } from "antd";
import {
  UserOutlined,
  SolutionOutlined,
  LockOutlined,
  TranslationOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import { Button } from "@mui/material";

const Main = styled.main`
  background: #303030;
  padding: 30px;
  height: 100%;
  color: #fff;
`;

const Dashboardsc = styled.div`
  width: 100%;
  position: relative;
`;

const widgetMenu = (
  <Menu>
    <Menu.Item>
      <SolutionOutlined className="icon" />
      profile
    </Menu.Item>
    <Menu.Item>
      <LockOutlined className="icon" />
      change password
    </Menu.Item>
    <Menu.Item>
      <TranslationOutlined className="icon" />
      change language
    </Menu.Item>
    <Menu.Item>
      <PoweroffOutlined className="icon" />
      sign out
    </Menu.Item>
  </Menu>
);
export default function layout() {
  return (
    <Main>
      <Dashboardsc>
        <Sidebar activeBtn={1} heading={"Dashboard"} />
        <Box
          sx={{
            display: "grid",
            placeItems: "center",

            height: "100vh",
            width: "100%",
          }}
        >
          <h1>Hey don't ignore me, I'm the dashboard</h1>
          <Button
            type="submit"
            sx={{
              width: "100%",
              background: "linear-gradient(180deg, #04fcbc 0%, #40fd8f 100%)",
              borderRadius: "8px",
              color: "#000",
              fontSize: "1.2em",
              textTransform: "capitalize",
              padding: "8px 0px",
              transition: "0.3s",
              fontWeight: "500",
              margin: "10px 0px",
              "&:hover ": {
                background: "linear-gradient(180deg, #40fd8f 0%, #04fcbc 100%)",
                cursor: "pointer",
              },
            }}
          >
            Initialize
          </Button>
        </Box>

        {/* <CreateProject /> */}
      </Dashboardsc>
    </Main>
  );
}
