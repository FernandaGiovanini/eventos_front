var templateLinha = `<div class="row **LINHA**">
                         <div class="col-6">**ALARME**</div>
                         <div class="col-6">**QUANTIDADE**</div>
                     </div>
                    `;

            


function gerarRelatorio(){
    //var txtInicio = document.getElementById("txtDataInicio").value;
    //var txtFim    = document.getElementById("txtDataFim").value;

    //console.log("Inicio = "+txtInicio+" / Fim = "+txtFim);

    //var msgBody = {
    //    inicio : txtInicio,
    //    fim    : txtFim
    //};
    var cabecalho = {
        method  : 'GET',
        //body    : JSON.stringify(msgBody),
        headers : {
            'Content-type': 'application/json'
        }
    };

    fetch("http://localhost:8088/eventos/alarmes/resumo",cabecalho)
       .then(res => res.json())
       .then(res => preencheTabela(res));
}

function preencheTabela(res){
    var tabela = "";
    var valores = [];
    var labels = [];

    for (i=0; i<res.length; i++){
        var evento = res[i];
        var estiloLinha;
        if (i % 2 == 0){
            estiloLinha = "linhaPar";
        }
        else{
            estiloLinha = "linhaImpar";
        }

        var strLinha = templateLinha.replace("**ALARME**", evento.nomeAlarme)
                                    .replace("**QUANTIDADE**", evento.qtde)
                                    //replace("**DATA**",evento.data)
                                    //.replace("**LINHA**", estiloLinha)
                                    //.replace("**IP**", evento.equipamento.endIp);
        tabela = tabela + strLinha;

        valores[i] = evento.qtde;
        labels[i] = evento.nomeAlarme;
    }
    document.getElementById("relatorio").innerHTML = tabela;
    document.getElementById("numerosGrafico").innerHTML = valores;
    document.getElementById("labelsGrafico").innerHTML = labels;




}

function logout(){
    localStorage.removeItem("EvtUser");
    window.location = "index.html";
}