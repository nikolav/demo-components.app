import { useEffect, useState, useRef, Fragment } from "react";
import Head from "next/head";
import LayoutMain from "../components/layout/LayoutMain";
import { useScroll } from "framer-motion";
import {
  Link,
  BoxTransition,
  ProgressBar,
  ProgressBarVertical,
  ProgressRing,
  PortalOverlays,
} from "../components";
import {
  Paper,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  ClickAwayListener,
  Popper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useSocialLike, useStateSwitch, useBodyOverflow } from "../src/hooks";
import { BsCodeSlash, FaGithubAlt } from "../components/icons";
import imgProps from "../public/progress-ring.props.jpg";
import { random } from "../src/util";
//
//
const LINK_GITHUB_COMPONENT =
  "https://github.com/nikolav/demo-components.app/blob/main/components/ProgressRing/ProgressRing.jsx";
//
const PageProgress = () => {
  const { like, likeCount, isLiked } = useSocialLike("--Progress");
  //
  const { isActive, toggle: toggleActive } = useStateSwitch();
  const { isActive: isOpenPopper, toggle: togglePopper } = useStateSwitch();
  useEffect(() => {
    isActive && togglePopper.on();
  }, [isActive]);
  //
  const refButton = useRef();
  const refScrollDiv = useRef();
  //
  const overflow = useBodyOverflow();
  useEffect(() => {
    overflow.hidden(isOpenPopper);
  }, [isOpenPopper]);
  //
  const [p$, setp] = useState(22);
  const [pu$, setpu] = useState(0);
  const [ps$, setps] = useState(0);
  const [i$, seti] = useState();
  useEffect(() => {
    seti(setInterval(() => setp(random(100)), 6789));
    return () => clearInterval(i$);
  }, []);
  //
  const { scrollYProgress } = useScroll({
    container: refScrollDiv,
  });
  useEffect(() => scrollYProgress.onChange((p) => setps(100 * p)), []);
  ////
  /////
  return (
    <LayoutMain>
      <section className="flex justify-center">
        <Head>
          <title>nikolav | Progress, ReactJS</title>
        </Head>
        <PortalOverlays>
          <div className="h-[4px] fixed top-0 inset-x-0">
            <ProgressBar
              progress={p$}
              duration={5678}
              height={4}
              bg="none"
              color="#ff0000"
              rounded={true}
            />
          </div>
        </PortalOverlays>
        <Box className="space-y-4">
          <Paper elevation={2} className="w-full p-2 sm:px-4 relative">
            <div className="absolute bottom-2 right-2 text-sm opacity-50">
              <strong>{p$}</strong>%
            </div>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-center h-32 sm:h-48 space-x-1 sm:space-x-4 text-primary dark:text-white"
            >
              <ProgressBarVertical
                rounded={false}
                width={12}
                duration={2567}
                progress={p$}
                bg="rgba(0,0,0,.122)"
              />
              <div className="w-32 h-32">
                <ProgressRing
                  rounded={false}
                  allowDecrease
                  width={22}
                  progress={p$}
                  bg="rgba(0,0,0,.122)"
                />
              </div>
              <div className="w-48">
                <ProgressBar
                  duration={1234}
                  rounded={false}
                  height={12}
                  progress={p$}
                  bg="rgba(0,0,0,.122)"
                />
              </div>
            </Stack>
          </Paper>
          {/*  */}
          {/*  */}
          <Paper elevation={2} className="w-full p-2 sm:px-4">
            <div className="relative">
              <input
                autoComplete="off"
                className="input-underline dark:placeholder:opacity-50 outline-none pb-[4px] px-4 block dark:!border-black/20"
                placeholder="dekorativna linija @focus"
                onFocus={() => setpu(100)}
                onBlur={() => setpu(0)}
              />
              <div
                className="absolute text-primary dark:text-white w-full"
                style={{
                  transform: "translateY(-2px)",
                  height: 2,
                }}
              >
                <ProgressBar
                  rounded={false}
                  progress={pu$}
                  duration={222}
                  origin="center"
                  height={2}
                  bg="none"
                />
              </div>
            </div>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              className="items-center justify-between px-2 sm:px-4 mt-2"
            >
              <div className="w-16 h-16 text-primary dark:text-white shrink-0">
                <ProgressRing
                  progress={ps$}
                  rounded={true}
                  allowDecrease
                  width={25}
                  bg="none"
                  anchor={180}
                  duration={89}
                />
              </div>
              <div
                ref={refScrollDiv}
                className="h-40 overflow-y-auto p-4 mt-4 scrollbar-none"
              >
                <p className="text-center">skroluj sadržaj, progress @scroll</p>
                <p className="opacity-20 text-justify text-sm">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Maxime placeat harum voluptas repudiandae minus explicabo
                  velit saepe suscipit consequatur! Voluptate vel accusamus
                  corporis nobis, hic odit facilis illum consectetur reiciendis
                  quia nam at ipsum exercitationem ab fugiat maiores aut atque
                  natus ducimus quaerat magnam suscipit ut repudiandae? Facere
                  eligendi impedit voluptate animi obcaecati aliquam libero.
                </p>
                <p className="opacity-20 text-justify text-sm">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Maxime placeat harum voluptas repudiandae minus explicabo
                  velit saepe suscipit consequatur! Voluptate vel accusamus
                  corporis nobis, hic odit facilis illum consectetur reiciendis
                  quia nam at ipsum exercitationem ab fugiat maiores aut atque
                  natus ducimus quaerat magnam suscipit ut repudiandae? Facere
                  eligendi impedit voluptate animi obcaecati aliquam libero.
                </p>
                <p className="opacity-20 text-justify text-sm">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Maxime placeat harum voluptas repudiandae minus explicabo
                  velit saepe suscipit consequatur! Voluptate vel accusamus
                  corporis nobis, hic odit facilis illum consectetur reiciendis
                  quia nam at ipsum exercitationem ab fugiat maiores aut atque
                  natus ducimus quaerat magnam suscipit ut repudiandae? Facere
                  eligendi impedit voluptate animi obcaecati aliquam libero.
                </p>
                <p className="opacity-20 text-justify text-sm">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Maxime placeat harum voluptas repudiandae minus explicabo
                  velit saepe suscipit consequatur! Voluptate vel accusamus
                  corporis nobis, hic odit facilis illum consectetur reiciendis
                  quia nam at ipsum exercitationem ab fugiat maiores aut atque
                  natus ducimus quaerat magnam suscipit ut repudiandae? Facere
                  eligendi impedit voluptate animi obcaecati aliquam libero.
                </p>
              </div>
            </Stack>
          </Paper>
        </Box>
        {/*  */}
        {/*  */}
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
            Indikatori napretka obaveštavaju korisnike o statusu tekućih
            procesa, kao što je učitavanje aplikacije, podnošenje obrasca ili
            čuvanje ažuriranja.
          </p>
        </Box>
        <Box fontSize="89%" sx={{ opacity: 0.56 }}>
          <Chip label="en" variant="outlined" />
          <p>
            Progress indicators inform users about the status of ongoing
            processes, such as loading an app, submitting a form, or saving
            updates.
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
                        className="font-bold text-center mb-2"
                        variant="h5"
                        component="h2"
                      >
                        Progress --props
                      </Typography>
                      <Box component="dl">
                        {[
                          {
                            key: "progress",
                            value: "postavlja vrednost kompnente",
                          },
                          {
                            key: "anchor",
                            value: "polazna tačka za progres animaciju",
                          },
                          {
                            key: "allowDecrease",
                            value:
                              "da li uzima samo inkrementirajuće vrednosti",
                          },
                          {
                            key: "onProgress",
                            value:
                              "izvršava proceduru pri promeni progres vrednosti",
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

export default PageProgress;
