jquery-context
==============

jQuery plugin: add concepts of context and event state to the jQuery event system.

# Sample

```
$.Context()
.define('b1', function(ctx) {
	this.handle('#b1').on('click', function() {
		$(this).addClass('active').siblings().removeClass('active');
		ctx.transit('b2');
	});
})
.define('b2', function(ctx) {
	this.handle('#b2').on('click', function() {
		$(this).addClass('active').siblings().removeClass('active');
		ctx.transit('b1');
	});
});
```
