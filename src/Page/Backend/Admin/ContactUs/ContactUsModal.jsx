/* eslint-disable react/prop-types */

const ContactUsModal = ({ message }) => {
    return (
        <>
            <dialog id="my_modal_3" className="modal">
                <form method="dialog" className="modal-box">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <h3 className="font-bold text-lg">Customer Message</h3>
                    <p className="pt-6">Name: <span className="font-semibold">{message?.name}</span></p>
                    <p className="py-4">Email: <span className="font-semibold">{message?.email}</span></p>
                    <p className="pb-4">Massage: <span className="font-semibold">{message?.message}</span></p>
                </form>
            </dialog>
        </>
    );
};

export default ContactUsModal;