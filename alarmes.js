var templateLinha = `<tr>
                         <td>**ALARME**</td>
                         <td>**QUANTIDADE**</td>
                     </tr>
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
    var soma = 0;

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

        soma += evento.qtde;
    }
    document.getElementById("relatorio").innerHTML = tabela;
    document.getElementById("numeroRegistros").className = "alert alert-success";
    document.getElementById("numeroRegistros").innerHTML = soma + " Alarme(s)";




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