(() => {
  // src/0_config.js
  var BLACKOUT_STANDARD = 50;
  var BLACKOUT_EXTRA = 150;
  var BLACKOUT_INIT = 2500;
  var DELAY_BEFORE_FEATURE_TEXT = 1e3;
  var PAUSE_AFTER_FEATURE_END = 1500;
  var NO_OF_INSTRUCTION_VIDS = 4;
  var PAUSE_BETWEEN_INSTRUCTION_VIDS = 1e3;
  var INSTRUCTION_VIDS_LOOPING = true;
  var COMP_BTNS_START_RANGE_A = 0;
  var COMP_BTNS_END_RANGE_A = 5;
  var COMP_BTNS_START_RANGE_B = 6;
  var COMP_BTNS_END_RANGE_B = 11;

  // src/0_globalVarsAndFunctions.js
  var navBar = document.querySelector(".nav_component");
  var navLinkFeatures = document.querySelector(
    ".nav_menu_link.features"
  );
  var navLinkComponents = document.querySelector(
    ".nav_menu_link.components"
  );
  var navLinkInstructions = document.querySelector(
    ".nav_menu_link.instructions"
  );
  var allNavLinks = document.querySelectorAll(".nav_menu_link");
  var navButtonMobile = document.querySelector(".nav_button");
  var navLinkDropdown = document.querySelector(
    ".nav_menu_link.instructions"
  );
  var navLinkDropdownMenu = document.querySelector(".nav_menu_dropdown");
  var allNavLinkDropdownOpts = navLinkDropdownMenu.querySelectorAll(
    ".nav_menu_link-dropdown"
  );
  var dropdownIconBtn = document.querySelector(".dropdown-icon-wrap");
  var loader = document.querySelector(".loader-text");
  var blackout = document.querySelector(".blackout");
  var pauseWrapper = document.querySelector(".pause-wrapper");
  var sectionFeatures = document.querySelector(".section_features");
  var sectionComponents = document.querySelector(".section_components");
  var sectionsInstructions = document.querySelectorAll(
    ".section_instructions"
  );
  var dropdownIndex = 0;
  var allSections = [
    sectionFeatures,
    sectionComponents,
    ...sectionsInstructions
  ];
  var ctrlBtnWrapper = document.querySelector(".ctrl-btn-wrapper");
  var allCtrlBtns = document.querySelectorAll(".ctrl-btn");
  var allSectionBtnWrappers = document.querySelectorAll(".section-wrap-btns");
  var backBtn = ctrlBtnWrapper.querySelector(".ctrl-btn.back");
  var initializing = true;
  var navDropdownFlag = false;
  var activeSection = document.querySelector(".section_features");
  var activeSectionName = activeSection.classList[0].slice(8);
  var currentViewName = "view-a";
  var pauseFlag = false;
  var ctrlBtnIndex;
  var startBtnRange;
  var endBtnRange;
  function SetInitializing(newValue) {
    initializing = newValue;
  }
  function SetNavDropdownFlag(newValue) {
    navDropdownFlag = newValue;
  }
  function SetDropdownIndex(newValue) {
    dropdownIndex = newValue;
  }
  function SetActiveSection(newValue) {
    activeSection = newValue;
  }
  function SetActiveSectionName(newValue) {
    activeSectionName = newValue;
  }
  function SetCurrentViewName(newValue) {
    currentViewName = newValue;
  }
  function SetPauseFlag(newValue) {
    pauseFlag = newValue;
  }
  function SetStartBtnRange(newValue) {
    startBtnRange = newValue;
  }
  function SetEndBtnRange(newValue) {
    endBtnRange = newValue;
  }
  function SetCtrlBtnIndex(newValue) {
    ctrlBtnIndex = newValue;
  }
  var DeactivateActivateNavDropdown = function() {
    navDropdownFlag ? navLinkDropdownMenu.classList.remove("active") : navLinkDropdownMenu.classList.add("active");
    navDropdownFlag = !navDropdownFlag;
  };
  var PrepSectionAndPlayVideo = function(vidName, vidIndex, pauseEnable) {
    DeactivateActivateSectionText();
    DeactivateActivateSectionImage();
    ResetSectionVideos();
    ActivateSectionVideo(vidName, vidIndex);
    PlaySectionVideo(vidName, vidIndex, pauseEnable);
  };
  var DeactivateActivateSectionText = function(textName, textIndex) {
    activeSection.querySelectorAll(".section-wrap-text").forEach(function(el) {
      el.classList.remove("active");
      if (textName && el.classList.contains(textName)) {
        el.classList.add("active");
        if (textIndex || textIndex === 0) {
          el.querySelectorAll(".text-wrapper").forEach(function(el2, index) {
            el2.classList.remove("active");
            if (index === textIndex) el2.classList.add("active");
          });
        }
      }
    });
  };
  var DeactivateActivateSectionImage = function(imgName, imgIndex) {
    activeSection.querySelectorAll(".section-wrap-imgs").forEach(function(el) {
      el.classList.remove("active");
      if (imgName && el.classList.contains(imgName)) {
        el.classList.add("active");
        if (imgIndex || imgIndex === 0) {
          el.querySelectorAll(".section-img").forEach(function(el2, index) {
            el2.classList.remove("active");
            if (index === imgIndex) el2.classList.add("active");
          });
          el.querySelectorAll(".section-img.mobile-p").forEach(function(el2, index) {
            el2.classList.remove("active");
            if (index === imgIndex) el2.classList.add("active");
          });
        }
      }
    });
  };
  var ResetSectionVideos = function(sectionName, subsectionName, vidIndex) {
    if (sectionName === "all") {
      document.querySelectorAll(`.vid,.vid-mobile-p`).forEach(function(el) {
        el.currentTime = 0;
        el.pause();
      });
    } else if (!sectionName) {
      activeSection.querySelectorAll(`.vid,.vid-mobile-p`).forEach(function(el) {
        el.currentTime = 0;
        el.pause();
      });
    } else if (sectionName && !subsectionName) {
      document.querySelector(`.section_${sectionName}`).querySelectorAll(`.vid,.vid-mobile-p`).forEach(function(el) {
        el.currentTime = 0;
        el.pause();
      });
    } else if (sectionName && subsectionName) {
      document.querySelector(`.section_${sectionName}`).querySelector(`.section-wrap-vids.${subsectionName}`).querySelectorAll(`.vid,.vid-mobile-p`).forEach(function(el) {
        el.currentTime = 0;
        el.pause();
      });
    }
  };
  var ActivateSectionVideo = function(vidName, vidIndex) {
    DeactivateSectionVideos();
    if (!vidIndex) vidIndex = 0;
    activeSection.querySelector(`.section-wrap-vids.${vidName}`).querySelectorAll(".video-wrap")[vidIndex].classList.add("active");
    activeSection.querySelector(`.section-wrap-vids.${vidName}`).querySelectorAll(".video-wrap.mobile-p")[vidIndex].classList.add("active");
  };
  var ActivateSection = function(sectionIndex) {
    if (!sectionIndex) sectionIndex = 0;
    allSections.forEach(function(el) {
      el.classList.remove("active");
    });
    document.querySelectorAll(`.section_${activeSectionName}`)[sectionIndex].classList.add("active");
    if (!initializing) FlashBlackout(BLACKOUT_STANDARD);
  };
  var DeactivateSectionVideos = function(sectionName) {
    if (!sectionName) {
      activeSection.querySelectorAll(".video-wrap").forEach(function(el) {
        el.classList.remove("active");
      });
    } else {
      document.querySelector(`.section_${sectionName}`).querySelectorAll(".video-wrap").forEach(function(el) {
        el.classList.remove("active");
      });
    }
  };
  var PlaySectionVideo = function(vidName, vidIndex, pauseEnable) {
    if (pauseEnable) pauseWrapper.style.pointerEvents = "auto";
    if (!vidIndex) vidIndex = 0;
    activeSection.querySelector(`.section-wrap-vids.${vidName}`).querySelectorAll(".video-wrap")[vidIndex].querySelector(".vid").play();
    activeSection.querySelector(`.section-wrap-vids.${vidName}`).querySelectorAll(".video-wrap.mobile-p")[vidIndex].querySelector(".vid-mobile-p").play();
  };
  var ActivateSectionButtons = function() {
    allSectionBtnWrappers.forEach(function(el) {
      el.classList.remove("active");
    });
    ctrlBtnWrapper.querySelector(`.section-wrap-btns.${activeSectionName}`).classList.add("active");
    backBtn.classList.remove("active");
  };
  var FlashBlackout = function(timerVariable) {
    blackout.classList.remove("off");
    setTimeout(function() {
      blackout.classList.add("off");
    }, timerVariable);
  };
  var DeactivateActivateCurrentCtrlButtons = function(sectionName, btnIndex) {
    document.querySelectorAll(`.ctrl-btn.${sectionName}`).forEach(function(el, index) {
      el.classList.remove("current", "hovered");
      if ((btnIndex || btnIndex === 0) && index === btnIndex)
        el.classList.add("current");
    });
  };
  var DeactivateActivateCtrlBtnRange = function(btnsName, startIndex, endIndex) {
    ctrlBtnWrapper.querySelector(`.section-wrap-btns.${btnsName}`).querySelectorAll(".ctrl-btn").forEach(function(el, index) {
      el.classList.remove("active");
      if (index >= startIndex && index <= endIndex) el.classList.add("active");
    });
  };

  // src/1_features.js
  var features = class {
    //............................................................
    //............................................................
    //DEFINITIONS
    allVidsFeatures = sectionFeatures.querySelectorAll(".vid");
    allCtrlBtnsFeatures = ctrlBtnWrapper.querySelectorAll(".ctrl-btn.features");
    featureTextTimer;
    featureVidTimer;
    //............................................................
    //............................................................
    //EVENTS
    AddHandlerVidsFeaturesEnd = function(handler) {
      this.allVidsFeatures.forEach(function(el) {
        el.addEventListener("ended", function() {
          handler();
        });
      });
    };
    AddHandlerCtrlBtnWrapperFeatures = function(handler) {
      ctrlBtnWrapper.addEventListener("click", function(e) {
        const clicked = e.target.closest(".ctrl-btn.features");
        if (!clicked) return;
        const parentElement = clicked.parentElement;
        SetCtrlBtnIndex(
          Array.prototype.indexOf.call(parentElement.children, clicked)
        );
        handler();
      });
    };
  };
  var features_default = new features();

  // src/2_components.js
  var components = class {
    //............................................................
    //............................................................
    //DEFINITIONS
    componentSection = document.querySelector(".section_datasheets");
    allVidsComponentViews = [
      sectionComponents.querySelector(".section-wrap-vids.view-a").querySelector(".vid"),
      sectionComponents.querySelector(".section-wrap-vids.view-b").querySelector(".vid")
    ];
    allVidsComponentDatasheets = sectionComponents.querySelector(".section-wrap-vids.datasheets").querySelectorAll(".vid");
    datasheetsAllWrapper = sectionComponents.querySelector(
      ".section-wrap-comp-data"
    );
    allDatasheetWraps = sectionComponents.querySelectorAll(".comp-data-wrap");
    ctrlBtnWrapperComponents = ctrlBtnWrapper.querySelector(
      ".section-wrap-btns.components"
    );
    optsMenuBtn = sectionComponents.querySelector(".opts-menu_btn");
    optsMenu = sectionComponents.querySelector(".opts-menu");
    dimmer = sectionComponents.querySelector(".dimmer");
    textImgBtn = sectionComponents.querySelector(".text-img-btn");
    textImgBtnLabel = "image";
    allCtrlBtnsComponents = ctrlBtnWrapper.querySelectorAll(
      ".ctrl-btn.components"
    );
    activeDatasheet;
    //............................................................
    //............................................................
    //EVENTS
    AddHandlerVidsComponentDatasheetsEnds = function(handler) {
      this.allVidsComponentDatasheets.forEach(function(el) {
        el.addEventListener("ended", function() {
          handler();
        });
      });
    };
    AddHandlerMenuBtn = function(handler) {
      this.optsMenuBtn.addEventListener("click", function() {
        handler();
      });
    };
    AddHandlerMenuOptBtn = function(handler) {
      this.optsMenu.addEventListener("click", function(e) {
        const clicked = e.target.closest(".opts-menu_link");
        const clickedBtnContent = clicked.textContent;
        if (!clicked) return;
        handler(clickedBtnContent);
      });
    };
    AddHandlerVidsComponentViewsEnds = function(handler) {
      this.allVidsComponentViews.forEach((el) => {
        el.addEventListener("ended", () => {
          if (currentViewName === "view-a") {
            SetStartBtnRange(0);
            SetEndBtnRange(5);
          } else {
            SetStartBtnRange(6);
            SetEndBtnRange(11);
          }
          handler();
        });
      });
    };
    AddHandlerTextImgBtn = function(handler) {
      this.textImgBtn.addEventListener("click", function() {
        handler();
      });
    };
    AddHandlerCtrlBtnWrapperComponents = function(handler) {
      ctrlBtnWrapper.addEventListener("click", function(e) {
        const clicked = e.target.closest(".ctrl-btn.components");
        if (!clicked) return;
        const parentElement = clicked.parentElement;
        SetCtrlBtnIndex(
          Array.prototype.indexOf.call(parentElement.children, clicked)
        );
        handler();
      });
    };
    AddHandlerBackBtn = function(handler) {
      ctrlBtnWrapper.addEventListener("click", function(e) {
        const clicked = e.target.closest(".ctrl-btn.back");
        if (!clicked) return;
        handler();
      });
    };
    //.......................................................................
    //.......................................................................
    //FUNCTIONS
    DisplayDataSheet = function() {
      DeactivateActivateSectionImage("comps", ctrlBtnIndex);
      this.dimmer.classList.add("active");
      this.ActivateDeactivateDatasheetTextAndButtons(true);
    };
    ActivateDeactivateDatasheetTextAndButtons = function(activeDeactivate) {
      this.textImgBtn.classList.toggle("active", activeDeactivate);
      this.datasheetsAllWrapper.classList.toggle("active", activeDeactivate);
      this.allDatasheetWraps.forEach((el, index) => {
        el.classList.remove("active");
        el.querySelector(".comp-data-body-wrap").classList.add("active");
        if (activeDeactivate && index === ctrlBtnIndex) {
          el.classList.add("active");
          this.activeDatasheet = el;
        }
      });
      backBtn.classList.toggle("active", activeDeactivate);
    };
  };
  var components_default = new components();

  // src/3_instructions.js
  var instructions = class {
    //............................................................
    //............................................................
    //DEFINITIONS
    allVidsSections = [...sectionsInstructions];
    allVidsInstructions = [];
    allVidsInstructionsMobileP = [];
    currentInstructionVid;
    instructionVidTimer;
    //............................................................
    //............................................................
    //EVENTS
    AddHandlerVidsInstructionsEnds = function(handler) {
      [...sectionsInstructions].forEach((el) => {
        el.querySelectorAll(".vid").forEach((el2) => {
          this.allVidsInstructions.push(el2);
        });
        el.querySelectorAll(".vid-mobile-p").forEach((el3) => {
          this.allVidsInstructionsMobileP.push(el3);
        });
      });
      this.allVidsInstructions.forEach(function(el) {
        el.addEventListener("ended", function() {
          pauseWrapper.style.pointerEvents = "none";
          el.classList.remove("active");
          el.pause();
          handler();
        });
      });
    };
    AddHandlerVidsInstructionsPause = function(handler) {
      pauseWrapper.addEventListener("click", function() {
        pauseFlag ? SetPauseFlag(false) : SetPauseFlag(true);
        handler();
      });
    };
    AddHandlerCtrlBtnWrapperInstructions = function(handler) {
      ctrlBtnWrapper.addEventListener("click", (e) => {
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
    ResetToInstructionsMainScreen = function() {
      FlashBlackout(BLACKOUT_EXTRA);
      DeactivateSectionVideos();
      DeactivateActivateSectionText("main");
      DeactivateActivateSectionImage("main");
      DeactivateActivateCurrentCtrlButtons("instructions", false);
    };
  };
  var instructions_default = new instructions();

  // src/0_navigation.js
  var navigation = class {
    AddHandlerAllNavLinks = function(handler) {
      allNavLinks.forEach(function(el) {
        el.addEventListener("click", function(e) {
          const clicked = e.target.closest(".nav_menu_link");
          if (!clicked) return;
          handler(clicked);
        });
      });
    };
    AddHandlerNavLinkInstructionsHoverIn = function(handler) {
      navLinkInstructions.addEventListener("mouseenter", function() {
        handler();
      });
    };
    AddHandlerNavLinkInstructionsHoverOut = function(handler) {
      navLinkInstructions.addEventListener("mouseleave", function() {
        handler();
      });
    };
    AddHandlerNavLinkInstructionsClick = function(handler) {
      navLinkInstructions.addEventListener("click", function() {
        handler();
      });
    };
    AddHandlerNavLinkDropdownMenuHoverIn = function(handler) {
      navLinkDropdownMenu.addEventListener("mouseenter", function() {
        handler();
      });
    };
    AddHandlerNavLinkDropdownMenuHoverOut = function(handler) {
      navLinkDropdownMenu.addEventListener("mouseleave", function() {
        handler();
      });
    };
    AddHandlerAllNavLinkDropDownOpts = function(handler1, handler2, handler3) {
      allNavLinkDropdownOpts.forEach(function(el, index) {
        el.addEventListener("mouseenter", function() {
          handler1(el);
        });
        el.addEventListener("mouseleave", function() {
          handler2(el);
        });
        el.addEventListener("click", function() {
          SetActiveSectionName(
            el.parentElement.parentElement.querySelector(".nav_menu_link")
          );
          let dropdownIndex2 = index;
          handler3(dropdownIndex2);
        });
      });
    };
    AddHandlerDropDownIconBtn = function(handler) {
      dropdownIconBtn.addEventListener("click", function() {
        handler();
      });
    };
    AddHandlerNavBtnMobile = function(handler) {
      navButtonMobile.addEventListener("click", function() {
        handler();
      });
    };
    AddHandlerAllCtrlBtnsMouseEnter = function(handler) {
      allCtrlBtns.forEach(function(el) {
        el.addEventListener("mouseenter", function() {
          handler(el);
        });
      });
    };
    AddHandlerAllCtrlBtnsMouseLeave = function(handler) {
      allCtrlBtns.forEach(function(el) {
        el.addEventListener("mouseleave", function() {
          handler(el);
        });
      });
    };
    //.......................................................................
    //.......................................................................
    //FUNCTIONS
    ActivateNavLink = function() {
      allNavLinks.forEach(function(el) {
        el.classList.remove("current");
        if (el.classList.contains(activeSectionName))
          el.classList.add("current");
      });
    };
    ActivateNavLinkDropdown = function(navLinkName) {
      allNavLinks.forEach(function(el) {
        el.classList.remove("current");
      });
      navLinkName.classList.add("current");
    };
    ResetSectionSpecial = function() {
      switch (activeSectionName) {
        case "features":
          ActivateSectionVideo("main");
          DeactivateActivateCurrentCtrlButtons("features");
          break;
        case "components":
          components_default.optsMenu.classList.remove("active");
          DeactivateActivateSectionImage(currentViewName);
          [
            components_default.datasheetsAllWrapper,
            ...components_default.allDatasheetWraps
          ].forEach(function(el) {
            el.classList.remove("active");
          });
          if (currentViewName === "view-a") {
            SetStartBtnRange(COMP_BTNS_START_RANGE_A);
            SetEndBtnRange(COMP_BTNS_END_RANGE_A);
          } else {
            SetStartBtnRange(COMP_BTNS_START_RANGE_B);
            SetEndBtnRange(COMP_BTNS_END_RANGE_B);
          }
          components_default.dimmer.classList.remove("active");
          components_default.textImgBtn.textContent = "image";
          components_default.textImgBtnLabel = "image";
          DeactivateActivateCtrlBtnRange(
            "components",
            startBtnRange,
            endBtnRange
          );
          break;
        case "instructions":
          DeactivateActivateSectionImage("main");
          DeactivateActivateCurrentCtrlButtons("instructions");
          break;
      }
    };
  };
  var navigation_default = new navigation();

  // src/main.js
  var MainAllNavLinks = function(navLink, dropdownIndex2) {
    if (dropdownIndex2) SetDropdownIndex(dropdownIndex2);
    else {
      dropdownIndex2 = 0;
      SetDropdownIndex(0);
    }
    SetActiveSectionName(navLink.classList[1]);
    if (!dropdownIndex2) dropdownIndex2 = 0;
    SetActiveSection(
      document.querySelectorAll(`.section_${activeSectionName}`)[dropdownIndex2]
    );
    navLinkDropdownMenu.classList.remove("active");
    navigation_default.ActivateNavLink();
    if (components_default.activeDatasheet)
      components_default.activeDatasheet.querySelector(".comp-data-body-wrap").scroll(0, 0);
    navigation_default.ResetSectionSpecial();
    clearTimeout(features_default.featureTextTimer);
    clearTimeout(features_default.featureVidTimer);
    clearTimeout(instructions_default.instructionVidTimer);
    features_default.featureTextTimer = null;
    features_default.featureVidTimer = null;
    instructions_default.instructionVidTimer = null;
    pauseWrapper.style.pointerEvents = "none";
    pauseWrapper.classList.remove("active");
    SetPauseFlag(false);
    ResetSectionVideos("all");
    DeactivateActivateSectionText("main");
    ActivateSection(dropdownIndex2);
    ActivateSectionButtons();
    if (activeSectionName === "features") PlaySectionVideo("main");
  };
  var MainNavLinkInstructionsClick = function() {
    DeactivateActivateNavDropdown();
  };
  var MainNavDropdownHoverIn = function() {
    navLinkDropdownMenu.classList.add("active");
    SetNavDropdownFlag(true);
  };
  var MainNavDropdownHoverOut = function() {
    navLinkDropdownMenu.classList.remove("active");
    SetNavDropdownFlag(false);
  };
  var MainAllNavLinkDropDownOptsHoverIn = function(navLinkDropdownBtn) {
    navLinkDropdownBtn.classList.add("hovered");
  };
  var MainAllNavLinkDropDownOptsHoverOut = function(navLinkDropdownBtn) {
    navLinkDropdownBtn.classList.remove("hovered");
  };
  var MainAllNavLinkDropDownOptsClick = function(dropdownIndex2) {
    MainAllNavLinks(activeSectionName, dropdownIndex2);
    DeactivateActivateNavDropdown();
  };
  var MainDropDownIconBtn = function() {
    DeactivateActivateNavDropdown();
    navigation_default.ActivateNavLinkDropdown(navLinkInstructions);
  };
  var MainNavBtnMobile = function() {
    if (navDropdownFlag) DeactivateActivateNavDropdown();
    allNavLinks.forEach(function(el) {
      el.classList.remove("current");
      if (el.classList.contains(activeSectionName))
        el.classList.add("current");
    });
  };
  var MainAllCtrlBtnsMouseEnter = function(ctrlBtn) {
    ctrlBtn.classList.add("hovered");
  };
  var MainAllCtrlBtnsMouseLeave = function(ctrlBtn) {
    ctrlBtn.classList.remove("hovered");
  };
  var MainFeaturesVidsEnds = function() {
    features_default.featureVidTimer = setTimeout(function() {
      FlashBlackout(BLACKOUT_STANDARD);
      DeactivateActivateSectionImage();
      DeactivateActivateSectionText("main");
      ActivateSectionVideo("main");
      PlaySectionVideo("main");
      DeactivateActivateCurrentCtrlButtons("features", false);
    }, PAUSE_AFTER_FEATURE_END);
  };
  var MainCtrlBtnsFeatures = function() {
    clearTimeout(features_default.featureTextTimer);
    clearTimeout(features_default.featureVidTimer);
    FlashBlackout(BLACKOUT_STANDARD);
    PrepSectionAndPlayVideo("features", ctrlBtnIndex);
    DeactivateActivateCurrentCtrlButtons("features", ctrlBtnIndex);
    features_default.featureTextTimer = setTimeout(function() {
      DeactivateActivateSectionText("feature", ctrlBtnIndex);
    }, DELAY_BEFORE_FEATURE_TEXT);
  };
  var MainComponentVidsViewsEnds = function() {
    DeactivateActivateSectionImage(currentViewName);
    DeactivateActivateSectionText("main");
    components_default.ctrlBtnWrapperComponents.querySelectorAll(".ctrl-btn").forEach(function(el) {
      el.classList.remove("active");
    });
    DeactivateActivateCtrlBtnRange(
      "components",
      startBtnRange,
      endBtnRange
    );
    components_default.ctrlBtnWrapperComponents.classList.add("active");
  };
  var MainVidsComponentDatasheetsEnds = function() {
    components_default.DisplayDataSheet();
  };
  var MainOptionsMenuBtn = function() {
    components_default.optsMenu.classList.add("active");
  };
  var MainOptionsMenuOpt = function(clickedBtnContent) {
    components_default.optsMenu.classList.remove("active");
    if (currentViewName !== clickedBtnContent) {
      SetCurrentViewName(clickedBtnContent);
      components_default.optsMenuBtn.textContent = currentViewName;
      PrepSectionAndPlayVideo(currentViewName);
      components_default.ctrlBtnWrapperComponents.classList.remove("active");
    }
  };
  var MainTextImgBtn = function() {
    components_default.textImgBtnLabel === "image" ? components_default.textImgBtn.textContent = "text" : components_default.textImgBtn.textContent = "image";
    components_default.textImgBtnLabel = components_default.textImgBtn.textContent;
    components_default.activeDatasheet.querySelector(".comp-data-body-wrap").classList.toggle("active");
    components_default.dimmer.classList.toggle("active");
  };
  var MainBackBtn = function() {
    components_default.activeDatasheet.querySelector(".comp-data-body-wrap").scroll(0, 0);
    ResetSectionVideos("components", "datasheets");
    DeactivateActivateSectionImage(currentViewName);
    components_default.dimmer.classList.remove("active");
    components_default.ActivateDeactivateDatasheetTextAndButtons(false);
    DeactivateActivateSectionText("main");
    ActivateSection();
    ActivateSectionButtons();
  };
  var MainCtrlBtnsComponents = function() {
    components_default.optsMenu.classList.remove("active");
    PrepSectionAndPlayVideo("datasheets", ctrlBtnIndex);
    components_default.ctrlBtnWrapperComponents.classList.remove("active");
  };
  var MainInstructionsVidsEnds = function() {
    instructions_default.instructionVidTimer = setTimeout(function() {
      instructions_default.currentInstructionVid += 1;
      if (instructions_default.currentInstructionVid === NO_OF_INSTRUCTION_VIDS && INSTRUCTION_VIDS_LOOPING) {
        instructions_default.currentInstructionVid = 0;
      } else if (instructions_default.currentInstructionVid === NO_OF_INSTRUCTION_VIDS && !INSTRUCTION_VIDS_LOOPING) {
        instructions_default.ResetToInstructionsMainScreen();
        return;
      }
      FlashBlackout(BLACKOUT_STANDARD);
      ActivateSectionVideo(
        "instructions",
        instructions_default.currentInstructionVid
      );
      PlaySectionVideo(
        "instructions",
        instructions_default.currentInstructionVid,
        true
      );
      DeactivateActivateCurrentCtrlButtons(
        "instructions",
        instructions_default.currentInstructionVid
      );
    }, PAUSE_BETWEEN_INSTRUCTION_VIDS);
  };
  var MainVidsInstructionsPauseUnpause = function() {
    if (pauseFlag) {
      pauseWrapper.classList.add("active");
      instructions_default.allVidsInstructions[instructions_default.currentInstructionVid + dropdownIndex * NO_OF_INSTRUCTION_VIDS].pause();
      instructions_default.allVidsInstructionsMobileP[instructions_default.currentInstructionVid + dropdownIndex * NO_OF_INSTRUCTION_VIDS].pause();
    } else {
      pauseWrapper.classList.remove("active");
      instructions_default.allVidsInstructions[instructions_default.currentInstructionVid + dropdownIndex * NO_OF_INSTRUCTION_VIDS].play();
      instructions_default.allVidsInstructionsMobileP[instructions_default.currentInstructionVid + dropdownIndex * NO_OF_INSTRUCTION_VIDS].play();
    }
  };
  var MainCtrlBtnsInstructions = function() {
    SetPauseFlag(false);
    pauseWrapper.classList.remove("active");
    clearTimeout(instructions_default.instructionVidTimer);
    instructions_default.instructionVidTimer = null;
    FlashBlackout(BLACKOUT_STANDARD);
    ActivateSectionVideo(
      "instructions",
      instructions_default.currentInstructionVid
    );
    ResetSectionVideos();
    PrepSectionAndPlayVideo(
      "instructions",
      instructions_default.currentInstructionVid,
      true
    );
    DeactivateActivateCurrentCtrlButtons(
      "instructions",
      instructions_default.currentInstructionVid
    );
  };
  var init = function() {
    navigation_default.AddHandlerAllNavLinks(MainAllNavLinks);
    navigation_default.AddHandlerNavLinkInstructionsHoverIn(MainNavDropdownHoverIn);
    navigation_default.AddHandlerNavLinkInstructionsHoverOut(MainNavDropdownHoverOut);
    navigation_default.AddHandlerNavLinkInstructionsClick(MainNavLinkInstructionsClick);
    navigation_default.AddHandlerNavLinkDropdownMenuHoverIn(MainNavDropdownHoverIn);
    navigation_default.AddHandlerNavLinkDropdownMenuHoverOut(MainNavDropdownHoverOut);
    navigation_default.AddHandlerAllNavLinkDropDownOpts(
      MainAllNavLinkDropDownOptsHoverIn,
      MainAllNavLinkDropDownOptsHoverOut,
      MainAllNavLinkDropDownOptsClick
    );
    navigation_default.AddHandlerDropDownIconBtn(MainDropDownIconBtn);
    navigation_default.AddHandlerNavBtnMobile(MainNavBtnMobile);
    features_default.AddHandlerVidsFeaturesEnd(MainFeaturesVidsEnds);
    components_default.AddHandlerVidsComponentDatasheetsEnds(
      MainVidsComponentDatasheetsEnds
    );
    navigation_default.AddHandlerAllCtrlBtnsMouseEnter(MainAllCtrlBtnsMouseEnter);
    navigation_default.AddHandlerAllCtrlBtnsMouseLeave(MainAllCtrlBtnsMouseLeave);
    features_default.AddHandlerCtrlBtnWrapperFeatures(MainCtrlBtnsFeatures);
    components_default.AddHandlerMenuBtn(MainOptionsMenuBtn);
    components_default.AddHandlerMenuOptBtn(MainOptionsMenuOpt);
    components_default.AddHandlerBackBtn(MainBackBtn);
    components_default.AddHandlerVidsComponentViewsEnds(MainComponentVidsViewsEnds);
    components_default.AddHandlerTextImgBtn(MainTextImgBtn);
    components_default.AddHandlerCtrlBtnWrapperComponents(MainCtrlBtnsComponents);
    instructions_default.AddHandlerVidsInstructionsEnds(MainInstructionsVidsEnds);
    instructions_default.AddHandlerVidsInstructionsPause(
      MainVidsInstructionsPauseUnpause
    );
    instructions_default.AddHandlerCtrlBtnWrapperInstructions(MainCtrlBtnsInstructions);
    ctrlBtnWrapper.classList.remove("active");
  };
  init();
  window.addEventListener("load", function() {
    navLinkInstructions.click();
    navLinkDropdownMenu.classList.remove("active");
    navLinkComponents.click();
    navLinkFeatures.click();
    this.setTimeout(function() {
      navBar.classList.add("active");
      ctrlBtnWrapper.classList.add("active");
      SetInitializing(false);
      loader.classList.remove("active");
      blackout.classList.add("off");
    }, BLACKOUT_INIT);
  });
})();
