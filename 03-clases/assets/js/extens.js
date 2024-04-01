class Persona {

    static _conteo = 0;
    static get conteo() {
        return Persona._conteo + ' instancias';
    }

    static mensaje() {
        console.log( this.nombre ); // undefined
        console.log('Hola a todos, soy un método stático');
    }


    nombre = '';
    codigo = '';
    frase  = '';
    comida = '';

    constructor( nombre = 'Sin nombre', codigo = 'Sin código', frase = 'Sin frase') {
        
        this.nombre = nombre;
        this.codigo = codigo;
        this.frase  = frase;

        Persona._conteo++;
    }

    set setComidaFavorita( comida ) {
        this.comida = comida.toUpperCase();
    }
    get getComidaFavorita() {
        return `La comida favorita de ${ this.nombre } es ${ this.comida }`;
    }


    quienSoy() {
        console.log(`Soy ${ this.nombre } y mi identidad es ${ this.codigo }`);
    }

    miFrase() {
        this.quienSoy();
        console.log(`${ this.codigo} dice: ${ this.frase }`);
    }

}

// * Extenderemos la clase persona para que sea papre de la clase heroe

class Heroe extends Persona{
    clan = 'n';

    constructor ( nombre, codigo, frase, clan = 'sin clan' ) {
        // * super() para llamar a la clase de Persona
        super(nombre, codigo, frase);

        // * solo se puede poner this, debe de haber llamado primero al contructor del padre con super
        this.clan = clan
    }

    // * Llamar a metodos de padres sobrecargandolos


    quienSoy() {
        console.log(`Soy ${ this.nombre } y mi clan es ${ this.clan }`);
        super.quienSoy();
    }

}


const batman =  new Heroe('Batman', 'Gotham', 'Dinero', 'Liga');

console.log(batman);
batman.quienSoy();