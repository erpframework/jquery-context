(function($) {
	function Context() {
		if (!(this instanceof Context))
			return new Context();

		var stateMap = {};

		var currentId;

		$.extend(this, {
			define: function(id, initializer) {
				var state = stateMap[id] = State(initializer, this);
				if (currentId == null) {
					currentId = id;
					state.attach(this);
				}
				return this;
			},
			transit: function(id) {
				stateMap[currentId].detach();
				stateMap[id].attach(this);

				currentId = id;
				return this;
			}
		});
	}

	var guid = (function() {
		var _ = 0;
		return function() { return ++_ };
	}());

	function State(initializer, ctx) {
		if (!(this instanceof State))
			return new State(initializer, ctx);

		var id = guid();
		var handleObjects = [];    
		var target;

		$.extend(this, {
			handle: function(selector) {
				target = selector;
				return this;
			},
			on: function(types, selector, fn) {
				if (fn === undefined && typeof selector === 'function') {
					fn = selector;
					selector = undefined;
				}

				handleObjects.push({
					target: target,
					types: types,
					selector: selector,
					fn: fn
				});

				return this;
			},

			attach: function(ctx) {
				for (var i = 0, len = handleObjects.length; i < len; i++) {
					var h = handleObjects[i];
					$(h.target).on(h.types + '.state' + id, h.selector, h.fn);
				}
			},
			detach: function(ctx) {
				for (var i = 0, len = handleObjects.length; i < len; i++) {
					var h = handleObjects[i];
					$(h.target).off(h.types + '.state' + id);
				}
			}
		});

		initializer.call(this, ctx);
	}

	$.extend({
		Context: Context
	});
}(jQuery));
