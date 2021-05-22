var webcam = navigator.mediaDevices.getUserMedia({
  camera: true,
  video: true,
  audio: false,
});

var canvas = document.querySelector("canvas");
var video = document.querySelector(".camera > video");
var btnTakePhoto = document.querySelector(".capture");
var photo = document.querySelector(".photo");
var width, height;
var streaming = false;

webcam.then(function (stream) {
  if ("srcObject" in video) {
    video.srcObject = stream;
  } else {
    video.src = window.URL.createObjectURL(stream);
  }

  video.addEventListener("canplay", function (e) {
    if (!streaming) {
      width = video.videoWidth;
      height = video.videoHeight;

      this.width = width;
      this.height = height;
      canvas.width = width;
      canvas.height = height;

      streaming = true;
    }
  });

  btnTakePhoto.addEventListener(
    "click",
    function (e) {
      takePhoto();
      e.preventDefault();
    },
    false
  );

  clearPhoto();
});

function takePhoto() {
  var context = canvas.getContext("2d");

  if (width && height) {
    canvas.width = width;
    canvas.height = height;

    context.drawImage(video, 0, 0, width, height);
    var data = canvas.toDataURL("image/png");
    if (data) {
      photo.src = data;
    }
  }
}

function clearPhoto() {
  canvas.hidden = true;
}
