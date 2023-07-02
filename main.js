async function getEstados(){
    const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome");
    const jsonData = await response.json();
    return jsonData.map( (object) => object);
}

getEstados().then( (ufs) =>{ 
    const selectBox = document.getElementById('selectBox');
    for(i in ufs){
        const option = document.createElement("option");
        option.innerHTML = ufs[i].nome;
        option.value = ufs[i].sigla;
        selectBox.appendChild(option);
    }
});

function func(){

    async function getMunicipios(){
        const selected = (document.getElementById('selectBox')).value;
        const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados/" + selected + "/municipios?orderBy=nome";
        const response = await fetch(url);
        const jsonMuni = await response.json();
        return jsonMuni.map( (municipios) => municipios.nome);
    }

    getMunicipios().then( (jsonMuni) => {
        const municipios = document.getElementById('municipios');
        qutMunicipiosChild = municipios.childElementCount;
        for(let i = 0 ; i < qutMunicipiosChild; i++){
            let options = document.getElementById("mu");
            options.remove();
        }

        for(i in jsonMuni){
            const p = document.createElement('p');
            p.innerHTML = jsonMuni[i];
            p.id = "mu";
            municipios.appendChild(p);
        }
    });
}