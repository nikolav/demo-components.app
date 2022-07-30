import { useEffect, useRef, Fragment } from "react";
import Head from "next/head";
import LayoutMain from "../components/layout/LayoutMain";
import { Link, BoxTransition, Details } from "../components";
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
import { useSocialLike, useStateSwitch, useBodyOverflow } from "../src/hooks";
import { BsCodeSlash, FaGithubAlt } from "../components/icons";
import imgProps from "../public/details.props.jpg";
//
//
const LINK_GITHUB_COMPONENT =
  "https://github.com/nikolav/demo-components.app/blob/main/components/Details/Details.jsx";
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
  const { isActive: isActiveDetails, toggle: toggleDetails } = useStateSwitch();
  //
  //
  return (
    <LayoutMain>
      <section className="flex justify-center">
        <Head>
          <title>nikolav | Details, ReactJS</title>
        </Head>
        <Box className="justify-center mt-8 sm:w-10/12">
          <Details
            isActive={isActiveDetails}
            header={
              <Box
                onClick={toggleDetails}
                component="h4"
                className="text-white cursor-pointer p-2 pl-4 bg-primary/90 hover:bg-primary dark:bg-gray-700 rounded-lg"
              >
                {isActiveDetails ? "Zatvori" : "Prikaži"}
              </Box>
            }
          >
            <Box component="p" className="p-4 opacity-50">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio
              nobis perferendis explicabo accusantium recusandae? Incidunt quos
              perspiciatis nemo eligendi! Dolor labore consequuntur reiciendis
              possimus fugit, quas repellat harum est saepe!
            </Box>
          </Details>
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
            Omogućava proizvoljno skrivanje i prikazivanje sadržaja prema
            `isActive` signalu. Obično je deo većih komponenti, kao Accordion,
            gde je potrebna funkcionalnost opcionog prikazivanja sadržaja.
          </p>
        </Box>
        <Box fontSize="89%" sx={{ opacity: 0.56 }}>
          <Chip label="en" variant="outlined" />
          <p>
            Allows arbitrary hiding and displaying of content according to
            isActive signal. It is usually part of larger components, such as
            Accordion, where optional content visibilty functionality is
            required.
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
                        Details --props
                      </Typography>
                      <Box component="dl">
                        {[
                          {
                            key: "isActive",
                            value: "otvara/zatvara sadržaj komponente",
                          },
                          {
                            key: "header",
                            value: "sadržaj zaglavlja",
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
