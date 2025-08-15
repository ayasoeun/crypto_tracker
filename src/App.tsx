import styled, { createGlobalStyle } from "styled-components"; //전역 스타일 적용을 위한 createGlobalStyle import
import { ReactQueryDevtools } from "react-query/devtools"; //to see react cache
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import ToDoList from "./toDoList";

const GlobalStyle = createGlobalStyle` //이렇게 전역 스타일을 적용해줄 수 있다. 사용법은 일반 styled components와 동일하다. 이곳에 css 리셋 코드를 적는다.
    @import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap');
    // Source Sans 3 을 google font 에서 import 부분 따온다
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
    time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
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
    font-family: "Source Sans 3", sans-serif; // "Source Sans 3" 처럼 임포트한 폰트만 따옴표로 감싸줘야 됨 "" 안에 sans-serif 같이 쓰지 말것
}
a {
    text-decoration: none;
    color: inherit;
}
*{
    box-sizing: border-box;
}
`;

function App() {
    return (
        <>
            <GlobalStyle />
            <ToDoList />
        </>
    );
}

export default App;
