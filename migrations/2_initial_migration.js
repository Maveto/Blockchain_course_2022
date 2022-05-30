const Inbox = artifacts.require("Imbox");

module.exports = function (deployer) {
  deployer.deploy(Inbox, 'Hi');
};
