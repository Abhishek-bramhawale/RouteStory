export async function exportMapVideo(mapContainer, onProgress) {
  if (!mapContainer || !navigator.mediaDevices?.getDisplayMedia) {
    throw new Error("Screen capture not supported in this browser");
  }

  const stream = await navigator.mediaDevices.getDisplayMedia({
    video: { displaySurface: "browser" },
    audio: false,
  });

  const mimeType = MediaRecorder.isTypeSupported("video/webm;codecs=vp9")
    ? "video/webm;codecs=vp9"
    : "video/webm";

  const recorder = new MediaRecorder(stream, { mimeType });
  const chunks = [];

  recorder.ondataavailable = (e) => {
    if (e.data.size > 0) chunks.push(e.data);
  };

  return new Promise((resolve, reject) => {
    recorder.onstop = () => {
      stream.getTracks().forEach((t) => t.stop());
      const blob = new Blob(chunks, { type: mimeType });
      resolve(blob);
    };

    recorder.onerror = () => {
      stream.getTracks().forEach((t) => t.stop());
      reject(new Error("Recording failed"));
    };

    recorder.start(100);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      onProgress?.(Math.min(progress, 95));
      if (progress >= 100) {
        clearInterval(interval);
        recorder.stop();
        onProgress?.(100);
      }
    }, 200);
  });
}

export function downloadBlob(blob, filename = "routestory.webm") {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
