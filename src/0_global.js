//............................................................
//............................................................
//IMPORTS
import { BLACKOUT_STANDARD, DELAY_BEFORE_VID_REWIND } from "./0_config";
//............................................................
//............................................................
//GLOBAL DEFINITIONS
export const startButtonWrapper = document.querySelector(".start-btn-wrapper");
export const startButton = document.querySelector(".start-btn");
export const navBar = document.querySelector(".nav_component");
export const navLinkFeatures = document.querySelector(
  ".nav_menu_link.features"
);
export const navLinkComponents = document.querySelector(
  ".nav_menu_link.components"
);
export const navLinkInstructions = document.querySelector(
  ".nav_menu_link.instructions"
);
export const allNavLinks = document.querySelectorAll(".nav_menu_link");
export const navButtonMobile = document.querySelector(".nav_button");
export const navLinkDropdown = document.querySelector(
  ".nav_menu_link.instructions"
);
export const navLinkDropdownMenu = document.querySelector(".nav_menu_dropdown");
export const allNavLinkDropdownOpts = navLinkDropdownMenu.querySelectorAll(
  ".nav_menu_link-dropdown"
);
export const dropdownIconBtn = document.querySelector(".dropdown-icon-wrap");
export const loader = document.querySelector(".loader-text");
export const blackout = document.querySelector(".blackout");
export const pauseWrapper = document.querySelector(".pause-wrapper");
export const sectionFeatures = document.querySelector(".section_features");
export const sectionComponents = document.querySelector(".section_components");
export const sectionsInstructions = document.querySelectorAll(
  ".section_instructions"
);
export let dropdownIndex = 0;
export const allSections = [
  sectionFeatures,
  sectionComponents,
  ...sectionsInstructions,
];
export const ctrlBtnWrapper = document.querySelector(".ctrl-btn-wrapper");
export const allCtrlBtns = document.querySelectorAll(".ctrl-btn");
export const allSectionBtnWrappers =
  document.querySelectorAll(".section-wrap-btns");
