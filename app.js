const form = document.querySelector(".form-inscricao");

const grupoUm = document.querySelector(".grupo-1");
const nome = document.querySelector("#nome");
const email= document.querySelector(".email");
const tipo_telefone = document.querySelector(".option");
const container_tipos = document.querySelector(".options");
const flags = container_tipos.querySelectorAll("li");
const numero = document.querySelector(".phone_input");
const tipo = document.querySelector("#tipo");
const estado = document.querySelector("#estado");

const grupoDois = document.querySelector(".grupo-2");
const empresa = document.querySelector(".empresa");
const motivoTeste = document.getElementById("motivo");
const inputOutro = document.querySelector(".opcao_outro"); 
const camposDinamicos = document.querySelector(".campos-dinamicos");

const camposSenhas = document.querySelector(".campos-dinamicos-senha");
const senha = document.querySelector('[name="senha"]');
const senhaConfirmacao = document.querySelector('[name="senha_confirmation"]');


const botaoVoltar = document.querySelector(".form-button-voltar");
const botaoEnviar = document.querySelector(".form-button-send");
const botaoAvancar = document.querySelector(".botao-avancar");

const barraLoading1 = document.querySelector(".etapa-1");
const barraLoading2 = document.querySelector(".etapa-2");

const slides = document.querySelector(".slides");

const valores = {"ddi": "National"};

let nomeValidado = 0;
let numeroValidado = 0;
let emailValidado = 0;
let formPreenchido = 0;

let initialValue = 0;
const frame = 1;

isOpen = 0;

const options = {
    method: 'POST',
    headers: {accept: 'application/json', 'Content-Type': 'application/json'},
};

const body ={
    event_type: 'CONVERSION',
    event_family: 'CDP',
    payload: {
        conversion_identifier: 'Teste',
        legal_bases: [{category: 'communications', type: 'consent', status: 'granted'}],
        traffic_source: 'ig-dm',
        traffic_medium: 'ppc',
        traffic_campaign: 'workshop-maio',        
        cf_utm_source: 'ig-dm',
        cf_utm_medium: 'ppc',
        cf_utm_campaign	:'workshop-maio',
        cf_custom_field_name: 'cf_utm_source, cf_utm_medium, cf_utm_campaign',

    }
}



class ElementHTML{
    constructor(el, required){
        this.el = this.construirElemento(el);
        this.definirCampoObrigatorio(required);
        this.adicionarEvento(this.el)
    }

    construirElemento(el){
        return document.createElement(el);
    }

    definirCampoObrigatorio(required){
        this.el.setAttribute("required", required);
    }

   adicionarEvento(element){
        element.addEventListener("change", (e)=>{
            if(e.target.value != ""){
                e.target.dataset.preenchido = "true";
            }
            else{
                e.target.dataset.preenchido = "false"
            }
        })
    }
}


class InputObject extends ElementHTML{
    
    constructor(){
        super(arguments[0], true);
        this.name = arguments[1];
        this.el.placeholder = arguments[2];
    }
}


class SelectObject extends ElementHTML{

    value = "";

    constructor(){
        super(arguments[0], true);
        this.firstOption = arguments[1];
        this.name = arguments[2];
        this.size = arguments[3];
        this.listaDeOpcoes = Array.from(arguments).slice(4);
    }


    construirSelect(){
        this.el.innerHTML = `<option value=${this.value}>${this.firstOption}</option>`;
        this.el.setAttribute("name", this.name);
        this.el.setAttribute("value", this.value);
        this.el.style.width = this.size;

        this.div = this.construirElemento("div");
        this.div.classList.add("combo");
        this.div.classList.add("combo-select");

        for (const opcao in this.listaDeOpcoes){
            this.option = this.construirElemento("option");
            this.option.setAttribute("value", this.listaDeOpcoes[opcao]);
  
            this.option.innerHTML = this.listaDeOpcoes[opcao];
            this.el.appendChild(this.option);
        }
        this.div.appendChild(this.el);
    }
}


function animateCarrousel(){


    initialValue -= frame;

    if(initialValue <= -1398){
        initialValue = 0;
    }
    slides.style.transform = `translateX(${initialValue}px)`;
    requestAnimationFrame(animateCarrousel);
}

function limparElemento(el){
    el.innerHTML = "";
}

function validarString(string, regex){
    if(regex.test(string)){
        return true;
    }
    return false;
}

function construirCamposFormulario(elementoPai, elementoFilho){
    if(elementoFilho.el.localName == "select"){
        elementoFilho.construirSelect();
        elementoPai.appendChild(elementoFilho.div);
    }
    else{
        elementoPai.appendChild(elementoFilho.el );
    }
    return elementoFilho.el
}



nome.addEventListener("input", (e)=>{
    if(validarString(e.target.value, /^([A-ZÁÉÍÓÚÂÊÔÃÕÇ][a-záéíóúâêôãõç]+)(\s(de|da|do|dos|das|[A-ZÁÉÍÓÚÂÊÔÃÕÇ][a-záéíóúâêôãõç]+))*$/)){
        e.target.style.border = "1px solid green";
        e.target.nextElementSibling.style.color= "green";
        e.target.nextElementSibling.style.borderColor= "green";
        nomeValidado = 1;
    }
    else{
        e.target.style.border = "1px solid red";
        nomeValidado = 0;
    }
});

