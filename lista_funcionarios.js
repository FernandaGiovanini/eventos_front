//<strong>DEPARTAMENTO:</strong> <span id="idDoDepartamento" class="linkjs" onclick=listaFuncionariosDepartamento(this.value);>**DEPTO**</span> <br>

var ligaDesliga = false;

var templateFuncionarios = `<div class="row">
                                 <div class="col-2">**FUNCIONARIO**</div>
                                 <div class="col-4">**EMAILFUNCIONARIO**</div>
                            </div>
                            `;
var templateFoto = `<img src="**FOTO**" width="100%">`;
var templateInfo = `<strong>Nome:</strong> **NOME** <br>
                    <strong>RACF:</strong> **RACF** <br>
                    <strong>EMAIL:</strong> **EMAIL** <br>
                    <strong>DEPARTAMENTO:</strong> <a href="lista_funcionarios.html" target="_blank" id="idDoDepartamento" onclick="window.open(this.href, this.target, 'width=754,height=478'); return false" class="linkjs">**DEPTO**</a> <br>
                    <strong>UNIDADE:</strong> **UNIDADE**
                   `;

//<strong>DEPARTAMENTO:</strong> <a href="departamento.html?id=**ID**">**DEPTO**</a> <br></br>                   

function preencheInfo(){

    // qual a lógica da página?
    /* ao ser carregada, ela vai chamar esta função (a gente vê isso no evento onLoad)
       Uma vez carregada, eu vou verificar se o usuário está com informações armazenadas no 
       localStorage
       Se estiver, sinal que ele está conectado e vou preencher as informações da página
          com o perfil dele
       Se não estiver, redireciona para a página de login para evitar quaisquer violações
       */
    var user = localStorage.getItem("EvtUser");
    if (!user){
        window.location = "index.html";
    }
    else{
        var objUser = JSON.parse(user);  // aqui vou converter a STRING armazenada para um objeto
        var strFoto = templateFoto.replace("**FOTO**", objUser.linkFoto);
        //document.getElementById("fotoUser").innerHTML = strFoto;

        var strInfo = templateInfo.replace("**NOME**", objUser.nome)
                                  .replace("**RACF**", objUser.racf)
                                  .replace("**EMAIL**", objUser.email)
                                  .replace("**DEPTO**", objUser.depto.nome)
                                  .replace("**UNIDADE**", objUser.depto.unidade)
                                  .replace("**ID**",objUser.depto.id);
        document.getElementById("infoUser").innerHTML = strInfo;
        document.getElementById("idDoDepartamento").value = objUser.depto.id;

        listaFuncionariosDepartamento(objUser.depto.id);
    }
}

function listaFuncionariosDepartamento(valor) {
    
    fetch("http://localhost:8088/departamentos/"+valor)
        .then(res => res.json())
        .then(res => analisaFuncionariosMesmoDepartamento(res));
}

function analisaFuncionariosMesmoDepartamento(obj) {

    lista = [];

    document.getElementById("tituloDepartamento").innerHTML = "<h3>Pessoas do departamento " + obj.nome + "</h3>";

    for(a = 0; a < obj.listaUsuarios.length; a++) {
    var evento = obj.listaUsuarios[a];
    //alert(evento.nome);
    //lista += evento.nome + "<br>";
        document.getElementById("espaco").innerHTML += "<strong>Nome:</strong> " + evento.nome + "<br>";
        document.getElementById("espaco").innerHTML += "<strong>Email:</strong> " + "<a href='mailto:" +evento.email +"'>"+evento.email+"<br>";
        document.getElementById("espaco").innerHTML += "<strong>Racf:</strong> " + evento.racf + "<br>";
        document.getElementById("espaco").innerHTML += "<hr>";
    }

    
        /*document.getElementById("velho").style.display = "block";
        document.getElementById("velho").className = "alert alert-success";
        document.getElementById("velho").innerHTML = "Pessoas nesse departamento:" + "<br><br>";
        document.getElementById("velho").innerHTML += lista;*/
}
