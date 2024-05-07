const contactForm = document.getElementById("contact-form-data")
const nameForm = document.getElementById("name-form")
const phone = document.getElementById("phone-form")
const email = document.getElementById("email-form")
const message = document.getElementById("text-form")
const submitBTN = document.getElementById("submit-mainSection");
const missingFieldsElement = document.getElementById("missingFields");

const serviceID = "service_vnqfvhm"
const templateID = "template_fz54hvj"

document.addEventListener("DOMContentLoaded", () => {
    emailjs.init("6YGFooyyIV4DRl-ai");
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault()

        var response = grecaptcha.getResponse();
        if (response.length === 0) {
            let timerInterval;
            Swal.fire({
                title: "Por favor, completa el reCAPTCHA antes de enviar el formulario.",
                html: "Me cerrare en <b></b> milisegundos",
                timer: 2000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                    const timer = Swal.getPopup().querySelector("b");
                    timerInterval = setInterval(() => {
                    timer.textContent = `${Swal.getTimerLeft()}`;
                }, 100);
            },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }
      })} else {
        submitBTN.innerText = "Enviando...";
        submitBTN.setAttribute("data-text", "Enviando...");
            
        const templateParams = {
            nameForm: nameForm.value,
            email: email.value,
            phone: phone.value,
            message: message.value,
        };
        
        emailjs.send(serviceID, templateID, templateParams).then(
        function (res) {
          Swal.fire({
            title: "¡El correo electrónico se ha enviado con éxito!",
            text: "En breve nos comunicaremos con usted",
            icon: "success",
            confirmButtonColor: "#18bcc7",
            confirmButtonText: "Listo",
          });

          submitBTN.innerText = "Enviado!";
          submitBTN.setAttribute("data-text", "Enviado!");

            nameForm.value = "";
            email.value = "";
            phone.value = "";
            message.value = "";
            grecaptcha.reset();
        },
        function (err) {
          submitBTN.innerText = "Error";
          submitBTN.setAttribute("data-text", "Error");

          Swal.fire({
            title: "¡Ha ocurrido un error!",
            text: "Contactese con desarrollo@trendygm.com",
            icon: "error",
            confirmButtonText: "Listo",
          });
        }
      );
            
        }

    });
})

document.addEventListener("DOMContentLoaded", function() {
    contactForm.addEventListener("input", function(event) {
        if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") {
            if (event.target.value.trim() !== "") {
                event.target.classList.remove("error");
                event.target.classList.add("completed");
            } else {
                event.target.classList.remove("completed");
                event.target.classList.add("error");
            }
            // Cambiar el borde a verde
            event.target.style.borderColor = "#28a745";
        }
    });

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Evita el envío del formulario si hay campos vacíos

        let missingFields = [];

        // Validar cada campo
        contactForm.querySelectorAll("input, textarea").forEach(function(input) {
            if (input.value.trim() === "") {
                const placeholder = input.getAttribute("placeholder");
                if (placeholder && placeholder.trim() !== "") {
                    missingFields.push(placeholder);
                }
                input.classList.add("error");
            }
        });

        // Mostrar lista de campos faltantes
        if (missingFields.length > 0) {
            const missingFieldsList = missingFields.map(function(field) {
                return "<li>" + field + "</li>";
            }).join("");
            missingFieldsElement.innerHTML = "<h5>Por favor, complete los siguientes campos:</h5><ul>" + missingFieldsList + "</ul>";
        } else {
            missingFieldsElement.innerHTML = ""; // Limpiar la lista si no faltan campos
        }
    });
});
