//.......................................................................
//.......................................................................
//IMPORTS
import {
  COMP_BTNS_END_RANGE_A,
  COMP_BTNS_END_RANGE_B,
  COMP_BTNS_START_RANGE_A,
  COMP_BTNS_START_RANGE_B,
} from "./0_config";
import * as global from "./0_globalVarsAndFunctions";
import features from "./1_features";
import components from "./2_components";
import instructions from "./3_instructions";
//.......................................................................
//.......................................................................
//CLASS
class navigation {
  AddHandlerAllCtrlBtnsMouseEnter = function (handler) {
    global.allCtrlBtns.forEach(function (el) {
      el.addEventListener("mouseenter", function () {
        handler(el);
      });
    });
  };
  AddHandlerAllCtrlBtnsMouseLeave = function (handler) {
    global.allCtrlBtns.forEach(function (el) {
      el.addEventListener("mouseleave", function () {
        handler(el);
      });
    });
  };
  AddHandlerAllNavLinks = function (handler) {
    global.allNavLinks.forEach(function (el) {
      el.addEventListener("click", function (e) {
        const clicked = e.target.closest(".nav_menu_link");
        if (!clicked) return;
        handler(clicked);
      });
    });
  };
  ActivateNavLink = function () {
    global.allNavLinks.forEach(function (el) {
      el.classList.remove("current");
      if (el.classList.contains(global.activeSectionName))
        el.classList.add("current");
    });
  };
  ResetSectionSpecial = function () {
    switch (global.activeSectionName) {
      case "features":
        global.ActivateSectionVideo("main");
        global.DeactivateActivateCurrentCtrlButtons("features");
        break;
      case "components":
        components.optsMenu.classList.remove("active");
        global.DeactivateActivateSectionImage(global.currentViewName);
        [
          components.datasheetsAllWrapper,
          ...components.allDatasheetWraps,
        ].forEach(function (el) {
          el.classList.remove("active");
        });
        if (global.currentViewName === "view-a") {
          global.SetStartBtnRange(COMP_BTNS_START_RANGE_A);
          global.SetEndBtnRange(COMP_BTNS_END_RANGE_A);
        } else {
          global.SetStartBtnRange(COMP_BTNS_START_RANGE_B);
          global.SetEndBtnRange(COMP_BTNS_END_RANGE_B);
        }
        components.dimmer.classList.remove("active");
        components.textImgBtn.textContent = "image";
        components.textImgBtnLabel = "image";
        global.DeactivateActivateCtrlBtnRange(
          "components",
          global.startBtnRange,
          global.endBtnRange
        );
        break;
      case "instructions":
        global.DeactivateActivateSectionImage("main");
        global.DeactivateActivateCurrentCtrlButtons("instructions");
        break;
    }
  };
}
export default new navigation();
