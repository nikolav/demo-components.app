import { useState, useEffect, useRef, Fragment } from "react";
import Head from "next/head";
import LayoutMain from "../components/layout/LayoutMain";
import { Link, BoxTransition, DrawerDrag } from "../components";
import { motion, AnimatePresence } from "framer-motion";
import {
  MenuList,
  MenuItem,
  ListItemText,
  ListItemIcon,
  Grid,
  Paper,
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
} from "@mui/material";
import { useSocialLike, useStateSwitch, useBodyOverflow } from "../src/hooks";
import {
  AiOutlineIdcard,
  IoMdPower,
  BsCodeSlash,
  FaGithubAlt,
} from "../components/icons";
import imgProps from "../public/drawer-drag.props.jpg";

//
const LINK_GITHUB_COMPONENT =
  "https://github.com/nikolav/demo-components.app/blob/main/components/DrawerDrag/DrawerDrag.jsx";
//
const CHARACTER = {
  cercei: {
    name: "cercei",
    icon: "👩‍🦲",
    about:
      "Kraljica Serseja I Lanister je udovica kralja Roberta Barateona i kraljice sedam kraljevstava. Ona je ćerka lorda Tajvina Lanistera, sestra bliznakinja Džejmea Lanistera i starija sestra Tiriona Lanistera.",
  },

  daenerys: {
    name: "daenerys",
    icon: "🦸‍♀️",
    about:
      "Kraljica Deneris I Targarjen je mlađa sestra Regara Targarijena i Viserisa Targarijena, tetke Džona Snoua po ocu, i najmlađe dete kralja Erisa II Targarjena i kraljice Raele Targarjen, koji su oboje zbačeni sa gvozdenog prestola tokom pobune Roberta Barateona.",
  },

  arya: {
    name: "arya",
    icon: "👼🏻",
    about:
      "Arija Stark je treće dete Edarda Starka i Kejtlin Stark. Nakon što je za dlaku izbegao progon Kuće Stark od strane kuće Lanister, Arija je obučena za Bezličnog čoveka u Kući crno-belih u Braavosu i koristi svoje nove veštine da privede pravdi one koji su naneli nepravdu njenoj porodici.",
  },
  margaery: {
    name: "margaery",
    icon: "👑",
    about:
      "Mardžeri Tirel je postala kraljica supruga kroz brak sa Džofrijem Barateonom, a kasnije i Tomenom Barateonom. Na kraju je ubijena zajedno sa svojim bratom i ocem kada je Velika septa iz Belora uništena požarom koji je orkestrirala Sersei Lanister da povrati izgubljenu moć.",
  },
};
//
const PageBoxTransition = () => {
  const { like, likeCount, isLiked } = useSocialLike("--DrawerDrag");
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
  const { isActive: isActiveDD, toggle: toggleDD } = useStateSwitch();
  //
  const [character$, setCharacter] = useState("cercei");
  //
  return (
    <LayoutMain>
      <section className="flex justify-center">
        <Head>
          <title>nikolav | DrawerDrag, ReactJS</title>
        </Head>
        <Box>
          <Box className="flex justify-center mt-16">
            <Button
              onClick={toggleDD.on}
              variant="outlined"
              size="large"
              color="primary"
              startIcon={
                <AiOutlineIdcard className="text-primary text-2xl dark:text-white" />
              }
            >
              uredi kontakte...
            </Button>
          </Box>
          {/* widget */}
          <DrawerDrag onClose={toggleDD.off} isActive={isActiveDD}>
            <Box className="p-2 sm:p-8">
              <Grid container spacing={{ sm: 2, md: 4 }}>
                <Grid item sm={9}>
                  <AnimatePresence initial={false}>
                    <motion.div
                      initial={{ opacity: 0, scale: 1.11 }}
                      exit={{ opacity: 0, position: "absolute", zIndex: -1 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.24 }}
                      key={character$}
                    >
                      <Paper
                        className="p-8 rounded-xl min-h-[196px] mx-auto"
                        elevation={2}
                      >
                        <div>
                          <Box
                            className="prose text-xl dark:text-slate-100"
                            component="p"
                          >
                            {CHARACTER[character$].about}
                          </Box>
                          <Box className="mt-16 flex justify-center">
                            <Button
                              onClick={toggleDD.off}
                              variant="text"
                              color="error"
                              size="small"
                            >
                              <IoMdPower className="text-xl dark:text-red-400" />
                            </Button>
                          </Box>
                        </div>
                      </Paper>
                    </motion.div>
                  </AnimatePresence>
                </Grid>
                <Grid item sm={3}>
                  <MenuList>
                    {Object.keys(CHARACTER).map((name) => (
                      <MenuItem onClick={() => setCharacter(name)} key={name}>
                        <ListItemIcon>{CHARACTER[name].icon}</ListItemIcon>
                        <ListItemText>{name}</ListItemText>
                      </MenuItem>
                    ))}
                  </MenuList>
                </Grid>
              </Grid>
            </Box>
          </DrawerDrag>
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
            Slična komponentama <em>Modal</em>, i <em>DrawerBox</em> pirkazuje
            dodatni, obimniji sadržaj na kome korisnik radi. Kada treba
            privremeno da se prebaci na glavnu stranu ova komponenta mu
            omogućava da to jednostavno učini a da se pri tom ne izgubi editovan
            sadržaj.
          </p>
        </Box>
        <Box fontSize="89%" sx={{ opacity: 0.56 }}>
          <Chip label="en" variant="outlined" />
          <p>
            Similar to <em>Modal</em> and <em>DrawerBox</em> components shows
            additional more extensive content that the user is working on. When
            needed temporarily to switch to the main page this component makes
            it easy to do so without losing the edited material.
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
                        DrawerDrag --props
                      </Typography>
                      <Box component="dl">
                        {[
                          {
                            key: "isActive",
                            value: "otvara/zatvara sadržaj komponente",
                          },
                          {
                            key: "onClose",
                            value: "izvršava proceduru pri zatvaranju",
                          },
                          {
                            key: "controlls",
                            value: "opciono prikazuje kontrole",
                          },
                          {
                            key: "offsetTop",
                            value: "razmak od vrha ekrana",
                          },
                          {
                            key: "offsetToggle",
                            value:
                              "minimalna distanca prevlačenja komponente za aktivaciju minimalnog ili maksimalnog prikaza",
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

export default PageBoxTransition;
