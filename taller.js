// Definiciones de los strings de tipos
const tipoElectrico = 'eléctrico';
const tipoPlanta = 'planta';
const tipoFuego = 'fuego';
const tipoNormal = 'normal';
const tipoAgua = 'agua';
const tipoBicho = 'bicho';

// Definiciones globales (no modificar acá, en cambio, completar las funciones ejercicio_i)
let bulbasaur;
let pikachu;
let pichu;
let raichu;
let Pokemon;
let charmander;
let charmeleon;
let charizard;
let peleaPokemon;
let ditto;

// Ejercicio 1
function ejercicio1() {				// Crea un Pikachu.
    pikachu = { 			
        hp: 250,					//Pikachu no indica su tipo acá porque es una evolución de pichu y porque el ejercicio 1 no pide el tipo.
        ataqueImpactrueno: function(oponente){oponente.hp -= 10},
    };

    bulbasaur = { 					// Crea un Bulbasaur.
        hp: 300, 
        tipo: tipoPlanta, 	//El tipo de bulbasaur va acá porque bulbasaur no es evolución de nadie, esto permite que cualquier evolución de Bulbasaur herede su tipo.
        ataquePlacaje: function(oponente){oponente.hp -= 10},
        ataqueLatigoCepa: function(oponente){oponente.hp -= 10},
    };
}

// Ejercicio 2
function ejercicio2() {
    //Punto a:
    raichu = Object.create(pikachu); // Crea un Raichu, siendo una evolución de Pikachu.
    raichu.hp = 300;
    raichu.ataqueGolpeTrueno = function(oponente){oponente.hp -= 30};

    //Punto b:
    pichu = {						// Crea un Pichu.
        hp: 100,
        tipo: tipoElectrico         // El tipo de Pikachu y Raichu es heredado de Pichu, por eso, el típo solamente lo defino en Pichu.
    };

    //Punto c:
    Object.setPrototypeOf(pikachu, pichu); 	// Hace que Pikachu sea la evolución de Pichu.
}


// Ejercicio 3
function ejercicio3() {
    //Punto a:
    Pokemon = function(hp, ataques, tipo){		//Función constructora de Pokemones.
        this.hp = hp;
        Object.assign(this, ataques);
        this.tipo = tipo;
    };
    
    //Punto b:
    charmander = new Pokemon(200, {ataqueAscuas: function(oponente){oponente.hp -= 40}}, tipoFuego); 	//Crea un Charmander.
    
    //Punto c:
    //Estas dos líneas de código, hacen que Bulbasaur, Pichu y sus evoluciones, se comporten como si hubiesen sido creados con la función constructora.
    Object.setPrototypeOf(pichu, Pokemon.prototype); 	
    Object.setPrototypeOf(bulbasaur, Pokemon.prototype);
    
    //Punto d:
    Pokemon.prototype.atacar = function(ataque, pokeOponente){ 	//Los Pokemones adquieren la capacidad de atacar a un oponente con un ataque determinado.
        if (ataque in this) {
            this[ataque](pokeOponente);
        } else {
            this.hp -= 10;
        }
    };

}

// Ejercicio 4
function ejercicio4() {
    //Punto a:
    Pokemon.prototype.nuevoAtaque = function(ataque, efecto){	//Los Pokemones adquieren la capacidad de aprender un nuevo ataque.
        this[ataque] = efecto;
    };

    //Punto b:
    pikachu.nuevoAtaque("ataqueOndaTrueno", function(otroPoke){ otroPoke.hp = Math.floor(otroPoke.hp/2)}); //Pikachu aprende Onda Trueno.
}

// Ejercicio 5
function ejercicio5() {
    //Punto a:
    Pokemon.prototype.evolucionar = function(){ 			//Los Pokemones adquieren la capacidad de evolucionar.
        let evolucion = Object.create(this);
        evolucion.hp = this.hp*2;
        return evolucion;
    };

    //Punto b:
    charmeleon = charmander.evolucionar(); 					// Crea a Charmeleon como evolución de Charmander,
    charizard = charmeleon.evolucionar();					// Crea a Charizard como evolución de Charmeleon.
}

