import styled from "styled-components";
import { Link } from "react-router-dom";

export const Links = styled(Link)`
  text-decoration: none;
  color: white;
  &:hover {
    text-decoration: underline;
  }
`;
