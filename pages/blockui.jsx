import LayoutMain from "../components/layout/LayoutMain";
import { BlockUI, Link } from "../components";
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
const PageBlockui = () => {
  const { openGallery } = useFancyboxGallery();
  const { like, likeCount, isLiked } = useSocialLike("--blockui");

  //
  return (
    <LayoutMain>
      <section>
        1
      </section>
      {/*  */}
      <section className="space-y-4">
        2
      </section>
    </LayoutMain>
  );
};

export default PageBlockui;
