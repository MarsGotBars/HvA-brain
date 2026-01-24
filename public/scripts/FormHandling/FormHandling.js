"use strict";

import debounce from "../utils/debounce.js";

class FormGatherer {
  constructor(form, onSubmitCallback) {
    this.form = document.querySelector(form);

    this.inputs = this.form.querySelectorAll('[data-form="input"]');
    this.submit = this.form.querySelector(
      '[data-form="submit"]'
    );
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
    this.debouncedFunctions = [];
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
    this.inputs.forEach((input, index) => {
      if (!(input.type === "text" || input.type === "search")) {
        input.addEventListener("change", (e) => {
          this.formGatherer.onSubmit(e);
        });
      } else {
        const debouncedOnSubmit = debounce((e) => {
          this.formGatherer.onSubmit(e);
        }, 150);
        this.debouncedFunctions[index] = debouncedOnSubmit;
        input.addEventListener("input", debouncedOnSubmit);
      }
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
      (option) => option.value === value
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
  constructor() {
    this.list = document.querySelector(".block-list");
    this.listItems = this.list.querySelectorAll("li a");
    this.dataAttributes = [];
    this.init();
  }

  init() {
    if (this.listItems.length > 0) {
      const firstItem = this.listItems[0];

      // We slice the last one away as this is the data-triggerd attr, which we do not require here
      this.dataAttributes = Object.keys(firstItem.dataset).slice(0, -1);
    }
  }

  sortList(form) {
    const formData = new FormData(form.target);
    const formDataObj = new URLSearchParams(formData);
    console.log(formDataObj);
    
    form.preventDefault();

    

  }

  transitionFilter() {

  }
}

function createFormSystem(formSelector) {
  const formFiltering = new FormFiltering();
  const form = new FormGatherer(formSelector, (e) => formFiltering.triggerFiltering(e));
  const formEnhancer = new FormEnhancer(form);
  return { form, formEnhancer, formFiltering };
}

const { form, formEnhancer, formFiltering } = createFormSystem('[data-form="filtering"]');