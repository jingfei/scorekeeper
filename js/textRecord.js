var textRecord = (function() {
  var currentPitch = [], hitResult = [0,[' '],0];

  var init = function() {
    [...document.querySelectorAll('#pitch > button')].map(e => e.addEventListener('click', recordPitch, false));
    document.querySelector("#hit-kind").addEventListener('click', hitKindTrigger, false);
    document.querySelector("#hit-result").addEventListener('click', hitResultTrigger, false);
  };

  var recordPitch = function(e) {
  	const target = e.currentTarget;
  	if(target.tagName !== 'BUTTON') return;
  	const icon = target.querySelector('.symb');
  	const record = document.querySelector('#r-pitch');
  	record.innerHTML += icon.outerHTML + ' ';
  	currentPitch.push(target.id);
  	checkPitch();
  };

  var deletePitch = function() {
	  const record = document.querySelector('#r-pitch');
	  const icon = record.querySelector('.symb:last-of-type');
	  if(icon) { record.removeChild(icon); currentPitch.pop(); }
  };

  var checkPitch = function() {
  	let ans = false;
  	if(currentPitch.includes('o')) { // hit
  		alert('In play!');
  		document.querySelector('#pitch').classList.add('none');
      document.querySelector('#hit').classList.remove('none');
  		document.querySelector('#hit-pos-container').innerHTML += hitPosContent;
  		document.querySelector('.hit-pos:last-of-type').id = "hit-pos-0";
  		document.querySelector('.hit-pos:last-of-type').addEventListener('click', hitPosTrigger, false);
  	}
    else if(currentPitch.last() === 'd') {
      hitResult[2] = 'D';
      ans = confirm('觸身球，進入下一個打席？');
    }
  	else if(currentPitch.count('b')  === 4) {
      hitResult[2] = 'BB';
  		ans = confirm('保送，進入下一個打席?');
    }
  	else if( (currentPitch.last() === 's' || currentPitch.last() === 'w') 
          && currentPitch.count('s') + currentPitch.count('w') + currentPitch.count('f') >= 3) {
      hitResult[2] = 'K';
  		ans = confirm('三振出局，進入下一個打席?');
    }
  	
  	if(ans) addHistory();
  };

  var addHistory = function() {
  	currentPitch = [];
  	const content = document.querySelector('#r-pitch').innerHTML;
  	const history = document.querySelector('#history');
  	history.innerHTML = `<button class="list-group-item">
      <div>${content}</div>
      <div id="h-hit">${hitResult[2] ? hitResult[2] : ''}</div>
      <div id="h-field">${getFieldRecord()}</div></button>` + history.innerHTML;
    [...document.querySelectorAll("[id^='r-']")].map(e => e.innerHTML = '');
    [...document.querySelectorAll("#hit .active")].map(e => e.classList.remove('active'));
    document.querySelector('#hit').classList.add('none');
    document.querySelector("#hit-pos-container").innerHTML = "";
    document.querySelector('#pitch').classList.remove('none');
    hitResult = [0,[' '],0];
  };

  var hitPosTrigger = function(e) {
	  if(e.target.tagName !== "LABEL" && e.target.tagName !== "BUTTON") return;
    if(e.target.tagName === "LABEL") {
      const act = e.currentTarget.querySelector(".active");
      if(act) act.classList.remove("active");
      e.target.classList.add("active");
    }

	  if(e.target.innerText == "-") {
	  	e.currentTarget.parentElement.removeChild(e.currentTarget);
      hitResult[1].pop();
	  } else {
      const len = hitResult[1].length;
      for(let i=0; i<len; ++i) {
        const elm = document.querySelector('#hit-pos-'+i+' .active');
        hitResult[1][i] = elm ? elm.innerText : ' ';
      }
      if(e.target.innerText == "+") {
        const div = document.createElement('div'); 
        div.innerHTML = hitPosContent;
	      document.querySelector('#hit-pos-container').appendChild(div.querySelector('div'));
	      document.querySelector('.hit-pos:last-of-type').id = "hit-pos-" + len;
	      document.querySelector('.hit-pos:last-of-type').addEventListener('click', hitPosTrigger, false);
        hitResult[1].push(0);
      }

      changeHit();
	  }
  };

  var hitKindTrigger = function(e) {
  	if(e.target.tagName !== "LABEL") return;
    hitResult[0] = e.target.id;
    changeHit();
  };

  var hitResultTrigger = function(e) {
  	if(e.target.tagName !== "LABEL") return;
    hitResult[2] = e.target.id;
    changeHit();
  };

  var getFieldRecord = function() {
    const hitKindDraw = {'g': 'M 0 16 A 18 18 0 0 0 20 16',
                         'h': 'M 0 4 L 20 4',
                         'f': 'M 20 8 A 18 18 0 0 0 0 8' };
    const len = hitResult[1].length;
    return `<svg width="${len*20}" height="20">`
          + (hitResult[0] ? `<path stroke="black" fill="none" d="${hitKindDraw[hitResult[0]]}"/>` : '') 
          + hitResult[1].map( (n,i) => (n ? `<text x="${i*20+(i ? 3 : 6)}" y="16" style="font-size:14px" fill="black">${i ? '-' : ''} ${n}</text>` : ''));
          + `</svg>`;
  };

  var changeHit = function() {
    const res = document.querySelector("#record");
    res.querySelector('#r-hit').innerHTML = hitResult[2] ? hitResult[2] : '';
    res.querySelector('#r-field').innerHTML = getFieldRecord();
  };

  return init;
});
