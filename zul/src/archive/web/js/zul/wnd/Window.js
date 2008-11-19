/* Window.js

	Purpose:
		
	Description:
		
	History:
		Mon Nov 17 17:52:31     2008, Created by tomyeh

Copyright (C) 2008 Potix Corporation. All Rights Reserved.

This program is distributed under GPL Version 2.0 in the hope that
it will be useful, but WITHOUT ANY WARRANTY.
*/
zul.wnd.Window = zk.$extends(zul.Widget, {
	_mode: 'embedded',
	_border: 'none',
	_minheight: 100,
	_minwidth: 200,

	getMode: function () {
		return this._mode;
	},
	setMode: function (mode) {
		if (this._mode != mode) {
			this._mode = mode;

			var n = this.node;
			if (n) {
				//TODO
			}
		}
	},

	getTitle: function () {
		return this._title;
	},
	setTitle: function (title) {
		if (this._title != title) {
			this._title = title;

			var n = this.node;
			if (n) ;//TODO
		}
	},
	getBorder: function () {
		return this._border;
	},
	setBorder: function (border) {
		if (this._border != border) {
			this._border = border;

			var n = this.node;
			if (n) ;//TODO
		}
	},
	getPosition: function () {
		return this._pos;
	},
	setPosition: function (pos) {
		if (this._pos != pos) {
			this._pos = pos;

			var n = this.node;
			if (n) ;//TODO
		}
	},

	getMinheight: function () {
		return this._minheight;
	},
	setMinheight: function (minheight) {
		if (this._minheight != minheight) {
			this._minheight = minheight;

			var n = this.node;
			if (n) ;//TODO
		}
	},
	getMinwidth: function () {
		return this._minwidth;
	},
	setMinwidth: function (minwidth) {
		if (this._minwidth != minwidth) {
			this._minwidth = minwidth;

			var n = this.node;
			if (n) ;//TODO
		}
	},

	isClosable: function () {
		return this._closable;
	},
	setClosable: function (closable) {
		if (this._closable != closable) {
			this._closable = closable;

			var n = this.node;
			if (n) ;//TODO
		}
	},
	isSizable: function () {
		return this._sizable;
	},
	setSizable: function (sizable) {
		if (this._sizable != sizable) {
			this._sizable = sizable;

			var n = this.node;
			if (n) ;//TODO
		}
	},
	isMaximized: function () {
		return this._maximized;
	},
	setMaximized: function (maximized) {
		if (this._maximized != maximized) {
			this._maximized = maximized;

			var n = this.node;
			if (n) ;//TODO
		}
	},
	isMaximizable: function () {
		return this._maximizable;
	},
	setMaximizable: function (maximizable) {
		if (this._maximizable != maximizable) {
			this._maximizable = maximizable;

			var n = this.node;
			if (n) ;//TODO
		}
	},
	isMinimized: function () {
		return this._minimized;
	},
	setMinimized: function (minimized) {
		if (this._minimized != minimized) {
			this._minimized = minimized;

			var n = this.node;
			if (n) ;//TODO
		}
	},
	isMinimizable: function () {
		return this._minimizable;
	},
	setMinimizable: function (minimizable) {
		if (this._minimizable != minimizable) {
			this._minimizable = minimizable;

			var n = this.node;
			if (n) ;//TODO
		}
	},

	getContentStyle: function () {
		return this._cntStyle;
	},
	setContentStyle: function (style) {
		if (this._cntStyle != style) {
			this._cntStyle = style;

			var n = this.node;
			if (n) ;//TODO
		}
	},
	getContentSclass: function () {
		return this._cntSclass;
	},
	setContentSclass: function (sclass) {
		if (this._cntSclass != sclass) {
			this._cntSclass = sclass;

			var n = this.node;
			if (n) ;//TODO
		}
	},

	//super//
	focus: function () {
		if (this.node) {
			var cap = this.caption;
			for (var w = this.firstChild; w; w = w.nextSibling)
				if (w != cap && w.focus())
					return true;
			return cap && cap.focus();
		}
		return false;
	},
	getZclass: function () {
		var zcls = this._zclass;
		return zcls != null ? zcls: "z-window-" + this._mode;
	},

	appendChild: function (child) {
		if (this.$super('appendChild', child)) {
			if (child.$instanceof(zul.wgt.Caption))
				this.caption = child;
			return true;
		}
		return false;
	},
	insertBefore: function (child, sibling) {
		if (this.$super('insertBefore', child, sibling)) {
			if (child.$instanceof(zul.wgt.Caption))
				this.caption = child;
			return true;
		}
		return false;
	},
	removeChild: function (child) {
		if (this.$super('removeChild', child)) {
			if (child == this.caption)
				this.caption = null;
			return true;
		}
		return false;
	},
	bind_: function (desktop) {
		this.$super('bind_', desktop);

		var uuid = this. uuid,
			zulwnd = zul.wnd.Window;
		for (var nms = ['close', 'max', 'min'], j = 3; --j >=0;) {
			var nm = nms[j],
				n = this['e' + nm ] = zDom.$(uuid + '$' + nm);
			if (n) {
				zEvt.listen(n, 'click', zulwnd[nm + 'click']);
				zEvt.listen(n, 'mouseover', zulwnd[nm + 'over']);
				zEvt.listen(n, 'mouseout', zulwnd[nm + 'out']);
				if (!n.style.cursor) n.style.cursor = "default";
			}
		}
	},
	unbind_: function () {
		var zulwnd = zul.wnd.Window;
		for (var nms = ['close', 'max', 'min'], j = 3; --j >=0;) {
			var nm = nms[j],
				n = this['e' + nm ];
			if (n) {
				this['e' + nm ] = null;
				zEvt.unlisten(n, 'click', zulwnd[nm + 'click']);
				zEvt.unlisten(n, 'mouseover', zulwnd[nm + 'over']);
				zEvt.unlisten(n, 'mouseout', zulwnd[nm + 'out']);
			}
		}
		this.$super('unbind_');
	}
},{ //static
	closeclick: function (evt) {
		if (!evt) evt = window.event;
		var wnd = zEvt.widget(evt);
		wnd.fire2('onClose');
		zEvt.stop(evt);
	},
	closeover: function (evt) {
		if (!evt) evt = window.event;
		var wnd = zEvt.widget(evt),
			zcls = wnd.getZclass();
		zDom.addClass(wnd.eclose, zcls + '-close-over');
	},
	closeout: function (evt) {
		if (!evt) evt = window.event;
		var wnd = zEvt.widget(evt),
			zcls = wnd.getZclass();
		zDom.rmClass(wnd.eclose, zcls + '-close-over');
	},
	maxclick: function (evt) {
		if (!evt) evt = window.event;
		var wnd = zEvt.widget(evt);
		//TODO: handle popup since evt stopped
		zEvt.stop(evt);
	},
	maxover: function (evt) {
		if (!evt) evt = window.event;
		var wnd = zEvt.widget(evt),
			zcls = wnd.getZclass();
		if (wnd.isMaximized())
			zDom.addClass(wnd.emax, zcls + '-maximized-over');
		zDom.addClass(wnd.emax, zcls + '-maximize-over');
	},
	maxout: function (evt) {
		if (!evt) evt = window.event;
		var wnd = zEvt.widget(evt),
			zcls = wnd.getZclass();
		if (wnd.isMaximized())
			zDom.rmClass(wnd.emax, zcls + '-maximized-over');
		zDom.rmClass(wnd.emax, zcls + '-maximize-over');
	},
	minclick: function (evt) {
		if (!evt) evt = window.event;
		var wnd = zEvt.widget(evt);
		//TODO: handle popup since evt stopped
		zEvt.stop(evt);
	},
	minover: function (evt) {
		if (!evt) evt = window.event;
		var wnd = zEvt.widget(evt),
			zcls = wnd.getZclass();
		zDom.addClass(wnd.emin, zcls + '-minimize-over');
	},
	minout: function (evt) {
		if (!evt) evt = window.event;
		var wnd = zEvt.widget(evt),
			zcls = wnd.getZclass();
		zDom.rmClass(wnd.emin, zcls + '-minimize-over');
	}
});
