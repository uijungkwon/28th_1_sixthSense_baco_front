import { createGlobalStyle } from 'styled-components';
import Hanna from "./Fonts/BMHANNAAir_ttf.ttf";
import Jua from "./Fonts/BMJUA_ttf.ttf";


export const GlobalStyle = createGlobalStyle`

@font-face {
    font-family: "Hanna";
    src: url(${Hanna});
  }
  
@font-face {
    font-family: "Jua";
    src: url(${Jua});
  }


html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video,button {

  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  font-family:"Hanna" ;
  font-size:17px;
  //font-weight:bold;// 굵기 결정 
}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
  font-family:"Hanna" ;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}


body {
  line-height: 1;
  font-family:"Hanna" ;
}
menu, ol, ul {
  list-style: none;
  font-family:"Hanna" ;
}
blockquote, q {
  quotes: none;
  font-family:"Hanna" ;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

body {
  font-weight: 500;
  color:${(props) => props.theme.white.darker};
  line-height: 1.2;
  background-color: black;
  font-family:"Hanna" ;
}
a {
  text-decoration:none;
  color:inherit;
}
`;