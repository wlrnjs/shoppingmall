const basket = [];
const basketBox = document.querySelector('.basket-box');
document.querySelector('.basket-box-p').innerHTML = '상품을 넣으면 장바구니에 추가됩니다.';


function listItems() {
  for (let i = 0; i < data.length; i++) {

    const item = data[i];

    const listDiv = document.createElement('div');
    listDiv.className = 'list-div';

    const listItemImg = document.createElement('img');
    listItemImg.className = 'list-item-img';
    listItemImg.src = item.photo;

    const listItemTitle = document.createElement('h1');
    listItemTitle.className = 'list-item-title';
    listItemTitle.innerHTML = item.title;

    const listItemSubTitle = document.createElement('h4');
    listItemSubTitle.className = 'list-item-sub-title';
    listItemSubTitle.innerHTML = item.brand;

    const listItemPrice = document.createElement('p');
    listItemPrice.className = 'list-item-price';
    listItemPrice.innerHTML = `가격: ${item.price}`;

    const listItemButtonAdd = document.createElement('button');
    listItemButtonAdd.className = 'list-item-button';
    listItemButtonAdd.innerHTML = 'Add';

    listDiv.appendChild(listItemImg);
    listDiv.appendChild(listItemTitle);
    listDiv.appendChild(listItemSubTitle);
    listDiv.appendChild(listItemPrice);
    listDiv.appendChild(listItemButtonAdd);

    listItemButtonAdd.addEventListener('click', (event) => {
      addContentBasket(item);

      listItemContainer.appendChild(listDiv);
    })

    function addContentBasket(item) {
      if (!basket.includes(item)) {
        basket.push(item);

        const basketBoxP = document.querySelector('.basket-box-p');

        basketBoxP.innerHTML = '';

        basket.forEach(item => {
          basketBoxP.innerHTML += `
            <div class="list-div">
              <img class="list-item-img" src="${item.photo}" alt="${item.title}">	
              <h1 class="list-item-title">${item.title}</h1>
              <h4 class="list-item-sub-title">${item.brand}</h4>
              <p class="list-item-price">가격: ${item.price}</p>
              <button class="list-item-button-delete">Delete</button>
            </div>
          `;
        })
        const listItemButtonDelete = document.querySelector('.list-item-button-delete');

        listItemButtonDelete.addEventListener('click', (event) => {
          event.preventDefault();
          deleteButtonRender();
        })
      }
    }

    const listItemContainer = document.querySelector('.list-item');
    if (listItemContainer) {
      listItemContainer.appendChild(listDiv);
    } else {
      console.error('요소가 존재하지 않습니다.');
    }
    console.log(item);
  }
}

function deleteButtonRender() {
  
}

const data = [
  {
    "id": 0,
    "title": "식기세척기",
    "brand": "세척나라",
    "photo": "pr1.jpg",
    "price": 10000
  },
  {
    "id": 1,
    "title": "원목 침대 프레임",
    "brand": "침대나라",
    "photo": "pr2.jpg",
    "price": 20000
  },
  {
    "id": 2,
    "title": "천연 디퓨저 세트",
    "brand": "향기나라",
    "photo": "pr3.jpg",
    "price": 30000
  },
  {
    "id": 3,
    "title": "시원한 서큘레이터",
    "brand": "바람나라",
    "photo": "pr4.jpg",
    "price": 40000
  }
]

listItems();