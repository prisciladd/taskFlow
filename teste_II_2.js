import { log } from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

export function posicaoNaArvoreGenealogica(entrada) {    
    let resultado = "";
    
    const tabela=[
        {
        geracao: "-3",
        masculino: "bisavô",
        feminino: "bisavó"
        },
        {
        geracao: "1",
        masculino: "filho",
        feminino: "filha"
        },
    ]

    for(let i in tabela){
        const geracao = entrada.split(",")
        console.log(geracao)
        if (geracao == i.geracao){
            resultado = i.feminino
        }
    }

    return resultado;
}