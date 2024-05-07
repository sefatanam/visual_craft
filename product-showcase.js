const mainImage = document.getElementById("main-image");
const listImages = document.querySelectorAll("#list-img.img-container img");
Array.from(listImages).forEach((car, index) => {
  car.style.viewTransitionName = `car-${index + 1}`;
});

async function moveCar(index) {
  const currentCar = document.getElementById(`list-img-${index}`);
  const mainCar = document.querySelector("#main-image.main-view img");
  const destination = document.getElementById("main-image");
  const listing = document.getElementById("list-img");

  const transition1 = document.startViewTransition(() => {
    destination.appendChild(currentCar);
  });
  const transition2 = document.startViewTransition(() => {
    listing.appendChild(mainCar);
  });
  await transition1.finished;
  await transition2.finished;
}
