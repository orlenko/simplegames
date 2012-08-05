$(function() {
	answer = 4;
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
