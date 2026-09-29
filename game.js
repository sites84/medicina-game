const scenes={
room:{image:"assets/scenes/01_quarto.webp",speaker:"Narrador",text:"Amanhã começa uma nova vida. Pela primeira vez, a Medicina deixa de ser apenas um sonho distante.",hotspots:[
{id:"mochila",x:18.52,y:24.86,action:"open",target:"backpack"},
{id:"jaleco",x:28.17,y:36.42,action:"open",target:"coat"},
{id:"caderno",x:41.04,y:69.13,action:"open",target:"notebook"},
{id:"estojo",x:75.5,y:67.06,action:"say",text:"Seu estojo. Poucas canetas, alguns lápis e uma borracha. É o que você tem para começar."},
{id:"celular",x:75.02,y:82.67,action:"open",target:"phone"},
{id:"mala",x:91.76,y:43.4,action:"say",text:"Sua pequena mala. Dentro dela estão apenas as roupas que você poderá levar para a cidade."},
{id:"janela",x:55.18,y:11.74,action:"open",target:"windowView"},
{id:"porta",x:87.34,y:15.3,action:"nextScene",target:"family",text:"Está na hora. Você pega suas coisas, abre a porta e se prepara para se despedir da sua família."}]},

phone:{image:"assets/scenes/celular_detalhe.webp",speaker:"Narrador",text:"A tela está quebrada, mas o aparelho ainda funciona. Por enquanto, isso basta.",back:"room"},
backpack:{image:"assets/scenes/mochila_detalhe.webp",speaker:"Narrador",text:"Sua mochila está velha, manchada e desgastada pelo tempo. Mesmo assim, é nela que você vai carregar parte do que precisa para começar sua nova vida.",back:"room"},
windowView:{image:"assets/scenes/vista_janela.webp",speaker:"Narrador",text:"Lá fora está o bairro rural onde você cresceu. As casas simples, a estrada de terra e as poucas luzes da noite parecem diferentes agora. Amanhã você vai partir para a cidade em busca do seu sonho.",back:"room"},
notebook:{image:"assets/scenes/03_caderno.webp",speaker:"Narrador",text:"O caderno que seu pai lhe deu. Não é caro, mas carrega anos de esforço e uma lembrança que você pretende levar consigo.",back:"room"},
coat:{image:"assets/scenes/04_jaleco.webp",speaker:"Narrador",text:"Seu primeiro jaleco. Comprado de segunda mão pela sua avó. Simples, usado e, para você, enorme.",back:"room"},

family:{image:"assets/scenes/05_familia.webp",speaker:"Família",text:"Todos estão reunidos para se despedir. Você será o primeiro da família a se formar e o primeiro a se tornar médico.",next:"departure",hotspots:[
{id:"pai",x:30,y:28,action:"say",text:"Seu pai tenta esconder a emoção. Ele sabe o quanto você trabalhou para chegar até aqui."},
{id:"mae",x:46,y:30,action:"say",text:"Sua mãe sorri, emocionada. A mochila que ela lhe deu está entre as coisas que você levará."},
{id:"irmaos",x:19,y:36,action:"say",text:"Seus irmãos estão felizes por você. A despedida é difícil, mas todos acreditam no seu futuro."},
{id:"bagagem",x:77,y:68,action:"say",text:"É quase tudo o que você possui para começar sua nova vida."},
{id:"porta",x:93,y:39,action:"say",text:"A porta está aberta. É hora de partir."}]},

departure:{image:"assets/scenes/06_despedida.webp",speaker:"Narrador",text:"O ônibus chegou. Você respira fundo. O medo existe, mas você decidiu que não vai voltar atrás.",next:"city",hotspots:[
{id:"familia",x:29,y:29,action:"say",text:"Você olha uma última vez para sua família. Agora precisa seguir sozinho."},
{id:"onibus",x:91,y:48,action:"say",text:"O ônibus espera. É o começo da viagem para a cidade grande."},
{id:"mochila",x:29,y:82,action:"say",text:"Sua velha mochila. Dentro dela está uma parte da sua história."},
{id:"mala",x:73,y:83,action:"say",text:"A mala contém tudo o que você conseguiu levar."}]},

city:{image:"assets/scenes/07_cidade.webp",speaker:"Narrador",text:"A cidade é muito maior do que tudo o que você conheceu. Você está chegando ao lugar onde sua nova vida vai começar.",next:"university",hotspots:[
{id:"janela",x:18,y:30,action:"say",text:"Pela janela do ônibus, a cidade parece não ter fim."},
{id:"mochila",x:28,y:78,action:"say",text:"Sua velha mochila ainda está com você."},
{id:"mala",x:77,y:78,action:"say",text:"A pequena mala lembra que sua vida inteira precisou caber em poucas coisas."},
{id:"cidade",x:57,y:45,action:"say",text:"Prédios, trânsito, ônibus e milhares de pessoas. Agora você precisa aprender a sobreviver nessa cidade."}]},

university:{image:"assets/scenes/08_faculdade.webp",speaker:"Narrador",text:"É aqui. A melhor faculdade de Medicina do país. Você conseguiu a bolsa. Agora começa a parte mais difícil.",hotspots:[
{id:"entrada",x:51,y:35,action:"say",text:"A entrada da faculdade está diante de você. Centenas de estudantes chegam para o primeiro dia."},
{id:"estudantes",x:52,y:60,action:"say",text:"Alguns estudantes chegaram com equipamentos novos e apoio financeiro. Você terá que construir seu caminho de outra maneira."},
{id:"mochila",x:25,y:82,action:"say",text:"Sua velha mochila ainda está com você."},
{id:"mala",x:77,y:83,action:"say",text:"Sua mala. O dinheiro que você trouxe só cobre o primeiro mês de aluguel e alimentação."}]}}
;

