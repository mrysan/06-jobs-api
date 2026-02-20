import { enableInput, inputEnabled, message, setDiv, token } from "./index.js";
import { showFits } from "./fits.js";

let addEditDiv = null;
let title = null;
let description = null;
let status = null;
let addingFit = null;

export const handleAddEdit = () => {
  addEditDiv = document.getElementById("edit-fit");
  title = document.getElementById("title");
  description = document.getElementById("description");
  status = document.getElementById("status");
  addingFit = document.getElementById("adding-fit");
  const editCancel = document.getElementById("edit-cancel");

  addEditDiv.addEventListener("click", async (e) => {
    if (inputEnabled && e.target.nodeName === "BUTTON") {
      if (e.target === addingFit) {
        enableInput(false);

        let method = "POST";
        let url = "/api/v1/fits";

        if (addingFit.textContent === "update") {
          method = "PATCH";
          url = `/api/v1/fits/${addEditDiv.dataset.id}`;
        }

        try {
          const response = await fetch(url, {
            method: method,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              title: title.value,
              description: description.value,
              status: status.value,
            }),
          });

          const data = await response.json();
          if (response.status === 200 || response.status === 201) {
            if (response.status === 200) {
              // a 200 is expected for a successful update
              message.textContent = "The fit entry was updated.";
            } else {
              // a 201 is expected for a successful create
              message.textContent = "The fit entry was created.";
            }

            title.value = "";
            description.value = "";
            status.value = "pending";
            showFits();
          } else {
            message.textContent = data.msg;
          }
        } catch (err) {
          console.log(err);
          message.textContent = "A communication error occurred.";
        }
        enableInput(true);
      } else if (e.target === editCancel) {
        message.textContent = "";
        showFits();
      }
    }
  });
};

export const showAddEdit = async (fitId) => {
  if (!fitId) {
    title.value = "";
    description.value = "";
    status.value = "pending";
    addingFit.textContent = "add";
    message.textContent = "";

    setDiv(addEditDiv);
  } else {
    enableInput(false);

    try {
      const response = await fetch(`/api/v1/fits/${fitId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.status === 200) {
        console.log(data);
        title.value = data.title;
        description.value = data.description;
        status.value = data.status;
        addingFit.textContent = "update";
        message.textContent = "";
        addEditDiv.dataset.id = fitId;

        setDiv(addEditDiv);
      } else {
        // might happen if the list has been updated since last display
        message.textContent = "The fits entry was not found";
        showFits();
      }
    } catch (err) {
      console.log(err);
      message.textContent = "A communications error has occurred.";
      showFits();
    }

    enableInput(true);
  }
};
