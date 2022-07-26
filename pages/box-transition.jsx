import { useState, useEffect, useRef, Fragment } from "react";
import Head from "next/head";
import LayoutMain from "../components/layout/LayoutMain";
import { Link, BoxTransition } from "../components";
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
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { useSocialLike, useStateSwitch, useBodyOverflow } from "../src/hooks";
import { BsCodeSlash, FaGithubAlt } from "../components/icons";
import { noop } from "../src/util";
import imgProps from "../public/box-transition.props.2.jpg";
import modcss from "../styles/PageBoxTransition.module.css";
//
const EFFECT = {
  bounce: { in: "bounceIn", out: "bounceOut" },
  fade: { in: "fadeIn", out: "fadeOut" },
  flip: { in: "flipInX", out: "flipOutX" },
  roll: { in: "rollIn", out: "rollOut" },
  rotate: { in: "rotateIn", out: "rotateOut" },
  slide: { in: "slideInUp", out: "slideOutDown" },
  zoom: { in: "zoomIn", out: "zoomOut" },
};
//
//
const LINK_ANIMATE_CSS = "https://animate.style/";
const LINK_CSSTRANSITION = "https://reactcommunity.org/react-transition-group/";
const LINK_GITHUB_COMPONENT =
  "https://github.com/nikolav/demo-components.app/blob/main/components/BoxTransition/BoxTransition.jsx";
//
const MENU = (id) => (
  <Paper
    id={`Paper.transition--${id}`}
    sx={{
      width: 256,
      transform: "translate(-3px, 7px)",
    }}
    elevation={2}
  >
    <MenuList>
      {[
        {
          icon: "🌯",
          title: "burito",
          price: 550,
        },
        {
          icon: "🍕",
          title: "pizza",
          price: 420,
        },
        {
          icon: "🌭",
          title: "viršla",
          price: 300,
        },
        {
          icon: "🍔",
          title: "pljeskavica",
          price: 550,
        },
        {
          title: "--",
        },
        {
          icon: "🍺",
          title: "pivo",
          price: 220,
        },
        {
          icon: "🥤",
          title: "cola",
          price: 499,
        },
      ].map(({ icon, title, price }) =>
        "--" === title ? (
          <Divider key={title} />
        ) : (
          <MenuItem key={title}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>{title}</ListItemText>
            <Typography variant="body2" color="text.secondary">
              {price}
            </Typography>
          </MenuItem>
        )
      )}
    </MenuList>
  </Paper>
);
//
//
const PageBoxTransition = () => {
  const { like, likeCount, isLiked } = useSocialLike("--BoxTransition");
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
  //
  const [effect$, setEffect] = useState();
  const { isActive: isTransition, toggle: setIsTransition } = useStateSwitch();
  const { isActive: isRunning, toggle: setIsRunning } = useStateSwitch();
  const transitionStart = (type) => {
    setEffect(type);
    setIsRunning.on();
    setIsTransition.on();
  };
  //
  return (
    <LayoutMain>
      <section className="flex justify-center">
        <Head>
          <title>nikolav | BoxTransition, ReactJS</title>
        </Head>
        <Box>
          <Stack direction="column" spacing={8} className="mt-2">
            <Box
              sx={{ minHeight: 269 }}
              className={`${modcss.boxContainer} flex justify-center`}
            >
              {/*  */}
              {/*  */}
              {/* animating box */}
              <BoxTransition
                // isActive={true}
                // isActive={false}
                isActive={isRunning && isTransition}
                effect={EFFECT[effect$]}
                duration={722}
                durationOut={455}
                onEntered={() => setTimeout(setIsTransition.off, 1567)}
                onExited={setIsRunning.off}
              >
                {MENU("transition")}
              </BoxTransition>
            </Box>
            <Box className="flex justify-center">
              {/* controll */}
              <ButtonGroup size="small" variant="outlined" color="primary">
                {[
                  "bounce",
                  "fade",
                  "flip",
                  "roll",
                  "rotate",
                  "slide",
                  "zoom",
                ].map((type) => (
                  <Button
                    key={type}
                    disabled={isRunning}
                    onClick={() => transitionStart(type)}
                  >
                    {type}
                  </Button>
                ))}
              </ButtonGroup>
            </Box>
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
          <div>
            Jednostavna komponenta deklarativnog tipa za optimizovane animacije
            css transformacija. Prosleđuje{" "}
            <Link href={LINK_ANIMATE_CSS}>
              <a target="_blank" className="link text-primary">
                <strong>animate.css</strong>
              </a>
            </Link>{" "}
            klase{" "}
            <Link href={LINK_CSSTRANSITION}>
              <a target="_blank" className="link text-primary">
                <strong>CSSTransition</strong>
              </a>
            </Link>{" "}
            komponenti za postepene prelaze elemenata.
          </div>
        </Box>
        <Box fontSize="89%" sx={{ opacity: 0.56 }}>
          <p>
            <Chip label="en" variant="outlined" />
          </p>
          <p>
            Easy to use declarative transition component for optimized
            animatitions of css transforms . It forwards animate.css classes to
            CSSTransition component for smooth in-out element transitions.
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
                  offset: [0, -144],
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
                        BoxTransition --props
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <Box component="dl">
                          {[
                            {
                              key: "isActive",
                              value: "signal za etape `in/out` animacija",
                            },
                            {
                              key: "effect",
                              value: "`in/out` mapa sa nazivima animacija",
                            },
                            {
                              key: "duration/durationOut",
                              value: "dužina trajanja animacija",
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
