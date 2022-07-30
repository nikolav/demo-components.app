import { useState, useEffect, useRef, Fragment } from "react";
import Head from "next/head";
import LayoutMain from "../components/layout/LayoutMain";
import {
  SwitchIcon,
  ProgressRing,
  Link,
  BoxTransition,
  BoxSwitch,
} from "../components";
import {
  Box,
  ToggleButtonGroup,
  IconButton,
  ToggleButton,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  ClickAwayListener,
  Grid,
  Paper,
  Popper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  useSocialLike,
  useStateSwitch,
  useBodyOverflow,
  usePieChart,
} from "../src/hooks";
import {
  BsCodeSlash,
  FaGithubAlt,
  AiOutlineUser,
  AiOutlineUserAdd,
} from "../components/icons";
import imgProps from "../public/icon-crossfade.props.jpg";
import { values, prevent } from "../src/util";
import { useAppData, QUIZ } from "../app/store";
//
//
const LINK_GITHUB_COMPONENT =
  "https://github.com/nikolav/demo-components.app/blob/main/components/IconCrossfade/IconCrossfade.jsx";
//
const qa = {
  1: {
    q: "Najviša zgrada?",
    a: ["Burj Khalifa", "Shanghai Tower", "Makkah Tower"],
    c: "Burj Khalifa",
  },
  2: {
    q: "Izbaci uljeza",
    a: ["Vue", "Express", "Django"],
    c: "Django",
  },
  3: {
    q: "Ko je napisao Crvenkapu?",
    a: ["Paulo Koeljo", "Braća Grim", "Dobrica Ćosić"],
    c: "Braća Grim",
  },
};
//
const PageIconCrossfade = () => {
  const { like, likeCount, isLiked } = useSocialLike("--IconCrossfade");
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
  const [p$, setp] = useState(1);
  const quizReset = () => setp(1);
  const appdata = useAppData();
  useEffect(() => {
    if (1 === p$) {
      appdata.set(QUIZ, { 1: null, 2: null, 3: null });
    }
  }, [p$]);
  //
  const [f$, setf] = useState("login");
  //
  return (
    <LayoutMain>
      <section className="flex justify-center">
        <Head>
          <title>nikolav | IconCrossfade, ReactJS</title>
        </Head>
        <Box>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} className="space-y-2">
              <BoxSwitch
                current={p$}
                duration={555}
                components={{
                  1: <QuizPanel step={1} />,
                  2: <QuizPanel step={2} />,
                  3: <QuizPanel step={3} />,
                  4: <QuizPanelEnd />,
                }}
                className="!w-full"
              />

              <ButtonGroup
                variant="outlined"
                color="primary"
                size="large"
                fullWidth
              >
                <Button
                  onClick={() => setp((p) => p + 1)}
                  className="flex items-center justify-between px-2"
                  disabled={4 === p$}
                >
                  <span className="flex h-6">
                    <ProgressRing
                      bg="rgba(0,0,0,.056)"
                      duration={1122}
                      progress={p$ * 25}
                      width={100}
                      rounded={false}
                      allowDecrease
                    />
                  </span>
                  <span className="inline-block ml-2">dalje</span>
                </Button>
                <Button onClick={quizReset}>ponovi</Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <BoxSwitch
                current={f$}
                duration={555}
                components={{
                  login: (
                    <Paper
                      elevation={1}
                      className="h-56 p-4 space-y-4 text-center"
                    >
                      <p className="font-bold text-center">
                        <strong>Prijavi se</strong>
                      </p>
                      <form noValidate onSubmit={prevent()}>
                        <input
                          autoFocus
                          autoComplete="off"
                          type="email"
                          className="px-2 input-underline placeholder:italic placeholder:text-black/50 placeholder:text-sm"
                          placeholder="email"
                        />
                        <input
                          autoComplete="off"
                          type="password"
                          className="px-2 input-underline placeholder:italic placeholder:text-black/50 placeholder:text-sm"
                          placeholder="password"
                        />
                      </form>
                    </Paper>
                  ),
                  register: (
                    <Paper
                      elevation={1}
                      className="h-56 p-4 space-y-4 text-center"
                    >
                      <p className="font-bold text-center">
                        <strong>Registracija</strong>
                      </p>
                      <form noValidate onSubmit={prevent()}>
                        <input
                          autoFocus
                          autoComplete="off"
                          type="text"
                          className="px-2 input-underline placeholder:italic placeholder:text-black/50 placeholder:text-sm"
                          placeholder="ime"
                        />
                        <input
                          autoComplete="off"
                          type="email"
                          className="px-2 input-underline placeholder:italic placeholder:text-black/50 placeholder:text-sm"
                          placeholder="email"
                        />
                        <input
                          autoComplete="off"
                          type="password"
                          className="px-2 input-underline placeholder:italic placeholder:text-black/50 placeholder:text-sm"
                          placeholder="password"
                        />
                      </form>
                    </Paper>
                  ),
                }}
                className="!w-full"
              />
              <ButtonGroup
                size="large"
                fullWidth
                className="flex justify-center"
              >
                <SwitchIcon
                  icon={f$}
                  icons={{
                    login: (
                      <IconButton
                        color="primary"
                        onClick={() => setf("register")}
                      >
                        <AiOutlineUserAdd className="text-4xl" />
                      </IconButton>
                    ),
                    register: (
                      <IconButton color="primary" onClick={() => setf("login")}>
                        <AiOutlineUser className="text-4xl" />
                      </IconButton>
                    ),
                  }}
                  duration={456}
                />
              </ButtonGroup>
            </Grid>
          </Grid>
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
            Za korisnički interfejs koji ima više različith stanja (login,
            logout, kontrole za media plejer i sl.) komponenta{" "}
            <em>IconCrossfade</em>{" "}
            može da posluži kao signal za trenutni status.
          </p>
        </Box>
        <Box fontSize="89%" sx={{ opacity: 0.56 }}>
          <Chip label="en" variant="outlined" />
          <p>
            For user interface with multiple stages (login, logout, media player
            controls, etc.) this dynamic component can serve as a signal for the
            current status.
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
                        className="mb-2 font-bold text-center"
                        variant="h5"
                        component="h2"
                      >
                        IconCrossfade --props
                      </Typography>
                      <Box component="dl">
                        {[
                          {
                            key: "icons",
                            value: "mapa kljč/komponenta za prikaz",
                          },
                          {
                            key: "icon",
                            value: "aktivna ikonica",
                          },
                          {
                            key: "duration",
                            value: "trajanje prelaza u [ms]",
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

export default PageIconCrossfade;

//
function QuizPanel({ step = 1 }) {
  const q = qa[step];
  const appdata = useAppData();
  const onAnswer = (_e, answer) => {
    appdata.set(QUIZ, {
      ...appdata(QUIZ),
      [step]: q.c === q.a[answer],
    });
    //
    setv(answer);
  };
  const [v$, setv] = useState(null);
  //
  return (
    <Paper elevation={1} className="h-56 p-4">
      <p className="text-center">
        <strong>{q.q}</strong>
      </p>
      <ToggleButtonGroup
        className="mt-8"
        orientation="vertical"
        value={v$}
        exclusive
        onChange={onAnswer}
        fullWidth
        size="small"
      >
        {q.a.map((item, i) => (
          <ToggleButton key={item} value={i}>
            <span>{item}</span>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Paper>
  );
}

function QuizPanelEnd() {
  const appdata = useAppData();
  const quiz = appdata(QUIZ);
  const [d$, setd] = useState(null);
  //
  const root = useRef();
  usePieChart({
    root: root?.current,
    data: d$,
    options: {
      colors: ["#ff0000", "#00ff00"],
      width: 144,
      height: 144,
      legendWidth: 56,
      _strokeWidth: 2,
    },
  });
  //
  // quiz
  //  {
  //   1: true
  //   2: false,
  //   3: false
  // }
  useEffect(() => {
    const correctCount = values(quiz).filter((v) => v).length;
    const data = [
      {
        key: "👎🏻",
        value: 3 - correctCount,
      },
      {
        key: "👍🏻",
        value: correctCount,
      },
    ];
    //
    setd(data);
  }, []);
  //
  return (
    <Paper
      elevation={1}
      className="flex items-center justify-center w-full h-56"
    >
      <div ref={root} />
    </Paper>
  );
}
