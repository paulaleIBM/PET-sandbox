/*!
 * Bootstrap v3.3.4 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

+function ($) {
  'use strict';

  // NOTE: Bidi EXTENDS tooltip.js & popover.js
  // adds on 'textdir' option with values: 'ltr', 'rtl', 'contextual'
  // ================================
  
  $.fn.tooltip.Constructor.DEFAULTS = $.extend($.fn.tooltip.Constructor.DEFAULTS, {
	textdir: ""
  })
  
  $.fn.tooltip.Constructor.prototype.resolveTextDir = $.fn.popover.Constructor.prototype.resolveTextDir = function (text) {
	var firstStrongChar = /[A-Za-z\u05d0-\u065f\u066a-\u06ef\u06fa-\u07ff\ufb1d-\ufdff\ufe70-\ufefc]/.exec(text)
	return firstStrongChar ? ( firstStrongChar[0] <= 'z' ? "ltr" : "rtl" ) : "ltr"
  }
  
  $.fn.tooltip.Constructor.prototype.initFn = $.fn.tooltip.Constructor.prototype.init
  $.fn.popover.Constructor.prototype.initFn = $.fn.popover.Constructor.prototype.init

  $.fn.tooltip.Constructor.prototype.init = $.fn.popover.Constructor.prototype.init = function (type, element, options) {
	this.initFn(type, element, options)
	
	if (this.options.textdir && !this.options.html) {
		var textDir = this.options.textdir;
			
		if (textDir !== "ltr" && textDir !== "rtl") {
			textDir = this.resolveTextDir(this.getTitle())	
		}			
		if (type === "tooltip") {
			this.tip().find('.tooltip-inner').css({
				"direction": textDir,
				"text-align": (textDir === "rtl") ? "right" : "left"
			})
		} else if (type === "popover") {
			this.tip().find('.popover-title').css({
				"direction": textDir,
				"text-align": (textDir === "rtl") ? "right" : "left"
			})
			if (this.options.textdir !== "ltr" && this.options.textdir !== "rtl") {
				textDir = this.resolveTextDir(this.getContent())
			}
			this.tip().find('.popover-content').css({
				"direction": textDir,
				"text-align": (textDir === "rtl") ? "right" : "left"
			})
		}
	}
  }
}(jQuery);