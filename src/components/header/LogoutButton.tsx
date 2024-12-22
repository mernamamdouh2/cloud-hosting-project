"use client";

import { DOMAIN } from '@/utils/constants';
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
    const router = useRouter();
    const logoutHandler = async () => {
        try {
            await axios.get(`${DOMAIN}/api/users/logout`);
            router.push("/");
            router.refresh();
        } catch (error) {
            toast.warning("Something went wrong");
            console.log(error);
        }
    }

    return (
        <button onClick={logoutHandler} className="bg-gray-700 text-gray-200 px-2 py-1 rounded-md hover:bg-gray-600">
            Logout
        </button>
    )
}

export default LogoutButton