let userList = [];

if (localStorage.userList === undefined) {
  localStorage.setItem("userList", JSON.stringify(userList));
} else if (localStorage.userList != "") {
  userList = JSON.parse(localStorage.getItem("userList"));
}

//FUNCTIONS

const isObjectEmpty = (objectName) => {
  return JSON.stringify(objectName) === "{}";
};

const doesUserExist = (user) => {
  return userList.some((item) => item.user === user);
};

const createUser = (user, initBalance) => {
  if (doesUserExist(user)) {
    alert("User already exists!");
  } else {
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
        localStorage.setItem("userList", JSON.stringify(userList));
      } else {
        userList.push({
          user: user,
          balance: parseFloat(initBalance),
        });
        localStorage.setItem("userList", JSON.stringify(userList));
      }
    }
  }
};

const deposit = (user, amount) => {
  userList.forEach((username) => {
    if (username.user === user) {
      username.balance += parseFloat(amount);
      localStorage.setItem("userList", JSON.stringify(userList));
    }
  });
};

const balNegative = (userBal, amount) => {
  if (userBal - amount < 0) {
    return true;
  }
};

const withdraw = (user, amount) => {
  userList.forEach((username) => {
    if (username.user === user) {
      if (balNegative(username.balance, amount)) {
        alert("Balance cannot be negative!");
      } else {
        username.balance -= parseFloat(amount);
        localStorage.setItem("userList", JSON.stringify(userList));
      }
    }
  });
};

const sendMoney = (from_user, to_user, amount) => {
  let index = userList.map((item) => item.user).indexOf(from_user);
  if (balNegative(userList[index].balance, amount)) {
    alert("Balance cannot be negative!");
  } else {
    userList.forEach((username) => {
      if (username.user === from_user) {
        username.balance -= parseFloat(amount);
        localStorage.setItem("userList", JSON.stringify(userList));
      }
      if (username.user === to_user) {
        username.balance += parseFloat(amount);
        localStorage.setItem("userList", JSON.stringify(userList));
      }
    });
  }
};

const getBalance = (user) => {
  userList.forEach((username) => {
    if (username.user === user) {
      valueDisplay.innerHTML = username.balance;
    }
  });
};

const loadDropDownOption = (dropDown) => {
  dropDown.replaceChildren();
  if (isObjectEmpty(userList) === false) {
    userList.forEach((user) => {
      let option = document.createElement("option");
      option.value = user.user;
      option.text = user.user;

      dropDown.appendChild(option);
    });
  }
};

const addTableList = () => {
  let tableBody = document.getElementById("test");
  tableBody.replaceChildren();
  userList.forEach((user) => {
    let tr = document.createElement("tr");
    let tdName = document.createElement("td");
    let tdBalance = document.createElement("td");
    tdName.innerHTML = user.user;
    tdBalance.innerHTML = user.balance;
    tr.appendChild(tdName);
    tr.appendChild(tdBalance);
    tableBody.appendChild(tr);
  });
};

const removeUser = (user) => {
  userList.forEach((item) => {
    if (item.user === user) {
      index = userList.indexOf(item);
      userList.splice(index, 1);
      localStorage.setItem("userList", JSON.stringify(userList));
    }
  });
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
const valueDisplay = document.getElementById("value-display");
const balanceBtn = document.getElementById("btn-balance");
const removeBtn = document.getElementById("btn-remove");
const userListBtn = document.getElementById("btn-user-list");

//EVENT LISTENERS

addUserBtn.addEventListener("click", function () {
  createUser(userTxtbox.value, balTxtbox.value);
  loadDropDownOption(nameDropDown);
  loadDropDownOption(fromDropDown);
  loadDropDownOption(toDropDown);
  userTxtbox.value = "";
  balTxtbox.value = "";
});

withdrawBtn.addEventListener("click", function () {
  if (amtTxtbox.value === "" || parseFloat(amtTxtbox.value) < 0) {
    alert("Invalid Amount!");
  } else {
    withdraw(nameDropDown.value, amtTxtbox.value);
    nameDropDown.value = userList[0].user;
    amtTxtbox.value = "";
  }
});

depositBtn.addEventListener("click", function () {
  if (amtTxtbox.value === "" || parseFloat(amtTxtbox.value) < 0) {
    alert("Invalid Amount!");
  } else {
    deposit(nameDropDown.value, amtTxtbox.value);
    nameDropDown.value = userList[0].user;
    amtTxtbox.value = "";
  }
});

sendBtn.addEventListener("click", function () {
  if (amtTxtbox.value === "" || parseFloat(amtTxtbox.value) < 0) {
    alert("Invalid Amount!");
  } else {
    if (fromDropDown.value === toDropDown.value) {
      alert("Can only send to other users!");
    } else {
      sendMoney(fromDropDown.value, toDropDown.value, amtTxtbox.value);
      toDropDown.value = userList[0].user;
      fromDropDown.value = userList[0].user;
      amtTxtbox.value = "";
    }
  }
});

balanceBtn.addEventListener("click", function () {
  getBalance(nameDropDown.value);
  nameDropDown.value = userList[0].user;
});

userListBtn.addEventListener("click", function () {
  addTableList();
});

removeBtn.addEventListener("click", function () {
  removeUser(nameDropDown.value);
  loadDropDownOption(nameDropDown);
  loadDropDownOption(fromDropDown);
  loadDropDownOption(toDropDown);
  nameDropDown.value = userList[0].user;
});

loadDropDownOption(nameDropDown);
loadDropDownOption(fromDropDown);
loadDropDownOption(toDropDown);
