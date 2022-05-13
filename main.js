status= "";
video= "";
input_text= "";
result_array= [];

function preload(){

}

function setup(){
    canvas= createCanvas(580, 380);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
    video.size(600, 400);
}

function start(){
    objectDetector= ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML= "Status: Detecting Objects";
input_text= document.getElementById("object_name").value;
}

function modelLoaded(){
console.log("Model Loaded")
status= true;
}

function gotResults(error, results){
if(error){
    console.error(error);
}
else{
console.log(results);
result_array= results;
}
}

function draw(){
    image(video, 0, 0, 580, 380);
    if(status != ""){
        objectDetector.detect(video, gotResults);
        for(i=0; i < result_array.length; i++){
            percentage= floor(result_array[i].confidence * 100);
            object_name= result_array[i].label;
            text(result_array[i].label + " " + percentage + "%", result_array[i].x + 15, result_array[i].y + 15);
        fill("red");
        noFill();
        stroke("red");
        rect(result_array[i].x, result_array[i].y, result_array[i].width, result_array[i].height);
        document.getElementById("status").innerHTML= "Status: Objects Detected";
        if(object_name == input_text){
            video.stop();
            objectDetector.detect(gotResults);
            document.getElementById("result").innerHTML= input_text + " Found";
            var synth= window.speechSynthesis;
            var utterThis= new SpeechSynthesisUtterance(input_text + "Found");
            synth.speak(utterThis);
        }
        else{
            document.getElementById("result").innerHTML= input_text + " Not Found"
        }
        }
    }
}