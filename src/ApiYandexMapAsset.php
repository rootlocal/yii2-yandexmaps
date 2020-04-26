<?php

namespace rootlocal\widgets\yandexmaps;

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

    /** @var array */
    public $js = ['https://api-maps.yandex.ru/2.1/?lang=ru_RU'];


    /**
     * {@inheritdoc}
     */
    public function init()
    {
        parent::init();
        $this->jsOptions = ['position' => View::POS_HEAD];
    }
}