import ContactUsModal from "./ContactUsModal";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import useAdminContactMassage from "../../../../Hook/useAdminContactMassage";
import Title from "../../../../../PageTitle/Title";
import { AuthContext } from "../../../../Auth/AuthProvider";
import { useNavigate } from "react-router-dom";

const ContactUsDashboard = () => {

    const { data, isLoading, refetch } = useAdminContactMassage();
    const { userLogout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [contactUsMessage, setContactUsMessage] = useState({});

    if (data?.error) {
        userLogout()
            .then()
        navigate('/login');
    }

    const deleteMessage = id => {
        const confirmation = confirm('Are you sure want to do Delete');
        if (confirmation) {
            fetch(`https://summer-camp-backend-rho.vercel.app/contact-us/single-message/delete/${id}`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json',
                }
            })
                .then(res => res.json())
                .then(() => {
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
        fetch(`https://summer-camp-backend-rho.vercel.app/contact-us/single-massage-modal/${id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('jwt-access-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data?.error) {
                    userLogout()
                        .then()
                    navigate('/login');
                } else {
                    setContactUsMessage(data)
                }
            })

        fetch(`https://summer-camp-backend-rho.vercel.app/contact-us/single-massage-seen/${id}`, {
            method: "PUT",
            headers: {
                'content-type': 'application/json',
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
        <>
            <Title title={'Contact Message'}></Title>
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
        </>
    );
};

export default ContactUsDashboard;