// Ejercicio 6
//Es necesario que esté afuera del scope de ejercicio6() para que pueda ser usada en testEjercicio6().
function turnoDeAtaque(pokemonAtacante, pokemonVictima){  // Hace que pokemonAtacante, ataque a pokemonVictima con cualquier ataque que conozca.
    let cualquierAtaque = pokemonAtacante.algunAtaque();
    pokemonAtacante.atacar(cualquierAtaque, pokemonVictima);
}

//Es necesario que esté afuera del scope de ejercicio6() para que pueda ser usada en testEjercicio6().
function obtenerNombresDeLosMetodos(object){				// Dado un objeto, devuelve los nombres de todos sus métodos.
    let nombresDeMetodos = [];
    nombresDeMetodos = nombresDeMetodos.concat(Object.keys(object));
   	return nombresDeMetodos;
}

function ejercicio6() {
    //Punto a:
	function generarIntRandom(min, max) {					// Genera un int random dentro del rango [min, max).
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min) + min);
	}

    Pokemon.prototype.algunAtaque = function(){  			// Los Pokemons adquieren de devolver el nombre de algún ataque que conozcan (elegido al azar).
        let nombresDeAtaques = obtenerNombresDeLosMetodos(this).filter((nombreDelMetodo) => nombreDelMetodo.startsWith('ataque'))
        return nombresDeAtaques[generarIntRandom(0, nombresDeAtaques.length)]
    	// Asumimos que el Pokemon conoce algún ataque, pues según la consigna: no está definido el comportamiento si el Pokémon no sabe ningún ataque
    }

    //Punto b:
    Pokemon.prototype.estaVivo = function(){ 				// Los Pokemones adquieren la capacidad de decir si están vivos. 
        return 0 < this.hp;
    };



    peleaPokemon = function(pokemonA, pokemonB){ 			// Enfrenta a dos pokemones y devuelve el ganador. Asumimos que ambos tienen hp mayor a 0 y saben realizar al menos un ataque.
        while(true){
            //A ataca a B:
            turnoDeAtaque(pokemonA, pokemonB)
            if(!pokemonB.estaVivo()) return pokemonA;
            //B ataca a A:
            turnoDeAtaque(pokemonB, pokemonA)
            if(!pokemonA.estaVivo()) return pokemonB;
        }
    };
}

// Ejercicio 7
function ejercicio7() {
    ditto = new Pokemon(100, {}, tipoNormal);				// Crea a Ditto.
	ditto.nuevoAtaque("ataqueCopiar", function(oponente){
		let nombreAtaqueACopiar = oponente.algunAtaque();
	    this.nuevoAtaque(nombreAtaqueACopiar, oponente[nombreAtaqueACopiar]);
	});

}

// Test Ejercicio 1
function testEjercicio1(res) {
    res.write(`\n Chequeos para Pikachu:`);
    res.write(`El hp de Pikachu es ${pikachu.hp}.`, pikachu.hp === 250);
    let pikachuConoceImpactrueno = 'ataqueImpactrueno' in pikachu;
    res.write(`Pikachu ${si_o_no(pikachuConoceImpactrueno)} conoce impactrueno.`, pikachuConoceImpactrueno);

    res.write(`\n Chequeos para Bulbasaur:`);
    res.write(`El hp de Bulbasaur es ${bulbasaur.hp}.`, bulbasaur.hp === 300);
    let bulbasaurConocePlacaje = 'ataquePlacaje' in bulbasaur;
    res.write(`Bulbasaur ${si_o_no(bulbasaurConocePlacaje)} conoce placaje.`, bulbasaurConocePlacaje);
    let bulbasaurConoceLatigocepa = 'ataqueLatigoCepa' in bulbasaur;
    res.write(`Bulbasaur ${si_o_no(bulbasaurConoceLatigocepa)} conoce látigo cepa.`, bulbasaurConoceLatigocepa);
    
	res.write(`\n Chequeos para ver si los ataques producen 10 hp de daño en el oponente:`);
    let squirtle = {hp: 200};
    res.write(`Creamos a Squirtle, con ${squirtle.hp} de hp.`);
    bulbasaur.ataquePlacaje(squirtle);
    res.write(`Después de ser atacado una vez por Bulbasaur con ataque placaje, el hp de Squirtle es de ${squirtle.hp}.`, squirtle.hp === 190);
    bulbasaur.ataqueLatigoCepa(squirtle);
    res.write(`Después de ser atacado una vez por Bulbasaur con ataque látigocepa, el hp de Squirtle es de ${squirtle.hp}.`, squirtle.hp === 180);
    pikachu.ataqueImpactrueno(squirtle);
    res.write(`Después de ser atacado una vez por Pikachu con ataque impactrueno, el hp de Squirtle es de ${squirtle.hp}.`, squirtle.hp === 170);
    
    res.write(`\n Se ejecutan todos los tests del ejercicio 1.`);
}

