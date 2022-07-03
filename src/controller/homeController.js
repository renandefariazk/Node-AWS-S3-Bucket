const index = (req, res) => {
  const result = "Projeto esta Funcionando";
  res.status("200").send(result);
}

module.exports = {index};