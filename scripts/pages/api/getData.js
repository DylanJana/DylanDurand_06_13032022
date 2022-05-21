export async function fetchPhotographersJSON(){
    const response = await fetch("/data/photographers.json");
    const data = await response.json();
    return data;
}