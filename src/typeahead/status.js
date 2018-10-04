var Status = (function () {
  'use strict';

  function Status(options) {
    this.$el = $('<span></span>', {
      'role': 'status',
      'aria-live': 'polite',
    }).css({
      // This `.visuallyhidden` style is inspired by HTML5 Boilerplate
      // https://github.com/h5bp/html5-boilerplate/blob/fea7f22/src/css/main.css#L128
      'position': 'absolute',
      'padding': '0',
      'border': '0',
      'height': '1px',
      'width': '1px',
      'margin-bottom': '-1px',
      'margin-right': '-1px',
      'overflow': 'hidden',
      'clip': 'rect(0 0 0 0)',
      'white-space': 'nowrap',
    });
    options.$input.after(this.$el);
    _.each(options.menu.datasets, _.bind(function (dataset) {
      if (dataset.onSync) {
        dataset.onSync('rendered', _.bind(this.update, this));
        dataset.onSync('cleared', _.bind(this.cleared, this));
      }
    }, this));
  }
  _.mixin(Status.prototype, {
    update: function update(event, suggestions) {
      // The third argument is a boolean representing the state of the request.
      // If `true`, it is a response else it is a request. Rather than updating
      // the text on the request, it will only be updated on the response.
      // Doing this reduces confusion when using a screen reader. Now only when
      // results have been returned will the text be read.
      var isResponse = arguments[2];
      if (isResponse) {
        var length = suggestions.length;
        var words;
        if (length === 1) {
          words = {
            result: 'result',
            is: 'is'
          };
        } else {
          words = {
            result: 'results',
            is: 'are'
          };
        }
        this.$el.text(length + ' ' + words.result + ' ' + words.is + ' available. Keyboard users can use up and down arrow keys to navigate.');
      }
    },
    cleared: function () {
      this.$el.text('');
    }
  });

  return Status;
})();
