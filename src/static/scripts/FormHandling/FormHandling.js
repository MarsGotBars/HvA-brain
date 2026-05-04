"use strict";

import debounce from "../utils/debounce.js";

class FormGatherer {
  constructor(form, onSubmitCallback) {
    this.form = document.querySelector(form);
    this.invertBtn = this.form.querySelector('[data-form="button"]');
    this.inputs = this.form.querySelectorAll('[data-form="input"]');
    this.submit = this.form.querySelector('[data-form="submit"]');
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitCallback = onSubmitCallback;
    this.form.addEventListener("submit", this.onSubmit);
  }

  onSubmit(e) {
    // I pass on the rest of the logic to the filtering class
    this.onSubmitCallback(e);
  }
}

class FormEnhancer {
  constructor(formGatherer) {
    this.formGatherer = formGatherer;
    this.form = formGatherer.form;
    this.inputs = formGatherer.inputs;
    this.submit = formGatherer.submit;
    this.invertBtn = formGatherer.invertBtn;
    this.safeInit();
  }

  safeInit() {
    try {
      this.init();
      this.safelyRemoveSubmit();
    } catch (error) {
      console.error("I messed up!", error);
    }
  }

  init() {
    // fetch URL parameters and initialize handlers for matching inputs
    this.initHandlersFromParams();
    this.inputListeners();
  }

  initHandlersFromParams() {
    const urlParams = new URLSearchParams(window.location.search);

    // Handle only inputs that have matching URL parameters
    const matchedInputs = this.getInputsMatchingParams(urlParams);

    matchedInputs.forEach((input) => {
      this.applyHandlerForInput(input, urlParams.get(input.name));
    });
  }

  inputListeners() {
    this.inputs.forEach((input) => {
      if (!(input.type === "text" || input.type === "search")) {
        input.addEventListener("change", (e) => {
          this.formGatherer.onSubmit(e);
        });
      } else {
        const debouncedOnSubmit = debounce((e) => {
          this.formGatherer.onSubmit(e);
        }, 220);
        input.addEventListener("input", debouncedOnSubmit);
      }
    });
    this.invertBtn.addEventListener("click", () => {
      formFiltering.flipbtn();
    });
  }

  getInputsMatchingParams(urlParams) {
    return [...this.inputs].filter((input) => urlParams.has(input.name));
  }

  applyHandlerForInput(input, value) {
    const type = this.resolveType(input);
    console.log(type);

    const handlers = {
      select: this.handleSelect.bind(this),
      text: this.handleText.bind(this),
      textarea: this.handleText.bind(this),
      checkbox: this.handleCheckbox.bind(this),
      number: this.handleText.bind(this),
      radio: this.handleRadio.bind(this),
      search: this.handleSearch.bind(this),
    };

    if (handlers[type]) {
      handlers[type](input, value);
    }
  }

  resolveType(input) {
    // Apparently this returns select-one by default...
    if (input.tagName === "SELECT") return "select";
    return input.type; // e.g. "text", "checkbox", "radio", "number"
  }

  handleSelect(input, value) {
    const validOption = [...input.options].find(
      (option) => option.value === value,
    );
    if (validOption) input.value = value;
  }

  handleText(input, value) {
    input.value = value;
  }

  handleSearch(input, value) {
    input.value = value;
  }

  handleCheckbox(input, value) {
    input.checked = value === "true";
  }

  handleRadio(input, value) {
    input.checked = input.value === value;
  }

  safelyRemoveSubmit() {
    if (this.submit) {
      this.submit.remove();
    }
  }
}

class FormFiltering {
  constructor(form) {
    this.form = form;
    this.list = document.querySelector(".BlockList");
    this.listItems = this.list.querySelectorAll("li.card");
    this.dataAttributes = [];
    this.listItemDetails = [];
    this.previousFilters = {};

    // We set the initial states here, hardcoded, not everything needs to be dynamic...
    this.invert = false;
    this.previousCase = "recency";

    this.init();
  }

  init() {
    if (this.listItems.length > 0) {
      // First we want to know which data-points exist and save these for filter/sort purposes
      const firstItem = this.listItems[0];

      // We slice the last one away as this is the data-triggerd attr, which we do not require here
      this.dataAttributes = Object.keys(firstItem.dataset).slice(0, -1);

      // Secondly we want to store all the possible data we have
      this.listItems.forEach((item) => {
        const itemData = {};
        this.dataAttributes.forEach((attr) => {
          itemData[attr.toUpperCase()] = item.dataset[attr];
        });

        // TODO: finish this up for perf
        this.listItemDetails.push(itemData);
      });
    }

    // Lastly we xtract input names from the form
    const inputs = this.form.querySelectorAll('[data-form="input"]');
    inputs.forEach((input) => {
      this.previousFilters[input.name] = "";
    });
  }

