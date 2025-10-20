console.log("Oct 20, 2025 - error catching");
//.......................................................................
//.......................................................................
//IMPORTS
import {
  BLACKOUT_INIT,
  BLACKOUT_STANDARD,
  DELAY_BEFORE_FEATURE_TEXT,
  DELAY_BEFORE_UI_START,
  DELAY_BETWEEN_START_CLICK_AND_PLAY,
  INSTRUCTION_VIDS_LOOPING,
  NO_OF_INSTRUCTION_VIDS,
  PAUSE_AFTER_FEATURE_END,
  PAUSE_BETWEEN_INSTRUCTION_VIDS,
} from "./0_config";
import * as global from "./0_global";
import navigation from "./0_nav";
import features from "./1_features";
import components from "./2_components";
import instructions from "./3_instructions";
//.......................................................................
//.......................................................................
//NAVIGATION
const MainStartButton = function () {
  global.startButtonWrapper.classList.remove("active");
  setTimeout(function () {
    global.DeactivateActivateSectionText();
    global.blackout.classList.add("off");
    features.allVidsFeatures[0].play();
    global.sectionFeatures.querySelectorAll(".vid-mobile-p")[0].play();
    setTimeout(function () {
      global.navBar.classList.add("active");
      global.DeactivateActivateSectionText("main");
      global.ctrlBtnWrapper.classList.add("active");
    }, DELAY_BEFORE_UI_START);
  }, DELAY_BETWEEN_START_CLICK_AND_PLAY);
};
const MainAllNavLinks = function (navLink, dropdownIndex) {
  if (dropdownIndex) global.SetDropdownIndex(dropdownIndex);
  else {
    dropdownIndex = 0;
    global.SetDropdownIndex(0);
  }
  global.SetActiveSectionName(navLink.classList[1]);
  if (!dropdownIndex) dropdownIndex = 0;
  global.SetActiveSection(
    document.querySelectorAll(`.section_${global.activeSectionName}`)[
      dropdownIndex
    ]
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
  components.optsDropdown.classList.remove("active");
  instructions.instructionVidTimer = null;
  global.pauseWrapper.style.pointerEvents = "none";
  global.pauseWrapper.classList.remove("active");
  global.SetPauseFlag(false);
  global.ResetSectionVideos("all");
  global.DeactivateActivateSectionText("main");
  global.ActivateSection(dropdownIndex);
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
const MainAllNavLinkDropDownOptsHoverIn = function (navLinkDropdownBtn) {
  navLinkDropdownBtn.classList.add("hovered");
};
const MainAllNavLinkDropDownOptsHoverOut = function (navLinkDropdownBtn) {
  navLinkDropdownBtn.classList.remove("hovered");
};
const MainAllNavLinkDropDownOptsClick = function (dropdownIndex) {
  MainAllNavLinks(global.activeSectionName, dropdownIndex);
  global.DeactivateActivateNavDropdown();
  document.querySelector(".w-nav-overlay").style.display = "none";
  document
    .querySelector(".nav_button.w-nav-button")
    .classList.remove("w--open");
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
const MainVidsComponentDatasheetsEnds = function () {
  components.DisplayDataSheet();
};
const MainOptionsMenuShow = function () {
  components.optsDropdown.classList.add("active");
};
const MainOptionsMenuHide = function () {
  components.optsDropdown.classList.remove("active");
};
const MainOptionsMenuDropdownClick = function (clickedBtnContent) {
  components.optsMenuWrapper.classList.remove("active");
  if (global.currentViewName !== clickedBtnContent) {
    global.SetCurrentViewName(clickedBtnContent);
    components.optsMenuBtn.textContent = global.currentViewName;
    global.PrepSectionAndPlayVideo(global.currentViewName);
    components.ctrlBtnWrapperComponents.classList.remove("active");
  }
  components.optsDropdown.classList.remove("active");
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
  components.optsMenuWrapper.classList.remove("active");
  global.PrepSectionAndPlayVideo("datasheets", global.ctrlBtnIndex);
  components.ctrlBtnWrapperComponents.classList.remove("active");
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
      instructions.currentInstructionVid +
        global.dropdownIndex * NO_OF_INSTRUCTION_VIDS
    ].pause();
    instructions.allVidsInstructionsMobileP[
      instructions.currentInstructionVid +
        global.dropdownIndex * NO_OF_INSTRUCTION_VIDS
    ].pause();
  } else {
    global.pauseWrapper.classList.remove("active");
    instructions.allVidsInstructions[
      instructions.currentInstructionVid +
        global.dropdownIndex * NO_OF_INSTRUCTION_VIDS
    ].play();
    instructions.allVidsInstructionsMobileP[
      instructions.currentInstructionVid +
        global.dropdownIndex * NO_OF_INSTRUCTION_VIDS
    ].play();
  }
};
const MainCtrlBtnsInstructions = function () {
  global.SetPauseFlag(false);
  global.pauseWrapper.classList.remove("active");
  clearTimeout(instructions.instructionVidTimer);
  instructions.instructionVidTimer = null;
  // global.FlashBlackout(BLACKOUT_STANDARD);
  blackout.classList.remove("off");
  global.ActivateSectionVideo(
    "instructions",
    instructions.currentInstructionVid
  );
  // global.PrepSectionAndPlayVideo(
  //   "instructions",
  //   instructions.currentInstructionVid,
  //   true
  // );
  global.PlaySectionVideo("instructions");
  global.DeactivateActivateCurrentCtrlButtons(
    "instructions",
    instructions.currentInstructionVid
  );
};
//.......................................................................
//.......................................................................
//INIT
const init = function () {
  navigation.AddHandlerStartButton(MainStartButton);
  navigation.AddHandlerAllNavLinks(MainAllNavLinks);
  navigation.AddHandlerNavLinkInstructionsHoverIn(MainNavDropdownHoverIn);
  navigation.AddHandlerNavLinkInstructionsHoverOut(MainNavDropdownHoverOut);
  navigation.AddHandlerNavLinkInstructionsClick(MainNavLinkInstructionsClick);
  navigation.AddHandlerNavLinkDropdownMenuHoverIn(MainNavDropdownHoverIn);
  navigation.AddHandlerNavLinkDropdownMenuHoverOut(MainNavDropdownHoverOut);
  navigation.AddHandlerAllNavLinkDropdownOpts(
    MainAllNavLinkDropDownOptsHoverIn,
    MainAllNavLinkDropDownOptsHoverOut,
    MainAllNavLinkDropDownOptsClick
  );
  navigation.AddHandlerDropdownIconBtn(MainDropDownIconBtn);
  navigation.AddHandlerNavBtnMobile(MainNavBtnMobile);
  features.AddHandlerVidsFeaturesEnd(MainFeaturesVidsEnds);
  components.AddHandlerVidsComponentDatasheetsEnds(
    MainVidsComponentDatasheetsEnds
  );
  navigation.AddHandlerAllCtrlBtnsMouseEnter(MainAllCtrlBtnsMouseEnter);
  navigation.AddHandlerAllCtrlBtnsMouseLeave(MainAllCtrlBtnsMouseLeave);
  features.AddHandlerCtrlBtnWrapperFeatures(MainCtrlBtnsFeatures);
  components.AddHandlerOptionsMenuBtnClick(MainOptionsMenuShow);
  components.AddHandlerOptionsMenuWrapperHoverIn(MainOptionsMenuShow);
  components.AddHandlerOptionsMenuWrapperHoverOut(MainOptionsMenuHide);
  components.AddHandlerOptionsMenuDropdownClick(MainOptionsMenuDropdownClick);
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
  global.navLinkDropdownMenu.classList.remove("active");
  global.navLinkInstructions.click();
  global.navLinkComponents.click();
  global.navLinkFeatures.click();
  this.setTimeout(function () {
    global.ResetSectionVideos();
    global.SetInitializing(false);
    global.loader.classList.remove("active");
    global.startButtonWrapper.classList.add("active");
  }, BLACKOUT_INIT);
});
