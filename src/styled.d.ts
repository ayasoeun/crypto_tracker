import "styled-components";

declare module "styled-components" { // 'styled' components 임!! 오타 조심..
    export interface DefaultTheme {
        bgColor: string;
        textColor: string;
        accentColor: string;
    } 

}//styled-components는 이미 내부적으로 DefaultTheme이라는 인터페이스를 가지고 있음
// 이를 확장할 때 declare를 쓴다(기존 styled-components의 타입과 경쟁하지 않도록)