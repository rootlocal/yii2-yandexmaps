<?php

namespace rootlocal\widgets\yandexmaps;

use yii\base\Widget;
use yii\web\View;
use yii\helpers\Json;
use yii\helpers\ArrayHelper;

/**
 * Class YandexMapWidget
 *
 * @property array $jsConfig
 * @property string $hash
 *
 * @author Alexander Zakharov <sys@eml.ru>
 * @package rootlocal\widgets\yandexmaps
 */
class YandexMapWidget extends Widget
{
    /** @var string */
    public const PLUGIN_NAME = 'yii_yandexmaps';

    /** @var string jquery id selector */
    public $selector;
    /** @var string */
    public $content = '';
    /** @var array */
    public $options = [];
    /** @var array Html options Div element */
    public $htmlOptions = [];

    /** @var string */
    private $_jsConfig;
    /** @var string */
    private $_hash;

    /**
     * {@inheritdoc}
     */
    public function init()
    {
        parent::init();

        if ($this->selector === null) {
            $this->selector = 'map-' . $this->id;
        }

        $this->htmlOptions = ArrayHelper::merge(['class' => 'yii_yandexmaps'], $this->htmlOptions);
        $this->htmlOptions['id'] = $this->selector;

        $view = $this->getView();
        $this->registerAssets($view);
        $this->buildJsOptions($view);
        $this->registerJs($view);
    }

    /**
     * @param View $view
     */
    public function registerAssets(View $view)
    {
        YandexMapAsset::register($view);
    }

    /**
     * @return string
     */
    public function getJsConfig()
    {
        $defaultOptions = [
            'id' => $this->id,
            'selector' => $this->selector,
            'options' => [
                /*
                'center' => [],
                'zoom' => 0,
                'controls' => ['zoomControl'],
                'placemarks' => [
                    [
                        'position' => [],
                        'content' => [
                            'hintContent' => '',
                            'balloonContentHeader' => '',
                            'balloonContentBody' => '',
                            'balloonContentFooter' => '',
                        ],
                    ],
                ],*/
            ],
        ];

        if ($this->_jsConfig === null) {
            $this->_jsConfig = Json::htmlEncode(
                ArrayHelper::merge($defaultOptions, ['options' => $this->options])
            );
        }

        return $this->_jsConfig;
    }

    /**
     * @param View $view
     */
    public function buildJsOptions(View $view)
    {
        $js = $this->getJsConfig();
        $this->_hash = self::PLUGIN_NAME . '_' . hash('crc32', get_called_class() . $js);
        $view->registerJs("var {$this->_hash} = {$js};", $view::POS_HEAD, $this->_hash);
    }

    /**
     * @param View $view
     */
    public function registerJs(View $view)
    {
        $js = 'jQuery("#' . $this->selector . '").' . self::PLUGIN_NAME . '(' . $this->_hash . ');';
        $view->registerJs($js);
    }

    /**
     * @return string
     */
    public function run()
    {
        return $this->render('index', [
            'content' => $this->content,
            'htmlOptions' => $this->htmlOptions,
        ]);
    }
}