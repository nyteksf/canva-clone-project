import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";

// IS CLIENT VALID? CLIENT IS USED TO MAKE API CALL (eg. client.api.images.$get())
// IMPORTANT! SEE QueryFn: IS API CALL TO CERTAIN FILE GROUP OF PHOTOS HE USED STILL VALID? CHECK IF EXISTS ON SERVER ANYMORE.
console.log("Client object:", client);
console.log("Client API:", client?.api);
console.log("Client API Images:", client.api?.images);

export const useGetImages = () => {
    const query = useQuery({
        queryKey: ["images"],
        queryFn: async () => {
            console.log("Entering queryFn...");
            console.log("Making request to fetch images...");
            console.log("API method:", client.api?.images?.$get);

            const response = await client.api.images.$get();

            // NOTHING FIRES BELOW THIS LINE:
            // PROBLEM SEEMS TO BE WITH CLIENT OR API CALL ITSELF
            console.log("response: " + response);

            if (!response) {
                throw new Error("No response from API");
            }

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            console.log("API response:", response); // This won't fire if response isn't returned correctly
            const { data } = await response.json();

            console.log("Fetched data:", data);
            return data;
        },
    });

    return query;
};
