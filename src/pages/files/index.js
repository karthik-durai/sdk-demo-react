import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { StorageProvider } from "@arcana/storage/dist/standalone/storage.umd";

function Files() {
  const { state } = useLocation();
  const {
    privateKey,
    userInfo: { email },
  } = state;
  const [storageInfo, setStorageInfo] = useState(null);
  const [badwidthInfo, setBandwidthInfo] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [storageInstance, setStorageInstance] = useState(null);
  const [myFiles, setMyFiles] = useState([]);

  useEffect(() => {
    initStorage();
  }, []);

  useEffect(() => {
    if (storageInstance) {
      fetchStorageLimits();
      getMyFiles();
    }
  }, [storageInstance]);

  async function getMyFiles() {
    let files = await storageInstance.myFiles();
    setMyFiles(files);
  }

  async function fetchStorageLimits() {
    const access = await storageInstance.getAccess();
    console.log(access, "accessaccess");
    const [storageUsed, totalStorage] = await access.getUploadLimit();
    const [bandwidthUsed, totalBandwidth] = await access.getDownloadLimit();
    setStorageInfo({ storageUsed, totalStorage });
    setBandwidthInfo({ bandwidthUsed, totalBandwidth });
  }

  function initStorage() {
    const storageInstance = new StorageProvider({
      appId: "475",
      privateKey,
      email,
    });
    setStorageInstance(storageInstance);
    console.log(storageInstance, "storageInstance");
  }

  function onFileSelect({
    target: {
      files: [file],
    },
  }) {
    setSelectedFile(file);
  }

  async function uploadFile() {
    try {
      const uploader = await storageInstance.getUploader();
      const uploadFileRes = await uploader.upload(selectedFile);
      console.log(uploadFileRes, "uploadFileRes");
    } catch (e) {
      console.log(e, "uploadFileRes");
    }
  }

  async function onDownloadClick(id) {
    const Downloader = await storageInstance.getDownloader();
    Downloader.download(id);
  }

  return (
    <div className="h-full w-full bg-black text-white p-10 flex flex-col items-center">
      <div>
        <h1 className="text-center font-semibold">My Files</h1>
      </div>
      <div className="flex mt-10 w-full">
        {storageInfo ? (
          <div className="flex-1 flex flex-col items-center">
            <p className="mb-3">Upload Limit</p>
            <div className="flex mb-3">
              <p className="mr-3">Storage Used:</p>
              <p>{storageInfo.storageUsed}</p>
            </div>
            <div className="flex">
              <p className="mr-3">Total Storage:</p>
              <p>{storageInfo.totalStorage}</p>
            </div>
          </div>
        ) : null}
        {badwidthInfo ? (
          <div className="flex-1 flex flex-col items-center">
            <p className="mb-3">Download Limit</p>
            <div className="flex mb-3">
              <p className="mr-3">Bandwidth Used:</p>
              <p>{badwidthInfo.bandwidthUsed}</p>
            </div>
            <div className="flex">
              <p className="mr-3">Total Bandwidth:</p>
              <p>{badwidthInfo.totalBandwidth}</p>
            </div>
          </div>
        ) : null}
      </div>
      <div className="mt-10 flex flex-col w-full items-center">
        <input
          type="file"
          onInput={onFileSelect}
          className="border border-white mb-5"
        />
        <button
          onClick={uploadFile}
          className="border-2 border-white rounded p-2 px-5 bg-white text-black"
        >
          Upload
        </button>
      </div>
      {myFiles.length ? (
        <div className="mt-5">
          <p className="text-center">My Files</p>
          <ul>
            {myFiles.map((item) => (
              <li className="flex items-center">
                <p className="mr-2">
                  ID: <span>{item.did}</span>
                </p>
                <button
                  onClick={() => onDownloadClick(item.did)}
                  className="bg-white p-1 text-black rounded"
                >
                  Download
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default Files;
