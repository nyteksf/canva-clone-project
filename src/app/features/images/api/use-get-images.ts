import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";
console.log("Client object:", client);
console.log("Client API:", client.api);
console.log("Client API Images:", client.api?.images);

export const useGetImages = () => {
    const query = useQuery({
        queryKey: ["images"],
        queryFn: async () => {
            console.log("Entering queryFn...");
            try {
                console.log("Making request to fetch images...");
                console.log("API method:", client.api?.images?.$get); 
                const response = await client.api.images.$get().catch(err => {
                    console.error("Error calling API:", err);
                    throw err; // Optional, to rethrow the error after logging
                }); // <-client from lib/hono 

                // NOTHING FIRES BELOW THIS LINE:
                console.log("response: " + response)
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
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        },
    });

    return query;
};
