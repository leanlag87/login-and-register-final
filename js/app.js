//Seleccion de elementos que voy a usar
const container = document.querySelector(".container");
const signupButton = document.querySelector(".signup-section header");
const loginButton = document.querySelector(".login-section header");
const formRegister = document.querySelector("#form-register");
const formLogin = document.querySelector("#form-login");
const registerFullName = document.querySelector("#full-name");
const registerUser = document.querySelector("#user__name-register");
const registerEmail = document.querySelector("#email-register");
const registerPassword = document.querySelector("#pass-register");
const loginEmail = document.querySelector("#email-login");
const loginPassword = document.querySelector("#pass-login");
const showPasswordIcon = document.querySelector("#showPasswordIcon");

//Expresion regular para validar los campos
const regUserName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
const regUserEmail =
  /^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/;
const regUserPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}/;
const regUser = /^[a-zA-Z0-9]{4,}$/;

//funcion  para que el usuario se pueda registrar
const createUser = (e) => {
  e.preventDefault();

  const user = {
    fullname: registerFullName.value,
    user: registerUser.value,
    email: registerEmail.value,
    password: registerPassword.value,
  };

  if (!regUserName.test(user.fullname) || !user.fullname.trim()) {
    mostrarMensaje("Error en el nombre.", false, "register");
    return;
  }

  if (!regUser.test(user.user) || !user.user.trim()) {
    mostrarMensaje("Error en el usuario.", false, "register");
    return;
  }

  if (!regUserEmail.test(user.email) || !user.email.trim()) {
    mostrarMensaje("Error en el email.", false, "register");
    return;
  }

  if (!regUserPassword.test(user.password) || !user.password.trim()) {
    mostrarMensaje("Error en la contraseña.", false, "register");
    return;
  }

  saveUser(user);
};

// Array vacio para guardar los usuarios
const dataUser = [];

// Function save user
const saveUser = (user) => {
  const userRepet = dataUser.findIndex((item) => item.email === user.email);
  if (userRepet === -1) {
    mostrarMensaje("Usuario registrado correctamente.", true, "register");

    dataUser.push(user);
  } else {
    mostrarMensaje("El usuario existente " + user.email, false, "register");
  }
};

// Function login user
const loginUser = (e) => {
  e.preventDefault();

  const userExists = dataUser.find((item) => item.email === loginEmail.value);

  if (userExists) {
    if (userExists.password === loginPassword.value) {
      mostrarMensaje("¡Logueado correctamente!", true, "login");
      window.location.href = "https://www.youtube.com/watch?v=yzqDdXbNuUQ";
    } else {
      mostrarMensaje("Contraseña incorrecta", false, "login");
    }
  } else {
    mostrarMensaje("El usuario no existe", false, "login");
  }
};

// Función para limpiar el valor por defecto al hacer clic
const clearValue = (field, defaultValue) => {
  if (field.value === defaultValue) field.value = "";
};

// Register
[registerFullName, registerUser, registerEmail, registerPassword].forEach(
  (field) => {
    field.addEventListener("focus", () =>
      clearValue(field, field.getAttribute("value"))
    );
  }
);

// Login
[loginEmail, loginPassword].forEach((field) => {
  field.addEventListener("focus", () =>
    clearValue(field, field.getAttribute("value"))
  );
});

// Function para mostrar mensajes de éxito/error
const mostrarMensaje = (mensaje, exito, formulario) => {
  const mensajeElement = document.getElementById(`mensaje-${formulario}`);
  mensajeElement.textContent = mensaje;
  mensajeElement.className = exito ? "exito" : "";
};

// Eventos para los form
formRegister.addEventListener("submit", createUser);
formLogin.addEventListener("submit", loginUser);

// Cambiar clases con classList
loginButton.addEventListener("click", () => {
  container.classList.add("active");
});

signupButton.addEventListener("click", () => {
  container.classList.remove("active");
});

// Redireccion para los btn-social
const btnSocial = document.querySelectorAll('[id^="btn-"]');
const urls = [
  "https://accounts.google.com/",
  "https://www.facebook.com/",
  "https://www.instagram.com/",
  "https://github.com/login",
  "https://accounts.google.com/",
  "https://www.facebook.com/",
  "https://www.instagram.com/",
  "https://github.com/login",
];

btnSocial.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    window.open(urls[index]);
  });
});

// Evento para mostrar/ocultar la contraseña
showPasswordIcon.addEventListener("click", () => {
  if (registerPassword.type === "password") {
    registerPassword.type = "text";
    showPasswordIcon.classList.remove("#showPasswordIcon");
    showPasswordIcon.classList.add("bx-hide");
  } else {
    registerPassword.type = "password";
    showPasswordIcon.classList.add("#showPasswordIcon");
    showPasswordIcon.classList.remove("bx-hide");
  }
});
