import { useLayout } from "../layout/core";
import { ThemeModeComponent } from "../assets/ts/layout";

export const toAbsoluteUrl = (pathname: string) =>
  import.meta.env.BASE_URL + pathname;

  export const toApiUrl = (pathname: string) =>
  import.meta.env.VITE_IMAGE_BASE_URL + pathname; 

  export const toAgentApiUrl = (pathname: string) =>
  import.meta.env.VITE_AGENT_IMAGE_BASE_URL + pathname;



export const useIllustrationsPath = (illustrationName: string): string => {
  const { config } = useLayout();

  const extension = illustrationName.substring(
    illustrationName.lastIndexOf("."),
    illustrationName.length
  );
  const illustration =
    ThemeModeComponent.getMode() === "dark"
      ? `${illustrationName.substring(
          0,
          illustrationName.lastIndexOf(".")
        )}-dark`
      : illustrationName.substring(0, illustrationName.lastIndexOf("."));
  return toAbsoluteUrl(
    `media/illustrations/${config.illustrations?.set}/${illustration}${extension}`
  );
};