const state={name:"",scene:"room",clicked:{}};
const img=document.getElementById("sceneImage");
const hotspots=document.getElementById("hotspots");
const speaker=document.getElementById("speaker");
const text=document.getElementById("text");
const backBtn=document.getElementById("backBtn");
const continueBtn=document.getElementById("continueBtn");
const startPanel=document.getElementById("startPanel");
const toast=document.getElementById("toast");

function say(message,who="Narrador"){
  speaker.textContent=who;
  text.textContent=message.replaceAll("{nome}",state.name);
}

function hotspotKey(scene,id){
  return scene+"::"+id;
}

function render(key){
  state.scene=key;
  const s=scenes[key];
  img.src=s.image;
  img.alt="Cena: "+key;
  speaker.textContent=s.speaker||"Narrador";
  text.textContent=s.text.replaceAll("{nome}",state.name);
  hotspots.innerHTML="";

  (s.hotspots||[]).forEach(h=>{
    const b=document.createElement("button");
    b.className="hotspot"+(state.clicked[hotspotKey(key,h.id)]?" clicked":"");
    b.style.left=h.x+"%";
    b.style.top=h.y+"%";
    b.setAttribute("aria-label",h.id);
    b.title=h.id;
    b.onclick=()=>handle(h);
    hotspots.appendChild(b);
  });

  backBtn.hidden=!s.back;
  if(s.back) backBtn.onclick=()=>render(s.back);

  continueBtn.hidden=!s.next;
  if(s.next) continueBtn.onclick=()=>render(s.next);
}

function handle(h){
  state.clicked[hotspotKey(state.scene,h.id)]=true;
  const button=[...hotspots.children].find(b=>b.getAttribute("aria-label")===h.id);
  if(button) button.classList.add("clicked");

  if(h.action==="say") say(h.text);
  if(h.action==="open") render(h.target);
  if(h.action==="nextScene"){
    say(h.text);
    setTimeout(()=>render(h.target),1800);
  }
}

function showToast(message){
  toast.textContent=message;
  toast.hidden=false;
  setTimeout(()=>toast.hidden=true,1800);
}

document.getElementById("startBtn").onclick=()=>{
  const value=document.getElementById("nameInput").value.trim();
  if(!value){
    document.getElementById("nameInput").focus();
    return;
  }
  state.name=value;
  localStorage.setItem("medicina_player_name",value);
  startPanel.hidden=true;
  render("room");
};

const saved=localStorage.getItem("medicina_player_name");
if(saved) document.getElementById("nameInput").value=saved;
