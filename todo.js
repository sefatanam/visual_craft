const allCards = document.querySelectorAll(".col:not(.col-complete) li");
console.log(allCards);
Array.from(allCards).forEach(
  (card, index) => (card.style.viewTransitionName = `card-${index + 1}`)
);

async function moveCard(isDone) {
  const card = this.window.event.target.closest("li");

  card.style.viewTransitionName = "card-active";

  // Get the target list id
  const destination = document.getElementById(
    `js-list-${isDone ? "done" : "not-done"}`
  );

  // We'll use this class to hide the item controls while animation is running
  card.classList.add("card-moving");

  if (!document.startViewTransition) {
    destination.appendChild(card);
    return;
  }

  const transition = document.startViewTransition(() => {
    // Run animation
    destination.appendChild(card);
  });

  await transition.finished;

  card.style.viewTransitionName = "none";
}