numero.addEventListener("input", (e)=>{
    if(validarString(e.target.value, /^\(?\d{2}\)?\s?(9?\d{4})-?\d{4}$/)){
        e.target.style.border = "1px solid green";
        e.target.nextElementSibling.style.color= "green";
        e.target.nextElementSibling.style.borderColor= "green";
        numeroValidado = 1;
    }
    else{
        e.target.style.border = "1px solid red";
        numeroValidado = 0;
    }

});

email.addEventListener("input", (e)=>{
    if(validarString(e.target.value, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/) && !validarString(email.value, /^[^\s]+@orcafascio\.com$/)){
        e.target.style.border = "1px solid green";
        emailValidado = 1;
    }
    else{
        e.target.style.border = "1px solid red";
        emailValidado = 0;
    }
});

tipo_telefone.addEventListener("click", (e) =>{

    if(!isOpen && (e.currentTarget == e.target || e.currentTarget == e.target.parentElement)){
        console.log(e.target)
        isOpen = 1;
        container_tipos.style.display = "block";
        tipo_telefone.style.backgroundColor = "white";
        tipo_telefone.style.border = "1px solid var(--input-flag-color)";
       
    }
    else{
        container_tipos.style.display = "none";
        isOpen = 0;
        tipo_telefone.style.backgroundColor = "var(--input-flag-color)";
        tipo_telefone.style.border = "none";
    }   
});


flags.forEach(item =>{
    item.addEventListener("click", ()=>{
        let auxLink = tipo_telefone.firstElementChild.src;
        let auxData = tipo_telefone.firstElementChild.dataset.id;
        let auxValue = tipo_telefone.firstElementChild.dataset.value 

        tipo_telefone.firstElementChild.src = item.firstElementChild.src;
        tipo_telefone.firstElementChild.dataset.id = item.firstElementChild.dataset.id;
        tipo_telefone.firstElementChild.dataset.value = item.firstElementChild.dataset.value;

        item.firstElementChild.src = auxLink;
        item.firstElementChild.dataset.id = auxData;
        item.firstElementChild.dataset.value = auxValue;

        valores.ddi = tipo_telefone.firstElementChild.dataset.value;
        console.log(valores)

    })
});

document.addEventListener("click", (event) => {
    if(event.target != container_tipos && event.target != tipo_telefone && event.target != tipo_telefone.firstElementChild && event.target != tipo_telefone.lastElementChild && isOpen){
        container_tipos.style.display = "none";
        isOpen = 0;
        tipo_telefone.style.backgroundColor = "var(--input-flag-color)";
        tipo_telefone.style.border = "none";
    }
});

grupoUm.addEventListener("change", ()=>{
    if(nomeValidado && numeroValidado && emailValidado){
        if(nome.value != "" && numero.value !="" && email.value != "" && tipo.value!= ""){
            barraLoading1.style.backgroundColor = "#16b743";
            grupoDois.style.display="flex";
            setTimeout(() => {empresa.scrollIntoView({behavior: "smooth"})});
        }
        else{
            grupoDois.style.display="none";
            barraLoading1.style.backgroundColor = "transparent";
    }
    }
    else{
        grupoDois.style.display="none";
        barraLoading1.style.backgroundColor = "transparent";
    }
})

motivoTeste.addEventListener("change", (e)=>{
    if(e.target.value == "Outro"){
        inputOutro.style.display = "block";
        inputOutro.setAttribute("required", true);

    }
    else{
        inputOutro.style.display = "none"
    }

    if(e.target.value !=""){
        motivoTeste.dataset.preenchido = "true"
    }
    else{
        motivoTeste.dataset.preenchido = "false"
    }
});

