import { siteConfig } from "@/config/site";
import { FormData } from "@/types";

export const fetchRoutes = async () => {
    const res = await fetch(siteConfig.backendServer.address + '/routes/get-routes',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

    const data = await res.json();
    return (data?.data.at(0)?.routes);
}

export const fetchOfferedJourney = async (formData: FormData) => {
    const res = await fetch(siteConfig.backendServer.address + '/offeredJourney/get-offeredJourney',
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                from: formData.origin,
                stops: [formData.destination],
                date: formData.date
            }),
        });

    const data = await res.json();
    return (data);
}