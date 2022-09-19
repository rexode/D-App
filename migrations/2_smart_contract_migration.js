const SmartContract = artifacts.require("SmartContract");

module.exports = function (deployer) {
  deployer.deploy(SmartContract,"Prueba","PBI","https://raw.githubusercontent.com/rexode/imagenes/main/");
};
