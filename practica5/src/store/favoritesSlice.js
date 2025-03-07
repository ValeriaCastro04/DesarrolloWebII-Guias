export const createFavoritesSlice = (set, get) => ({
    //estado inicial: una lista vacia de favoritos
    favorites: [],
    //funcion para verificar si una recera ya esta en favoritos
    favoriteExists: (id) => {
        return get().favorites.some(favorite => favorite.idDrink == id);
    },

    //maneja el click en el boton de favorito (agregar o eliminar)
    handleClickFavorite: (recipe) => {
        if (get().favoriteExists(recipe.idDrink)){
            set((state) => ({
                favorites: state.favorites.filter(favorite => favorite.idDrink != recipe.idDrink)
            }));
        } else {
            set((state) => ({
                favorites: [...state.favorites, recipe]
            }));
        }

        localStorage.setItem('favorites', JSON.stringify(get().favorites));

    },

    //carga la lista de favoritos desde localStorage al iniciar la aplicacion
    loadFromStorage: () => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            set({
                favorites: JSON.parse(storedFavorites)
            });
        }
    }
});