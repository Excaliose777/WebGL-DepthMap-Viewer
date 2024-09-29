import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-converter';
import '@tensorflow/tfjs-backend-webgl';
import '@tensorflow-models/body-segmentation';
import * as depthEstimation from '@tensorflow-models/depth-estimation';
import { useEffect } from 'react';

const Index = () => {
  useEffect(() => {
    async function loadModel() {
      const model = depthEstimation.SupportedModels.ARPortraitDepth
      const estimator = await depthEstimation.createEstimator(model);
      const estimationConfig = {
        minDepth: 0, // The minimum depth value outputted by the estimator.
        maxDepth: 1 // The maximum depth value outputted by the estimator.
      };
      const depthMap = await estimator.estimateDepth(input, estimationConfig);
    }

    loadModel()
  },[])
}

export default Index;