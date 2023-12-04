import { createGlobalStyle } from 'styled-components';
import background from "./images/background.jpg";

const GlobalStyle = createGlobalStyle`
body {
    margin-top: 80px;
    margin-left: 0;
    font-family: monospace,Arial, Helvetica, sans-serif;
    width: 100vw;
    height: 100vh;
}

body::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url(${background}) center/cover no-repeat;
    background-size: cover;
    opacity: 0.4; /* Adjust the opacity as needed */
    z-index: -1; /* Place the pseudo-element behind other content */
  }
`;

export default GlobalStyle;