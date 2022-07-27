import { useEffect, useRef, Fragment } from "react";
import Head from "next/head";
import LayoutMain from "../components/layout/LayoutMain";
import { Link, BoxTransition, Drag } from "../components";
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
import { useSocialLike, useStateSwitch, useBodyOverflow } from "../src/hooks";
import { MdDragIndicator, BsCodeSlash, FaGithubAlt } from "../components/icons";
//
//
const LINK_GITHUB_COMPONENT =
  "https://github.com/nikolav/demo-components.app/blob/main/components/Drag/Drag.jsx";
//
const PageBoxTransition = () => {
  const { like, likeCount, isLiked } = useSocialLike("--Drag");
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
          <title>nikolav | Drag, ReactJS</title>
        </Head>
        <Box>
          {/*  */}
          {/* widget */}
          <Drag>
            <Stack direction="column" spacing={2} className="fixed z-10 w-80">
              <Drag.Handle>
                <Paper
                  elevation={2}
                  component="h4"
                  className="flex justify-between items-center shadow-lg p-2 px-4 bg-primary dark:bg-gray-800"
                  sx={{
                    backgroundColor: ({ palette }) => "dark" === palette.mode ? palette.background.paper : "primary.main"
                  }}
                >
                  <MdDragIndicator className="text-2xl text-white" />
                  <strong className="text-white">Alati</strong>
                </Paper>
              </Drag.Handle>
              <Paper className="p-4" elevation={2}>
                <p className="text-black/50 dark:text-white">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Earum inventore vel officiis blanditiis debitis, qui, iste
                  pariatur quidem omnis laborum, ducimus vero! Labore ex
                  repellendus suscipit consequuntur? Animi, atque dolor.
                </p>
              </Paper>
            </Stack>
          </Drag>
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
            Veliki broj aplikacija online zahteva kompleksnu
            &apos;drag-drop&apos; funkcionalnost. Za prevlačenje ova komponenta
            u pozadini koristi{" "}
            <a
              className="link text-primary dark:text-white dark:font-bold"
              rel="noreferrer"
              target="_blank"
              href="https://www.framer.com/motion/"
            >
              <em>framer-motion</em>
            </a>{" "}
            endžin za animacije transformacija.
          </p>
        </Box>
        <Box fontSize="89%" className="text-black/50 dark:text-white">
          <p>
            <Chip label="en" variant="outlined" />
          </p>
          <p>
            Large number of applications online require complex drag-drop
            functionality. Drag component in the background uses framer-motion
            transformation animations engine.
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
                    <CardContent>
                      <Typography
                        className="font-bold text-center mb-2"
                        variant="h5"
                        component="h2"
                      >
                        Drag --props
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <Box component="dl">
                          {[
                            {
                              key: "-",
                              value:
                                "Ne uzima ulaz već se direktno koristi. Drag.Handle komponenta označava deo koji služi kao ručica za prevlačenje.",
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
