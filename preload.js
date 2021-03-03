const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  getAppVersion: () => {
    ipcRenderer.send("app_version");
    ipcRenderer.on("app_version", (event, arg) => {
      const version = document.getElementById("version");
      ipcRenderer.removeAllListeners("app_version");
      version.innerText = "Version " + arg.version;
    });
  },
  updateAvaibable: () => {
    ipcRenderer.on("update-available", () => {
      const message = document.getElementById("message");
      const notification = document.getElementById("notification");
      ipcRenderer.removeAllListeners("update_available");
      message.innerText = "A new update is available. Downloading now...";
      notification.classList.remove("hidden");
    });
  },
  updateDownload: () => {
    ipcRenderer.on("update_downloaded", () => {
      ipcRenderer.removeAllListeners("update_downloaded");
      const message = document.getElementById("message");
      const notification = document.getElementById("notification");
      const restartButton = document.getElementById("restart-button");

      message.innerText =
        "Update Downloaded. It will be installed on restart. Restart now?";
      restartButton.classList.remove("hidden");
      notification.classList.remove("hidden");
    });
  },
  closeNotification: () => {
    const notification = document.getElementById("notification");
    notification.classList.add("hidden");
  },
  restartApp: () => {
    ipcRenderer.send("restart_app");
  },
});