// Test Ejercicio 2
function testEjercicio2(res) {
    res.write(`\n Chequeos para Raichu:`);
    res.write(`El hp de Raichu es ${raichu.hp}.`, raichu.hp === 300);
    let raichuConoceImpactrueno = 'ataqueImpactrueno' in raichu;
    res.write(`Raichu ${si_o_no(raichuConoceImpactrueno)} conoce impactrueno.`, raichuConoceImpactrueno);
    let raichuConoceGolpeTrueno = 'ataqueGolpeTrueno' in raichu;
    res.write(`Raichu ${si_o_no(raichuConoceGolpeTrueno)} conoce golpetrueno.`, raichuConoceGolpeTrueno);

    let caterpie = {hp:100}
    res.write(`\n Creamos a Caterpie, con ${caterpie.hp} de hp.`);
    raichu.ataqueImpactrueno(caterpie);
    res.write(`Raichu usa impactrueno contra Caterpie, por lo que su hp es ${caterpie.hp}.`, caterpie.hp === 90);
    raichu.ataqueGolpeTrueno(caterpie);
    res.write(`Después, si usa golpeTrueno, el hp de Caterpie es ${caterpie.hp}.`, caterpie.hp === 60);
 
    res.write(`\n Chequeos para Pichu:`);
    res.write(`El hp de Pichu es ${pichu.hp}.`, pichu.hp === 100);

    //test de tipo de Pokemón para Pichu, Pikachu, Raichu y Bulbasaur.
    res.write(`\n Chequeamos el tipo de Pokemón para Bulbasaur, Pichu, Pikachu y Raichu:`);
    res.write(`El tipo de Bulbasaur es ${bulbasaur.tipo}.`, bulbasaur.tipo === tipoPlanta);
    res.write(`El tipo de Pichu es ${pichu.tipo}.`, pichu.tipo === tipoElectrico);
    res.write(`El tipo de Pikachu es ${pikachu.tipo}.`, pikachu.tipo === tipoElectrico);
    res.write(`El tipo de Raichu es ${raichu.tipo}.`, raichu.tipo === tipoElectrico);
    
    res.write(`\n Chequeo de herencia de ataques para Pichu, Pikachu y Raichu.`);
    let pikachuConocePararrayo = 'ataquePararrayo' in pikachu;
    res.write(`Pikachu ${si_o_no(pikachuConocePararrayo)} tiene definido pararrayo,`, !pikachuConocePararrayo);
    pichu.ataquePararrayo = function(otroPoke) {
        otroPoke.hp -= 10;
    };
    let pikachuConocePararrayoAhora = pikachu.ataquePararrayo == pichu.ataquePararrayo;
    res.write(`pero ${si_o_no(pikachuConocePararrayoAhora)} lo tiene definido una vez que se le define a Pichu.`, pikachuConocePararrayoAhora);
    let raichuConocePararrayo = raichu.ataquePararrayo == pichu.ataquePararrayo;
    res.write(`Raichu ${si_o_no(raichuConocePararrayo)} conoce pararrayo.`, raichuConocePararrayo);
    let pikachuEsDeTipoElectrico = pikachu.tipo == tipoElectrico;
    res.write(`Pikachu ${si_o_no(pikachuEsDeTipoElectrico)} es de tipo eléctrico como Pichu.`, pikachuEsDeTipoElectrico);
    

    res.write(`\n Se ejecutan todos los tests del ejercicio 2.`);
}

