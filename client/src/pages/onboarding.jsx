import { useContext, useEffect } from "react"; // Import useContext
import { StateContext, useStateProvider } from "@/context/StateContext"; // Import the context
import Image from "next/image";
import React, { useState } from "react";
import Input from "@/components/common/Input";
import Avatar from "@/components/common/Avatar";  // Adjust the path based on the location of your Avatar component
import { ONBOARD_USER_ROUTE } from "@/utils/ApiRoutes";
import { useRouter } from "next/router";
import axios from "axios";
const reducerCases = {
    SET_NEW_USER: 'SET_NEW_USER',
    SET_USER_INFO: 'SET_USER_INFO',
};


function Onboarding() {
    const router = useRouter()
    const [{ userInfo, newUser }, dispatch] = useStateProvider();
    
    const [name, setName] = useState(userInfo?.name || "");
    const [about, setAbout] = useState("");
    const [image, setImage] = useState("/default_avatar.png");

    useEffect(() => {
        if (!newUser && !userInfo?.email) router.push("/login");
        else if (!newUser && userInfo?.email) router.push("/");



    }, [newUser, userInfo, router])


    const onboardUserHandler = async () => {
        if (validateDetails()) {
            const email = userInfo.email;
            try {
                const { data } = await axios.post(ONBOARD_USER_ROUTE, {
                    email,
                    name,
                    about,
                    image,
                });
                if (data.status) {
                    dispatch({ type: reducerCases.SET_NEW_USER, newUser: false })
                    dispatch({
                        type: reducerCases.SET_USER_INFO,
                        userInfo: {
                            id:data.user.id,
                            name,
                            email,
                            profileImage: image,
                            status: about,
                        }
                    });
                    router.push("/")
                }

            } catch (err) {
                console.log(err);
            }
        }

    }
    const validateDetails = () => {
        if (name.length < 3) {
            return false;
        }
        return true
    }
    return (
        <div className="bg-panel-header-background h-screen w-screen text-white flex flex-col items-center justify-center">
            <div className="flex items-center justify-center gap-2">
                <Image src="/whatsapp.gif" alt="whatsapp" height={300} width={300} />
                <span className="text-7xl">Whatsapp</span>
            </div>



            <div className="flex gap-6 mt-6">
                <div className="flex flex-col items-center justify-center mt-5 gap">
                    <Input name=" Display Name"
                        state={name}
                        setState={setName}
                        label />
                    <Input name="About"
                        state={about}
                        setState={setAbout}
                        label />
                    <button
                        className="flex items-center justify-center gap-7 bg-gray-800 hover:bg-gray-700 text-white py-3 px-6 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 mt-6"
                        onClick={onboardUserHandler}
                    >
                        Create Profile
                    </button>


                </div>

                <div>
                    <Avatar type="xl" image={image} setImage={setImage} />
                </div>
            </div>
        </div>
    );
}

export default Onboarding; // Default export
