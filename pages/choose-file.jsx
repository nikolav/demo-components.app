import { forwardRef, useState, useEffect, useRef, Fragment } from "react";
import Head from "next/head";
import LayoutMain from "../components/layout/LayoutMain";
import { Link, ChooseFile, BoxTransition } from "../components";
import {
  Avatar,
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
  IconButton,
  Paper,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { useSocialLike, useStateSwitch, useBodyOverflow } from "../src/hooks";
import { useAppData, TEMP_FILE } from "../app/store";
import {
  BiImage,
  PhotoCamera,
  BsCodeSlash,
  FaGithubAlt,
} from "../components/icons";
import imgProps from "../public/choose-file.props.jpg";
//
//
const LINK_WIKI_HTTP =
  "https://github.com/nikolav/demo-components.app/blob/main/components/ChooseFile/ChooseFile.jsx";
const LINK_GITHUB_COMPONENT =
  "https://github.com/nikolav/demo-components.app/blob/main/components/ChooseFile/ChooseFile.jsx";
//
//
const ChooseFile_ = forwardRef(function ChooseFile_(
  { children, ...rest },
  ref
) {
  return (
    <ChooseFile FILE={TEMP_FILE} {...rest} ref={ref}>
      {children}
    </ChooseFile>
  );
});
//
const PageChooseFile = () => {
  const { like, likeCount, isLiked } = useSocialLike("--ChooseFile");
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
  // file data
  const appdata = useAppData();
  const tempFile = appdata(TEMP_FILE);

  //
  //
  return (
    <LayoutMain>
      <section className="flex justify-center">
        <Head>
          <title>nikolav | ChooseFile, ReactJS</title>
        </Head>
        <Box>
          <Box className="mt-4">
            <Stack
              spacing={4}
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              <IconButton>
                <ChooseFile FILE={TEMP_FILE}>
                  <Avatar
                    className="cursor-pointer bg-slate-100 dark:bg-gray-600"
                    sx={{ width: 64, height: 64 }}
                  >
                    <PhotoCamera className="text-primary dark:text-white text-4xl" />
                  </Avatar>
                </ChooseFile>
              </IconButton>
              <IconButton>
                <ChooseFile FILE={TEMP_FILE}>
                  <Avatar
                    className="cursor-pointer bg-slate-100 dark:bg-gray-600"
                    sx={{ width: 64, height: 64 }}
                  >
                    <BiImage className="text-primary dark:text-white text-4xl" />
                  </Avatar>
                </ChooseFile>
              </IconButton>
              <Button size="large" variant="outlined" component={ChooseFile_}>
                file...
              </Button>
            </Stack>
          </Box>
          <Divider className="mb-12" />
          <Box>
            {tempFile ? (
              <Paper className="p-4 text-sm" elevation={2}>
                Izabrali ste <em>{tempFile.name}</em>{" "}
                <span className="opacity-50">
                  [{Math.round(tempFile.size / 1024)}KB]
                </span>
              </Paper>
            ) : (
              <Box className="opacity-50 p-2 text-center">
                Niste izabrali fajl.
              </Box>
            )}
          </Box>
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
            Komponenta omogućava jednostavnu zamenu podrazumenog &lt;input
            file&gt; elementa sa ikonicom koja se bolje uklapa u dizajn sistem
            aplikacije.
          </p>
        </Box>
        <Box fontSize="89%" sx={{ opacity: 0.56 }}>
          <Chip label="en" variant="outlined" />
          <p>
            The component allows easy replacement of default file input element
            with an icon that fits better into applications design system .
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
                        ChooseFile --props
                      </Typography>
                      <Box component="dl">
                        {[
                          {
                            key: "FILE",
                            value: "naziv ključa za skladištenje datoteke",
                          },
                        ].map((node) => (
                          <Fragment key={node.key}>
                            <dt className="font-bold text-sm">{node.key}</dt>
                            <dd className="pl-1 opacity-80 text-sm">
                              {node.value}
                            </dd>
                          </Fragment>
                        ))}
                      </Box>
                    </CardContent>
                    <CardActions className="justify-center">
                      <Button
                        onClick={toggleActive.off}
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

export default PageChooseFile;
