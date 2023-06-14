import 'reflect-metadata';
import 'module-alias/register';

import Jimp from 'jimp';

// Load the base image and the image to be added
const baseImagePath = 'path/to/base/image.jpg';
const imageToAddPath = 'path/to/image/to/add.png';

// Define the position to place the image
const positionX = 100;
const positionY = 100;

// Define the text to overlay
const text = 'Hello, World!';
const textPositionX = 50;
const textPositionY = 50;
const textOptions = {
  text: text,
  alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER,
  alignmentY: Jimp.VERTICAL_ALIGN_MIDDLE,
};

// Read the images using Jimp
const loadImages = async () => {
  const baseImage = await Jimp.read(baseImagePath);
  const imageToAdd = await Jimp.read(imageToAddPath);
  return {baseImage, imageToAdd};
};

// Perform the image manipulation
const processImages = async () => {
  const {baseImage, imageToAdd} = await loadImages();

  // Resize the image to be added to fit within the base image
  imageToAdd.resize(200, 200);

  // Composite the image onto the base image at the specified position
  baseImage.composite(imageToAdd, positionX, positionY);

  // Add text overlay to the base image
  baseImage.print(await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK), textPositionX, textPositionY, textOptions);

  // Save the result
  const outputPath = 'path/to/output/image.jpg';
  await baseImage.writeAsync(outputPath);

  console.log('Image composition complete!');
};

// Run the image processing
processImages().catch(console.error);
