let computerNum = 0;
let playBtn = document.getElementById('playBtn');
let userInput = document.getElementById('userInput');
let resultArea = document.querySelector('.result-area');
let resetBtn = document.getElementById('resetBtn');
let chances = 10;
let gameOver = false;
let chanceArea = document.getElementById('chanceArea');
let history = [];


//play 함수를 매개변수로 넘김 
//함수가 매개변수로 들어가면 () 빼야함
// : click할때 발생해야하니까 함수로 넘겨버리면 그냥 실행이 됨
playBtn.addEventListener('click', play);
resetBtn.addEventListener('click', reset);
//값 초기화 방식 2
userInput.addEventListener('focus', function () {
    userInput.value = '';
});

function pickRandomNum() {
    //Math.random * 100 => 0~1 까지의 랜덤숫자에 100을 곱해서 0 ~ 99까지의 무작위 소수점이 붙은 숫자 생성
    //Math.floor로 뒤에 소수점을 버림
    //+1 을 하는 이유는 0~99상태여서 원하는 값은 1 ~ 100 사이의 숫자이므로
    computerNum = Math.floor(Math.random() * 100) + 1;
    console.log('정답: ', computerNum);
}
pickRandomNum();

function play() {
    let userValue = userInput.value;

    //유효성검사1
    if (userValue < 1 || userInput > 100) {
        resultArea.textContent = "1~100사이 숫자를 입력해 주세요";
        //return을 쓰면 아래 코드는 읽지않고 조건식이 맞았을때 return 해줌
        return;
    }

    //유혀성검사2
    //이미 입력한 숫자일 경우
    if (history.includes(userValue)) {
        resultArea.textContent = "이미 입력한 숫자입니다. 다시 입력해주세요.";
        return;
    }

    chances--;
    // chanceArea.textContent = "남은기회: " + chances + "번";
    chanceArea.textContent = `남은기회: ${chances}번`;

    if (userValue < computerNum) {
        resultArea.textContent = "up!"
    } else if (userValue > computerNum) {
        resultArea.textContent = "down!"
    } else {
        resultArea.textContent = "성공!"
        gameOver = true;
    }

    history.push(userValue);
    console.log(history);

    if (chances < 1) {
        gameOver = true;
    }

    if (gameOver) {
        playBtn.disabled = true;
    }

    //값 초기화 방식1
    userInput.value = "";
}

function reset() {
    //1.값 초기화
    userInput.value = "";

    //2.랜덤숫자 뽑기
    pickRandomNum();

    //3.Text 수정
    resultArea.textContent = "결과값이 여기 나옵니다"

    playBtn.disabled = false;

    chanceArea.textContent = '남은기회: 10번';
}
