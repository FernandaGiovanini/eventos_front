var templateFuncionarios = `<div class="row">
                                 <div class="col-2">**FUNCIONARIO**</div>
                                 <div class="col-4">**EMAILFUNCIONARIO**</div>
                            </div>
                            `;
var templateFoto = `<img src="**FOTO**" width="100%">`;
var templateInfo = `<strong>Nome:</strong> **NOME** <br>
                    <strong>RACF:</strong> **RACF** <br>
                    <strong>EMAIL:</strong> **EMAIL** <br>
                    <strong>DEPARTAMENTO:</strong> <span class="linkjs" onclick=preencheFuncionarios();>**DEPTO**</span> <br>
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
        document.getElementById("fotoUser").innerHTML = strFoto;

        var strInfo = templateInfo.replace("**NOME**", objUser.nome)
                                  .replace("**RACF**", objUser.racf)
                                  .replace("**EMAIL**", objUser.email)
                                  .replace("**DEPTO**", objUser.depto.nome)
                                  .replace("**UNIDADE**", objUser.depto.unidade)
                                  .replace("**ID**",objUser.depto.id);
        document.getElementById("infoUser").innerHTML = strInfo;

        mostraDepartamento(objUser.depto.id);
    }
}

function logout(){
    localStorage.removeItem("EvtUser");
    window.location = "index.html";
}