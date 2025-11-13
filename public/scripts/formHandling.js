const form = document.querySelector('[data-form="form"');
const formInputs = form?.querySelectorAll('[data-form="input"]');
const formSubmit = form?.querySelector('[data-form="submit"]');

const formInputsData = []
formInputs.forEach((input)=>{
    formInputsData.push(input.value)
})
console.log(formInputs);


form.addEventListener("submit", (e)=>{
    console.log(e);
})