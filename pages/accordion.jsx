import LayoutMain from "../components/layout/LayoutMain";
import { Link, Accordion } from "../components";
import {
  Stack,
  Box,
  Typography,
  Chip,
  ButtonGroup,
  Button,
  Tooltip,
} from "../components/mui";
import {
  useSocialLike,
  // useStateSwitch,
  useFancyboxGallery,
} from "../src/hooks";
import { BsCodeSlash, FaGithubAlt } from "../components/icons";
//
const PageAccordion = () => {
  const { openGallery } = useFancyboxGallery();
  const { like, likeCount, isLiked } = useSocialLike("--accordion");

  //
  return (
    <LayoutMain>
      <section>
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
              <Tooltip placement="top" title="ulaz, `props`">
                <Button
                  onClick={() =>
                    openGallery([
                      {
                        src: "/accordion.props.default.jpg",
                        caption:
                          "PROPS: `active` otvara prvu karticu sa ovim kljucem; `expanded` ostavlja karticu otvorenu posle aktiviranja drugih; `item` prikazuje samo elemente sa ovim atributom; `onToggle` izvrsava proceduru pri promeni kartice",
                      },
                    ])
                  }
                >
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
      </section>
    </LayoutMain>
  );
};

export default PageAccordion;
