app.controller("actionController", function() {
  var currentPitch = [], 
      hitResult = { fielder:[0] };

  var action = this;
  action.historyList = [];
  action.hitPosList = [];

  action.currentPitch = currentPitch;
  action.hitResult = hitResult;

  action.showHit = false;
  action.showPitch = true;

  action.hitKindDraw = {'g': 'M 0 16 A 18 18 0 0 0 20 16',
                         'h': 'M 0 4 L 20 4',
                         'f': 'M 20 8 A 18 18 0 0 0 0 8' };

  action.getSymbElmHtml = function(symb) {
    return graph.getSymbElm(symb).outerHTML;
  };

  action.recordPitch = function(e) {
  	const target = e.target;
  	if(target.tagName !== 'BUTTON') return;
  	currentPitch.push(target.id);
  	checkPitch();
  };

  action.deletePitch = function() {
    currentPitch.pop();
  };

  action.addHistory = function() {
    hitResult.pitch = currentPitch;
    action.historyList.push(hitResult);
    action.hitPosList = [];
    action.currentPitch = currentPitch = [];
    action.hitResult = hitResult = { fielder:[0] };
    action.showHit = false;
    action.showPitch = true;
    [...document.querySelectorAll("#hit .active")].map(e => e.classList.remove('active'));
  };

  var checkPitch = function() {
  	let ans = false;
  	if(currentPitch.includes('o')) { // hit
  		alert('In play!');
      action.showPitch = false;
      action.showHit = true;
      action.hitPosList.push('tmp');
  	}
    else if(currentPitch.last() === 'd') {
      hitResult.bat = 'D';
      ans = confirm('觸身球，進入下一個打席？');
    }
  	else if(currentPitch.count('b')  === 4) {
      hitResult.bat = 'BB';
  		ans = confirm('保送，進入下一個打席?');
    }
  	else if( (currentPitch.last() === 's' || currentPitch.last() === 'w') 
          && currentPitch.count('s') + currentPitch.count('w') + currentPitch.count('f') >= 3) {
      hitResult.bat = 'K';
  		ans = confirm('三振出局，進入下一個打席?');
    }
  	
  	if(ans) action.addHistory();
  };

  action.hitPosTrigger = function(e) {
	  if(e.target.tagName !== "LABEL" && e.target.tagName !== "BUTTON") return;
    if(e.target.tagName === "LABEL") {
      const act = e.currentTarget.querySelector(".active");
      if(act) act.classList.remove("active");
      e.target.classList.add("active");
    }

	  if(e.target.innerText == "-") {
	  	e.currentTarget.parentElement.removeChild(e.currentTarget);
      hitResult.fielder.pop();
	  } else {
      const len = hitResult.fielder.length;
      for(let i=0; i<len; ++i) {
        const elm = document.querySelector('#hit-pos-'+i+' .active');
        hitResult.fielder[i] = elm ? elm.innerText : ' ';
      }
      if(e.target.innerText == "+") {
        action.hitPosList.push('tmp');
        hitResult.fielder.push(0);
      }
	  }
  };

  action.hitKindTrigger = function(e) {
  	if(e.target.tagName !== "LABEL") return;
    hitResult.hit = e.target.id;
  };

  action.hitResultTrigger = function(e) {
  	if(e.target.tagName !== "LABEL") return;
    hitResult.bat = e.target.id;
  };

});
