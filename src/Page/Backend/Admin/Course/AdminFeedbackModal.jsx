/* eslint-disable react/prop-types */
import { toast } from "react-toastify";

const AdminFeedbackModal = ({ id, oldFeedback, refetch }) => {

    const handelSubmit = event => {
        const form = event.target;
        const feedback = form.feedback.value;

        fetch(`http://localhost:5000/admin/feedback/${id}`, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ feedback })
        })
            .then(res => res.json())
            .then(data => {
                refetch()
                
                if (data?.modifiedCount > 0) {
                    toast.success('Feedback Send Successfully', {
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

        form.reset();
    }

    return (
        <dialog id="my_modal_3" className="modal">
            <form onSubmit={handelSubmit} method="dialog" className="modal-box">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                <h3 className="font-bold text-lg text-center text-gray-500">Your Feedback!</h3>
                <textarea name="feedback" className="textarea textarea-bordered w-full my-6" placeholder="Course Feedback..." defaultValue={oldFeedback}></textarea>
                <div className="text-center">
                    <input type="submit" value="Send Feedback" className="btn" />
                </div>
            </form>
        </dialog>
    );
};

export default AdminFeedbackModal;