  triggerFiltering(e) {
    // Apparently you can access the form element that the input element is within!
    // We do this in case there is multiple forms available on the page
    const formData = new FormData(e.target.form);
    const formDataObj = Object.fromEntries(formData.entries());
    console.log(formDataObj);

    // Sorting happens by checking the formDataObj
    // The naming for the fields is as follows; [operation]-[name] (for example sort-general)
    // This way we can explicitly infer what type of operation should happen
    this.CompareObjByType(this.previousFilters, formDataObj);
    this.previousFilters = formDataObj;
    console.log(this.previousFilters);

    e.preventDefault();
  }

  getFilterType(key) {
    return key.split("-")[0]; // e.g., 'sort-general' → 'general'
  }
  // test
  flipbtn() {
    if(this.listItems.length === 0) {
      return
    }
    
    this.invert = !this.invert;
    if (document.startViewTransition) {
      return document.startViewTransition(() => {
        this.sort(this.previousCase, this.invert);
      });
    } else this.sort(this.previousCase, this.invert);
  }

  CompareObjByType(PrevObj, currentObj) {
    // We get a Set with the previous keys and current keys
    const allKeys = new Set([
      ...Object.keys(PrevObj),
      ...Object.keys(currentObj),
    ]);

    for (const key of allKeys) {
      const type = this.getFilterType(key);
      if (PrevObj[key] !== currentObj[key]) {
        if (document.startViewTransition) {
          return document.startViewTransition(() => {
            this.triggerFunctionForChange(type, currentObj[key]);
          });
        }
        this.triggerFunctionForChange(type, currentObj[key]);
      }
    }
  }

  triggerFunctionForChange(type, byValueofType) {
    switch (type) {
      case "sort":
        this.sort(byValueofType);
        break;

      case "search":
        this.search(byValueofType);
        break;

      default:
        break;
    }
  }

  sort(byValue = this.previousCase, flip = this.invert) {
    // Converting our NodeList to an array
    const items = Array.from(this.listItems);

    // Defined values for progress
    const progressMap = {
      done: 100,
      "done?": 80,
      "in progress": 50,
      broken: 0,
    };

    // Sort the array of <a> elements
    items.sort((a, b) => {
      a = a.children[1];
      b = b.children[1];

      switch (byValue) {
        case "recency": {
          const dateA = parseInt(a.getAttribute("data-date"), 10);
          const dateB = parseInt(b.getAttribute("data-date"), 10);

          if (flip) {
            return dateA - dateB; // Oldest first
          }
          return dateB - dateA; // Newest first
        }
        case "progress": {
          const progressA = progressMap[a.getAttribute("data-progress")] || 0;
          const progressB = progressMap[b.getAttribute("data-progress")] || 0;
          if (flip) {
            return progressA - progressB; // Lowest progress first
          }
          return progressB - progressA; // Highest progress first
        }
        case "alphabetical": {
          const alphaA = a.getAttribute("data-name");
          const alphaB = b.getAttribute("data-name");

          if (flip) {
            return alphaB.localeCompare(alphaA);
          }
          return alphaA.localeCompare(alphaB);
        }
        default:
          return 0; // No sorting
      }
    });

    this.previousCase = byValue;

    // ! shake the card down, then set the reduce opacity to 0 of the content
    // ! and shake it up, and whilst it goes back into place set opacity of new content to 1

    // Clear the container (assuming this.list is the parent container)
    if (document.startViewTransition) {
      this.list.innerHTML = "";
    }

    // Re-append the sorted <a> elements to the DOM
    items.forEach((item) => this.list.appendChild(item));

    // Update this.listItems to the sorted array
    this.listItems = items;
  }

  search(byValue) {
    console.log(byValue);
    
    const searchedValue = byValue !== '' || undefined ? byValue.toLowerCase() : byValue;
    const items = Array.from(this.listItems);

    const filteredItems = items.filter((item) =>
      item.children[1].getAttribute("data-name").includes(searchedValue),
    );

    if (document.startViewTransition) {
      this.list.innerHTML = "";
    }

    filteredItems.forEach((item) => this.list.appendChild(item));
    this.listItems = filteredItems
  }
}

function createFormSystem(formSelector) {
  const form = new FormGatherer(formSelector, (e) =>
    formFiltering.triggerFiltering(e),
  );
  const formFiltering = new FormFiltering(form.form);
  const formEnhancer = new FormEnhancer(form);
  return { form, formEnhancer, formFiltering };
}

const { form, formEnhancer, formFiltering } = createFormSystem(
  '[data-form="filtering"]',
);
  