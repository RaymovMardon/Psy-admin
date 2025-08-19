import React, { useEffect, useState } from "react";
import { API } from "../../components/api/api";
import { useSelector } from "react-redux";
function AdvertisingPage() {
  const [advertising, setAdvertising] = useState([]);
  const [edit, setEdit] = useState("");
  const [data, setData] = useState("");
  const [open, setOpen] = useState(false);
  const [openTwo, setOpenTwo] = useState(false);
  const [editID, setEditID] = useState("");
  const [dataID, setDataID] = useState("");
  const [fileID, setFileID] = useState(null);
  const [id, setId] = useState("");
   const [deleteModal, setDeleteModal] = useState(false);
  
   const [deleteId, setDeleteId] = useState(null);

  const getAdvertising = async () => {
    try {
      const res = await API.get("/advertisement");

      setAdvertising(res.data.data);

      console.log(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };
  const getDelet = async () => {
   
    try {
      const res = await API.patch(`/advertisement/${id}`);
      getAdvertising();
    } catch (err) {
      console.error(err);
    }
  };
  const getEdit = async () => {
    const formData = new FormData();
    formData.append("title", editID); // файл
    formData.append("finishAt", dataID);
    try {
      const res = await API.patch(`/advertisement/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      getAdvertising();
    } catch (err) {
      console.error(err);
    }
  };
  const getAdd = async () => {
    const formData = new FormData();
    formData.append("file",fileID);
    formData.append("title", editID); // файл
    formData.append("finishAt", dataID);
    try {
      const res = await API.post(`/advertisement/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      getAdvertising();
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getAdvertising();
  }, []);
  const isDark = useSelector((state) => state.darkMode.dark);
  return (
    <>
    <div className={`pt-24 px-[15px] flex justify-end items-center rounded-[10px] ${
              isDark ? " bg-gray-800 " : "bg-white"
            }  py-[20px] px-[20px] `}  >
       
            
          
            <button
              type="button"
              onClick={() => {
                setOpenTwo(true);
              }}
              className="bg-blue-500 px-[25px] py-[10px] rounded-[10px] text-white "
            >
              Reklama yaratish
            </button>
        
        </div>
      <div className="ad_video_wrp pt-10 ">
        {advertising.map((item) => (
          <div className="ad_video rounded-lg overflow-hidden h-80 bg-gray-100">
            <video
              controls
              src={`https://testpsyedu.limsa.uz${item.video.slice(21)}`}
            />
            <div className="p-2">
              <h3 className="font-bold">
                Reklama beruvchi:{" "}
                <span className="font-medium">{item.title}</span>
              </h3>
              <p className="font-bold">
                Boshlanish vaqti:{" "}
                <span className="font-medium">
                  {item.createdAt.split("T")[0].replace(/-/g, ":")}
                </span>
              </p>
              <p className="font-bold">
                Tugash vaqti:{" "}
                <span className="font-medium">
                  {item.finishAt.split("T")[0].replace(/-/g, ":")}
                </span>
              </p>
              <div className="flex gap-3 py-3 justify-between">
              <div className="bg-blue-400 text-white cursor-pointer  text-center rounded-md  w-full hover:bg-blue-500"
                onClick={() => {
                  setOpen(!open);
                  setEditID(item.title);
                  setDataID(item.finishAt);
                  setId(item.id);
                
                }}
              >
                edit
              </div>
              <div className="bg-red-400 text-white cursor-pointer  text-center rounded-md w-full hover:bg-red-500"
                onClick={() => {
                  setDeleteModal(!deleteModal);
                  setId(item.id);
                
                }}
              >
                delete
              </div>
              </div>
            </div>
          </div>
        ))}
        {open && (
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/40 bg-opacity-50 flex justify-center items-center z-50"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-[90%] max-w-[500px] p-6 rounded-2xl shadow-xl"
            >
              <h2 className="text-xl font-bold text-center mb-4"></h2>
              <form className="flex flex-col gap-4">
                <label>Reklama beruvchi:</label>
                <input
                  onChange={(e) => setEditID(e.target.value)}
                  type="text"
                  value={editID}
                  placeholder="Reklama beruvchi:"
                  className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label>Tugash vaqti:</label>
                <input
                  type="date"
                  onChange={(e) => setDataID(e.target.value)}
                  value={dataID}
                  placeholder="Tugash vaqti"
                  className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div
                  onClick={() => {
                    getEdit();setOpen(!open);
                  }}
                  className="w-full text-center cursor-pointer bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Edit
                </div>
              </form>
            </div>
          </div>
        )}
         {openTwo && (
          <div
            onClick={() => setOpenTwo(false)}
            className="fixed inset-0 bg-black/40 bg-opacity-50 flex justify-center items-center z-50"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-[90%] max-w-[500px] p-6 rounded-2xl shadow-xl"
            >
              <h2 className="text-xl font-bold text-center mb-4"></h2>
              <form className="flex flex-col gap-4">
              <label>Video faylni yuklang:</label>
                <input
                  onChange={(e) => setFileID(e.target.value)}
                  type="file"
                  
                  placeholder="Video faylni yuklang:"
                  className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label>Reklama beruvchi:</label>
                <input
                  onChange={(e) => setEditID(e.target.value)}
                  type="text"
                  
                  placeholder="Reklama beruvchi:"
                  className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label>Tugash vaqti:</label>
                <input
                  type="date"
                  onChange={(e) => setDataID(e.target.value)}
                  
                  placeholder="Tugash vaqti"
                  className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div
                  onClick={() => {
                    getAdd();setOpenTwo(!open);
                  }}
                  className="w-full text-center cursor-pointer bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Add
                </div>
              </form>
            </div>
          </div>
        )}
         {deleteModal && (
            <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white w-[90%] max-w-[400px] p-6 rounded-2xl shadow-xl"
              >
                <h2 className="text-xl font-bold text-center mb-4">
                  Ushbu reklamani o‘chirishni tasdiqlaysizmi?
                </h2>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setDeleteModal(false)}
                    className="px-4 py-2 bg-gray-300 rounded-md"
                  >
                    Yo‘q
                  </button>
                  <button
                    onClick={() => {
                      setDeleteModal(false);
                      getDelet();
                    }}
                    className="px-4 py-2 bg-red-500 text-white rounded-md"
                  >
                    Ha
                  </button>
                </div>
              </div>
            </div>
          )}
      </div>
    </>
  );
}

export default AdvertisingPage;
