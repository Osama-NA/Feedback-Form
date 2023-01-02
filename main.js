// Elements

let testimonialForm = document.querySelector(".testimonial-form");
let approvalCheckbox = document.querySelector(".approval-checkbox .checkbox");
let approvalCheckboxIcon = document.querySelector(".approval-checkbox .icon");
let loader = document.querySelector(".testimonial-form .loader");
let successTab = document.querySelector(".success-tab");

// Variables

let isApproved = false;
let serviceId = "service_jiukhe6";
let templateId = "template_58xti8q";
let publicKey = "user_I78m0ESdzgYh9SrO25MbQ";

// Functions

const toggleApprovalCheckboxIcon = () => {
  isApproved = !isApproved;
  approvalCheckboxIcon.classList.remove(isApproved ? "hide" : "show");
  approvalCheckboxIcon.classList.add(isApproved ? "show" : "hide");
};

const handleTestimonialSubmit = (e) => {
  e.preventDefault();

  show(loader);

  let formValues = getFormValues(e);

  if (
    !formValues.name ||
    !formValues.email ||
    !formValues.subject ||
    !formValues.message
  ) {
    alert("Please fill in all the fields");
  }

  sendEmail(e, formValues);
};

const sendEmail = (e, formValues) => {
  emailjs.send(serviceId, templateId, formValues, publicKey).then(
    () => {
      show(successTab);
      resetForm(e);
    },
    (error) => {
      console.log(error.text);
      resetForm(e);
    }
  );
};

const getFormValues = (e) => {
  let username = e.target.name.value;

  // Set user approval value
  let approval = `${username} ${
    isApproved ? "does not approve" : "approves"
  } of showing his name or email in testimonials`;

  // Return values object
  return {
    name: username,
    email: e.target.email.value,
    subject: e.target.subject.value,
    message: e.target.message.value,
    approval,
  };
};

const resetForm = (e) => {
  e.target.reset();
  approvalCheckboxIcon.classList.remove("show");
  approvalCheckboxIcon.classList.add("hide");
  hide(loader);
};

const show = (element) => {
  element.classList.remove("hide");
  element.classList.add("show");
};

const hide = (element) => {
  element.classList.remove("show");
  element.classList.add("hide");
};

// Event listeners

approvalCheckbox.addEventListener("click", toggleApprovalCheckboxIcon);
testimonialForm.addEventListener("submit", handleTestimonialSubmit);
successTab.addEventListener("click", () => hide(successTab));
