/*!
 * Copyright Andrée Hansson, 2010
 * GPL/MIT Multi-licensed.
 * http://www.gnu.org/licenses/gpl.html
 * http://www.opensource.org/licenses/mit-license.php
 *
 * GMail/Twitter:  peolanha
 * IRC (FreeNode): peol
 * Website:        http://andreehansson.se/
 * Github:         http://github.com/peol/
 *
 * HTML5 Placeholder Support through jQuery.
 * Approach inspired (and partly taken) from Mike Taylors plugin over at
 * http://github.com/miketaylr/jQuery-html5-placeholder
 * 
 * Doesn't use the input's real value as placeholder since that would allow .value to be
 * the placeholder value (like most other approaches will fail).
 */

!function() {
	var nativeSupport = "placeholder" in document.createElement('input');

	$.fn.placeholder = function() {
		return nativeSupport ? this : this.each(function() {
			var
				me     = $(this),
				id     = me[0].id || "placeholder" + +new Date,
				value  = me.val(),
				offset = me.position(),
				label  = $('<label/>').addClass('html5-placeholder');

			me
				.attr('id', id)
				.bind('focus blur', function(e) {
					e.type == 'focus' && label.hide();
					e.type == 'blur'  && me.val() == "" && label.show();
				});

			label
				.css({
					display:    value == "" ? 'block' : 'none',
					color:      '#999',
					position:   'absolute',
					overflow:   'hidden',
					top:        offset.top,
					left:       offset.left,
					width:      me.outerWidth(),
					height:     me.outerHeight(),
					marginTop:  5,
					marginLeft: 5,
					cursor:     me.css('cursor'),
					lineHeight: me.css('line-height'),
					fontSize:   me.css('font-size'),
					fontWeight: me.css('font-weight')
				})
				.attr('for', id)
				.text( me.attr('placeholder') )
				.insertAfter(me);
		});
	};
}();
