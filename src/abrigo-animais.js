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
  
  //SETANDO BRINQUEDOS DAS PESSOAS
function setBrinquedoP1(brinquedo){
  let brinquedosPessoa1 = brinquedo.split(',');
  return brinquedosPessoa1;
}

function setBrinquedoP2(brinquedo){
  let brinquedosPessoa2 = brinquedo.split(',');
  return brinquedosPessoa2;
}


class AbrigoAnimais {
 

  /* MÉTODOS DE VALIDAÇÕES */
  
  validarAnimais(ordemAnimais){

    //VERIFICA SE EXISTE ANIMAIS DUPLICADOS NA LISTA
    const aDuplicados = arr => new Set(arr).size !== arr.length;
      if (aDuplicados(ordemAnimais)) {
        return false;
      }

    //MAPEIA O ARRAY animal, ASSOCIA a NA PROPRIEDADE NOME 
    // CRIANDO UM NOVO ARRAY COM NOME DOS ANIMAIS
    const nomesValidos = animal.map(a => a.nome);

    //REMOVE ANIMAIS REPETIDOS 
    const nomesUnicos = [...new Set(nomesValidos)];

    //ATUALIZA A VARIAVEL nomesValidos COM OS NOMES UNICOS
    nomesValidos.length = 0; //LIMPA O ARRAY
    nomesValidos.push(...nomesUnicos); //ADICIONA OS NOMES UNICOS

    //VALIDA SE OS NOMES EM ordemAnimais ESTÃO NO ARRAY DE NOMES DE ANIMAIS
    return ordemAnimais.every(nome => nomesValidos.includes(nome));
  }

  validarBrinquedos(brinquedosP1, brinquedosP2){

    const bDuplicados = arr => new Set(arr).size !== arr.length;
      if (bDuplicados(brinquedosP1) || bDuplicados(brinquedosP2)) {
    return false;
    }

    //MAPEIA O ARRAY animal, ASSOCIA b NA PROPRIEDADE BRINQUEDO
    //E COM flatMap CRIA UM NOVO ARRAY PARA GUARDAR TODOS OS BRINQUEDOS
    const brinquedosValidos = animal.flatMap(b => b.brinquedo);

    //CONCATENA OS BRINQUEDOS INFORMADOS POR P1 E P2
    const todosBrinquedos = [...brinquedosP1, ...brinquedosP2];

    //VALIDA SE OS BRINQUEDOS INFORMADOS POR P1 E P2 ESTÃO NA LISTA DE BRINQUEDOS
    return todosBrinquedos.every(brinquedo => brinquedosValidos.includes(brinquedo));
  }

  //COMPARA E VALIDA BRINQUEDOS DA PESSOA COM O ANIMAL
  verificaBrinquedosPessoa(brinquedosPessoa, brinquedosAnimal){
    let brinquedoFav = 0;
    let ciclos = 0;

    for(let b of brinquedosPessoa){
      if(b === brinquedosAnimal[brinquedoFav]){
        brinquedoFav++;
        if(brinquedoFav === brinquedosAnimal.length){
          ciclos++;
          return true;
        }
      }
    }
    return ciclos > 0;
  }

  //VALIDA A QUANTIDADE DE ADOCOES DE P1 E P2 - SE FOR MAIOR QUE 3, NÃO ADOTA
  validaQuantidadeAdocoes(p1Adocao, p2Adocao){
    if(p1Adocao > 3 || p2Adocao > 3){
      return {
        erro: 'Pessoa não pode adotar mais de 3 animais', 
        lista: null
      };
    }
    return null;
  }
  /*************************************/

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    //VARIAVEIS QUE RECEBEM OS BRINQUEDOS DAS PESSOAS
    const brinquedosP1 = setBrinquedoP1(brinquedosPessoa1);
    const brinquedosP2 = setBrinquedoP2(brinquedosPessoa2);

     //VARIAVEIS PARA CONTROLE DE ADOÇÃO
    let p1Adocao = 0;
    let p2Adocao = 0;

    //OBJETO QUE RECEBE RESULTADO (ERRO OU MENSAEGEM DE ADOÇÃO)
    let resultado = { erro: '', lista: [] }

