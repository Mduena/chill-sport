import { useEffect, useState } from "react";
import axios from "axios";
import getDate from "../utils/date.js";

const Mesevencours = () => {
    // console.log(Tab);
    const [activities, setActivities] = useState([])
    const [organizers, setOrganizers] = useState([])

    async function getCurrentEvent() {
        const res = await axios.get("/api/activity/get_activities")

        // console.log(res.data.activity)

        if (window.localStorage["auth"]) {
            const user_id = JSON.parse(window.localStorage["auth"]).userId

            let activities2 = []
            res.data.activity.map((act) => {
                //console.log(act)
                if (act.participants_id.indexOf(user_id) != -1) {
                    //console.log(act.participants_id)
                    activities2.push(act)
                }

            })
            setActivities(activities2)
        }

    }

    async function getOrganizers() {
        const res = await axios("/api/user/getAllUsers");

        let org = [];

        //console.log(res.data.user);

        res.data.user.map((u) => {
            org[u._id] = {
                name: u.username ?? u.name,
                email: u.email,
                phone: u.phone
            }
        });

        //console.log(org);

        setOrganizers(org);

        //console.log(organizers);
    }

    useEffect(() => {
        getCurrentEvent();
        getOrganizers();
    }, [])

    return (
        <div className="grid grid-cols-1 place-items-center mb-12">
        {/* <div className="rounded-lg overflow-hidden mb-10 hover:drop-shadow-xl justify-center"> */}
            
            {
                activities.map((act) => {
                    return (
                        <>

        <div className="xl:w-2/4 mb-6 ">
            <div className="bg-white rounded-lg overflow-hidden m-0 hover:drop-shadow-xl ">
                <img
                    src={act.photo}
                    alt="image"
                    className="w-full"
                />
                <div className="p-8 sm:p-9 md:p-1 xl:p-9 text-center ">
                    <h3>
                        <a                            
                            className="
                       font-semibold
                       text-dark text-xl
                       sm:text-[12px]
                       md:text-xl
                       lg:text-[22px]
                       xl:text-xl
                       2xl:text-[22px]
                       mb-4
                       block
                       hover:text-primary
                       -mt-5
                       "
                        >
                            {act.title}
                        </a>
                    </h3>

                    {
                        //organizer = await axios()
                        
                        // isSubscribed &&
                        organizers[act.organisater_id] &&

                        <>
                            <h4>Coordonnées de l'organisateur: {organizers[act.organisater_id].name}</h4>
                            <h4>Contact: {organizers[act.organisater_id].phone}</h4><br></br>
                        </>
                    }
                    
                    <div className="Date">
                    <div>
                    Date de l'activité: {getDate(act.date_debut).date} à {getDate(act.date_debut).heure}
                    </div>
                </div><br></br>

                    <p className="text-base text-body-color leading-relaxed mb-7 ">
                        {act.description}
                    </p>
                    {
                        // !isSubscribed &&
                        
                        <a  href={`/activities/${act._id}`}
                            className="inline-block py-2 px-7 border border-[#E5E7EB] rounded-full bg-blue-500 font-medium hover:border-primary hover:bg-blue ">
                            {/* <SubscribeActivity activityId={router.query.id} /> */}
                            Voir le détail
                        </a>
                    }
                    
                    {
                        // isSubscribed &&
                        
                        // <a
                        //     href="javascript:void(0)"
                        //     className="inline-block py-2 px-7 border border-[#E5E7EB] rounded-full bg-blue-500 font-medium hover:border-primary hover:bg-blue ">
                        //     {/* <UnsubscribeActivity activityId={router.query.id} /> */}
                        // </a>
                    }

                    {
                        // isOrganizer &&
                        
                        // <a
                        //     href="javascript:void(0)"
                        //     className="inline-block py-2 px-7 border border-[#E5E7EB] rounded-full bg-blue-500 font-medium hover:border-primary hover:bg-blue ">
                        //     {/* <DeleteActivity activityId={router.query.id} /> */}
                        // </a>
                    }
                    
                </div>
            </div>
        </div>
        
    </>
    
                        )
                })
            }

        </div>
        // </div>
    
    )

}

export default Mesevencours;