
  // Classifier Variable
  let classifier;
  
  // Video
  let video;
  let flippedVideo;
  // To store the classification
  let label = "";

  // Load the model first
  function preload() {
    classifier = ml5.imageClassifier('model.json');
  }

  function setup() {
    createCanvas(640, 520);
    // Create the video
    video = createCapture(VIDEO);
    video.size(640, 520);
    video.hide();

    flippedVideo = ml5.flipImage(video)
    // Start classifying
    classifyVideo();
  }

  function draw() {
    background(0);
    // Draw the video
    //image(flippedVideo, 0, 0);

    // Draw the label
    fill(255);
    textSize(16);
    textAlign(CENTER);
    text(label, width / 2, height - 4);
    let emoji='🐯';
    textSize(256);
    if(label=='hund'){
      emoji='🐶'
    } else if(label=='prinzessin'){
      emoji='👸'
    } else if(label=='waschbär'){
      emoji='🐻'
    } else if(label=='tiger'){
      emoji='🐯'
    }
    text(emoji,width/2,height/2);
  }

  // Get a prediction for the current video frame
  function classifyVideo() {
    flippedVideo = ml5.flipImage(video)
    classifier.classify(flippedVideo, gotResult);
  }

  // When we get a result
  function gotResult(error, results) {
    // If there is an error
    if (error) {
      console.error(error);
      return;
    }
    // The results are in an array ordered by confidence.
    // console.log(results[0]);
    label = results[0].label;
    // Classifiy again!
    classifyVideo();
  }