    //VARIAVEL ORDEM RECEBE MAPEAMENTO DE PROPRIEDADE nome SEPARANDO ITENS NO FORMATO ('STRING,STRING')
    //E USANDO DO TRIM PARA PULAR OS ESPAÇOS DA STRING
    const ordem = ordemAnimais.split(',').map(nome => nome.trim());
    ordem.sort(); //ORDENA VARIAVEL ordem EM ORDEM ALFABETICA

    //OBJETO PARA CHECAR ADOÇÃO 
    const checaAdocao = () => {
      const valida = this.validaQuantidadeAdocoes(p1Adocao, p2Adocao);
      
      if(p1Adocao.length > 3 || p2Adocao.length > 3){
        return  {
          erro: 'Pessoa não pode adotar mais de 3 animais',
          lista: null
        };
      }

      if(valida) return valida;
      return null;
    }
    
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

    //EXECUTA ADOÇAO DE ANIMAIS POR PESSOA 1 E PESSOA 2
    for(let i = 0; i < ordem.length; i++){
      const animalAtual = animal.find(a => a.nome === ordem[i]);
      let brinquedosAnimal = [];
      
      //SE ANIMAL INFORMADO NÃO ESTIVER NO ARRAY DE ANIMAIS, RETORNA ERRO.
      if(!animalAtual){
         resultado.lista[i] = `${ordem[i]} - animal não encontrado`;
         continue;
      }

      //VERIFICA SE O ANIMAL É UM JABUTI E SE HÁ OUTROS ANIMAIS NA LISTA
      if(animalAtual.tipo === "jabuti" && ordem.length < 2){ 
        return {
          erro: 'Jabuti precisa de mais um animal para adoção',
          lista: null
        }
      }

      //VERIFICA SE O ANIMAL É UM GATO PARA NÃO DIVIDIR BRINQUEDOS
      if(animalAtual.tipo === "gato"){ 
        const p1Gatos = this.verificaBrinquedosPessoa(brinquedosP1, animalAtual.brinquedo);
        const p2Gatos = this.verificaBrinquedosPessoa(brinquedosP2, animalAtual.brinquedo);
        
          if ((p1Gatos) && (p2Gatos)){
            resultado.lista[i] = `${animalAtual.nome} - abrigo`;
          }else if (p1Gatos && !p2Gatos){
            p1Adocao++;
            const erro = checaAdocao(p1Adocao, p2Adocao);
            if(erro) return erro;
            
            resultado.lista[i] = `${animalAtual.nome} - pessoa 1`;

          } else if (!p1Gatos && p2Gatos){
            p2Adocao++;
            const erro = checaAdocao(p1Adocao, p2Adocao);
            if(erro) return erro;

            resultado.lista[i] = `${animalAtual.nome} - pessoa 2`;

          } else {

            resultado.lista[i] = `${animalAtual.nome} - abrigo`;
          
          }
        continue;
      }
    
      //ATRIBUI OS BRINQUEDOS DO ANIMAL A VARIAVEL brinquedosAnimal
      brinquedosAnimal = animalAtual.brinquedo;
      
      //FAZ A VALIDAÇAO E VERIFICAÇÃO SE P1 E P2 TEM OS BRINQUEDOS DOS ANIMAIS, SE TEM MAIS DE 3 ADOCOES OU NÃO E DEFINE ADOÇAO OU ABRIGO
      if(this.verificaBrinquedosPessoa(brinquedosP1, brinquedosAnimal) && this.verificaBrinquedosPessoa(brinquedosP2, brinquedosAnimal)){
          resultado.lista[i] = `${animalAtual.nome} - abrigo`;
      } else if(this.verificaBrinquedosPessoa(brinquedosP1, brinquedosAnimal)){
        
          p1Adocao++;
          const erro = checaAdocao(p1Adocao, p2Adocao);
          if(erro) return erro;
          
          resultado.lista[i] = `${animalAtual.nome} - pessoa 1`;
      } else if(this.verificaBrinquedosPessoa(brinquedosP2, brinquedosAnimal)){

          p2Adocao++;
          const erro = checaAdocao(p1Adocao, p2Adocao);
          if(erro) return erro;

          resultado.lista[i] = `${animalAtual.nome} - pessoa 2`;
      } else {
          resultado.lista[i] = `${animalAtual.nome} - abrigo`;
      }
    } 

    return resultado;
    }
  }  
/***************************************/

export { AbrigoAnimais as AbrigoAnimais };