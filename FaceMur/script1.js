document.addEventListener('DOMContentLoaded', () => {
    if (typeof faceapi !== 'undefined') {
        console.log('Face-api.js is loaded');
    } else {
        console.log('Face-api.js is not loaded');
    }
});



// تحديد موقع النماذج التي قمنا بتنزيلها
const MODEL_URL = '/FaceMur/models';

// تحميل النماذج
Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),   // نموذج اكتشاف الوجوه
    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL), // نموذج معالم الوجه
    faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL) // نموذج التعرف على الوجه
]).then(startApp);

// بدء التطبيق بعد تحميل النماذج
function startApp() {
    const imageUpload = document.getElementById('imageUpload');

    // الاستماع لحدث تحميل الصورة
    imageUpload.addEventListener('change', async () => {
        const file = imageUpload.files[0];

        if (file) {
            // تحميل الصورة وعرضها
            const image = await faceapi.bufferToImage(file);
            const container = document.getElementById('output');
            container.innerHTML = '';
            container.append(image);

            // التعرف على الوجوه في الصورة
            const detections = await faceapi.detectAllFaces(image)
                .withFaceLandmarks()
                .withFaceDescriptors();

            // رسم النتائج على الصورة
            const canvas = faceapi.createCanvasFromMedia(image);
            container.append(canvas);

            faceapi.matchDimensions(canvas, { width: image.width, height: image.height });
            const resizedDetections = faceapi.resizeResults(detections, { width: image.width, height: image.height });
            faceapi.draw.drawDetections(canvas, resizedDetections);
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        }
    });
}
// اختبار بسيط للتأكد من تحميل face-api.js
if (typeof faceapi !== 'undefined') {
    console.log('Face-api.js is loaded');
} else {
    console.log('Face-api.js is not loaded');
}
document.addEventListener('DOMContentLoaded', () => {
    if (typeof faceapi !== 'undefined') {
        console.log('Face-api.js is loaded');
    } else {
        console.log('Face-api.js is not loaded');
    }
});
document.addEventListener('DOMContentLoaded', () => {
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
        .then(() => console.log('SSD Mobilenetv1 model loaded'))
        .catch(err => console.error('Error loading SSD Mobilenetv1 model:', err));

    faceapi.nets.faceLandmark68Net.loadFromUri('/models')
        .then(() => console.log('Face Landmark 68 model loaded'))
        .catch(err => console.error('Error loading Face Landmark 68 model:', err));

    faceapi.nets.faceRecognitionNet.loadFromUri('/models')
        .then(() => console.log('Face Recognition model loaded'))
        .catch(err => console.error('Error loading Face Recognition model:', err));
});
document.addEventListener('DOMContentLoaded', async () => {
    await faceapi.nets.ssdMobilenetv1.loadFromUri('/FaceMur/models');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/FaceMur/models');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/FaceMur/models');
    console.log('All models loaded');
});
