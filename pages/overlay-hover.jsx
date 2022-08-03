import { useEffect, useState, useRef, Fragment } from "react";
import Head from "next/head";
import { motion, AnimatePresence } from "framer-motion";
import LayoutMain from "../components/layout/LayoutMain";
import {
  DrawerBox,
  Link,
  BoxTransition,
  OverlayHover,
  BoxSwitch,
} from "../components";
import {
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
import {
  useInputSynced,
  useSocialLike,
  useStateSwitch,
  useBodyOverflow,
  useChartLine,
} from "../src/hooks";
import { BsCodeSlash, FaGithubAlt } from "../components/icons";
import imgProps from "../public/overlay-hover.props.jpg";
import { useAuth, useFlags, FLAG_APP_IS_PROCESSING } from "../app/store";
import { isEmail, noop, random, range } from "../src/util";
import modcss from "../styles/overlay-hover.inputs.module.css";
//
//
const LINK_GITHUB_COMPONENT =
  "https://github.com/nikolav/demo-components.app/blob/main/components/OverlayHover/OverlayHover.jsx";
//
const dataGen = () =>
range(1, 12).map((n) => ({
  key: n,
  value: random(10),
}));

//
const PageBoxTransition = () => {
  const { like, likeCount, isLiked } = useSocialLike("--OverlayHover");
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
  const flags = useFlags();
  const { login, register, processing } = useAuth();
  useEffect(() => {
    flags[processing ? "on" : "off"](FLAG_APP_IS_PROCESSING);
  }, [processing]);
  const { isActive: isActiveAuth, toggle: toggleAuth } = useStateSwitch();
  const { isActive: isLogin, toggle: toggleIsLogin } = useStateSwitch(true);
  const [c$, setc] = useState();
  useEffect(() => {
    if (!isActiveAuth) {
      setc(Date.now());
      toggleIsLogin.on();
    }
  }, [isActiveAuth]);
  const inputsLogin = useInputSynced(
    {
      email: isEmail,
      password: (p) => 0 < p.length,
    },
    {
      onSubmit: login,
      onError: noop,
    }
  );
  const inputsRegister = useInputSynced(
    {
      name: (n) => 0 < n.length,
      email: isEmail,
      password: (p) => 0 < p.length,
    },
    {
      onSubmit: register,
      onError: noop,
    }
  );
  //
  const { isActive: isActiveDrawerR, toggle: toggleIsActiveDrawerR } =
    useStateSwitch();
  //
  return (
    <LayoutMain>
      <section className="flex justify-center">
        <Head>
          <title>nikolav | OverlayHover, ReactJS</title>
        </Head>
        <Box>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <OverlayHover
              overlay={{
                key: "OverlayHover@1",
                node: (
                  <div className="bg-primary bg-opacity-30 rounded flex items-center justify-center">
                    <Button
                      onClick={toggleIsActiveDrawerR.on}
                      size="large"
                      variant="outlined"
                      color="primary"
                      className="bg-opacity-100"
                    >
                      rashod
                    </Button>
                  </div>
                ),
              }}
            >
              <div
                className={`${modcss.bg1} h-[256px] w-[212px] shadow rounded`}
              />
            </OverlayHover>
            <ClickAwayListener onClickAway={toggleAuth.off}>
              <Box className="h-[256px] w-[212px]">
                <BoxSwitch
                  appear={false}
                  className="h-full !w-full"
                  effect={{ in: "flipInY", out: "flipOutY" }}
                  current={isLogin ? "prijava" : "registracija"}
                  components={{
                    registracija: (
                      <div className="bg-primary dark:bg-slate-900 h-full w-full relative shadow">
                        <div className="text-sm flex justify-evenly pt-4 items-center">
                          <strong
                            className={`cursor-pointer ${
                              isLogin
                                ? "text-white/80"
                                : "text-white/20 hover:text-white/60"
                            }`}
                            onClick={toggleIsLogin.on}
                          >
                            prijava
                          </strong>
                          <strong
                            className={`cursor-pointer ${
                              !isLogin
                                ? "text-white/80"
                                : "text-white/20 hover:text-white/60"
                            }`}
                            onClick={toggleIsLogin.off}
                          >
                            registracija
                          </strong>
                        </div>
                        <form
                          noValidate
                          onSubmit={inputsRegister.handle}
                          className="mx-4 flex flex-col items-center text-white mt-6 space-y-2"
                        >
                          <input
                            autoComplete="off"
                            className={`${modcss.loginUser} input-underline pl-8 pr-1 placeholder:text-white/80 outline-none`}
                            name="name"
                            onChange={inputsRegister.sync}
                            type="name"
                            value={inputsRegister.values.name}
                            placeholder="ime"
                          />
                          <input
                            autoComplete="off"
                            className={`${modcss.loginEmail} input-underline pl-8 pr-1 placeholder:text-white/80`}
                            name="email"
                            onChange={inputsRegister.sync}
                            type="email"
                            value={inputsRegister.values.email}
                            placeholder="email"
                          />
                          <input
                            autoComplete="off"
                            className={`${modcss.loginPassword} input-underline pl-8 pr-1 placeholder:text-white/80`}
                            name="password"
                            onChange={inputsRegister.sync}
                            type="password"
                            value={inputsRegister.values.password}
                            placeholder="lozinka"
                          />
                          <Button
                            size="large"
                            sx={{ color: "white" }}
                            type="submit"
                            variant="text"
                            color="primary"
                            className="inline-block text-xl !mt-4"
                          >
                            ok
                          </Button>
                        </form>
                      </div>
                    ),
                    prijava: (
                      <div
                        className={`${modcss.bg2} h-full w-full relative shadow rounded`}
                      >
                        <OverlayHover
                          className="!w-full !h-full rounded"
                          effect="slideTop"
                          onOverlayLeave={isActiveAuth && noop}
                          triggerOverlayClose={c$}
                          initialActive={isActiveAuth}
                          overlay={{
                            key: "@1",
                            node: (
                              <div className="bg-primary/60 dark:bg-black/60 flex justify-center items-center">
                                <AnimatePresence initial={false}>
                                  {!isActiveAuth && (
                                    <motion.div
                                      onClick={toggleAuth.on}
                                      layoutId="bg"
                                      className="group cursor-pointer w-24 h-12 bg-primary dark:bg-slate-900 rounded-xl flex justify-center items-center"
                                    >
                                      <motion.div layoutId="header">
                                        <motion.strong
                                          layoutId="label"
                                          className="inline-block text-white/80 group-hover:text-white"
                                        >
                                          prijava
                                        </motion.strong>
                                      </motion.div>
                                    </motion.div>
                                  )}
                                  {isActiveAuth && (
                                    <motion.div
                                      initial={false}
                                      layoutId="bg"
                                      className="w-full h-full rounded-none bg-primary dark:bg-slate-900"
                                    >
                                      <motion.div
                                        layoutId="header"
                                        className="text-sm flex justify-evenly mt-4 items-center"
                                      >
                                        <motion.strong
                                          onClick={toggleIsLogin.on}
                                          layoutId="label"
                                          className={`cursor-pointer inline-block ${
                                            isLogin
                                              ? "text-white/80"
                                              : "text-white/20 hover:text-white/60"
                                          }`}
                                        >
                                          prijava
                                        </motion.strong>
                                        <strong
                                          className={`cursor-pointer ${
                                            !isLogin
                                              ? "text-white/80"
                                              : "text-white/20 hover:text-white/60"
                                          }`}
                                          onClick={toggleIsLogin.off}
                                        >
                                          registracija
                                        </strong>
                                      </motion.div>
                                      <motion.div
                                        className="text-white mt-8"
                                        initial={{ opacity: 0 }}
                                        exit={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                      >
                                        <form
                                          noValidate
                                          onSubmit={inputsLogin.handle}
                                          className="mx-4 flex flex-col items-center"
                                        >
                                          <input
                                            autoComplete="off"
                                            autoFocus
                                            className={`${modcss.loginEmail} input-underline pl-8 pr-1 placeholder:text-white/80`}
                                            name="email"
                                            onChange={inputsLogin.sync}
                                            type="email"
                                            value={inputsLogin.values.name}
                                            placeholder="email"
                                          />
                                          <input
                                            autoComplete="off"
                                            className={`${modcss.loginPassword} input-underline pl-8 pr-1 placeholder:text-white/80 mt-6`}
                                            name="password"
                                            onChange={inputsLogin.sync}
                                            type="password"
                                            value={inputsLogin.values.password}
                                            placeholder="lozinka"
                                          />
                                          <Button
                                            size="large"
                                            sx={{ color: "white" }}
                                            type="submit"
                                            variant="text"
                                            color="primary"
                                            className="inline-block mt-6 text-xl"
                                          >
                                            ok
                                          </Button>
                                        </form>
                                      </motion.div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            ),
                          }}
                        ></OverlayHover>
                      </div>
                    ),
                  }}
                />
              </Box>
            </ClickAwayListener>
          </Stack>
        </Box>
        <DrawerBox
          isActive={isActiveDrawerR}
          onClose={toggleIsActiveDrawerR.off}
        >
          <Stack spacing={1} className="items-center">
            <LineChart isActive={isActiveDrawerR} color="rgb(239,68,68)" yLabel="🍎" />
            <LineChart isActive={isActiveDrawerR} color="rgb(234,179,8)" yLabel="🍋" />
            <LineChart isActive={isActiveDrawerR} color="rgb(34,197,94)" yLabel="🥝" />
          </Stack>
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
          <p>Prikazuje komponentu preklapanja pri interakciji.</p>
        </Box>
        <Box fontSize="89%" sx={{ opacity: 0.56 }}>
          <Chip label="en" variant="outlined" />
          <p>Displays an overlay component on pointer hover.</p>
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
                        className="font-bold text-center mb-2"
                        variant="h5"
                        component="h2"
                      >
                        OverlayHover --props
                      </Typography>
                      <Box component="dl">
                        {[
                          {
                            key: "overlay",
                            value: "komponenta za prikaz",
                          },
                          {
                            key: "effect",
                            value: "tip animacije: fade | slideTop | slideLeft",
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

function LineChart({ isActive, color, yLabel }) {
  const root = useRef();
  const [d$, setd] = useState(null);
  //
  useChartLine({
    data: d$,
    isActive,
    root: root?.current,
    options: {
      width: 472,
      height: 234,
      color,
      strokeWidth: 6,
      yLabel,
    },
  });
  useEffect(() => {
    setd(dataGen());
  }, []);
  //
  return <div ref={root} />;
}
