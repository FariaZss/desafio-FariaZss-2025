import { Animais } from './Animais.js';


//DECLARANDO LISTA DE ANIMAIS COMO OBJETO, SEUS TIPOS E BRINQUEDOS
let animal = new Animais();

animal = [
  { nome: "Rex", tipo: "cão", brinquedo: ["RATO", "BOLA"]}, 
  { nome: "Mimi", tipo: "gato", brinquedo: ["BOLA", "LASER"]},
  { nome: "Fofo", tipo: "gato", brinquedo: ["BOLA", "RATO", "LASER"]},
  { nome: "Zero", tipo: "gato", brinquedo: ["RATO", "BOLA"]},
  { nome: "Bola", tipo: "cão", brinquedo: ["CAIXA", "NOVELO"]},
  { nome: "Bebe", tipo: "cão", brinquedo: ["LASER", "RATO", "BOLA"]},
  { nome: "Loco", tipo: "jabuti", brinquedo: ["SKATE", "RATO"]}
];
  
/***************************************/

  //SETANDO BRINQUEDOS DAS PESSOAS
function setBrinquedoP1(brinquedo){
  let brinquedosPessoa1 = brinquedo.split(',');
  return brinquedosPessoa1;
}

function setBrinquedoP2(brinquedo){
  let brinquedosPessoa2 = brinquedo.split(',');
  return brinquedosPessoa2;
}
/***************************************/

class AbrigoAnimais {

  /* MÉTODOS DE VALIDAÇÕES */

  validarAnimais(ordemAnimais){
    //MAPEIA O ARRAY animal, ASSOCIA a NA PROPRIEDADE NOME 
    // CRIANDO UM NOVO ARRAY COM NOME DOS ANIMAIS
    const nomesValidos = animal.map(a => a.nome);
    //VALIDA SE OS NOMES EM ordemAnimais ESTÃO NO ARRAY DE NOMES DE ANIMAIS
    return ordemAnimais.every(nome => nomesValidos.includes(nome));
  }

  validarBrinquedos(brinquedosP1, brinquedosP2){
    //MAPEIA O ARRAY animal, ASSOCIA b NA PROPRIEDADE BRINQUEDO
    //E COM flatMap CRIA UM NOVO ARRAY PARA GUARDAR TODOS OS BRINQUEDOS
    const brinquedosValidos = animal.flatMap(b => b.brinquedo);

    //CONCATENA OS BRINQUEDOS INFORMADOS POR P1 E P2
    const todosBrinquedos = [...brinquedosP1, ...brinquedosP2];

    //VALIDA SE OS BRINQUEDOS INFORMADOS POR P1 E P2 ESTÃO NA LISTA DE BRINQUEDOS
    return todosBrinquedos.every(brinquedo => brinquedosValidos.includes(brinquedo));
  }

  verificaBrinquedosPessoa(brinquedosPessoa, brinquedosAnimal){
    return brinquedosAnimal.every(b => brinquedosPessoa.includes(b));
  }

  /*************************************/

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    //DECLARA VARIAVEIS
    const brinquedosP1 = setBrinquedoP1(brinquedosPessoa1);
    const brinquedosP2 = setBrinquedoP2(brinquedosPessoa2);
    let resultado = { erro: '', lista: [] }

    const ordem = ordemAnimais.split(',').map(nome => nome.trim());
    ordem.sort();
    
    /*RESTRIÇÃO SE FOR INFORMADO UM ANIMAL QUE NÃO ESTA CONTIDO NA LISTA*/
    if(!this.validarAnimais(ordem)){
      resultado.erro = 'Animal inválido';
      resultado.lista = null;
      return resultado;
    }

    /*RESTRIÇÃO SE FOR INFORMADO UM BRINQUEDO QUE NÃO ESTA CONTIDO NA LISTA*/
    if(!this.validarBrinquedos(brinquedosP1, brinquedosP2)){
      resultado.erro = 'Brinquedo inválido';
      resultado.lista = null;
      return resultado;
    }

    for(let i = 0; i < ordem.length; i++){
      const animalAtual = animal.find(a => a.nome === ordem[i]);
      let brinquedosAnimal = [];
      
      if(!animalAtual){
         resultado.lista[i] = `${ordem[i]} - animal não encontrado`;
         continue;
      }

      brinquedosAnimal = animalAtual.brinquedo;

      if(this.verificaBrinquedosPessoa(brinquedosP1, brinquedosAnimal)){
        resultado.lista[i] = `${animalAtual.nome} - pessoa 1`;
      } else if(this.verificaBrinquedosPessoa(brinquedosP2, brinquedosAnimal)){
        resultado.lista[i] = `${animalAtual.nome} - pessoa 2`;
      } else {
        resultado.lista[i] = `${animalAtual.nome} - abrigo`;
      }
    }


    /* CONTINUAÇAO - 
    
    NECESSARIO IMPLEMENTAR FUNCIONALIDADE 
      ALTERNAR BRINQUEDOS
    
    NECESSÁRIO IMPLEMENTAR RESTRIÇAO DE GATOS
      RESTRIÇAO DO LOCO - JABUTI

    NECESSARIO IMPLEMENTAR VALIDAÇAO
      QUANTIDADE ADOTADOS POR PESSOA - SE MAIOR QUE 3, NÃO ADOTA
      SE AMBAS TIVEREM CONDIÇAO - NÃO ADOTA
    
    */

    return resultado;
  }
  /***************************************/
  
}  

export { AbrigoAnimais as AbrigoAnimais };