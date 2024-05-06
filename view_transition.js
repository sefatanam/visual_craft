const overlayWrapper = document.getElementById("js-overlay");
const overlayContent = document.getElementById("js-overlay-target");

async function toggleImageView(index) {
  const image = document.getElementById(`js-gallery-image-${index}`);
  image.classList.add("gallery__image--active");
  const imageParentElement = image.parentElement;

  if (!document.startViewTransition) {
    moveImageToModal(image);
  } else {
    // Start transition with the View Transitions API.
    const transition = document.startViewTransition(() =>
      moveImageToModal(image)
    );
    await transition.finished;
  }
  moveImageToModal(image);
  overlayWrapper.onclick = async function () {
    if (!document.startViewTransition) {
      moveImageToGrid(imageParentElement);
      return;
    }

    const transition = document.startViewTransition(() =>
      moveImageToGrid(imageParentElement)
    );
    await transition.finished;
    image.classList.remove("gallery__image--active");
  };
}

function moveImageToModal(image) {
  overlayWrapper.classList.add("overlay--active");
  overlayContent.append(image);
}

function moveImageToGrid(imageParentElement) {
  imageParentElement.append(overlayContent.querySelector("img"));
  overlayWrapper.classList.remove("overlay--active");
}
