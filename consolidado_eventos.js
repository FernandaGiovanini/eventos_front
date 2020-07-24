//var templateLinha = `<div class="row **LINHA**">
var templateLinha = `<tr>
                         <td class="col-6">**ALARME**</td>
                         <td class="col-6">**QUANTIDADE**</td>
                     </tr>
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

function downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV file
    csvFile = new Blob([csv], {type: "text/csv"});

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
}

function exportTableToCSV(filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");
    
    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");
        
        for (var j = 0; j < cols.length; j++) 
            row.push(cols[j].innerText);
        
        csv.push(row.join(","));        
    }

    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
}

function impressaoPDF(){
    var conteudo = document.getElementById('print').innerHTML;
    tela_impressao = window.open('about:blank');
    tela_impressao.document.write(conteudo);
    tela_impressao.window.print();
    tela_impressao.window.close();
 }
