var templateLinha = `<div class="row **LINHA**">
                         <div class="col-6">**ALARME**</div>
                         <div class="col-6">**QUANTIDADE**</div>
                     </div>
                    `;

            


function gerarRelatorio() {
    var txtInicio = document.getElementById("txtDataInicio").value;
    var txtFim    = document.getElementById("txtDataFim").value;

    if(txtInicio == "" || txtFim == "") {
        //alert("Por favor informar 'início' e 'fim'");
        document.getElementById("erroPreenchimento").style.display = "block";
        document.getElementById("erroPreenchimento").className = "alert alert-danger";
        document.getElementById("erroPreenchimento").innerHTML = "Por favor informar <strong>início</strong> e <strong>fim</strong>";
        return false;
    }else {
        document.getElementById("erroPreenchimento").style.display = "none";
    }
    
    var data1 = new Date(txtInicio);
    var data2 = new Date(txtFim);

    if(data2 < data1) {
        document.getElementById("erroPreenchimento").style.display = "block";
        document.getElementById("erroPreenchimento").className = "alert alert-warning";
        document.getElementById("erroPreenchimento").innerHTML = "Data <strong>fim</strong> deve ser <strong>maior ou igual</strong> a data <strong>início</strong>";
        return false;
    }else {
        document.getElementById("erroPreenchimento").style.display = "none";
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

function logout(){
    localStorage.removeItem("EvtUser");
    window.location = "index.html";
}