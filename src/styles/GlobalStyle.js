import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
  ${reset}

  a {
    color: #000;
    text-decoration: none;
  }
`;

export default GlobalStyle;
