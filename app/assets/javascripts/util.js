Backbone.CompositeView = Backbone.View.extend({
  addSubView: function (selector, subview) {
    var selectorSubViews =
      this.subviews()[selector] || (this.subviews()[selector] = []);

    selectorSubViews.push(subview);

    var $selectorEl = this.$(selector);
    $selectorEl.append(subview.$el);
  },
	
  prependSubView: function (selector, subview) {
    var selectorSubViews =
      this.subviews()[selector] || (this.subviews()[selector] = []);

    selectorSubViews.push(subview);

    var $selectorEl = this.$(selector);
    $selectorEl.prepend(subview.$el);
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);

    // remove all subviews as well
    _(this.subviews()).each(function (selectorSubViews, selector) {
      _(selectorSubViews).each(function (subview) {
        subview.remove();
      });
    });
  },

  removeSubView: function (selector, subview) {
    var selectorSubViews =
      this.subviews()[selector] || (this.subviews()[selector] = []);

    var subviewIndex = selectorSubViews.indexOf(subview);
    selectorSubViews.splice(subviewIndex, 1);
    subview.remove();
  },

  renderSubViews: function () {
    var view = this;

    _(this.subviews()).each(function (selectorSubViews, selector) {
      var $selectorEl = view.$(selector);
      $selectorEl.empty();

      _(selectorSubViews).each(function (subview) {
        $selectorEl.append(subview.render().$el);
        subview.delegateEvents();
      });
    });
  },

  subviews: function () {
    if (!this._subviews) {
      this._subviews = {};
    }
    return this._subviews;
  }
});