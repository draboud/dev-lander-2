//............................................................
//............................................................
//IMPORTS
import {
  BLACKOUT_STANDARD,
  COMP_BTNS_END_RANGE_A,
  COMP_BTNS_END_RANGE_B,
  COMP_BTNS_START_RANGE_A,
  COMP_BTNS_START_RANGE_B,
} from "./0_config";
//............................................................
//............................................................
//GLOBAL DEFINITIONS
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
export const loader = document.querySelector(".loader-text");
export const blackout = document.querySelector(".blackout");
export const pauseWrapper = document.querySelector(".pause-wrapper");
export const sectionFeatures = document.querySelector(".section_features");
export const sectionComponents = document.querySelector(".section_components");
export const sectionInstructions = document.querySelector(
  ".section_instructions"
);
export const allSections = [
  sectionFeatures,
  sectionComponents,
  sectionInstructions,
];
export const ctrlBtnWrapper = document.querySelector(".ctrl-btn-wrapper");
export const allCtrlBtns = document.querySelectorAll(".ctrl-btn");
export const allSectionBtnWrappers =
  document.querySelectorAll(".section-wrap-btns");
export const backBtn = ctrlBtnWrapper.querySelector(".ctrl-btn.back");
export let initializing = true;
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
export function SetCtrlBtnIndex(newValue) {
  ctrlBtnIndex = newValue;
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
//............................................................
//............................................................
//GLOBAL FUNCTIONS
export const ResetSectionVideos = function (
  sectionName,
  subsectionName,
  vidIndex
) {
  if (sectionName === "all") {
    document.querySelectorAll(`.vid,.vid-mobile-p`).forEach(function (el) {
      el.currentTime = 0;
      el.pause();
    });
  } else if (!sectionName) {
    activeSection.querySelectorAll(`.vid,.vid-mobile-p`).forEach(function (el) {
      el.currentTime = 0;
      el.pause();
    });
  } else if (sectionName && !subsectionName) {
    document
      .querySelector(`.section_${sectionName}`)
      .querySelectorAll(`.vid,.vid-mobile-p`)
      .forEach(function (el) {
        el.currentTime = 0;
        el.pause();
      });
  } else if (sectionName && subsectionName) {
    document
      .querySelector(`.section_${sectionName}`)
      .querySelector(`.section-wrap-vids.${subsectionName}`)
      .querySelectorAll(`.vid,.vid-mobile-p`)
      .forEach(function (el) {
        el.currentTime = 0;
        el.pause();
      });
  }
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
export const ActivateSection = function () {
  allSections.forEach(function (el) {
    el.classList.remove("active");
    if (el.classList[0].slice(8) === activeSectionName) {
      el.classList.add("active");
      if (!initializing) FlashBlackout(BLACKOUT_STANDARD);
    }
  });
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
