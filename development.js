let fruits = [
  {
    id: 1,
    title: 'Яблоки',
    price: 60,
    img: 'https://e1.edimdoma.ru/data/ingredients/0000/2374/2374-ed4_wide.jpg?1487746348',
  },
  {
    id: 2,
    title: 'Бананы',
    price: 110,
    img: 'https://s.myspar.ru/upload/img/10/1013/101382.jpg?1594130253',
  },
  {
    id: 3,
    title: 'Киви',
    price: 80,
    img: 'https://winetime.com.ua/uploads/public/goods/3643/1585226414_62757_502_378.webp',
  },
];

const toHTML = (fruit) => `       
<div class="col">
<div class="card">
  <img
    class="card-img-top"
    style="height: 300px"
    src="${fruit.img}"
    alt="${fruit.title}"
  />
  <div class="card-body">
    <h5 class="card-title">${fruit.title}</h5>
    <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
    <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Удалить</a>
  </div>
</div>
</div>
`;

function render() {
  const html = fruits.map(toHTML).join('');
  document.querySelector('#fruits').innerHTML = html;
}

render();

const priceModal = $.modal({
  title: 'Цена на товар',
  closeable: true,
  width: '400px',
  footerButtons: [
    {
      text: 'Закрыть',
      type: 'primary',
      handler() {
        priceModal.close();
      },
    },
  ],
});

document.addEventListener('click', (event) => {
  event.preventDefault();
  const btnType = event.target.dataset.btn;
  const id = +event.target.dataset.id;
  const fruit = fruits.find((f) => f.id === id);

  if (btnType === 'price') {
    priceModal.setContent(
      `<p>Цена на ${fruit.title}: <strong>${fruit.price}</strong></p>`
    );
    priceModal.open();
  } else if (btnType === 'remove') {
    $.confirm({
      title: 'Вы уверены?',
      content: `<p>Вы удаляете фрукт: <strong>${fruit.title}</strong>`,
    })
      .then(() => {
        fruits = fruits.filter((f) => f.id !== id);
        render();
      })
      .catch(() => {
        console.log('Cancel');
      });
  }
});
