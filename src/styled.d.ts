// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  type Color = [string, string, string];
  type TextColor = [string, string, string, string];

  export interface DefaultTheme {
    pallete: {
      background: string;

      // Surface
      surface: [string, string, string];

      // Text
      text: TextColor;

      // Base Colors
      red: Color;
      orange: Color;
      yellow: Color;
      green: Color;
      blue: Color;
      purple: Color;
    };

    borderRadius: [string, string];
    boxShadow: [string];
  }
}
