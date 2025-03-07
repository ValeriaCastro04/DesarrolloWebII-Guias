import axios from "axios";

//funcion para obtener las categorias de cocteles
export async function getCategories() {
    
    const url = "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list";
    const {data} = await axios(url);
    console.log(data.drinks)
    return data.drinks;
}