// Test Ejercicio 3
function testEjercicio3(res) {
    res.write(`\n Chequeos para Charmander y para función constructora de Pokemones:`);
    res.write(`Se crea un Charmander con la función constructora de Pokemones.`);
    res.write(`El hp de Charmander es ${charmander.hp}.`, charmander.hp === 200);
    let charmanderConoceAscuas = 'ataqueAscuas' in charmander;
    res.write(`Charmander ${si_o_no(charmanderConoceAscuas)} tiene definido ascuas.`, charmanderConoceAscuas);
    res.write(`El tipo de Charmander es ${charmander.tipo}.`, charmander.tipo === tipoFuego);
    

    //Acá se podrían volver a hacer los tests de los ejercicios 1 y 2, porque se modificaron los Pokémon definidos en los ejercicios 
    // anteriores para que se comporten como si hubieran sido creados mediante la función constructora.
    res.write(`\n Chequeos para el nuevo método de creación de Pokemones:`);
    let pikachuConoceGolpeTrueno = 'ataqueGolpeTrueno' in pikachu;
    res.write(`Se mantiene la jerarquía de antes, Pikachu ${si_o_no(pikachuConoceGolpeTrueno)} tiene definido golpeTrueno.`, !pikachuConoceGolpeTrueno);

    res.write(`\n Chequeos para el nuevo método atacar:`);
    let pidgey = new Pokemon (200,{},tipoNormal);
    res.write(`Creamos a Pidgey, con ${pidgey.hp} de hp.`);
    pikachu.atacar("ataqueImpactrueno", pidgey);
    res.write(`Pidgey es atacado por Pikachu, y ahora tiene un hp de ${pidgey.hp},`, pidgey.hp == 190);
    let pikachuConMismoHp = pikachu.hp == 250;
    res.write(`y el hp de Pikachu ${si_o_no(!pikachuConMismoHp)} se ve afectado.`, pikachuConMismoHp);

    pidgey.atacar("ataqueLatigoCepa", raichu);
    res.write(`Pidgey intenta atacar a Raichu con un ataque que no conoce, pero termina con hp de ${pidgey.hp},`, pidgey.hp == 180);
    let raichuConMismoHp = raichu.hp == 300;
    res.write(`y el hp de Raichu ${si_o_no(!raichuConMismoHp)} se ve afectado.`, raichuConMismoHp);

    res.write(`\n Se ejecutan todos los tests del ejercicio 3.`);
}

// Test Ejercicio 4
function testEjercicio4(res) {
	res.write(`\n Chequeos para el método nuevoAtaque y para el nuevo ataque de Pikachu Onda Trueno:`);
    let ekans = new Pokemon (250,{},tipoPlanta);
    res.write(`Creamos a Ekans, con ${ekans.hp} de hp.`);
    pikachu.ataqueOndaTrueno(ekans);
    res.write(`Atacar a Ekans con el nuevo ataque ondaTrueno le deja ${ekans.hp} de hp.`, ekans.hp == 125);
    let pichuConoceOndaTrueno = 'ataqueOndaTrueno' in pichu;
    res.write(`Pichu ${si_o_no(pichuConoceOndaTrueno)} puede atacar usando ondaTrueno,`, !pichuConoceOndaTrueno);
    let raichuConoceOndaTrueno = raichu.ataqueOndaTrueno == pikachu.ataqueOndaTrueno;
    res.write(`y Raichu ${si_o_no(raichuConoceOndaTrueno)} puede.`, raichuConoceOndaTrueno);
    
    res.write(`\n Se ejecutan todos los tests del ejercicio 4.`);
}

