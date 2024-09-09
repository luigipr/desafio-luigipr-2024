
export async function(animal, quantidade) {

    animais = repositories
    recintos = repositories

    if(!animais.contains(animal)) {
        return {
            erro: "Animal inválido"
          }
    }

    if (animal === "MACACO" && quantidade == 1) {
        return {
            erro: "Esse animal não pode ficar só"
          }    
        }

    

}
