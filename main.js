const basket = [];
const basketBox = document.querySelector('.basket-box');
document.querySelector('.basket-box-p').innerHTML = '상품을 넣으면 장바구니에 추가됩니다.';
const listItemContainer = document.querySelector('.list-item');
const basketBoxP = document.querySelector('.basket-box-p');

const itemCounts = {};

const allPrice = parseInt('data.price');

// 리스트 아이템을 생성하고 추가하는 함수
function listItems() {
  if (!listItemContainer) {
    console.error('요소가 존재하지 않습니다.');
    return;
  }

  let htmlContent = '';

  data.forEach(item => {
    htmlContent += `
      <div class="list-div">
        <img class="list-item-img" src="${item.photo}" alt="${item.title}">	
        <h1 class="list-item-title">${item.title}</h1>
        <h4 class="list-item-sub-title">${item.brand}</h4>
        <p class="list-item-price">가격: ${item.price}</p>
        <button class="list-item-button" data-id="${item.id}">Add</button>
      </div>
    `;
  });

  listItemContainer.innerHTML = htmlContent;

  const listItemButtons = document.querySelectorAll('.list-item-button');
  listItemButtons.forEach(button => {
    button.addEventListener('click', () => {
      const id = parseInt(button.getAttribute('data-id'));
      const item = data.find(item => item.id === id);
      if (item) {
        addContentBasket(item);
      }
    });
  });
}

// 바스켓에 아이템을 추가하는 함수
function addContentBasket(item) {
  if (!basket.includes(item)) {
    basket.push(item);
    itemCounts[item.id] = 1;
  } else {
    itemCounts[item.id]++;
  }
  updateBasket();
}

// 바스켓을 업데이트하는 함수
function updateBasket() {
  basketBoxP.innerHTML = '';

  basket.forEach(item => {
    basketBoxP.innerHTML += `
      <div class="list-div" data-id="${item.id}">
        <img class="list-item-img" src="${item.photo}" alt="${item.title}">	
        <h1 class="list-item-title">${item.title}</h1>
        <h4 class="list-item-sub-title">${item.brand}</h4>
        <p class="list-item-price">가격: ${item.price}</p>
        <div class="count">
          <button class="count-up" data-id="${item.id}">+</button>
          <button class="count-down" data-id="${item.id}">-</button>
        </div>
        <div class="all">
          <p class="all-count">총 수량: ${itemCounts[item.id]}</p>
          <p class="all-price">총 금액: ${item.price * itemCounts[item.id]}</p>
        </div>
        <button class="list-item-button-delete" data-id="${item.id}">Delete</button>
      </div>
    `;
  });

  // + 버튼 눌렀을때
  document.querySelectorAll('.count-up').forEach(button => {
    button.addEventListener('click', () => {
      const id = parseInt(button.getAttribute('data-id'));
      itemCounts[id]++;
      updateBasket();
    });
  });

  // - 버튼 눌렀을때
  document.querySelectorAll('.count-down').forEach(button => {
    button.addEventListener('click', () => {
      const id = parseInt(button.getAttribute('data-id'));
      if (itemCounts[id] > 1) {
        itemCounts[id]--;
      } else {
        deleteButtonRender(id);
      }
      updateBasket();
    });
  });

  // 삭제 버튼 클릭 이벤트 설정
  const listItemButtonDelete = document.querySelectorAll('.list-item-button-delete');
  listItemButtonDelete.forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      const id = parseInt(button.getAttribute('data-id'));
      deleteButtonRender(id);
    });
  });
}

// 삭제 버튼 함수
function deleteButtonRender(id) {
  const newBasket = basket.filter((item) => item.id !== id);
  basket.length = 0;
  basket.push(...newBasket);
  delete itemCounts[id];
  updateBasket();
}

// 결제창 기능
const modalWrapOpen = document.querySelector('.modal-wrap-open');
const modal = document.querySelector('.modal-wrap');
const modalWrapClose = document.querySelector('.modal-wrap-close');
const modalWrapClose2 = document.querySelector('.modal-wrap-close2');

modalWrapOpen.onclick = function () {
  modal.style.display = 'block';
};

modalWrapClose.onclick = function() {
  modal.style.display = 'none';
};

modalWrapClose2.onclick = function() {
  modal.style.display = 'none';
};

// 결제창 입력완료 버튼 눌렀을때
const modalWrapComplete = document.querySelector('.modal-wrap-complete');
const payment = document.querySelector('.payment')
modalWrapComplete.onclick = function() {
  modal.style.display = 'none';
  payment.style.display = 'block';

  const nameValue = document.querySelector('.name-value').value;
  const numValue = document.querySelector('.num-value').value;
  const nameNumInput = document.querySelector('.name-num-input');
  const allPayment = document.querySelector('.all-payment');

  if (nameValue === '' || numValue === '') {
    alert('값을 입력하세요.');
    modal.style.display = 'block';
    payment.style.display = 'none';
  } else {
    nameNumInput.innerHTML = 
    `<p> 사용자 <br> 
    성함: ${nameValue} / 연락처: ${numValue}</p>`;
  }

  if (basket.length === 0) {
    alert('장바구니가 비어있습니다.');
    modal.style.display = 'block';
    payment.style.display = 'none';
  } else {
    // 장바구니에 있는 모든 상품 정보를 결제창에 표시
    let paymentDetails = '';
    let totalAmount = 0;
    let totalQuantity = 0;

    basket.forEach(item => {
      const itemTotalPrice = item.price * itemCounts[item.id];
      totalAmount += itemTotalPrice;
      totalQuantity += itemCounts[item.id];
      
      paymentDetails += `
        <div class="payment-detail">
          <p>상품명: ${item.title}</p>
          <p>브랜드: ${item.brand}</p>
          <div class="payment-detail-money">
            <p>수량: ${itemCounts[item.id]}</p>
            <p>금액: ${itemTotalPrice}원</p>
          </div>
          <hr>
        </div>

        <div total-details>
        <p><strong>총 수량: ${totalQuantity}</strong></p>
        <p><strong>총 금액: ${totalAmount}원</strong></p>
      </div>
      `;
    });

    allPayment.innerHTML = paymentDetails;
  }
}

const paymentClose = document.querySelector('.payment-close');
paymentClose.onclick = function() {
  payment.style.display = 'none';
}

// 날짜 코드
var todayDate = new Date();
var year = todayDate.getFullYear();
var month = ('0' + (todayDate.getMonth() + 1)).slice(-2);
var day = ('0' + todayDate.getDate()).slice(-2);

var dateString = year + '-' + month  + '-' + day;

document.querySelector('.date').textContent = dateString;

// 시간 코드
var todayTime = new Date();   
var hours = ('0' + todayTime.getHours()).slice(-2); 
var minutes = ('0' + todayTime.getMinutes()).slice(-2);
var seconds = ('0' + todayTime.getSeconds()).slice(-2); 

var timeString = hours + ':' + minutes  + ':' + seconds;

document.querySelector('.time').textContent = timeString;

// 장바구니 초기화 버튼
const basketResetButton= document.querySelector('.basket-reset-button');

basketResetButton.addEventListener('click', () => {
  basketBoxP.innerHTML = '';
  basket.length = 0;

  console.log(basketBoxP);
})

//검색기능
function searchInput() {
  const inputValue = document.querySelector('#value').value;
  const items = document.querySelectorAll('.list-div');
  
  items.forEach(item => {
    const titleElement = item.querySelector('.list-item-title');
    if (titleElement) {
      const titleText = titleElement.textContent;
      if (titleText.indexOf(inputValue) > -1) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    }
  });
}

// Data 객체
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
  ];
  
  listItems();