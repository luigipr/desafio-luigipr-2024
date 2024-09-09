export async function dbAnimals() {
   try{
    const animals = await db.query(`SELECT * FROM ANIMAIS`)

    const allAnimals = animals.rows.map( animal => {
        return  {id, especie, tamanho, bioma, carnivoro};
    });

    res.send(allAnimals)

    } catch (err) {
        res.status(500).send(err.message);
    }

}


export async function dbBiomes() {
    try{
     const biomes = await db.query(`SELECT * FROM ANIMALS`)
 
     const allBiomes = biomes.rows.map( biome => {
         return  {id, bioma, tamanho, tamanho_total, animais_existentes};
     });
 
     res.send(allBiomes)
 
     } catch (err) {
         res.status(500).send(err.message);
     }
 
 }