// Test Ejercicio 5
function testEjercicio5(res) {
	res.write(`\n Chequeos para el método evolucionar:`);

	res.write(`\n Chequeos de hp de las evoluciones:`);
    let charmeleonTieneDobleHp = charmeleon.hp == 2*charmander.hp;
    res.write(`Charmeleon ${si_o_no(charmeleonTieneDobleHp)} tiene el doble de hp de Charmander.`, charmeleonTieneDobleHp);
    let charizardTieneCuadrupleHp = charizard.hp == 4*charmander.hp;
    res.write(`Charizard ${si_o_no(charizardTieneCuadrupleHp)} tiene cuatro veces el hp de Charmander.`, charizardTieneCuadrupleHp);

	res.write(`\n Chequeo de ataques de las evoluciones:`);    
    res.write(`Charmander aprende ascuasEmber.`);
    charmander.nuevoAtaque("ataqueAscuasEmber", function(otroPoke){otroPoke.hp -= 10});
    let charmeleonConoceAscuasEmber = charmeleon.ataqueAscuasEmber == charmander.ataqueAscuasEmber;
    res.write(`Charmeleon ${si_o_no(charmeleonConoceAscuasEmber)} puede atacar con ascuasEmber,`, charmeleonConoceAscuasEmber);
    let charizardConoceAscuasEmber = charizard.ataqueAscuasEmber  == charmander.ataqueAscuasEmber;
    res.write("Charizard también.", charizard.ataqueAscuasEmber  == charmander.ataqueAscuasEmber);
    res.write(`Charmeleon aprende lanzallamas.`);
    charmeleon.nuevoAtaque("ataqueLanzallamas", function(otroPoke){otroPoke.hp -= 10});
    let charmanderConoceLanzallamas = 'ataqueLanzallamas' in charmander;
    res.write(`Charmander ${si_o_no(charmanderConoceLanzallamas)} conoce el ataque lanzallamas de Charmeleon.`, !charmanderConoceLanzallamas);
  

    res.write(`\n Chequeo de tipo de las evoluciones:`);
   	let charmanderYCharmeleonMismoTipo = charmander.tipo == charmeleon.tipo;
  	res.write(`Charmander ${si_o_no(charmanderYCharmeleonMismoTipo)} y Charmeleon tienen el mismo tipo.`, charmanderYCharmeleonMismoTipo);
   	let charmeleonYCharizardMismoTipo = charmeleon.tipo == charizard.tipo;
  	res.write(`Charmeleon ${si_o_no(charmeleonYCharizardMismoTipo)} y Charizard tienen el mismo tipo.`, charmeleonYCharizardMismoTipo);

    res.write(`\n Se ejecutan todos los tests del ejercicio 5.`);
}


// Test Ejercicio 6
function testEjercicio6(res) {
	
	res.write("\n Chequeo la función obtenerNombresDeLosMetodos():");	
    res.write("\n Creamos a Magikarp.");
    let magikarp = new Pokemon(300, {ataqueSalpicadura: function(oponente){oponente.hp -= 10;}}, tipoAgua);
    let propiedadesMagikarpObtenidasConFuncion = obtenerNombresDeLosMetodos(magikarp);
    let seExtrajeron3PropiedadesDeMagikarp = propiedadesMagikarpObtenidasConFuncion.length == 3;
    let seExtrajoHp = propiedadesMagikarpObtenidasConFuncion.includes('hp');
    let seExtrajoAtaqueSalpicadura = propiedadesMagikarpObtenidasConFuncion.includes('ataqueSalpicadura');
    let seExtrajoTipo = propiedadesMagikarpObtenidasConFuncion.includes('tipo');
    let obtuvePropiedadesDeMagikarp =  seExtrajeron3PropiedadesDeMagikarp && seExtrajoHp && seExtrajoAtaqueSalpicadura && seExtrajoTipo;    
    res.write(`La función obtenerNombresDeLosMetodos ${si_o_no(obtuvePropiedadesDeMagikarp)} puede devolver los nombres de las propiedades de Magikarp.`, obtuvePropiedadesDeMagikarp);

	res.write("\n Chequeo del método algunAtaque:");	
    let bulbasaurConoceAlgunAtaque = 'algunAtaque' in bulbasaur;
    res.write(`Bulbasaur ${si_o_no(bulbasaurConoceAlgunAtaque)} puede responder al mensaje algunAtaque.`, 'algunAtaque' in bulbasaur);

    let magikarpConoceAlgunAtaque = 'algunAtaque' in magikarp;
    res.write(`Magikarp ${si_o_no(magikarpConoceAlgunAtaque)} puede responder al mensaje algunAtaque.`, magikarpConoceAlgunAtaque);
    let nombreDeAlgunAtaque = magikarp.algunAtaque();
    let algunAtaqueEsSalpicadura = nombreDeAlgunAtaque == 'ataqueSalpicadura';
    res.write(`Cuando le pedimos algún ataque a Magikarp, ${si_o_no(algunAtaqueEsSalpicadura)} devuelve salpicadura.`, algunAtaqueEsSalpicadura);

    res.write("\n Chequeo si los pokemones pueden determinar si están vivos:");
    res.write("Creamos a Shedinja.");
    let shedinja = new Pokemon(11, {}, tipoBicho);
    let shedinjaConoceEstaVivo = 'estaVivo' in shedinja;
    res.write(`Shedinja ${si_o_no(shedinjaConoceEstaVivo)} puede responder al mensaje estaVivo.`, 'estaVivo' in shedinja);
    res.write(`Shedinja tiene un hp de ${shedinja.hp}, por lo tanto está vivo.`, shedinja.estaVivo());
    charizard.atacar("ataqueAscuasEmber", shedinja);    
    res.write(`Shedinja es atacado por Charizard, y ahora tiene un hp de ${shedinja.hp}, por lo que sigue vivo.`, shedinja.estaVivo());
    charizard.atacar("ataqueAscuasEmber", shedinja);    
    res.write(`Shedinja es atacado nuevamente por Charizard, y ahora tiene un hp de ${shedinja.hp}, por lo que está muerto.`, !shedinja.estaVivo());

    res.write("\n Chequeo si los pokemones pueden atacarse usando la funcion turnoDeAtaque():");
    let psyduck = new Pokemon (50,{},tipoAgua);
    res.write(`Creamos a Psyduck, con ${psyduck.hp} de hp.`);
    turnoDeAtaque(bulbasaur, psyduck);    
    res.write(`Psyduck es atacado por Bulbasaur (todos sus ataques sacan 10 hp) con la función turnoDeAtaque() y ahora tiene un hp de ${psyduck.hp},`, psyduck.hp == 40);



    res.write("\n Creamos a Kakuna.");
    let kakuna = new Pokemon(10, {ataqueFortaleza: function(oponente) {}}, tipoBicho);
    let ganador = peleaPokemon(kakuna, magikarp);
    let elGanadorEsMagikarp = 'ataqueSalpicadura' in ganador;
    res.write(`Pelean Kakuna y Magikarp, el ganador ${si_o_no(elGanadorEsMagikarp)} es Magikarp.`, elGanadorEsMagikarp);
    res.write(`El hp de Kakuna después de pelear es ${kakuna.hp}.`, kakuna.hp == 0);
  	
  	res.write(`\n Se ejecutan todos los tests del ejercicio 6.`);
}

