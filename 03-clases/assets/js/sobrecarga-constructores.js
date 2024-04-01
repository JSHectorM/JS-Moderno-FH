class Persona {

    // * JS no utiliza sobrecarga de constructores
    // * se ocupa un metodo estatico para crear la instancia que no se le llama contructor

    static constructorObjeto( { nombre, apellido, pais } ){
        return new Persona( nombre, apellido, pais );
    }


    constructor ( nombre, apellido, pais ) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.pais = pais;
    }

    getInfo() {
        console.log(`Info : ${ this.nombre } , ${this.apellido}  pais: ${this.pais}`);
    }

}

const   nombre1 = 'Elizabeth', 
        apellido1 = 'Rios', 
        pais1 = 'MX';
        
const Eve = {
    nombre : 'Evelia',
    apellido : 'San',
    pais : 'UA'
}
const persona1 = new Persona( nombre1, apellido1, pais1 );

persona1.getInfo();

const persona2  = Persona.constructorObjeto( Eve );
persona2.getInfo();