export const backBtn = ctrlBtnWrapper.querySelector(".ctrl-btn.back");
export let initializing = true;
export let navDropdownFlag = false;
export let activeSection = document.querySelector(".section_features");
export let activeSectionName = activeSection.classList[0].slice(8);
export let currentViewName = "view-a";
export let pauseFlag = false;
export let ctrlBtnIndex;
export let startBtnRange;
export let endBtnRange;
//............................................................
//............................................................
//GETTERS & SETTERS
export function SetInitializing(newValue) {
  initializing = newValue;
}
export function SetNavDropdownFlag(newValue) {
  navDropdownFlag = newValue;
}
export function SetDropdownIndex(newValue) {
  dropdownIndex = newValue;
}
export function SetActiveSection(newValue) {
  activeSection = newValue;
}
export function SetActiveSectionName(newValue) {
  activeSectionName = newValue;
}
export function SetCurrentViewName(newValue) {
  currentViewName = newValue;
}
export function SetPauseFlag(newValue) {
  pauseFlag = newValue;
}
export function SetStartBtnRange(newValue) {
  startBtnRange = newValue;
}
export function SetEndBtnRange(newValue) {
  endBtnRange = newValue;
}
export function SetCtrlBtnIndex(newValue) {
  ctrlBtnIndex = newValue;
}
//............................................................
//............................................................
//GLOBAL FUNCTIONS
export const DeactivateActivateNavDropdown = function () {
  navDropdownFlag
    ? navLinkDropdownMenu.classList.remove("active")
    : navLinkDropdownMenu.classList.add("active");
  navDropdownFlag = !navDropdownFlag;
};
export const PrepSectionAndPlayVideo = function (
  vidName,
  vidIndex,
  pauseEnable
) {
  DeactivateActivateSectionText();
  DeactivateActivateSectionImage();
  ResetSectionVideos();
  ActivateSectionVideo(vidName, vidIndex);
  setTimeout(function () {
    PlaySectionVideo(vidName, vidIndex, pauseEnable);
    blackout.classList.add("off");
  }, 200);
};
export const DeactivateActivateSectionText = function (textName, textIndex) {
  activeSection.querySelectorAll(".section-wrap-text").forEach(function (el) {
    el.classList.remove("active");
    if (textName && el.classList.contains(textName)) {
      el.classList.add("active");
      if (textIndex || textIndex === 0) {
        el.querySelectorAll(".text-wrapper").forEach(function (el2, index) {
          el2.classList.remove("active");
          if (index === textIndex) el2.classList.add("active");
        });
      }
    }
  });
};
export const DeactivateActivateSectionImage = function (imgName, imgIndex) {
  activeSection.querySelectorAll(".section-wrap-imgs").forEach(function (el) {
    el.classList.remove("active");
    if (imgName && el.classList.contains(imgName)) {
      el.classList.add("active");
      if (imgIndex || imgIndex === 0) {
        el.querySelectorAll(".section-img").forEach(function (el2, index) {
          el2.classList.remove("active");
          if (index === imgIndex) el2.classList.add("active");
        });
        el.querySelectorAll(".section-img.mobile-p").forEach(function (
          el2,
          index
        ) {
          el2.classList.remove("active");
          if (index === imgIndex) el2.classList.add("active");
        });
      }
    }
  });
};
export const ResetSectionVideos = function (
  sectionName,
  subsectionName,
  vidIndex
) {
  if (sectionName === "all") {
    document.querySelectorAll(`.vid,.vid-mobile-p`).forEach(function (el) {
      el.pause();
      setTimeout(function () {
        el.currentTime = 0;
      }, DELAY_BEFORE_VID_REWIND);
    });
  } else if (!sectionName) {
    activeSection.querySelectorAll(`.vid,.vid-mobile-p`).forEach(function (el) {
      el.pause();
      setTimeout(function () {
        el.currentTime = 0;
      }, DELAY_BEFORE_VID_REWIND);
    });
  } else if (sectionName && !subsectionName) {
    document
      .querySelector(`.section_${sectionName}`)
      .querySelectorAll(`.vid,.vid-mobile-p`)
      .forEach(function (el) {
        el.pause();
        setTimeout(function () {
          el.currentTime = 0;
        }, DELAY_BEFORE_VID_REWIND);
      });
  } else if (sectionName && subsectionName) {
    document
      .querySelector(`.section_${sectionName}`)
      .querySelector(`.section-wrap-vids.${subsectionName}`)
      .querySelectorAll(`.vid,.vid-mobile-p`)
      .forEach(function (el) {
        el.pause();
        setTimeout(function () {
          el.currentTime = 0;
        }, DELAY_BEFORE_VID_REWIND);
      });
  }
};
export const ActivateSectionVideo = function (vidName, vidIndex) {
  DeactivateSectionVideos();
  if (!vidIndex) vidIndex = 0;
  activeSection
    .querySelector(`.section-wrap-vids.${vidName}`)
    .querySelectorAll(".video-wrap")
    [vidIndex].classList.add("active");
  activeSection
    .querySelector(`.section-wrap-vids.${vidName}`)
    .querySelectorAll(".video-wrap.mobile-p")
    [vidIndex].classList.add("active");
};
export const ActivateSection = function (sectionIndex) {
  if (!sectionIndex) sectionIndex = 0;
  allSections.forEach(function (el) {
    el.classList.remove("active");
  });
  document
    .querySelectorAll(`.section_${activeSectionName}`)
    [sectionIndex].classList.add("active");
  if (!initializing) FlashBlackout(BLACKOUT_STANDARD);
};
export const DeactivateSectionVideos = function (sectionName) {
  if (!sectionName) {
    activeSection.querySelectorAll(".video-wrap").forEach(function (el) {
      el.classList.remove("active");
    });
  } else {
    document
      .querySelector(`.section_${sectionName}`)
      .querySelectorAll(".video-wrap")
      .forEach(function (el) {
        el.classList.remove("active");
      });
  }
};
export const PlaySectionVideo = function (vidName, vidIndex, pauseEnable) {
  if (pauseEnable) pauseWrapper.style.pointerEvents = "auto";
  if (!vidIndex) vidIndex = 0;
  activeSection
    .querySelector(`.section-wrap-vids.${vidName}`)
    .querySelectorAll(".video-wrap")
    [vidIndex].querySelector(".vid")
    .play();
  activeSection
    .querySelector(`.section-wrap-vids.${vidName}`)
    .querySelectorAll(".video-wrap.mobile-p")
    [vidIndex].querySelector(".vid-mobile-p")
    .play();
};
export const ActivateSectionButtons = function () {
  allSectionBtnWrappers.forEach(function (el) {
    el.classList.remove("active");
  });
  ctrlBtnWrapper
    .querySelector(`.section-wrap-btns.${activeSectionName}`)
    .classList.add("active");
  backBtn.classList.remove("active");
};
export const FlashBlackout = function (timerVariable) {
  blackout.classList.remove("off");
  setTimeout(function () {
    blackout.classList.add("off");
  }, timerVariable);
};
export const DeactivateActivateCurrentCtrlButtons = function (
  sectionName,
  btnIndex
) {
  document
    .querySelectorAll(`.ctrl-btn.${sectionName}`)
    .forEach(function (el, index) {
      el.classList.remove("current", "hovered");
      if ((btnIndex || btnIndex === 0) && index === btnIndex)
        el.classList.add("current");
    });
};
export const DeactivateActivateCtrlBtnRange = function (
  btnsName,
  startIndex,
  endIndex
) {
  ctrlBtnWrapper
    .querySelector(`.section-wrap-btns.${btnsName}`)
    .querySelectorAll(".ctrl-btn")
    .forEach(function (el, index) {
      el.classList.remove("active");
      if (index >= startIndex && index <= endIndex) el.classList.add("active");
    });
};
