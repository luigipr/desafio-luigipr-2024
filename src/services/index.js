import { dbAnimals, dbBiomes } from "../repositories/index.js"

export async function analizeBiome(animal, quantidade) {
    console.log('oi')
    const animais = await dbAnimals()
    const recintos = await dbBiomes()

    function findAnimal(especie) {  
      return animais.find(animal => animal.especie === especie);
      }


    function calculateRequiredSpace(recinto, animal, quantidade) {
        const existingSpace = recinto.animais_existentes.reduce((total, animal) => {
          console.log(animal, 'aqui')

          const animalData = findAnimal('MACACO');
          console.log(animalData)
          return total + (animalData ? animalData.tamanho_total * quantidade : 0);
        }, 0);

        console.log(existingSpace)
        console.log(recinto)
        const newSpace = animal.tamanho_total * quantidade;
        const extraSpace = recinto.animais_existentes.length > 0 ? 1 : 0;
        return existingSpace + newSpace + extraSpace;
    }


    function hasEnoughSpace(recinto, animal, quantidade) {
        console.log(animal, 'aqui2')
        const requiredSpace = calculateRequiredSpace(recinto, animal, quantidade);
        return requiredSpace <= recinto.tamanho_total;
      }

    function isBiomaSuitable(recinto, animal) {
        if (!animal.bioma.includes(recinto.bioma) || !(recinto.bioma.includes('savana') && recinto.bioma.includes('rio') && animal.especie === 'HIPOPOTAMO')) {
            return {
                erro: "Não há recinto viável"
            }
        }
      }
    //valida regra 2
    function canShareRecinto(recinto, animal) {
        if (animal.carnivoro) {
        return recinto.animaisExistentes.every(existingAnimal => existingAnimal.especie === animal.especie);
        }
          // valida regra 4
        if (animal.especie === 'HIPOPOTAMO') {
            return (recinto.bioma === 'savana' || recinto.bioma === 'rio') || recinto.animais_existentes.length === 0;
    }
  }

  function areExistingAnimalsComfortable(recinto, animal, quantidade) {
    //valida regra 5
    if (animal.especie === 'MACACO' && recinto.animais_existentes.length === 0 && quantidade === 1) {
      return false;
    }

    for (const recinto of recintos) {
      for (const existingAnimal of recinto.animais_existentes) {
        const actualAnimal = existingAnimal.toUpperCase();
        const actualAnimalData = findAnimal(actualAnimal);
    
        if (!actualAnimalData) continue;
        if (actualAnimalData.carnivoro && animal.especie !== actualAnimal) {
          return false;
        }
        
        return true;
      }
    }
    // valida regra 2
    // return !recinto.animais_existentes.some(existingAnimal => {
    //   const existingUpper = existingAnimal.toUpperCase();
    //   console.log(existingUpper, "logger");
    //   const existingAnimalData = findAnimal("MACACO");
    //   console.log(existingAnimal)
    //   console.log(recinto, "alou")
    //   return existingAnimalData.carnivoro && existingAnimalData.especie !== animal.especie;
    // });
  }

  function canAddAnimalToRecinto(recinto, newAnimal, quantidade) {
  
    console.log('passei aqui2', newAnimal)
    
    // Valida cada regra
    const biomaSuitable = isBiomaSuitable(recinto, newAnimal);
    const enoughSpace = hasEnoughSpace(recinto, newAnimal, quantidade);
    const canShare = canShareRecinto(recinto, newAnimal);
    const existingComfortable = areExistingAnimalsComfortable(recinto, newAnimal, quantidade);
  
    return biomaSuitable && enoughSpace && canShare && existingComfortable;


  }

  function processEntry(especie, quantidade) {
    // Validação de entrada
    const novoAnimal = findAnimal(especie);
    if (!novoAnimal) {
      return { erro: "Animal inválido" };
    }
    
    if (typeof quantidade !== 'number' || quantidade <= 0) {
      return { erro: "Quantidade inválida" };
    }
    console.log('passei aqui1')
    // Encontrar recintos viáveis
    const recintosViaveis = recintos.filter(recinto => canAddAnimalToRecinto(recinto, novoAnimal, quantidade));
    
  //erro aqui

    // Verificar se há recintos viáveis
    if (recintosViaveis.length === 0) {
      return { erro: "Não há recinto viável" };
    }
    
    console.log('passei aqui 3', novoAnimal)
    // Ordenar recintos viáveis pelo número do recinto
    recintosViaveis.sort((a, b) => a.numero - b.numero);
  
    // Formatar a saída conforme solicitado
    const listaRecintos = recintosViaveis.map(recinto => {
      const requiredSpace = calculateRequiredSpace(recinto, novoAnimal, quantidade);
      const espacoLivre = recinto.tamanhoTotal - requiredSpace;
      return `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanhoTotal})`;
    });
  
    return { recintosViaveis: listaRecintos };
  }
  

  processEntry(animal, quantidade)

}
