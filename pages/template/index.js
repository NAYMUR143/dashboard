import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import Image from "next/image";
import shadow from "../../components/images/shadow.svg";
import { db } from "../../configfile/firebaseConfig";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  collection,
  doc,
  query,
  where,
  getDocs,
  collectionGroup,
} from "firebase/firestore";
import { Button } from "@mui/material";
import firstimg from "../../components/images/project1.png";
import Link from "next/link";
import TemplateHeader from "../../components/template/TemplateHeader";
import { Box } from "@mui/system";
import { async } from "@firebase/util";
import { useUserAuth } from "../../configfile/UserAuthContext";
import CryptoCanvas from "../../theme/CryptoCanvas";
import EtherEasel from "../../theme/EtherEasel";
import PixelVault from "../../theme/PixelVault";
import CryptoCanvasEditHome from "../../theme/CryptoCanvas/EditHomePage";
import { HomepagePreview } from "../../components/styles/homepage.styled";
import { H1 } from "../../components/dashboard/dashboard.styled";
import { Grid } from "@mui/joy";
const Main = styled.div`
  background: #252525;
  height: 100%;
`;
const Templatepage = styled.div`
  background: #fff;
  padding: 0px;
  position: relative;
`;
function TemplateIndex() {
  const { user, logOut } = useUserAuth();
  // console.log(user.email);
  const [tempalteId, setTempalteId] = useState();
  const queryUser = collection(db, "Users");
  // console.log(users);
  const emailData = user.email;
  console.log(emailData);
  async function handleGetData() {
    if (!emailData) return;

    const q = query(queryUser, where("Email", "==", emailData));
    const querySnapshot1 = await getDocs(q);

    if (!querySnapshot1.empty) {
      const autoId = querySnapshot1.docs[0].id;
      const subcollectionRef = collection(db, "Users", autoId, "editWebsite");
      const querySnapshot2 = await getDocs(subcollectionRef);
      const docs = querySnapshot2.docs.map((doc) => doc.data());
      docs.map((data) => {
        setTempalteId(data);
      });
    }
  }
  // console.log(tempalteId);
  useEffect(() => {
    handleGetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailData]);

  // let selectedTemplate;
  // if (tempalteId === "CryptoCanvas") {
  //   selectedTemplate = <CryptoCanvas />;
  // } else if (tempalteId === "EtherEasel") {
  //   selectedTemplate = <EtherEasel />;
  // } else if (tempalteId === "PixelVault") {
  //   selectedTemplate = <PixelVault />;
  // }
  // console.log(tempalteId.header);
  return (
    <>
      <Main>
        <Templatepage>
          {tempalteId &&
            (console.log(tempalteId),
            (
              // {tempalteId.header.navbarType},
              // {tempalteId.themeSetting.websiteBgColor},

              <HomepagePreview className="templatePreview">
                <Box
                  sx={{ background: tempalteId.themeSetting.websiteBgColor }}
                >
                  <div className="homesec">
                    {/* header */}
                    {tempalteId.header.navbarType != "header2" ? (
                      <Box
                        sx={{
                          position: "relative",
                          zIndex: "4",
                          padding: "15px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <div className="logo">
                            <Image
                              src={tempalteId.header.logoImage}
                              alt="logo"
                              width={100}
                              height={100}
                              style={{
                                width: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                          <div className="headerbtn">
                            <ul>
                              {tempalteId.header.menuNav
                                ? tempalteId.header.menuNav.map(
                                    (item, index) => (
                                      <li key={index}>{item.button}</li>
                                    )
                                  )
                                : ""}
                            </ul>
                          </div>
                          <Link href={tempalteId.header.waitlistBtn.link}>
                            <a target="_blank">
                              <Button
                                className="waitLstBtn"
                                sx={{
                                  background:
                                    tempalteId.themeSetting.btnBgColor,
                                }}
                              >
                                {tempalteId.header.waitlistBtn.button}
                              </Button>
                            </a>
                          </Link>
                        </Box>
                      </Box>
                    ) : (
                      <div className="headersc">
                        <div className="logo">
                          <Image
                            src={homeLogo}
                            alt="logo"
                            width={100}
                            height={100}
                            style={{ width: "100%", objectFit: "cover" }}
                          />
                        </div>
                        <div className="headerbtn">
                          <ul>
                            {tempalteId.header.menuNav
                              ? tempalteId.header.menuNav.map((item, index) => (
                                  <li key={index}>{item.button}</li>
                                ))
                              : ""}
                          </ul>

                          <Link href={waitlistBtn.link}>
                            <a target="_blank">
                              <Button
                                className="waitLstBtn"
                                sx={{
                                  background:
                                    tempalteId.themeSetting.btnBgColor,
                                }}
                              >
                                {waitlistBtn.button}
                              </Button>
                            </a>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                </Box>
              </HomepagePreview>
            ))}
        </Templatepage>
      </Main>
    </>
  );
}

export default TemplateIndex;
