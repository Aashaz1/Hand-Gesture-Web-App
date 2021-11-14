Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 95
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="capturedImage" src="'+data_uri+'"/>';
    });
}
console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/L6pZvyCwH/model.json', modelLoaded);

function modelLoaded(){
    console.log("Model Loaded!")
}

function check(){
    img = document.getElementById("capturedImage");
    classifier.classify(img, gotResults)
}

function gotResults(error, results){
    if (error){
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("resultGestureName").innerHTML = results[0].label;
        prediction1 = results[0].label;
    }
    if (results[0].label == "Victory"){
        document.getElementById("updateGesture").innerHTML = "&#9996;";
    } else if (results[0].label == "Best"){
        document.getElementById("updateGesture").innerHTML = "&#128077;";
    } else if (results[0].label == "Perfect"){
        document.getElementById("updateGesture").innerHTML = "&#128076;";
    } else if (results[0].label == "Worst"){
        document.getElementById("updateGesture").innerHTML = "&#128078; ";
    } 
}

function speak(){
    var synth = window.speechSynthesis;
    speakData1 = "The first prediction is" + prediction1;
    var utterThis = new SpeechSynthesisUtterance(speakData1);
    synth.speak(utterThis)
}