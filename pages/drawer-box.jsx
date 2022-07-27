import { useEffect, useRef, Fragment } from "react";
import Head from "next/head";
import LayoutMain from "../components/layout/LayoutMain";
import { Link, BoxTransition, DrawerBox } from "../components";
import {
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
import imgProps from "../public/drawer-box.props.jpg";
//
//
const LINK_GITHUB_COMPONENT =
  "https://github.com/nikolav/demo-components.app/blob/main/components/DrawerBox/DrawerBox.jsx";
//
const PageBoxTransition = () => {
  const { like, likeCount, isLiked } = useSocialLike("--DrawerBox");
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
  const { isActive: isActiveL, toggle: toggleL } = useStateSwitch();
  const { isActive: isActiveR, toggle: toggleR } = useStateSwitch();
  //
  //
  return (
    <LayoutMain>
      <section className="flex justify-center">
        <Head>
          <title>nikolav | DrawerBox, ReactJS</title>
        </Head>
        <Paper className="justify-center mt-8 p-4" elevation={2}>
          <Stack direction="column" scacing={4}>
            <Box component="p" className="text-center text-2xl p-2">
              Otvori
            </Box>
            <Box className="justify-center">
              <ButtonGroup size="large" variant="outlined" color="primary">
                <Button onClick={toggleL.on}>👈🏻</Button>
                <Button onClick={toggleR.on}>👉🏻</Button>
              </ButtonGroup>
            </Box>
          </Stack>
        </Paper>
        <DrawerBox
          classes="p-4"
          isActive={isActiveL}
          placement={1}
          onClose={toggleL.off}
        >
          <Box className="p-6">
            <p className="prose">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
              a consequatur, nobis rerum voluptas temporibus alias? Repudiandae
              et numquam cupiditate voluptatem vero explicabo atque eveniet
              sequi autem quidem! Velit libero non officia culpa officiis
              soluta! Voluptatem rerum sint ipsam delectus omnis cumque dolorem,
              exercitationem corporis culpa adipisci, blanditiis distinctio ab
              neque quis aut vitae hic?
            </p>
            <p className="mt-4 text-center">
              &apos;X&apos; ili klik sa strane zatvara...
            </p>
          </Box>
        </DrawerBox>
        <DrawerBox isActive={isActiveR} onClose={toggleR.off}>
          <Box className="p-6">
            <p className="prose">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Repudiandae laboriosam accusamus qui! Reprehenderit laborum
              deleniti eaque consequatur accusamus praesentium possimus vel?
              Vero laboriosam libero, eos sint adipisci a praesentium, expedita
              repellendus molestiae aperiam, perferendis atque reiciendis
              consectetur odio? Labore optio, dolores incidunt ipsam quibusdam
              quae earum nesciunt beatae obcaecati et, nostrum dignissimos ullam
              cumque consequatur?
            </p>
            <p className="mt-4 text-center">
              <kbd className="opacity-80">Esc</kbd> takođe zatvara ...
            </p>
          </Box>
        </DrawerBox>
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
            Ova komponenta prikazuje pomoćni panel sa leve ili desne strane
            ekrana. Najmenjena je za prikaz navigacije ili liste komandi koje
            korisnik može da koristi.
          </p>
        </Box>
        <Box fontSize="89%" sx={{ opacity: 0.56 }}>
          <p>
            <Chip label="en" variant="outlined" />
          </p>
          <p>
            This component displays a helper panel on the left or right side
            screen. It is mainly used for displaying navigation or a list of
            commands user can use.
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
                        DrawerBox --props
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <Box component="dl">
                          {[
                            {
                              key: "isActive",
                              value: "otvara/zatvara komponentu",
                            },
                            {
                              key: "onClose",
                              value:
                                "izvršava proceduru pri zatvaranju kartice",
                            },
                            {
                              key: "placement",
                              value: "-1 desno, 1 levo",
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