// Test Ejercicio 7
function testEjercicio7(res) {
    res.write("\n Chequeos para el ataque Copiar de Ditto:");
	let dittoConoceCopiar = 'ataqueCopiar' in ditto;
	res.write(`Ditto ${si_o_no(dittoConoceCopiar)} conoce el ataque copiar.`, dittoConoceCopiar);

	res.write("\n Creamos a Butterfree, que conoce el ataque polvoVeneno.");
	let butterfree = new Pokemon(100, {ataquePolvoVeneno: function(oponente){oponente.hp -= 10;}}, tipoBicho);
	let dittoConocePolvoVeneno = 'ataquePolvoVeneno' in ditto;
	res.write(`Ditto ${si_o_no(dittoConocePolvoVeneno)} conoce el ataque polvoVeneno.`, !dittoConocePolvoVeneno);
	res.write("Ditto ataca a Butterfree con copiar.");
	ditto.ataqueCopiar(butterfree);
	let dittoCopioPolvoVeneno = 'ataquePolvoVeneno' in ditto;
	res.write(`Ahora Ditto ${si_o_no(dittoCopioPolvoVeneno)} conoce el ataque polvoVeneno.`, dittoCopioPolvoVeneno);

	ditto.atacar("ataquePolvoVeneno", butterfree);    

	res.write(`Ditto ataca a Butterfree con polvoVeneno, es super efectivo! Butterfree ahora tiene un hp de ${butterfree.hp},`, butterfree.hp == 90);

	res.write(`\n Se ejecutan todos los tests del ejercicio 7.`);
}

// Función auxiliar que crea un test genérico a partir de un número i y una función f
function crearTest(i, f) {
  return function() {
    if (eval("typeof ejercicio" + i)!=="undefined") {
      eval("ejercicio"+i)();
    }
    let res = {
      text:"",
      write: function(s, t) {
        if (t!=undefined) {
          if (t) s = "<span style='color:green'>" + s + "</span>";
          else s = "<span style='color:red'>" + s + "</span>";
        }
        s += "\n";
        this.text += s;
      }
    };
    try {
      f(res);
    } catch (e) {
      fail(i, e);
    }
    return res.text;
  }
}
