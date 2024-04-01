class Singleton {
    // * Solo ocupar una intancia de una clase se le llama singleton
    // * aun cuando se incie en varios lados , solo sera una sola instancia

    // ? opcionales la instancia y de forma privada para que no se acceda de fuera y estatica para su manejo

    static #instacia;
    nombre = '';


    constructor( nombre = '' ) {
        
        //  * El simbolo de ( !! )  es para ayudar a la interpretacion de un undefined que puede ser la instancia
        // ? a -> undefined
        // ? !a -> true
        // ? !!a -> false
        if ( !! Singleton.#instacia ){
            return Singleton.#instacia;
        }
        Singleton.#instacia = this;
        this.nombre = nombre;
    }

}

const intancia1 = new Singleton('Mario');
const intancia2 = new Singleton('Ori');
const intancia3 = new Singleton('Luigi');

console.log(`Nombre de la instancia ${intancia1.nombre}`);