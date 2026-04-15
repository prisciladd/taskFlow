export function calcularVolumeDeconstiasCaixas(caixas) {
    let volume=0;
    

    for(let i = 0 ; i < caixas.lenght; i++ ){
       volume = caixas[i].reduce(
            (accumulator , currentValue) => accumulator + currentValue 
                );
        
    }

    return volume
}
