//-----------------------------------------------------------------------------------------------------------------------------------------

const cam = document.getElementById('cam')
let i =0

//Ativa a webcam
const startVideo = () => {
navigator.getUserMedia(
    { video: {} },
    stream => cam.srcObject = stream,
    err => console.error(err)
    )
}
cam.style.display ="none" //oculta a area da camera inicialmente

//responsavel por carregar as fotos da pessoa para reconhecimento facial
const loadLabels = () => {
    const labels = ['Andre Cunha', 'Betanea Oliveira']
    return Promise.all(labels.map(async label => {
        const descriptions = []
        for (let i = 1; i <= 5; i++) {
            const img = await faceapi.fetchImage(`/assets/lib/face-api/labels/${label}/${i}.jpg`)
            const detections = await faceapi
                .detectSingleFace(img)
                .withFaceLandmarks()
                .withFaceDescriptor()
            descriptions.push(detections.descriptor)
        }
        return new faceapi.LabeledFaceDescriptors(label, descriptions)
    }))
}

//carrega os modelos do faceapi
Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/assets/lib/face-api/models'), //Para detectar rostos no video
    faceapi.nets.faceLandmark68Net.loadFromUri('/assets/lib/face-api/models'), 
    faceapi.nets.faceRecognitionNet.loadFromUri('/assets/lib/face-api/models'), //Reconhecimento da pessoa
    faceapi.nets.faceExpressionNet.loadFromUri('/assets/lib/face-api/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('/assets/lib/face-api/models'), //Usada internamente para detectar o roto (desenhar o quadrado na tela)
]).then(startVideo)

//responsavel por fazer o reconhecimento facial e desenhar na tela
cam.addEventListener('play', async () => {
    const canvas = faceapi.createCanvasFromMedia(cam)
    const canvasSize = {
        width: cam.width,
        height: cam.height
    }
    const labels = await loadLabels()
    faceapi.matchDimensions(canvas, canvasSize)
    document.body.appendChild(canvas)
    setInterval(async () => {
        const detections = await faceapi
            .detectAllFaces(
                cam,
                new faceapi.TinyFaceDetectorOptions()
            )
            .withFaceLandmarks()
            .withFaceExpressions()
            .withFaceDescriptors()
        const resizedDetections = faceapi.resizeResults(detections, canvasSize)
        const faceMatcher = new faceapi.FaceMatcher(labels, 0.6)
        const results = resizedDetections.map(d =>
            faceMatcher.findBestMatch(d.descriptor)
        )
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
        faceapi.draw.drawDetections(canvas, resizedDetections)

        //Nome da pessoa reconhecida
        results.forEach((result, index) => {
            const box = resizedDetections[index].detection.box
            const { label, distance } = result
            new faceapi.draw.DrawTextField([
                `${label}`
            ], box.bottomRight).draw(canvas)

            if(label == 'Betanea Oliveira' && i==0){
                //setTimeout(() => {  alert('Olá, André!') }, 4000);
                i++
                radar.style.display ="block"
                escrever(maeLocalizada, div1);
                titulo.style.display ="none"
                setTimeout(() => {  escrever(reconhecido, div2) }, 1000);
                setTimeout(() => { div3.innerHTML = 'Identidade confirmada:' }, 3000);
                setTimeout(() => {  escrever(bemvindo, div4), botaoMensagem.style.display ="block" }, 3000);
            }
        })
    }, 10)
})


//------------------------------------------------------------------

var botao = window.document.getElementById('botao')
botao.addEventListener('click', clicar)

var titulo = window.document.getElementById('titulo')
titulo.style.display ="none"

var radar = window.document.getElementById('radar')
radar.style.display ="none"


//funcao para quando apertar o botao
function clicar(){
    botao.style.display ="none" //some com a div do botão
    cam.style.display ="block" //ativa a area da camera
    titulo.style.display ="block"
    document.body.style.backgroundColor ="black";
}

var div1 = document.getElementById('localizacao');
var div2 = document.getElementById('reconhecido');
var div3 = document.getElementById('analise');
var div4 = document.getElementById('bemvindo');
var maeLocalizada = 'Mãe localizada!';
var reconhecido = 'Análise concluída';
var bemvindo = 'Betânea Oliveira';

//funcao para fazer o efeito de escrita
function escrever(str, el) {
  var char = str.split('').reverse();
  var typer = setInterval(function() {
    if (!char.length) return clearInterval(typer);
    var next = char.pop();
    el.innerHTML += next;
  }, 10);
}

//-----------------------------------------------------------------------------------------
//Mensagem

var botaoMensagem = window.document.getElementById('botaoMensagem')
botaoMensagem.addEventListener('click', exibirMensagem)
botaoMensagem.style.display ="none"

function exibirMensagem(){
    window.location.href = "https://betanea.herokuapp.com/"; 

}