import i18n from "i18next";
import { Dispatch } from "store";

export const CHANGE_LANGUAGE = "change_language";
export const ADD_LANGUAGE = "add_language";

interface ChangeLanguageAction {
  type: typeof CHANGE_LANGUAGE;
  payload: "en" | "zh";
}

interface AddLanguageAction {
  type: typeof ADD_LANGUAGE;
  payload: {
    name: string;
    code: string;
  };
}

export type LanguageActionTypes = ChangeLanguageAction | AddLanguageAction;

export const changeLanguageActionCreator = (
  languageCode: "en" | "zh"
): ChangeLanguageAction => {
  return {
    type: CHANGE_LANGUAGE,
    payload: languageCode,
  };
};

export const addLanguageActionCreator = (
  name: string,
  code: string
): AddLanguageAction => {
  return {
    type: ADD_LANGUAGE,
    payload: {
      name,
      code,
    },
  };
};

export const changeLanguageWithEffectActionCreator = (
  languageCode: "en" | "zh"
) => {
  return (dispatch: Dispatch) => {
    i18n.changeLanguage(languageCode);
    dispatch(changeLanguageActionCreator(languageCode));
  };
};
