// usage: log('inside coolFunc', this, arguments);
window.log = function f(){ log.history = log.history || []; log.history.push(arguments); if(this.console) { var args = arguments, newarr; args.callee = args.callee.caller; newarr = [].slice.call(args); if (typeof console.log === 'object') log.apply.call(console.log, console, newarr); else console.log.apply(console, newarr);}};
(function(a){function b(){}for(var c="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(","),d;!!(d=c.pop());){a[d]=a[d]||b;}})
(function(){try{console.log();return window.console;}catch(a){return (window.console={});}}());

$(function() {
	var x = 0;
	var y = 0;
	var answer = 0;
	var score = 0;
	var isNewGame = false;

	function newGame() {
		isNewGame = true;
		x = Math.floor(Math.random() * 8 + 2);
		y = Math.floor(Math.random() * 8 + 2);
		answer = x * y;

		var h = $(window).height();
		var w = $('#main-content').width();

		var unit = Math.round(Math.min(h, w) / 9);

		$('label[for=answer]').text(x + ' x ' + y + ' = ');
		$('#answer').val('').removeClass('correct');		

		$('#matrix').css({width: (x*unit + 2*x + 2) + 'px', height: (y*unit + 2*y + 2) + 'px'}).html('');
		for(var i=0; i<answer; i++) {
			$('#matrix').append($('<div class="cell"></div>'));
		}
		$('.cell').css({width: unit + 'px', height: unit + 'px'})

		$('#answer').val('').trigger('change').focus();

		return false;
	}

	$('#answer').change(function() {
		var val = $(this).val()

		var r = 0;
		var g = 200;
		var b = 0;
		var opacity = 1;

		// For yellow, we need to raise red channel
		// For red, we need to raise red and lower green.

		if (val == answer) {
			$(this).addClass('correct')
			$('.cell').css({opacity: 1})
			
			if (isNewGame) {
				isNewGame = false;
				score += 1;
				$('#score').html('Score: ' + score)
			}
			//$('#audio-yes').get(0).play();
		} else {
			$(this).removeClass('correct')
			if (val < answer) {
				var cells = $('.cell')
				cells.css({opacity: .4})
				for (var i=0; i<val; ++i) {
					$(cells[i]).css({opacity: 1})
				}
			} else {
				$('.cell').css({opacity: 1})
				r = 255
				g = 50
			}
		}

		$('.cell').css({
			'background-color': 'rgb(' + Math.round(r) + ',' + Math.round(g) + ',' + Math.round(b) + ')'
		})
	})
	
	$('#answer').keyup(function(){$(this).trigger('change')})

	$('#new-game').click(newGame);

	window.setTimeout(newGame, 100);

})

/*

$(function() {
	answer = 0;
	unit = 30;

	$('#slider').slider({
		value: 1,
		min: 1,
		max: 100,
		step: 1,
		slide: function(event, ui) {
			$('#answer').val(ui.value);
			var isValid = validate()
			if (isValid) {
				$('.cell').css('opacity', '1');
			} else {
				$('.cell').css('opacity', '.2');
				var cells = $('.cell');
				if (answer < $('#answer').val()) {
					$('#matrix').css('background-color', 'red');
				} else {
					$('#matrix').css('background-color', 'transparent');
					for (var i=0; i<ui.value; i++) {
						$(cells[i]).css('opacity', '1');
					}
				}
			}
		}
	})

	function newGame() {
		var x = Math.floor(Math.random() * 8 + 2);
		var y = Math.floor(Math.random() * 8 + 2);
		answer = x * y;
		$('label[for=answer]').text(x + ' x ' + y + ' = ');
		$('#answer').val('').removeClass('correct');

		$('#matrix').css({width: x*unit + 'px', height: y*unit + 'px'}).html('');
		for(var i=0; i<answer; i++) {
			$('#matrix').append($('<div class="cell"></div>'));
		}
		$('#slider').slider('value', 1);
	}


	$('#make-new').click(function(){
		newGame();
	})

	function validate() {
		if ($('#answer').val() == answer) {
			$('#answer').addClass('correct');
			$('#audio').get(0).play();
			return true;
		} else {
			$('#answer').removeClass('correct');
			return false;
		}
	}

	$('#answer').change(validate)
	$('#answer').keyup(function() {
		validate();
		$('#slider').slider('value', $('#answer').val());
	})

	newGame()
})
*/