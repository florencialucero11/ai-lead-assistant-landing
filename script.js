const form = document.getElementById("contactForm");
const statusText = document.getElementById("formStatus");

function classifyMessage(message) {
  message = message.toLowerCase();

  if (message.includes("precio") || message.includes("costo")) {
    return "pricing";
  }

  if (message.includes("web") || message.includes("sitio")) {
    return "web";
  }

  if (message.includes("automatizar") || message.includes("ia")) {
    return "ai";
  }

  return "general";
}

function generateAIResponse(type, name) {
  switch (type) {
    case "pricing":
      return `Hola ${name}, gracias por tu consulta 😊  
Trabajo con soluciones personalizadas según cada proyecto.  
En breve te contacto con más información.`;

    case "web":
      return `Hola ${name},  
Puedo ayudarte a crear un sitio web profesional optimizado para convertir visitas en clientes.  
Te escribo pronto con los próximos pasos.`;

    case "ai":
      return `Hola ${name},  
Las automatizaciones con IA son ideales para ahorrar tiempo y mejorar la atención.  
En breve analizamos tu caso.`;

    default:
      return `Hola ${name}, gracias por escribirme 😊  
Recibí tu mensaje y te responderé a la brevedad.`;
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    statusText.textContent = "Por favor completá todos los campos.";
    return;
  }

  const category = classifyMessage(message);
  const aiResponse = generateAIResponse(category, name);

  statusText.textContent = aiResponse;

  form.reset();
});
