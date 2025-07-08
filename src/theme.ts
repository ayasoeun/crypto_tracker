import { DefaultTheme } from "styled-components"; //styled-components에서 제공하는 기본 테마 타입 정의를 불러오는 코드야
//	theme라는 객체를 정의하고, 그 타입이 DefaultTheme이라고 명시함.
export const theme: DefaultTheme = {
    bgColor: "#2f3640",
    textColor: "#f5f6fa",
    accentColor: "#44bd32",
};
// // js object이다. const theme = {} 이 기본 형식. 여기서 DefaultTheme 이라고 타입을 설명해준 것임