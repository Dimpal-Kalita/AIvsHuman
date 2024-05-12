import * as tf from "@tensorflow/tfjs";

import React, { useState } from "react";
import styles from "./Home.module.scss";
import PredictionComponent from "./Prediction/Prediction";

const Home = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const tokenize = (texty) => {
    return texty
      .toLowerCase()
      .split(" ")
      .map((word) => word.charCodeAt(0));
  };
  // Padding function
  const padSequences = (sequences, maxLength) => {
    return sequences.map((seq) => {
      if (seq.length > maxLength) {
        return seq.slice(0, maxLength);
      }
      const padding = Array(maxLength - seq.length).fill(0);
      return seq.concat(padding);
    });
  };

  const handleUpload = async () => {
    // Tokenize input text
    setLoading(true);

    const sequences = [tokenize(text)];

    // Pad sequences
    const maxLength = 100; // Adjust maxlen as needed
    const paddedSequences = padSequences(sequences, maxLength); // Adjust maxlen as needed

    // Convert padded sequences to a tensor
    const paddedSequencesTensor = tf.tensor2d(paddedSequences);

    // Reshape tensor to remove extra dimension
    const reshapedTensor = paddedSequencesTensor.reshape([1, maxLength]);
    const modelUrl = "public/db/tfjs_artifacts/model.json";

    try {
      // Load the model
      const model = await tf.loadLayersModel(modelUrl);

      // console.log('Model loaded successfully ');

      // Make predictions
      const predict = model.predict(reshapedTensor);

      // Log the prediction
      // console.log('Prediction:', prediction.dataSync()[0]);

      setLoading(false);
      setPrediction(predict.dataSync()[0]);
    } catch (error) {
      setLoading(false);

      // console.error('Error loading the model:', error);
    }
  };

  // Word counter function
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className={styles.homeContainer}>
      {/* <div className={styles.home1}> */}
      <div className={styles.titleContainer}>
        <h1>Detect the AI content in your text</h1>
      </div>
      <div className={styles.textAreaContainer}>
        <textarea
          className={styles.formControl}
          rows="25"
          value={text}
          onChange={handleTextChange}
          placeholder="Write your text here..."
        />
        <div className={styles.wordCounter}>Word Count: {wordCount}</div>
        <button className={styles.uploadButton} onClick={handleUpload}>
          Upload
        </button>
      </div>
      {loading && <div className={styles.loading}>Loading...</div>}
      {prediction !== null && <PredictionComponent prediction={prediction} />}
      {/* </div> */}

      {/* <div className={styles.whyUseWebsite}> */}
      {/* <h2>Why to use US?</h2>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <h3>Accurate Analysis</h3>
          <p>
            Our AI technology provides accurate analysis of your text, ensuring reliable
            results.
          </p>
        </div>
        <div className={styles.card}>
          <h3>Time-saving</h3>
          <p>
            Save time by automating the process of analyzing text content for AI elements.
          </p>
        </div>
        <div className={styles.card}>
          <h3>User-friendly Interface</h3>
          <p>
            Our website offers an intuitive and easy-to-use interface for seamless text
            analysis.
          </p>
        </div>
      </div> */}
    </div>
    // </div>
  );
};

export default Home;
