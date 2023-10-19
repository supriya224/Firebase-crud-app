
import Modal from "./Modal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { addDoc, collection, doc , updateDoc} from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const contactSchemaValidation=Yup.object().shape({
name:Yup.string().required("Name is required"),
email:Yup.string().email("Invalid Email").required("Email is required"),
});

const AddCompoenent=({ isOpen, onClose, isUpdate, contact  })=> {

  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      onClose();
      toast.success("Contact Added successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async (contact,id ) => {
    try {
      const contactRef = doc(db, "contacts", id);   
      await updateDoc(contactRef, contact);
      onClose();
      toast.success("Contact updated successfully");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Modal onClose={onClose} isOpen={isOpen} className="m-auto">
        <Formik
        validationSchema={contactSchemaValidation}
          initialValues={isUpdate?{
            name: contact.name,
            email: contact.email,
          }:{
            name: "",
            email: "",
          }}
          onSubmit={(values) => {
            console.log(values);
            isUpdate? updateContact(values, contact.id):
            addContact(values);
          }}
        >
          <Form className="flex flex-col gap-1">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <Field name="name" className="h-10 border" />
              <div className="text-red-500 ">
                <ErrorMessage name="name"/>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <Field name="email" className="h-10 border" />
              <div className="text-red-500 ">
                <ErrorMessage name="name"/>
              </div>
            </div>
            <button className="cursor-pointer self-end mt-4 bg-orange px-3 py-1.5 border">
             {isUpdate ? "update": "add"} Contact
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
}

export default AddCompoenent;
