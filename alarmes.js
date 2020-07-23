var templateLinha = `<div class="row **LINHA**">
                         <div class="col-6">**ALARME**</div>
                         <div class="col-6">**QUANTIDADE**</div>
                     </div>
                    `;

            


function gerarRelatorio(){
    var txtInicio = document.getElementById("txtDataInicio").value;
    var txtFim    = document.getElementById("txtDataFim").value;

    if(txtInicio == "" || txtFim == "") {
        alert("Por favor informar 'início' e 'fim'");
        return false;
    }
    
    var data1 = new Date(txtInicio);
    var data2 = new Date(txtFim);

    if(data2 < data1) {
        alert("Data 'fim' deve ser maior ou igual a data 'início'");
        return false;
    }

    //console.log("Inicio = "+txtInicio+" / Fim = "+txtFim);

    var msgBody = {
        inicio : txtInicio,
        fim    : txtFim
    };
    var cabecalho = {
        method  : 'POST',
        body    : JSON.stringify(msgBody),
        headers : {
            'Content-type': 'application/json'
        }
    };

    fetch("http://localhost:8088/alarmes/periodo",cabecalho)
       .then(res => res.json())
       .then(res => preencheTabela(res));
}

function preencheTabela(res){
    var tabela = "";

    for (i=0; i<res.length; i++){
        var evento = res[i];
        var estiloLinha;
        if (i % 2 == 0){
            estiloLinha = "linhaPar";
        }
        else{
            estiloLinha = "linhaImpar";
        }

        var strLinha = templateLinha.replace("**ALARME**", evento.nomeAlarme)//.alarme.nome)
                                    .replace("**QUANTIDADE**",evento.qtde)
                                    //.replace("**HOST**", evento.equipamento.hostname)
                                    //.replace("**LINHA**", estiloLinha)
                                    //.replace("**IP**", evento.equipamento.endIp);
        tabela = tabela + strLinha;
    }
    document.getElementById("relatorio").innerHTML = tabela;



}