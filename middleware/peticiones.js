function validation(req, res, next) {
  const method = req.method;
  if (method === "POST") {
    if (Object.values(req.body).length === 0) {
      res.status(400).json("body is null");
    } else {
      next();
    }
  }
}
const validatePost = (req, res, next) => {
  const datas = req.body;
  const method = req.method;
  if (method === "POST") {
    if (
      datas.id === "" ||
      datas.tarea === "" ||
      datas.completada === "" ||
      datas.descripcion === ""
    ) {
      res.status(400).send("All fields are required");
    } else {
      next();
    }
  }
};
function validationPut(req, res, next) {
  const method = req.method;
  if (method === "PUT") {
    if (Object.values(req.body).length === 0) {
      res.status(400).json("body is null");
    } else {
      next();
    }
  }
}
const validatePut = (req, res, next) => {
  const datas = req.body;
  const method = req.method;
  if (method === "PUT") {
    if (
      datas.id === "" ||
      datas.tarea === "" ||
      datas.completada === "" ||
      datas.descripcion === ""
    ) {
      res.status(400).send("All fields are required");
    } else {
      next();
    }
  }
};
const validateMethod = (req, res, next) => {
  const method = req.method;
  if (
    method === "GET" ||
    method === "POST" ||
    method === "DELETE" ||
    method === "PUT"
  ) {
    next();
  } else {
    res.status(405).send("Invalid http method");
  }
};
const validateUrl = (req, res, next) => {
  const url = req.originalUrl;
  const urlArray = ["/lista/agregar"];
  const validarRuta = urlArray.some((ruta) => ruta === url);

  if (validarRuta) {
    next();
  } else {
    res.status(400).send("Negativo, no estas autorizado");
  }
};
module.exports = {
  validation,
  validatePost,
  validatePut,
  validationPut,
  validateMethod,
  validateUrl,
};
