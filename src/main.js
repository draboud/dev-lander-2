console.log("instructions-b");
//.......................................................................
//.......................................................................
//IMPORTS
import {
  BLACKOUT_INIT,
  BLACKOUT_STANDARD,
  DELAY_BEFORE_FEATURE_TEXT,
  INSTRUCTION_VIDS_LOOPING,
  NO_OF_INSTRUCTION_VIDS,
  PAUSE_AFTER_FEATURE_END,
  PAUSE_BETWEEN_INSTRUCTION_VIDS,
} from "./0_config";
import * as global from "./0_globalVarsAndFunctions";
import navigation from "./0_navigation";
import features from "./1_features";
import components from "./2_components";
import instructions from "./3_instructions";
//.......................................................................
//.......................................................................
//NAVIGATION
const MainAllNavLinks = function (navLink) {
  global.SetActiveSectionName(navLink.classList[1]);
  global.SetActiveSection(
    document.querySelector(`.section_${global.activeSectionName}`)
  );
  global.navLinkDropdownMenu.classList.remove("active");
  navigation.ActivateNavLink();
  if (components.activeDatasheet)
    components.activeDatasheet
      .querySelector(".comp-data-body-wrap")
      .scroll(0, 0);
  navigation.ResetSectionSpecial();
  clearTimeout(features.featureTextTimer);
  clearTimeout(features.featureVidTimer);
  clearTimeout(instructions.instructionVidTimer);
  features.featureTextTimer = null;
  features.featureVidTimer = null;
  instructions.instructionVidTimer = null;
  global.pauseWrapper.style.pointerEvents = "none";
  global.pauseWrapper.classList.remove("active");
  global.SetPauseFlag(false);
  global.ResetSectionVideos("all");
  global.DeactivateActivateSectionText("main");
  global.ActivateSection();
  global.ActivateSectionButtons();
  if (global.activeSectionName === "features") global.PlaySectionVideo("main");
};
const MainNavLinkInstructionsClick = function () {
  global.DeactivateActivateNavDropdown();
};
const MainNavDropdownHoverIn = function () {
  global.navLinkDropdownMenu.classList.add("active");
  global.SetNavDropdownFlag(true);
};
const MainNavDropdownHoverOut = function () {
  global.navLinkDropdownMenu.classList.remove("active");
  global.SetNavDropdownFlag(false);
};
const MainAllNavLinkDropDownWrapsHoverIn = function (navLinkDropdownBtn) {
  navLinkDropdownBtn.classList.add("hovered");
};
const MainAllNavLinkDropDownWrapsHoverOut = function (navLinkDropdownBtn) {
  navLinkDropdownBtn.classList.remove("hovered");
};
const MainAllNavLinkDropDownWrapsClick = function () {
  global.DeactivateActivateNavDropdown();
};
const MainDropDownIconBtn = function () {
  global.DeactivateActivateNavDropdown();
  navigation.ActivateNavLinkDropdown(global.navLinkInstructions);
};
const MainNavBtnMobile = function () {
  if (global.navDropdownFlag) global.DeactivateActivateNavDropdown();
  global.allNavLinks.forEach(function (el) {
    el.classList.remove("current");
    if (el.classList.contains(global.activeSectionName))
      el.classList.add("current");
  });
};
const MainAllCtrlBtnsMouseEnter = function (ctrlBtn) {
  ctrlBtn.classList.add("hovered");
};
const MainAllCtrlBtnsMouseLeave = function (ctrlBtn) {
  ctrlBtn.classList.remove("hovered");
};
//.......................................................................
//.......................................................................
//FEATURES
const MainFeaturesVidsEnds = function () {
  features.featureVidTimer = setTimeout(function () {
    global.FlashBlackout(BLACKOUT_STANDARD);
    global.DeactivateActivateSectionImage();
    global.DeactivateActivateSectionText("main");
    global.ActivateSectionVideo("main");
    global.PlaySectionVideo("main");
    global.DeactivateActivateCurrentCtrlButtons("features", false);
  }, PAUSE_AFTER_FEATURE_END);
};
const MainCtrlBtnsFeatures = function () {
  clearTimeout(features.featureTextTimer);
  clearTimeout(features.featureVidTimer);
  global.FlashBlackout(BLACKOUT_STANDARD);
  global.PrepSectionAndPlayVideo("features", global.ctrlBtnIndex);
  global.DeactivateActivateCurrentCtrlButtons("features", global.ctrlBtnIndex);
  features.featureTextTimer = setTimeout(function () {
    global.DeactivateActivateSectionText("feature", global.ctrlBtnIndex);
  }, DELAY_BEFORE_FEATURE_TEXT);
};
//.......................................................................
//.......................................................................
//COMPONENTS
const MainVidsComponentDatasheetsEnds = function () {
  components.DisplayDataSheet();
};
const MainBackBtn = function () {
  components.activeDatasheet.querySelector(".comp-data-body-wrap").scroll(0, 0);
  global.ResetSectionVideos("components", "datasheets");
  global.DeactivateActivateSectionImage(global.currentViewName);
  components.dimmer.classList.remove("active");
  components.ActivateDeactivateDatasheetTextAndButtons(false);
  global.DeactivateActivateSectionText("main");
  global.ActivateSection();
  global.ActivateSectionButtons();
};
const MainCtrlBtnsComponents = function () {
  components.optsMenu.classList.remove("active");
  global.PrepSectionAndPlayVideo("datasheets", global.ctrlBtnIndex);
  components.ctrlBtnWrapperComponents.classList.remove("active");
};
const MainOptionsMenuBtn = function () {
  components.optsMenu.classList.add("active");
};
const MainOptionsMenuOpt = function (clickedBtnContent) {
  components.optsMenu.classList.remove("active");
  if (global.currentViewName !== clickedBtnContent) {
    global.SetCurrentViewName(clickedBtnContent);
    components.optsMenuBtn.textContent = global.currentViewName;
    global.PrepSectionAndPlayVideo(global.currentViewName);
    components.ctrlBtnWrapperComponents.classList.remove("active");
  }
};
const MainComponentVidsViewsEnds = function () {
  global.DeactivateActivateSectionImage(global.currentViewName);
  global.DeactivateActivateSectionText("main");
  components.ctrlBtnWrapperComponents
    .querySelectorAll(".ctrl-btn")
    .forEach(function (el) {
      el.classList.remove("active");
    });
  global.DeactivateActivateCtrlBtnRange(
    "components",
    global.startBtnRange,
    global.endBtnRange
  );
  components.ctrlBtnWrapperComponents.classList.add("active");
};
const MainTextImgBtn = function () {
  components.textImgBtnLabel === "image"
    ? (components.textImgBtn.textContent = "text")
    : (components.textImgBtn.textContent = "image");
  components.textImgBtnLabel = components.textImgBtn.textContent;
  components.activeDatasheet
    .querySelector(".comp-data-body-wrap")
    .classList.toggle("active");
  components.dimmer.classList.toggle("active");
};
//.......................................................................
//.......................................................................
//INSTRUCTIONS
const MainInstructionsVidsEnds = function () {
  instructions.instructionVidTimer = setTimeout(function () {
    instructions.currentInstructionVid += 1;
    if (
      instructions.currentInstructionVid === NO_OF_INSTRUCTION_VIDS &&
      INSTRUCTION_VIDS_LOOPING
    ) {
      instructions.currentInstructionVid = 0;
    } else if (
      instructions.currentInstructionVid === NO_OF_INSTRUCTION_VIDS &&
      !INSTRUCTION_VIDS_LOOPING
    ) {
      instructions.ResetToInstructionsMainScreen();
      return;
    }
    global.FlashBlackout(BLACKOUT_STANDARD);
    global.ActivateSectionVideo(
      "instructions",
      instructions.currentInstructionVid
    );
    global.PlaySectionVideo(
      "instructions",
      instructions.currentInstructionVid,
      true
    );
    global.DeactivateActivateCurrentCtrlButtons(
      "instructions",
      instructions.currentInstructionVid
    );
  }, PAUSE_BETWEEN_INSTRUCTION_VIDS);
};
const MainVidsInstructionsPauseUnpause = function () {
  if (global.pauseFlag) {
    global.pauseWrapper.classList.add("active");
    instructions.allVidsInstructions[
      instructions.currentInstructionVid
    ].pause();
    instructions.allVidsInstructionsMobileP[
      instructions.currentInstructionVid
    ].pause();
  } else {
    global.pauseWrapper.classList.remove("active");
    instructions.allVidsInstructions[instructions.currentInstructionVid].play();
    instructions.allVidsInstructionsMobileP[
      instructions.currentInstructionVid
    ].play();
  }
};
const MainCtrlBtnsInstructions = function () {
  global.SetPauseFlag(false);
  global.pauseWrapper.classList.remove("active");
  clearTimeout(instructions.instructionVidTimer);
  instructions.instructionVidTimer = null;
  global.FlashBlackout(BLACKOUT_STANDARD);
  global.ActivateSectionVideo(
    "instructions",
    instructions.currentInstructionVid
  );
  global.ResetSectionVideos();
  global.PrepSectionAndPlayVideo(
    "instructions",
    instructions.currentInstructionVid,
    true
  );
  global.DeactivateActivateCurrentCtrlButtons(
    "instructions",
    instructions.currentInstructionVid
  );
};
//.......................................................................
//.......................................................................
//INIT
const init = function () {
  navigation.AddHandlerAllNavLinks(MainAllNavLinks);
  navigation.AddHandlerNavLinkInstructionsHoverIn(MainNavDropdownHoverIn);
  navigation.AddHandlerNavLinkInstructionsHoverOut(MainNavDropdownHoverOut);
  navigation.AddHandlerNavLinkInstructionsClick(MainNavLinkInstructionsClick);
  navigation.AddHandlerNavLinkDropdownMenuHoverIn(MainNavDropdownHoverIn);
  navigation.AddHandlerNavLinkDropdownMenuHoverOut(MainNavDropdownHoverOut);
  navigation.AddHandlerAllNavLinkDropDownWraps(
    MainAllNavLinkDropDownWrapsHoverIn,
    MainAllNavLinkDropDownWrapsHoverOut,
    MainAllNavLinkDropDownWrapsClick
  );
  navigation.AddHandlerDropDownIconBtn(MainDropDownIconBtn);
  navigation.AddHandlerNavBtnMobile(MainNavBtnMobile);
  features.AddHandlerVidsFeaturesEnd(MainFeaturesVidsEnds);
  components.AddHandlerVidsComponentDatasheetsEnds(
    MainVidsComponentDatasheetsEnds
  );
  navigation.AddHandlerAllCtrlBtnsMouseEnter(MainAllCtrlBtnsMouseEnter);
  navigation.AddHandlerAllCtrlBtnsMouseLeave(MainAllCtrlBtnsMouseLeave);
  features.AddHandlerCtrlBtnWrapperFeatures(MainCtrlBtnsFeatures);
  components.AddHandlerMenuBtn(MainOptionsMenuBtn);
  components.AddHandlerMenuOptBtn(MainOptionsMenuOpt);
  components.AddHandlerBackBtn(MainBackBtn);
  components.AddHandlerVidsComponentViewsEnds(MainComponentVidsViewsEnds);
  components.AddHandlerTextImgBtn(MainTextImgBtn);
  components.AddHandlerCtrlBtnWrapperComponents(MainCtrlBtnsComponents);
  instructions.AddHandlerVidsInstructionsEnds(MainInstructionsVidsEnds);
  instructions.AddHandlerVidsInstructionsPause(
    MainVidsInstructionsPauseUnpause
  );
  instructions.AddHandlerCtrlBtnWrapperInstructions(MainCtrlBtnsInstructions);
  global.ctrlBtnWrapper.classList.remove("active");
};
//.......................................................................
//.......................................................................
//LOADER
init();
window.addEventListener("load", function () {
  global.navLinkInstructions.click();
  global.navLinkDropdownMenu.classList.remove("active");
  global.navLinkComponents.click();
  global.navLinkFeatures.click();
  this.setTimeout(function () {
    global.navBar.classList.add("active");
    global.ctrlBtnWrapper.classList.add("active");
    global.SetInitializing(false);
    global.loader.classList.remove("active");
    global.blackout.classList.add("off");
  }, BLACKOUT_INIT);
});
