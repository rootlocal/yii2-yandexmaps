"use strict";

/**
 * yii_yandexmaps Yii2 yandex maps widget
 * https://github.com/rootlocal/yii2-yandexmaps
 * Version - 1.0.0
 *
 * Copyright (c) 2020
 */
(function ($, window, document, undefined) {
  var pluginName = 'yii_yandexmaps',
      defaults = {
    // Default example config
    id: null,
    selector: null,
    options: {}
  };

  function Plugin(element, options) {
    this.element = element;
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.width = $(window).width();
    this.config = {};

    if (this.options.hasOwnProperty('options')) {
      this.config = this.options.options;
    }

    this.init();
  }

  Plugin.prototype.init = function () {
    var config = this.config;
    var selector = this.options.selector;
    var placemarks = {};

    if (config.hasOwnProperty('placemarks')) {
      placemarks = config.placemarks;
    }

    ymaps.ready(function () {
      var myMap = new ymaps.Map(selector, config);
      $.each(placemarks, function (key, value) {
        if (value.hasOwnProperty('position') && value.hasOwnProperty('content')) {
          var myPlacemark = new ymaps.Placemark(value.position, value.content);
          myMap.geoObjects.add(myPlacemark);
        }
      });
      myMap.behaviors.disable('scrollZoom');

      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        myMap.behaviors.disable('drag');
      }
    });
  };

  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
      }
    });
  };
})(jQuery, window, document);