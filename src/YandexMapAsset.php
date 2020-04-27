<?php

namespace rootlocal\widgets\yandexmaps;

use yii\web\AssetBundle;

/**
 * Class YandexMapAsset Yandex Maps Asset
 *
 * @author Alexander Zakharov <sys@eml.ru>
 * @package rootlocal\widgets\yandexmaps
 */
class YandexMapAsset extends AssetBundle
{
    /** @var array */
    public $css = ['css/yii_yandexmaps' . (YII_DEBUG ? '' : '.min') . '.css'];

    /** @var array */
    public $js = ['js/yii_yandexmaps' . (YII_DEBUG ? '' : '.min') . '.js'];

    /** @var array */
    public $depends = [ApiYandexMapAsset::class];

    /**
     * {@inheritdoc}
     */
    public function init()
    {
        parent::init();
        $this->sourcePath = dirname(__FILE__) . DIRECTORY_SEPARATOR . 'assets' . DIRECTORY_SEPARATOR;
    }
}