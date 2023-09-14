function ExecuteScript(strId)
{
  switch (strId)
  {
      case "6QURj1VqIde":
        Script1();
        break;
      case "5s3S0gVGdlE":
        Script2();
        break;
      case "6ehf6ma6wfp":
        Script3();
        break;
  }
}

function Script1()
{
  var questions = [{
    text: "Tasks, activities, relationships and responsibilities in my <b>best job</b>:",
    input: document.querySelector('#acc-6XWLjzqHtEw')?.value
}, {
    text: "Tasks, activities, relationships and responsibilities in my <b>least enjoyable job</b>:",
    input: document.querySelector('#acc-63cFZ5AaA0A')?.value
}];
console.log(questions);
sessionStorage.setItem('StorySlideQuestions', JSON.stringify(questions));
}

function Script2()
{
  if (sessionStorage.getItem('StorySlideQuestions') != null) {
    var questions = JSON.parse(sessionStorage.getItem('StorySlideQuestions'));
    questions.push({
        text: "Resources (<b>SMAR</b>) in my current role…",
        input: document.querySelector('#acc-6Jsvy7hpq2C')?.value
    }, {
        text: "<b>Demands</b> in my current role…",
        input: document.querySelector('#acc-60GKUppw21g')?.value
    });
    console.log(questions);
    sessionStorage.setItem('StorySlideQuestions', JSON.stringify(questions));
}
}

function Script3()
{
  if (sessionStorage.getItem('StorySlideQuestions') != null) {
    var questions = JSON.parse(sessionStorage.getItem('StorySlideQuestions'));
    questions[4] = {
        text: "What I will <b>keep</b> doing…",
        input: document.querySelector('#acc-5qpiPMMhUQC')?.value
    };
    questions[5] = {
        text: "What I will <b>start</b> doing…",
        input: document.querySelector('#acc-6KCbDdSATPx')?.value
    };
    questions[6] = {
        text: "What I will <b>stop</b> doing…",
        input: document.querySelector('#acc-6qNtFB0ajX4')?.value
    };
    console.log(questions);
    sessionStorage.setItem('StorySlideQuestions', JSON.stringify(questions));

    document.querySelector('#preso').style.display = 'none';

    var storyPrint = document.createElement('div'),
        QualtricsLink = 'https://curtin.au1.qualtrics.com/jfe/form/SV_dpxjUYpAkRaZGv4?';
    storyPrint.id = 'storyPrint';
    storyPrint.setAttribute('style', 'display: block; width: 100%; height: 100%;');
    questions.forEach(function (question, index) {
        var storyPrintQuestion = document.createElement('div');
        storyPrintQuestion.setAttribute('style', 'display: block; width: 100%; margin: 0 0 20px 0;');
        storyPrintQuestion.innerHTML = question.text + '<br>' + question.input;
        storyPrint.appendChild(storyPrintQuestion);
        QualtricsLink += 'q' + (index + 1) + '=' + encodeURIComponent(question.input) + '&';
    });
    QualtricsLink = QualtricsLink.slice(0, -1);
    var iframe = document.createElement('iframe');
    iframe.setAttribute('style', 'display: none;');
    iframe.src = QualtricsLink;
    storyPrint.appendChild(iframe);
    document.querySelector('body').appendChild(storyPrint);

    window.onafterprint = function () {
        document.querySelector('#preso').style.display = 'block';
        document.querySelector('#storyPrint').remove();
    }
    window.print();
}
}

