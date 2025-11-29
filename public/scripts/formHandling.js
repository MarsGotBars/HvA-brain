class FormGatherer {
  constructor(selector) {
    this.form = document.querySelector(selector);

    this.inputs = this.form.querySelectorAll('[data-form="input"]');
    this.submit = this.form.querySelector(
      '[data-form="submit"], [type="submit"]'
    );
  }
}

class FormEnhancer {
  constructor(formGatherer) {
    this.formGatherer = formGatherer;
    this.form = formGatherer.form;
    this.inputs = formGatherer.inputs;
    this.submit = formGatherer.submit;
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
      input.addEventListener("change", (e) => {
        this.form.submit();
      });
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

const form = new FormGatherer('[data-form="filtering"]');
const formEnhancer = new FormEnhancer(form);
