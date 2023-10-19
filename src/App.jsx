import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BiSearchAlt2 } from "react-icons/bi";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContactCrud from "./components/ContactCrud";
import AddCompoenent from "./components/AddCompoenent";
import useDisclose from "./components/hooks/useDisclose";
import NotFoundContent from "./components/NotFoundContent";


function App() {
  const [contacts, setContacts] = useState([]);
  const { isOpen, onClose, onOpen } = useDisclose();

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactLists);
          return contactLists;
        });
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  const filteredContacts = (e) => {
    const value = e.target.value;
    const contactsRef = collection(db, "contacts");
    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      const filteredContacts = contactLists.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );
      setContacts(filteredContacts);
      return filteredContacts;
    });
  };
  return (
    <>
      <div className="mx-auto max-w-[370px] px-4 ">
        <Navbar />
        <div className="flex gap-2">
          <div className=" relative flex  flex-grow mt-4">
            <BiSearchAlt2
              size={30}
              className="absolute ml-2 mt-2 text-3xl text-white flex items-center"
            />
            <input
            onChange={filteredContacts}
              type="text"
              placeholder="search contact...."
              className=" h-10 pl-9 text-white rounded-md bg-transparent border flex-grow border-white flex p-1 hover:border-blue-400"
            />
          </div>
          <h1
            className="mt-4 p-1 pl-1 justify-center items-center w-9 h-9 bg-white text-black rounded-full flex cursor-pointer"
            onClick={onOpen}
          >
            +
          </h1>
        </div>

        <div className="mt-4 flex flex-col gap-4">
          {contacts.length <= 0 ? <NotFoundContent/> :contacts.map((contact) => (
            <ContactCrud key={contact.id} contact={contact} />
          ))}
        </div>
      </div>
      <AddCompoenent onClose={onClose} isOpen={isOpen} />
      <ToastContainer position="bottom-center" />
    </>
  );
}

export default App;
