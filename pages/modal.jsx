import { useState, useEffect, useRef, Fragment } from "react";
import Head from "next/head";
import LayoutMain from "../components/layout/LayoutMain";
import { Link, BoxTransition, Modal } from "../components";
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
} from "@mui/material";
import {
  useSocialLike,
  useChartPlot,
  useStateSwitch,
  useBodyOverflow,
} from "../src/hooks";
import { BsCodeSlash, FaGithubAlt, FaPiggyBank } from "../components/icons";
import imgProps from "../public/modal.props.jpg";
import { random } from "../src/util";
import { useColorMode } from "../app/store";
//
//
const LINK_GITHUB_COMPONENT =
  "https://github.com/nikolav/demo-components.app/blob/main/components/Modal/Modal.jsx";
//
const reportGen = () =>
  "2022-01-30 2022-02-27 2022-03-30 2022-04-29 2022-05-30 2022-06-29 2022-07-30 2022-08-29 2022-09-29 2022-10-30 2022-11-29 2022-12-30"
    .split(" ")
    .map((date) => ({ date, value: random(1000) }));
//
//
const PageBoxTransition = () => {
  const { like, likeCount, isLiked } = useSocialLike("--Modal");
  const { isActive: isActiveModal, toggle: toggleIsActiveModal } =
    useStateSwitch();
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
  return (
    <LayoutMain>
      <section className="flex justify-center">
        <Head>
          <title>nikolav | Modal, ReactJS</title>
        </Head>
        <Box>
          <ButtonGroup
            variant="outlined"
            color="primary"
            size="large"
            fullWidth
            className="flex justify-center mt-8"
          >
            <Button
              className="flex justify-between px-2"
              onClick={toggleIsActiveModal.on}
            >
              <FaPiggyBank className="text-2xl" />
              <span className="inline-block ml-4">pregled finansija</span>
            </Button>
          </ButtonGroup>
        </Box>
        {/*  */}
        {/* modal.graph */}
        <Modal isActive={isActiveModal} onClose={toggleIsActiveModal.off}>
          <section className="mt-4 text-lg text-center">
            <p>
              2022. <em className="opacity-50">promenljivo...</em>
            </p>
          </section>
          <PlotChartDemo isActive={isActiveModal} />
        </Modal>
      </section>

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
            Dijalozi informišu korisnike o zadatku i mogu sadržati kritične
            informacije, zahtevati odluke ili uključiti više zadataka.
          </p>
        </Box>
        <Box fontSize="89%" sx={{ opacity: 0.56 }}>
          <Chip label="en" variant="outlined" />
          <p>
            Dialogs inform users about a task and can contain critical
            information, require decisions, or involve multiple tasks.
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
                        Modal --props
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

//
function PlotChartDemo({ isActive = true }) {
  const root = useRef();
  const { isDark } = useColorMode();
  const [d$, setd] = useState(null);
  const [i$, seti] = useState(null);
  const dataGen = () => setd(reportGen());
  const cleanup_ = () => clearInterval(i$);
  //
  useEffect(() => {
    if (isActive) {
      seti(setInterval(dataGen, 3456));
      dataGen();
    } else {
      cleanup_();
    }
    //
    return cleanup_;
  }, [isActive]);
  useChartPlot({
    isActive,
    data: d$,
    root: root?.current,
    options: {
      width: 640,
      color: isDark() ? "white" : "steelblue",
      paddingX: 48,
      _dotRadius: 5,
      _ticksX: 12,
    },
  });
  //
  return (
    <div className="flex justify-center mt-4">
      <div id="PlotChartDemo--container" ref={root} />
    </div>
  );
}
