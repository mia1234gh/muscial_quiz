// get all required elements
// info_box
const start_btn = document.querySelector('.start_btn');
const info_box = document.querySelector('.info_box');
const exit_btn = document.querySelector('.buttons .quit');
const continue_btn = document.querySelector('.buttons .restart');
// quiz_box
const quiz_box = document.querySelector('.quiz_box');
// time
const timeOut = document.querySelector('.time_left');
// select
const option_list = document.querySelector('.option_list');

// result_box
const result_box = document.querySelector('.result_box');
const resultsBtn = document.querySelector('.result_buttons');
const restart = resultsBtn.querySelector('.restart');
const quit = resultsBtn.querySelector('.quit');



// if quit quiz at end
quit.onclick = () => {
    window.location.reload();
}
// if restart quiz at end
restart.onclick = () => {
    window.location.reload();
    // quiz_box events
    let que_count = 0;
// footer num
    let que_num = 1;
// score 
    let userScore = 0;
// timeout
    let counter;
    let timeValue = 15;
    showQuestions(que_count);
        queCounter(que_num);
        // clear timeout, restart counter
        clearInterval(counter);
        startTimer(timeValue);
        next_btn.style.display = 'none';

}
// if start_quiz clicked
start_btn.onclick = () => {
    // show info_box
    info_box.classList.add('activeInfo');
    
};
// if exit_btn clicked
exit_btn.onclick = () => {
    // hide info_box
    info_box.classList.remove('activeInfo');
    
}
// if continue_btn clicked
continue_btn.onclick = () => {
    // hide info_box
    info_box.classList.remove('activeInfo');
    // show quiz_box
    quiz_box.classList.add('activeQuiz');
    showQuestions(0);
    queCounter(1);
    startTimer(15);
}

// quiz_box events
let que_count = 0;
    // footer num
let que_num = 1;
// score 
let userScore = 0;
// timeout
let counter;
let timeValue = 15;
// next_btn, if clicked, index++,que_count++
const next_btn = document.querySelector('.next_btn');
next_btn.onclick = () => {
//    if end, quit load array
    if (que_count < questions.length-1) {
        que_count++;
        que_num++;
        showQuestions(que_count);
        queCounter(que_num);
        // clear timeout, restart counter
        clearInterval(counter);
        startTimer(timeValue);
        next_btn.style.display = 'none';
    } else {
        // completed questions, show result_box
        console.log('questions completed');
        showResultBox();
    }
}
// get questions from questions.js--array
function showQuestions(index) {
    // quiz question
    const que_text = document.querySelector('.que_text');
    let que_tag = ' <span>' +questions[index].num+'.'+ questions[index].question + '</span>';
    que_text.innerHTML = que_tag;
    // quiz options
    
    let option_tag =
        '<div class="option">' + questions[index].options[0] + '<span></span></div>'
        + '<div class="option"><span>' + questions[index].options[1] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[2] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[3] + '</span></div>';
    option_list.innerHTML = option_tag;

    //questions selected
    const option = option_list.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++){
        option[i].setAttribute('onclick', "optionSelected(this)");
    }
    
};

// icon add
const iconTick = '<i class="fa-solid fa-check"></i>';
const iconCross = '<i class="fa-solid fa-xmark">';

// answer right or false
function optionSelected(answer) {
    // once selected,quit counter
    clearInterval(counter);
    let userAns = answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
    
    if (userAns == correctAns) {
        userScore += 1;
        console.log(userScore);
        answer.classList.add('correct');
        answer.insertAdjacentHTML('beforeend', iconTick);
        next_btn.style.display = 'block';
    } else {
        answer.classList.add('incorrect');
        answer.insertAdjacentHTML('beforeend', iconCross);
        // if answer is incorrect, automatically choose correct one
        for (let i = 0; i < allOptions; i++){
            if (option_list.children[i].textContent == correctAns) {
                option_list.children[i].setAttribute('class', 'option correct');
                option_list.children[i].insertAdjacentHTML('beforeend', iconTick);
            }
        }
        next_btn.style.display = 'block';
    }
    // onces options are elected, disabled
    for (let i = 0; i < allOptions; i++){
        option_list.children[i].classList.add('disabled');
        
    }
};
// show result box
function showResultBox() {
    info_box.classList.remove('activeInfo');
    quiz_box.classList.remove('activeQuiz');
    result_box.classList.add('activeResult');
    const scoreText = result_box.querySelector('.score_text');
    if (userScore === questions.length) {
        let scoreTag = '<span>恭喜，你全部答对，再接再厉</span><p>';
        scoreText.innerHTML = scoreTag;
    }else if (userScore > 3) {
        let scoreTag = '<span>恭喜，你完成了</span><p>'+questions.length+'</p>分之<p>' + userScore + '</p>';
        scoreText.innerHTML = scoreTag;
    } else if (userScore > 1) {
        let scoreTag = '<span>抱歉，你完成了</span><p>'+questions.length+'</p>分之<p>' + userScore + '</p>';
        scoreText.innerHTML = scoreTag;
    } else {
        let scoreTag = '<span>抱歉，你没有得分，点击重来或退出</span>';
        scoreText.innerHTML = scoreTag;
    };
    
}

// time_left
function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeOut.textContent = time;
        time--;
        if (time < 13) {
            next_btn.style.display = 'block';
        }
        if (time <9) {
            let addZero = timeOut.textContent;
            timeOut.textContent = '0' + addZero;
        }
        if(timeValue<0){
            clearInterval(counter);
            timeOut.textContent == '00';
        }
    }
}

// quiz_box footer, progress 
function queCounter(index) {
    const bottom_ques_counter = document.querySelector('.total_que');
    const totalQueCountTag = '<span><p>' + index+ '</p>of<p>' + questions.length + '</p>questions</span>';
    bottom_ques_counter.innerHTML = totalQueCountTag;
};



