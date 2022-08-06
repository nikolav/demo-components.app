import { useState, useEffect, useRef, Fragment } from "react";
import Head from "next/head";
import LayoutMain from "../components/layout/LayoutMain";
import { Link, BoxTransition, Rotation } from "../components";
import {
  IconButton,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  ClickAwayListener,
  Paper,
  Popper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useSocialLike, useStateSwitch, useBodyOverflow } from "../src/hooks";
import { BsCodeSlash, FaGithubAlt } from "../components/icons";
import imgProps from "../public/rotation.props.jpg";
import flower01 from "../public/flower01.jpg";
import flower02 from "../public/flower02.jpg";
import flower03 from "../public/flower03.jpg";
import flower04 from "../public/flower04.jpg";
import flower05 from "../public/flower05.jpg";
import flower06 from "../public/bg1.jpg";
//
//
const LINK_GITHUB_COMPONENT =
  "https://github.com/nikolav/demo-components.app/blob/main/components/Rotation/Rotation.jsx";
//
const PageRotation = () => {
  const { like, likeCount, isLiked } = useSocialLike("--Rotation");
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
  const [s$, sets] = useState({ slide: 0, key: 0 });
  //
  return (
    <LayoutMain>
      <section className="flex justify-center">
        <Head>
          <title>nikolav | Rotation, ReactJS</title>
        </Head>
        <Box className="w-full grow">
          <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
            <Paper elevation={2} className="w-full overflow-hidden">
              <Rotation
                className="h-full"
                nodes={[
                  {
                    key: "@1",
                    node: (
                      <img
                        alt=""
                        src={flower01.src}
                        className="block object-cover object-center w-full h-full"
                      />
                    ),
                  },
                  {
                    key: "@2",
                    node: (
                      <img
                        alt=""
                        src={flower02.src}
                        className="block object-cover object-center w-full h-full"
                      />
                    ),
                  },
                  {
                    key: "@3",
                    node: (
                      <img
                        alt=""
                        src={flower03.src}
                        className="block object-cover object-center w-full h-full"
                      />
                    ),
                  },
                ]}
              />
            </Paper>
            <Paper
              className="flex flex-col items-center w-full overflow-hidden"
              elevation={2}
            >
              <Rotation
                className="w-full h-48"
                effect="slideLeft"
                nodes={[
                  {
                    key: "--1 .0",
                    node: (
                      <img
                        alt=""
                        src={flower04.src}
                        className="block object-cover object-center w-full h-full"
                      />
                    ),
                  },
                  {
                    key: "--2 .1",
                    node: (
                      <img
                        alt=""
                        src={flower05.src}
                        className="block object-cover object-center w-full h-full"
                      />
                    ),
                  },
                  {
                    key: "--3 .2",
                    node: (
                      <img
                        alt=""
                        src={flower06.src}
                        className="block object-cover object-center w-full h-full"
                      />
                    ),
                  },
                ]}
                manual={true}
                startIndex={0}
                loadSlide={s$}
              />
              <ButtonGroup size="small" variant="outlined">
                <IconButton onClick={() => sets({ slide: 0, key: Date.now() })}>
                  🔵
                </IconButton>
                <IconButton onClick={() => sets({ slide: 1, key: Date.now() })}>
                  🟠
                </IconButton>
                <IconButton onClick={() => sets({ slide: 2, key: Date.now() })}>
                  🟡
                </IconButton>
              </ButtonGroup>
            </Paper>
          </Stack>
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
            Komponenta projekcije za kretanje kroz slajdove. Podržava dva moda
            upravljanja, automatski sa vremenskim intervalom i manuelni sa
            navigacijom, slično Bootstrap carousel komponenti.
          </p>
        </Box>
        <Box fontSize="89%" sx={{ opacity: 0.56 }}>
          <Chip label="en" variant="outlined" />
          <p>
            A slideshow component for cycling through elements—images or slides
            of text—like a carousel.
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
                effect={{ in: "flipInX", out: "flipOutX" }}
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
                        className="mb-2 font-bold text-center"
                        variant="h5"
                        component="h2"
                      >
                        Rotation --props
                      </Typography>
                      <Box component="dl">
                        {[
                          {
                            key: "nodes",
                            value: "lista komponenti za prikaz",
                          },
                          {
                            key: "manual",
                            value: "izbor načina prikaza, manual/auto",
                          },
                        ].map((node) => (
                          <Fragment key={node.key}>
                            <dt className="text-sm font-bold">{node.key}</dt>
                            <dd className="pl-1 text-sm opacity-80">
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

export default PageRotation;
