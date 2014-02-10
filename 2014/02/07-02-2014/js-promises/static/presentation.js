(function(global) {
	'use strict';
	
	Prism.hooks.add('after-highlight', function(env) {
		if(env.element.classList.contains('eval-javascript')) {
			var evalButton = document.createElement('button');
			evalButton.classList.add('eval-javascript');
			evalButton.textContent = 'eval';
			evalButton.addEventListener('click', function(event) {
				event.preventDefault();
				
				eval(this.previousElementSibling.textContent);
			});
			
			env.element.parentNode.classList.add('eval-javascript');
			
			env.element.parentNode.appendChild(evalButton);
		}
	});
}) (window);
