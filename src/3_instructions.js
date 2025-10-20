import { BLACKOUT_EXTRA } from "./0_config";
import * as global from "./0_global";

class instructions {
  //............................................................
  //............................................................
  //DEFINITIONS
  allVidsSections = [...global.sectionsInstructions];
  allVidsInstructions = [];
  allVidsInstructionsMobileP = [];
  currentInstructionVid;
  instructionVidTimer;
  //............................................................
  //............................................................
  //EVENTS
  AddHandlerVidsInstructionsEnds = function (handler) {
    [...global.sectionsInstructions].forEach((el) => {
      el.querySelectorAll(".vid").forEach((el2) => {
        this.allVidsInstructions.push(el2);
      });
      el.querySelectorAll(".vid-mobile-p").forEach((el3) => {
        this.allVidsInstructionsMobileP.push(el3);
      });
    });
    this.allVidsInstructions.forEach(function (el) {
      el.addEventListener("ended", function () {
        global.pauseWrapper.style.pointerEvents = "none";
        el.classList.remove("active");
        el.pause();
        handler();
      });
    });
  };
  AddHandlerVidsInstructionsPause = function (handler) {
    global.pauseWrapper.addEventListener("click", function () {
      global.pauseFlag ? global.SetPauseFlag(false) : global.SetPauseFlag(true);
      handler();
    });
  };
  AddHandlerCtrlBtnWrapperInstructions = function (handler) {
    global.ctrlBtnWrapper.addEventListener("click", (e) => {
      const clicked = e.target.closest(".ctrl-btn.instructions");
      if (!clicked) return;
      const parentElement = clicked.parentElement;
      this.currentInstructionVid = Array.prototype.indexOf.call(
        parentElement.children,
        clicked
      );
      handler();
    });
  };
  //.......................................................................
  //.......................................................................
  //FUNCTIONS
  ResetToInstructionsMainScreen = function () {
    global.FlashBlackout(BLACKOUT_EXTRA);
    global.DeactivateSectionVideos();
    global.DeactivateActivateSectionText("main");
    global.DeactivateActivateSectionImage("main");
    global.DeactivateActivateCurrentCtrlButtons("instructions", false);
  };
}
export default new instructions();
