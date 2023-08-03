video = "";
object = [];
Status = "";
function preload(){
    video = createVideo('video.mp4');
video.hide();
}
function setup() {
    canvas = createCanvas(480,380);
    canvas.center();
}
function draw() {
    image(video, 0, 0, 480, 380);
    if(Status != "")
    {
        objectDetector.detect(video, gotResults);
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+ object.length;

            fill("White");
            percent = floor(object[i].confidence * 100 );
            text(object[i].label + "" + percent + "%", object[i].x + 15, object[i].y + 15);
            noFill();
            stroke("White");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
}
function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detection object";

}
function modelLoaded(){
    console.log("Model Loaded!");
    Status = true;
    video.loop();
    video.speed(2);
    video.volume(0);
}
function gotResults(error, results) {
    if( error ) {
        console.log(error);

    }
    console.log(results);
    object = results;
} 
