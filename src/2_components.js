//............................................................
//............................................................
//IMPORTS
import * as global from "./0_globalVarsAndFunctions";
//............................................................
//............................................................
//CLASS
class components {
  //............................................................
  //............................................................
  //DEFINITIONS
  componentSection = document.querySelector(".section_datasheets");
  allVidsComponentViews = [
    global.sectionComponents
      .querySelector(".section-wrap-vids.view-a")
      .querySelector(".vid"),
    global.sectionComponents
      .querySelector(".section-wrap-vids.view-b")
      .querySelector(".vid"),
  ];
  allVidsComponentDatasheets = global.sectionComponents
    .querySelector(".section-wrap-vids.datasheets")
    .querySelectorAll(".vid");
  datasheetsAllWrapper = global.sectionComponents.querySelector(
    ".section-wrap-comp-data"
  );
  allDatasheetWraps =
    global.sectionComponents.querySelectorAll(".comp-data-wrap");
  ctrlBtnWrapperComponents = global.ctrlBtnWrapper.querySelector(
    ".section-wrap-btns.components"
  );
  optsMenuBtn = global.sectionComponents.querySelector(".opts-menu_btn");
  optsMenu = global.sectionComponents.querySelector(".opts-menu");
  dimmer = global.sectionComponents.querySelector(".dimmer");
  textImgBtn = global.sectionComponents.querySelector(".text-img-btn");
  textImgBtnLabel = "image";
  allCtrlBtnsComponents = global.ctrlBtnWrapper.querySelectorAll(
    ".ctrl-btn.components"
  );
  activeDatasheet;
  //............................................................
  //............................................................
  //EVENTS
  AddHandlerVidsComponentDatasheetsEnds = function (handler) {
    this.allVidsComponentDatasheets.forEach(function (el) {
      el.addEventListener("ended", function () {
        handler();
      });
    });
  };
  AddHandlerMenuBtn = function (handler) {
    this.optsMenuBtn.addEventListener("click", function () {
      handler();
    });
  };
  AddHandlerMenuOptBtn = function (handler) {
    this.optsMenu.addEventListener("click", function (e) {
      const clicked = e.target.closest(".opts-menu_link");
      const clickedBtnContent = clicked.textContent;
      if (!clicked) return;
      handler(clickedBtnContent);
    });
  };
  AddHandlerVidsComponentViewsEnds = function (handler) {
    this.allVidsComponentViews.forEach((el) => {
      el.addEventListener("ended", () => {
        if (global.currentViewName === "view-a") {
          global.SetStartBtnRange(0);
          global.SetEndBtnRange(5);
        } else {
          global.SetStartBtnRange(6);
          global.SetEndBtnRange(11);
        }
        handler();
      });
    });
  };
  AddHandlerTextImgBtn = function (handler) {
    this.textImgBtn.addEventListener("click", function () {
      handler();
    });
  };
  AddHandlerCtrlBtnWrapperComponents = function (handler) {
    global.ctrlBtnWrapper.addEventListener("click", function (e) {
      const clicked = e.target.closest(".ctrl-btn.components");
      if (!clicked) return;
      const parentElement = clicked.parentElement;
      global.SetCtrlBtnIndex(
        Array.prototype.indexOf.call(parentElement.children, clicked)
      );
      handler();
    });
  };
  AddHandlerBackBtn = function (handler) {
    global.ctrlBtnWrapper.addEventListener("click", function (e) {
      const clicked = e.target.closest(".ctrl-btn.back");
      if (!clicked) return;
      handler();
    });
  };
  //.......................................................................
  //.......................................................................
  //FUNCTIONS
  DisplayDataSheet = function () {
    global.DeactivateActivateSectionImage("comps", global.ctrlBtnIndex);
    this.dimmer.classList.add("active");
    this.ActivateDeactivateDatasheetTextAndButtons(true);
  };
  ActivateDeactivateDatasheetTextAndButtons = function (activeDeactivate) {
    this.textImgBtn.classList.toggle("active", activeDeactivate);
    this.datasheetsAllWrapper.classList.toggle("active", activeDeactivate);
    this.allDatasheetWraps.forEach((el, index) => {
      el.classList.remove("active");
      el.querySelector(".comp-data-body-wrap").classList.add("active");
      if (activeDeactivate && index === global.ctrlBtnIndex) {
        el.classList.add("active");
        this.activeDatasheet = el;
      }
    });
    global.backBtn.classList.toggle("active", activeDeactivate);
  };
}
export default new components();
