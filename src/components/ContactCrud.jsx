import { BiSolidUserCircle } from "react-icons/bi";
import { RiEditCircleLine } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";
import { db } from "../config/firebase";
import { doc,deleteDoc } from "firebase/firestore";
import AddCompoenent from "./AddCompoenent";
import useDisclose from "./hooks/useDisclose";
import { toast } from "react-toastify";
function ContactCrud({ contact, isUpdate }) {
  const { isOpen, onClose, onOpen } = useDisclose();

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("contact deleted successfully")
    } catch (error) {
      console.log("delete item!");
    }
  };
  return (
    <>
      <div
        key={contact.id}
        className="rounded-lg text-white p-2 items-center bg-cyan-500 flex bg-yellow-300"
      >
        <div className="flex gap-2">
          <BiSolidUserCircle className="text-3xl text-red-200" />
          <div className="">
            <h2 className="">{contact.name}</h2>
            <p className="text-sm">{contact.email}</p>
          </div>
        </div>

        <div className="flex justify-end flex-grow text-3xl">
          <RiEditCircleLine
            onClick={onOpen}
            className=" flex cursor-pointer text-green-300"
          />
          <IoMdTrash
            onClick={() => deleteContact(contact.id)}
            className="text-red-600 cursor-pointer"
          />
        </div>
        <AddCompoenent
          contact={contact} 
          isUpdate
          isOpen={isOpen}
          onClose={onClose}
        />
      </div>
    </>
  );
}

export default ContactCrud;
