<?php

namespace rootlocal\widgets\yandexmaps;

use Yii;
use yii\helpers\ArrayHelper;
use yii\helpers\Url;
use yii\web\AssetBundle;
use yii\web\View;

/**
 * Class ApiYandexMapAsset
 * @see https://developer.tech.yandex.ru/services/
 * @see https://tech.yandex.ru/maps/jsapi/
 *
 * @author Alexander Zakharov <sys@eml.ru>
 * @package rootlocal\widgets\yandexmaps
 */
class ApiYandexMapAsset extends AssetBundle
{
    /** @var string Default Yandex Maps API version */
    public const DEFAULT_VERSION = '2.1';
    /** @var string Base Url Yandex Maps API */
    public $url = 'https://api-maps.yandex.ru/%s/?lang=%s';
    /** @var string Yandex Maps API version */
    public $version;
    /** @var string */
    public $language;
    /** @var string */
    public $apiKey;
    /** @var array */
    public $js = [];


    /**
     * {@inheritdoc}
     */
    public function init()
    {
        parent::init();
        $this->jsOptions = ['position' => View::POS_HEAD];

        if ($this->language === null) {
            $this->language = Yii::$app->language;
        }

        if ($this->version === null) {
            $this->version = self::DEFAULT_VERSION;
        }

        $url = sprintf($this->url, $this->version, $this->language);

        if ($this->apiKey !== null) {
            $url .= sprintf('&apikey=%s', $this->apiKey);
        }

        $this->js = ArrayHelper::merge($this->js, [$url]);
    }
}