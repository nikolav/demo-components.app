import { useState, useEffect, useRef, Fragment } from "react";
import Head from "next/head"
import LayoutMain from "../components/layout/LayoutMain";
import { Link, Accordion, BoxTransition } from "../components";
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
  CardMedia,
  CardContent,
  CardActions,
  ClickAwayListener,
} from "@mui/material";
import { useSocialLike, useStateSwitch, useBodyOverflow } from "../src/hooks";
import { BsCodeSlash, FaGithubAlt } from "../components/icons";
import imgAccProps from "../public/accordion.props.default.jpg";
//
const PageAccordion = () => {
  const { like, likeCount, isLiked } = useSocialLike("--accordion");
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
  }, [isOpenPopper])
  //
  return (
    <LayoutMain>
      <section>
      <Head>
          <title>nikolav | Accordion,  ReactJS</title>
        </Head>

        <Accordion
          onToggle={(tabs) => console.log(tabs)}
          active="react"
          className="space-y-1"
        >
          <Accordion
            item
            key="css"
            header={
              <Typography
                className="accordion-header bg-slate-100"
                variant="h4"
              >
                CSS
              </Typography>
            }
          >
            <Box className="p-2">
              <p>
                Kaskadni listovi stilova su jezik stilskih tablica koji se
                koristi za opisivanje prezentacije dokumenta napisanog u markup
                jeziku kao što je HTML ili XML. CSS je tehnologija temelj WWW,
                pored HTML-a i JavaScript-a.
              </p>
            </Box>
          </Accordion>
          <Accordion
            item
            key="svg"
            header={
              <Typography
                className="accordion-header bg-slate-100"
                variant="h4"
              >
                SVG
              </Typography>
            }
          >
            <Box className="p-2">
              <p>
                Skalabilna vektorska grafika je format vektorske slike zasnovan
                na XML-u za definisanje dvodimenzionalne grafike, koji ima
                podršku za interaktivnost i animaciju. SVG specifikacija je
                otvoreni standard koji je razvio WWW Consortium od 1999. godine.
              </p>
            </Box>
          </Accordion>
          <Accordion
            item
            key="react"
            header={
              <Typography
                className="accordion-header bg-slate-100"
                variant="h4"
              >
                REACTJS
              </Typography>
            }
          >
            <Box className="p-2">
              <p>
                React je besplatna JavaScript biblioteka otvorenog koda za
                pravljenje korisničkih interfejsa zasnovanih na komponentama
                korisničkog interfejsa. Održavaju ga Meta i zajednica
                pojedinačnih programera i kompanija.
              </p>
            </Box>
          </Accordion>
        </Accordion>
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
              <Tooltip placement="top" title="komponenta @github">
                <Button>
                  <Link href="https://github.com/nikolav/demo-components.app/blob/main/components/Accordion/Accordion.jsx">
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
            Komponenta harmonika omogućava korisniku da prikaže i sakrije delove
            srodnog sadržaja na stranici. Harmonika je lagani kontejner koji se
            može koristiti samostalno ili biti povezan sa većom površinom, kao
            što je kartica.
          </p>
        </Box>
        <Box fontSize="89%" sx={{ opacity: 0.56 }}>
          <p>
            <Chip label="en" variant="outlined" />
          </p>
          <p>
            The accordion component allows the user to show and hide sections of
            related content on a page. An accordion is a lightweight container
            that may either be used standalone, or be connected to a larger
            surface, such as a card.
          </p>
        </Box>
        <>
          <Popper
            open={isOpenPopper}
            anchorEl={refButton.current}
            placement="bottom"
            modifiers={[
              {
                name: "offset", 
                options: {
                  offset: [0, -128]
                }
              }
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
                  <Card
                  className="shadow-md"
                  sx={{ maxWidth: 356 }}>
                    <CardMedia
                      component="img"
                      height={96}
                      image={imgAccProps.src}
                    />
                    <CardContent>
                      <Typography
                        className="font-bold text-center"
                        variant="h5"
                        component="h2"
                      >
                        Accordion --props
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <Box component="dl">
                          {[
                            {
                              key: "active",
                              value: "otvara karticu sa ovim klučem @mount",
                            },
                            {
                              key: "expanded",
                              value:
                                "ostavlja karticu otvorenu nakon aktivacije drugih",
                            },
                            {
                              key: "item",
                              value: "prikazuje elemente samo sa ovim `flagom`",
                            },
                            {
                              key: "onToggle",
                              value: "izvršava proceduru pri promeni kartice",
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

export default PageAccordion;
