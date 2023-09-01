import ContactUsModal from "./ContactUsModal";
import { useState } from "react";
import { toast } from "react-toastify";
import useAdminContactMassage from "../../../../Hook/useAdminContactMassage";

const ContactUsDashboard = () => {

    const { data, isLoading, refetch } = useAdminContactMassage();
    const [contactUsMessage, setContactUsMessage] = useState({});

    const deleteMessage = id => {
        const confirmation = confirm('Are you sure want to do Delete');
        if (confirmation) {
            fetch(`http://localhost:5000/contact-us/single-message/delete/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    refetch();
                    if (data?.deletedCount > 0) {
                        toast.success('Message Delete Successfully', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "dark",
                        });
                    }
                })
        }
    }

    const handelContactUsModal = id => {
        fetch(`http://localhost:5000/contact-us/single-massage-modal/${id}`)
            .then(res => res.json())
            .then(data => setContactUsMessage(data))

        fetch(`http://localhost:5000/contact-us/single-massage-seen/${id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'seen' })
        })
            .then(res => res.json())
            .then(() => refetch())
    }

    if (isLoading) {
        return <h1 className="text-xl font-semibold">Loading...</h1>
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table text-center">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Message</th>
                            <th>View</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((message, index) => {
                                return (
                                    <tr key={message?._id} className={message?.status === 'unseen' ? 'bg-base-200' : ''}>
                                        <th>{index + 1}</th>
                                        <td>{message?.name}</td>
                                        <td>{message?.email}</td>
                                        <td><p className="lg:w-80 md:w-72">{message?.message}</p></td>
                                        <td><button className="btn" onClick={() => { window.my_modal_3.showModal(); handelContactUsModal(message?._id) }}>open modal</button></td>
                                        <th><button className="btn bg-red-500 hover:bg-red-600 text-white" onClick={() => deleteMessage(message?._id)}>Delete</button></th>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <ContactUsModal message={contactUsMessage}></ContactUsModal>
        </div>
    );
};

export default ContactUsDashboard;