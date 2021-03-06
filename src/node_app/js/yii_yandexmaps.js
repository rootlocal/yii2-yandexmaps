(function ($, window, document, undefined) {
    let pluginName = 'yii_yandexmaps',
        defaults = {
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
        let config = this.config;
        let selector = this.options.selector;
        let placemarks = {};

        if (config.hasOwnProperty('placemarks')) {
            placemarks = config.placemarks;
        }

        ymaps.ready(function () {

            let myMap = new ymaps.Map(selector, config);

            $.each(placemarks, function (key, value) {

                if (value.hasOwnProperty('position') && value.hasOwnProperty('content')) {
                    let myPlacemark = new ymaps.Placemark(value.position, value.content);
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
                $.data(this, 'plugin_' + pluginName,
                    new Plugin(this, options));
            }
        });
    };

})(jQuery, window, document);