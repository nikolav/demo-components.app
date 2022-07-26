import { useState, useEffect, useRef, Fragment } from "react";
import Head from "next/head";
import LayoutMain from "../components/layout/LayoutMain";
import { Link, BoxTransition, BlockUI, ProgressRing } from "../components";
import {
  Stack,
  Box,
  Typography,
  Chip,
  ButtonGroup,
  Button,
  Tooltip,
  Popper,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  ClickAwayListener,
} from "@mui/material";
import { useCountDown, useSocialLike, useStateSwitch, useBodyOverflow } from "../src/hooks";
import {
  BsCodeSlash,
  FaGithubAlt,
  ArrowDropDownIcon,
} from "../components/icons";
import { prevent, noop } from "../src/util";
//
//
const LINK_WIKI_HTTP =
  "https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol?oldformat=true";
const LINK_GITHUB_COMPONENT =
  "https://github.com/nikolav/demo-components.app/blob/main/components/BlockUI/BlockUI.jsx";
//
const PageBlockui = () => {
  const { like, likeCount, isLiked } = useSocialLike("--BlockUI");
  //
  const { isActive, toggle: toggleActive } = useStateSwitch();
  const { isActive: isOpenPopper, toggle: togglePopper } = useStateSwitch();
  useEffect(() => {
    isActive && togglePopper.on();
  }, [isActive]);
  //
  const refButton = useRef();
  //
  const overflow = useBodyOverflow();
  useEffect(() => {
    overflow.hidden(isOpenPopper);
  }, [isOpenPopper]);
  //
  const refButtons = useRef();
  const { isActive: isMenu, toggle: toggleMenu } = useStateSwitch();
  const { isActive: isPopperMenu, toggle: togglePopperMenu } = useStateSwitch();
  useEffect(() => {
    isMenu && togglePopperMenu.on();
  }, [isMenu]);
  //
  const { isActive: isBlockui, toggle: toggleBlockui } = useStateSwitch();
  const { count, start } = useCountDown(toggleBlockui.off);
  const blockui = () => {
    toggleBlockui.on();
    start(5);
  }
    
  //
  return (
    <LayoutMain>
      <section>
        <BlockUI isActive={isBlockui}>
          <Box>
            <strong>Interakcija zaleđena... [{count}]</strong>
          </Box>
        </BlockUI>
        <Head>
          <title>nikolav | BlocUI, ReactJS</title>
        </Head>
        <Box>
          <ButtonGroup ref={refButtons.current} variant="outlined" size="large">
            <Button onClick={prevent(blockui)}>BLOKIRAJ</Button>
            <Button onClick={toggleMenu.on}>
              <ArrowDropDownIcon />
            </Button>
          </ButtonGroup>
        </Box>
      </section>

      {/*  */}
      <section className="space-y-4">
        <Box>
          <Stack mb={2} direction="row" className="justify-center">
            <ButtonGroup variant="outlined" size="small">
              <Tooltip placement="top" title="🔎 props">
                <Button ref={refButton} onClick={toggleActive}>
                  <BsCodeSlash className="icon-primary" />
                </Button>
              </Tooltip>
              <Tooltip placement="top" title="komponenta @github">
                <Button>
                  <Link href={LINK_GITHUB_COMPONENT}>
                    <a target="_blank">
                      <FaGithubAlt className="icon-primary" />
                    </a>
                  </Link>
                </Button>
              </Tooltip>
              <Button onClick={like}>
                <span className={isLiked() ? "opacity-100" : "opacity-50"}>
                  {isLiked() ? "💙" : "🤍"} {likeCount}
                </span>
              </Button>
            </ButtonGroup>
          </Stack>
          <p>
            Ne zaboravite da dodate BlockUI komponentu aplikaciji dok je sistem
            zauzet{" "}
            <Tooltip placement="top" title="🌐 Hypertext Transfer Protocol">
              <Box component="strong">
                <Link href={LINK_WIKI_HTTP}>
                  <a target="_blank" className="link text-primary">
                    HTTP
                  </a>
                </Link>
              </Box>
            </Tooltip>{" "}
            zahtevom. Blokira pristup korisnika drugim događajima ili radnjama
            dok čeka da se proces završi.
          </p>
        </Box>
        <Box fontSize="89%" sx={{ opacity: 0.56 }}>
          <p>
            <Chip label="en" variant="outlined" />
          </p>
          <p>
            Don{"'"}t forget to add BlockUI component to the application while
            system is busy with a http request. It bocks user access to other
            events or actions while waiting for the process to finish.
          </p>
        </Box>
        <>
          {/*  */}
          {/*  */}
          {/* @@popper.props */}
          <Popper
            open={isOpenPopper}
            anchorEl={refButton.current}
            placement="bottom"
            modifiers={[
              {
                name: "offset",
                options: {
                  offset: [0, -128],
                },
              },
            ]}
            keepMounted
            transition
          >
            {({ TransitionProps }) => (
              <BoxTransition
                effect={{ in: "flipInY", out: "flipOutY" }}
                isActive={isActive}
                onExited={togglePopper.off}
                {...TransitionProps}
              >
                <ClickAwayListener onClickAway={toggleActive.off}>
                  <Card
                    className="shadow-lg"
                    sx={{ maxWidth: 356, p: ".5rem" }}
                  >
                    <CardContent>
                      <Typography
                        className="font-bold text-center mb-2"
                        variant="h5"
                        component="h2"
                      >
                        BlockUI --props
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <Box component="dl">
                          {[
                            {
                              key: "isActive",
                              value: "otvara `BlockUI` ekran",
                            },
                          ].map((node) => (
                            <Fragment key={node.key}>
                              <dt className="font-bold">{node.key}</dt>
                              <dd className="pl-1 opacity-80">{node.value}</dd>
                            </Fragment>
                          ))}
                        </Box>
                      </Typography>
                    </CardContent>
                    <CardActions className="justify-center">
                      <Button
                        onClick={toggleActive.off}
                        dense
                        color="secondary"
                        size="small"
                        variant="outlined"
                      >
                        ok, hvala
                      </Button>
                    </CardActions>
                  </Card>
                </ClickAwayListener>
              </BoxTransition>
            )}
          </Popper>
          {/*  */}
          {/*  */}
          {/* @@popper.menu */}
        </>
      </section>
    </LayoutMain>
  );
};

export default PageBlockui;
