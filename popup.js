// popup.js

const randomButton = document.getElementById("random-button");

// load the machine learning model from a file or URL
const model = await tf.loadLayersModel("model.json");

randomButton.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentTab = tabs[0];
    const currentUrl = currentTab.url;

    // extract features from the current URL using the model
    const features = extractFeatures(currentUrl);
    const input = tf.tensor2d(features, [1, features.length]);

    // predict the user's preferences using the model
    const predictions = model.predict(input);
    const preferences = predictions.dataSync();

    // use the user's preferences to generate a random URL
    const randomUrl = generateRandomUrl(preferences);

    // navigate to the random URL
    chrome.tabs.update(currentTab.id, { url: randomUrl });
  });
});
