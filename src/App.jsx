import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BiSearchAlt2 } from "react-icons/bi";
import { RiEditCircleLine } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./config/firebase";
import { BiSolidUserCircle } from "react-icons/bi";
function App() {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        const contactsSnapshot = await getDocs(contactsRef);
        const contactLists = contactsSnapshot?.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        setContacts(contactLists);
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);
  return (
    <div className="mx-auto max-w-[370px] px-4 ">
      <Navbar />
      <div className="flex gap-2">
        <div className=" relative flex  flex-grow mt-4">
          <BiSearchAlt2
            size={30}
            className="absolute ml-2 mt-2 text-3xl text-white flex items-center"
          />
          <input
            type="text"
            placeholder="search contact...."
            className=" h-10 pl-9 rounded-md bg-transparent border flex-grow border-white flex p-1 hover:border-blue-400"
          />
        </div>
        <h1 className="mt-4 p-1 pl-1 justify-center items-center w-9 h-9 bg-white text-black rounded-full flex cursor-pointer">
          +
        </h1>
      </div>

      <div>
        {contacts.map((contact) => (
          <div key={contact.id} className="mt-3 text-white p-2 items-center bg-cyan-900 flex justify-between bg-yellow-300">
            <div className="flex gap-2">
            <BiSolidUserCircle className="text-3xl text-blue-300" />
            <div className="">
              <h2 className="s">{contact.name}</h2>
              <p>{contact.email}</p>
            </div>
            </div>
           
            <div>
              <RiEditCircleLine />
              <IoMdTrash />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
