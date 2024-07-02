import supabase, { supabaseUrl } from "./supabase";

export async function getClicksForUrl(urlIds) {
    const { data, error } = await supabase
        .from("clicks")
        .select("*")
        .in("url_id", urlIds)

    if (error) {
        console.error(error.message);
        throw new Error("Unable to get clicks data");
    }

    return data;
}
