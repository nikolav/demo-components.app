import { useEffect, useRef, Fragment } from "react";
import Head from "next/head";
import LayoutMain from "../components/layout/LayoutMain";
import { Link, BoxTransition, DarkModeToggle } from "../components";
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
  CardContent,
  CardActions,
  CardMedia,
  ClickAwayListener,
  Paper,
} from "@mui/material";
import { useSocialLike, useStateSwitch, useBodyOverflow } from "../src/hooks";
import { useColorMode } from "../app/store";
import { BsCodeSlash, FaGithubAlt } from "../components/icons";
import imgProps from "../public/dark-mode-toggle.props.jpg";
//
const LINK_GITHUB_COMPONENT =
  "https://github.com/nikolav/demo-components.app/blob/main/components/DarkModeToggle/DarkModeToggle.jsx";
//
const PageBoxTransition = () => {
  const { like, likeCount, isLiked } = useSocialLike("--DarkModeToggle");
  const { mode } = useColorMode();
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
  return (
    <LayoutMain>
      <section className="flex justify-center">
        <Head>
          <title>nikolav | DarkModeToggle, ReactJS</title>
        </Head>
        <Box>
          <Stack direction="column" className="mt-4  items-center" spacing={8}>
            <Box className="justify-center p-2">
              <DarkModeToggle />
            </Box>
            <Paper className="justify-center p-2">
              Color mode [<strong>{mode}</strong>].
            </Paper>
          </Stack>
        </Box>
      </section>
      {/*  */}
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
              <Tooltip placement="top" title="👨🏻‍💻 komponenta @github">
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
            Komponenta je povezana sa skupom boja dizajn sistema aplikacije i
            naizmenično smenjuje paletu boje MUI sistema u zavisnosti od trenutne
            vrednosti.
          </p>
        </Box>
        <Box fontSize="89%" sx={{ opacity: 0.56 }}>
          <p>
            <Chip label="en" variant="outlined" />
          </p>
          <p>
            The component is connected to the application&apos;s design system
            and color system and alternates between the MUI color set depending
            on the current mode.
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
                effect={{ in: "fadeIn", out: "fadeOut" }}
                isActive={isActive}
                onExited={togglePopper.off}
                {...TransitionProps}
              >
                <ClickAwayListener onClickAway={toggleActive.off}>
                  <Card className="shadow-lg max-w-[356px]">
                    <CardMedia
                      component="img"
                      height={128}
                      image={imgProps.src}
                    />

                    <CardContent>
                      <Typography
                        className="font-bold text-center mb-2"
                        variant="h5"
                        component="h2"
                      >
                        DarkModeToggle --props
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <Box component="dl">
                          {[
                            {
                              key: "width/height",
                              value: "dimenzije u pixelima",
                            },
                            {
                              key: "color/bg",
                              value: "boje kontrole i pozadine",
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
        </>
      </section>
    </LayoutMain>
  );
};

export default PageBoxTransition;
