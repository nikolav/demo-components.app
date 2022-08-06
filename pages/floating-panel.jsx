import { useEffect, useRef, Fragment } from "react";
import Head from "next/head";
import { motion } from "framer-motion";
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
  IconButton,
  Paper,
  Popper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  useBodyOverflow,
  useInputSynced,
  useSocialComments,
  useSocialLike,
  useStateSwitch,
} from "../src/hooks";
import { useAppData, USERNAME } from "../app/store";
import LayoutMain from "../components/layout/LayoutMain";
import { Link, BoxTransition, FloatingPanel } from "../components";
import { SendIcon, BsCodeSlash, FaGithubAlt } from "../components/icons";
import { map } from "../src/util";
import imgProps from "../public/floating-panel.props.jpg";

//
//
const LINK_GITHUB_COMPONENT =
  "https://github.com/nikolav/demo-components.app/blob/main/components/FloatingPanel/FloatingPanel.jsx";
//
const CHAT_ID = "--FloatingPanel-chat";
//
const PageBoxTransition = () => {
  const { like, likeCount, isLiked } = useSocialLike("--FloatingPanel");
  const appdata = useAppData();
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
  // @@chat .firebase
  const chat = useSocialComments(CHAT_ID);
  const fields = useInputSynced(
    {
      comment: (text) => 0 < text?.length,
      name: (text) => 0 < text?.length,
    },
    {
      onSubmit: (message) => {
        chat.add(message);
        appdata.set(USERNAME, message.name);
        fields.setInput("comment", "");
        // saved
        // no reset
        return false;
      },
      onError: (fields) => console.log(fields),
    }
  );
  //
  // read user @init
  useEffect(() => {
    fields && fields.setInput("name", appdata(USERNAME));
  }, []);
  ////
  /////
  return (
    <LayoutMain>
      <section className="flex justify-center">
        <Head>
          <title>nikolav | FloatingPanel, ReactJS</title>
        </Head>
        <Box>
          <FloatingPanel
            title={<em className="font-bold">chat.with@nikolav.admin</em>}
            className="rounded-b-xl overflow-hidden"
            offsetTop={312}
          >
            <Paper elevation={0} className="relative z-[1]">
              <Box className="h-[256px] p-2 py-4 overflow-y-auto scrollbar-thin scrollbar-thin--dark">
                <Box component="section" className="space-y-2">
                  {map(chat.ls(), (message) => (
                    <motion.div
                      initial={{ opacity: 0, x: 56 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={message.key}
                      className="bg-slate-100/80 hover:bg-slate-100 dark:bg-slate-800/20 p-2 rounded flex items-start space-x-4"
                    >
                      <div className="text-xs w-32 opacity-50">
                        {message.name}
                      </div>
                      <div className="text-sm grow">{message.comment}</div>
                    </motion.div>
                  ))}
                </Box>
              </Box>
              <Box className="p-2 px-4 text-white bg-primary dark:bg-slate-800 ***rounded-b-xl">
                <form noValidate onSubmit={fields.handle}>
                  <Stack
                    direction="row"
                    className="justify-between items-center"
                  >
                    <input
                      onChange={fields.sync}
                      value={fields.values.name}
                      type="text"
                      name="name"
                      id="name-box"
                      autoComplete="off"
                      placeholder="ime"
                      className="w-32 mx-2 px-2 input-underline placeholder:text-white/70 placeholder:italic"
                    />
                    <input
                      onChange={fields.sync}
                      value={fields.values.comment}
                      type="text"
                      name="comment"
                      id="comment-box"
                      autoFocus
                      autoComplete="off"
                      placeholder="poruka..."
                      className="mx-2 px-2 input-underline placeholder:text-white/70 placeholder:italic"
                    />
                    <ButtonGroup>
                      <IconButton type="submit">
                        <SendIcon className="text-white text-3xl" />
                      </IconButton>
                    </ButtonGroup>
                  </Stack>
                </form>
              </Box>
            </Paper>
          </FloatingPanel>
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
            Komponenta <em>FloatingPanel</em> je celina sastavljena od više
            manjih jedinica sklopljenih u jednu celinu koja korisniku omogućava
            da lakše radi sa alatima, postavlja ih gde odgovara ili da ih
            privremeno sakrije.
          </p>
        </Box>
        <Box fontSize="89%" sx={{ opacity: 0.56 }}>
          <Chip label="en" variant="outlined" />
          <p>
            This component consists of several smaller components assembled into
            a single unit that allows the user to work with tools more easily,
            place them where it suits or hide them temporarily.
          </p>
        </Box>
        {/*  */}
        {/*  */}
        {/*  */}
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
              effect={{ in: "flipInY", out: "flipOutY" }}
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
                      FloatingPanel --props
                    </Typography>
                    <Box component="dl">
                      {[
                        {
                          key: "title",
                          value: "naslov krtice",
                        },
                        {
                          key: "offsetTop",
                          value:
                            "razmak od vrha ekrana pri prvom otvaranju strane",
                        },
                        {
                          key: "width",
                          value: "širina kartice",
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
      </section>
    </LayoutMain>
  );
};

export default PageBoxTransition;
