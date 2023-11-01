function limpa_formulario_cep() {
    //limpa valores do formulário
    document.getElementById('cep').value="";
    document.getElementById('rua').value="";
    document.getElementById('bairro').value="";
    document.getElementById('cidade').value="";
    document.getElementById('uf').value="";
    document.getElementById('ibge').value="";
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //atualiza os campos com o resultado
        document.getElementById('rua').value=(conteudo.logradouro);
        document.getElementById('bairro').value=(conteudo.bairro);
        document.getElementById('cidade').value=(conteudo.localidade);
        document.getElementById('uf').value=(conteudo.uf);
        document.getElementById('ibge').value=(conteudo.ibge);
    } 
    else {
        //cep não encontrado
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {
    //nova variável "cep" somente com dígitos
    var cep = valor.replace(/\D/g, '');

    //verifica se campo cep possui valor informado
    if (cep != "") {

        //expressão regular para validar o cep
        var validacep = /^[0-9]{8}$/;

        //valida o formato do cep
        if(validacep.test(cep)) {

            //preenche os campos com "..." enquanto consulta webservice
            document.getElementById('rua').value="...";
            document.getElementById('bairro').value="...";
            document.getElementById('cidade').value="...";
            document.getElementById('uf').value="...";
            document.getElementById('ibge').value="...";

            //cria um elemento javascript
            var script = document.createElement('script');

            //sincroniza com o callback
            script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

            //verifica se o script já existe
            var existingScript = document.getElementById('jsonScript');
            if(existingScript) {
                document.body.removeChild(existingScript);
            }

            script.id = 'jsonScript';

            //insere script no documento e carrega o conteúdo
            document.body.appendChild(script);

        } 
        else {
            //cep é inválido
            limpa_formulario_cep();
            alert("Formato de CEP inválido.");
        }
    } 
    else {
        //cep sem valor, limpa formulário
        limpa_formulario_cep();
    }
};

//link para minhas redes
function redirectToUrl(url) {
    window.open(url, '_blank');
}