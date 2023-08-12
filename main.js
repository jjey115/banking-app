let userList = [];

//FUNCTIONS

const createUser = (user, initBalance) => {
  if (user === null || user === undefined || user === "") {
    alert("Invalid User Name!");
  } else {
    if (
      initBalance === null ||
      initBalance === undefined ||
      initBalance === ""
    ) {
      userList.push({
        user: user,
        balance: 0,
      });
    } else {
      userList.push({
        user: user,
        balance: parseFloat(initBalance),
      });
    }
  }
};

const deposit = (user, amount) => {
  userList.forEach((username) => {
    if (username.user === user) {
      username.balance += parseFloat(amount);
    }
  });
};

const withdraw = (user, amount) => {
  userList.forEach((username) => {
    if (username.user === user) {
      username.balance -= parseFloat(amount);
    }
  });
};

const sendMoney = (from_user, to_user, amount) => {
  userList.forEach((username) => {
    if (username.user === from_user) {
      username.balance -= parseFloat(amount);
    }
    if (username.user === to_user) {
      username.balance += parseFloat(amount);
    }
  });
};

const getBalance = (user) => {
  userList.forEach((username) => {
    if (username.user === user) {
      console.log(username.balance);
    }
  });
};

const listUsers = () => {
  return console.log(userList);
};

const addDropDownOption = (user, dropDown) => {
  let option = document.createElement("option");
  option.value = user;
  option.text = user;

  dropDown.appendChild(option);
};

//SELECTORS

const addUserBtn = document.getElementById("btn-add-user");
const withdrawBtn = document.getElementById("btn-withdraw");
const depositBtn = document.getElementById("btn-deposit");
const sendBtn = document.getElementById("btn-send");
const amtTxtbox = document.getElementById("amt-txtbox");
const userTxtbox = document.getElementById("user-txtbox");
const balTxtbox = document.getElementById("init-balance");
const nameDropDown = document.getElementById("name-list");
const fromDropDown = document.getElementById("name-list-from");
const toDropDown = document.getElementById("name-list-to");

//EVENT LISTENERS

addUserBtn.addEventListener("click", function () {
  createUser(userTxtbox.value, balTxtbox.value);
  addDropDownOption(userTxtbox.value, nameDropDown);
  addDropDownOption(userTxtbox.value, fromDropDown);
  addDropDownOption(userTxtbox.value, toDropDown);
  userTxtbox.value = "";
  balTxtbox.value = "";
});

withdrawBtn.addEventListener("click", function () {
  withdraw(nameDropDown.value, amtTxtbox.value);
  nameDropDown.value = userList[0].user;
  amtTxtbox.value = "";
});

depositBtn.addEventListener("click", function () {
  deposit(nameDropDown.value, amtTxtbox.value);
  nameDropDown.value = userList[0].user;
  amtTxtbox.value = "";
});

sendBtn.addEventListener("click", function () {
    sendMoney(fromDropDown.value,toDropDown.value,amtTxtbox.value);
    toDropDown.value = userList[0].user;
    fromDropDown.value = userList[0].user;
    amtTxtbox.value = "";
});
