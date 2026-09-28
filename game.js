const scenes={
room:{image:"assets/scenes/01_quarto.webp",speaker:"Narrador",text:"Amanhã começa uma nova vida. Pela primeira vez, a Medicina deixa de ser apenas um sonho distante.",hotspots:[
{id:"notebook",x:10,y:73,w:35,h:25,action:"open",target:"notebook"},
{id:"pencilcase",x:68,y:73,w:20,h:14,action:"say",text:"Seu estojo. Poucas canetas, alguns lápis e uma borracha. É o que você tem para começar."},
{id:"phone",x:63,y:83,w:25,h:13,action:"open",target:"phone"},
{id:"coat",x:23,y:57,w:52,h:27,action:"open",target:"coat"},
{id:"backpack",x:3,y:39,w:42,h:28,action:"say",text:"A mochila que sua mãe lhe deu quatro anos atrás. Velha, mas ainda firme."},
{id:"suitcase",x:76,y:54,w:23,h:30,action:"say",text:"Sua pequena mala. Dentro dela estão apenas as roupas que você poderá levar para a cidade."},
{id:"window",x:5,y:5,w:38,h:37,action:"say",text:"Lá fora, o interior está silencioso. Amanhã você partirá para a cidade grande."},
{id:"door",x:79,y:5,w:21,h:45,action:"next",target:"family"}]},
phone:{image:"assets/scenes/02_celular.webp",speaker:"Narrador",text:"A tela está quebrada, mas o aparelho ainda funciona. Por enquanto, isso basta.",back:"room"},
notebook:{image:"assets/scenes/03_caderno.webp",speaker:"Narrador",text:"O caderno que seu pai lhe deu. Não é caro, mas carrega anos de esforço e uma lembrança que você pretende levar consigo.",back:"room"},
coat:{image:"assets/scenes/04_jaleco.webp",speaker:"Narrador",text:"Seu primeiro jaleco. Comprado de segunda mão pela sua avó. Simples, usado e, para você, enorme.",back:"room"},
family:{image:"assets/scenes/05_familia.webp",speaker:"Família",text:"Todos estão reunidos para se despedir. Você será o primeiro da família a se formar e o primeiro a se tornar médico.",hotspots:[
{id:"father",x:8,y:16,w:31,h:43,action:"say",text:"Seu pai tenta esconder a emoção. Ele sabe o quanto você trabalhou para chegar até aqui."},
{id:"mother",x:34,y:20,w:29,h:43,action:"say",text:"Sua mãe sorri, emocionada. A mochila que ela lhe deu está entre as coisas que você levará."},
{id:"siblings",x:0,y:24,w:38,h:53,action:"say",text:"Seus irmãos estão felizes por você. A despedida é difícil, mas todos acreditam no seu futuro."},
{id:"door",x:82,y:0,w:18,h:53,action:"next",target:"departure"},
{id:"luggage",x:58,y:65,w:42,h:34,action:"say",text:"É quase tudo o que você possui para começar sua nova vida."}]},
departure:{image:"assets/scenes/06_despedida.webp",speaker:"Narrador",text:"O ônibus chegou. Você respira fundo. O medo existe, mas você decidiu que não vai voltar atrás.",hotspots:[
{id:"family",x:0,y:25,w:46,h:48,action:"say",text:"Você olha uma última vez para sua família. Agora precisa seguir sozinho."},
{id:"bus",x:70,y:5,w:30,h:75,action:"next",target:"city"},
{id:"backpack",x:0,y:76,w:50,h:24,action:"say",text:"Sua velha mochila. Dentro dela está uma parte da sua história."},
{id:"suitcase",x:50,y:70,w:25,h:30,action:"say",text:"A mala contém tudo o que você conseguiu levar."}]},
city:{image:"assets/scenes/07_cidade.webp",speaker:"Narrador",text:"A cidade é muito maior do que tudo o que você conheceu. E lá no alto está o lugar onde sua nova vida vai começar.",hotspots:[
{id:"university",x:35,y:0,w:48,h:43,action:"next",target:"university"},
{id:"city",x:0,y:25,w:100,h:60,action:"say",text:"Prédios, trânsito, ônibus e milhares de pessoas. Agora você precisa aprender a sobreviver nessa cidade."},
{id:"backpack",x:0,y:72,w:50,h:28,action:"say",text:"Você confere sua mochila. Tudo o que precisa está ali."},
{id:"suitcase",x:62,y:70,w:32,h:30,action:"say",text:"A pequena mala lembra que sua vida inteira precisou caber em poucas coisas."}]},
university:{image:"assets/scenes/08_faculdade.webp",speaker:"Narrador",text:"É aqui. A melhor faculdade de Medicina do país. Você conseguiu a bolsa. Agora começa a parte mais difícil.",hotspots:[
{id:"entrance",x:30,y:8,w:45,h:57,action:"say",text:"A entrada da faculdade está diante de você. Centenas de estudantes chegam para o primeiro dia."},
{id:"students",x:0,y:35,w:100,h:52,action:"say",text:"Alguns estudantes chegaram com equipamentos novos e apoio financeiro. Você terá que construir seu caminho de outra maneira."},
{id:"backpack",x:0,y:72,w:45,h:28,action:"say",text:"Sua velha mochila ainda está com você."},
{id:"suitcase",x:65,y:72,w:35,h:28,action:"say",text:"Sua mala. O dinheiro que você trouxe só cobre o primeiro mês de aluguel e alimentação."},
{id:"enter",x:33,y:42,w:37,h:27,action:"finish"}]}};

const state={name:"",scene:"room"};
const img=document.getElementById("sceneImage"),hotspots=document.getElementById("hotspots"),speaker=document.getElementById("speaker"),text=document.getElementById("text"),backBtn=document.getElementById("backBtn"),startPanel=document.getElementById("startPanel"),toast=document.getElementById("toast");

function say(message,who="Narrador"){speaker.textContent=who;text.textContent=message.replaceAll("{nome}",state.name)}
function render(key){state.scene=key;const s=scenes[key];img.src=s.image;speaker.textContent=s.speaker||"Narrador";text.textContent=s.text.replaceAll("{nome}",state.name);hotspots.innerHTML="";(s.hotspots||[]).forEach(h=>{const b=document.createElement("button");b.className="hotspot";b.style.left=h.x+"%";b.style.top=h.y+"%";b.style.width=h.w+"%";b.style.height=h.h+"%";b.setAttribute("aria-label",h.id);b.onclick=()=>handle(h);hotspots.appendChild(b)});backBtn.hidden=!s.back;if(s.back)backBtn.onclick=()=>render(s.back)}
function handle(h){if(h.action==="say")say(h.text);if(h.action==="open"||h.action==="next")render(h.target);if(h.action==="finish"){say("Você entra na faculdade. A partir de agora, cada escolha de {nome} poderá mudar o caminho até a especialização.","Sistema");showToast("PRÓLOGO CONCLUÍDO")}}
function showToast(m){toast.textContent=m;toast.hidden=false;setTimeout(()=>toast.hidden=true,1800)}
document.getElementById("startBtn").onclick=()=>{const v=document.getElementById("nameInput").value.trim();if(!v)return document.getElementById("nameInput").focus();state.name=v;localStorage.setItem("medicina_player_name",v);startPanel.hidden=true;render("room")};
const saved=localStorage.getItem("medicina_player_name");if(saved)document.getElementById("nameInput").value=saved;