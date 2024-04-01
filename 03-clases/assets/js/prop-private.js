class Rectangulo {

    // ? Los metodos y propiedades privadas solo se pueden ocupar dentro de la clase
    // * Para crear una propiedad privada dentro de js se le da el # al principio
    #area = 0;
    constructor ( base = 0, altura = 0 ){
        this.base = base;
        this.altura = altura;

        this.#area = this.#calculaArea( base, altura);
    }

    // * de igual forma para los metodos

    #calculaArea(base , altura) {
        return base * altura
    }

    
}

const rectangulo = new Rectangulo(10, 15);

console.log(rectangulo);