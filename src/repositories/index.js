import {db} from "../db/database.connection.js"

export async function dbAnimals() {
    const animals = await db.query(`SELECT * FROM "ANIMAIS"`)
    // const allAnimals = animals.rows.map( animal => {
    //     console.log(animal)
    //     return  {id, especie, tamanho, bioma, carnivoro};
    // });

    return animals.rows

}


export async function dbBiomes() {

     const biomes = await db.query(`SELECT * FROM "RECINTOS_EXISTENTES"`)
 
    //  const allBiomes = biomes.rows.map( biome => {
    //      return  {id, bioma, tamanho, tamanho_total, animais_existentes, numero};
    //  });
 
     return biomes.rows
 
 }