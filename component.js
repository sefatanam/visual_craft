
function makeCard(obj, fn){
    return (
        `
        <article style="width: 30rem; border: 1px solid;margin:2rem">
        <h1 style="text-transform:uppercase">${obj.header}</h1>
        <p>${obj.param}</p>
        <button id="test" onclick="${obj.func}" type="button">Learn More</button>
        <button id="test" onclick="${obj.func2}" type="button">Print</button>
        </article>
        `
    )
}
  

export default makeCard;