tipo.addEventListener("change", function(e){

    limparElemento(camposDinamicos);
    switch (e.target.value){
        case "Profissional Liberal":
            construirCamposFormulario(camposDinamicos, new SelectObject("select", "Informe se trabalha com licitações", "trabalha_com_licitacoes", "100%", "Sim", "Nao"));
            construirCamposFormulario(camposDinamicos, new SelectObject("select", "Informe se elabora Projetos", "elabora_projetos", "100%", "Sim", "Nao"));
            construirCamposFormulario(camposDinamicos, new SelectObject("select", "Como você gostaria de ser Contatado", "contactar_atraves", "100%", "Telefone", "WhatsApp", "E-mail"));
            break;
        case "Órgão Público":
            construirCamposFormulario(camposDinamicos, new SelectObject("select", "Informe seu Cargo na empresa", "cargo", "100%", "Socio/CEO/Proprietário", "Diretor/Gerente", "Supervisor/Coordenador", "Analista", "Estagiario"));
            construirCamposFormulario(camposDinamicos, new SelectObject("select", "Informe a esfera de atuação do Orgao", "esfera", "100%", "Federal", "Municipal", "Estadual", "Autarquia", "Estatal"));
            construirCamposFormulario(camposDinamicos, new SelectObject("select", "Como você gostaria de ser Contatado", "contactar_atraves", "100%", "Telefone", "WhatsApp", "E-mail"));
            break;
        case "Empresa":
            construirCamposFormulario(camposDinamicos, new SelectObject("select", "Informe seu segmento de atuação", "atuacao", "100%","Construtora", "Incorporadora", "Escritório de Arquitetura", "Escritório de Projetos"));
            construirCamposFormulario(camposDinamicos, new SelectObject("select", "Informe seu Cargo na empresa", "cargo", "100%","Socio/CEO/Proprietário", "Diretor/Gerente", "Supervisor/Coordenador", "Analista", "Estagiario"));
            construirCamposFormulario(camposDinamicos,new SelectObject("select","Informe sua profissão", "Engenheiro Civil", "100%","Engenheiro Eletricista", "Engenheiro Orçamentista", "Hidráulico", "Engenheiro Estrutural", "Técnico em Edificações","Arquiteto", "Arquiteto Orçamentista", "Financeiro ou Administrativo", "Profissional de TI"));
            construirCamposFormulario(camposDinamicos, new SelectObject("select", "Como você gostaria de ser Contatado", "contactar_atraves", "100%","Telefone", "WhatsApp", "E-mail"));
            break;
        case "Estudante":
            construirCamposFormulario(camposDinamicos, new InputObject("input", "nome_do_curso", "Informe o nome do seu curso"));
            construirCamposFormulario(camposDinamicos, new InputObject("input", "nome_do_da_instituicao", "Informe o nome da instituição de ensino"));
            break;
        }
})


empresa.addEventListener("change", (e)=>{
    if(e.target.value != ""){
        empresa.dataset.preenchido = "true"
    }
    else{
        empresa.dataset.preenchido = "false"
    }
})

grupoDois.addEventListener("change", (e)=>{
    const inputs = document.querySelectorAll("div.grupo-2 input");
    const selects = document.querySelectorAll(".grupo-2 select");

    let inputsActive = Array.from(inputs).every(input => input.dataset.preenchido == "true"? 1: 0);
    let selectAtive = Array.from(selects).every(select => select.dataset.preenchido == "true"? 1: 0);

    
    
    
    if(inputsActive && selectAtive && !formPreenchido){   
        barraLoading2.style.backgroundColor = "#16b743";
        grupoUm.style.visibility ="hidden";
        grupoUm.style.oppacity = 0;
        grupoDois.style.visibility ="hidden";
        grupoDois.style.oppacity = 0;
        camposSenhas.classList.add("container-visible");
        setTimeout(() => {senha.scrollIntoView({})});
        formPreenchido = 1;
    }

})

botaoVoltar.addEventListener("click", ()=>{        
    grupoUm.style.visibility ="visible";
    grupoUm.style.oppacity = 1;
    botaoAvancar.style.display = "flex";
    grupoDois.style.visibility ="visible";
    grupoDois.style.oppacity = 1;
    camposSenhas.classList.remove("container-visible");
    setTimeout(() => {nome.scrollIntoView({behavior: "smooth"})}, 500);

})

form.addEventListener("change", (e)=>{
    e.preventDefault();
    for (const i of form.elements){
        valores[i.name] = i.value;
    }

    if(valores.nome != ""){
        body.payload.name = valores.nome;
    }
    
    if(valores.email !=""){
        body.payload.email = valores.email;
    }

    if(valores.celular !=""){
        body.payload.personal_phone = valores.celular;
    }

    if(valores.ipo !=""){
        body.payload.cf_tipo_de_empresa = valores.tipo;
    }

});

botaoAvancar.addEventListener("click", ()=>{
        grupoUm.style.visibility ="hidden";
        grupoUm.style.oppacity = 0;
        grupoDois.style.visibility ="hidden";
        grupoDois.style.oppacity = 0;
        camposSenhas.classList.add("container-visible");
        botaoAvancar.style.display = "none";
        setTimeout(() => {senha.scrollIntoView()});
});

senha.addEventListener("input", (e)=>{


    if(validarString(e.target.value, /^(?=.*[A-Z])(?=.*\d)(?=.*[@_\-]).{8,16}$/)){
        e.target.style.border = "1px solid green";
    }
    else{
        e.target.style.border = "1px solid red";
    }
});

senhaConfirmacao.addEventListener("input", (e) =>{
    if(senha.value === e.target.value){
        e.target.style.border = "1px solid green";
    }
    else{
        e.target.style.border = "1px solid red";
    }
});




form.addEventListener("submit", (e)=>{


    e.preventDefault();
    options.body = JSON.stringify(body);
    console.log(options);
    fetch("https://api.rd.services/platform/conversions?api_key=fJvYiAJejEVotlaaCThpBqaowGNcdtEEyCVA", options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err));
});

animateCarrousel();