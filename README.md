# PhotoAlign Collage

Sorts, crops and lays out a patient's 9 clinical photos (4 extra-oral, 5 intra-oral), then saves them back to the patient's folder as `Front`, `Front-Smile`, `Profile`, `Profile-Smile`, `Frontal`, `Right`, `Left`, `Upper`, `Lower`, plus an optional PowerPoint or JPG collage.

- Runs entirely in the browser. Photos never leave the computer.
- Installable from Microsoft Edge or Google Chrome, and works offline once installed.
- Opening a patient folder and saving into it needs Edge or Chrome on a computer.

Photo classifier: MobileNetV3-Small, see [photoalign-model](https://github.com/Kurapikaxx/photoalign-model).
Libraries: [ONNX Runtime Web](https://github.com/microsoft/onnxruntime) 1.17.3 (MIT), [PptxGenJS](https://github.com/gitbrent/PptxGenJS) 3.12.0 (MIT).

Updating: change files, then bump `VERSION` in `sw.js` so installed copies pick up the new version.
