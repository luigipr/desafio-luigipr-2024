import { analizeBiome } from "./services/index.js";

class RecintosZoo {
    
    constructor (animal, quantidade) {
        this.animal = animal;
        this.quantidade = quantidade
    }


    async analisaRecintos() {
        const result = await analizeBiome(this.animal, this.quantidade)

        return result
    }

    findAnimal(especie) {
        return animais.find(animal => animal.especie === especie);
      }

}

export { RecintosZoo as RecintosZoo };
