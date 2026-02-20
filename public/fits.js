import {
  inputEnabled,
  setDiv,
  message,
  setToken,
  token,
  enableInput,
} from "./index.js";
import { showLoginRegister } from "./loginRegister.js";
import { showAddEdit } from "./addEdit.js";

let fitsDiv = null;
let fitsTable = null;
let fitsTableHeader = null;

export const handleFits = () => {
  fitsDiv = document.getElementById("fits");
  const logoff = document.getElementById("logoff");
  const addFit = document.getElementById("add-fit");
  fitsTable = document.getElementById("fits-table");
  fitsTableHeader = document.getElementById("fits-table-header");

  fitsDiv.addEventListener("click", async (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addFit) {
        showAddEdit(null);
      } else if (e.target === logoff) {
        showLoginRegister();
      } else if (e.target.classList.contains("editButton")) {
        message.textContent = "";
        showAddEdit(e.target.dataset.id);
      } else if (e.target.classList.contains("deleteButton")) {
        try {
          const response = await fetch(`/api/v1/fits/${e.target.dataset.id}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            message.textContent = "Sucessfully deleted fit";

            showFits();
          }
        } catch (error) {
          console.log(err);
          message.textContent =
            "Unable to delete item, a communication error occurred.";
        }
      }
    } else if (e.target === logoff) {
      setToken(null);

      message.textContent = "You have been logged off.";

      fitsTable.replaceChildren([fitsTableHeader]);

      showLoginRegister();
    }
  });
};

export const showFits = async () => {
  try {
    enableInput(false);

    const response = await fetch("/api/v1/fits", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    let children = [fitsTableHeader];

    if (response.status === 200) {
      if (data.count === 0) {
        fitsTable.replaceChildren(...children); // clear this for safety
      } else {
        for (let i = 0; i < data.fits.length; i++) {
          let rowEntry = document.createElement("tr");

          let editButton = `<td><button type="button" class="editButton" data-id=${data.fits[i]._id}>edit</button></td>`;
          let deleteButton = `<td><button type="button" class="deleteButton" data-id=${data.fits[i]._id}>delete</button></td>`;
          let rowHTML = `
            <td>${data.fits[i].title}</td>
            <td>${data.fits[i].description}</td>
            <td>${data.fits[i].status}</td>
            <div>${editButton}${deleteButton}</div>`;

          rowEntry.innerHTML = rowHTML;
          children.push(rowEntry);
        }
        fitsTable.replaceChildren(...children);
      }
    } else {
      message.textContent = data.msg;
    }
  } catch (err) {
    console.log(err);
    message.textContent = "A communication error occurred.";
  }
  enableInput(true);
  setDiv(fitsDiv);
};
