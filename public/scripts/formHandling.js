// const form = document.querySelector('[data-form="form"');
// const formInputs = form?.querySelectorAll('[data-form="input"]');
// const formSubmit = form?.querySelector('[data-form="submit"]');

// const formInputsData = [];
// formInputs.forEach((input) => {
//   formInputsData.push(input.value);
// });
// console.log(formInputs);

// form.addEventListener("submit", (e) => {
//   console.log(e);
// });
console.log("Initialized selector");

class FormHandler {
  constructor(selector) {
    this.form = document.querySelector(selector);
    
    this.inputs = this.form.querySelectorAll(`${selector} [data-form="input"]`);
    this.submit = this.form.querySelector(`${selector} [data-form="submit"]`);
    
    this.registerEvents();
  }

  registerEvents() {
    this.form.addEventListener("submit", this.onSubmit.bind(this));
  }

  onSubmit(e) {
    console.log(e)
    // e.preventDefault();

    console.log("Form submitted");
  }
}

const form = new FormHandler('[data-form="filtering"]');
