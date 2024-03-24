class Persona{

    // * propiedades estaticas
    static _conteo = 0;

    // * metodos estaticos para poderlos llamar con su nombre al iguaol que la propiedad
    static get conteo() {
        return Persona._conteo + "instancias"; 
    }
    static poder() {
        console.log('metodo estatico llamado por el nombre de la propiedad');
    }

    nombre = '';
    ciudad = '';
    poder = '';

    constructor( nombre='', ciudad='', poder='' ){
        this.nombre = nombre;
        this.ciudad = ciudad;
        this.poder  = poder;

        Persona._conteo++;
    }

    datosPerona() {
        console.log(`Soy ${this.nombre} , y protejo a la ciudad ${this.ciudad} con ${this.poder}`);
    }

    set setNombrePersona (nombre){
        this.nombre = nombre;
    }
    
    set setCiudadPersona (ciudad){
        this.ciudad = ciudad;
    } 

    set setPoderpersona (poder) {
        this.poder = poder;
    }

    get getPoderPersona (){
        return this.poder;
    }

}

const batman =  new Persona('Batman', 'Gotham', 'Dinero');
const superman =  new Persona('Superman', 'metropolis', 'Fuerza');

superman.setPoderpersona = 'Rashos lacer';

console.log(batman.getPoderPersona);
console.log(superman);

batman.datosPerona();
superman.datosPerona();


console.log(Persona._conteo +  '  -- ' + Persona.conteo );

Persona.poder();

